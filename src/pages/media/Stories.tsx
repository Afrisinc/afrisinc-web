import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StoryCard } from "@/components/stories/StoryCard";
import { useStories } from "@/hooks/useStories";
import { ArrowLeft, BookOpen } from "lucide-react";

const StoriesPage = () => {
  const { data, isLoading } = useStories({ limit: 12 });
  const [genre, setGenre] = useState<string | undefined>(undefined);

  const stories = useMemo(() => data?.items ?? [], [data]);
  const genres = useMemo(
    () => Array.from(new Set(stories.map((s) => s.genre).filter((g): g is string => Boolean(g)))),
    [stories]
  );

  const [featured, ...rest] = stories;
  const filtered = genre ? rest.filter((s) => s.genre === genre) : rest;
  const showFeatured = !genre || featured?.genre === genre;

  return (
    <PublicLayout>
      <Helmet>
        <title>Stories | Afrisinc Media</title>
        <meta
          name="description"
          content="Original episodic fiction from Afrisinc Media — new episodes, written for the series that keeps you coming back."
        />
        <meta property="og:title" content="Stories | Afrisinc Media" />
        <meta property="og:description" content="Original episodic fiction from Afrisinc Media." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="pt-32 pb-12 bg-gradient-hero dot-grid">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/media" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Media
            </Link>
            <span>/</span>
            <span className="text-foreground">Stories</span>
          </div>

          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 animate-fade-up text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Afrisinc Stories
            </Badge>
            <h1 className="heading-hero text-foreground mb-6 animate-fade-up animation-delay-100 tracking-tight leading-[1.1]">
              Original Fiction,
              <span className="text-gradient-primary block mt-2">Told in Episodes.</span>
            </h1>
            <p className="text-subtitle text-muted-foreground animate-fade-up animation-delay-200 leading-relaxed">
              Series written for the site, released episode by episode. Pick one up and follow it as it grows.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="space-y-12">
              <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 rounded-2xl border border-border p-6">
                <Skeleton className="aspect-[4/3] rounded-xl w-full" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden border border-border">
                    <Skeleton className="aspect-[16/10] w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : stories.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground opacity-40" />
              <h3 className="font-medium text-foreground">No stories published yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Check back soon — new episodes are written and reviewed before they land here.
              </p>
            </div>
          ) : (
            <>
              {/* Genre filter pills */}
              {genres.length > 1 && (
                <div className="flex items-center gap-2 flex-wrap mb-12">
                  <button
                    onClick={() => setGenre(undefined)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
                      !genre
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGenre(g === genre ? undefined : g)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
                        genre === g
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}

              {/* Featured story spotlight */}
              {featured && showFeatured && (
                <div className="mb-16 animate-fade-up">
                  <StoryCard story={featured} variant="featured" />
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground opacity-40" />
                  <p className="text-sm text-muted-foreground">No other {genre} stories yet.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((story, index) => (
                    <div
                      key={story.id}
                      className="animate-fade-up"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <StoryCard story={story} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default StoriesPage;
