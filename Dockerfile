# ---------- Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Vite app
RUN pnpm build

# ---------- Serve ----------
FROM node:20-alpine
WORKDIR /app

# Enable pnpm again (new stage)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy built files
COPY --from=builder /app/dist ./dist

# Install only what is needed to serve (vite)
RUN pnpm add -g vite

EXPOSE 8090

# Serve the built app
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "8090"]
