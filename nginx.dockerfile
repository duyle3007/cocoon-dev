FROM nginx:stable-alpine

ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
ADD ./nginx/certs /etc/nginx/certs/self-signed
ADD ./nginx/ssl /etc/nginx/ssl 

RUN mkdir -p /var/www/html
