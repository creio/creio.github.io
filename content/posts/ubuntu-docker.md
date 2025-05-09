---
title: "Настройка сервера Ubuntu 24.04 с Docker, Nginx, Dockge, uptime-kuma"
description: "В этой статье описан процесс настройки сервера Ubuntu 24.04 с акцентом на безопасность, установку Docker"
date: 2025-05-09T12:41:39+03:00
draft: false
weight: 50
image: ""
categories: []
tags:
    - ubuntu
    - docker
contributors: []
pinned: false
toc: true
edit: true
---

В этой статье описан процесс настройки сервера Ubuntu 24.04 с акцентом на безопасность, установку Docker, Nginx и удобного инструмента управления контейнерами Dockge. Мы создадим пользователя, настроим SSH, установим необходимые сервисы и обеспечим базовую защиту сети.

https://youtu.be/tXoCfyIWmwA

- 🔥 aeza бонус 15% к пополнению: [https://aeza.net/](https://aeza.net/?ref=681303)
- 🔥 Приватная Email рассылка: [https://kit.ctlos.ru/subscribe](https://kit.ctlos.ru/subscribe?utm_source=notion)

## 1. Создание пользователя

Начнем с создания пользователя `ubuntu` и настройки его окружения:

```bash
groupadd ubuntu

useradd -m -g ubuntu -G "adm,users,sudo" -s /bin/bash ubuntu

passwd ubuntu

exit
```

Команда создает пользователя с домашней директорией, добавляет его в группы `adm`, `users` и `sudo`, задает оболочку Bash и позволяет установить пароль.

## 2. Настройка SSH-доступа

Для безопасного подключения создадим SSH-ключ и передадим его на сервер:

```bash
ssh-keygen -t rsa -q -N '' -f ~/.ssh/id_rsa

cat .ssh/id_rsa.pub | ssh root@45.223.22.224 'mkdir -p /home/ubuntu/.ssh && cat >> /home/ubuntu/.ssh/authorized_keys'

ssh ubuntu@45.223.22.224
```

Генерируется RSA-ключ без пароля, публичный ключ копируется в файл `authorized_keys` на сервере, затем выполняется подключение.

## 3. Конфигурация SSH-сервера

Настроим SSH для повышения безопасности:

```bash
sudo nano /etc/ssh/sshd_config
```

Укажем следующие параметры:

```bash
Port 2222
PermitRootLogin no
PubkeyAuthentication yes
AllowUsers ubuntu
AuthorizedKeysFile  .ssh/authorized_keys .ssh/authorized_keys2
PasswordAuthentication no
```

Дополнительно отключим аутентификацию по паролю:

```bash
sudo nano /etc/ssh/sshd_config.d/50-cloud-init.conf
```

```bash
PasswordAuthentication no
```

Перезагрузим сервер:

```bash
reboot
# или sshd
systemctl restart ssh
```

После перезагрузки подключимся по новому порту:

```bash
ssh -p 2222 ubuntu@45.223.22.224
```

## 4. Настройка прав sudo

Дадим пользователю `ubuntu` возможность выполнять команды `sudo` без пароля:

```bash
sudo visudo
```

Добавим строку:

```bash
ubuntu ALL=(ALL:ALL) NOPASSWD: ALL
```

## 5. Обновление системы и установка Docker

Обновим систему и установим зависимости:

```bash
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y git apt-transport-https ca-certificates curl software-properties-common nginx
```

Добавим репозиторий Docker:

```bash
sudo install -m 0755 -d /etc/apt/keyrings

sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc
```

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Установим Docker:

```bash
sudo apt update -y
sudo apt install -y docker-ce
sudo usermod -aG docker ${USER}
newgrp docker
sudo systemctl status docker
```

## 6. Настройка брандмауэра и установка Nginx

Активируем и настроим UFW:

```bash
sudo ufw enable
sudo ufw allow 2222
sudo ufw allow 'Nginx Full'
sudo ufw reload
sudo systemctl enable --now ufw
sudo systemctl status ufw
sudo /usr/lib/systemd/systemd-sysv-install enable ufw
```

## 7. Установка Dockge

Dockge — это удобный веб-интерфейс для управления Docker-контейнерами. Настроим его:

```bash
mkdir -p docker/dockge/data
cd docker/dockge
nano compose.yml
```

Содержимое `compose.yml`:

```yaml
# version: "3.3"
services:
  dockge:
    container_name: dockge
    image: louislam/dockge:latest
    restart: unless-stopped
    ports:
      - 5001:5001
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/app/data
      - /home/ubuntu/docker:/opt/stacks
    environment:
      - DOCKGE_STACKS_DIR=/opt/stacks
```

Запустим контейнер:

```bash
docker compose up -d
```

Проверим состояние и IP-адрес контейнера:

```bash
docker ps
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' dockge
```

## 8. Настройка UFW для Docker

Docker по умолчанию игнорирует UFW, поэтому установим `ufw-docker` для управления портами контейнеров:

```bash
sudo wget -O /usr/local/bin/ufw-docker https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
sudo ufw-docker install
sudo systemctl restart ufw
sudo ufw-docker allow dockge
```

Если нужно удалить правило или отключить `ufw-docker`:

```bash
sudo ufw-docker delete allow dockge
# CTRL+K, Удалите строки между # BEGIN UFW AND DOCKER и # END UFW AND DOCKER
sudo nano /etc/ufw/after.rules
sudo reboot
sudo rm /usr/local/bin/ufw-docker
```

## 9. Проверка состояния

Проверим открытые порты и сеть:

```bash
ss -tulpn
ip a
docker ps
```

## 10. Uptime-kuma

```bash
mkdir ~/docker/uptime-kuma
cd ~/docker/uptime-kuma
nano compose.yaml
```

```bash
# version: "3.3"
services:
  uptime-kuma:
    restart: always
    ports:
      - 3001:3001
    volumes:
      - uptime-kuma:/app/data
    container_name: uptime-kuma
    image: louislam/uptime-kuma:latest
    networks: []
volumes:
  uptime-kuma: {}

networks: {}
```

```bash
# запуск
docker compose up -d

# остановка
docker compose down
```

## Заключение

Теперь сервер Ubuntu 24.04 настроен с безопасным SSH-доступом, Docker, Nginx и Dockge. UFW защищает сеть, а Dockge упрощает управление контейнерами через веб-интерфейс на порту 5001. Эта конфигурация идеально подходит для развертывания современных приложений в контейнерах с базовой защитой и удобством администрирования.
