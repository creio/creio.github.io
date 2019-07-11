---
layout: page
title: Поиск
sitemap: false
permalink: /search/
---

<form class="search" action="/search/" method="get">
  <label for="search-box"></label>
  <input type="text" id="search-box" name="q" placeholder="Введите запрос" required>
  <button type="submit"></button>
</form>

<strong id="search-query"></strong>

<ul id="search-results"></ul>

<script>
  window.store = {
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>
<script src="{{ "/assets/js/search/lunr.min.js" | relative_url }}"></script>
<script src="{{ "/assets/js/search/lunr.stemmer.support.min.js" | relative_url }}"></script>
<script src="{{ "/assets/js/search/lunr.ru.min.js" | relative_url }}"></script>
<script src="{{ "/assets/js/search/lunr.multi.min.js" | relative_url }}"></script>
<script src="{{ "/assets/js/search/search.js" | relative_url }}"></script>