import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStories, useStory } from "@/hooks/useStories";
import { useReadCompletion, useScrollProgress } from "@/hooks/useReadingProgress";
import { StoryCard } from "@/components/stories/StoryCard";
import { NoIndexMeta } from "@/components/seo/NoIndexMeta";
import { markEpisodeRead, markEpisodeView } from "@/services/storiesService";
import { readingMinutes } from "@/types/story";
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpen, MessageCircle, PartyPopper } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";

/** Marks the episode viewed once per mount — the backend dedupes per device beyond that. */
function useEpisodeViewTracking(storyId: string | undefined, episodeNumber: number) {
  useEffect(() => {
    if (!storyId || !Number.isFinite(episodeNumber) || episodeNumber <= 0) return;
    markEpisodeView(storyId, episodeNumber);
  }, [storyId, episodeNumber]);
}

const StoryReaderPage = () => {
  const { id, episodeNumber } = useParams<{ id: string; episodeNumber: string }>();
  const { data: story, isLoading } = useStory(id);
  const { data: moreStoriesData } = useStories({ limit: 6 });
  const progress = useScrollProgress();
  const number = Number(episodeNumber);
  useEpisodeViewTracking(id, number);
  useReadCompletion(
    id && Number.isFinite(number) && number > 0 ? `story-read:${id}:${number}` : undefined,
    progress,
    () => id && markEpisodeRead(id, number)
  );

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-6 pt-32 pb-20 max-w-2xl space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </PublicLayout>
    );
  }

  const episodes = story?.episodes ?? [];
  const index = episodes.findIndex((item) => item.episodeNumber === number);
  const episode = index >= 0 ? episodes[index] : undefined;

  if (!story || !episode) {
    return (
      <PublicLayout>
        <NoIndexMeta title="Episode Not Found" />
        <div className="container mx-auto px-6 pt-32 pb-20 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground opacity-40 mx-auto mb-4" />
          <h1 className="heading-section text-foreground mb-2">Episode not found</h1>
          <p className="text-muted-foreground mb-6">
            It may not be published yet, or the link is out of date.
          </p>
          <Link to="/media/stories" className="text-primary font-medium hover:underline">
            Back to Stories
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const previous = index > 0 ? episodes[index - 1] : undefined;
  const next = index < episodes.length - 1 ? episodes[index + 1] : undefined;
  const isFinalPublishedEpisode = !next;
  const moreStories = (moreStoriesData?.items ?? []).filter((s) => s.id !== story.id).slice(0, 2);

  const handleShare = () => {
    const url = window.location.href;
    window.open(
      `https://wa.me/send?text=${encodeURIComponent(`${story.title} — ${episode.title} ${url}`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <PublicLayout>
      <Helmet>
        <title>{`${story.title} — Episode ${episode.episodeNumber}: ${episode.title} | Afrisinc Stories`}</title>
        <meta name="description" content={episode.hook} />
        <meta
          property="og:title"
          content={`${story.title} — Episode ${episode.episodeNumber}: ${episode.title}`}
        />
        <meta property="og:description" content={episode.hook} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-border/50 z-50">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to={`/media/stories/${story.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 min-w-0"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{story.title}</span>
            </Link>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              Episode {episode.episodeNumber} of {episodes.length}
            </span>
          </div>

          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Episode {episode.episodeNumber}
          </Badge>

          <h1 className="heading-hero text-foreground mb-4 tracking-tight leading-[1.1]">{episode.title}</h1>

          <p className="text-lg text-muted-foreground italic mb-6 leading-relaxed">{episode.hook}</p>

          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground">
              {readingMinutes(episode.wordCount)} min read · {episode.wordCount.toLocaleString()} words
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/5 hover:border-[#25D366]/50"
              onClick={handleShare}
            >
              <MessageCircle className="w-4 h-4" />
              Share
            </Button>
          </div>

          {episode.contentWarnings.length > 0 && (
            <div className="mb-10 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              {episode.contentWarnings.join(", ")}
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line leading-[1.8] text-foreground/90">
            {episode.body}
          </div>

          {episode.cliffhanger && (
            <p className="mt-10 border-t border-border pt-8 text-lg font-medium italic text-foreground">
              {episode.cliffhanger}
            </p>
          )}

          {episode.themes.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {episode.themes.map((theme) => (
                <Badge key={theme} variant="outline" className="text-xs font-normal">
                  {theme}
                </Badge>
              ))}
            </div>
          )}

          {/* ── Continue reading ────────────────────────────────────────────── */}
          <div className="mt-16 pt-10 border-t border-border">
            {next ? (
              <Link
                to={`/media/stories/${story.id}/episode/${next.episodeNumber}`}
                className="group flex items-center gap-5 rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-card transition-all duration-300 p-4 sm:p-5"
              >
                {story.coverImageUrl ? (
                  <SmartImage
                    src={story.coverImageUrl}
                    alt=""
                    width={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-muted-foreground/40" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary mb-1">
                    Up Next · Episode {next.episodeNumber}
                  </p>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {next.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{next.hook}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ) : (
              <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 text-center">
                {story.status === "ongoing" ? (
                  <>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      You're all caught up
                    </span>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Episode {episode.episodeNumber} is the latest in{" "}
                      <span className="text-foreground font-medium">{story.title}</span>. New episodes are
                      still being written — check back soon for the next one.
                    </p>
                  </>
                ) : (
                  <>
                    <PartyPopper className="w-6 h-6 text-primary mx-auto mb-3" />
                    <p className="font-bold text-foreground mb-1">The End</p>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      That's the final episode of{" "}
                      <span className="text-foreground font-medium">{story.title}</span>. Thanks for reading
                      the whole series.
                    </p>
                  </>
                )}
              </div>
            )}

            {isFinalPublishedEpisode && moreStories.length > 0 && (
              <div className="mt-10">
                <p className="text-sm font-semibold text-foreground mb-4">More stories to explore</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {moreStories.map((s) => (
                    <StoryCard key={s.id} story={s} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {previous ? (
              <Link to={`/media/stories/${story.id}/episode/${previous.episodeNumber}`}>
                <Button variant="outline" className="w-full justify-start group">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="truncate">Episode {previous.episodeNumber}</span>
                </Button>
              </Link>
            ) : (
              <Link to={`/media/stories/${story.id}`}>
                <Button variant="outline" className="w-full justify-start group">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="truncate">All Episodes</span>
                </Button>
              </Link>
            )}
            <Link to={`/media/stories/${story.id}`}>
              <Button variant="outline" className="w-full justify-end group">
                <span className="truncate">Back to Story</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default StoryReaderPage;
