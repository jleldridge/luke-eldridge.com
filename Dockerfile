FROM nginx
RUN apt-get update \
  && apt-get install -y curl
COPY ./.docker/nginx/default.conf /etc/nginx/templates/default.conf.template
COPY /web /usr/share/nginx/html/web

CMD ["nginx", "-g", "daemon off;"]