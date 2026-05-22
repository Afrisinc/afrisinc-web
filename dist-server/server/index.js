import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import fs from "node:fs";
import { seoMiddleware } from "./seo-middleware.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 8090;
async function createServer() {
    const app = express();
    let vite = null;
    if (!isProduction) {
        // Development: use Vite's dev server as middleware
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    }
    else {
        // Production: serve static files
        app.use(express.static(resolve(__dirname, "../dist"), { index: false }));
    }
    // SSR middleware for social crawlers on article pages
    app.use(seoMiddleware);
    // Fallback: serve index.html for SPA routing
    app.get("*", async (req, res) => {
        const indexPath = isProduction
            ? resolve(__dirname, "../dist/index.html")
            : resolve(__dirname, "../index.html");
        let html = fs.readFileSync(indexPath, "utf-8");
        if (!isProduction && vite) {
            html = await vite.transformIndexHtml(req.url, html);
        }
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
    });
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
createServer();
