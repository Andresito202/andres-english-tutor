# Andres English Tutor

Aplicacion web educativa para practicar ingles con un tutor de IA llamado Andres. El proyecto combina chat conversacional, reconocimiento de voz, sintesis de voz del navegador, ruta de aprendizaje por niveles, progreso local y una base preparada para persistencia con Supabase.

## Resumen

Andres English Tutor esta construido como una SPA con React y Vite. La experiencia principal permite alternar entre un chat de practica oral con Gemini y modulos guiados de aprendizaje con vocabulario, pronunciacion, audio, quizzes y progreso por leccion.

## Funcionalidades

- Chat con IA usando Google Gemini.
- Instruccion de sistema enfocada en practica de pronunciacion y speaking.
- Reconocimiento de voz mediante Web Speech API.
- Reproduccion de respuestas con SpeechSynthesis.
- Diagnostico basico de microfono, voces y audio del navegador.
- Ruta de aprendizaje por niveles y modulos.
- Lecciones con traduccion, pronunciacion aproximada, IPA y audio.
- Quizzes por modulo.
- Progreso persistido en `localStorage`.
- Cliente Supabase preparado para historial y perfil de usuario.
- Migraciones SQL con tablas, RLS, seeds y funciones para evolucionar el backend.
- Deploy automatico a GitHub Pages mediante GitHub Actions.

## Stack tecnico

- React 18
- Vite 5
- JavaScript
- Google Gemini API (`@google/genai`)
- Supabase JS
- Web Speech API
- SpeechSynthesis API
- Lucide React
- GitHub Actions
- GitHub Pages

## Requisitos

- Node.js 20 o superior.
- npm.
- API key de Gemini.
- Proyecto Supabase opcional si se desea persistencia remota.

## Configuracion local

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env` desde el ejemplo:

```bash
cp .env.example .env
```

3. Completar variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GEMINI_API_KEY=
```

4. Ejecutar en desarrollo:

```bash
npm run dev
```

La aplicacion local queda disponible en:

```text
http://127.0.0.1:3050/
```

## Validacion

```bash
npm run lint
npm run build
npm run check
```

## Deploy en GitHub Pages

El proyecto esta preparado para publicarse gratis en GitHub Pages con el repositorio:

```text
https://github.com/Andresito202/andres-english-tutor
```

La URL esperada del sitio publicado es:

```text
https://andresito202.github.io/andres-english-tutor/
```

El workflow se encuentra en:

```text
.github/workflows/deploy.yml
```

Para que el deploy funcione, configurar estos secretos en GitHub:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GEMINI_API_KEY`

## Nota de seguridad

Las variables con prefijo `VITE_` se exponen en el JavaScript del navegador durante el build. Esto es aceptable para demos controladas, pero para produccion real la llamada a Gemini deberia pasar por un backend o una Edge Function que proteja la clave privada.

## Estructura principal

```text
src/
  components/
    Chat/
    Learning/
  data/
  hooks/
  services/
  styles/
supabase/
  migrations/
  legacy/
.github/workflows/deploy.yml
```

## Enfoque de ingenieria

- Separacion entre UI, servicios, hooks y datos de aprendizaje.
- Flujo de audio defensivo con manejo de errores de microfono y voz.
- Fallback de modelos Gemini para mejorar disponibilidad.
- Build optimizado con chunks separados para React, IA, Supabase e iconos.
- Base SQL documentada para evolucionar de progreso local a persistencia remota.
