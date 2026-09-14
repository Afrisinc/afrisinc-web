import { Helmet } from "react-helmet-async";

interface NoIndexMetaProps {
  /** Rendered as "{title} | Afrisinc". Omit to leave the previous route's title in place. */
  title?: string;
}

/**
 * Drop into any "not found" / empty-state branch of a client-rendered route.
 * Without this, a bad id or out-of-range episode number still returns HTTP 200
 * (the SPA shell always resolves), so crawlers would otherwise index it as if
 * it were real content — a "soft 404".
 */
export function NoIndexMeta({ title }: NoIndexMetaProps) {
  return (
    <Helmet>
      {title && <title>{title} | Afrisinc</title>}
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
}
