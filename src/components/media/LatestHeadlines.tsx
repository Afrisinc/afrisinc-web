import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ARTICLE_TYPE_LABELS, articleHref } from "@/components/articles/articleMeta";
import type { Article } from "@/types/article";
import { cn } from "@/lib/utils";

interface LatestHeadlinesProps {
  articles: Article[];
  isLoading?: boolean;
  title?: string;
  viewAllHref?: string;
  className?: string;
}

/** Numbered "most recent" rail that sits beside the lead story. */
export function LatestHeadlines({
  articles,
  isLoading,
  title = "Latest",
  viewAllHref = "/media/articles",
  className,
}: LatestHeadlinesProps) {
  return (
    <aside aria-label={title} className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between pb-4 border-b border-foreground">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
          <span className="relative flex w-2 h-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping motion-reduce:hidden" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
          </span>
          {title}
        </h3>
        <Link
          to={viewAllHref}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
          <ArrowRight aria-hidden className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {isLoading ? (
        <ol className="divide-y divide-border" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="py-5 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </li>
          ))}
        </ol>
      ) : (
        <ol className="divide-y divide-border">
          {articles.map((article, index) => (
            <li key={article.id}>
              <Link
                to={articleHref(article)}
                className="group grid grid-cols-[auto_1fr] gap-4 py-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden
                  className="font-display italic text-2xl leading-none text-muted-foreground/40 tabular-nums group-hover:text-primary transition-colors"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary mb-1.5">
                    {ARTICLE_TYPE_LABELS[article.type]}
                  </p>
                  <p className="font-semibold leading-snug text-foreground line-clamp-3 group-hover:underline decoration-primary/40 underline-offset-4">
                    {article.title}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <time dateTime={article.published_at}>
                      {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                    </time>
                    <span aria-hidden> · </span>
                    {article.read_time} min read
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
