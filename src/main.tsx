import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadRuntimeConfig } from "./lib/config";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

loadRuntimeConfig()
  .then(() => {
    createRoot(document.getElementById("root")!).render(<App />);
  })
  .catch(() => {
    // Still render the app even if config fails to load
    // Configuration will fall back to build-time env vars
    createRoot(document.getElementById("root")!).render(<App />);
  });
