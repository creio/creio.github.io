---
title: "Transmission — раздача торрентов со своего сервера"
description: ""
date: 2021-10-22T22:04:41+03:00
lastmod: 2023-04-24T22:04:41+03:00
draft: false
weight: 50
images: ['transmission.png']
categories: []
tags:
    - torrents
contributors: []
pinned: false
toc: true
edit: true
---

## Установка transmission-daemon

Установка, копирование конфигов в директорию юзера и создание нужных директорий.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install transmission-daemon -y

sudo systemctl stop transmission-daemon

sudo cp -R /etc/transmission-daemon ~/.config/
sudo chown -R $USER ~/.config/transmission-daemon

mkdir ~/Torrents
mkdir -p ~/Downloads/.incomplete
nano ~/.config/transmission-daemon/settings.json
```

## Конфигурация демана

В rpc-whitelist укажите свой ip, узнать curl ident.me, можно указать маску *.*.*.*, но это откроет веб морду для любого ip. Создайте хороший пароль если будете открывать веб морду по маске.

```bash
    "download-dir": "/home/ubuntu/Downloads",
    "incomplete-dir": "/home/ubuntu/Downloads/.incomplete",
    "incomplete-dir-enabled": true,
    "rpc-authentication-required": false,
    "rpc-password": "pass",
    "rpc-username": "admin",
    "rpc-whitelist": "127.0.0.1,100.123.10.170",
    "watch-dir": "/home/ubuntu/Torrents",
    "watch-dir-enabled": true
```

Описание всех настроек settings.json.

[nastrojka-transmission-daemon-settings-json/](https://pcminipro.ru/os/nastrojka-transmission-daemon-settings-json)

## Системная конфигурация

Меняем рабочего юзера и значения памяти sysctl.

```bash
# rename user
sudo nano /etc/systemd/system/multi-user.target.wants/transmission-daemon.service
sudo systemctl daemon-reload
sudo systemctl start transmission-daemon
sudo systemctl status transmission-daemon

echo "net.core.rmem_max = 4194304" | sudo tee -a /etc/sysctl.d/50-transmission-daemon.conf
echo "net.core.wmem_max = 1048576" | sudo tee -a /etc/sysctl.d/50-transmission-daemon.conf
sudo sysctl --system
sudo systemctl restart transmission-daemon

sudo systemctl status transmission-daemon
```

## Проброс порта ssh

```bash
ssh -L 9091:127.0.0.1:9091 ubuntu@193.122.8.187 -N
```

## Экспорт PATH

Добавляем путь для скриптов.

```bash
echo "export PATH=$HOME/.local/bin:$PATH" >> ~/.bashrc
source ~/.bashrc
```

## Открыть порты

```bash
# open port
51413/tcp
51413/udp
```

Порт 9091/tcp открывать если нужен доступ к веб морде и создайте хороший пароль в таком случае. В ufw.

```bash
sudo ufw allow 51413/tcp
sudo ufw allow 51413/udp
# sudo ufw allow 9091/tcp
sudo ufw reload
sudo ufw status
```

## Скрипт создания torrent файла

```bash
mkdir ~/.local/bin
nano ~/.local/bin/transmission.sh

#!/bin/bash

## transmission.sh /file_name.iso /torrent_file.iso.torrent

# Last update 2021/10/04
# https://github.com/ngosang/trackerslist
# https://ngosang.github.io/trackerslist/trackers_best.txt

TRANSDIR=$HOME/Downloads

cp -r $1 $TRANSDIR

transmission-create $1 -c "https://ctlos.github.io/changelog/"
-t http://p4p.arenabg.com:1337/announce
-t udp://tracker.opentrackr.org:1337/announce
-t udp://9.rarbg.com:2810/announce
-t udp://tracker.openbittorrent.com:6969/announce
-t http://tracker.openbittorrent.com:80/announce
-t http://openbittorrent.com:80/announce
-t udp://exodus.desync.com:6969/announce
-t udp://www.torrent.eu.org:451/announce
-t udp://tracker.torrent.eu.org:451/announce
-t udp://tracker.tiny-vps.com:6969/announce
-t udp://retracker.netbynet.ru:2710/announce
-t udp://retracker.lanta-net.ru:2710/announce
-t udp://opentor.org:2710/announce
-t udp://open.stealth.si:80/announce
-t udp://camera.lei001.com:6969/announce
-t udp://bt2.archive.org:6969/announce
-t udp://bt1.archive.org:6969/announce
-t https://tracker.nitrix.me:443/announce
-t https://tracker.nanoha.org:443/announce
-t https://tracker.lilithraws.cf:443/announce
-o $2

transmission-remote -a $2
```

Команды ниже: листинг, удаление, справка.

```bash
transmission-remote -l

transmission-remote -t 1 -rad

transmission-remote -h
```

Авторизация по паролю, если не отключили "rpc-authentication-required": true,.

```bash
transmission-remote --auth admin:pass
```

Просмотр инфы по портам.

```bash
ss -tulpn
```

## Docker

Установка зависимостей, docker, docker-compose в ubuntu minimal.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt -y install apt-transport-https software-properties-common ca-certificates curl iproute2 gnupg
    git ufw bash-completion htop nano tmux

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update && sudo apt-cache policy docker-ce
sudo apt install docker-ce docker-ce-cli containerd.io -y

dc_version=$(curl -s "https://github.com/docker/compose/releases/latest" | sed 's#.*tag/(.*)".*#1#')
sudo curl -L "https://github.com/docker/compose/releases/download/$dc_version/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

sudo su
passwd
passwd ubuntu
exit

sudo usermod -aG docker ${USER}
su - ${USER}
sudo systemctl enable --now docker
```

Обязательно нужно создать подкачку, если облако не сделало это автоматически, пример создания swapfile.

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
```

И добавляем в /etc/fstab.

```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Берем готовый compose файл [docs.linuxserver.io/images/docker-transmission](https://docs.linuxserver.io/images/docker-transmission). Создаем рабочие директории, переходим в него и создаем композ файл.

```bash
mkdir -p ~/docker-transmission/{config,downloads,watch}
cd ~/docker-transmission
nano docker-compose.yml
```

Поменяйте переменные, id покажет uid, gid.

```bash
---
version: "2.1"
services:
  transmission:
    image: lscr.io/linuxserver/transmission
    container_name: transmission
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Moscow
      - USER=admin #optional
      - PASS=pass #optional
      - WHITELIST=iplist #optional
    volumes:
      - ./config:/config
      - ./downloads:/downloads
      - ./watch:/watch
    ports:
      - 9091:9091
      - 51413:51413
      - 51413:51413/udp
    restart: unless-stopped
```

Запуск.

```bash
docker-compose up -d
```

Войти в контейнер.

```bash
docker exec -it transmission /bin/bash
```

Лог.

```bash
docker logs -f transmission
```

Остановка, перейти в директорию.

```bash
cd ~/docker-transmission
docker-compose down
```

Обновление.

```bash
cd ~/docker-transmission
docker-compose down
docker-compose pull transmission
docker-compose up -d

# удаление старых образов
docker image prune
```

Отключаем видимость ip при ssh логине.

```bash
sudo nano /etc/ssh/sshd_config

PrintLastLog no

sudo systemctl restart sshd
```
