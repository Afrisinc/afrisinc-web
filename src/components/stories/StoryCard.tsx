import { Link } from "react-router-dom";
import { BookOpen, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StoryPublic } from "@/types/story";
import { readingMinutes } from "@/types/story";
import { formatDistanceToNow } from "date-fns";

interface StoryCardProps {
  story: StoryPublic;
  variant?: "default" | "featured";
}

function StatusPill({
  status,
  className = "",
}: {
  status: NonNullable<StoryPublic["status"]>;
  className?: string;
}) {
  if (status === "ongoing") {
    return (
      <span className={`flex items-center gap-1.5 text-xs font-medium ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
        Ongoing
      </span>
    );
  }
  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium ${className}`}>
      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
      Complete
    </span>
  );
}

export function StoryCard({ story, variant = "default" }: StoryCardProps) {
  const episodeCount = story.publishedEpisodeCount ?? story.episodes?.length ?? 0;
  const totalMinutes = story.episodes?.reduce((sum, ep) => sum + readingMinutes(ep.wordCount), 0);
  const updatedAgo = formatDistanceToNow(new Date(story.updatedAt), { addSuffix: true });

  if (variant === "featured") {
    return (
      <Link to={`/media/stories/${story.id}`} className="group block">
        <article className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center rounded-2xl border border-border/50 bg-card p-3 sm:p-4 lg:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
          <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-xl bg-muted flex items-center justify-center">
            {story.coverImageUrl ? (
              <img
                src={story.coverImageUrl}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <BookOpen className="w-10 h-10 text-muted-foreground/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground shadow-sm">
              Latest Series
            </Badge>
          </div>

          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {story.genre && (
                <Badge
                  variant="outline"
                  className="text-xs font-medium bg-primary/5 text-primary border-primary/30"
                >
                  {story.genre}
                </Badge>
              )}
              {story.tone && <span className="text-xs text-muted-foreground italic">{story.tone}</span>}
              {story.status && <StatusPill status={story.status} className="ml-auto text-muted-foreground" />}
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
              {story.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">{story.premise}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {episodeCount} episode{episodeCount === 1 ? "" : "s"}
              </span>
              {typeof totalMinutes === "number" && totalMinutes > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{totalMinutes} min total</span>
                </>
              )}
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Start reading
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/media/stories/${story.id}`} className="group block h-full">
      <article className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border border-border/50">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted flex items-center justify-center">
          {story.coverImageUrl ? (
            <img
              src={story.coverImageUrl}
              alt={story.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <BookOpen className="w-10 h-10 text-muted-foreground/40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

          {story.genre && (
            <Badge
              variant="outline"
              className="absolute top-3 left-3 backdrop-blur-sm bg-background/90 text-xs font-medium border-primary/30 text-primary"
            >
              {story.genre}
            </Badge>
          )}

          {story.status && (
            <StatusPill
              status={story.status}
              className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-foreground"
            />
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
            <BookOpen className="w-3.5 h-3.5" />
            {episodeCount} episode{episodeCount === 1 ? "" : "s"}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
            {story.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">
            {story.premise}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <span className="truncate">{story.tone ?? `Updated ${updatedAgo}`}</span>
            <span className="flex items-center gap-1 font-medium text-primary flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
              Read
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
