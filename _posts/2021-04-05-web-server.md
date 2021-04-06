---
title: Настройка и использование Nginx в Arch Linux | Docker Portainer
description: Nginx reverse proxy, проброс локальной сети на сервер, через wireguard. Portainer — gui для docker контейнеров.
image: /uploads/web-server.png
modified: 2021-04-05
tags: Linux
---

Nginx reverse proxy, проброс локальной сети на сервер, через wireguard. Portainer — gui для docker контейнеров.

![Web server](/uploads/web-server.png)

## Содержание
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Nginx локально

Для установки на Arch.

```bash
sudo pacman -S nginx
```

- [Nginx docs](http://nginx.org/ru/docs/beginners_guide.html)
- [ArchWiki Nginx](https://wiki.archlinux.org/index.php/Nginx_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9))

Глобальный конфиг, при обращении по ip, nginx будет отдавать стандартную страницу, по пути `/usr/share/nginx/html/index.html`, некоторые настройки и импорты других конфигураций `include`, user - указываю юзера `creio`, от которого я работаю и из его директории в дальнейшем буду импортировать статичный сайт `/media/files/github/ctlos/ctlos.github.io/_site`, который сгенерирован `jekyll`, точнее это не его домашняя директория, но права на нее принадлежат ему.

```bash
sudo nano /etc/nginx/nginx.conf

user creio users;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    #access_log  logs/access.log  main;
    types_hash_max_size 4096;
    server_names_hash_bucket_size 128;
    sendfile        on;
    #tcp_nopush     on;
    keepalive_timeout  65;
    gzip  on;

    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /usr/share/nginx/html;
        index index.htm index.html;

        server_tokens off;
        autoindex off;
    }

    include sites-enabled/*;
}
```

Создаем 2 директории в available будем складывать все конфиги сайтов, а в enabled будем создавать сим линки `ln -s` на то, что хотим включить, если нужно выключить, то просто удаляем конфиг(симлинк) из enabled. Файлы в этих директориях, как зеркала, не важно откуда мы их будем править.

```bash
sudo mkdir /etc/nginx/sites-{available,enabled}
sudo nano /etc/nginx/sites-available/home.conf
sudo ln -s /etc/nginx/sites-available/home.conf /etc/nginx/sites-enabled
# если нужно удалить и не забудь перезапустить nginx
sudo rm /etc/nginx/sites-enabled/home.conf
```

### Команды nginx

Проверить конфигурацию на валидность.

```bash
sudo nginx -t
```

Запуск сервера, рестарт, стоп, средствами systemd.

```bash
sudo systemctl start nginx

sudo systemctl restart nginx

sudo systemctl stop nginx

sudo systemctl status nginx
```

Добавить в авто старт и убрать, если нужно.

```bash
sudo systemctl enable nginx

sudo systemctl disable nginx
```

Просмотр логов в зависимости, что указали в `access_log` и `error_log`.

```bash
cat /var/log/nginx/home.access
```

Я использую `server_name` домен, но можно манипулировать портами, если нет доменного имени, или воспользоваться [freedns](https://www.duckdns.org/), no-ip и подобные. В конфиге ниже нет привязки к домену, а именно к порту, можно использовать и то и другое, как вместе, так и отдельно. В данном случае в браузере мы должны обратится ip:port `ip:4000`. Команда `ip a` покажет ip, обычно это `127.0.0.1`(localhost), можно и так `localhost:4000`

```bash
# cat /etc/nginx/sites-available/home.conf
server {
  listen 4000;
  listen [::]:4000;
  # server_name creio.duckdns.org;

  root /media/files/github/ctlos/ctlos.github.io/_site;
  index index.html index.htm index.php;

  access_log /var/log/nginx/home.access;
  error_log /var/log/nginx/home.error;

  location / {
      autoindex on;
      try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    if ($request_uri = /index.html) {
        return 301 /;
    }
}
```

Пример запуска jekyll, по умолчанию он стартует на localhost`127.0.0.1`, порт 4000, но через vpn доступа к нему вы не получите, решение указать хост `-H 0.0.0.0`. В этом случае нам локально не нужен запущенный nginx, а сразу же настраиваем реверс на сервере. Jekyll используется для примера, тут может быть любое приложение на любом порту.

```bash
bundle exec jekyll serve -H 0.0.0.0
```

Команду можно повесить в авто запуск.

## Nginx на сервере

Конфиг проброса (reverse proxy) локалки на сервер через vpn(wireguard), о его настройке я [писал тут](http://creio.github.io/vpn).

```bash
curl ident.me

sudo systemctl start wg-quick@wg0

ip a
```

Важный момент, если вы хотите иметь доступ к работающим докерам в локальной сети из вне (https://stackoverflow.com/q/32103885), через vpn, находясь за nat с динамическим ip, обязательно используйте host сеть(0.0.0.0) `--network host`. При создании конфигурации в portainer, выбирайте сеть host для контейнера, или при ручном запуске контейнера указывайте(`--network host`). Просмотр сведений о сети.

```bash
# iproute2
ss -tulpn
```

Приложение работает и теперь можно настроить реверс прокси на сервере впн к этому порту, конфиг почти такой же как и в примере выше, только убираем путь `root`.

```bash
cat /etc/nginx/sites-enabled/home.ctlos.ru.conf
# содержимое
server {
    listen 80;
    listen [::]:80;
    server_name creio.duckdns.org;

    access_log /var/log/nginx/home.access;
    error_log /var/log/nginx/home.error;

    # reverse proxy
    location / {
        proxy_pass http://10.0.0.10:4000;
        # proxy_redirect http:// $scheme://;
        proxy_redirect off;
        proxy_buffering off;
        tcp_nodelay on;

        proxy_http_version 1.1;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Proxy "Cloud-LB";
        proxy_set_header Upgrade $http_upgrade;
    }
}
```

В `proxy_pass http://10.0.0.10:4000;` указываем ip wg клиента, то есть ваш локальный ip интерфейса wg, команда `ip a` покажет его.

Рестарт nginx и посмотрим статус.

```bash
sudo systemctl restart nginx

sudo systemctl status nginx
```

Просмотр отдачи инфы сервером в vpn сети. Должно отдавать одни и теже данные, как локально, так и на сервере.

```bash
curl 10.0.0.10:4000
```

> Таким образом можно создать множество сайтов, пробросить нужные приложения в сеть из локальной сети, но обязательное условие, иметь сервер, иначе в этом мало смысла.

## Docker Portainer

> В данном подходе не обязательно иметь сервер и можно забыть о vpn, а организовать все локально, без всяких доступов за nat. Поднять в докерах plex, nextcloud и многое другое, а portainer позволяет легко этим управлять.

Установка [Doker](https://wiki.archlinux.org/index.php/Docker), docker-compose и настройка.

```bash
sudo pacman -S docker-compose
```

Добавляем пользователя от которого работаем(username) в группу docker.

```bash
sudo usermod -aG docker username
```

Возможно стоит перезагрузиться. Включаем сервис и добавляем в авто-старт, если нужно.

```bash
sudo systemctl start docker

sudo systemctl enable docker
```

[Portainer](https://documentation.portainer.io/v2.0/deploy/ceinstalldocker/) — веб интерфейс на 9000 порту, для управления docker контейнерами.

Создадим диск `portainer_data`, как сказано в доках.

```bash
docker volume create portainer_data
```

Одна из команд ниже запустит portainer, о хост сети я уже говорил выше, но можно и использовать 2 команду, только необходимо немного [ковырнуть докер](https://wiki.archlinux.org/index.php/Docker#Daemon_socket). В случае отказа запуска сервиса docker, попробуйте.

```bash
sudo systemctl daemon-reload
sudo rm -rf /var/run/docker.sock
sudo systemctl restart docker
```

Если вы изменили socket, как сказано в вики, то используйте вторую команду, контейнер будет доступен в vpn сети на 9000 порту.

```bash
# запуск в host сети
docker run -d --network host --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce --logo "https://ctlos.github.io/assets/img/logo.svg"

# bridge ports, portainer-ce
docker run -d -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce --logo "https://ctlos.github.io/assets/img/logo.svg"
```

### Команды docker

```bash
# список контейнеров
docker ps

# остановка ID или Name
docker stop portainer

# запуск ID или Name
docker start fc46d04d334d

# удалить
docker rm portainer

# удалить диск
docker volume rm portainer_data
```

Многое можно делать в терминале, точнее все. [Документация](https://docs.docker.com/), рекомендую детальней изучить docker-compose.
