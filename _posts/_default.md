---
title: Text formatting examples
description: bla bla
tags: jekyll
image: 
post_photo_path: 
post_video: 
post_video_large: 
comments: true
permalink: /whois/
mathjax: true
---

<div class="embed">
  <iframe src="https://www.youtube.com/embed/{{ page.post_video }}" frameborder="0" allowfullscreen></iframe>
</div>

<div class="large embed">
  <iframe src="https://www.youtube.com/embed/{{ page.post_video }}?autoplay=0&showinfo=0&controls=1&color=red&disablekb=1&rel=0" modestbranding="1" frameborder="0" theme="dark" allowfullscreen></iframe>
</div>

<div class="large" markdown="1">
  ![Swiss Alps](https://user-images.githubusercontent.com/4943215/55412536-edbba180-5567-11e9-9c70-6d33bca3f8ed.jpg)
</div>

> My mom always said life was like a box of chocolates. You never know what you're gonna get.
{: .warning}