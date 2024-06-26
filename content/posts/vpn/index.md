---
title: "Как Создать и Настроить VPN сервер в Linux | Wireguard"
description: ""
date: 2021-01-31T09:19:42+01:00
draft: false
weight: 50
image: ""
categories: []
tags:
    - network
contributors: []
pinned: false
toc: true
edit: true
---

Речь пойдет о шифровании трафика в сети и обходе блокировок, рассмотрю несколько способов.

- [Video](https://www.youtube.com/watch?v=4FmWp04auX4)
- [Всё реализовано в дроплете Digital Ocean](https://m.do.co/c/49c4dbf3d0ca)
- [Psiphon о котором я уже упоминал в прошлом посте](/posts/psiphon)

- Ssh туннель через сервер в tor
- Sshuttle прокси
- Wireguard

Гуляем по сети, как рыбы в океане :).

## Ssh туннель

Установить ssh.

```bash
yay -S openssh
```

Допустим на вашем сервере запущен tor или прокси, через ssh легко можно пробросить порт на котором это работает. Про настройку ssh я писал в ctlos wiki.

- [Ctlos wiki ssh](https://ctlos.github.io/wiki/config/ssh/)
- [OpenSSH](https://wiki.archlinux.org/index.php/OpenSSH)
- [Tor](https://wiki.archlinux.org/index.php/tor)

Установить tor.

```bash
yay -S tor torsocks
```

```bash
ssh -L 9050:127.0.0.1:9050 -p 22 cretm@134.122.88.241 -N
```

- 127.0.0.1(localhost) — локальный адрес.
- Первый 9050, локальный порт.
- Второй 9050, на сервере.
- -N говорит не открывать соединение, а только проброс.

Теперь локально доступен 9050 и можно открыть на нем chromium в другом терминале.

```bash
chromium --proxy-server='socks://127.0.0.1:9050'
```

Или посмотреть ip через torify, или запустить шелл и выполнять все через tor.

```bash
torify curl ident.me
# или
torify zsh
```

## Sshuttle

Позволяет завернуть весь трафик через ssh сервер.

- [repo](https://github.com/sshuttle/sshuttle)
- [Статейка habr](https://habr.com/ru/post/318694/)
- [И еще одна](https://eax.me/sshuttle/)

Установка.

```bash
yay -S sshuttle
```

Запуск.

```bash
sshuttle --dns -r cretm@134.122.88.241 -x 134.122.88.241 0/0
```

## Wireguard

Я все проделываю скриптом easy-wg-quick.

- [Arch Wiki wireguard](https://wiki.archlinux.org/index.php/WireGuard)
- [easy-wg-quick](https://github.com/burghardt/easy-wg-quick)
- [wireguard quickstart](https://www.wireguard.com/quickstart/)

### Сервер

```bash
yay -S wireguard-tools gawk grep iproute2 net-tools qrencode wget

# если ядро lts
yay -S wireguard-lts

mkdir vpn && cd vpn

wget -O vpn.sh https://raw.githubusercontent.com/burghardt/easy-wg-quick/master/easy-wg-quick

chmod +x vpn.sh
```

> Выполните reboot после установки.

Можно задать конкретный порт и ip. Узнать.

- Если за nat curl ident.me
- Нет nat ip a

Путем отправки данных в файлы.

```bash
curl ident.me > extnetip.txt
# или
echo 134.122.88.241 > extnetip.txt

echo 51820 > portno.txt
```

Создание конфигурации и клиента.

```bash
./vpn.sh comp
```

Запуск, остановка, статус работы.

```bash
sudo wg-quick up ./wghub.conf
sudo wg-quick down ./wghub.conf
sudo wg show
```

Открыть порт если установлен файрвол, рестарт и просмотр статуса.

```bash
sudo ufw allow 51820/udp
sudo ufw reload
sudo ufw status
netstat -tulpn
```

Если на сервере iptables.

```bash
sudo iptables --policy INPUT ACCEPT
sudo iptables -F
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -j ACCEPT
sudo iptables -A INPUT -p udp --dport 51820 -m state --state NEW -j ACCEPT
sudo netfilter-persistent save
```

Удалить правило, где 5 линия. В данном случае удалять ничего не нужно, просто знайте, как работает удаление.

```bash
sudo iptables --list --line-numbers
sudo iptables -D INPUT 5
sudo netfilter-persistent save
```

Создаем второго клиента для мобилки. Сканируем qr в приложении wireguard и перезапускаем сервер.

```bash
./vpn.sh mob
sudo wg-quick down ./wghub.conf
sudo wg-quick up ./wghub.conf
sudo wg show
```

Вывод qr кода.

```bash
qrencode -t ansiutf8 < wgclient_mob.conf
```

Основной конфиг с инфой о клиентах.

```bash
cat wghub.conf
```

Можно добавить в автостарт systemd.

```bash
sudo cp wghub.conf /etc/wireguard/wghub.conf
sudo systemctl enable --now wg-quick@wghub
systemctl status wg-quick@wghub
```

### Клиент

Для клиента Arch Linux. Настройка на вашем компе.

```bash
yay -S wireguard-tools
sudo nano /etc/wireguard/wg0.conf
```

Скопировать с сервера содержимое файла `wgclient_comp.conf`, пример.

```bash
# 10: comp > wgclient_comp.conf
[Interface]
Address = 10.256.112.10/24, fd51:9999:3322:6414::10/64
DNS = 1.1.1.1, 2606:4700:4700::1111
PrivateKey = UGdsdfgsdgdfgiJRhlQdX7kQ=

[Peer]
PublicKey = wvr/gmg/FJN0dfgdfhdfhudRLdIdn+2DQ=
PresharedKey = /DXNfgNi2iMY5jrdgdfgdgu5tyIX94Xvss=
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = 134.111.10.21:51820
PersistentKeepalive = 25
```

Включить сервис systemd и добавить в автостарт если нужно.

```bash
sudo systemctl start wg-quick@wg0

sudo systemctl enable wg-quick@wg0

sudo systemctl enable --now systemd-resolved
```

Имейте ввиду если на сервере, что-то не так, то и у вас не будет интернета при включенном сервисе. Остановить, выключить.

```bash
sudo systemctl stop wg-quick@wg0

sudo systemctl disable wg-quick@wg0
```

Проверить ip можно на [2ip.ru](https://2ip.ru), в терминале.

```bash
curl ident.me
```

Проверить скорость интернета.

```bash
curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -
```
