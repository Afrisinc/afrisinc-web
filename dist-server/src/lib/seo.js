// SEO Utilities - Server-side meta tag generation for social sharing
export const SITE_SEO = {
    siteName: "Afrisinc",
    siteUrl: "https://afrisinc.com",
    defaultImage: "https://afrisinc.com/afrisic-logo.png",
    twitterHandle: "@Afrisinc",
};
/**
 * Generate meta tags HTML string for article pages
 */
export function generateArticleMetaTags(article) {
    const tags = [
        // Primary Meta Tags
        `<title>${escapeHtml(article.title)} | ${SITE_SEO.siteName}</title>`,
        `<meta name="title" content="${escapeHtml(article.title)}" />`,
        `<meta name="description" content="${escapeHtml(article.description)}" />`,
        // Open Graph / Facebook
        `<meta property="og:type" content="${article.type || "article"}" />`,
        `<meta property="og:url" content="${escapeHtml(article.url)}" />`,
        `<meta property="og:title" content="${escapeHtml(article.title)}" />`,
        `<meta property="og:description" content="${escapeHtml(article.description)}" />`,
        `<meta property="og:image" content="${escapeHtml(article.image)}" />`,
        `<meta property="og:site_name" content="${SITE_SEO.siteName}" />`,
        // Twitter
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:url" content="${escapeHtml(article.url)}" />`,
        `<meta name="twitter:title" content="${escapeHtml(article.title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(article.description)}" />`,
        `<meta name="twitter:image" content="${escapeHtml(article.image)}" />`,
        `<meta name="twitter:site" content="${SITE_SEO.twitterHandle}" />`,
    ];
    // Article-specific meta tags
    if (article.publishedTime) {
        tags.push(`<meta property="article:published_time" content="${article.publishedTime}" />`);
    }
    if (article.modifiedTime) {
        tags.push(`<meta property="article:modified_time" content="${article.modifiedTime}" />`);
    }
    if (article.author) {
        tags.push(`<meta property="article:author" content="${escapeHtml(article.author)}" />`);
    }
    if (article.section) {
        tags.push(`<meta property="article:section" content="${escapeHtml(article.section)}" />`);
    }
    if (article.tags?.length) {
        article.tags.forEach((tag) => {
            tags.push(`<meta property="article:tag" content="${escapeHtml(tag)}" />`);
        });
    }
    return tags.join("\n    ");
}
/**
 * Generate default site meta tags
 */
export function generateDefaultMetaTags() {
    return `
    <title>Afrisinc | Technology & Media from Africa to the World</title>
    <meta name="description" content="Afrisinc is a multi-department parent company pioneering innovation across technology, media, digital products, and global services." />
    <meta property="og:title" content="Afrisinc | Technology & Media from Africa to the World" />
    <meta property="og:description" content="Building the future of technology and media from Africa to the world." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE_SEO.siteUrl}" />
    <meta property="og:image" content="${SITE_SEO.defaultImage}" />
    <meta property="og:site_name" content="${SITE_SEO.siteName}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${SITE_SEO.twitterHandle}" />
    <meta name="twitter:image" content="${SITE_SEO.defaultImage}" />
  `.trim();
}
/**
 * Escape HTML special characters
 */
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
/**
 * Check if request is from a social media crawler
 */
export function isSocialCrawler(userAgent) {
    const crawlers = [
        "facebookexternalhit",
        "Facebot",
        "Twitterbot",
        "LinkedInBot",
        "Pinterest",
        "Slackbot",
        "TelegramBot",
        "WhatsApp",
        "Discordbot",
        "Googlebot",
        "bingbot",
    ];
    const ua = userAgent.toLowerCase();
    return crawlers.some((crawler) => ua.includes(crawler.toLowerCase()));
}
/**
 * Strip HTML tags from a string and decode common HTML entities
 */
export function stripHtmlTags(html) {
    if (!html)
        return "";
    return html
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
        .replace(/&amp;/g, "&") // Replace ampersands
        .replace(/&lt;/g, "<") // Replace less than
        .replace(/&gt;/g, ">") // Replace greater than
        .replace(/&quot;/g, '"') // Replace quotes
        .replace(/&#39;/g, "'") // Replace apostrophes
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim();
}
