---
title: "Настройка автоматической загрузки фильмов с торрентов"
description: ""
date: 2021-09-27T21:51:28+03:00
lastmod: 2023-04-24T21:51:28+03:00
draft: false
weight: 50
images: ['radarr.png']
categories: []
tags:
    - docker
    - mediaserver
contributors: []
pinned: false
toc: true
edit: true
---

Все будет проделано из под Arch Linux, но суть везде одна, весь этот софт есть и под windows.

- [odysee.com](https://odysee.com/@creio:5/%D1%81x*%D1%8F%D1%87%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%BE%D0%B2:3)
- [Второе видео](https://youtu.be/zHz9XqzUi5Q)
- [Третье](https://youtu.be/DK-hcczVwq0)

> Задача: Максимально автоматизировать процесс скачивания как новых фильмов, так и существующих.

Конечный результат, заходим на Imdb(авторизация), добавляем нужный фильм в список и на выходе получаем нужное в директории Films. Второй вариант, заходим в телеграм, отправляем боту название фильма и на выходе получаем нужное.

Исследовав этот вопрос в могучем гугле, вырисовывается простой вариант с использованием связки в docker, статей на данную тему не много, но их достаточно, даже с примерами композ файлов, собственно америку не открываем, а используем и попутно вникаем в настройку, которая не раскрыта в полной мере.

- Radarr/Sonarr - это менеджер коллекций фильмов/сериалов.
- Imdb - список отслеживания.
- Jackett - менеджер торрент трекеров.
- Qbittorrent - торрент клиент.
- Gramarr - телеграм бот.

## Portainer docker

Установим docker и веб морду для удобства администрирования. [Об этом я уже писал](/posts/web-server#docker-portainer).

```bash
sudo pacman -S docker-compose
sudo usermod -aG docker ${USER}
su - ${USER}
sudo systemctl start docker

docker volume create portainer_data
docker run -d --network host --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

Портайнер работает на http://localhost:9000.

## Настраиваем контейнеры

Создаем нужные директории, compos файл.

```bash
mkdir -p ~/docker-app/mediaserver
cd ~/docker-app/mediaserver
mkdir -p ./{downloadclient-downloads,radarr,sonarr,qbittorrent,jackett,gramarr,TV,Films}
```

Создаем докер сеть.

```bash
docker network create -d bridge --subnet=172.23.0.0/24 --gateway 172.23.0.1 media-proxy
```

Создаем сценарий. Узнаем PUID/PGID командой id и вставляем следующее заменив только id.

```bash
nano docker-compose.yml
```

```bash
---
version: "2"
services:
  sonarr:
    image: linuxserver/sonarr
    networks:
      default:
        ipv4_address: 172.23.0.51
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=985
      - TZ=Europe/Moscow
      - UMASK_SET=022 #optional
    volumes:
      - ./sonarr:/config
      - ./TV:/tv
      - ./downloadclient-downloads:/downloads
    ports:
      - 6001:8989
    restart: unless-stopped

  radarr:
    image: linuxserver/radarr
    networks:
      default:
        ipv4_address: 172.23.0.52
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=985
      - TZ=Europe/Moscow
      - UMASK_SET=022 #optional
    volumes:
      - ./radarr:/config
      - ./Films:/movies
      - ./downloadclient-downloads:/downloads
    ports:
      - 6002:7878
    restart: unless-stopped

  qbittorrent:
    image: linuxserver/qbittorrent
    networks:
      default:
        ipv4_address: 172.23.0.53
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=985
      - TZ=Europe/Moscow
      - UMASK_SET=022
      - WEBUI_PORT=6003
    volumes:
      - ./qbittorrent:/config
      - ./downloadclient-downloads:/downloads
    ports:
      - 6881:6881
      - 6881:6881/udp
      - 6003:6003
    restart: unless-stopped

  jackett:
    image: linuxserver/jackett
    networks:
      default:
        ipv4_address: 172.23.0.54
    container_name: jackett
    environment:
      - PUID=1000
      - PGID=985
      - TZ=Europe/Moscow
      # - RUN_OPTS=run options here #optional
    volumes:
      - ./jackett/config:/config
      - ./downloadclient-downloads:/downloads
    ports:
      - 6004:9117
    restart: unless-stopped

  gramarrru:
    image: memodota/gramarrru
    networks:
      default:
        ipv4_address: 172.23.0.55
    container_name: gramarrru
    depends_on:
      - sonarr
      - radarr
    volumes:
      - ./gramarr/config.json:/config/config.json
    restart: unless-stopped

networks:
  default:
    external: true
    name: media-proxy
```

Создаем gramarr конфиг.

```bash
nano gramarr/config.json
```

Вставляем следующее. Токены будем заполнять по мере получения, пароли на ваше усмотрение. IP не меняем.

```bash
{
  "telegram": {
    "botToken": "123123123:BBCCVVf-As-2IPSUMQy2w_HnLoReMqk"
  },
  "bot": {
    "password": "",
    "adminPassword": "demo"
  },
  "radarr": {
    "hostname": "172.23.0.52",
    "apiKey": "6brandomfb3e23",
    "port": 7878,
    "urlBase": "",
    "ssl": false,
    "username": "admin",
    "password": "pass_radarr",
    "maxResults": 6
  },
  "sonarr": {
    "hostname": "172.23.0.51",
    "apiKey": "1b5random29546",
    "port": 8989,
    "urlBase": "",
    "ssl": false,
    "username": "admin",
    "password": "pass_sonarr",
    "maxResults": 6
  }
}
```

Собственно можно запускать и открывать на указанных портах назначаем пароли и получаем apiKey(ключи). Порты как в докер файле слева локальные, справа внутри докера(не интересуют). Стартуем находясь в директории с docker-compose.yml.

```bash
docker-compose up -d
```

Переходим в portainer http://localhost:9000, на вкладку stacks и видим mediaserver, перейдя в который увидим все приложения, возможно gramarr не запустился и это нормально, просто отсюда возможно удобней делать перезапуск всех разом и видеть их статус.

Sonarr я рассматривать не буду, только базовая доступность, но он почти похож на radarr думаю разберетесь.

- Sonarr: Settings - general.
- Radarr: Settings - general.
- Qbittorrent: Tools - Options - Web Ui. Меняем язык, сохраняем и перезагружаем стр. логин: admin, пароль: adminadmin, лучше поменять.

Попутно добавляем данные в gramarr/config.json.

- [Sonarr http://localhost:6001](http://localhost:6001)
- [Radarr http://localhost:6002](http://localhost:6002)
- [Qbittorrent http://localhost:6003](http://localhost:6003)
- [Jackett http://localhost:6004](http://localhost:6004)

## Создание бота telegram

Открываем бота @BotFather и в нем создаем своего для грамарра.

- /newbot пишем имя, MMediaBot
- Затем ник, на конце обязательно bot, mudazvonbot.

Имя может быть занято, пробуйте различные вариации. В итоге должны увидеть "Done! ...", ссылка http://t.me/mudazvonbot и api ключ, копировать полностью выделенный ключ и вставить в config.json. password оставляем пустым, а adminPassword назначаем он нужен в самом боте mudazvonbot, для авторизации.

```bash
  "telegram": {
    "botToken": "123123123:BBCCVVf-As-2IPSUMQy2w_HnLoReMqk"
  },
  "bot": {
    "password": "",
    "adminPassword": "demo"
  },
```

Собственно с ботом все и его конфигом, пока он не работает, так как связка еще не полна.

## Настройка Jackett

[Jackett http://localhost:6004](http://localhost:6004)

Тут только добавляем трекеры, add indexer и в поиск по очереди: Rutor, RuTracker, NoNaMe. Добавляем публичные, а еще лучше и приватные с логином и паролем semi-private(nnmclub/rutracker).

## Настройка radarr

[radarr http://localhost:6002](http://localhost:6002)

Меняем язык settings - ui, включаем вверху Show Advanced, сохраняем Save и обновляем стр.

Регаем акк на [www.imdb.com](https://www.imdb.com/), создаем и делаем список публичным, копируем ид в адресной строке ls503478540.

Идем в Настройки - Списки и добавляем список Imdb. Вставляем полученный UserId ls503478540, выбрать предпочтительный профиль качества. Остальное вроде по умолчанию, тест и сохранить. Если выставить удалить фильм и его файлы в Очистить уровень библиотеки, то когда убираем отслеживание в imdb фильм удаляется с radarr и Films, но в qbit остается.

Идем в Настройки - Клиенты для скачивания, добавляем qbit, указав логин и пароль от него, *обязательно* внутренний ip: 172.23.0.53 и порт: 6003. Остальное по умолчанию, тест - сохранить.

Настройки - Индексаторы, копируем листы по очередно Torznab Feed из Jackett. Один feed - одна запись в индексатор. Заполняем имя(любое, по имени трекера например - rutor), в URL вставляем скопированный feed и *обязательно меняем* в ссылке ip и порт на внутренний: 172.23.0.54:9117. По аналогии и с другими трекерами.

[Jackett http://localhost:6004](http://localhost:6004). Настройки - Профили тут просто везде поменял язык на Русский.

## Конец

Перезапустить контейнеры в portainer, при добавление в список imdb(синхронит каждые 6 часов). Если все правильно, то добавление должно появиться и в радаре и в qbit.

Авторизация у бота /auth SUPERPASS, а возможности п /help. Бот также должен ответить с выборам качества и с сохранением в /movies. Да в докере это директория /movies, а локально мы ее смонтировали в Films, также и с /downloads - локально downloadclient-downloads.

После удаления из списка imdb, фильм удаляется, но вот торрент нужно удалить в qbit и он удалиться и из downloadclient-downloads, [qbit http://localhost:6003/](http://localhost:6003/).

> Принудительно считать imdb list, можно повесить на крон. В apikey= поставить ключ radarr.

```bash
curl -X POST "http://localhost:6002/api/v3/command?apikey=6random132loremasd23" -H "accept: application/json" -d '{"name":"ImportListSync"}'
```

Настройка и запуск крона на 5 мин `#5_*_*_*_*`.

[crontab.guru/](https://crontab.guru/)

```bash
yay -S cronie

EDITOR=nano crontab -e
```

```bash
5 * * * * curl -X POST "http://localhost:6002/api/v3/command?apikey=6random132loremasd23" -H "accept: application/json" -d '{"name":"ImportListSync"}'

sudo systemctl enable --now cronie
```

## Qbit jackett

Только поиск в qbittorrent [youtu.be/DK-hcczVwq0](https://youtu.be/DK-hcczVwq0).

```bash
mkdir ~/qbit
cd ~/qbit
nano docker-compose.yml
```

```bash
---
version: "2"
services:
  qbittorrent:
    image: linuxserver/qbittorrent
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=985
      - TZ=Europe/Moscow
      - UMASK_SET=022
      - WEBUI_PORT=6003
    volumes:
      - ./qbittorrent:/config/qBittorrent
      - ./downloads:/downloads
    ports:
      - 6881:6881
      - 6881:6881/udp
      - 6003:6003
    restart: unless-stopped

  jackett:
    image: linuxserver/jackett
    container_name: jackett
    environment:
      - PUID=1000
      - PGID=985
      - TZ=Europe/Moscow
    volumes:
      - ./jackett:/config/Jackett
    ports:
      - 6004:9117
    restart: unless-stopped
```

```bash
docker compose up -d
```

## Опирался на следующие материалы

- [Тут немного про sonarr sprut.ai](https://sprut.ai/client/article/3169)
- [habr](https://habr.com/ru/post/505814/)
- [connect.smartliving.ru](https://connect.smartliving.ru/profile/225/blog/ustanovka-i-nastroyka-sonarr-radarr-qbittorrent-jackett-torproxy-v-docker.html)
- [Поблагодарить меня можно тут](https://ctlos.github.io/donat/)

PSS:) Вопросы и предложения можно оставить в чате [@ctlos](https://telegram.me/ctlos).
