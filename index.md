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


<div class="action">
    <div class="block">
        :hatched_chick:
		<a href="{{site.mailchimp.subscribe}}">Subscribe</a>
	</div>
</div>
