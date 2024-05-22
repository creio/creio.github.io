---
title: "Установка Arch Linux на зашифрованный раздел, LVM на LUKS"
description: ""
date: 2020-03-23T20:14:38+03:00
lastmod: 2023-04-24T20:14:38+03:00
draft: false
weight: 50
image: "/images/lvm-luks.png"
tags:
    - archlinux
    - crypt
contributors: []
pinned: false
toc: true
edit: true
---

Грузимся из под live-usb, устанавливаем ru язык и время.
<!-- more --->

```bash
loadkeys ru
setfont cyr-sun16
timedatectl set-ntp true
```

## Подготовка к установке

Создаем таблицу на диске MBR(DOS) и 2 первичных раздела.

- LUKS под root, swap, home
- boot 512M, выставляем флаг boot

```bash
cfdisk
```

Шифруем, открываем раздел. Создаем контейнер.

```bash
# подтверждаем YES
cryptsetup -y luksFormat --type luks2 /dev/sda1
cryptsetup open /dev/sda1 cryptlvm

pvcreate /dev/mapper/cryptlvm
vgcreate lvarch /dev/mapper/cryptlvm

ls -l /dev/mapper/cryptlvm
```

Создаём разделы lvm.

```bash
lvcreate -L 4G -n swap lvarch
lvcreate -L 25G -n root lvarch
lvcreate -l 100%FREE -n home lvarch
```

Форматируем и включаем swap.

```bash
mkfs.ext2 -L boot /dev/sda2
mkfs.ext4 -L root /dev/lvarch/root
mkfs.ext4 -L home /dev/lvarch/home
mkswap -L swap /dev/lvarch/swap
swapon /dev/lvarch/swap
```

Монтируем и создаем директории.

```bash
mount /dev/lvarch/root /mnt
mkdir /mnt/{home,boot}
mount /dev/lvarch/home /mnt/home
mount /dev/sda2 /mnt/boot
```

## Установка и настройка

Установка базовой системы и необходимых пакетов.

```bash
pacstrap /mnt base base-devel linux linux-headers linux-firmware lvm2 nano networkmanager bash-completion reflector htop openssh curl wget git rsync unzip unrar p7zip gnu-netcat pv
```

Генерируем и правим, если нужно fstab, выполняем chroot.

```bash
genfstab -pU /mnt >> /mnt/etc/fstab
cat /mnt/etc/fstab

arch-chroot /mnt
```

Включаем multilib и сортируем зеркала.

```bash
sed -i "/[multilib]/,/Include/"'s/^#//' /etc/pacman.conf

reflector -c "Russia" -c "Belarus" -c "Ukraine" -c "Poland" -f 20 -l 20 -p https -p http -n 20 --save /etc/pacman.d/mirrorlist --sort rate
```

Пароль root.

```bash
passwd
```

Создаем пользователя st в нужных группах, назначаем пароль и включаем sudo.

```bash
useradd -m -g users -G "adm,audio,log,network,rfkill,scanner,storage,optical,power,wheel" -s /bin/bash -c "Alex Creio" st

passwd st

echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

Назначаем hostname: имя машины и часовой пояс, время.

```bash
echo "ctlos" > /etc/hostname
ln -svf /usr/share/zoneinfo/Europe/Moscow /etc/localtime
timedatectl set-ntp true
```

Генерируем локали и включаем русский язык системы.

```bash
echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
echo "ru_RU.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen
echo "LANG=ru_RU.UTF-8" > /etc/locale.conf
```

Добавляем поддержку ru в консоле.

```bash
echo "KEYMAP=ru" >> /etc/vconsole.conf
echo "FONT=cyr-sun16" >> /etc/vconsole.conf
```

Добавляем хуки (порядок важен) и создаем загрузочный образ.

```bash
### добавить keyboard keymap encrypt lvm2
# HOOKS=(base udev autodetect keyboard keymap modconf block encrypt lvm2 filesystems fsck)
nano /etc/mkinitcpio.conf

mkinitcpio -p linux
```

Устанавливаем Grub.

```bash
pacman -S --noconfirm --needed grub
grub-install /dev/sda
```

Настраиваем и конфигурируем grub.

```bash
## узнаём UUID
blkid /dev/sda1
# /dev/sda1: UUID="c0868972-f314-48e1-9be5-3584826dbd64" TYPE="crypto_LUKS" PARTUUID="bbb93e39-01"

nano /etc/default/grub

## Прописываем команду для старта и включаем.
GRUB_CMDLINE_LINUX="cryptdevice=UUID=c0868972-f314-48e1-9be5-3584826dbd64:cryptlvm root=/dev/lvarch/root"
GRUB_ENABLE_CRYPTODISK=y

## конфигурируем
grub-mkconfig -o /boot/grub/grub.cfg
```

Включаем необходимые сервисы.

```bash
systemctl enable NetworkManager
systemctl enable sshd
```

Выходим из chroot, отмонтируем разделы и закроем контейнер.

```bash
exit
umount -Rf /mnt
vgchange -a n lvarch
cryptsetup close cryptlvm
```

## Резервное копирование luksHeader

Просмотр информации.

```bash
cryptsetup luksDump /dev/sda1
```

> Обязательно создайте backup заголовка.

```bash
cryptsetup luksHeaderBackup /dev/sda1 --header-backup-file luksheader.bac
```

Шифруем.

```bash
openssl enc -aes-256-cbc -salt -in luksheader.bac -out luksheader.bac.enc
rm luksheader.bac
```

Расшифровываем.

```bash
openssl enc -d -aes-256-cbc -in luksheader.bac.enc -out luksheader.bac
```

Восстанавливаем, подтверждаем: YES.

```bash
cryptsetup luksHeaderRestore --header-backup-file luksheader.bac /dev/sda1
```

Сохраняем в надёжное место `luksheader.bac.enc`, например на usb. [Стеганографируем и в публичный доступ (video)](https://www.youtube.com/watch?v=sGIrre2OVt4&amp;t=238s).

Profit!
