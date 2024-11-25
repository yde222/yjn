# 1. Base image with workspace setup
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat

# Enable and prepare pnpm
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate
RUN pnpm --version

# 2. Dependency installation
FROM base AS deps
WORKDIR /app

# Copy package configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Install base dependencies
RUN pnpm install --workspace-root --frozen-lockfile

# Copy application source files
COPY apps/biz ./apps/biz
COPY packages ./packages
COPY shared/apis ./shared/apis

# Install app-specific dependencies
RUN pnpm install --filter=./packages/ui... --frozen-lockfile
RUN pnpm install --filter=./apps/biz... --frozen-lockfile

# CSS-related packages for biz
WORKDIR /app/apps/biz
RUN pnpm config set ignore-workspace-root-check true && \
    pnpm add -D postcss postcss-loader css-loader autoprefixer --workspace-root

# 3. Build application
FROM deps AS builder
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLE=1
ENV DO_NOT_TRACK=1
ENV NEXT_PUBLIC_API_URL=https://pims-skcc.com

# Build the application
RUN pnpm build --filter=./apps/biz

# 4. Create runtime image
FROM node:20-alpine AS runner
WORKDIR /app

# Create application user and group
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy runtime dependencies
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm prune --prod

# Copy application build output
COPY --from=builder /app/apps/biz/public ./apps/biz/public
COPY --from=builder /app/apps/biz/.next/standalone ./
COPY --from=builder /app/apps/biz/.next/static ./apps/biz/.next/static

# Set ownership and permissions
RUN mkdir .next && chown -R nextjs:nodejs .next
USER nextjs

# Expose application port
EXPOSE 3000

# Set runtime environment variables
ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLE=1
ENV DO_NOT_TRACK=1
ENV NEXT_PUBLIC_API_URL=https://pims-skcc.com

# Start the application
CMD ["node", "./apps/biz/server.js"]
