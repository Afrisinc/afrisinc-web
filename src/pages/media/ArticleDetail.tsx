import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { formatDistanceToNow, format } from "date-fns";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ExternalLink,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getCategoryPlaceholderImage } from "@/services/articlesService";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  Documentary: { bg: "hsl(22 88% 52% / 0.1)", text: "hsl(22 82% 46%)", border: "hsl(22 88% 52% / 0.25)" },
  News: { bg: "hsl(158 42% 26% / 0.1)", text: "hsl(158 42% 32%)", border: "hsl(158 42% 26% / 0.25)" },
  Podcast: { bg: "hsl(43 95% 52% / 0.1)", text: "hsl(38 80% 38%)", border: "hsl(43 95% 52% / 0.25)" },
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticle(slug || "");
  const { data: relatedData } = useArticles({
    category: article?.category[0],
    per_page: 3,
  });

  const relatedArticles = relatedData?.articles.filter((a) => a.id !== article?.id).slice(0, 3) || [];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "";

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
      return;
    }

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="pt-20 md:pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-5 w-40 mb-6" />
            <Skeleton className="h-6 w-24 mb-4 rounded-full" />
            <Skeleton className="h-10 sm:h-12 w-full max-w-xl mb-3" />
            <Skeleton className="h-5 w-full max-w-2xl mb-6" />
            <div className="flex items-center gap-4 py-4 border-y border-border mb-8">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="aspect-[16/9] sm:aspect-[2/1] rounded-xl sm:rounded-2xl mb-10" />
            <div className="max-w-3xl mx-auto space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error || !article) {
    return (
      <PublicLayout>
        <div className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Article Not Found</h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="outline" size="default" className="group" asChild>
              <Link to="/media">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Media
              </Link>
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const publishedDate = new Date(article.published_at);
  const updatedDate = new Date(article.updated_at);
  const wasUpdated = updatedDate.getTime() !== publishedDate.getTime();
  const primaryCategory = Array.isArray(article.category) ? article.category[0] : article.category;
  const categoryColor = typeColors[primaryCategory] || typeColors["News"];

  return (
    <PublicLayout>
      <Helmet>
        <title>{article.seo.meta_title}</title>
        <meta name="description" content={article.seo.meta_description} />
        <meta property="og:title" content={article.seo.meta_title} />
        <meta property="og:description" content={article.seo.meta_description} />
        <meta property="og:image" content={article.seo.og_image || article.featured_image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            image: getCategoryPlaceholderImage(article.category),
            datePublished: article.published_at,
            dateModified: article.updated_at,
            author: article.author
              ? {
                  "@type": "Person",
                  name: article.author.name,
                }
              : undefined,
            publisher: {
              "@type": "Organization",
              name: "Afrisinc",
              logo: {
                "@type": "ImageObject",
                url: `${window.location.origin}/afrisic-logo.png`,
              },
            },
            description: article.summary,
          })}
        </script>
      </Helmet>

      {/* ── Hero Header + Featured Image ─────────────────────────────────── */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
            <Link to="/media" className="hover:text-foreground transition-colors">
              Media
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <Link to="/media/articles" className="hover:text-foreground transition-colors">
              Articles
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground truncate max-w-[180px] sm:max-w-[280px]">{article.title}</span>
          </nav>

          {/* Category + Type badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4 animate-fade-up animation-delay-100">
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                background: categoryColor.bg,
                color: categoryColor.text,
                border: `1px solid ${categoryColor.border}`,
              }}
            >
              {article.category}
            </span>
            {article.source && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground border border-border flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" />
                {article.source.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-bold tracking-tight text-foreground mb-4 animate-fade-up animation-delay-200"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.15 }}
          >
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-6 animate-fade-up animation-delay-300">
            {article.summary}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground py-4 border-y border-border animate-fade-up animation-delay-400">
            {article.author && (
              <div className="flex items-center gap-2.5">
                {article.author.avatar && (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-border"
                  />
                )}
                <div className="leading-tight">
                  <div className="font-medium text-foreground text-sm">{article.author.name}</div>
                  {article.author.role && (
                    <div className="text-xs text-muted-foreground">{article.author.role}</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{format(publishedDate, "MMM d, yyyy")}</span>
            </div>

            {wasUpdated && (
              <div className="flex items-center gap-1.5 text-primary">
                <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs">
                  Updated {formatDistanceToNow(updatedDate, { addSuffix: true })}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{article.read_time} min read</span>
            </div>

            {/* Share menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="group rounded-full h-8 px-3">
                  <Share2 className="w-3.5 h-3.5 mr-1.5" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShare("twitter")}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("facebook")}>
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("copy")}>
                  <Link2 className="w-4 h-4 mr-2" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* ── Featured Image ───────────────────────────────────────────────── */}
      <section className="pb-6 md:pb-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-muted">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/10] object-cover"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      {/* ── Article Content ────────────────────────────────────────────────── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Source Attribution */}
            {article.source && (
              <div className="bg-muted/40 border border-border rounded-xl p-4 sm:p-5 mb-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This article is summarized from{" "}
                  <a
                    href={article.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    {article.source.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  . Visit the original source for the full article.
                </p>
              </div>
            )}

            {/* Content */}
            <article
              className="prose prose-base sm:prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                prose-headings:mt-8 prose-headings:mb-4
                prose-h2:text-xl prose-h2:sm:text-2xl
                prose-h3:text-lg prose-h3:sm:text-xl
                prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:pl-4 prose-blockquote:my-6
                prose-li:text-foreground/80 prose-li:my-1
                prose-img:rounded-lg prose-img:my-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
                {article.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/media/articles?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            )}

            {/* Read Original */}
            {article.source && (
              <div className="mt-10 p-6 sm:p-8 rounded-xl bg-muted/30 border border-border text-center">
                <p className="text-muted-foreground mb-4 text-sm">Want to read the full original article?</p>
                <Button variant="default" size="default" className="group" asChild>
                  <a href={article.source.url} target="_blank" rel="noopener noreferrer">
                    Visit {article.source.name}
                    <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related Articles ───────────────────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-border">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Related Articles</p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  More from <span className="font-display italic text-gradient-primary">Afrisinc</span>
                </h2>
              </div>
              <Button variant="outline" size="sm" className="w-fit" asChild>
                <Link to="/media/articles">
                  View All Articles
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {relatedArticles.map((related, index) => (
                <div
                  key={related.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <ArticleCard article={related} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back CTA ──────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button variant="outline" size="default" className="group" asChild>
              <Link to="/media">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Media
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ArticleDetail;
