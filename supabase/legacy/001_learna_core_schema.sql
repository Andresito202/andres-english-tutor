-- ========================================================
-- 001_learna_core_schema.sql
-- Professional Schema for Andres English Tutor (Learna Clone)
-- ========================================================

-- 1. Helper Functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 2. Levels Table
CREATE TABLE IF NOT EXISTS public.learna_levels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Modules Table
CREATE TABLE IF NOT EXISTS public.learna_modules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id uuid REFERENCES public.learna_levels(id) ON DELETE CASCADE,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    visual_key text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(level_id, slug)
);

-- 4. Lessons Table
CREATE TABLE IF NOT EXISTS public.learna_lessons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id uuid REFERENCES public.learna_modules(id) ON DELETE CASCADE,
    slug text NOT NULL,
    spanish text NOT NULL,
    english text NOT NULL,
    pronunciation text NOT NULL,
    ipa text,
    audio_text text NOT NULL,
    visual_key text,
    example_sentence text,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(module_id, slug)
);

-- 5. User Profiles Table
CREATE TABLE IF NOT EXISTS public.learna_profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text,
    avatar_url text,
    role text DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    current_level_id uuid REFERENCES public.learna_levels(id),
    native_language text DEFAULT 'es',
    target_language text DEFAULT 'en',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 6. User Lesson Progress
CREATE TABLE IF NOT EXISTS public.learna_user_lesson_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id uuid REFERENCES public.learna_lessons(id) ON DELETE CASCADE,
    completed boolean DEFAULT false,
    completed_at timestamptz,
    times_practiced integer DEFAULT 0,
    last_practiced_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, lesson_id)
);

-- 7. User Module Progress
CREATE TABLE IF NOT EXISTS public.learna_user_module_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    module_id uuid REFERENCES public.learna_modules(id) ON DELETE CASCADE,
    completed boolean DEFAULT false,
    progress_percent numeric DEFAULT 0,
    completed_lessons integer DEFAULT 0,
    total_lessons integer DEFAULT 0,
    completed_at timestamptz,
    last_activity_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, module_id)
);

-- 8. Quiz Attempts
CREATE TABLE IF NOT EXISTS public.learna_quiz_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    module_id uuid REFERENCES public.learna_modules(id) ON DELETE CASCADE,
    score integer NOT NULL,
    total_questions integer NOT NULL,
    percentage numeric,
    answers jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now()
);

-- 9. Chat Sessions
CREATE TABLE IF NOT EXISTS public.learna_chat_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    module_id uuid REFERENCES public.learna_modules(id) ON DELETE SET NULL,
    title text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 10. Chat Messages
CREATE TABLE IF NOT EXISTS public.learna_chat_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id uuid REFERENCES public.learna_chat_sessions(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    role text CHECK (role IN ('user', 'model', 'system')),
    content text NOT NULL,
    metadata jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- 11. Learning Events / Analytics
CREATE TABLE IF NOT EXISTS public.learna_learning_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type text NOT NULL,
    level_id uuid REFERENCES public.learna_levels(id),
    module_id uuid REFERENCES public.learna_modules(id),
    lesson_id uuid REFERENCES public.learna_lessons(id),
    metadata jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- ========================================================
-- Indices for performance
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_learna_modules_level_order ON public.learna_modules(level_id, order_index);
CREATE INDEX IF NOT EXISTS idx_learna_lessons_module_order ON public.learna_lessons(module_id, order_index);
CREATE INDEX IF NOT EXISTS idx_learna_progress_user_lesson ON public.learna_user_lesson_progress(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_learna_progress_user_module ON public.learna_user_module_progress(user_id, module_id);
CREATE INDEX IF NOT EXISTS idx_learna_quiz_user_module ON public.learna_quiz_attempts(user_id, module_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learna_chat_sessions_user ON public.learna_chat_sessions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learna_chat_messages_session ON public.learna_chat_messages(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_learna_events_user ON public.learna_learning_events(user_id, created_at DESC);

-- ========================================================
-- Auto-update updated_at triggers
-- ========================================================
CREATE TRIGGER tr_update_levels_at BEFORE UPDATE ON public.learna_levels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_modules_at BEFORE UPDATE ON public.learna_modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_lessons_at BEFORE UPDATE ON public.learna_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_profiles_at BEFORE UPDATE ON public.learna_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_lesson_progress_at BEFORE UPDATE ON public.learna_user_lesson_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_module_progress_at BEFORE UPDATE ON public.learna_user_module_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_chat_sessions_at BEFORE UPDATE ON public.learna_chat_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- Profile Creation Trigger (Handled on Auth Signup)
-- ========================================================
CREATE OR REPLACE FUNCTION public.handle_new_learna_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.learna_profiles (id, full_name, avatar_url, role)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url', 'student');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_learna
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_learna_user();
