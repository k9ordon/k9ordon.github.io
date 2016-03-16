---
title: Vanilla.js - Iterating a NodeList
updated: 2016-03-15 00:50
---

This article is about iterating a NodeList in plain javascript - a very common pitfall for developers with a jQuery background.

> You Probably Don't Need jQuery To Estimate Pi

We ditched jQuery years ago. First reason for this was load time. We archived rewriting the whole application in the size of the previous autocomplete plugin. So this was a huge win for page performance.

Second was jQuery always feels like training wheels for the bare bone javascript. It tries to builds a solution for everything you got problems with. Query the dom? Need jQuery. Read input field value? Need jQuery. Hide element? Need jQuery. See the pattern? You need jQuery. For all the simple things javascript can do. And you lose control of what's going on in the „native“ :japanese_ogre: code.

Some clever guys did the unbelievable assumption that [YOU MIGHT NOT NEED JQUERY](http://youmightnotneedjquery.com/)! [Do You Really Need jQuery](http://www.sitepoint.com/do-you-really-need-jquery/)? [You Don't Need jQuery](http://blog.garstasio.com/you-dont-need-jquery/)!

A word on the pre-ie8-era:

> Some developers believe that jQuery is protecting us from a great demon of browser incompatibility when, in truth, post-IE8, browsers are pretty easy to deal with on their own.

Back to now. In 2016, we are happy to set browser-support to barely anything below latest two versions. jQuery **nearly** lost all of its incompatibility voodoo magic.

This is how to ... :tada:

## Iterate over a NodeList

A node list is a collection of dom nodes. Most people think NodeLists are arrays like ```[<div>, <div>, <div>]```. Well almost.

Our shiny markup

```html
<div></div>
<div></div>
<div></div>
```

### The jQuery way:

```jQuery
var $nodes = $('div');

$nodes.each(function(i, $el){
    console.log($el.tagName); // => (3) DIV
});
```

You are using jQuery not browser apis. :goberserk:

~~```$ = function(y) { return document.querySelectorAll(y) };```~~

In [vanilla.js](/assets/vanilla.js) there are some ways to archive this:

### Good ol' for

This is robust. Do it! :thumbsup:

```js
var nodes = document.querySelectorAll('div'),
    i;

for (i = 0; i < nodes.length; i++) {
    var $el = nodes[i];
    console.log($el.tagName); // => (3) DIV
}
```

### straight forward prototype patching

Hacky but very efficient. Just copy forEach from Array prototype to NodeList prototype. :ghost:

```js
NodeList.prototype.forEach = Array.prototype.forEach;

var nodes = document.querySelectorAll('div');

nodes.forEach(function ($el) {
    console.log($el.tagName); // => (3) DIV
});

```

### ES6/Babel for … of

Beautiful native ES6 iteration. :sunglasses:

```js
var nodes = document.querySelectorAll('div');

for (var $el of nodes) {
    console.log($el.tagName); // => (3) DIV
}
```



## Why is NodeList not an Array?


:trollface: In the prototype chain of an object its on the [same level as array](https://developer.mozilla.org/de/docs/Web/API/NodeList#Why_is_NodeList_not_an_Array) and has different behavior. You can converted a NodeList to an array by  ```[].slice.call(document.querySelectorAll("div"));```

Compared to static Arrays NodeLists can be live updating when created with ```getElementsByTagName``` or ```getElementById```.

```js
document.body.appendChild(document.createElement("div"));

var nodes = document.getElementsByTagName("div");
var nodesnotlive = document.querySelectorAll("div");

console.log(nodes.length); // => 1
console.log(nodesnotlive.length); // => 1

document.body.appendChild(document.createElement("div"));

console.log(nodes.length); // => 2
console.log(nodesnotlive.length); // => 1
```

<center>:v:</center>
