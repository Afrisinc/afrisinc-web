import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Newspaper,
  Youtube,
  Mic,
  FileText,
  Play,
  Clock,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { useFeaturedArticle, useArticles } from "@/hooks/useArticles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { subscribeNewsletter } from "@/services/notifyService";

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  Documentary: { bg: "hsl(22 88% 52% / 0.1)",  text: "hsl(22 82% 46%)",  border: "hsl(22 88% 52% / 0.25)" },
  News:        { bg: "hsl(158 42% 26% / 0.1)", text: "hsl(158 42% 32%)", border: "hsl(158 42% 26% / 0.25)" },
  Podcast:     { bg: "hsl(43 95% 52% / 0.1)",  text: "hsl(38 80% 38%)",  border: "hsl(43 95% 52% / 0.25)" },
};

const videos = [
  {
    title: "Afrisinc Cloud Platform Demo",
    duration: "12:45",
    views: "15K views",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    title: "Building Enterprise Software in Africa",
    duration: "24:30",
    views: "32K views",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
  {
    title: "Tech Leadership Panel Discussion",
    duration: "45:00",
    views: "28K views",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  },
];

const podcasts = [
  {
    title: "The Afrisinc Podcast",
    episode: "EP 42: Scaling Tech Teams Remotely",
    duration: "58 min",
    guest: "With Sarah Mensah, CTO",
  },
  {
    title: "The Afrisinc Podcast",
    episode: "EP 41: Future of Cloud Computing",
    duration: "45 min",
    guest: "With James Okonkwo, Head of Cloud",
  },
  {
    title: "The Afrisinc Podcast",
    episode: "EP 40: Startup to Enterprise Journey",
    duration: "52 min",
    guest: "With Amina Diallo, CEO",
  },
];

const Media = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { data: featuredArticle, isLoading: isLoadingFeatured } = useFeaturedArticle();
  const { data: articlesData, isLoading: isLoadingArticles } = useArticles({ per_page: 4 });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    try {
      await subscribeNewsletter(email);
      toast({
        title: "You're subscribed!",
        description: "Thank you for subscribing.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Failed to subscribe",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <PublicLayout>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-background dot-grid grain">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80 pointer-events-none" />

        <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
          <div className="max-w-4xl">

            <p className="line-accent mb-12 animate-fade-in">Media Hub</p>

            <h1 className="animate-fade-up animation-delay-100" style={{ lineHeight: 1 }}>
              <span
                className="block font-bold tracking-[-0.03em] text-foreground font-sans"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 0.92 }}
              >
                Stories That
              </span>
              <span
                className="block font-display italic font-bold tracking-[-0.02em] text-gradient-primary"
                style={{ fontSize: "clamp(28px, 6.5vw, 76px)", lineHeight: 1.02 }}
              >
                Matter.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-[1.75] max-w-lg mt-10 animate-fade-up animation-delay-200">
              News, insights, and stories from Africa's technology ecosystem and beyond.
              Stay informed on what's shaping the future.
            </p>

          </div>
        </div>
      </section>

      {/* ── Featured Article ─────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Featured</p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                Latest from{" "}
                <span className="font-display italic text-gradient-primary">Afrisinc.</span>
              </h2>
            </div>
          </div>

          {isLoadingFeatured ? (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Skeleton className="aspect-video rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ) : featuredArticle ? (
            <div className="grid lg:grid-cols-2 gap-8 items-start animate-fade-up">
              <Link
                to={`/media/articles/${featuredArticle.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/25 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={featuredArticle.featured_image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent pointer-events-none" />
                </div>
              </Link>

              <div className="animate-fade-up animation-delay-100">
                <span
                  className="px-3 py-1 text-xs font-semibold rounded-full inline-block mb-4"
                  style={{
                    background: typeColors[featuredArticle.category.name]?.bg || "hsl(var(--primary) / 0.15)",
                    color: typeColors[featuredArticle.category.name]?.text || "hsl(var(--primary))",
                    border: `1px solid ${typeColors[featuredArticle.category.name]?.border || "hsl(var(--primary) / 0.25)"}`,
                  }}
                >
                  {featuredArticle.category.name}
                </span>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                  {featuredArticle.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {featuredArticle.summary}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                  <span>{formatDistanceToNow(new Date(featuredArticle.published_at), { addSuffix: true })}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredArticle.read_time} min read
                  </span>
                </div>

                <Button variant="default" size="lg" className="group shadow-primary" asChild>
                  <Link to={`/media/articles/${featuredArticle.slug}`}>
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Latest Articles ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/30">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Articles</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                Deep Dives and{" "}
                <span className="font-display italic text-gradient-primary">Analysis.</span>
              </h2>
              <Button variant="outline" size="lg" className="group flex-shrink-0" asChild>
                <Link to="/media/articles">
                  View All
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {isLoadingArticles ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                  <Skeleton className="aspect-[16/10] w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {articlesData?.articles.slice(0, 4).map((article, index) => (
                <div
                  key={article.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Videos ───────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Video</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                Watch Our{" "}
                <span className="font-display italic text-gradient-primary">Latest Videos.</span>
              </h2>
              <Button variant="outline" size="lg" className="group flex-shrink-0" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Visit Channel
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((video, index) => (
              <div
                key={video.title}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/25 hover:shadow-card-hover transition-all duration-300 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-foreground/50 text-background backdrop-blur-sm">
                    {video.duration}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{video.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Podcasts ─────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-muted/30">
        <div className="container mx-auto px-6">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
            <div>
              <p className="line-accent">Podcast</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]">
                The Afrisinc{" "}
                <span className="font-display italic text-gradient-primary">Podcast.</span>
              </h2>
              <Button variant="outline" size="lg" className="group flex-shrink-0" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  All Episodes
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          <div className="divide-y divide-border">
            {podcasts.map((podcast, index) => (
              <div
                key={podcast.episode}
                className="group relative flex gap-8 py-8 hover:bg-background/50 -mx-4 px-4 transition-all duration-300 rounded-xl animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-3 bottom-3 w-[3px] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-full bg-primary" />

                {/* Play icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Play className="w-5 h-5 text-primary ml-0.5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {podcast.episode}
                  </h3>
                  <p className="text-muted-foreground text-sm">{podcast.guest}</p>
                </div>

                {/* Duration — right side on desktop */}
                <div className="text-sm font-medium text-muted-foreground whitespace-nowrap hidden sm:block">
                  {podcast.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-foreground text-background grain relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 kente-border opacity-55" />

        <div className="container mx-auto px-6 relative z-10">

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-background/10">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-background/40 before:block before:w-6 before:h-px before:bg-background/40 before:flex-shrink-0">
                Stay Updated
              </p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background leading-[1.0]">
                Get the Latest{" "}
                <span className="font-display italic text-gradient-primary">Insights.</span>
              </h2>
            </div>
          </div>

          <p className="text-background/50 text-sm leading-relaxed max-w-sm mb-8">
            Delivered directly to your inbox. News, analysis, and stories from Afrisinc.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-background/40"
            />
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="group shadow-primary flex-shrink-0"
              disabled={isSubscribing}
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

        </div>
      </section>

    </PublicLayout>
  );
};

export default Media;
