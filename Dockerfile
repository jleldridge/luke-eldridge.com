# FROM node:14-slim AS website-builder
# RUN apt-get update \
#   && apt-get install -y nodejs yarn

# WORKDIR /web
# COPY ./web ./
# RUN yarn install
# RUN yarn build

FROM nginx
RUN apt-get update \
  && apt-get install -y curl
COPY ./.docker/nginx/default.conf /etc/nginx/templates/default.conf.template
COPY /web /usr/share/nginx/html/web
# COPY --from=website-builder /rpg-sandbox/dist /usr/share/nginx/html/rpg-sandbox

CMD ["nginx", "-g", "daemon off;"]