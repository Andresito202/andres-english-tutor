import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

const DEFAULT_MODEL_CHAIN = ["gemini-2.0-flash", "gemini-1.5-flash"];

const buildUsage = (
  monthlyUsed: number,
  monthlyLimit: number,
  totalTokens = 0,
  isAiEnabled = true,
) => {
  const updatedMonthlyUsed = monthlyUsed + totalTokens;

  return {
    totalTokens,
    monthlyUsed: updatedMonthlyUsed,
    monthlyLimit,
    percentageUsed: Math.round((updatedMonthlyUsed / monthlyLimit) * 100),
    isAiEnabled,
    isLimitReached: !isAiEnabled || updatedMonthlyUsed >= monthlyLimit,
    resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().slice(0, 10),
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { message, clientFingerprint, history = [] } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "MESSAGE_REQUIRED", message: "Message is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: config } = await supabaseClient
      .from("andres_ai_usage_config")
      .select("*")
      .eq("id", "global")
      .single();

    const monthlyLimit = config?.monthly_token_limit || 1000000;

    if (!config || !config.is_ai_enabled) {
      return new Response(JSON.stringify({
        error: "AI_DISABLED",
        message: "IA temporalmente desactivada.",
        usage: buildUsage(0, monthlyLimit, 0, false),
      }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (message.length > config.max_message_chars) {
      return new Response(JSON.stringify({
        error: "MESSAGE_TOO_LONG",
        message: "Mensaje demasiado largo.",
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: usageData } = await supabaseClient
      .from("andres_ai_token_usage")
      .select("total_tokens")
      .eq("usage_month", currentMonth);

    const totalUsedThisMonth = (usageData || []).reduce((acc, item) => acc + item.total_tokens, 0);

    if (totalUsedThisMonth >= monthlyLimit) {
      return new Response(JSON.stringify({
        error: "MONTHLY_TOKEN_LIMIT_REACHED",
        message: "Se alcanzo el limite mensual gratuito de practica con IA. Puedes seguir usando modulos, audio y quiz.",
        usage: buildUsage(totalUsedThisMonth, monthlyLimit),
      }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY not configured in Supabase Secrets.");
    }

    const configuredModel = Deno.env.get("GEMINI_MODEL");
    const modelChain = [configuredModel, ...DEFAULT_MODEL_CHAIN]
      .filter((model): model is string => Boolean(model))
      .filter((model, index, models) => models.indexOf(model) === index);

    const contents = [
      { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
      { role: "model", parts: [{ text: "Understood. I will act as the friendly English tutor Andres." }] },
      ...history.map((item: { sender: string; text: string }) => ({
        role: item.sender === "user" ? "user" : "model",
        parts: [{ text: item.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    let geminiData = null;
    let selectedModel = "";
    let lastGeminiError = null;

    for (const model of modelChain) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
      const geminiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: config.max_output_tokens,
            temperature: 0.7,
          },
        }),
      });

      const candidateData = await geminiResponse.json();

      if (geminiResponse.ok) {
        geminiData = candidateData;
        selectedModel = model;
        break;
      }

      lastGeminiError = candidateData;
      if (geminiResponse.status === 401 || geminiResponse.status === 403) break;
    }

    if (!geminiData) {
      console.error("Gemini Error:", lastGeminiError);
      throw new Error("Error calling Gemini API");
    }

    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
    const usage = geminiData.usageMetadata || {
      promptTokenCount: 0,
      candidatesTokenCount: 0,
      totalTokenCount: 0,
    };

    const today = new Date().toISOString().slice(0, 10);
    const { error: upsertError } = await supabaseClient.rpc("andres_increment_usage", {
      p_month: currentMonth,
      p_date: today,
      p_fingerprint: clientFingerprint,
      p_input: usage.promptTokenCount,
      p_output: usage.candidatesTokenCount,
      p_total: usage.totalTokenCount,
    });

    if (upsertError) {
      console.error("Usage recording failed:", upsertError);
    }

    return new Response(JSON.stringify({
      responseText,
      model: selectedModel,
      usage: buildUsage(totalUsedThisMonth, monthlyLimit, usage.totalTokenCount),
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
