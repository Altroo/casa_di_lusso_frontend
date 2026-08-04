# Multi-stage Dockerfile for casa_di_lusso_frontend (Bun runtime)
# Build stage
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install build deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy sources and build
COPY . .
ARG NEXT_PUBLIC_BACKEND_API=https://api.casadilusso.ma
ARG NEXT_PUBLIC_DOMAIN_URL_PREFIX=https://casadilusso.ma
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_API=$NEXT_PUBLIC_BACKEND_API
ENV NEXT_PUBLIC_DOMAIN_URL_PREFIX=$NEXT_PUBLIC_DOMAIN_URL_PREFIX
RUN bun run build

# Runtime stage
FROM oven/bun:1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built app and production deps
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3008
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q --spider http://127.0.0.1:3008/ || exit 1

CMD ["bun", "run", "start"]
