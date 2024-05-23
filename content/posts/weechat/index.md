---
weight: 50
title: Настройка и использование weechat в linux
description: ''
image: /images/weechat.png
date: 2022-05-12T19:15:06.000Z
tags:
  - config
  - network
contributors: []
draft: false
pinned: false
toc: true
edit: true
---

Weechat — консольный чат клиент для irc сетей и не только, [weechat about](https://weechat.org/about/).

## Установка

```shell
yay -S weechat
```

Запуск.

```bash
weechat
```

### Основные команды

```bash
# записать изменения в конфиги
/save
# перезагрузить
/reload
# выход
/quit
# изменения значений, через
/set
# показ значений, типо справка
/fset
```

## Подключение к сети Libera

Настройка подключения к irc сети Libera.Chat. Актуальные данные для подключения уточняйте на их сайте, порт и хост. [libera.chat guides](https://libera.chat/guides/connect).

После запуска weechat, конфиги пользователя инициализируются в `~/.config/weechat` вручную менять их не рекомендуется, все делаем через /команды. Добавляем сервер. Стоит отметить, что серверов может быть много, можно добавить и другие таким же макаром.

```bash
/server add libera irc.libera.chat/6697 -ssl
```

Ники и имя.

```bash
/set irc.server.libera.nicks "creio,cretm,mynick3,mynick4,mynick5"
/set irc.server.libera.username "creio"
/set irc.server.libera.realname "Alex Creio"
```

### Регистрация в libera

Довольно неплохо написано на их сайте, но я все же опишу.

[libera.chat guides registration](https://libera.chat/guides/registration)

```bash
# подключиться к серверу
/connect libera

# присвойте основной ник
/nick YourNick
# дополнительный
/nick YourNick2
```

Регистрация ника. Придумайте пароль и укажите реальные email, на него придет подтверждение, которое нужно запустить.

```bash
/msg NickServ REGISTER YourPassword youremail@example.com
```

После подтверждения вход в учетку.

```bash
/msg NickServ IDENTIFY YourNick YourPassword
# привязка
/msg NickServ GROUP
```

Чистый вход. Подключение к серверу и авторизация.

```bash
/connect irc.libera.chat 6667 YourNick:YourPassword
```

Если подключены к серверу, но не авторизованы.

```bash
/msg NickServ IDENTIFY YourNick YourPassword
```

> Ниже описан процесс сохранения данных в конфиг.

### Подключение

В чистый weechat с имеющейся учетной записью.

```bash
/set irc.server.libera.autoconnect on
/set irc.server.libera.sasl_username "creio"
/set irc.server.libera.sasl_password "xxxxxxx"
# автовход в чат(ы), через запятую
/set irc.server.libera.autojoin "#ctlos"
# сохранить
/save
# подключить
/connect libera
```

Более п[одробное руководство](https://weechat.org/files/doc/stable/weechat_quickstart.ru.html) по настройки подключения.

## Дополнительные команды

Вход, выход, отключение, сообщения.

```bash
# Зайти на канал
/join #ctlos

# Покинуть канал (оставляет буфер)
/part [quit message]

Закрыть соединение с сервером, каналом или буфером
/close

# Отключиться от сервера, на серверном буфере
/disconnect

# Открыть буфер и отправить сообщение пользователю (с псевдонимом foo):
/query foo сообщение

# Закрыть буфер
/close
```

## Подключение к matrix

[Matrix](https://matrix.to) отдельный сервер, точнее целая сеть, проще всего создать аккаунт через веб интерфейс riot.im(element), а затем уже его прописать в weechat. В репозитории лежит пакет weechat-matrix, но он криво работает, поэтому ставим rs.

```bash
yay -S weechat-matrix-rs-git
```

Добавляем сервер и настраиваем подключение.

```bash
/matrix server add matrix_org https://matrix.org/

/set matrix-rust.server.matrix_org.autoconnect on
/set matrix-rust.server.matrix_org.ssl_verify on

/set matrix-rust.server.matrix_org.username johndoe
/set matrix-rust.server.matrix_org.password Mypassword

/matrix connect matrix_org

/save
```

## Изменение интерфейса

Чаты(каналы) и серверы образуют буферы(вкладки), переключать их Alt + цифра или Alt + (вверх,вниз). Отключить автоматическое совмещение буферов сервера.

```bash
# default: merge_with_core
/set irc.look.server_buffer independent
```

Уменьшить ники и буферы по ширине.

```bash
/set weechat.bar.buflist.size_max 20
/set weechat.look.prefix_align_max 15
/bar set nicklist size_max 15
/bar set nicklist size 15
```

Включить мышь, после этого копирование работает с удерживанием Shift.

```bash
/mouse enable
/save
```

[Скрипты](https://weechat.org/scripts/).

```bash
/set weechat.plugin.autoload "*,!guile,!javascript,!lua,!php,!tcl,!perl,!ruby,!fifo,!xfer"
/set script.scripts.download_enabled on
/script install autosort.py
/save
/script
```

Клавиши PageUp/PageDown скролл истории чата, Alt+l переключение ленты чата на все окно. Остальное в [документации](https://weechat.org/doc/) :).

Настраивается абсолютно все, постарался в данное руководство воткнуть самый минимум для старта и более-менее комфортного использования, а также не забывайте, что матричные чаты можно юзать и в браузере, как и некоторые irc.

Не забудь заглянуть в чаты Ctlos Linux:

* [Matrix](https://matrix.to)
* [Matrix Libera](https://matrix.to)
* [Web Kiwiirc](https://web.libera.chat)

```bash
/join #ctlos
```

## Подключение через Matrix

Авторизовавшись через web морду, например riot.im(element) по ссылкам выше, можно войти практически в любой irc сервер под своими учетными данными, через мосты, так сервисы крупных irc сетей уже присутствуют в матриксе, покажу на примере libera. Откройте диалоги с ботами [@appservice:libera.chat](https://matrix.to) и [@NickServ:libera.chat](https://matrix.to), просто начните с ними чат.

Первой командой вы меняете ник, сообщаете серверу, что это вы.

```bash
# команда|server|ник
!nick irc.libera.chat YourNick
# в ответе
# Nick changed from 'YourNick[m]' to 'YourNick'
```

Перечисление чатов к которым вы подключены на сервере libera, их мосты, если таковые имеются.

```bash
!listrooms
```

Для авторизации перейдите к боту `@NickServ:libera.chat`, тут все по аналогии, выше писал о создании учетки и логине, отличие только в опускании начала команды `/msg NickServ`.

```bash
identify YourNick YourPassword
# должен появиться диалог SaslServ (PM on irc.libera.chat) с инфо о логине
info
status
acc YourNick
# ответ acc 3, значит все ок
```

Регистрация и подтверждение кода через почту.

```bash
register YourPassword your@email.com
# код с почты
verify register YourNick verification-code
info
```

Теперь возвращайтесь к боту `@appservice:libera.chat` для настройки автоматической авторизации.

```bash
!username YourNick
# ответ Successfully
!storepass YourPassword
# ответ Successfully
# переподключить
!reconnect
# информация
!whois YourNick

# список чатов данного моста
!listrooms
```

Мосты работают с небольшой задержкой и в интерфейсе матрикса форматирование мешает, но можно выбрать простой текст:

```bash
/plain !join #ctlos
```

Если вы хотите войти без моста с учеткой матрикса, то просто подставьте в адресной строке #ctlos:libera.chat

```bash
https://riot.im/app/#/room/#ctlos:libera.chat
```
