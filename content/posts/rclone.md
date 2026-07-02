---
title: Настройка и использование Rclone для работы с облачными хранилищами
description: 'Rclone: Монтирование облачных хранилищ, синхронизация и управление файлами. Пошаговое руководство по использованию Rclone для работы с Google Drive, Yandex Disk и другими облачными провайдерами.'
# excerpt: ''
# image: false
date: 2025-03-04T07:12:00.000Z
tags:
  - linux
  - backup
categories:
  - Linux
contributors: []
homepage: true
draft: false
pinned: false
toc: true
edit: true
---

Rclone — это мощный инструмент для управления облачными хранилищами, который поддерживает множество провайдеров, включая Google Drive, Yandex Disk, Dropbox и другие. В этом посте я расскажу, как настроить Rclone, монтировать облачные хранилища и использовать его для синхронизации и управления файлами.

- [Официальный сайт Rclone](https://rclone.org/)
- [Руководство по настройке Rclone VFS и MergerFS](https://docs.usbx.me/books/rclone/page/rclone-vfs-and-mergerfs-setup)

---

## Настройка Rclone

Для монтирования облачных хранилищ с опцией `--allow-other` необходимо раскомментировать строку в файле `/etc/fuse.conf`:

```bash
sudo nano /etc/fuse.conf
```

Найдите строку `#user_allow_other` и уберите комментарий:

```bash
user_allow_other
```

Создайте директорию для монтирования облачного хранилища:

```bash
mkdir -p ~/clouds/google
```

Запустите конфигурацию Rclone:

```bash
rclone config
```

Следуйте инструкциям, чтобы добавить облачное хранилище (например, Google Drive).

## Монтирование

Монтирование Google Drive:

```bash
rclone mount google:/ ~/clouds/google \
  --umask 002 \
  --allow-other \
  --allow-non-empty \
  --vfs-cache-mode full \
  --vfs-cache-max-age 24h \
  --vfs-cache-max-size 4G \
  --vfs-read-chunk-size 40M \
  --vfs-read-chunk-size-limit 512M \
  --dir-cache-time 12h \
  --buffer-size 64M \
  --log-level INFO \
  --log-file ~/clouds/rclone.log \
  --daemon
```

## Размонтирование

Чтобы размонтировать облачное хранилище, используйте:

```bash
fusermount -u ~/clouds/google
```

## Проверка монтирования

Список удалённых хранилищ:

```bash
rclone listremotes
```

Просмотр содержимого:

```bash
rclone lsd google:/
rclone tree google:/
  ```

Информация о хранилище:

```bash
rclone about google:/
# размер файлов
rclone size synology_c2:ctlos
# через ncdu
rclone ncdu synology_c2:ctlos
```

## Очистка корзины

```bash
rclone cleanup google:/ -q
```

## Копирование и синхронизация файлов

Копирование между облаками

```bash
rclone copy google:/ yandex:/ -P
```

Копирование из облака на локальный диск

```bash
rclone copy google:/data ~/data -P
```

Перемещение файлов

```bash
rclone move ~/data google:/data --delete-empty-src-dirs
```

### Синхронизация

Синхронизация локальной директории с облаком:

```bash
rclone sync ~/data google:/data --create-empty-src-dirs
```

Синхронизация между облаками:

```bash
rclone sync yandex:/ google:/
```

## Другие команды

Создание директории:

```bash
rclone mkdir google:/new_folder
```

Удаление файлов:

```bash
rclone delete google:/path  # Удаляет только файлы
rclone purge google:/path   # Удаляет всё, включая директории
```

Поиск дубликатов:

```bash
rclone dedupe google:/path
```

Проверка совпадения файлов:

```bash
rclone check ~/data google:/data
```

## Веб-интерфейс Rclone

Для управления Rclone через веб-интерфейс запустите:

```bash
rclone rcd --rc-web-gui
```

## Настройка автозапуска

Создание юнита systemd `~/.config/systemd/user/rclone-mount@.service`:

```bash
nano ~/.config/systemd/user/rclone-mount@.service
```

Добавьте следующий контент:

```ini
[Unit]
Description=RClone multiple Mount Service
Wants=network-online.target
After=network-online.target

[Service]
Type=notify
# Создаем папку перед запуском
ExecStartPre=-/usr/bin/mkdir -p %h/clouds/%i
# Каждая строка/параметр ниже (кроме последней) заканчивается на " \"
# --log-file %h/clouds/rclone.log
ExecStart=/usr/bin/rclone mount %i:/ %h/clouds/%i \
    --config %h/.config/rclone/rclone.conf \
    --umask 002 \
    --allow-other \
    --allow-non-empty \
    --vfs-cache-mode full \
    --vfs-cache-max-age 24h \
    --vfs-cache-max-size 4G \
    --vfs-read-chunk-size 40M \
    --vfs-read-chunk-size-limit 512M \
    --dir-cache-time 12h \
    --buffer-size 64M \
    --log-level INFO
ExecStop=/usr/bin/fusermount -uz %h/clouds/%i
Restart=on-failure
RestartSec=10

[Install]
WantedBy=default.target
```

## Запуск и включение сервиса

Перезагрузите systemd и включите автозапуск:

```bash
systemctl --user daemon-reload
systemctl --user enable --now rclone-mount@<rclone-remote>
```

Замените `<rclone-remote>` на имя вашего удалённого хранилища (например, `google`).

---

## Итог

Rclone — это универсальный инструмент для работы с облачными хранилищами. С его помощью можно легко монтировать облачные диски, синхронизировать данные и управлять файлами. Настройка через systemd позволяет автоматизировать процесс монтирования при загрузке системы.

## Читайте также

- [Backup в Linux: Restic, Borg, Kopia](/posts/backup) — сравнение инструментов резервного копирования
- [Настройка медиа-сервера в Docker](/posts/media-server) — автоматизация загрузки фильмов с торрентов
