-- ========================================================
-- 003_andres_seed_data.sql
-- Seed data for Andres English Tutor
-- UTF-8 Clean Version
-- ========================================================

-- 1. Insert Levels
INSERT INTO public.andres_levels (id, slug, title, description, order_index)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'beginner', 'Nivel Principiante', 'Aprende lo fundamental para empezar a hablar.', 1),
    ('22222222-2222-2222-2222-222222222222', 'basic', 'Nivel Básico', 'Verbos, rutina diaria y oraciones simples.', 2),
    ('33333333-3333-3333-3333-333333333333', 'intermediate', 'Nivel Intermedio', 'Conversaciones, trabajo y viajes.', 3),
    ('44444444-4444-4444-4444-444444444444', 'advanced', 'Nivel Avanzado', 'Expresiones, argumentación y fluidez.', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Modules (Beginner)
INSERT INTO public.andres_modules (id, level_id, slug, title, description, visual_key, order_index)
VALUES 
    ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'greetings', 'Saludos y despedidas', 'Aprende los saludos más comunes en inglés.', 'sun', 1),
    ('a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'introductions', 'Presentaciones personales', 'Aprende a presentarte y preguntar cómo están los demás.', 'users', 2),
    ('a3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'numbers', 'Números', 'Los números del 1 al 10 y decenas.', 'hash', 3),
    ('a4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'colors', 'Colores', 'Aprende los colores básicos.', 'palette', 4),
    ('a5555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'family', 'Familia', 'Miembros de la familia.', 'home', 5)
ON CONFLICT (level_id, slug) DO NOTHING;

-- 3. Insert Lessons (Greetings)
-- ipa set to NULL to avoid encoding issues and confusion for beginners
INSERT INTO public.andres_lessons (module_id, slug, spanish, english, pronunciation, ipa, audio_text, visual_key, order_index)
VALUES 
    ('a1111111-1111-1111-1111-111111111111', 'hello', 'Hola', 'Hello', 'jelou', NULL, 'Hello', 'hand', 1),
    ('a1111111-1111-1111-1111-111111111111', 'good_morning', 'Buenos días', 'Good morning', 'gud mor-ning', NULL, 'Good morning', 'sun', 2),
    ('a1111111-1111-1111-1111-111111111111', 'good_afternoon', 'Buenas tardes', 'Good afternoon', 'gud af-ter-nun', NULL, 'Good afternoon', 'sun', 3),
    ('a1111111-1111-1111-1111-111111111111', 'good_evening', 'Buenas noches (al llegar)', 'Good evening', 'gud i-vning', NULL, 'Good evening', 'moon', 4),
    ('a1111111-1111-1111-1111-111111111111', 'good_night', 'Buenas noches (al despedirse)', 'Good night', 'gud nait', NULL, 'Good night', 'moon', 5),
    ('a1111111-1111-1111-1111-111111111111', 'goodbye', 'Adiós', 'Goodbye', 'gud-bai', NULL, 'Goodbye', 'hand', 6),
    ('a1111111-1111-1111-1111-111111111111', 'see_you', 'Nos vemos', 'See you', 'si yu', NULL, 'See you', 'eye', 7),
    ('a1111111-1111-1111-1111-111111111111', 'please', 'Por favor', 'Please', 'pliz', NULL, 'Please', 'star', 8),
    ('a1111111-1111-1111-1111-111111111111', 'thank_you', 'Gracias', 'Thank you', 'zank iu', NULL, 'Thank you', 'heart', 9),
    ('a1111111-1111-1111-1111-111111111111', 'you_welcome', 'De nada', 'You''re welcome', 'iur wel-com', NULL, 'You''re welcome', 'smile', 10)
ON CONFLICT (module_id, slug) DO NOTHING;

-- 4. Insert Lessons (Introductions)
INSERT INTO public.andres_lessons (module_id, slug, spanish, english, pronunciation, ipa, audio_text, visual_key, order_index)
VALUES 
    ('a2222222-2222-2222-2222-222222222222', 'how_are_you', '¿Cómo estás?', 'How are you?', 'jau ar yu', NULL, 'How are you?', 'message', 1),
    ('a2222222-2222-2222-2222-222222222222', 'im_fine', 'Estoy bien, gracias', 'I am fine, thank you', 'ai am fain, zank iu', NULL, 'I am fine, thank you', 'smile', 2),
    ('a2222222-2222-2222-2222-222222222222', 'my_name_is', 'Mi nombre es...', 'My name is...', 'mai neim is...', NULL, 'My name is', 'user', 3),
    ('a2222222-2222-2222-2222-222222222222', 'whats_your_name', '¿Cuál es tu nombre?', 'What is your name?', 'uat is iur neim', NULL, 'What is your name?', 'help', 4),
    ('a2222222-2222-2222-2222-222222222222', 'nice_to_meet', 'Mucho gusto', 'Nice to meet you', 'nais tu mit yu', NULL, 'Nice to meet you', 'handshake', 5),
    ('a2222222-2222-2222-2222-222222222222', 'where_from', '¿De dónde eres?', 'Where are you from?', 'uer ar yu from', NULL, 'Where are you from?', 'map', 6),
    ('a2222222-2222-2222-2222-222222222222', 'im_from', 'Soy de...', 'I am from...', 'ai am from...', NULL, 'I am from', 'map', 7),
    ('a2222222-2222-2222-2222-222222222222', 'yes', 'Sí', 'Yes', 'ies', NULL, 'Yes', 'check', 8),
    ('a2222222-2222-2222-2222-222222222222', 'no', 'No', 'No', 'nou', NULL, 'No', 'x', 9),
    ('a2222222-2222-2222-2222-222222222222', 'excuse_me', 'Disculpa / Con permiso', 'Excuse me', 'eks-kius mi', NULL, 'Excuse me', 'alert', 10)
ON CONFLICT (module_id, slug) DO NOTHING;

-- 5. Insert Lessons (Numbers)
INSERT INTO public.andres_lessons (module_id, slug, spanish, english, pronunciation, ipa, audio_text, visual_key, order_index)
VALUES 
    ('a3333333-3333-3333-3333-333333333333', 'num_1', 'Uno', 'One', 'uan', NULL, 'One', 'number', 1),
    ('a3333333-3333-3333-3333-333333333333', 'num_2', 'Dos', 'Two', 'tu', NULL, 'Two', 'number', 2),
    ('a3333333-3333-3333-3333-333333333333', 'num_3', 'Tres', 'Three', 'zri', NULL, 'Three', 'number', 3),
    ('a3333333-3333-3333-3333-333333333333', 'num_4', 'Cuatro', 'Four', 'for', NULL, 'Four', 'number', 4),
    ('a3333333-3333-3333-3333-333333333333', 'num_5', 'Cinco', 'Five', 'faiv', NULL, 'Five', 'number', 5),
    ('a3333333-3333-3333-3333-333333333333', 'num_6', 'Seis', 'Six', 'siks', NULL, 'Six', 'number', 6),
    ('a3333333-3333-3333-3333-333333333333', 'num_7', 'Siete', 'Seven', 'se-ven', NULL, 'Seven', 'number', 7),
    ('a3333333-3333-3333-3333-333333333333', 'num_8', 'Ocho', 'Eight', 'eit', NULL, 'Eight', 'number', 8),
    ('a3333333-3333-3333-3333-333333333333', 'num_9', 'Nueve', 'Nine', 'nain', NULL, 'Nine', 'number', 9),
    ('a3333333-3333-3333-3333-333333333333', 'num_10', 'Diez', 'Ten', 'ten', NULL, 'Ten', 'number', 10)
ON CONFLICT (module_id, slug) DO NOTHING;

-- 6. Insert Lessons (Colors)
INSERT INTO public.andres_lessons (module_id, slug, spanish, english, pronunciation, ipa, audio_text, visual_key, order_index)
VALUES 
    ('a4444444-4444-4444-4444-444444444444', 'col_red', 'Rojo', 'Red', 'red', NULL, 'Red', 'circle', 1),
    ('a4444444-4444-4444-4444-444444444444', 'col_blue', 'Azul', 'Blue', 'blu', NULL, 'Blue', 'circle', 2),
    ('a4444444-4444-4444-4444-444444444444', 'col_yellow', 'Amarillo', 'Yellow', 'ie-lou', NULL, 'Yellow', 'circle', 3),
    ('a4444444-4444-4444-4444-444444444444', 'col_green', 'Verde', 'Green', 'grin', NULL, 'Green', 'circle', 4),
    ('a4444444-4444-4444-4444-444444444444', 'col_black', 'Negro', 'Black', 'blak', NULL, 'Black', 'circle', 5),
    ('a4444444-4444-4444-4444-444444444444', 'col_white', 'Blanco', 'White', 'uait', NULL, 'White', 'circle', 6),
    ('a4444444-4444-4444-4444-444444444444', 'col_orange', 'Naranja', 'Orange', 'o-ranch', NULL, 'Orange', 'circle', 7),
    ('a4444444-4444-4444-4444-444444444444', 'col_purple', 'Morado', 'Purple', 'per-pl', NULL, 'Purple', 'circle', 8)
ON CONFLICT (module_id, slug) DO NOTHING;

-- 7. Insert Lessons (Family)
INSERT INTO public.andres_lessons (module_id, slug, spanish, english, pronunciation, ipa, audio_text, visual_key, order_index)
VALUES 
    ('a5555555-5555-5555-5555-555555555555', 'fam_mother', 'Madre', 'Mother', 'mo-der', NULL, 'Mother', 'user', 1),
    ('a5555555-5555-5555-5555-555555555555', 'fam_father', 'Padre', 'Father', 'fa-der', NULL, 'Father', 'user', 2),
    ('a5555555-5555-5555-5555-555555555555', 'fam_brother', 'Hermano', 'Brother', 'bro-der', NULL, 'Brother', 'user', 3),
    ('a5555555-5555-5555-5555-555555555555', 'fam_sister', 'Hermana', 'Sister', 'sis-ter', NULL, 'Sister', 'user', 4),
    ('a5555555-5555-5555-5555-555555555555', 'fam_son', 'Hijo', 'Son', 'san', NULL, 'Son', 'user', 5),
    ('a5555555-5555-5555-5555-555555555555', 'fam_daughter', 'Hija', 'Daughter', 'do-ter', NULL, 'Daughter', 'user', 6),
    ('a5555555-5555-5555-5555-555555555555', 'fam_grandfather', 'Abuelo', 'Grandfather', 'gran-fa-der', NULL, 'Grandfather', 'user', 7),
    ('a5555555-5555-5555-5555-555555555555', 'fam_grandmother', 'Abuela', 'Grandmother', 'gran-mo-der', NULL, 'Grandmother', 'user', 8)
ON CONFLICT (module_id, slug) DO NOTHING;
