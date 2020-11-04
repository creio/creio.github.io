---
title: Pulseaudio и Discord
tags: [Arch Linux]
---

Шумы в Discord, при запуске.

```sh
sudo nano /etc/pulse/default.pa
```

В файле `default.pa` в 47 строке.

```sh
load-module module-udev-detect
```

Изменить на.

```sh
load-module module-udev-detect tsched=0
```

Перезапуск **pulseaudio**.

```sh
pulseaudio --kill
pulseaudio --start
```
