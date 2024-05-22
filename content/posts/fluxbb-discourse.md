---
title: "Перенос форума fluxbb на discourse"
description: ""
date: 2021-06-19T21:48:04+03:00
lastmod: 2023-04-24T21:48:04+03:00
draft: false
weight: 50
image: false
categories: []
tags:
    - dev
    - fluxbb
contributors: []
pinned: false
toc: true
edit: true
---

Для переноса нужно получить базу данных форума fluxbb, наверняка вы знаете как это сделать, но если нет, то вот. Данные для подключение к базе, которые вы создавали, или то, что предоставил хостер, при создании.

- host_ip - ip или домен mysql.
- user_db - имя пользователя базы
- PASS_WORD_DB - пароль к базе
- db_name - имя базы

```bash
# получение через ssh
ssh creio@125.120.10.54 "mysqldump -h host_ip -u user_db -pPASS_WORD_DB db_name" > ~/forum.sql
```

## Login в docker

Копируем mysql дамп базы в докер контейнер и логинемся в него.

```bash
docker cp ~/forum.sql app:/var/www/discourse

# docker exec -it app /bin/bash --login
sudo ./launcher enter app
```

Установка mysql и запуск.

```bash
apt install -y mariadb-server mariadb-client libmariadb-dev
service mysql start
```

Создаем mysql базу, в которую выгрузим старые данные.

```bash
mysql -u root -p mysql
mysql> CREATE USER 'fluxbb'@'localhost' IDENTIFIED BY 'fluxbb';
mysql> CREATE DATABASE fluxbb;
mysql> GRANT ALL PRIVILEGES ON fluxbb.* TO 'fluxbb'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> exit
```

Логинимся под юзера discourse.

```bash
su discourse
```

Экспортируем базу данных fluxbb.

```bash
mysql -u fluxbb -p fluxbb < forum.sql
# pass
fluxbb
```

Добавляем зависимости в Gemfile.

```bash
echo "gem 'mysql2'" >> Gemfile
echo "gem 'redcarpet'" >> Gemfile
echo "gem 'ruby-bbcode-to-md', git: 'https://github.com/nlalonde/ruby-bbcode-to-md'" >> Gemfile
echo "gem 'reverse_markdown'" >> Gemfile
```

Установка зависимостей для корректной конвертации.

```bash
bundle config unset deployment
bundle install --no-deployment --path vendor/bundle --jobs 4 --without test development
```

Данные для подключение к mysql, возможно у вас нет FLUXBB_PREFIX в базе и будет ошибка, попробуйте убрать это значение.

```bash
FLUXBB_HOST="localhost" FLUXBB_DB="fluxbb" FLUXBB_USER="fluxbb" FLUXBB_PW="fluxbb" FLUXBB_PREFIX="bb_" bundle exec ruby script/import_scripts/fluxbb.rb
```

Изменение домена, полезно выполнить на тестовом домене, а когда все готово изменить на основной, [meta.discourse.org](https://meta.discourse.org/t/change-the-domain-name-or-rename-my-discourse/16098).

## Обновление discourse

Первым делом стоит обновить сам сервер(ubuntu/debian).

```bash
apt-get update
apt-get dist-upgrade
```

Включить автообновления(не обязательно) и не везде это возможно, для убунту.

```bash
sudo dpkg-reconfigure -plow unattended-upgrades
```

Discourse работает в докере и используются скрипты для упрощения.

```bash
sudo su
cd /var/discourse
git pull
./launcher rebuild app
```

После обновления и запусков rebuild будут плодится контейнеры и images, которые забивают диск, но не используются.

```bash
# размер диска
df -h /
# размеры директорий
du -sh /var/lib/*
```

Удалить не нужные образы можно через docker, или через скрипт, имейте ввиду скрипт снесет все остановленные контейнеры и удалит все неиспользуемые образы. Дело в том, что если у вас работает, что-то еще кроме discourse в докере, то лучше работать именно самим docker-ом и удалять по id(7281bf55ce46).

```bash
# листинг контейнеров
docker ps -a
# удаление контейнеров(CONTAINER ID)
docker rm 8ee579ceabf7

# листинг образов
docker images
# удаление образов(IMAGE ID)
docker rmi 7281bf55ce46

# удаление всего скриптом
./launcher cleanup
```

Очистка системы apt.

```bash
apt-get autoclean
apt-get autoremove
```
