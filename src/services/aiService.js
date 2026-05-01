import { GoogleGenAI } from '@google/genai';
import { getClientFingerprint } from '../utils/clientFingerprint';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const useDirectGemini = import.meta.env.VITE_USE_DIRECT_GEMINI === 'true';
const hasEdgeFunctionConfig = Boolean(supabaseUrl && supabaseAnonKey);

let aiClient = null;

try {
  if (useDirectGemini && apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error('[Gemini] Failed to initialize local Gemini API:', error);
}

const SYSTEM_INSTRUCTION = `
You are an expert, friendly English tutor named "Andres".
Your primary goal right now is to help the user practice PRONUNCIATION and SPEAKING.

Follow these strict rules:
1. Always keep your responses VERY SHORT (1-3 sentences max) so the text-to-speech does not take too long.
2. If the user just says hello, greet them and give them a short, useful English phrase to repeat.
3. If you asked the user to repeat a phrase, and they respond, evaluate their response carefully.
   - If it matches perfectly or very closely: praise them and give them a new, slightly harder phrase.
   - If they made mistakes or the speech-to-text caught different words: gently correct them and ask them to try the same phrase again.
4. If the user says something unrelated, respond naturally and steer them back to a repetition exercise.
5. Always use plain text so the speech synthesis reads it naturally.
`;

const MODEL_CHAIN = ['gemini-2.0-flash', 'gemini-1.5-flash'];

const buildContents = (message, history) => [
  {
    role: 'user',
    parts: [{ text: SYSTEM_INSTRUCTION }],
  },
  {
    role: 'model',
    parts: [{ text: 'Understood. I will act as the friendly English tutor Andres.' }],
  },
  ...history.map((item) => ({
    role: item.sender === 'user' ? 'user' : 'model',
    parts: [{ text: item.text }],
  })),
  {
    role: 'user',
    parts: [{ text: message }],
  },
];

export const getAIUsageStatus = async () => {
  if (!hasEdgeFunctionConfig) return null;

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/ai-usage-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
        apikey: supabaseAnonKey,
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch AI usage:', error);
    return null;
  }
};

const sendMessageToEdgeFunction = async (message, history) => {
  if (!hasEdgeFunctionConfig) {
    throw new Error('Supabase Edge Function configuration is missing.');
  }

  const fingerprint = getClientFingerprint();

  const response = await fetch(`${supabaseUrl}/functions/v1/gemini-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAnonKey}`,
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify({
      message,
      clientFingerprint: fingerprint,
      history: history.slice(-5),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 429) {
      throw {
        status: 429,
        message: data.message || 'Limite alcanzado.',
        usage: data.usage,
      };
    }

    throw new Error(data.message || data.error || 'Error en la funcion de IA.');
  }

  return {
    text: data.responseText,
    usage: data.usage,
  };
};

const sendMessageDirectly = async (message, history) => {
  if (!aiClient) {
    throw new Error('Local Gemini client not initialized.');
  }

  const contents = buildContents(message, history);
  let lastError = null;

  for (const model of MODEL_CHAIN) {
    try {
      const response = await aiClient.models.generateContent({
        model,
        contents,
        config: {
          maxOutputTokens: 200,
          temperature: 0.7,
        },
      });

      return { text: response.text || 'No response from AI.' };
    } catch (error) {
      lastError = error;
      const status = error?.status || error?.response?.status;

      if (status === 401 || status === 403) {
        throw new Error('Gemini API key is invalid or does not have permission.');
      }
    }
  }

  throw new Error(lastError?.message || 'Gemini is temporarily unavailable.');
};

export const sendMessageToAI = async (message, history) => {
  if (useDirectGemini) {
    return await sendMessageDirectly(message, history);
  }

  return await sendMessageToEdgeFunction(message, history);
};
