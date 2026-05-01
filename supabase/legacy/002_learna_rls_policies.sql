-- ========================================================
-- 002_learna_rls_policies.sql
-- Row Level Security for Andres English Tutor (Legacy)
-- ========================================================

-- Enable RLS on all tables
ALTER TABLE public.learna_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learna_learning_events ENABLE ROW LEVEL SECURITY;

-- Helper Function to check Admin role
CREATE OR REPLACE FUNCTION public.is_learna_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role = 'admin'
        FROM public.learna_profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies... (omitted for brevity in legacy folder)
