import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AlertCircle, BookOpen, FileText, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { StoryCard } from "@/components/stories/StoryCard";
import {
  CardGridSkeleton,
  CategoryFilter,
  LatestHeadlines,
  LeadStory,
  MEDIA_GRID_CLASS,
  MediaEmptyState,
  MediaSection,
  MediaSectionNav,
  NewsletterSignup,
  PodcastEpisodeRow,
  RevealMore,
  VideoCard,
  type MediaNavItem,
} from "@/components/media";
import { useArticles, useCategories, useFeaturedArticle } from "@/hooks/useArticles";
import { useStories } from "@/hooks/useStories";
import { MEDIA_LINKS, PODCAST_EPISODES, PODCAST_SHOW_NAME, VIDEOS } from "@/data/media";
import { SITE_SEO } from "@/lib/seo";
import { cn } from "@/lib/utils";

const ARTICLES_PAGE_SIZE = 9;
const ARTICLES_GRID_COUNT = 6;
const HEADLINES_COUNT = 4;
const INITIAL_MEDIA_COUNT = 3;

const SEO = {
  title: "Media Hub | Afrisinc",
  description:
    "News, analysis, original stories, video and podcasts from Africa's technology ecosystem — curated by Afrisinc.",
  url: `${SITE_SEO.siteUrl}/media`,
};

const Media = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const featured = useFeaturedArticle();
  // Unfiltered feed powers the "Latest" rail; shares a cache entry with the grid when no filter is set.
  const latest = useArticles({ per_page: ARTICLES_PAGE_SIZE });
  const grid = useArticles({ per_page: ARTICLES_PAGE_SIZE, category: selectedCategory });
  const { data: categories = [] } = useCategories();
  const stories = useStories({ limit: 3 });

  const featuredId = featured.data?.id;

  const headlines = useMemo(
    () => (latest.data?.articles ?? []).filter((a) => a.id !== featuredId).slice(0, HEADLINES_COUNT),
    [latest.data, featuredId]
  );

  // Avoid repeating what's already above the fold when the reader hasn't filtered.
  const gridArticles = useMemo(() => {
    const exclude = new Set<string>(featuredId ? [featuredId] : []);
    if (!selectedCategory) headlines.forEach((a) => exclude.add(a.id));
    const all = grid.data?.articles ?? [];
    const deduped = all.filter((a) => !exclude.has(a.id));
    // Fall back to the full list if de-duplication would leave the grid looking empty.
    return (deduped.length >= 3 ? deduped : all).slice(0, ARTICLES_GRID_COUNT);
  }, [grid.data, featuredId, headlines, selectedCategory]);

  const navigate = useNavigate();
  const storyItems = stories.data?.items ?? [];
  const hasLead = featured.isLoading || Boolean(featured.data);
  const hasHeadlines = latest.isLoading || headlines.length > 0;

  const navItems: MediaNavItem[] = [
    { id: "top-stories", label: "Top stories" },
    { id: "articles", label: "Articles", count: latest.data?.total || undefined },
    { id: "stories", label: "Stories", count: stories.data?.total || undefined },
    { id: "video", label: "Video", count: VIDEOS.length },
    { id: "podcast", label: "Podcast", count: PODCAST_EPISODES.length },
  ];

  const categoryOptions = categories.map((c) => ({ value: c.slug, label: c.name }));
  const activeCategoryName = categories.find((c) => c.slug === selectedCategory)?.name;

  return (
    <PublicLayout>
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <link rel="canonical" href={SEO.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:url" content={SEO.url} />
        <meta property="og:image" content={SITE_SEO.defaultImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_SEO.twitterHandle} />
      </Helmet>

      {/* ── Masthead ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background dot-grid grain">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/85 to-background pointer-events-none"
        />
        <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:items-end">
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
                News, insights, and stories from Africa's technology ecosystem and beyond. Stay informed on
                what's shaping the future.
              </p>
            </div>

            <dl className="grid grid-cols-3 gap-6 sm:gap-10 lg:text-right animate-fade-up animation-delay-300">
              {[
                { label: "Articles", value: latest.data?.total },
                { label: "Videos", value: VIDEOS.length },
                { label: "Episodes", value: PODCAST_EPISODES.length },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl md:text-3xl font-bold tabular-nums text-foreground">
                    {stat.value ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <MediaSectionNav items={navItems} />

      {/* ── Top stories: lead + latest rail ──────────────────────────────── */}
      <section
        id="top-stories"
        aria-label="Top stories"
        className="scroll-mt-32 pt-16 md:pt-20 pb-28 md:pb-36 bg-background"
      >
        <div className="container mx-auto px-6">
          {hasLead || hasHeadlines ? (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              {hasLead && (
                <div className={cn(hasHeadlines ? "lg:col-span-8" : "lg:col-span-12")}>
                  <LeadStory article={featured.data} isLoading={featured.isLoading} />
                </div>
              )}
              {hasHeadlines && (
                <LatestHeadlines
                  className={hasLead ? "lg:col-span-4" : "lg:col-span-12"}
                  articles={headlines}
                  isLoading={latest.isLoading}
                />
              )}
            </div>
          ) : (
            <MediaEmptyState
              icon={latest.isError ? AlertCircle : Newspaper}
              title={latest.isError ? "We couldn't load top stories" : "No top stories yet"}
              description={
                latest.isError
                  ? "Something went wrong on our side. Please try again."
                  : "Our editors are working on the next lead story — check back soon."
              }
              actionLabel={latest.isError ? "Retry" : undefined}
              onAction={
                latest.isError ? () => void Promise.all([latest.refetch(), featured.refetch()]) : undefined
              }
            />
          )}
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────────────────────────── */}
      <MediaSection
        id="articles"
        tone="muted"
        eyebrow="Articles"
        title="Deep dives and"
        accent="analysis."
        action={{ label: "All articles", href: "/media/articles" }}
      >
        <CategoryFilter
          className="mb-10"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          label="Filter articles by category"
        />

        <div aria-live="polite" aria-busy={grid.isFetching}>
          {grid.isLoading ? (
            <CardGridSkeleton count={ARTICLES_GRID_COUNT} />
          ) : grid.isError ? (
            <MediaEmptyState
              icon={AlertCircle}
              title="We couldn't load articles"
              description="Something went wrong on our side. Please try again."
              actionLabel="Retry"
              onAction={() => grid.refetch()}
            />
          ) : gridArticles.length === 0 ? (
            <MediaEmptyState
              icon={FileText}
              title={activeCategoryName ? `No articles in ${activeCategoryName} yet` : "No articles yet"}
              description="New pieces are published regularly — check back soon."
              actionLabel={selectedCategory ? "Show all articles" : undefined}
              onAction={selectedCategory ? () => setSelectedCategory(undefined) : undefined}
            />
          ) : (
            <ul
              className={cn(
                MEDIA_GRID_CLASS,
                "transition-opacity duration-300",
                grid.isPlaceholderData && "opacity-60"
              )}
            >
              {gridArticles.map((article, index) => (
                <li
                  key={article.id}
                  className="animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </MediaSection>

      {/* ── Stories ──────────────────────────────────────────────────────── */}
      <MediaSection
        id="stories"
        eyebrow="Stories"
        title="Original fiction,"
        accent="told in episodes."
        action={{ label: "All stories", href: "/media/stories" }}
      >
        {stories.isLoading ? (
          <CardGridSkeleton count={3} />
        ) : stories.isError ? (
          <MediaEmptyState
            icon={AlertCircle}
            title="We couldn't load stories"
            description="Something went wrong on our side. Please try again."
            actionLabel="Retry"
            onAction={() => stories.refetch()}
          />
        ) : storyItems.length === 0 ? (
          <MediaEmptyState
            icon={BookOpen}
            title="New stories are on the way"
            description="Our first serialised fiction is being written. Browse the stories page for updates."
            actionLabel="Go to stories"
            onAction={() => navigate("/media/stories")}
          />
        ) : (
          <ul className={MEDIA_GRID_CLASS}>
            {storyItems.map((story, index) => (
              <li
                key={story.id}
                className="animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <StoryCard story={story} />
              </li>
            ))}
          </ul>
        )}
      </MediaSection>

      {/* ── Video ────────────────────────────────────────────────────────── */}
      <MediaSection
        id="video"
        tone="muted"
        eyebrow="Video"
        title="Watch, learn,"
        accent="build."
        action={
          MEDIA_LINKS.videoChannel ? { label: "Visit channel", href: MEDIA_LINKS.videoChannel } : undefined
        }
      >
        <RevealMore
          items={VIDEOS}
          initialCount={INITIAL_MEDIA_COUNT}
          noun="more videos"
          render={(items, { offset }) => (
            <ul className={cn(MEDIA_GRID_CLASS, "gap-y-10", offset > 0 && "pt-10")}>
              {items.map((video) => (
                <li key={video.id}>
                  <VideoCard video={video} />
                </li>
              ))}
            </ul>
          )}
        />
      </MediaSection>

      {/* ── Podcast ──────────────────────────────────────────────────────── */}
      <MediaSection
        id="podcast"
        eyebrow="Podcast"
        title={PODCAST_SHOW_NAME.replace(/Podcast$/, "").trim()}
        accent="Podcast."
        description="Candid conversations with the founders, engineers and operators building African tech."
        action={MEDIA_LINKS.podcast ? { label: "All episodes", href: MEDIA_LINKS.podcast } : undefined}
      >
        <RevealMore
          items={PODCAST_EPISODES}
          initialCount={INITIAL_MEDIA_COUNT}
          noun="more episodes"
          render={(items, { offset }) => (
            <ol
              className={cn(
                "divide-y divide-border",
                offset > 0 ? "border-t border-border" : "border-y border-border"
              )}
            >
              {items.map((episode) => (
                <li key={episode.id}>
                  <PodcastEpisodeRow episode={episode} />
                </li>
              ))}
            </ol>
          )}
        />
      </MediaSection>

      <NewsletterSignup
        formPage="media_page"
        categories={selectedCategory ? [selectedCategory] : []}
        eyebrow="Stay updated"
      />
    </PublicLayout>
  );
};

export default Media;
