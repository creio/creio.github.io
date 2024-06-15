---
title: "Доступность веб сервера в tor и создание onion домена | Nginx tor onion"
description: ""
date: 2021-09-13T21:55:04+03:00
draft: false
weight: 50
image: "/images/nginx-onion.png"
categories: []
tags:
    - dev
    - linux
contributors: []
pinned: false
toc: true
edit: true
---

Как запустить веб приложение и открыть доступность через tor в доменной зоне onion.

- [Video](https://www.youtube.com/watch?v=1ioGn-2JaiM)

Все действия выполняются на Arch Linux, но суть везде одинакова, разница только в пакетном менеджере.

- [www.cloudflare.com/](https://www.cloudflare.com/)

## Установка софта

Локально нужен только tor или tor браузер для доступа к будущему сервису, я буду использовать chromium с прокси портом тора 9050.

```bash
yay -S tor chromium
```

На сервере нужен tor и nginx.

```bash
yay -S tor nginx
```

## Настройка tor

Отредактировать конфиг на сервере /etc/tor/torrc, раскомментировать 2 строки.

```bash
sudo nano /etc/tor/torrc

HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:80
```

## Генерация onion домена v3

> Генерировать не обязательно, по умолчанию tor сам создает нужные файлы в hidden_service при рестарте, но их можно удалить и создать имя с кастомным началом в hostname. Чем длиннее имя, тем дольше генерация.

- [github.com/cathugger/mkp224o](https://github.com/cathugger/mkp224o)

```bash
git clone https://github.com/cathugger/mkp224o
cd mkp224o
./autogen.sh
./configure
make
# -t 2  потоки cpu, -n кол-во имен, имя topor
./mkp224o topor -t 2 -v -n 1 -d ~/hs-keys
#
scp -r ~/hs-keys user@123.123.123.123:~/
```

> Рекомендую сохранить ключи и hostname.

## Права на hidden_service

На сервере после переноса файлов.

```bash
ssh user@123.123.123.123
sudo cp -r ~/hs-keys/*/* /var/lib/tor/hidden_service/
sudo chmod 700 /var/lib/tor/hidden_service
sudo chown -R tor:tor /var/lib/tor/hidden_service/
sudo systemctl restart tor
sudo systemctl status tor
sudo cat /var/lib/tor/hidden_service/hostname
```

## Настройка nginx

> Важный момент, onion работает по http поэтому не нужно использовать редиректы на 443 порт https [О первоначальной настройке nginx смотри тут](/posts/web-server).

Дефолтный конфиг `/etc/nginx/nginx.conf`, можно в секцию server добавить созданный onion домен и он будет выдавать содержимое по умолчанию из `/usr/share/nginx/html`, в данном случае `index.hmtl`.

```bash
# вырезка /etc/nginx/nginx.conf
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name ctlos5lhe2vc3giixr.onion;

        root /usr/share/nginx/html;
        index index.htm index.html;
...
```

Простой конфиг, Nginx выводит содержимое директории.

```bash
sudo nano /etc/nginx/sites-available/onion.conf
sudo ln -s /etc/nginx/sites-available/onion.conf /etc/nginx/sites-enabled
```

```bash
server {
  # директория со статикой сайта
  server_name ctlos5lhe2vc3giixr.onion;
  root /home/cretm/app/cloud.ctlos.ru;
  listen 80;
  listen [::]:80;

  location / {
    autoindex on;
    try_files $uri $uri/ =404;
  }
}
```

Проверка и рестарт web сервера.

```bash
sudo nginx -t
sudo systemctl restart nginx
```

Конфиг с 2 доменами и ssl. С указанием Onion-Location, добавляет фиолетовый знак в тор браузере, сайт обязательно должен иметь ssl на основном домене.

```bash
sudo nano /etc/nginx/sites-enabled/onion.conf
```

```bash
server {
  server_name dev.ctlos.ru;
  server_name ctlos5lhe2vc3giixr.onion;
  root /home/cretm/app/cloud.ctlos.ru;

  listen 80;
  listen [::]:80;

  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/dev.ctlos.ru/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/dev.ctlos.ru/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  location / {
    autoindex on;
    try_files $uri $uri/ =404;
    add_header Onion-Location "http://ctlos5lhe2vc3giixr.onion$request_uri" always;
  }
}
```

Реверс прокси nginx. Пример направления домена на порт 5000 на котором работает не важно какой веб сервис, в данном случае Whoogle.

```bash
server {
  server_name ctlos5lhe2vc3giixr.onion;
  # reverse proxy
  location / {
    proxy_pass http://localhost:5000;  # Whoogle
    proxy_redirect off;
    add_header Onion-Location "http://ctlos5lhe2vc3giixr.onion$request_uri" always;

    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Proxy "Cloud-LB";
    proxy_set_header Upgrade $http_upgrade;
    proxy_pass_header Server;

    proxy_buffering off;
    proxy_http_version 1.1;
    tcp_nodelay on;
  }
}
```

- [Поблагодарить меня можно тут](https://ctlos.github.io/donat/)
- Вопросы и предложения можно оставить в чате [@ctlos](https://telegram.me/ctlos)
