FROM node:23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /sources

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

FROM prod-deps AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM dev-deps AS builder
COPY . .
ARG NODE_ENV
RUN pnpm run build

FROM base AS web-runtime
WORKDIR /opt/@ladesa/web
COPY --from=builder /sources/.output /opt/@ladesa/web/.output
CMD node .output/server/index.mjs