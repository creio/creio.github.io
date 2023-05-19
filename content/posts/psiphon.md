---
title: "Psiphon linux, обходим блокировку трафика"
description: ""
date: 2020-08-10T22:01:13+03:00
lastmod: 2023-04-24T22:01:13+03:00
draft: false
weight: 50
images: []
categories: []
tags:
    - vpn
contributors: []
pinned: false
toc: true
edit: true
---

Обходим блокировку сайтов с помощью psiphon.

## Archlinux

В aur лежит пакет.

- [brainfuck-psiphon-pro-go](https://aur.archlinux.org/packages/brainfuck-psiphon-pro-go-bin/)
- [Репо проекта](https://github.com/aztecrabbit/brainfuck-psiphon-pro-go)

## Установка

```bash
yay -S brainfuck-psiphon-pro-go-bin
```

### Использование

Запуск командой sudo brainfuck-psiphon-pro-go. Увидите примерно такой вывод.

```bash
Brainfuck Tunnel [Psiphon Pro Go Version. 1.3.210109]
(c) 2020 Aztec Rabbit.

[17:15:55] :: INFO :: Domain Fronting running on port 8989
[17:15:55] :: INFO :: Proxy Rotator running on port 3080
[17:15:55] :: 3081 :: Connecting
[17:15:55] :: 3082 :: Connecting
[17:15:55] :: 3084 :: Connecting
[17:15:55] :: 3083 :: Connecting
[17:16:08] :: 3083 :: Connected
[17:16:09] :: 3082 :: Connected
[17:16:09] :: 3081 :: Connected
[17:16:10] :: 3084 :: Connected
```

Можно запустить с использованием региона (us,nl,sg).

```bash
sudo brainfuck-psiphon-pro-go -r nl
```

Прописываем прокси в браузере, или в telegram. Прокси ратируются на портах 3080-3084 в моем случае, наверняка у вас также.

```bash
http proxy: 127.0.0.1 port 3080
https proxy: 127.0.0.1 port 3080
ftp proxy: 127.0.0.1 port 3080
socks: 127.0.0.1 port 3080
```

Chromium можно запустить с флагом.

```bash
chromium --proxy-server='socks://127.0.0.1:3080'
```

В firefox используйте расширение FoxyProxy, или в параметрах сети укажите только SOCKS5.

> В настройках расширения, Добавить новый SOCKS5, ip: 127.0.0.1, port: 3080

### Конфигурация

Можно изменить `ProxyRotator` порт, если нужно.

```bash
# nano ~/.config/brainfuck-psiphon-pro-go/config.json

{
  "ProxyRotator": {
    "Port": "3080"
  },
  "Inject": {
    "Enable": true,
    "Type": 2,
```

Help.

```bash
sudo brainfuck-psiphon-pro-go -h
```
