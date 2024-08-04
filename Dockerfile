FROM node:22 AS base
# RUN apt update -y
# RUN apt install -y git
WORKDIR /sisgea/sisgha-app

FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm install --omit=dev --ignore-scripts

FROM prod-deps AS dev-deps
RUN npm install

FROM dev-deps AS assets
COPY . .
ARG AUTH_ORIGIN
RUN npm run build
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /sisgea/sisgha-app /sisgea/sisgha-app
WORKDIR /sisgea/sisgha-app
CMD npm run start
