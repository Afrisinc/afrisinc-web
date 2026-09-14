import { useQuery } from "@tanstack/react-query";
import { fetchStories, fetchStory } from "@/services/storiesService";

export function useStories(params: { page?: number; limit?: number } = {}) {
  return useQuery({
    queryKey: ["stories", params],
    queryFn: () => fetchStories(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useStory(id: string | undefined) {
  return useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchStory(id as string),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
