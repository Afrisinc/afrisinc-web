import { cn } from "@/lib/utils";

export interface CategoryOption {
  value: string;
  label: string;
}

interface CategoryFilterProps {
  options: CategoryOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
  allLabel?: string;
  label?: string;
  className?: string;
}

/** Single-select chip filter. Scrolls horizontally on small screens instead of wrapping into a wall. */
export function CategoryFilter({
  options,
  value,
  onChange,
  allLabel = "All",
  label = "Filter by category",
  className,
}: CategoryFilterProps) {
  if (options.length === 0) return null;

  const chips: { value: string | undefined; label: string }[] = [
    { value: undefined, label: allLabel },
    ...options,
  ];

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center gap-2 overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap",
        className
      )}
    >
      {chips.map((chip) => {
        const selected = chip.value === value;
        return (
          <button
            key={chip.value ?? "__all"}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(selected ? undefined : chip.value)}
            className={cn(
              "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              selected
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
