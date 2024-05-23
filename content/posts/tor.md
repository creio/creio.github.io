---
title: "Tor проксирование"
description: ""
date: 2022-05-26T22:02:34+03:00
lastmod: 2023-04-24T22:02:34+03:00
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

Задача заставить локально обрабатывать все запросы к onion, через тор, а все остальное в обычном режиме. В этом деле поможет dnsmasq, но заставить его работать я смог только с dhcpcd, не знаю возможно ли это сделать через networkmanager, не пользуюсь им. Выключаем и удаляем все сетевое, ставим dnsmasq и dhcpcd.

```bash
sudo pacman -S dnsmasq dhcpcd tor
```

Конфиг dnsmasq.

```bash
# /etc/dnsmasq.conf

no-resolv
no-hosts
port=53
server=127.0.0.1#9053
listen-address=::1,127.0.0.1
server=/onion/127.0.0.1#9053
server=/.exit/127.0.0.1#9053
server=8.8.8.8
server=8.8.4.4
```

Конфиг dhcpcd.

```bash
# /etc/dhcpcd.conf

nohook resolv.conf
noarp
```

Конфиг tor. tor_resolv походу не обязательно.

```bash
# /etc/tor/torrc

VirtualAddrNetwork 10.254.0.0/16
AutomapHostsOnResolve 1
AutomapHostsSuffixes .exit,.onion
TransPort 127.0.0.1:9040 NoIsolateClientAddr SessionGroup=1
DNSPort 127.0.0.1:9053
ServerDNSResolvConfFile /etc/tor_resolv.conf

# /etc/tor_resolv.conf

nameserver 8.8.8.8
```

Выключам, включаем и стартуем службы.

```bash
sudo systemctl disable --now systemd-networkd.socket
sudo systemctl disable --now systemd-networkd
sudo systemctl disable --now systemd-resolved

sudo systemctl enable --now dhcpcd
sudo systemctl enable --now dnsmasq
sudo systemctl start tor
```

Правила перенаправления запросов onion в тор мост.

```bash
# ip route show default | awk '/default/ {print $5}'

sudo iptables -t nat -A PREROUTING -d 10.254.0.0/16 -i enp5s0 -p tcp -j REDIRECT --to-ports 9040
sudo iptables -t nat -A OUTPUT -d 10.254.0.0/16 -p tcp -j REDIRECT --to-ports 9040
```

Выключить запрет в firefox. В адресной строке откройте адрес about:config и выключить значение.

```bash
network.dns.blockDotOnion     false
```

Для теста onion keybase.

[keybase5wmilwo](http://keybase5wmilwokqirssclfnsqrjdsi7jdir5wy7y7iu3tanwmtp6oid.onion)

Если все нормально, то можно выгрузить правила iptables в любое удобное место, я сохраню рядом с дефолтом.

```bash
# /etc/iptables/iptables.rules

sudo iptables-save -f /etc/iptables/iptables.rules.tor
```

Если нужны эти правила постоянно, то просто перетрите /etc/iptables/iptables.rules, но перед этим создайте копию.

```bash
sudo cp /etc/iptables/iptables.rules /etc/iptables/iptables.rules.bak
sudo iptables-save -f /etc/iptables/iptables.rules
```

Считывание правил с файла.

```bash
sudo iptables-restore /etc/iptables/iptables.rules.bak
```

## Заворачивание всего трафика в tor

В сети наткнулся на простой пайтон скрипт, немного подправил под Arch.

[toriptables3.py](https://github.com/creio/dots/blob/master/.bin/toriptables3.py)

```bash
sudo toriptables3.py -l

# сброс правил
sudo toriptables3.py -f

# лучше откатите через iptables
sudo iptables-restore /etc/iptables/iptables.rules.bak

# help
sudo toriptables3.py -h
```

## Ссылки

- [TransparentProxy](https://gitlab.torproject.org/legacy/trac/-/wikis/doc/TransparentProxy)
- [iptables](https://wiki.archlinux.org/title/iptables)
- [Dhcpcd](https://wiki.archlinux.org/title/Dhcpcd)
- [Using_TorDNS_for_all_DNS_queries](https://wiki.archlinux.org/title/Tor#Using_TorDNS_for_all_DNS_queries)
- [Dnsmasq](https://wiki.archlinux.org/title/Dnsmasq)
