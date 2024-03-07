FROM node:20 as base
RUN apt update -y
RUN apt install -y git
WORKDIR /sisgea/sisgha-app

FROM base as prod-deps
COPY package.json package-lock.json ./
RUN npm install --omit=dev

FROM prod-deps as dev-deps
RUN npm install

FROM dev-deps as assets
COPY . .
RUN npm run build
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /sisgea/sisgha-app /sisgea/sisgha-app
WORKDIR /sisgea/sisgha-app
CMD npm run start
