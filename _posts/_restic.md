---
title: Restic
description:
image: /uploads/nginx-onion.png
tags:
  - Linux
# post_video: IFjzUpTjsC4
---

https://rclone.org/
https://docs.usbx.me/books/rclone/page/rclone-vfs-and-mergerfs-setup

```bash
# uncomment   user_allow_other
sudo nano /etc/fuse.conf
mkdir -p ~/clouds/google

rclone config
# uid gid
id creio

# --umask 027 запрет другим, для доступности всем --umask 002
rclone mount google:/ ~/clouds/google --umask 027 --allow-other --allow-non-empty --vfs-cache-mode full --vfs-cache-max-age 24h --vfs-cache-max-size 4G --vfs-read-chunk-size 40M --vfs-read-chunk-size-limit 512M --dir-cache-time 12h --buffer-size 64M --log-level INFO --log-file ~/rclone.log --daemon

rclone listremotes
rclone lsd google:/
rclone tree google:/
rclone about google:/
# clean trash
rclone cleanup google:/ -q

# -P/--progress
rclone copy google:/ yandex:/ -P
rclone copy google:/data ~/data -P
rclone move ~/data google:/data --delete-empty-src-dirs

rclone sync ~/data google:/data
rclone sync google:/ ~/data
rclone sync yandex:/ google:/

# --dry-run
rclone delete – удалить только файлы, не трогая структуру смотрит на исключения;
rclone purge – удалить весь контент минуя исключения;
rclone dedupe – найти дубликаты файлов и удалить;
rclone mkdir – создать каталог;
rclone check – проверить, совпадают ли файлы источника и назначения;

rclone mount google:/ ~/data

# umount
fusermount -u ~/clouds/google

# nano /etc/systemd/system/rclone-google.service
###
[Unit]
Description=RClone Mount Service
Wants=network-online.target
After=network-online.target

[Service]
Type=notify
Environment=RCLONE_CONFIG=/home/creio/.config/rclone/rclone.conf
KillMode=none
RestartSec=5
ExecStart=/usr/bin/rclone mount google:/ /home/creio/clouds/google \
--uid 1000 --gid 985 --umask 027 --allow-other --allow-non-empty
--vfs-cache-mode full --vfs-cache-max-age 24h --vfs-cache-max-size 4G \
--vfs-read-chunk-size 40M --vfs-read-chunk-size-limit 512M \
--dir-cache-time 12h --buffer-size 64M \
--log-level INFO --log-file /home/creio/rclone.log
ExecStop=/usr/bin/fusermount -uz /home/creio/clouds/google
Restart=on-failure
User=creio
Group=users

[Install]
WantedBy=multi-user.target
```

https://restic.readthedocs.io/en/stable/
https://habr.com/ru/post/540096/
https://russianblogs.com/article/43321691089/

```bash
# env
RESTIC_PASSWORD="bla"
RESTIC_PASSWORD_FILE=path/file-pass

# create/connect
restic -r /mnt/backup init
restic -r sftp:user@123.123.123.123:/mnt/backup init

# backup --exclude/--include
restic -r sftp:user@123.123.123.123:/mnt/backup --verbose --exclude-file=/home/cretm/.restic_ex.txt backup / --tag two
# .restic_ex.txt
/dev/*
/proc/*
/sys/*
/tmp/*
/run/*
/mnt/*
/media/*
/boot/*
/var/lib/pacman/sync
/var/cache
/var/tmp
/snapshots
lost+found
/home/*/.config/nvm
/home/*/.config/duc
/home/*/.thumbnails/*
/home/*/.cache/*
/home/*/.local/share/Trash/*
/home/*/.gvfs/*

# list
restic -r /mnt/backup snapshots
# list files  latest/id
restic -r /mnt/backup ls -l latest /home/cretm
# diff id
restic -r /mnt/backup diff dda9c140 84253ffc
# search
restic -r /mnt/backup find "/home/**/*.txt" --snapshot latest
# restore
restic -r /mnt/backup restore latest --target=test/ --include ".zshrc"
# check
restic -r /mnt/backup check
# del snap  --dry-run
restic -r /mnt/backup forget --keep-daily 7 --keep-weekly 5 --keep-monthly 12
# clean repo
restic -r /mnt/backup prune
```

Для восстановления в любом месте нужен пароль и ssh доступ.
