---
layout: page
title: Klemens Gordon
---

Hi internet! :boar:

My name is Klemens Gordon - I am a fullstack–webapplication-developer from austria.
I enjoy javascript,
{% for category in site.categories reversed %}{% if forloop.index < 6 %}{%if category[0] %}{% for post in site.posts %}{%if category[0] == post.category %}[{{ category[0] | downcase }}]({{ post.url | prepend: site.baseurl }}), {% break %}{% endif %}{% endfor %}{% endif %}{% endif %}{% endfor %} beer and web performance. At daytime I work as lead frontend developer at [karriere.at](http://www.karriere.at/dev-blog).

You can find my code at [github.com/k9ordon](http://github.com/k9ordon), follow me on [twitter.com/thisisgordon](http://twitter.com/thisisgordon). Sometimes I upload slides at [speakerdeck.com/k9ordon](https://speakerdeck.com/k9ordon)

If you are interested in stuff - grab a coffee & hit me at  &#104;&#105;&#064;&#107;&#057;&#052;&#110;&#046;&#099;&#111;&#109;
