---
title: Restic
description:
image: /uploads/nginx-onion.png
tags:
  - Linux
# post_video: IFjzUpTjsC4
---

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
