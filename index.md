---
layout: default
---

<section>

    <h1 class="title">{{site.title}}</h1>

    <p class="description">
        {{ site.description | replace: 'love', ":heart:" }} <a href="/about">more</a>
    </p>

    <div class="divider"></div>

</section>

<section>

    <ul>

        {% for post in site.posts %}

        <li>
            <div class="post-date">
                <span>{{ post.date | date: "%b %d, %Y" }}</span>
            </div>
            <div class="title">
                <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
            </div>
        </li>

        {% endfor %}

    </ul>

</section>



<ul class="action">

    <li class="action-block">
        <a class="action-link" href="{{ site.related_posts[0].url }}/">
            <img class="emoji" title=":open_hands:" alt=":open_hands:" src="/assets/build/emoji/unicode/1f648.png" height="20" width="20" align="absmiddle">
            Random
        </a>
    </li>

    <li class="action-block">
        <a class="action-link" href="{{site.mailchimp.subscribe}}">
            :hatched_chick: Subscribe
        </a>
    </li>
</ul>
