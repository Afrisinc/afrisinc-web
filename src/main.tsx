import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadRuntimeConfig } from "./lib/config";

loadRuntimeConfig().then(() => {
  createRoot(document.getElementById("root")!).render(
    <App />
  );
}).catch((error) => {
  console.error("Failed to load runtime configuration:", error);
  createRoot(document.getElementById("root")!).render(
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Configuration Error</h1>
      <p>Failed to load application configuration. Please check the config.json file.</p>
      <pre style={{ background: "#f5f5f5", padding: "10px", overflow: "auto" }}>
        {error.message}
      </pre>
    </div>
  );
});
