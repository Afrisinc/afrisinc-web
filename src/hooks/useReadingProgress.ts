import { useEffect, useRef, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

const READ_THRESHOLD = 90;

/**
 * Fires `onComplete` once per `storageKey` when `progress` crosses the
 * threshold — deduped client-side via localStorage (the backend also dedupes
 * per device, so this is a fast path to skip the network call, not the only
 * guard). `onComplete` is read from a ref so passing a fresh arrow function
 * on every render doesn't re-arm the effect.
 */
export function useReadCompletion(storageKey: string | undefined, progress: number, onComplete: () => void) {
  const firedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    firedRef.current = false;
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || progress < READ_THRESHOLD || firedRef.current) return;

    let alreadyRecorded = false;
    try {
      alreadyRecorded = localStorage.getItem(storageKey) === "1";
    } catch {
      // Private browsing or storage blocked — fall through and record anyway.
    }
    if (alreadyRecorded) {
      firedRef.current = true;
      return;
    }

    firedRef.current = true;
    onCompleteRef.current();
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // Nothing to do — the read was still recorded server-side.
    }
  }, [storageKey, progress]);
}
