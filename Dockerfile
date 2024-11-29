FROM node:22 AS base
WORKDIR /app

FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

FROM prod-deps AS dev-deps
RUN npm ci

FROM dev-deps AS builder
COPY . .
ARG NODE_ENV
# ARG AUTH_ORIGIN
RUN npm run build
RUN rm -rf node_modules

FROM base AS web-runtime
WORKDIR /var/lib/ladesa-ro/cr/web
COPY --from=builder /app/.output /var/lib/ladesa-ro/cr/web/.output
CMD node .output/server/index.mjs
