import { Play } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/data/media";

interface VideoCardProps {
  video: VideoItem;
  className?: string;
}

/** Video tile. Becomes an external link when `video.href` is set; otherwise a static preview. */
export function VideoCard({ video, className }: VideoCardProps) {
  const interactive = Boolean(video.href);

  const body = (
    <article className="h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <SmartImage
          src={video.thumbnail}
          alt=""
          width={480}
          imageClassName={cn(interactive && "group-hover:scale-[1.03] transition-transform duration-500")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" aria-hidden />

        <span
          aria-hidden
          className={cn(
            "absolute left-4 bottom-4 w-11 h-11 rounded-full bg-background/95 text-foreground shadow-lg flex items-center justify-center transition-all duration-300",
            interactive && "group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
          )}
        >
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        </span>

        <span className="absolute bottom-4 right-4 px-2 py-0.5 text-xs font-semibold tabular-nums rounded-md bg-black/70 text-white backdrop-blur-sm">
          <span className="sr-only">Duration </span>
          {video.duration}
        </span>
      </div>

      <div className="pt-4">
        <h3
          className={cn(
            "text-lg font-bold leading-snug text-foreground line-clamp-2",
            interactive && "group-hover:text-primary transition-colors"
          )}
        >
          {video.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{video.views}</p>
      </div>
    </article>
  );

  if (!interactive) return <div className={className}>{body}</div>;

  return (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className
      )}
    >
      {body}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
