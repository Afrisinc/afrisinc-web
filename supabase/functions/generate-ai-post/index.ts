import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GeneratePostRequest {
  topic: string;
  keywords?: string;
  link?: string;
  platform: "facebook" | "instagram" | "both";
  formMode?: "test" | "production";
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header and validate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get user from session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;
    const body: GeneratePostRequest = await req.json();

    // Validate required fields
    if (!body.topic) {
      return new Response(
        JSON.stringify({ error: "Topic is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create draft post record first
    const { data: post, error: insertError } = await supabase
      .from("ai_posts")
      .insert({
        user_id: userId,
        topic_name: body.topic,
        keywords: body.keywords || null,
        link: body.link || null,
        platform: body.platform || "both",
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create post record" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call external AI agent API
    const automationUrl = Deno.env.get("AUTOMATION_PROD_URL");
    if (!automationUrl) {
      // Update post status to failed
      await supabase
        .from("ai_posts")
        .update({ status: "failed", error_message: "AI service not configured" })
        .eq("id", post.id);

      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiPayload = {
      "Topic": body.topic,
      "Keywords or Hashtags (optional)": body.keywords || "",
      "Link (optional)": body.link || "",
      "submittedAt": new Date().toISOString(),
      "formMode": body.formMode || "test"
    };

    console.log("Calling AI agent with payload:", aiPayload);

    const aiResponse = await fetch(automationUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aiPayload),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI agent error:", errorText);
      
      await supabase
        .from("ai_posts")
        .update({ 
          status: "failed", 
          error_message: `AI service error: ${aiResponse.status}` 
        })
        .eq("id", post.id);

      return new Response(
        JSON.stringify({ error: "AI service error", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    console.log("AI agent response:", aiData);

    // Extract post ID from response
    const externalPostId = aiData.data?.[0]?.post_id || aiData.data?.[0]?.id || null;

    // Update post with success
    const { data: updatedPost, error: updateError } = await supabase
      .from("ai_posts")
      .update({
        status: "published",
        external_post_id: externalPostId,
        external_response: aiData,
        published_at: new Date().toISOString(),
      })
      .eq("id", post.id)
      .select()
      .single();

    if (updateError) {
      console.error("Update error:", updateError);
    }

    // Log the activity
    await supabase.from("activity_logs").insert({
      user_id: userId,
      action: "ai_post_created",
      entity_type: "ai_post",
      entity_id: post.id,
      metadata: { topic: body.topic, platform: body.platform }
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        post: updatedPost || post,
        aiResponse: aiData 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
