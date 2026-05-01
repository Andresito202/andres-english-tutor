-- ========================================================
-- 002_andres_rls_policies.sql
-- Row Level Security for Andres English Tutor
-- ========================================================

-- Enable RLS on all tables
ALTER TABLE public.andres_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.andres_learning_events ENABLE ROW LEVEL SECURITY;

-- Helper Function to check Admin role
CREATE OR REPLACE FUNCTION public.is_andres_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role = 'admin'
        FROM public.andres_profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================================
-- Content Tables (Public Read, Admin Write)
-- ========================================================

-- Levels
CREATE POLICY "Anyone can view active levels" ON public.andres_levels
    FOR SELECT USING (is_active = true OR is_andres_admin());

CREATE POLICY "Admins can manage levels" ON public.andres_levels
    FOR ALL USING (is_andres_admin());

-- Modules
CREATE POLICY "Anyone can view active modules" ON public.andres_modules
    FOR SELECT USING (is_active = true OR is_andres_admin());

CREATE POLICY "Admins can manage modules" ON public.andres_modules
    FOR ALL USING (is_andres_admin());

-- Lessons
CREATE POLICY "Anyone can view active lessons" ON public.andres_lessons
    FOR SELECT USING (is_active = true OR is_andres_admin());

CREATE POLICY "Admins can manage lessons" ON public.andres_lessons
    FOR ALL USING (is_andres_admin());


-- ========================================================
-- User Specific Tables (Owner Read/Write, Admin Read)
-- ========================================================

-- Profiles
CREATE POLICY "Users can view/update own profile" ON public.andres_profiles
    FOR ALL USING (auth.uid() = id OR is_andres_admin());

-- Lesson Progress
CREATE POLICY "Users can manage own lesson progress" ON public.andres_user_lesson_progress
    FOR ALL USING (auth.uid() = user_id OR is_andres_admin());

-- Module Progress
CREATE POLICY "Users can manage own module progress" ON public.andres_user_module_progress
    FOR ALL USING (auth.uid() = user_id OR is_andres_admin());

-- Quiz Attempts
CREATE POLICY "Users can view own quiz attempts" ON public.andres_quiz_attempts
    FOR SELECT USING (auth.uid() = user_id OR is_andres_admin());

CREATE POLICY "Users can insert own quiz attempts" ON public.andres_quiz_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat Sessions
CREATE POLICY "Users can manage own chat sessions" ON public.andres_chat_sessions
    FOR ALL USING (auth.uid() = user_id OR is_andres_admin());

-- Chat Messages
CREATE POLICY "Users can manage own chat messages" ON public.andres_chat_messages
    FOR ALL USING (auth.uid() = user_id OR is_andres_admin());

-- Learning Events
CREATE POLICY "Users can manage own learning events" ON public.andres_learning_events
    FOR ALL USING (auth.uid() = user_id OR is_andres_admin());
