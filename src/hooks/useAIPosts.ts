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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-ai-post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate post");
      }

      return response.json();
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
