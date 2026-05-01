-- ========================================================
-- 005_andres_fix_seed_encoding.sql
-- Fixes mojibake/encoding issues in seed data
-- and sets IPA to NULL for initial version.
-- ========================================================

-- 1. Fix Levels
UPDATE public.andres_levels SET title = 'Nivel Principiante' WHERE slug = 'beginner';
UPDATE public.andres_levels SET title = 'Nivel Básico' WHERE slug = 'basic';

-- 2. Fix Modules
UPDATE public.andres_modules SET title = 'Números' WHERE slug = 'numbers';

-- 3. Fix Lessons (Common issues)
UPDATE public.andres_lessons SET ipa = NULL; -- Reset all IPA to NULL as requested

UPDATE public.andres_lessons SET spanish = 'Buenos días' WHERE slug = 'good_morning';
UPDATE public.andres_lessons SET spanish = 'Buenas noches (al despedirse)' WHERE slug = 'good_night';
UPDATE public.andres_lessons SET spanish = 'Adiós' WHERE slug = 'goodbye';
UPDATE public.andres_lessons SET spanish = '¿Cómo estás?' WHERE slug = 'how_are_you';
UPDATE public.andres_lessons SET spanish = '¿Cuál es tu nombre?' WHERE slug = 'whats_your_name';
UPDATE public.andres_lessons SET spanish = '¿De dónde eres?' WHERE slug = 'where_from';
UPDATE public.andres_lessons SET spanish = 'Sí' WHERE slug = 'yes';
UPDATE public.andres_lessons SET spanish = 'Nueve' WHERE slug = 'num_9';
UPDATE public.andres_lessons SET spanish = 'Diez' WHERE slug = 'num_10';
UPDATE public.andres_lessons SET spanish = 'Mucho gusto' WHERE slug = 'nice_to_meet';
