import { ArrowUpRight, Clock, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PodcastEpisode } from "@/data/media";

interface PodcastEpisodeRowProps {
  episode: PodcastEpisode;
  className?: string;
}

/** One episode in a podcast list. Becomes an external link when `episode.href` is set. */
export function PodcastEpisodeRow({ episode, className }: PodcastEpisodeRowProps) {
  const interactive = Boolean(episode.href);

  const body = (
    <div className="relative grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-x-5 md:gap-x-8 gap-y-2 py-6 md:py-7">
      <span
        aria-hidden
        className="font-display italic text-3xl md:text-4xl leading-none text-muted-foreground/50 tabular-nums w-12 md:w-16 transition-colors group-hover:text-primary"
      >
        {String(episode.number).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-1.5">
          Episode {episode.number}
        </p>
        <h3
          className={cn(
            "text-lg font-bold leading-snug text-foreground",
            interactive && "group-hover:text-primary transition-colors"
          )}
        >
          {episode.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
          <span className="truncate">
            {episode.guest}, {episode.guestRole}
          </span>
        </p>
      </div>

      <div className="col-start-2 sm:col-start-auto flex items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 tabular-nums">
          <Clock className="w-3.5 h-3.5" aria-hidden />
          {episode.durationMinutes} min
        </span>
        {interactive && (
          <ArrowUpRight
            aria-hidden
            className="hidden sm:block w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          />
        )}
      </div>
    </div>
  );

  if (!interactive) return <div className={cn("group", className)}>{body}</div>;

  return (
    <a
      href={episode.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {body}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
