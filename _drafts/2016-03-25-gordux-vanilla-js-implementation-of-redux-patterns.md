---
title: Gordux.js - The redux pattern in vanilla.js
updated: 2016-03-10 23:20
category: Meteor.js
tweet: 708063278568710144
---

I love the idea of [Redux](/redux-make-the-state-sane-again). Managing state in an application is critical! There is nothing like "the global state of an application". Lets go back a few years when there was none of these "javascript applications". The [query string](https://en.wikipedia.org/wiki/Query_string) did a quite good job in shipping the document (aka web application) with a predictable state. If we change application state we do this by following a hyperlink :cool:.

Some time later javascript UI entered the room with all of its state changing stuff like accordions, toggles and ajax content replacements. Everything was broken. The application state was fragmented and banish to css classes, javascript vars, data attributes and more confusing state holders.

To the rescue Redux introduced a simple layer between triggering a state change and acutally changing the state.

![webpack start page: what is webpack?](/assets/build/gordux/flow.png)

After some beers I found out all of the benefits about saning the state can be archived using the the redux patter without redux. Lets see how this works.

## Actions

In Redux actions are simple functions returning javascript objects containing a ```type``` property and a payload with properties like ```id``` to execute a state change.
