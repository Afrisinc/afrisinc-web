// Stories Service - reads the public, published-only episodes from content-service.
// Never authenticated: only PUBLISHED episodes can ever come back from these endpoints.

import type { StoryPublic, StoryPublicPage } from "@/types/story";
import { getRuntimeConfig } from "@/lib/config";
import { getReaderDeviceId } from "@/lib/readerDevice";

interface Envelope<T> {
  success: boolean;
  resp_msg: string;
  resp_code: number;
  data: T;
}

export async function fetchStories(params: { page?: number; limit?: number } = {}): Promise<StoryPublicPage> {
  const config = getRuntimeConfig();
  const searchParams = new URLSearchParams();
  searchParams.append("page", String(params.page ?? 1));
  searchParams.append("limit", String(params.limit ?? 12));

  const response = await fetch(`${config.serverUrl}/media/stories/public?${searchParams.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stories: ${response.status}`);
  }

  const body: Envelope<StoryPublicPage> = await response.json();
  return body.data;
}

/**
 * Sends this browser's anonymous reader id so the backend can attach
 * viewed/completed flags to each episode — "already read" and "continue
 * reading" both come from this, with no login involved.
 */
export async function fetchStory(id: string): Promise<StoryPublic | null> {
  const config = getRuntimeConfig();
  const response = await fetch(`${config.serverUrl}/media/stories/public/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-reader-device-id": getReaderDeviceId() },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch story: ${response.status}`);
  }

  const body: Envelope<StoryPublic> = await response.json();
  return body.data;
}

/**
 * Fire-and-forget pings. Never block or break the reading experience — a
 * failed ping just means one fewer count, not a broken page.
 */
async function ping(path: string): Promise<void> {
  try {
    const config = getRuntimeConfig();
    await fetch(`${config.serverUrl}${path}`, {
      method: "POST",
      headers: { "x-reader-device-id": getReaderDeviceId() },
    });
  } catch {
    // Analytics-only signal — never surface this to the reader.
  }
}

/** Call once when an episode's reader page mounts. */
export function markEpisodeView(storyId: string, episodeNumber: number): void {
  void ping(`/media/stories/public/${encodeURIComponent(storyId)}/episodes/${episodeNumber}/view`);
}

/** Call once when the reader scrolls an episode to its end. */
export function markEpisodeRead(storyId: string, episodeNumber: number): void {
  void ping(`/media/stories/public/${encodeURIComponent(storyId)}/episodes/${episodeNumber}/read`);
}
