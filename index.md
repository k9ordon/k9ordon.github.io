---
layout: default
---

<section itemscope="" itemtype="http://schema.org/Blog">

    <h1 class="title" itemprop="name">{{site.title}}</h1>

    <p class="description">
        {{ site.description | replace: 'love', ":heart:" }} <a href="/about">more</a>
    </p>

    <ul>

        {% for post in site.posts %}

        <li itemprop="blogPost" itemscope="" itemtype="http://schema.org/BlogPosting">
            <div class="post-date" itemprop="datePublished" datetime="{{ post.date | date_to_xmlschema }}">
                <span>
                    {{ post.date | date: "%b %d, %Y" }}
                </span>
            </div>
            <div class="title" itemprop="name">
                <a href="{{ post.url | prepend: site.baseurl }}" itemprop="url">{{ post.title }}</a>
            </div>
        </li>

        {% endfor %}

    </ul>

</section>



<ul class="action">

    <li class="action-block">
        <a class="action-link" href="{{site.mailchimp.subscribe}}">
            :hatched_chick: Subscribe
        </a>
    </li>
</ul>
