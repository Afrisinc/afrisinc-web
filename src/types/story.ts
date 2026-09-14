export interface StoryPublic {
  id: string;
  title: string;
  premise: string;
  genre: string | null;
  language: string;
  audience: string | null;
  tone: string | null;
  coverImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  /** Whether the series has wrapped or is still releasing new episodes. Unknown when omitted. */
  status?: "ongoing" | "completed";
  /** Only present on the list fetch — the single-story fetch has `episodes` instead. */
  publishedEpisodeCount?: number;
  /** Only present on the single-story fetch — the list endpoint omits it. */
  episodes?: StoryEpisodePublic[];
}

export interface StoryEpisodePublic {
  id: string;
  episodeNumber: number;
  title: string;
  hook: string;
  body: string;
  cliffhanger: string | null;
  themes: string[];
  contentWarnings: string[];
  wordCount: number;
  publishedAt: string;
  /** Present only on the single-story fetch, and only once a device id was sent. */
  viewed?: boolean;
  completed?: boolean;
}

export interface StoryPublicPage {
  items: StoryPublic[];
  total: number;
  page: number;
  limit: number;
}

export function readingMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}
