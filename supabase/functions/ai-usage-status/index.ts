import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    const { data: config } = await supabaseClient
      .from("andres_ai_usage_config")
      .select("*")
      .eq("id", "global")
      .single();

    const monthlyLimit = config?.monthly_token_limit || 1000000;
    const isAiEnabled = config?.is_ai_enabled ?? true;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const { data: usageData } = await supabaseClient
      .from("andres_ai_token_usage")
      .select("total_tokens")
      .eq("usage_month", currentMonth);

    const totalUsedThisMonth = (usageData || []).reduce((acc, item) => acc + item.total_tokens, 0);

    const stats = {
      monthlyLimit,
      monthlyUsed: totalUsedThisMonth,
      monthlyRemaining: Math.max(0, monthlyLimit - totalUsedThisMonth),
      percentageUsed: (totalUsedThisMonth / monthlyLimit) * 100,
      isAiEnabled,
      isLimitReached: !isAiEnabled || totalUsedThisMonth >= monthlyLimit,
      resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().slice(0, 10),
    };

    return new Response(JSON.stringify(stats), {
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
