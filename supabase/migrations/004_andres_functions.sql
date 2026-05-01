-- ========================================================
-- 004_andres_functions.sql
-- Professional Functions for Andres English Tutor
-- ========================================================

-- 1. Recalculate Module Progress
CREATE OR REPLACE FUNCTION public.recalculate_andres_module_progress(p_user_id uuid, p_module_id uuid)
RETURNS void AS $$
DECLARE
    v_total_lessons integer;
    v_completed_lessons integer;
    v_progress_percent numeric;
BEGIN
    -- Get total active lessons in the module
    SELECT COUNT(*) INTO v_total_lessons
    FROM public.andres_lessons
    WHERE module_id = p_module_id AND is_active = true;

    -- Get completed lessons by user in this module
    SELECT COUNT(*) INTO v_completed_lessons
    FROM public.andres_user_lesson_progress lp
    JOIN public.andres_lessons l ON lp.lesson_id = l.id
    WHERE lp.user_id = p_user_id 
      AND l.module_id = p_module_id 
      AND lp.completed = true;

    -- Calculate percent
    IF v_total_lessons > 0 THEN
        v_progress_percent := (v_completed_lessons::numeric / v_total_lessons::numeric) * 100;
    ELSE
        v_progress_percent := 0;
    END IF;

    -- Update or Insert Module Progress
    INSERT INTO public.andres_user_module_progress (
        user_id, 
        module_id, 
        total_lessons, 
        completed_lessons, 
        progress_percent, 
        completed,
        completed_at,
        last_activity_at
    )
    VALUES (
        p_user_id, 
        p_module_id, 
        v_total_lessons, 
        v_completed_lessons, 
        v_progress_percent, 
        (v_progress_percent = 100),
        CASE WHEN v_progress_percent = 100 THEN now() ELSE NULL END,
        now()
    )
    ON CONFLICT (user_id, module_id) DO UPDATE SET
        total_lessons = EXCLUDED.total_lessons,
        completed_lessons = EXCLUDED.completed_lessons,
        progress_percent = EXCLUDED.progress_percent,
        completed = EXCLUDED.completed,
        completed_at = CASE 
            WHEN EXCLUDED.completed AND NOT public.andres_user_module_progress.completed THEN now() 
            ELSE public.andres_user_module_progress.completed_at 
        END,
        last_activity_at = now(),
        updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger to recalculate module progress on lesson completion
CREATE OR REPLACE FUNCTION public.tr_handle_andres_lesson_completion()
RETURNS TRIGGER AS $$
DECLARE
    v_module_id uuid;
BEGIN
    -- Get module_id from lesson
    SELECT module_id INTO v_module_id
    FROM public.andres_lessons
    WHERE id = NEW.lesson_id;

    -- Recalculate
    PERFORM public.recalculate_andres_module_progress(NEW.user_id, v_module_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_andres_lesson_progress_change
    AFTER INSERT OR UPDATE OF completed ON public.andres_user_lesson_progress
    FOR EACH ROW EXECUTE FUNCTION public.tr_handle_andres_lesson_completion();
