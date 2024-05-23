---
title: "Ctlos Linux Bspwm v0.1.0"
description: "Весьма не плохой оконный менеджер"
excerpt: ""
date: 2020-03-13T20:23:06+03:00
draft: false
weight: 50
image: "/images/bspwm.png"
categories: []
tags:
    - bspwm
contributors: []
pinned: false
toc: true
edit: true
---

Создано в рамках [Ctlos Linux](https://ctlos.github.io/), [demo Video](https://www.youtube.com/watch?v=INOtQJ_yZE4).

## Оформление

- Тема gtk: модификация Arc-Dark.
- Иконки: Arc, dui-ico.
- Курсор: capitaine-cursors.
- Шрифт: Clear Sans Medium,9 ttf-clear-sans.
- Шрифт терминала: Hack Nerd Font Mono,9 ttf-nerd-fonts-hack-complete-git.

## Панели

### Верхний бар: polybar

Элементы:

- Запуск меню: левый клик - rofi, правый клик - jgmenu.
- Urxvt с сессией tmux. Сессия сохраняется, при закрытии и восстанавливается, при следующем нажатии.
- Newsboat - rss читалка.
- Монитор cpu и ram.
- Доступные обновления, клик: pacui - псевдо графический менеджер пакетов.
- Рабочие столы (теги).
- Сервис tor. Включить левый клик, выключить правый.
- Music контроллер.
- Звук по скроллу, клик - выкл.
- Дата. Лклик - подробней, Пклик - календарь.
- Раскладка.
- Меню выхода.

### Нижний бар: tint2(трэй)

| Key | Description |
|-|-|
udiskie             | монтирование usb.
redshift-gtk        | цветовой тон экраа.
xfce4-power-manager | менеджер питания.
clipit              | менеджер буфера обмена. `ctrl+alt+h` открыть историю.

## Горячие клавиши

Многое переопределено, никто не мешает использовать дефолт, [sxhkdrc](https://github.com/baskerville/bspwm/blob/master/examples/sxhkdrc).

### Режимы и управление окнами

- Режим тайлинга tiled, плитка.
- Режим pseudo_tiled, псевдо тайлинг. Нечто среднее между floating и tiled.
- Режим floating, плавающий режим.
- Режим fullscreen, Весь экран.
- Режим monocle, окно занимает всё доступное пространство.

Зажатая Super(win) и клавиши мыши манипулируют окнами: размер, положение.

| Key | Description |
|-|-|
super + a             | Псевдо тайлинг.
super + s             | floating, плавающий режим.
super + d             | тайлинг.
super + f             | fullscreen.
super + m             | Переключение режима monocle.
alt + space           | Переключение режима тайлинг/floating.
super + g             | Приклеить окно.
super + z             | Закрыть окно.
super + -             | Скрыть/показать окно.
super + c             | Переход в режим monocle, отключение рамок и отступов.
super + v             | Отключение отступов.
super + {↑,↓}         | Уменьшение/увеличение отступов, `super + c` в исходное состояние.
super + scroll        | Уменьшение/увеличение отступов, `super + c` в исходное состояние.
super + {←,→,↑,↓}     | Перемещение окна в режиме floating.
super + {h,j,k,l}     | перемещение по окнам в режиме tiled.
super + alt + {h,j,k,l} | изменение размера в режиме tiled.
super + shift + {h,j,k,l} | перетаскивание в режиме tiled.
alt + tab             | Переключение окна на текущем теге.
super + tab           | Переключение на предыдущий тег.
super + {1-9,0}       | Переход на тег.
super + {q...o,0}     | Переход на тег.
super + alt + {←,→}   | Перемещение по тегам.
super + alt + {1-9,0} | Отправка окна на номер тега.
super + ctrl + p      | Скрыть/показать polybar.

### Запуск утилит

| Key | Description |
|-|-|
alt + shift          | Переключение раскладки.
super + alt + r      | Рестарт bspwm.
super + alt + q      | Выход из bspwm.
super + Escape       | Релоад конфига горячих клавиш sxhkd.
alt + Return         | Терминал драйвинг, задаем координаты старта, зажатым ЛКМ.
super + Return       | Терминал на первом теге, в режиме тайлинга, monocle.
alt + t              | Терминал в режиме floating.
alt + r              | Ranger - консольный менеджер файлов.
alt + d              | Rofi - меню.
alt + w              | Firefox.
alt + f              | Thunar.
super + Delete       | Блокировка экрана.
super + alt + Delete | Меню выхода.
Print                | скрин с отправкой в `~/Pictures/screen`(директория должна быть). Копируется в буфер.
super + Print        | скрин в режиме выделения.
super + alt + Print  | скрин с задержкой 5 сек. и отправкой в `~/Pictures/screen`(директория должна быть). Копируется в буфер.
super + alt + m      | Текущий трек в ncmpcpp.
ctrl + alt + {c,v}   | Копировать/вставить в терминале.

## Конфигурационные файлы

| Key | Description |
|-|-|
~/.config/bspwm/bspwmrc | Основной конфиг.
~/.config/bspwm         | Скрипты.
/usr/bin/bspwm_start    | Скрипт автостарта, редактировать от `ROOT`. Он вызывается в `~/.xinitrc` и в SDDM `/usr/share/xsessions/bspwm.desktop`.
~/.config/sxhkd/sxhkdrc | Конфиг горячих клавиш.
/etc/sddm.conf          | Конфиг менеджера входа SDDM.
~/.config/bspwm/polybar | Скрипты и конфиг polybar.
~/.config/tint2/tray.tint2rc | Конфиг tint2 трей. В меню есть gui-конфигуратор (Настройки tint).
~/.config/picom.conf    | Декоратор окон, композитный менеджер.
~/.Xresources           | Конфиг Urxvt терминала. После изменения файла выполнить `xrdb -merge $HOME/.Xresources`.
~/.colors               | Палитры терминала, указывать в `~/.Xresources` строка `#include ".colors/sn"`.
~/.zshrc                | Конфиг оболочки $SHELL.
~/.alias_zsh            | Алиасы и функции zsh, сокращения команд терминала.

Это основа, все остальное в `~/` и `~/.config`.

## Утилиты

| Key | Description |
|-|-|
lxappearance, qt5ct     | настройка внешнего вида.
lxrandr                 | разрешение экрана.
ranger, thunar          | файловые менеджеры.
fzf                     | инкрементальный поиск, `zz`.
micro                   | консольный текстовый редактор, привычные клавиши:) ctrl+s - сохранить, ctrl+q - выход и т.д.
mousepad                | Gui текстовый редактор.
ncmpcpp, audacious      | музыкальный плеер.
youtube-dl, youtube-viewer, streamlink | скачивание, просмотр, просмотр стриминга.
xreader                 | просмотр pdf.
viewnior                | просмотр изображений.
mpv                     | видео плеер.
keepassxc               | менеджер паролей.
veracrypt               | шифрование файлов.
pavucontrol             | управление звуком.
file-roller             | менеджер архивов.
timeshift               | резервное копирование.
flameshot               | скриншоты.
simplescreenrecorder    | Запись экрана.
tmux                    | терминальный мультиплексор.
rxrun.sh                | Tmux с 3 табами. `~/.bin/rxrun.sh`.
gufw                    | межсетевой экран.
cava                    | визуализатор.
gotop                   | Консольный системный монитор.
neofetch, fetch, pfetch | информация о системе. `~/.bin/fetch`.

- Еще некоторые скрипты: `~/.bin`.
- Полный список пакетов: [packages.both](https://github.com/ctlos/ctlosiso/blob/bd44d18928ff28d33251e5af1efb93da303eba36/packages.both).
- Вступай в telegram чат: [t.me/ctlos](https://t.me/ctlos).
