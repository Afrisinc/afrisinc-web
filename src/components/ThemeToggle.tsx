import { RadioGroup, RadioItem } from "@radix-ui/react-dropdown-menu";
import { Check, Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEMES: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const TRIGGER_TONE = {
  default:
    "text-muted-foreground hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground",
  inverted:
    "text-background/60 hover:bg-background/10 hover:text-background data-[state=open]:bg-background/10 data-[state=open]:text-background",
};

export function ThemeToggle({ inverted = false }: Readonly<{ inverted?: boolean }>) {
  const { theme = "system", setTheme } = useTheme();
  const activeLabel = THEMES.find((option) => option.value === theme)?.label ?? "System";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Theme: ${activeLabel}. Change theme`}
          className={cn("h-9 w-9 rounded-full", inverted ? TRIGGER_TONE.inverted : TRIGGER_TONE.default)}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-44 rounded-xl p-1.5 shadow-lg">
        <DropdownMenuLabel className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
          Theme
        </DropdownMenuLabel>

        <RadioGroup value={theme} onValueChange={setTheme}>
          {THEMES.map(({ value, label, icon: Icon }) => (
            <RadioItem
              key={value}
              value={value}
              className="group flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground outline-none transition-colors focus:bg-muted focus:text-foreground data-[state=checked]:font-medium data-[state=checked]:text-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span className="flex-1">{label}</span>
              <Check
                className="h-4 w-4 text-primary opacity-0 group-data-[state=checked]:opacity-100"
                aria-hidden
              />
            </RadioItem>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
