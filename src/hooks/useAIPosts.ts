import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AIPost {
  id: string;
  user_id: string;
  topic_id: string | null;
  topic_name: string;
  keywords: string | null;
  link: string | null;
  status: "draft" | "pending" | "published" | "failed";
  platform: "facebook" | "instagram" | "both";
  external_post_id: string | null;
  external_response: Record<string, unknown> | null;
  error_message: string | null;
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useAIPosts = () => {
  return useQuery({
    queryKey: ["ai-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_posts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as AIPost[];
    },
  });
};

export const useGenerateAIPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (params: {
      topic: string;
      keywords?: string;
      link?: string;
      platform: "facebook" | "instagram" | "both";
      formMode?: "test" | "production";
    }) => {
      // Get token from localStorage (set during login)
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const { getRuntimeConfig } = await import("@/lib/config");
      const config = getRuntimeConfig();

      // Create an AbortController with 1 minute (60000ms) timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      try {
        const response = await fetch(
          `${config.serverUrl}/content/ai/generate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(params),
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.resp_msg || error.error || "Failed to generate post");
        }

        return response.json();
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error("Request timeout - AI generation took too long (max 1 minute)");
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-posts"] });
      toast({
        title: "Post Generated!",
        description: "Your AI content has been created and posted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Generate",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
