// A persistent, anonymous per-browser id — no login required. It's what lets
// "have I already read this" and "continue where I left off" survive a page
// reload. It never leaves this browser's localStorage and carries no PII.

const STORAGE_KEY = "afrisinc-reader-device-id";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers without crypto.randomUUID.
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

let cachedId: string | null = null;

export function getReaderDeviceId(): string {
  if (cachedId) return cachedId;

  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      cachedId = existing;
      return existing;
    }
    const created = randomId();
    localStorage.setItem(STORAGE_KEY, created);
    cachedId = created;
    return created;
  } catch {
    // Private browsing or storage blocked — fall back to an in-memory id for
    // this page load. Tracking degrades to "not deduped", not a broken page.
    cachedId = randomId();
    return cachedId;
  }
}
