-- ================================================================
-- 007_andres_ai_token_usage.sql
-- Description: AI Usage Tracking and Limits for Andres English Tutor
-- ================================================================

-- 1. Table for global and per-user limits configuration
CREATE TABLE IF NOT EXISTS andres_ai_usage_config (
    id TEXT PRIMARY KEY DEFAULT 'global',
    monthly_token_limit INTEGER NOT NULL DEFAULT 1000000,
    daily_token_limit INTEGER NOT NULL DEFAULT 35000,
    guest_daily_request_limit INTEGER NOT NULL DEFAULT 10,
    authenticated_daily_request_limit INTEGER NOT NULL DEFAULT 30,
    max_message_chars INTEGER NOT NULL DEFAULT 800,
    max_output_tokens INTEGER NOT NULL DEFAULT 200,
    is_ai_enabled BOOLEAN NOT NULL DEFAULT true,
    reset_day INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table for tracking actual token consumption
CREATE TABLE IF NOT EXISTS andres_ai_token_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usage_month TEXT NOT NULL, -- Format: YYYY-MM
    usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_fingerprint TEXT,
    input_tokens INTEGER NOT NULL DEFAULT 0,
    output_tokens INTEGER NOT NULL DEFAULT 0,
    total_tokens INTEGER NOT NULL DEFAULT 0,
    request_count INTEGER NOT NULL DEFAULT 0,
    last_request_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_token_usage_month ON andres_ai_token_usage(usage_month);
CREATE INDEX IF NOT EXISTS idx_token_usage_date ON andres_ai_token_usage(usage_date);
CREATE INDEX IF NOT EXISTS idx_token_usage_user ON andres_ai_token_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_token_usage_fingerprint ON andres_ai_token_usage(client_fingerprint);
CREATE UNIQUE INDEX IF NOT EXISTS unique_month_fingerprint_anon
    ON andres_ai_token_usage(usage_month, client_fingerprint)
    WHERE user_id IS NULL;

-- 3. Initial Configuration
INSERT INTO andres_ai_usage_config (
    id,
    monthly_token_limit,
    daily_token_limit,
    guest_daily_request_limit,
    authenticated_daily_request_limit,
    max_message_chars,
    max_output_tokens,
    is_ai_enabled
) VALUES (
    'global',
    1000000,
    35000,
    10,
    30,
    800,
    200,
    true
) ON CONFLICT (id) DO NOTHING;

-- 4. RLS Policies
ALTER TABLE andres_ai_usage_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE andres_ai_token_usage ENABLE ROW LEVEL SECURITY;

-- Allow public to read the global config
CREATE POLICY "Allow public read global config" ON andres_ai_usage_config
    FOR SELECT TO public
    USING (id = 'global');

-- Usage rows are written through Edge Functions with the service role.
-- Authenticated users may read only their own usage rows.
CREATE POLICY "Allow authenticated users to read own token usage" ON andres_ai_token_usage
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- IMPORTANT: Writing to token usage is ONLY allowed for the service_role (Edge Functions)
-- No public INSERT/UPDATE policies for andres_ai_token_usage.

-- 5. Trigger for updated_at
CREATE OR REPLACE FUNCTION update_andres_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_andres_ai_usage_config_updated_at
    BEFORE UPDATE ON andres_ai_usage_config
    FOR EACH ROW EXECUTE PROCEDURE update_andres_updated_at_column();

CREATE TRIGGER update_andres_ai_token_usage_updated_at
    BEFORE UPDATE ON andres_ai_token_usage
    FOR EACH ROW EXECUTE PROCEDURE update_andres_updated_at_column();

-- 6. RPC Function for atomic usage increments
CREATE OR REPLACE FUNCTION andres_increment_usage(
    p_month TEXT,
    p_date DATE,
    p_fingerprint TEXT,
    p_input INTEGER,
    p_output INTEGER,
    p_total INTEGER
) RETURNS VOID AS $$
DECLARE
    v_fingerprint TEXT := COALESCE(NULLIF(p_fingerprint, ''), 'anonymous');
BEGIN
    INSERT INTO andres_ai_token_usage (
        usage_month,
        usage_date,
        client_fingerprint,
        input_tokens,
        output_tokens,
        total_tokens,
        request_count
    )
    VALUES (
        p_month,
        p_date,
        v_fingerprint,
        p_input,
        p_output,
        p_total,
        1
    )
    ON CONFLICT (usage_month, client_fingerprint)
    WHERE user_id IS NULL
    DO UPDATE SET
        input_tokens = andres_ai_token_usage.input_tokens + EXCLUDED.input_tokens,
        output_tokens = andres_ai_token_usage.output_tokens + EXCLUDED.output_tokens,
        total_tokens = andres_ai_token_usage.total_tokens + EXCLUDED.total_tokens,
        request_count = andres_ai_token_usage.request_count + 1,
        last_request_at = NOW(),
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

REVOKE ALL ON FUNCTION andres_increment_usage(TEXT, DATE, TEXT, INTEGER, INTEGER, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION andres_increment_usage(TEXT, DATE, TEXT, INTEGER, INTEGER, INTEGER) TO service_role;
