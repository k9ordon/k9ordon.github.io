---
title: Vanilla.js - Good by Handlebars
updated: 2016-04-14 23:00
category: Vanilla.js
---

```html
<script id="my-template" type="x-template">
    <li>
        <span class="movie-name"></span>
        <span class="movie-rating"></span>
    </li>
</script>
```


```js
var template = document.getElementById("my-template").innerHTML,
			 el = document.createElement('div');

	 el.innerHTML = template;

	 el.querySelector("movie-name").innerHTML = movie.name;
	 el.querySelector("movie-rating").innerHTML = movie.rating;

	 document.getElementById("list").appendChild(el);
```
