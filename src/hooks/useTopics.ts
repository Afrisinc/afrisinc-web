import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Topic {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export const useTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topics")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Topic[];
    },
  });
};
