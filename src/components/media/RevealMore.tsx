import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RevealMoreProps<T> {
  items: T[];
  initialCount: number;
  /** Renders a slice of items. Called once for the visible set and once for the hidden set. */
  render: (items: T[], meta: { revealed: boolean; offset: number }) => ReactNode;
  noun?: string;
  className?: string;
}

/**
 * Shows the first `initialCount` items and animates the rest open on demand.
 * Hidden items stay out of the tab order and accessibility tree until revealed.
 */
export function RevealMore<T>({ items, initialCount, render, noun = "more", className }: RevealMoreProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();
  const regionRef = useRef<HTMLDivElement>(null);

  // `inert` keeps collapsed links out of the tab order (React 18 has no typed prop for it).
  useEffect(() => {
    if (regionRef.current) regionRef.current.inert = !expanded;
  }, [expanded]);
  const visible = items.slice(0, initialCount);
  const hidden = items.slice(initialCount);

  return (
    <div className={className}>
      {render(visible, { revealed: true, offset: 0 })}

      {hidden.length > 0 && (
        <>
          <div
            id={regionId}
            ref={regionRef}
            aria-hidden={!expanded}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              {render(hidden, { revealed: expanded, offset: initialCount })}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              size="lg"
              aria-expanded={expanded}
              aria-controls={regionId}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "Show less" : `Show ${hidden.length} ${noun}`}
              <ChevronDown
                aria-hidden
                className={cn("w-4 h-4 transition-transform duration-300", expanded && "rotate-180")}
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
