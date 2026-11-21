import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MediaSectionAction {
  label: string;
  /** Internal route (react-router) or absolute URL (opens in a new tab). */
  href: string;
}

interface MediaSectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  /** Rendered in the brand display italic after the title. */
  accent?: ReactNode;
  description?: ReactNode;
  action?: MediaSectionAction;
  tone?: "default" | "muted";
  className?: string;
  children: ReactNode;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Section shell for the media hub: anchored id, consistent rhythm, editorial header. */
export function MediaSection({
  id,
  eyebrow,
  title,
  accent,
  description,
  action,
  tone = "default",
  className,
  children,
}: MediaSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-32 py-28 md:py-36",
        tone === "muted" ? "bg-muted/30" : "bg-background",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <header className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-16 pb-12 border-b border-border">
          <p className="line-accent">{eyebrow}</p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2
                id={headingId}
                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.0]"
              >
                {title}
                {accent && (
                  <>
                    {" "}
                    <span className="font-display italic text-gradient-primary">{accent}</span>
                  </>
                )}
              </h2>
              {description && <p className="text-secondary mt-4">{description}</p>}
            </div>

            {action && <SectionAction {...action} />}
          </div>
        </header>

        {children}
      </div>
    </section>
  );
}

function SectionAction({ label, href }: MediaSectionAction) {
  const icon = (
    <ArrowUpRight
      aria-hidden
      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  );

  return (
    <Button variant="outline" size="lg" className="group flex-shrink-0 self-start md:self-auto" asChild>
      {isExternal(href) ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
          {icon}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <Link to={href}>
          {label}
          {icon}
        </Link>
      )}
    </Button>
  );
}
