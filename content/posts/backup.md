---
excerpt: ''
weight: 50
homepage: false
title: Backup
description: ''
image: ''
date: 2022-05-10T17:12:00.000Z
tags:
  - linux
categories: []
contributors: []
draft: true
pinned: false
toc: true
edit: false
---

## Restic

[restic.readthedocs.io/en/stable/](https://restic.readthedocs.io/en/stable/)

[habr.com/ru/post/540096/](https://habr.com/ru/post/540096/)

[russianblogs.com/article/43321691089/](https://russianblogs.com/article/43321691089/)

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

# init copy
restic -r /local/restic init --repo2 sftp:user@123.123.123.123:/mnt/backup --copy-chunker-params
## RESTIC_PASSWORD2='pass_repo2'
restic -r sftp:user@123.123.123.123:/mnt/backup copy --repo2 /local/restic
restic -r sftp:user@123.123.123.123:/mnt/backup copy --repo2 /local/restic latest

# restore
restic -r /media/autoshares/restic/mydata restore latest --target /tmp-work
restic -r /media/autoshares/restic/mydata restore 8530cb2a --target / --include /data/yang

# mount fuse
restic -r /srv/restic-repo mount /mnt/restic
sudo rsync -caAXuvP /mnt/restic/snapshots/latest/ /target/
fusermount -uz /mnt/restic

# dump
restic -r /srv/restic-repo dump 098db9d5 production.sql | mysql
restic -r /srv/restic-repo dump latest /home/other/work > restore.tar
restic -r /srv/restic-repo dump -a zip latest /home/other/work > restore.zip
```

Для восстановления в любом месте нужен пароль и ssh доступ.

## Borg

[borg docs](https://borgbackup.readthedocs.io/en/stable/index.html)

```bash
# ssh://username@example.com:2022
borg init --encryption=repokey-blake2 user@hostname:backup
borg init -e none oc:dump
borg init -e repokey-blake2 /local/dir

borg create --stats --list -v oc:dump::"test" ~/test.sh
borg create --compression zstd,5 /path/to/repo::arch

borg list oc:dump
borg list oc:dump::test

borg mount ssh://borg@backup.example.org:2222/path/to/repo /mnt/borg
borg mount /mnt/backup/borg_repo::myserver-system-2019-08-11 /mnt/borg
borg mount /mnt/backup/borg_repo /mnt/borg
borg umount /mnt/borg

cd dest
borg extract oc:dump::test
borg extract oc:dump::test home/creio/test.sh

borg delete oc:dump::test
borg delete oc:dump

borg export-tar /path/to/repo::Monday Monday.tar.gz --exclude '*.so'
```

### Cron

```bash
sudo pacman -S cronie
# ubuntu
sudo apt install cron -y

sudo EDITOR=nano crontab -e
```

Запуск каждый день в 02:11 с логированием и отправкой в телегу при ошибке

```bash
11 02 * * * /home/cretm/.bin/borg.sh > /home/cretm/borg.log 2>&1 || curl -so /dev/null -X POST https://api.telegram.org/bot111111:BBBBBBBBBBBBBBBB/sendMessage -d text="Error borg oc" -d chat_id=222222222
```

```bash
# arch
sudo systemctl enable --now cronie
# ubuntu
sudo systemctl enable --now cron
```

## Kopia

[https://kopia.io/docs/getting-started/](https://kopia.io/docs/getting-started/)

kopia repository create filesystem --path /media/files/kopia

kopia repository connect filesystem --path /media/files/kopia

kopia snapshot create ~/Documents

kopia policy list
kopia policy show --global

[https://kopia.io/docs/reference/command-line/common/policy-set/](https://kopia.io/docs/reference/command-line/common/policy-set/)

kopia policy set --add-ignore .png --add-ignore .zip ~/Documents
kopia policy set --keep-annual 1 --global
kopia policy edit ~/Documents
kopia policy edit --global

kopia snapshot list ~/Documents

kopia diff kb9a8420bf6b8ea280d6637ad1adbd4c5 ke2e07d38a8a902ad07eda5d2d0d3025d

mkdir ~/mnt/kopia

kopia mount k2716fab9b1d1ef4336133b06c9d9a79c ~/mnt/kopia

sudo chown -R $USER:users ~/mnt/kopia
sudo rsync -av ~/mnt/kopia/ ~/Documents

kopia snapshot restore k2716fab9b1d1ef4336133b06c9d9a79c ~/Documents
kopia restore k2716fab9b1d1ef4336133b06c9d9a79c/path/file ~/path/file

kopia repository status

kopia snapshot delete --delete k2716fab9b1d1ef4336133b06c9d9a79c

kopia repository disconnect
