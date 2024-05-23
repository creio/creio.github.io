---
weight: 50
title: 'Wireguard, pihole, unbound | предотвращаем утечку dns'
description: ''
image: ''
date: 2022-12-17T19:18:35.000Z
lastmod: 2023-04-24T19:18:35.000Z
tags:
  - vpn
  - network
categories: []
contributors: []
draft: false
pinned: false
toc: false
edit: true
---

Смотри видео с детальной настройкой [youtube.com](https://www.youtube.com/watch?v=iTozi7KE904).

```bash
45.138.72.135
root
747AuBOZ7WNt
```

* unbound
* wireguard
* pihole

```
apt install wg...


wget https://raw.githubusercontent.com/burghardt/easy-wg-quick/master/easy-wg-quick
chmod +x easy-wg-quick
./easy-wg-quick

sudo cp wghub.conf /etc/wireguard/wghub.conf
sudo systemctl enable --now wg-quick@wghub

# new client
./easy-wg-quick bla
sudo cp -r wghub.conf /etc/wireguard/wghub.conf
sudo systemctl restart wg-quick@wghub
```

```bash
sudo wg-quick down ./wghub.conf # if already configured
sudo wg-quick up ./wghub.conf
sudo wg show
```

```bash
# sudo nano /etc/sysctl.conf

net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
net.ipv4.ip_forward = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.tcp_syncookies = 1

# sudo sysctl -p
```

```bash
sudo cat /etc/wireguard/wghub.conf
# open port
```

```bash
curl -o /var/lib/unbound/root.hints https://www.internic.net/domain/named.cache
```

```bash
# mv access-control: 10.134.99.0/24 > wg network | ip a
# sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf

server:
    # if no logfile is specified, syslog is used
    # logfile: "/var/log/unbound/unbound.log"
    verbosity: 1
    port: 5353

    do-ip4: yes
    do-udp: yes
    do-tcp: yes

    # may be set to yes if you have IPv6 connectivity
    do-ip6: no

    # use this only when you downloaded the list of primary root servers
    root-hints: "/var/lib/unbound/root.hints"

    # respond to DNS requests on all interfaces
    interface: 0.0.0.0
    max-udp-size: 3072

    # IPs authorised to access the DNS Server
    access-control: 0.0.0.0/0                 refuse
    access-control: 127.0.0.1                 allow
    access-control: 10.134.99.0/24            allow

    # hide DNS Server info
    hide-identity: yes
    hide-version: yes

    # limit DNS fraud and use DNSSEC
    harden-glue: yes
    harden-dnssec-stripped: yes
    harden-referral-path: yes

    # add an unwanted reply threshold to clean the cache and avoid, when possible, DNS poisoning
    unwanted-reply-threshold: 10000000

    # have the validator print validation failures to the log val-log-level: 1
    # don't use Capitalisation randomisation as it known to cause DNSSEC issues sometimes
    # see https://discourse.pi-hole.net/t/unbound-stubby-or-dnscrypt-proxy/9378 for further details
    use-caps-for-id: no

    # reduce EDNS reassembly buffer size
    # suggested by the unbound man page to reduce fragmentation reassembly problems
    edns-buffer-size: 1472

    # TTL bounds for cache
    cache-min-ttl: 3600
    cache-max-ttl: 86400

    # perform prefetching of close to expired message cache entries
    # this only applies to domains that have been frequently queried
    prefetch: yes
    prefetch-key: yes
    # one thread should be sufficient, can be increased on beefy machines
    num-threads: 1
    # ensure kernel buffer is large enough to not lose messages in traffic spikes
    so-rcvbuf: 1m

    # ensure privacy of local IP ranges
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10
```

```bash
sudo systemctl enable --now unbound
```

```bash
# intfs  wghub
curl -sSL https://install.pi-hole.net | bash

http://ip/admin

# Settings - DNS наш Unbound 127.0.0.1#5353

# open port 5353
dig pi-hole.net @127.0.0.1 -p 5353  # NOERROR
dig sigok.verteiltesysteme.net @127.0.0.1 -p 5353
dig sigfail.verteiltesysteme.net @127.0.0.1 -p 5353  # SERFAIL
```

```bash
# wg client conf dns > wghub | ip a
# wg
nano intnetdns.txt

# replace ip 1.1.1.1 default > wghub ip : 10.148.135.1
```

```bash
# dns wghub ip : 10.148.135.1

# 10: 10 > wgclient_10.conf
[Interface]
Address = 10.148.135.10/24
DNS = 10.148.135.1
PrivateKey = oBj9b47cvZaGaCdHQUl1tu6in6L4yoL8hXxUd1EpU1c=
MTU = 1280

[Peer]
PublicKey = G7VcOHBqXYFPppKNUZ25RJLjEXEDq+Gsn/jmczX5HB0=
PresharedKey = LDgByqF8J/TgBI9vE+17aRNWnlJwQoD6i6xZCbwbdBk=
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = 45.138.72.135:44828
PersistentKeepalive = 25

# open ports
ufw allow ssh
ufw allow 44828/udp

# net
ufw allow 80/tcp
ufw allow 53/udp

# wg
sudo ufw allow from 10.134.99.0/24 to any port 80
sudo ufw allow from 10.134.99.0/24 to any port 53
sudo ufw reject https

ss -tulpn
```

* 45.138.72.135/admin
* [http://pi.hole/admin](http://pi.hole/admin)
* [https://dnsleak.com](https://dnsleak.com)
