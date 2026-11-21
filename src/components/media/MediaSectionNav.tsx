import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface MediaNavItem {
  id: string;
  label: string;
  count?: number;
}

interface MediaSectionNavProps {
  items: MediaNavItem[];
  className?: string;
}

/** Tracks which section is currently in the reading zone (below sticky chrome, upper part of viewport). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | undefined>(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [active, setActive] as const;
}

/** Sticky in-page navigation with scroll-spy for long hub pages. */
export function MediaSectionNav({ items, className }: MediaSectionNavProps) {
  const [active, setActive] = useActiveSection(items.map((item) => item.id));

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav
      aria-label="Media sections"
      className={cn(
        "sticky top-[60px] z-40 border-y border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <ul className="flex items-center gap-1 overflow-x-auto scrollbar-none -mx-2 px-2">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="flex-shrink-0">
                <a
                  href={`#${item.id}`}
                  onClick={(event) => handleClick(event, item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
                    "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:duration-300 after:origin-left",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:scale-x-0"
                  )}
                >
                  {item.label}
                  {typeof item.count === "number" && item.count > 0 && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-px text-[10px] font-semibold tabular-nums transition-colors",
                        isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
