---
layout: page
---

<div class="author text-center mx-auto py-5">
  <img
    class="author-avatar"
    src="{{ site.author.avatar }}"
    alt="{{ site.author.username }}"
  />
  <p class="text-grey-dk-000">{{ site.author.bio }}</p>
</div>

<p class="posts-item-note" aria-label="Recent Posts">Последние Записи</p>
{%- for post in site.posts limit: site.number_of_posts -%}
<article class="post-item">
  <h2 class="fs-5">
    <a href="{{ post.url }}">
      <span class="fs-3 text-grey-dk-000 pr-3">{{ post.date | date: "%d %b %Y" }}</span> {{ post.title | escape }}
    </a>
  </h2>
</article>
{%- endfor -%}
