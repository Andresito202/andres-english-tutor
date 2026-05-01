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

STRICT TRANSCRIPTION HANDLING:
1. Users speak through a microphone. Transcriptions might show "1" instead of "one", or "2" instead of "two".
2. Always interpret numbers as their word equivalent (1 -> one, 2 -> two) unless the context is specifically about digits.
3. If you receive repetitive text like "one one one" or "111", assume it is a transcription error of a single "one" and respond based on that.
4. If the user input is very short or unclear, ask them to repeat politely: "I didn't quite catch that, could you repeat it?"

CONVERSATION RULES:
1. Keep your responses VERY SHORT (1-3 sentences max).
2. If the user greets you, give them a short phrase to repeat.
3. Evaluate repetitions:
   - Success: Praise them and give a new phrase.
   - Failure or unclear: Gently correct and ask to try again.
4. Always be encouraging. Use plain text only.
`;

const MODEL_CHAIN = ['gemini-2.5-flash-lite'];

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

const sendMessageToEdgeFunction = async (message, history = [], practiceMode = 'conversation') => {
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
      practiceMode,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 429) {
      throw {
        status: 429,
        message: data.message || 'Limite mensual de tokens alcanzado.',
        usage: data.usage,
      };
    }

    const errorMsg = data.message || data.error || 'Error contactando a Andres.';
    throw new Error(errorMsg);
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

export const sendMessageToAI = async (message, history = [], practiceMode = 'conversation') => {
  if (useDirectGemini) {
    return await sendMessageDirectly(message, history);
  }

  return await sendMessageToEdgeFunction(message, history, practiceMode);
};
