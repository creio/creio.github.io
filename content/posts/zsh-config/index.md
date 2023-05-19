---
title: "Zsh Config"
description: ""
date: 2019-07-11T22:20:38+03:00
lastmod: 2023-04-24T22:20:38+03:00
draft: false
weight: 50
images: ['zsh-cfg.png']
categories: []
tags:
    - config
    - terminal
contributors: []
pinned: false
toc: true
edit: true
---

Разбор конфига `~/.zshrc`, конечный результат примерно такой. Рекомендую установить и использовать терминал urxvt о настройке которого я писал в [прошлом посте](/posts/urxvt-config).

## Установка пакетов

```bash
yay -S zsh oh-my-zsh fast-syntax-highlighting zsh-autosuggestions
```

- oh-my-zsh: надстройка над zsh.
- fast-syntax-highlighting: подсветка синтаксиса.
- zsh-autosuggestions: автодополнение.

Переключение шелла на zsh: `chsh -s /usr/bin/zsh`, обратно на bash: `chsh -s /usr/bin/bash`.

## Настройка

Мой конфиг `.zshrc`, необходимо сохранить в домашнюю директорию `~/.zshrc`, если файл существует замените, [.zshrc](https://github.com/creio/dots/blob/master/.zshrc).

Так как oh-my-zsh установлен через yay, то строка `ZSH=/usr/share/oh-my-zsh/` идет от корня, это касается и плагинов.

Тема оформления строки приветствия задается в данной строке `ZSH_THEME="af-magic"`, сами темы можно [выбрать тут](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes).

Плагинов из набора oh-my-zsh полно, но я их не использую. [wiki/Plugins](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins).

```bash
plugins=(
)
```

Использую только то, что установил дополнительно, путем экспорта в файл. Полный путь до .zsh файла. В зависимости от способа установки путь может отличаться, в данном случае такой.

```bash
source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
```

Тут задаем дерикторию кэша и условие проверки.

```bash
ZSH_CACHE_DIR=$HOME/.cache/oh-my-zsh
[[ ! -d $ZSH_CACHE_DIR ]] && mkdir $ZSH_CACHE_DIR
```

Экспорт путей со скриптами и бинарниками.

```bash
export PATH=$HOME/.bin:$HOME/.bin/popup:$HOME/.local/bin:/usr/local/bin:$PATH
```

Экспорт различных переменных.

```bash
export TERM="rxvt-unicode"
export EDITOR="$(if [[ -n $DISPLAY ]]; then echo 'subl3'; else echo 'nano'; fi)"
export BROWSER="chromium"
export SSH_KEY_PATH="~/.ssh/dsa_id"
export XDG_CONFIG_HOME="$HOME/.config"
```

Условие проверки и загрузки файла. Алиасы можно и не выносить в отдельный файл, но так удобнее.

```bash
[[ -f ~/.alias_zsh ]] && . ~/.alias_zsh
```

Данный блок не обязателен, отвечает за fzf поиск.

```bash
[[ -e "/usr/share/fzf/fzf-extras.zsh" ]] && source /usr/share/fzf/fzf-extras.zsh
export FZF_DEFAULT_COMMAND="fd --type file --color=always --follow --hidden --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
# export FZF_DEFAULT_OPTS="--ansi"
export FZF_DEFAULT_OPTS="--height 50% --layout=reverse --border --preview 'file {}' --preview-window down:1"
export FZF_COMPLETION_TRIGGER="~~"
```

В момент набора и появления автодополнения можно перемещаться по словам Ctrl+стрелка вправо, а просто стрелка вправо прыжок в конец подсвеченной строки. Вот собственно и все.
