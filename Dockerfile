FROM node:14-slim AS website-builder
RUN apt-get update \
  && apt-get install -y nodejs yarn

WORKDIR /website
COPY ./website ./
RUN yarn install
RUN yarn build

WORKDIR /rpg-sandbox
COPY ./rpg-sandbox ./
RUN yarn install
RUN yarn build

FROM nginx
COPY ./.docker/nginx/default.conf /etc/nginx/templates/default.conf.template
COPY --from=website-builder /website/dist /usr/share/nginx/html/website
COPY --from=website-builder /rpg-sandbox/dist /usr/share/nginx/html/rpg-sandbox

CMD ["nginx", "-g", "daemon off;"]