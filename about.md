---
layout: page
title: Klemens Gordon
---

Hi internet! :hamburger::boar:

My name is Klemens Gordon - I am a fullstack–webapplication-developer from austria.
I enjoy javascript, {% for category in site.categories reversed %}{% if forloop.index < 6 %}{%if category[0] %}{% for post in site.posts %}{%if category[0] == post.category %}[{{ category[0] | downcase }}]({{ post.url | prepend: site.baseurl }}), {% break %}{% endif %}{% endfor %}{% endif %}{% endif %}{% endfor %} beer and web performance. At daytime I work as lead frontend developer at [karriere.at](https://www.karriere.at/dev-blog).

You can find my code at [github.com/k9ordon](https://github.com/k9ordon), follow me on [twitter.com/thisisgordon](https://twitter.com/thisisgordon). Sometimes I upload slides at [speakerdeck.com/k9ordon](https://speakerdeck.com/k9ordon)

If you are interested in stuff - grab a coffee & hit me at [@thisisgordon](https://twitter.com/thisisgordon)
