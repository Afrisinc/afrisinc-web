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
  Documentary: { bg: "hsl(22 88% 52% / 0.1)",  text: "hsl(22 82% 46%)",  border: "hsl(22 88% 52% / 0.25)" },
  News:        { bg: "hsl(158 42% 26% / 0.1)", text: "hsl(158 42% 32%)", border: "hsl(158 42% 26% / 0.25)" },
  Podcast:     { bg: "hsl(43 95% 52% / 0.1)",  text: "hsl(38 80% 38%)",  border: "hsl(43 95% 52% / 0.25)" },
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticle(slug || "");
  const { data: relatedData } = useArticles({
    category: article?.category[0],
    per_page: 3,
  });

  const relatedArticles = relatedData?.articles.filter(a => a.id !== article?.id).slice(0, 3) || [];

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
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mb-8" />
            <Skeleton className="aspect-[21/9] rounded-2xl mb-8" />
            <div className="max-w-3xl mx-auto space-y-4">
              <Skeleton className="h-4 w-full" />
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
        <div className="py-28 md:py-36">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/media">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
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
  const categoryColor = typeColors[article.category] || typeColors["News"];

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
            "headline": article.title,
            "image": getCategoryPlaceholderImage(article.category),
            "datePublished": article.published_at,
            "dateModified": article.updated_at,
            "author": article.author ? {
              "@type": "Person",
              "name": article.author.name,
            } : undefined,
            "publisher": {
              "@type": "Organization",
              "name": "Afrisinc",
              "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/afrisic-logo.png`,
              },
            },
            "description": article.summary,
          })}
        </script>
      </Helmet>

      {/* ── Hero Header ───────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
            <Link to="/media" className="hover:text-foreground transition-colors">
              Media
            </Link>
            <span>/</span>
            <Link to="/media/articles" className="hover:text-foreground transition-colors">
              Articles
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </div>

          {/* Category + Type badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-up animation-delay-100">
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
            className="font-bold tracking-tight text-foreground leading-[1.0] mb-6 animate-fade-up animation-delay-200"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1 }}
          >
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8 animate-fade-up animation-delay-300">
            {article.summary}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-8 border-t border-border animate-fade-up animation-delay-400">
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author.avatar && (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-medium text-foreground">{article.author.name}</div>
                  {article.author.role && (
                    <div className="text-xs">{article.author.role}</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(publishedDate, "MMM d, yyyy")}</span>
            </div>

            {wasUpdated && (
              <div className="flex items-center gap-1 text-primary">
                <RefreshCw className="w-4 h-4" />
                <span>Updated {formatDistanceToNow(updatedDate, { addSuffix: true })}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.read_time} min read</span>
            </div>

            {/* Share menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="group rounded-full">
                  <Share2 className="w-4 h-4 mr-2" />
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
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl overflow-hidden border border-border shadow-card">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Article Content ────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">

            {/* Source Attribution */}
            {article.source && (
              <div className="bg-muted/50 border border-border rounded-2xl p-6 mb-10">
                <p className="text-sm text-muted-foreground">
                  This article is summarized from{" "}
                  <a
                    href={article.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
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
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                prose-p:text-foreground/80 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-li:text-foreground/80"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-border">
              {article.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/media/articles?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  #{tag}
                </a>
              ))}
            </div>

            {/* Read Original */}
            {article.source && (
              <div className="mt-12 p-8 rounded-2xl bg-muted/30 border border-border text-center">
                <p className="text-muted-foreground mb-6 text-sm">
                  Want to read the full original article?
                </p>
                <Button variant="default" size="lg" className="group shadow-primary" asChild>
                  <a href={article.source.url} target="_blank" rel="noopener noreferrer">
                    Visit {article.source.name}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── Related Articles ───────────────────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section className="py-28 md:py-36 bg-muted/30">
          <div className="container mx-auto px-6">

            <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
              <div>
                <p className="line-accent">Related</p>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                  More from{" "}
                  <span className="font-display italic text-gradient-primary">Afrisinc.</span>
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedArticles.map((related, index) => (
                <div
                  key={related.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ArticleCard article={related} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Button variant="outline" size="lg" className="group" asChild>
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
