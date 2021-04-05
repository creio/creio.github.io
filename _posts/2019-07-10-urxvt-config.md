---
title: Arch Urxvt, установка и настройка
description: Глубокое погружение в Xresources
image: /uploads/urxvt-cfg.png
tags: [Linux]
---

Очень быстрый терминал, но немного пугает в настройке.

![](/uploads/urxvt-cfg.png)

## Содержание
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Установка.

Я всегда устанавливаю patched версию с аура, некоторые зависимости и шрифт **Hack Nerd** с набором иконок. Мой конфиг [github](https://github.com/creio/dots/blob/master/.Xresources).

```sh
yay -S rxvt-unicode-patched urxvt-perls nerd-fonts-hack
```

## Настройка urxvt, файл `~/.Xresources`.

! Это комментарий. Строки с `Xft` не относятся к urxvt.

```sh
URxvt.font: xft:Hack Nerd Font Mono:size=9
URxvt.geometry: 84x22
URxvt.internalBorder: 15
URxvt.letterSpace: 0
URxvt.antialias: true
URxvt.iconFile: /usr/share/icons/Papirus/48x48/apps/urxvt.svg
```

* шрифт.
* геометрия.
* отступ.
* меж буквенное расстояние.
* файл иконки, как раз за это и отвечает `rxvt-unicode-patched`.

Строки ниже, отвечают за копирование/вставка по Ctrl-Shift-c/v.

```sh
URxvt.iso14755:        false
URxvt.iso14755_52:     false

URxvt.clipboard.autocopy: true
URxvt.keysym.Shift-Control-V: eval:paste_clipboard
URxvt.keysym.Shift-Control-C: eval:selection_to_clipboard
```

Остальное, перл плагины для открытия ссылок по клику и некоторые кастомные клавиши.

```sh
URxvt.perl-ext-common: default,clipboard,url-select,keyboard-select,matcher
URxvt.url-launcher: /usr/bin/xdg-open
URxvt.url-select.underline: true
URxvt.matcher.button: 1

URxvt.keysym.Control-Up:    \033[1;5A
URxvt.keysym.Control-Down:  \033[1;5B
URxvt.keysym.Control-Left:  \033[1;5D
URxvt.keysym.Control-Right: \033[1;5C
```

`config-reload` Необходим для смены цвета на лету, не обязательно, поэтому опустил.

### Настройка цветов

Отключение непрозрачности.

```sh
URxvt.transparent:false
URxvt.depth: 32
```

Все схемы я храню в `~/.colors` [.colors](https://github.com/creio/dots/tree/master/.colors), а подключаю их инклюдом. `#` В данном случае не комментарий.

```sh
#include ".colors/ln"
```

Просто цвета, что тут еще сказать. Все что начинается с `rofi` не обязательно, это цвета лаунчера rofi.

Прозрачность фона я обычно задаю через [90] в процентах.

```sh
*.background: [90]#111113
```

Рекомендую создать симлинк на `rxvt`.

```sh
sudo ln -s /usr/bin/urxvt /usr/bin/rxvt
```

Комбинации клавиш.

- ctrl+стрелка вправо/влево: перемешение по словам.
- ctrl+a/e: перемешение в начало/конец строки.
- ctrl+q: очистить строку.
- ctrl+w: удалить слово.
- ctrl+l: очистить экран.
- ctrl+c: остановить процесс, сбросить набор.

Есть вопросы, пиши в комментах.

После изменения файла `~/.Xresources` необходимо считывать конфиг и перезапускать терминал.

```bash
xrdb -merge ~/.Xresources
```
