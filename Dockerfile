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

# Build the app (assuming Vite)
RUN pnpm build

# ---------- Serve ----------
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8090
CMD ["nginx", "-g", "daemon off;"]
