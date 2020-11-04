---
title: Zsh установка и настройка
description: Zsh, oh-my-zsh, плагины
image: /uploads/zsh-cfg.png
tags: [Gnu Linux]
comments: true
---

Разбор конфига `~/.zshrc`, конечный результат примерно такой. Рекомендую установить и использовать терминал [urxvt](/urxvt-config/) о настройке которого я писал в прошлом посте.

![Zsh](/uploads/zsh-cfg.png)

## Установка zsh, oh-my-zsh, fast-syntax-highlighting, zsh-autosuggestions.

```sh
yay -S zsh oh-my-zsh fast-syntax-highlighting zsh-autosuggestions
```

- oh-my-zsh: надстройка над zsh.
- fast-syntax-highlighting: подсветка синтаксиса.
- zsh-autosuggestions: автодополнение.

Переключение шелла на zsh: `chsh -s /usr/bin/zsh`, обратно на bash(при необходимости): `chsh -s /usr/bin/bash`.

## Настройка.

Мой конфиг [.zshrc](https://github.com/creio/dots/blob/master/.zshrc), необходимо сохранить в домашнюю директорию `~/.zshrc`, если файл существует замените.

Так как oh-my-zsh установлен через yay, то строка `ZSH=/usr/share/oh-my-zsh/` идет от корня, это косается и плагинов.

Тема оформления строки приветствия задается в данной строке `ZSH_THEME="af-magic"`. Сами темы можно выбрать [тут](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes).

Плагинов из набора [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins) полно, но я их не использую, вот тут они прописываются.

```sh
plugins=(
)
```

Использую только то, что установил дополнительно, путем экспорта в файл. Полный путь до .zsh файла. В зависимости от способа установки путь может отличаться, в данном случае такой.

```sh
source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
```

Тут задаем дерикторию кэша и условие проверки.

```sh
ZSH_CACHE_DIR=$HOME/.cache/oh-my-zsh
[[ ! -d $ZSH_CACHE_DIR ]] && mkdir $ZSH_CACHE_DIR
```

Экспорт путей со скриптами и бинарниками.

```sh
export PATH=$HOME/.bin:$HOME/.bin/popup:$HOME/.local/bin:/usr/local/bin:$PATH
```

Экспорт различных переменных.

```sh
export TERM="rxvt-unicode"
export EDITOR="$(if [[ -n $DISPLAY ]]; then echo 'subl3'; else echo 'nano'; fi)"
export BROWSER="chromium"
export SSH_KEY_PATH="~/.ssh/dsa_id"
export XDG_CONFIG_HOME="$HOME/.config"
```

Условие проверки и загрузки файла. Алиасы можно и не выносить в отдельный файл, но так удобнее.

```sh
[[ -f ~/.alias_zsh ]] && . ~/.alias_zsh
```

Данный блок не обязателен, отвечает за fzf поиск.

```sh
[[ -e "/usr/share/fzf/fzf-extras.zsh" ]] && source /usr/share/fzf/fzf-extras.zsh
export FZF_DEFAULT_COMMAND="fd --type file --color=always --follow --hidden --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
# export FZF_DEFAULT_OPTS="--ansi"
export FZF_DEFAULT_OPTS="--height 50% --layout=reverse --border --preview 'file {}' --preview-window down:1"
export FZF_COMPLETION_TRIGGER="~~"
```

В момент набора и появления автодополнения можно перемещаться по словам **Ctrl+стрелка вправо**, а просто **стрелка вправо** прыжок в конец подсвеченной строки.

Вот собственно и все, немного пробежался по этой теме.
