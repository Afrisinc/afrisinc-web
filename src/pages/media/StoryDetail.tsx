import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useStory } from "@/hooks/useStories";
import { NoIndexMeta } from "@/components/seo/NoIndexMeta";
import { readingMinutes } from "@/types/story";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Languages,
  Sparkles,
  Users,
} from "lucide-react";

const StoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: story, isLoading } = useStory(id);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-6 pt-32 pb-20 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-24 w-full max-w-2xl" />
          <Skeleton className="h-40 w-full" />
        </div>
      </PublicLayout>
    );
  }

  if (!story) {
    return (
      <PublicLayout>
        <NoIndexMeta title="Story Not Found" />
        <div className="container mx-auto px-6 pt-32 pb-20 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground opacity-40 mx-auto mb-4" />
          <h1 className="heading-section text-foreground mb-2">Story not found</h1>
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

  const episodes = story.episodes ?? [];
  const totalMinutes = episodes.reduce((sum, ep) => sum + readingMinutes(ep.wordCount), 0);
  const firstEpisode = episodes[0];

  // No device data yet (first-ever load) reads as "nothing started" — same CTA
  // as a brand-new reader, which is the correct default either way.
  const firstUnread = episodes.find((ep) => !ep.completed);
  const hasStarted = episodes.some((ep) => ep.viewed || ep.completed);
  const continueTarget = firstUnread ?? firstEpisode;
  const ctaLabel = !hasStarted
    ? "Start Reading — Episode 1"
    : firstUnread
      ? `Continue Reading — Episode ${firstUnread.episodeNumber}`
      : "Read Again — Episode 1";

  return (
    <PublicLayout>
      <Helmet>
        <title>{story.title} | Afrisinc Stories</title>
        <meta name="description" content={story.premise} />
        <meta property="og:title" content={`${story.title} | Afrisinc Stories`} />
        <meta property="og:description" content={story.premise} />
        <meta property="og:type" content="website" />
        {story.coverImageUrl && <meta property="og:image" content={story.coverImageUrl} />}
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-foreground text-background">
        {story.coverImageUrl && (
          <>
            <img
              src={story.coverImageUrl}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/85 to-foreground/60" />
          </>
        )}

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-sm text-background/60 mb-6">
            <Link
              to="/media/stories"
              className="hover:text-background transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Stories
            </Link>
            <span>/</span>
            <span className="text-background line-clamp-1">{story.title}</span>
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {story.genre && (
                <Badge className="text-sm font-medium bg-primary text-primary-foreground border-transparent">
                  {story.genre}
                </Badge>
              )}
              {story.status === "ongoing" && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-background/70">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  New episodes releasing
                </span>
              )}
              {story.status === "completed" && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-background/70">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Complete series
                </span>
              )}
            </div>
            <h1 className="heading-hero text-background mb-6 tracking-tight leading-[1.1]">{story.title}</h1>
            <p className="text-subtitle text-background/70 leading-relaxed mb-8">{story.premise}</p>

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-background/60 mb-8">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {episodes.length} episode{episodes.length === 1 ? "" : "s"}
              </span>
              {totalMinutes > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {totalMinutes} min total
                </span>
              )}
              {story.audience && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {story.audience}
                </span>
              )}
              {story.tone && (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {story.tone}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Languages className="w-4 h-4" />
                {story.language.toUpperCase()}
              </span>
            </div>

            {continueTarget && (
              <Button size="lg" className="group shadow-primary" asChild>
                <Link to={`/media/stories/${story.id}/episode/${continueTarget.episodeNumber}`}>
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── Episodes ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-subsection text-foreground tracking-tight">
              {episodes.length} Episode{episodes.length === 1 ? "" : "s"}
            </h2>
          </div>

          {episodes.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center border border-dashed border-border rounded-xl">
              <BookOpen className="h-10 w-10 text-muted-foreground opacity-40" />
              <p className="text-sm text-muted-foreground">
                The first episode is being written — check back soon.
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {episodes.map((episode) => (
                <AccordionItem
                  key={episode.id}
                  value={episode.id}
                  className="border border-border/60 rounded-xl px-5 bg-card data-[state=open]:border-primary/30 data-[state=open]:shadow-card transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline py-5 [&>svg]:text-muted-foreground">
                    <div className="flex items-center gap-4 text-left flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                        {episode.episodeNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-foreground leading-snug truncate">
                          {episode.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                          {readingMinutes(episode.wordCount)} min read
                          {episode.completed && (
                            <span className="inline-flex items-center gap-1 text-primary">
                              <CheckCircle2 className="w-3 h-3" />
                              Read
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 pl-14">{episode.hook}</p>
                    {episode.themes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5 pl-14">
                        {episode.themes.map((theme) => (
                          <Badge key={theme} variant="outline" className="text-xs font-normal">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="pl-14">
                      <Button variant="outline" size="sm" className="group" asChild>
                        <Link to={`/media/stories/${story.id}/episode/${episode.episodeNumber}`}>
                          Read Episode {episode.episodeNumber}
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default StoryDetailPage;
