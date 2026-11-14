import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { COOKIE_SETTINGS_EVENT, getStoredConsent, setConsent, type ConsentChoice } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

const TRANSITION_MS = 300;

const CHOICE_LABEL: Record<ConsentChoice, string> = {
  granted: "Analytics cookies are currently on.",
  denied: "Analytics cookies are currently off.",
};

export function CookieBanner() {
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [current, setCurrent] = useState<ConsentChoice | null>(null);

  const show = useCallback((focus: boolean) => {
    setCurrent(getStoredConsent());
    setVisible(true);
    window.setTimeout(() => {
      setEntered(true);
      if (focus) panelRef.current?.focus();
    }, 50);
  }, []);

  const hide = useCallback(() => {
    setEntered(false);
    window.setTimeout(() => setVisible(false), TRANSITION_MS);
  }, []);

  useEffect(() => {
    if (!getStoredConsent()) show(false);
    const reopen = () => show(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, [show]);

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    hide();
  };

  if (!visible || pathname.startsWith("/dashboard")) return null;

  return (
    <section
      ref={panelRef}
      tabIndex={-1}
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      onKeyDown={(event) => {
        if (event.key === "Escape" && current) hide();
      }}
      className={`fixed z-50 inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[400px] rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-2xl outline-none transition-all duration-300 ease-out motion-reduce:transition-none ${
        entered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(22_88%_52%/0.12)] text-[hsl(22_88%_52%)]">
            <Cookie className="h-5 w-5" aria-hidden />
          </div>

          <div className="min-w-0 flex-1">
            <h2 id="cookie-banner-title" className="text-base font-semibold leading-snug text-foreground">
              Your privacy, your choice
            </h2>
            <p
              id="cookie-banner-description"
              className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
            >
              We'd like to use analytics cookies to see how the site is used and make it better. Nothing is
              tracked unless you accept.{" "}
              <Link
                to="/privacy"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:decoration-foreground"
              >
                Privacy policy
              </Link>
            </p>
            {current && (
              <p className="mt-2 text-xs font-medium text-muted-foreground/80">{CHOICE_LABEL[current]}</p>
            )}
          </div>

          {current && (
            <button
              type="button"
              onClick={hide}
              aria-label="Close cookie settings"
              className="-mr-1.5 -mt-1.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <Button variant="outline" onClick={() => choose("denied")} className="h-10 text-sm font-medium">
            Decline
          </Button>
          <Button variant="default" onClick={() => choose("granted")} className="h-10 text-sm font-medium">
            Accept
          </Button>
        </div>
      </div>
    </section>
  );
}
