const RESIZABLE_HOSTS = new Set(["images.unsplash.com"]);
const MAX_WIDTH = 1920;

function resize(url: string, width: number): string | null {
  try {
    const parsed = new URL(url);
    if (!RESIZABLE_HOSTS.has(parsed.hostname)) return null;
    parsed.searchParams.set("w", String(Math.min(Math.round(width), MAX_WIDTH)));
    parsed.searchParams.set("auto", "format");
    return parsed.toString();
  } catch {
    return null;
  }
}

export function imageSources(url: string, width?: number): { src: string; srcSet?: string } {
  if (!width) return { src: url };

  const base = resize(url, width);
  const retina = resize(url, width * 2);
  if (!base || !retina) return { src: url };

  return { src: base, srcSet: `${base} 1x, ${retina} 2x` };
}
