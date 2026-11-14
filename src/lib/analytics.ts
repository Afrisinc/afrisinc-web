declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export type ConsentChoice = "granted" | "denied";

export const COOKIE_SETTINGS_EVENT = "cookie-settings:open";

const CONSENT_KEY = "cookie_consent";
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const DEBUG = import.meta.env.VITE_GA_DEBUG === "true";
const ENABLED =
  typeof window !== "undefined" && Boolean(GA_ID) && (import.meta.env.MODE === "production" || DEBUG);

let initialized = false;

function consentSignals(analytics: ConsentChoice) {
  return {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: analytics,
  };
}

function send(...args: unknown[]) {
  if (!ENABLED || !initialized) {
    if (import.meta.env.DEV) console.debug("[analytics]", ...args);
    return;
  }
  window.gtag(...args);
}

function clearAnalyticsCookies() {
  const parts = window.location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join("."));

  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
      });
    });
}

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function storeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
    return true;
  } catch {
    return false;
  }
}

export function initAnalytics() {
  if (!ENABLED || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", consentSignals(getStoredConsent() ?? "denied"));
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false,
    ...(DEBUG ? { debug_mode: true } : {}),
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function setConsent(choice: ConsentChoice) {
  storeConsent(choice);
  send("consent", "update", consentSignals(choice));
  if (choice === "denied") clearAnalyticsCookies();
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

export function trackPageView(path: string, title?: string) {
  send("event", "page_view", {
    page_location: window.location.origin + path,
    page_title: title ?? document.title,
  });
}

export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  send("event", action, params);
}

export function identifyUser(userId: string, userProps?: Record<string, unknown>) {
  send("set", { user_id: userId });
  if (userProps) setUserProperties(userProps);
}

export function setUserProperties(props: Record<string, unknown>) {
  send("set", "user_properties", props);
}
