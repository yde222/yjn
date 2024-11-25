# 1. 베이스 이미지 설정
FROM node:20-alpine AS base
WORKDIR /app

# 필요한 패키지 설치
RUN apk add --no-cache libc6-compat

# pnpm 설치
RUN npm install -g pnpm
RUN which pnpm && pnpm --version

# 2. 빌드 의존성 단계
FROM base AS deps
WORKDIR /app

# 앱의 루트 디렉토리로부터 필요한 파일을 복사
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY turbo.json ./

# 앱의 실제 소스 파일 복사
COPY apps/docs ./apps/docs
# 앱의 Dependency 파일 복사
COPY packages ./packages
COPY shared ./shared

# pnpm을 사용하여 의존성 설치
RUN pnpm install --frozen-lockfile

# 3. 빌드 단계
FROM base AS builder
WORKDIR /app

# node_modules를 복사
COPY --from=deps /app ./

# Storybook을 빌드
RUN pnpm build --filter ./apps/docs

# 4. 런타임 단계
FROM base AS runner
WORKDIR /app

# 빌드된 Storybook 파일을 복사
COPY --from=builder /app/apps/docs/storybook-static ./storybook-static

EXPOSE 6006

# Storybook을 실행하기 위한 명령어
CMD ["npx", "http-server", "storybook-static", "-p", "6006"]
