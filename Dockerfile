FROM node:24 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable
COPY . /sources
WORKDIR /sources

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM prod-deps AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM dev-deps AS builder
RUN pnpm run -w build:all

FROM base AS web-runtime
WORKDIR /opt/ladesa/web
COPY --from=builder /sources/sisgha-sisgea/.output /opt/ladesa/web/.output
CMD ["node", ".output/server/index.mjs"]
