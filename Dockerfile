FROM node:14-slim AS website-builder
RUN apt-get update \
  && apt-get install -y nodejs yarn

WORKDIR /website
COPY ./website ./

RUN yarn install
RUN yarn build

FROM nginx
COPY --from=website-builder /website/dist /usr/share/nginx/html
