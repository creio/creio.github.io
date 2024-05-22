---
title: "Firewall в linux | iptables | ufw"
description: ""
date: 2021-10-23T21:45:16+03:00
lastmod: 2023-04-24T21:45:16+03:00
draft: false
weight: 50
image: false
categories: []
tags:
    - firewall
contributors: []
pinned: false
toc: true
edit: true
---

Firewall — межсетевой экран. Просмотр инфы по портам, в пакете iproute2.

```bash
ss -tulpn
```

Самый распространенный iptables, над ним как правило уже обертки, типо ufw. Я использую ufw, так как не нужно городить огромные команды, как это происходит в чистом iptables.

## Ufw

Пакет есть в любом дистрибутиве. Предварительно включаем ssh, так как может порвать связь, а по дефолту все закрыто.

### Установка и включение

```bash
sudo pacman -S ufw

sudo ufw allow ssh
sudo ufw enable
sudo systemctl enable --now ufw.service
```

### Использование

Присутствуют готовые правила, как ssh, а также можно указывать порты и протокол прямо 8080/tcp.

```bash
# справка
sudo ufw help
# статус
sudo ufw status
# перезагрузка
sudo ufw reload
# выключение
sudo ufw disable
# открыть порт/протокол
sudo ufw allow 8000/tcp
sudo ufw allow 8000/udp
```

### Ubuntu 20.04

В юбунте встретил netfilter-persistent и он перебивал ufw. Соответственно выключаем его и делаем очистку flush, перезагружаем ufw.

```bash
# правила, до
sudo iptables -L

sudo systemctl disable --now netfilter-persistent.service
sudo netfilter-persistent flush

sudo ufw reload
sudo systemctl restart ufw.service
sudo systemctl status ufw.service

# правила, после
sudo iptables -L
```
