import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

type PracticeMode =
  | "pronunciation"
  | "daily_conversation"
  | "vocabulary"
  | "interview_practice"
  | "repeat_after_me";

type ChatHistoryItem = {
  sender?: string;
  text?: string;
};

type GeminiUsage = {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
];

const ALLOWED_MODES: PracticeMode[] = [
  "pronunciation",
  "daily_conversation",
  "vocabulary",
  "interview_practice",
  "repeat_after_me",
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizePracticeMode(value: unknown): PracticeMode {
  return typeof value === "string" && ALLOWED_MODES.includes(value as PracticeMode)
    ? value as PracticeMode
    : "daily_conversation";
}

function isRetryable(status: number, errorMsg: string) {
  const retryableStatuses = [429, 500, 502, 503, 504];
  if (retryableStatuses.includes(status)) return true;

  const lowMsg = errorMsg.toLowerCase();
  return (
    lowMsg.includes("high demand") ||
    lowMsg.includes("try again later") ||
    lowMsg.includes("temporarily") ||
    lowMsg.includes("overloaded")
  );
}

function getModeInstruction(mode: PracticeMode) {
  switch (mode) {
    case "pronunciation":
      return "Focus strictly on pronunciation. Provide a short English phrase and ask the user to say it. Evaluate the transcription for potential phonetic errors. Be encouraging but precise.";
    case "daily_conversation":
      return "Engage in a friendly, natural daily conversation. Ask simple questions about daily life, hobbies, or travel. Keep it conversational and interactive.";
    case "vocabulary":
      return "Teach new English vocabulary. Introduce one specific word per message, provide its meaning simply, and give a usage example. Ask the user to try using it.";
    case "interview_practice":
      return "Simulate a professional job interview in English. Ask standard interview questions one by one. Provide brief feedback on the user's answers and language use.";
    case "repeat_after_me":
      return "Direct repetition mode. Provide exactly one short English sentence and ask the user to repeat it. Do not engage in side conversation.";
  }
}

function buildUsage(monthlyUsed: number, monthlyLimit: number, usage: GeminiUsage = {}) {
  const totalTokens = usage.totalTokenCount ?? 0;
  const updatedMonthlyUsed = monthlyUsed + totalTokens;

  return {
    totalTokens,
    monthlyUsed: updatedMonthlyUsed,
    monthlyLimit,
    percentageUsed: (updatedMonthlyUsed / monthlyLimit) * 100,
    isLimitReached: updatedMonthlyUsed >= monthlyLimit,
    resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().slice(0, 10),
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const body = await req.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const clientFingerprint = typeof body.clientFingerprint === "string" ? body.clientFingerprint : "unknown";
    const history: ChatHistoryItem[] = Array.isArray(body.history) ? body.history : [];
    const practiceMode = normalizePracticeMode(body.practiceMode);

    if (!message) {
      return new Response(JSON.stringify({ error: "MISSING_MESSAGE", message: "Message is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: config, error: configError } = await supabaseClient
      .from("andres_ai_usage_config")
      .select("*")
      .eq("id", "global")
      .single();

    if (configError || !config?.is_ai_enabled) {
      return new Response(JSON.stringify({ error: "AI_DISABLED", message: "La IA esta pausada temporalmente." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (message.length > config.max_message_chars) {
      return new Response(JSON.stringify({ error: "MESSAGE_TOO_LONG", message: "Mensaje demasiado largo." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: usageData } = await supabaseClient
      .from("andres_ai_token_usage")
      .select("total_tokens")
      .eq("usage_month", currentMonth);

    const totalUsedThisMonth = (usageData || []).reduce(
      (acc: number, item: { total_tokens: number }) => acc + item.total_tokens,
      0,
    );
    const monthlyLimit = config.monthly_token_limit || 1000000;

    if (totalUsedThisMonth >= monthlyLimit) {
      return new Response(JSON.stringify({
        error: "MONTHLY_TOKEN_LIMIT_REACHED",
        message: "Limite mensual alcanzado.",
        usage: buildUsage(totalUsedThisMonth, monthlyLimit),
      }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) throw new Error("GEMINI_API_KEY_NOT_CONFIGURED");

    const modeInstruction = getModeInstruction(practiceMode);
    const systemInstruction = `
You are an expert, friendly English tutor named "Andres".
CURRENT PRACTICE MODE: ${practiceMode.replace(/_/g, " ").toUpperCase()}.
Specific instructions for this mode: ${modeInstruction}

GENERAL RULES:
1. Keep your responses very short: 1-3 sentences max.
2. Users speak through a microphone. Transcriptions might show "1" instead of "one". Interpret simple digits as words.
3. If input is unclear or repetitive, ask the user to repeat politely.
4. Be encouraging and use plain text only.
`;

    const sanitizedHistory = history
      .slice(-10)
      .filter((item) => item.text)
      .map((item) => ({
        role: item.sender === "user" ? "user" : "model",
        parts: [{ text: item.text ?? "" }],
      }));

    const geminiBody = {
      contents: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: `Understood. I am Andres. I will help with ${practiceMode.replace(/_/g, " ")}.` }] },
        ...sanitizedHistory,
        { role: "user", parts: [{ text: message }] },
      ],
      generationConfig: {
        maxOutputTokens: config.max_output_tokens,
        temperature: 0.7,
      },
    };

    for (const model of GEMINI_MODELS) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`[Gemini-Chat] mode=${practiceMode} model=${model} attempt=${attempt}`);

          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
          const response = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiBody),
          });

          const data = await response.json();

          if (!response.ok) {
            const errorMsg = data?.error?.message || "Unknown Gemini error";
            if (attempt === 1 && isRetryable(response.status, errorMsg)) {
              await sleep(800);
              continue;
            }

            if (isRetryable(response.status, errorMsg)) break;

            return new Response(JSON.stringify({ error: "GEMINI_API_ERROR", message: errorMsg }), {
              status: response.status,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
          const usage: GeminiUsage = data.usageMetadata || {};
          const today = new Date().toISOString().slice(0, 10);

          await supabaseClient.rpc("andres_increment_usage", {
            p_month: currentMonth,
            p_date: today,
            p_fingerprint: clientFingerprint,
            p_input: usage.promptTokenCount ?? 0,
            p_output: usage.candidatesTokenCount ?? 0,
            p_total: usage.totalTokenCount ?? 0,
          });

          return new Response(JSON.stringify({
            responseText,
            usage: buildUsage(totalUsedThisMonth, monthlyLimit, usage),
          }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("[Gemini-Chat] Exception:", error);
          if (attempt === 1) {
            await sleep(800);
            continue;
          }
          break;
        }
      }
    }

    return new Response(JSON.stringify({
      error: "AI_TEMPORARILY_BUSY",
      message: "La IA esta temporalmente ocupada. Intenta nuevamente en unos segundos.",
    }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Gemini-Chat] Critical Exception:", message);

    return new Response(JSON.stringify({ error: "INTERNAL_ERROR", message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
