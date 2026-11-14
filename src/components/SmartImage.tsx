import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { imageSources } from "@/lib/images";

interface SmartImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  fallbackSrc?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

export function SmartImage({
  src,
  alt,
  width,
  fallbackSrc,
  priority = false,
  className,
  imageClassName,
}: SmartImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<string[]>([]);

  const activeSrc = [src, fallbackSrc].find(
    (candidate): candidate is string => Boolean(candidate) && !failedSrcs.includes(candidate as string)
  );
  const loaded = Boolean(activeSrc) && loadedSrc === activeSrc;

  if (!activeSrc) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={cn(
          "relative flex h-full w-full items-center justify-center overflow-hidden bg-muted",
          className
        )}
      >
        <ImageOff className="h-2/5 max-h-8 w-2/5 max-w-8 text-muted-foreground/40" aria-hidden />
      </div>
    );
  }

  const sources = imageSources(activeSrc, width);
  const priorityHints = priority ? { fetchpriority: "high" } : {};

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <img
        key={activeSrc}
        src={sources.src}
        srcSet={sources.srcSet}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoadedSrc(activeSrc)}
        onError={() => setFailedSrcs((previous) => [...previous, activeSrc])}
        className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
        {...priorityHints}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-muted transition-opacity duration-500 motion-reduce:transition-none",
          loaded ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="h-full w-full animate-pulse bg-muted-foreground/10" />
      </div>
    </div>
  );
}
