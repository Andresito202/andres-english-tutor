-- Schema para LearnaFree (Clon de Learna AI)

-- 1. Tabla de Perfiles de Usuario
CREATE TABLE public.user_profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  english_level text DEFAULT 'beginner',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Mensajes (Historial de chat)
CREATE TABLE public.chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'ai')),
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad: Los usuarios solo pueden ver y crear sus propios datos
CREATE POLICY "Users can view own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can view own messages" 
  ON public.chat_messages FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" 
  ON public.chat_messages FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
