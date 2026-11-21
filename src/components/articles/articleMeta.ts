import type { Article, ArticleType } from "@/types/article";

export const ARTICLE_TYPE_LABELS: Record<ArticleType, string> = {
  news: "News",
  editorial: "Afrisinc Editorial",
  opinion: "Opinion",
};

export const ARTICLE_TYPE_STYLES: Record<ArticleType, string> = {
  news: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
  editorial: "bg-primary/10 text-primary border-primary/30",
  opinion: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
};

export function articleCategories(article: Pick<Article, "category">): string[] {
  return (Array.isArray(article.category) ? article.category : [article.category]).filter(Boolean);
}

export function articleHref(article: Pick<Article, "slug">): string {
  return `/media/articles/${article.slug}`;
}
