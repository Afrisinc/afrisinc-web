import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardGridSkeletonProps {
  count?: number;
  className?: string;
}

export const MEDIA_GRID_CLASS = "grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6";

export function CardGridSkeleton({ count = 6, className }: CardGridSkeletonProps) {
  return (
    <div className={cn(MEDIA_GRID_CLASS, className)} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl overflow-hidden border border-border/50">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
