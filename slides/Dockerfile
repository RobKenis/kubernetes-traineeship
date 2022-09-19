FROM node:16-bullseye-slim AS build

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY tsconfig.json tsconfig.json
COPY public/ public/
COPY src/ src/

RUN yarn build

FROM nginx:latest

COPY --from=build /app/build/ /usr/share/nginx/html
COPY metrics/prometheus /usr/share/nginx/html/metrics/prometheus