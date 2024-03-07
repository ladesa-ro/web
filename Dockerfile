FROM node:20 as base
RUN apt update -y
RUN apt install -y git
WORKDIR /sisgea/sisgha-app

FROM base as prod-deps
COPY package.json yarn.lock ./
RUN yarn install --prod

FROM prod-deps as dev-deps
RUN yarn install

FROM dev-deps as assets
COPY . .
RUN yarn run build
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /sisgea/sisgha-app /sisgea/sisgha-app
WORKDIR /sisgea/sisgha-app
CMD yarn run start
