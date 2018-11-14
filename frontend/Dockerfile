FROM nginx:1.13.12-alpine

COPY ./dist /usr/share/nginx/html

ADD  ./nginx/conf.d /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]