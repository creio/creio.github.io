---
title: "Автоматизация Shorts: n8n, MoneyPrinterTurbo, Postiz, Baserow"
description: "Полный пайплайн автоматической генерации и публикации коротких видео на 5 соцсетей с помощью n8n, AI и открытых инструментов."
excerpt: "Полный пайплайн автоматической генерации и публикации коротких видео"
date: 2026-07-01T12:00:00+03:00
image: 'cover.png'
categories:
  - Automation
tags:
  - n8n
  - automation
  - docker
contributors: []
draft: false
pinned: false
toc: true
edit: true
params:
  sitemap_exclude: false
  seo:
    title: "" # custom title (optional)
    description: "" # custom description (recommended)
    canonical: "" # custom canonical URL (optional)
    robots: "" # custom robot tags (optional)
---

Одна кнопка — и короткое видео автоматически генерируется AI, загружается и публикуется на TikTok, YouTube Shorts, Instagram, Facebook и Threads. В этом посте покажу полный пайплайн, собранный на четырёх открытых инструментах.

## Зачем автоматизировать Shorts

Короткие видео — это основной формат для роста аудитории в 2025 году. Но ручное создание контента требует много времени: написание сценариев, монтаж, публикация на каждой платформе отдельно.

Автоматизация решает эту проблему. Один workflow в n8n выполняет весь цикл:

1. Генерирует тему и сценарий с помощью AI
2. Создаёт видео с озвучкой и субтитрами
3. Загружает на 5 соцсетей одновременно
4. Уведомляет в Telegram о результатах

Весь процесс работает без участия человека.

## Инструменты

### n8n — оркестратор

[n8n](https://n8n.io) — платформа для автоматизации workflows с визуальным конструктором. Поддерживает 400+ интеграций, нативные AI-возможности (LangChain, Gemini, OpenAI) и написание кода на JavaScript/Python.

Ключевые преимущества для нашего пайплайна:
- Визуальная связка узлов — понятно, что и куда передаёт данные
- Встроенные HTTP-запросы для работы с API
- Планировщик задач (cron) для автоматического запуска
- Self-hosted — все данные на вашем сервере

### MoneyPrinterTurbo — AI-генерация видео

[MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — открытый инструмент для генерации коротких видео. Даёшь тему или ключевое слово — получаешь готовое видео с озвучкой, субтитрами и фоновой музыкой.

Возможности:
- AI-генерация сценариев (OpenAI, Gemini, DeepSeek, Ollama)
- Синтез речи (Edge TTS, Azure, SiliconFlow)
- Автоматические субтитры с настройкой стиля
- Библиотека бесплатных видео (Pexels, Pixabay)
- Фоновая музыка с регулировкой громкости
- Batch-генерация — несколько вариантов за раз
- REST API для интеграции с внешними системами

Деплой через Docker:
```bash
git clone https://github.com/harry0703/MoneyPrinterTurbo
cd MoneyPrinterTurbo
docker compose up -d
```

Web-интерфейс доступен на `http://localhost:8080`, API — на `http://localhost:8080/api/v1`.

### Baserow — база данных

[Baserow](https://baserow.io) — open-source альтернатива Airtable. Self-hosted, с REST API и вебхуками. Используется для хранения всех данных пайплайна: тем, сценариев, URL видео, статусов публикации.

Поля таблицы:
- `topic` — тема видео
- `script_text` — сгенерированный сценарий
- `video_prompt` — промпт для MoneyPrinterTurbo
- `search_tags` — теги для поиска видео
- `shorts_tags` — хэштеги для постов
- `task_id` — ID задачи в MoneyPrinterTurbo
- `video_url` — путь к готовому видео
- `postiz_id` / `postiz_path` — ID и путь в Postiz
- `status` — статус (approved → processing → done → publish)
- `publish_links` — ссылки на опубликованные посты

### Postiz — менеджер соцсетей

[Postiz](https://postiz.com) — открытый инструмент для планирования и публикации контента на 30+ платформах. Self-hosted, с API для интеграции.

Поддерживаемые платформы для Shorts:
- TikTok
- YouTube Shorts
- Instagram Reels
- Facebook Reels
- Threads

## Архитектура пайплайна

Workflow в n8n выполняет следующую последовательность:

```
┌─────────────────────────────────────────────────────────────┐
│  1. Триггер (cron каждые N часов или ручной запуск)         │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  2. Генерация темы (JavaScript)                             │
│  - Случайная тема из предопределённого списка               │
│  - Стиль хука, CTA, теги                                   │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  3. AI генерация сценария (Google Gemini)                   │
│  - title, fomo_text, video_prompt, shorts_tags              │
│  - JSON-формат для парсинга                                │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  4. Сохранение в Baserow (status: approved)                 │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  5. Создание видео (MoneyPrinterTurbo API)                  │
│  - POST /api/v1/videos с промптом и настройками            │
│  - aspect: 9:16, голос: Fenrir-Male, субтитры: вкл         │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  6. Ожидание готовности (polling каждые 2 минуты)           │
│  - GET /api/v1/tasks/{task_id}                              │
│  - Проверка progress === 100                                │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  7. Загрузка видео в Postiz                                 │
│  - uploadFile с binary data                                │
│  - Сохранение postiz_id и postiz_path в Baserow            │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  8. Публикация на 5 платформ                                │
│  - Фильтрация по identifier: tiktok, youtube, facebook,    │
│    instagram, threads                                       │
│  - Schedule on [Platform] с настройками                     │
└──────────────────────────┬──────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  9. Уведомление в Telegram                                  │
│  - Список опубликованных ссылок                             │
│  - Статус: published                                       │
└─────────────────────────────────────────────────────────────┘
```

## Пошаговая настройка

### 1. Docker Compose

Создайте `docker-compose.yml` со всеми сервисами:

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_password
      - GENERIC_TIMEZONE=Europe/Moscow
      - TZ=Europe/Moscow

  moneyprinter:
    image: harry0703/moneyprinterturbo:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - mp_config:/app/config
      - mp_videos:/app/output

  postiz:
    image: gitroomhq/postiz-app:latest
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgres://postiz:postiz@postgres:5432/postiz
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_DB=postiz
      - POSTGRES_USER=postiz
      - POSTGRES_PASSWORD=postiz
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  n8n_data:
  mp_config:
  mp_videos:
  baserow_data:
  pg_data:
```

Запуск:

```bash
docker compose up -d
```

### 2. Таблица в Baserow

Создайте базу данных и таблицу со следующими полями:

| Поле | Тип | Описание |
|------|-----|----------|
| topic | Text | Тема видео |
| script_text | Long text | Сценарий для озвучки |
| video_prompt | Text | Промпт для MoneyPrinterTurbo |
| search_tags | Text | Теги через запятую |
| shorts_tags | Text | Хэштеги через запятую |
| task_id | Text | ID задачи в MoneyPrinterTurbo |
| video_url | Text | Путь к видео |
| postiz_id | Text | ID файла в Postiz |
| postiz_path | Text | Путь к файлу в Postiz |
| status | Text | Статус: approved/processing/done/publish |
| publish_links | Long text | Ссылки на опубликованные посты |
| created_at | Created | Дата создания |

### 3. Импорт workflow в n8n

1. Откройте n8n на `http://localhost:5678`
2. Импортируйте JSON-файл workflow
3. Настройте credentials:
   - **Baserow Token** — токен API Baserow
   - **Postiz API** — API-ключ Postiz
   - **Google Gemini API** — ключ Google AI
   - **Telegram Bot** — токен бота и chat_id

### 4. Настройка Postiz

1. Откройте Postiz на `http://localhost:5000`
2. Зарегистрируйтесь и создайте организацию
3. Подключите аккаунты соцсетей:
   - TikTok
   - YouTube
   - Instagram
   - Facebook
   - Threads
4. Скопируйте API-ключ из настроек

### 5. Конфигурация workflow

В n8n настройте параметры:

**Schedule Trigger:**
- Интервал: каждые 2-4 часа (или по необходимости)

**Code in JavaScript:**
- Редактируйте список тем под вашу нишу
- Настройте стили хуков и CTA
- Добавьте запрещённые клише

**HTTP Request (MoneyPrinterTurbo):**
- URL: `http://moneyprinter:8080/api/v1/videos`
- Настройте параметры видео:
  - `video_aspect`: `"9:16"` для Shorts
  - `voice_name`: выберите голос
  - `video_language`: `"ru"` для русского
  - `video_source`: `"pexels"` или `"pixabay"`

**Postiz nodes:**
- Убедитесь, что integration IDs правильные
- Настройте настройки публикации для каждой платформы

## Детали workflow

### Генератор тем

JavaScript-узел выбирает случайную тему из предопределённого списка:

```javascript
const topics = [
  "5 инструментов для автоматизации бизнеса",
  "Почему open-source побеждает",
  "Автоматизация соцсетей: полный гайд",
  // ... ваши темы
];

const hook_styles = [
  "жёсткий", "провокационный", "спокойно-давящий",
  "агрессивный", "мотивирующий", "ироничный"
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

return [{
  json: {
    topic: pick(topics),
    hook_style: pick(hook_styles),
    search_tags: "viral, trending, tech, automation"
  }
}];
```

### Промпт для Gemini

AI получает инструкцию генерировать JSON с полями:
- `title` — цепляющий заголовок
- `fomo_text` — сценарий для озвучки (40-60 секунд)
- `video_prompt` — промпт на английском для MoneyPrinterTurbo
- `shorts_tags` — 5 тегов транслитом

Правила генерации:
- Связная речь, без рваных фраз
- Эффект FOMO — зритель должен чувствовать, что упускает деньги
- Живая разговорная речь
- Никаких запрещённых клише

### Настройки видео

MoneyPrinterTurbo создаёт видео с параметрами:

```json
{
  "video_aspect": "9:16",
  "video_concat_mode": "random",
  "video_clip_duration": 5,
  "match_materials_to_script": true,
  "video_count": 1,
  "video_source": "pexels",
  "video_language": "ru",
  "voice_name": "gemini:Fenrir-Male",
  "voice_rate": 1.1,
  "subtitle_enabled": true,
  "subtitle_position": "custom",
  "custom_position": 85.0,
  "font_size": 50
}
```

### Публикация на платформы

Postiz получает видео и публикует на каждой платформе с уникальными настройками:

**TikTok:**
- privacy_level: `PUBLIC_TO_EVERYONE`
- comment: `true`
- content_posting_method: `UPLOAD`

**YouTube:**
- type: `public`
- Теги добавляются в описание

**Instagram:**
- post_type: `post` или `story`

**Facebook:**
- post_type: `post`

**Threads:**
- Теги в описании

## Советы

### Rate limits

При частом использовании API могут быть ограничения:
- Gemini: 15 запросов в минуту (бесплатный тариф)
- MoneyPrinterTurbo: зависит от мощности сервера
- Postiz: зависит от API соцсетей

### Обработка ошибок

n8n имеет встроенную обработку ошибок:
- `retryOnFail: true` — повторные попытки
- `maxTries: 5` — максимальное количество попыток
- `waitBetweenTries: 5000` — пауза между попытками

### Мониторинг

Отслеживайте прогресс через Baserow:
- `approved` — сценарий сгенерирован
- `processing` — видео создаётся
- `done` — видео готово
- `publish` — опубликовано на всех платформах

### Оптимизация

- Запускайте workflow в непиковые часы
- Ограничьте количество видео за раз
- Используйте batch-генерацию для выбора лучшего варианта

## Читайте также

- [Настройка сервера Ubuntu 24.04 с Docker](/posts/ubuntu-docker) — базовая настройка сервера
- [Настройка медиа-сервера в Docker](/posts/media-server) — автоматизация загрузки фильмов
- [Настройка Nginx и Docker Portainer](/posts/web-server) — reverse proxy и управление контейнерами

## Ссылки

- [n8n](https://n8n.io) — платформа автоматизации
- [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — AI-генерация видео
- [Baserow](https://baserow.io) — open-source база данных
- [Postiz](https://postiz.com) — менеджер соцсетей
- [Docker](https://docs.docker.com) — контейнеризация
