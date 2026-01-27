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

# Copy built files
COPY --from=builder /app/dist ./dist

EXPOSE 8090

# Serve the built app (Vite preview)
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "8090"]
