FROM php:7.4-fpm

RUN touch /var/log/error_log

ADD ./php/www.conf /usr/local/etc/php-fpm.d/www.conf

RUN addgroup --gid 1000 wp && adduser --gid 1000 --shell=/bin/sh --disabled-password wp

RUN mkdir -p /var/www/html

RUN chown wp:wp /var/www/html

WORKDIR /var/www/html

RUN apt-get update \
  && apt-get install --assume-yes --no-install-recommends --quiet \
    build-essential \
    libmagickwand-dev \
    libzip-dev \
    zip \
  && apt-get clean all

RUN docker-php-ext-install mysqli pdo pdo_mysql gd exif zip intl \
  && pecl install imagick \
  && docker-php-ext-enable pdo_mysql intl

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

RUN chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp
