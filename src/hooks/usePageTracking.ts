import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

const TITLE_SETTLE_MS = 150;

export function usePageTracking() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => trackPageView(pathname + search), TITLE_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, search]);
}
