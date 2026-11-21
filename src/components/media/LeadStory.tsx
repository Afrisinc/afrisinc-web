import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { SmartImage } from "@/components/SmartImage";
import { getCategoryPlaceholderImage } from "@/services/articlesService";
import { ARTICLE_TYPE_LABELS, articleCategories, articleHref } from "@/components/articles/articleMeta";
import type { Article } from "@/types/article";

interface LeadStoryProps {
  article: Article | null | undefined;
  isLoading?: boolean;
}

/** Hero-weight lead article: full-bleed image with title overlaid, newsroom style. */
export function LeadStory({ article, isLoading }: LeadStoryProps) {
  if (isLoading) {
    return (
      <Skeleton className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[520px] rounded-2xl" />
    );
  }

  if (!article) return null;

  const category = articleCategories(article)[0];
  const published = formatDistanceToNow(new Date(article.published_at), { addSuffix: true });

  return (
    <Link
      to={articleHref(article)}
      className="group relative block h-full overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <article className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[520px]">
        <SmartImage
          src={article.featured_image}
          alt=""
          width={1200}
          priority
          fallbackSrc={getCategoryPlaceholderImage(article.category)}
          className="!absolute inset-0"
          imageClassName="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/0"
        />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-semibold uppercase tracking-[0.14em]">
            <span className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">Featured</span>
            <span className="text-white/80">{ARTICLE_TYPE_LABELS[article.type]}</span>
            {category && (
              <>
                <span aria-hidden className="w-1 h-1 rounded-full bg-white/50" />
                <span className="text-white/80">{category}</span>
              </>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold leading-[1.08] tracking-tight max-w-3xl text-balance">
            {article.title}
          </h3>

          {article.summary && (
            <p className="hidden sm:block mt-4 max-w-2xl text-white/75 leading-relaxed line-clamp-2">
              {article.summary}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
            {article.author?.name && <span className="font-medium text-white">{article.author.name}</span>}
            <time dateTime={article.published_at}>{published}</time>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden />
              {article.read_time} min read
            </span>
            <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 font-semibold text-white">
              Read story
              <ArrowUpRight
                aria-hidden
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
