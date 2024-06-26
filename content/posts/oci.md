---
title: "Установка Arch Linux в Oracle Cloud"
description: ""
date: 2021-03-22T21:59:05+03:00
draft: false
weight: 50
image: ""
categories: []
tags:
    - archlinux
contributors: []
pinned: false
toc: true
edit: true
---

> PS: У меня забанили аккаунт без предупреждения :).

Существует такое предложение от Oracle Cloud, можно получить 2 сервера в минимальной комплектации навсегда и первые 30 дней тестирования более широкого функционала, нужно привязать карту с которой спишут примерно 1 евро(мне вернули практически сразу) и телефон. Доступные дистрибутивы на free тарифе: ubuntu, centos, oracle linux [oracle.com/cloud/free/](https://www.oracle.com/cloud/free/).

После того, как я немного потрогал их кабинет задался целью развернуть у них Arch Linux, доступного образа у них нет, но я знаю о таком замечательном инструменте, как packer, все мои попытки запустить собранные packer-ом образы были не удачны. Образы практически на 100% уверен были в порядке, но я не знал как у них устроен efi загрузчик и не сообразил использовать Console Connection, об этом будет ниже [www.packer.io/docs](https://www.packer.io/docs).

Для тех кому интересно, как залить туда custom image. В меню, Object storage - Bucket, создайте bucket, а в него загрузите образ. После этого в меню, Custom Images можно импортировать файл из бакета и уже из него создать Instance(машину).

Спустя примерно месяц я решил еще раз попробовать это провернуть, но доступ к функционалу Custom Images был закрыт, но я размотал его немного иначе.

Интерфейс, практически везде есть сноски на документацию, которую можно перевести и детальней узнать о работе. Собственно так я и знакомился с функционалом кабинета, методом тыка. На данный момент он мне даже кажется весьма удобным.

> После создания машины(не важно какой), если в ней присутствует Файрвол, то открыть порты в нем мало, нужно еще открыть их в Default Security List. В меню, Networking - Virtual Cloud Networks - vcn-id - Security Lists - Default Security List vor vcn-id, иначе порты не будут доступны. Простыми словами их нужно открыть, как в Default Security List, так и на самой машине, при наличии Файрвола.

- [stackoverflow.com](https://stackoverflow.com/questions/54794217/opening-port-80-on-oracle-cloud-infrastructure-compute-node)

## Генерация ключей

Локально создайте ssh ключи, если еще не сделали этого.

```bash
ssh-keygen -t rsa -b 4096 -C "ctlos@protonmail.com"
```

Ключи упадут в `~/.ssh`. При создании instance(машины), импортируйте публичный ключ `id_rsa.pub`.

## Oracle Cloud

Создать минимальную машинку free, oracle linux 7.9, именно в ней будет swap раздел на 8G, который мы будем использовать для трансфера. Я не трогал настройки по умолчанию при создании. Авторизуемся на машине по ssh.

## Arch bootstrap

Методы описаны в вики archlinux [wiki.archlinux.org](https://wiki.archlinux.org/index.php/Install_Arch_Linux_from_existing_Linux#Method_A:_Using_the_bootstrap_image_(recommended)).

Копируем ссылку на bootstrap .tar.gz. Скачиваем и раскрываем архив в корень [http://mirrors.evowise.com/](http://mirrors.evowise.com/archlinux/iso/latest/).

```bash
# под root
cd /
wget http://mirrors.evowise.com/archlinux/iso/latest/archlinux-bootstrap-2021.03.01-x86_64.tar.gz
tar xzf /archlinux-bootstrap-*-x86_64.tar.gz
```

Отмонтировать swap он 8G, форматировать его в нужную фс(btrfs/ext4). В моем случае структура разделов.

- /dev/sda1 boot, точка монтирования /boot/efi.
- /dev/sda2 swap(8G), его использую для трансфера.
- /dev/sda3 root(39G). На данный момент я тут с Oracle linux, в конце тут будет Arch с lts ядром.

```bash
lsblk -f
swapoff -a
```

Теперь выполняем chroot в bootstrap, в нем выполняем дальнейшие действия. Его разворачиваем для доступа к pacstrap и arch-chroot, основная и единственная задача. Он сам смонтирует нужные бинды, но нужно еще выполнить pacman init и раскомментировать зеркала(первые 3 Worldwide [Using_a_chroot_environment](https://wiki.archlinux.org/index.php/Install_Arch_Linux_from_existing_Linux#Using_a_chroot_environment).

```bash
nano /root.x86_64/etc/pacman.d/mirrorlist
```

```bash
ls /

/root.x86_64/bin/arch-chroot /root.x86_64

pacman-key --init
pacman-key --populate
pacman -Syy
```

## Монтирование pacstrap

Форматируем, создаем нужные директории, снапшоты, монтируем. Обратите внимание boot я не форматирую, а просто перемонтирую и удалю из него загрузчик /boot/efi/EFI/redhat.

```bash
mkfs.btrfs -f -L "root" /dev/sda2
mount /dev/sda2 /mnt

btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@snapshots

umount /mnt

mount -o subvol=@,compress=lzo,relatime,space_cache,autodefrag /dev/sda2 /mnt
mkdir -p /mnt/{boot/efi,home,snapshots}
mount -o subvol=@home,compress=lzo,relatime,space_cache,autodefrag /dev/sda2 /mnt/home
mount -o subvol=@snapshots,compress=lzo,relatime,space_cache,autodefrag /dev/sda2 /mnt/snapshots

umount /dev/sda1
mount /dev/sda1 /mnt/boot/efi
```

Разворачиваем будущую систему с нужными пакетами, некоторые из них очень важны. Генерируем fstab и выполняем еще один chroot(да-да).

```bash
pacstrap /mnt base base-devel linux-lts linux-lts-headers btrfs-progs nano grub efibootmgr iproute2 iputils rng-tools open-iscsi arch-install-scripts pacman-contrib reflector openssh wget git rsync gnu-netcat pv unzip unrar p7zip zsh htop tmux psmisc procps-ng
genfstab -pU /mnt >> /mnt/etc/fstab
arch-chroot /mnt
```

## Init pacman

Проинициализируем pacman, отсортируем зеркала и включаем mitilib репозиторий.

```bash
reflector -a 12 -l 30 -f 30 -p https,http --sort rate --save /etc/pacman.d/mirrorlist
pacman-key --init
pacman-key --populate

sed -i "/[multilib]/,/Include/"'s/^#//' /etc/pacman.conf
pacman -Syy --noconfirm
```

## Добавление пользователя

Назначим рут пароль, добавляем пользователя с нужными группами, включаем ему zsh. Назначаем пароль пользователю и включаем sudo.

```bash
usermod -p 123 root

useradd -m -g users -G "log,network,storage,power,wheel" -s /bin/zsh creio
usermod -p 123 creio
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

## Системные настройки

Назначаем имя машины, часовой пояс, локали и русский шрифт в консоли.

```bash
echo cloud > /etc/hostname

ln -svf /usr/share/zoneinfo/Europe/Moscow /etc/localtime
hwclock --systohc --utc

echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
echo "ru_RU.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen

echo "LANG=ru_RU.UTF-8" > /etc/locale.conf
echo "KEYMAP=ru" > /etc/vconsole.conf
echo "FONT=cyr-sun16" >> /etc/vconsole.conf
```

## Mkinitcpio

Изменить строку HOOKS в файле /etc/mkinitcpio.conf, должно быть так. Важно! Не знаю почему, но с хуком udev отказывается стартовать init, поэтому обязательно замените его на systemd и удаляю fsck, так как btrfs.

```bash
HOOKS=(base systemd autodetect modconf block filesystems keyboard keymap)
```

Обновить initramfs.

```bash
mkinitcpio -P
```

Если проебали с хуком, то попадете в rootfs и можно принудительно назначить инит и включить его.

```bash
ln -s /lib/systemd/systemd /new_root/bin/init

exec switch_root /new_root /bin/init
```

## Создаем hosts

```bash
cat <<EOF >/etc/hosts
127.0.0.1       localhost
::1             localhost
127.0.1.1       cloud.localdomain cloud
EOF
```

## Включаем интернет

```bash
cat <<EOF >/etc/systemd/network/20-ethernet.network
[Match]
Name=en*
Name=eth*

[Network]
DHCP=yes
EOF

systemctl enable systemd-networkd
systemctl enable systemd-resolved
# Workaround for https://bugs.archlinux.org/task/58355
systemctl enable rngd
```

## Устанавливаем grub

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi
```

Grub.cfg приводим к такому виду, все остальное закомментировано(#)

```bash
nano /etc/default/grub

GRUB_DEFAULT=0
GRUB_TIMEOUT=0
GRUB_DISTRIBUTOR="Arch"
GRUB_CMDLINE_LINUX_DEFAULT="console=tty1 console=ttyS0 nvme.shutdown_timeout=10 libiscsi.debug_libiscsi_eh=1 quiet"
GRUB_CMDLINE_LINUX=""
GRUB_PRELOAD_MODULES="part_gpt part_msdos"
```

Генерируем конфиг grub.

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

Удаляем дефолт загрузчик.

```bash
rm -rf /mnt/boot/efi/EFI/redhat
```

Так как мы снесли дефолтный загрузчик, нужно подсунуть нужный файл efi для автоматической загрузки.

```bash
echo "EFIarchgrubx64.efi" > /boot/efi/startup.nsh
```

## Ssh

Раскомментируем строки и приведем их к такому виду.

```bash
nano /etc/ssh/sshd_config
```

```bash
PermitRootLogin yes
PubkeyAuthentication yes
PasswordAuthentication yes
UseDNS no
```

Включаем сервис.

```bash
systemctl enable sshd
```

Выходим из chroot раздела(sda2) `exit`. Отмантируем разделы.

```bash
umount -R /mnt
```

И еще раз exit выходим из archlinux-bootstrap(/root.x86_64).

> Следующий шаг важен, он мне сильно помог в отладке, так как доступ получаем выше самой машины, очень удобно.

Перейдите в нужный instance и создайте на вкладке Console Connection подключение ssh, импортируйте открытый ключid_rsa.pub. После активации подключения в меню(3 точки справа) скопируйте Copy Serial Console Connection for Linux/Mac данные, вставьте данные из буфера в новый терминал.

```bash
ssh -o ProxyCommand='ssh -W %h:%p -p 443 ocid1.instnection.oc1.eu-frankfurt-1.antheljtuhavnyqwertyrey@instance-console.eu-frankfurt-1.oraclecloud.com' ocid1.instance.oc1.eu-frankfurt-1.qwretfhjczsdfetrydfgdfsfd

# прожать Enter
```

В исходном терминале, перезагружаем машину.

```bash
systemctl reboot
```

В терминале с `ssh -o ProxyCommand` должны увидеть efi меню, которое выполнит скрипт `/boot/efi/startup.nsh`(5 секунд) и запустит grub, grub не увидим, так как он выставлен в 0.

### Efishell

Если что-то выполнили не так увидите `efishell>`, некоторые команды.

```bash
# карта
map
# меню
bcfg boot dump
# переход в раздел
FS0:
# посмотреть созданный efi файл
ls EFIarch
# запустить
EFIarchgrubx64.efi
# выход в псевдографику
exit
# добавляет пунк, работает до ребута
bcfg boot add 0 FS0:EFIarchgrubx64.efi "Arch lts"
```

> Именно по причине того, что загрузчик слетает и используется /boot/efi/startup.nsh, именно поэтому и не стартовал мой custom image о котором я говорил в начале.

## Авторизация

Если все нормально, копируем ключ в root-а и юзера, в моем случае creio.

```bash
cat .ssh/id_rsa.pub | ssh root@192.168.1.35 'mkdir -p ~/.ssh && cat >> .ssh/authorized_keys'
cat .ssh/id_rsa.pub | ssh creio@192.168.1.35 'mkdir -p ~/.ssh && cat >> .ssh/authorized_keys'
```

Выполняем вход.

```bash
ssh creio@192.168.1.35
```

Должны увидеть меню zsh, нажать 0.

## Перенос

Форматируем и монтируем sda3. Создаем снапшоты.

```bash
lsblk -f
mkfs.btrfs -f -L "root" /dev/sda3
mount /dev/sda3 /mnt

btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume create /mnt/@snapshots

umount /mnt

mount -o subvol=@,compress=lzo,relatime,space_cache,autodefrag /dev/sda3 /mnt
mkdir -p /mnt/{boot/efi,home,snapshots}
mount -o subvol=@home,compress=lzo,relatime,space_cache,autodefrag /dev/sda3 /mnt/home
mount -o subvol=@snapshots,compress=lzo,relatime,space_cache,autodefrag /dev/sda3 /mnt/snapshots

umount /dev/sda1
mount /dev/sda1 /mnt/boot/efi
```

Копируем текущий корень в /mnt.

```bash
rsync -cauv --info=stats2 --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/var/lib/pacman/sync/*","/var/cache/*","/var/tmp/*"} /* /mnt/
```

## Fstab

Узнаем UUID разделов.

```bash
lsblk -f
```

Изменить fstab, nano /mnt/etc/fstab. Загрузчик не изменился, только UUID субволумов.

```bash
# /dev/sda1
UUID=2138-EC84                               /boot/efi      vfat    defaults  0 0

# /dev/sda3
UUID=39b2a28d-3890-425b-8152-fed18a73fdcd    /              btrfs   subvol=@,defaults,noatime,space_cache,autodefrag 0 0

# /dev/sda3
UUID=39b2a28d-3890-425b-8152-fed18a73fdcd    /home          btrfs   subvol=@home,defaults,noatime,space_cache,autodefrag 0 0

# /dev/sda3
UUID=39b2a28d-3890-425b-8152-fed18a73fdcd    /snapshots     btrfs   subvol=@snapshots,defaults,noatime,space_cache,autodefrag 0 0
```

## Chroot

```bash
arch-chroot /mnt
```

Переустановим и сконфигурируем grub.

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi

grub-mkconfig -o /boot/grub/grub.cfg
```

Посмотрим на правильность UUID. Везде должен быть id sda3.

```bash
cat /boot/grub/grub.cfg

lsblk -f
```

Выходим из chroot, отмонтируем, ребут.

```bash
exit
umount -R /mnt
systemctl reboot
```

Опять, можем запустить `ssh -o ProxyCommand`(прожать Enter) и наблюдать за работой efi, если все ровно, выполняем вход. Теперь можно отформатировать sda2 в swap и подключить его в fstab.

```bash
mkswap /dev/sda2
swapon /dev/sda2
swapon --show
```

```bash
lsblk -f

nano /etc/fstab

# добавить в конец с новой строки
# /dev/sda2
UUID=6a1059e2-6fd0-4894-bb14-53ff59754145    none           swap    defaults    0 0
```

## Дополнительный диск

Отредактируйте файл `/etc/iscsi/iscsid.conf`, как указано в help [iscsiinformation.htm](https://docs.oracle.com/en-us/iaas/Content/Block/Concepts/iscsiinformation.htm). На вкладке boot volumes можно создать дополнительный диск, клонировать существующий. После этого добавить на машине в автостарт и запустить сервис.

```bash
sudo systemctl enable --now iscsid
# включаем авторизацию
sudo systemctl enable iscsi
```

Зайти в свой Instances и в левом меню на вкладку Attached Block Volumes, присоединить клонированный диск, когда он перейдет в состояние Attached в правом меню открыть пункт iSCSI Commands & Information. Скопировать 3 команды(iscsiadm) на подключение и выполнить их на своей машине(по строчно) от пользователя.

В поле ниже, соответственно команды на отключение.

```bash
lsblk -f
```

Форматируем данный диск на свое усмотрение и прописываем, если нужно в fstab.

```bash
# создаем таблицу и раздел/разделы
sudo cfdisk -z /dev/sdb
```

Я выбрал gpt, затем создал раздел по умолчанию на все пространство(46,6G), enter - enter - enter, курсор вправо(записать) - yes - enter, курсор влево(выход). Форматируем в ext4 с меткой files.

```bash
sudo mkfs.ext4 /dev/sdb1 -L files
```

Добавляю в fstab.

```bash
sudo mkdir -p /media/files
lsblk -f
sudo nano /etc/fstab

# /dev/sdb1
UUID=702c830e-efb9-403d-bdfc-b3a969d44b1f    /media/files   ext4    defaults,_netdev,x-systemd.requires=iscsid.service  0 1
```

Перезагружаюсь и вижу по пути `/media/files` чистый раздел, под любые нужды.

```bash
sudo systemctl reboot
```

Дадим полные права в директорию для юзера.

```bash
sudo chown -R $(whoami):users /media/files
```

> Вы наверно догадались, что можно было сразу подключить второй диск и развернуть на него, тем самым опустить момент с переносом раздела(rsync), я это специально сделал, чтобы показать больше.

## Рекомендации

### Уменьшение журнала Systemd

```bash
sudo nano /etc/systemd/journald.conf
```

Раскомментировать и изменить строку.

```bash
SystemMaxUse=100M
```

Перезапустите сервис.

```bash
sudo systemctl restart systemd-journald.service
```

### Увеличить /tmp

```bash
df -h /tmp

sudo mount -o remount,size=2G /tmp
```

### Kexec

Это полезно при обновлении ядра, можно очень быстро перезагрузить его, не дожидаясь завершения всего процесса загрузки BIOS. Наглядно видно, при доступном обновление ядра [wiki.archlinux.org/index.php/Kexec](https://wiki.archlinux.org/index.php/Kexec).

```bash
yay -S kexec-tools
# версия ядра
uname -a
# полное обновление
yay -Syyuu
# загрузка нового ядра
sudo kexec -l /boot/vmlinuz-linux-lts --initrd=/boot/initramfs-linux-lts.img --reuse-cmdline
# частичный ребут
sudo systemctl kexec
# справка
sudo kexec -h
```

### Swapfile

Можно отключить раздел swap и использовать файл на 4G в btrfs.

```bash
truncate -s 0 /swapfile
chattr +C /swapfile
btrfs property set /swapfile compression none
fallocate /swapfile -l4g
chmod 600 /swapfile
mkswap /swapfile
lsattr /swapfile
swapon /swapfile
```

Закомментировать раздел swap и добавить строку с файлом.

```bash
sudo nano /etc/fstab

/swapfile      none      swap      defaults    0 0
```

### Ссылки

- [Настройка zsh](/posts/zsh-config)
- [Еще некоторые конфиги и скрипты в моем репозитории](https://github.com/creio/dots)
- [VPN сервер в Linux](/posts/vpn)

## Итог

Таким способом можно переделать любую систему и практически на любом облачном решении, главное знать детали загрузки и хорошо бы иметь ssh подключение выше, как тут (Console connection), или некий режим восстановления. Если Вам понравился мой бред:) по этому поводу, то поблагодарить меня можно тут.

- [ctlos.github.io/donat](https://ctlos.github.io/donat/)
- Вступай в чат [@ctlos](https://telegram.me/ctlos)

Всем Добра.
