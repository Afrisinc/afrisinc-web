/**
 * Runtime configuration loader
 * Loads API URL from public/config.json (injected by Docker at runtime)
 * For development: falls back to VITE_API_URL from .env
 * For production: VITE_API_URL must be passed to Docker container
 */

interface RuntimeConfig {
  API_URL?: string;
}

let config: RuntimeConfig | null = null;

export async function loadConfig(): Promise<RuntimeConfig> {
  if (config) {
    return config;
  }

  try {
    const response = await fetch('/config.json');
    if (response.ok) {
      config = await response.json();
      console.log('Loaded runtime config from /config.json');
      return config;
    }
  } catch (error) {
    console.warn('Failed to load /config.json:', error);
  }

  // Fallback to build-time VITE_API_URL (development only)
  const viteUrl = import.meta.env.VITE_API_URL;
  config = {
    API_URL: viteUrl,
  };

  return config;
}

export function getApiUrl(): string {
  if (!config) {
    console.warn('Config not loaded yet, trying build-time VITE_API_URL');
    const viteUrl = import.meta.env.VITE_API_URL;
    if (!viteUrl) {
      throw new Error('API_URL not configured. Set VITE_API_URL env variable for development or pass VITE_API_URL to Docker container for production.');
    }
    return viteUrl;
  }

  if (!config.API_URL) {
    throw new Error('API_URL not configured in config.json. For production, ensure VITE_API_URL is passed to Docker container: docker run -e VITE_API_URL=https://api.example.com ...');
  }

  return config.API_URL;
}
