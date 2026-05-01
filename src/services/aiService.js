import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let aiClient = null;

try {
  if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey: apiKey });
  }
} catch (e) {
  console.error("[Gemini] Failed to initialize Gemini API:", e);
}

const SYSTEM_INSTRUCTION = `
You are an expert, friendly English tutor named "Andres".
Your primary goal right now is to help the user practice PRONUNCIATION and SPEAKING.

Follow these strict rules:
1. Always keep your responses VERY SHORT (1-3 sentences max) so the text-to-speech doesn't take too long.
2. If the user just says hello, greet them and give them a short, useful English phrase to repeat. (e.g. "Hi! Let's practice. Please repeat after me: 'The weather is beautiful today.'")
3. If you asked the user to repeat a phrase, and they respond, evaluate their response carefully.
   - If it matches perfectly or very closely: Praise them enthusiastically ("Perfect pronunciation!"). Then give them a new, slightly harder phrase to repeat.
   - If they made mistakes or the speech-to-text caught different words (which implies bad pronunciation): Gently tell them what they said wrong, and ask them to try the SAME phrase again.
4. If the user says something completely random, respond naturally but then steer them back to a repetition exercise.
5. ALWAYS be encouraging and friendly. Do not use complex markdown, just plain text, so the speech synthesis reads it naturally.
`;

const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function isRetryableGeminiError(error) {
  const status = error?.status || error?.response?.status;
  const message = error?.message || "";

  return (
    status === 503 ||
    status === 429 ||
    status >= 500 ||
    message.toLowerCase().includes("unavailable") ||
    message.toLowerCase().includes("high demand") ||
    message.toLowerCase().includes("network") ||
    message.toLowerCase().includes("fetch")
  );
}

async function generateWithModel(modelName, contents) {
  return aiClient.models.generateContent({
    model: modelName,
    contents
  });
}

export const sendMessageToAI = async (message, history) => {
  if (!apiKey) {
    throw new Error("Error: No se encontró la API Key en el archivo .env.");
  }

  if (!aiClient) {
    throw new Error("Error interno: El cliente de Gemini no se inicializó correctamente.");
  }

  let chatHistory = history.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const contents = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    {
      role: 'model',
      parts: [{ text: 'Understood. I will act as the friendly English tutor Andres.' }]
    },
    ...chatHistory,
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  for (const modelName of MODEL_CHAIN) {
    const MAX_ATTEMPTS = 2;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        console.log("[Gemini] trying model:", modelName, "attempt:", attempt);
        const response = await generateWithModel(modelName, contents);
        console.log("[Gemini] success with model:", modelName);
        return response.text;
      } catch (error) {
        const status = error?.status || error?.response?.status;
        const errorMsg = error?.message || "Sin mensaje de error";

        if (status === 400) {
          throw new Error(`Error 400: Payload o modelo inválido (${modelName}). Detalles: ${errorMsg}`);
        } else if (status === 401 || status === 403) {
          throw new Error("Error 401/403: API Key inválida o sin permisos.");
        }

        if (isRetryableGeminiError(error)) {
          console.warn("[Gemini] retryable error:", status, errorMsg);
          
          if (attempt < MAX_ATTEMPTS) {
            const delay = attempt === 1 ? 800 : 1600;
            console.log(`[Gemini] waiting ${delay}ms before next attempt...`);
            await sleep(delay);
          } else {
            console.warn("[Gemini] falling back to next model");
          }
        } else {
          // Un error no reintentoable y que no es 400/401/403
          throw new Error(`Error desconocido al contactar a la IA: ${errorMsg}`);
        }
      }
    }
  }

  throw new Error("Gemini está temporalmente saturado. Intenta de nuevo en unos minutos.");
};
