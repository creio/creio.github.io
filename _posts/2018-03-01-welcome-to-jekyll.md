---
title: Welcome to Jekyll
tags: jekyll blog
comments: true
---

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

```sh
#!/bin/bash

# URL='https://yubnub.org/parser/parse?command='

URL='https://duckduckgo.com/?q='
QUERY=$(cat ~/.cache/search_history | rofi -dmenu -p "Search")
if [ -n "$QUERY" ]; then
    grep -q "$QUERY"  "$HOME/.cache/search_history"
    echo $QUERY >> ~/.cache/search_history_temp && sort -u ~/.cache/search_history_temp > ~/.cache/search_history
  xdg-open "${URL}${QUERY}" 2> /dev/null
fi
```

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
