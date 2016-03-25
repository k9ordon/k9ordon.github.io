---
title: Gordux.js - The redux pattern in vanilla.js
updated: 2016-03-10 23:20
category: vanilla.js
---

I love the idea of [Redux](/redux-make-the-state-sane-again). Managing state in an application is critical! There is nothing like "the global state of an application". Let's go back a few years when there were none of these "javascript applications". The [query string](https://en.wikipedia.org/wiki/Query_string) did a quite good job in shipping the document (aka web application) with a predictable state. If we change application state we do this by following a hyperlink :cool:.

Some time later javascript UI entered the room with all of its state changing stuff like accordions, toggles and ajax content replacements. Everything was broken. The application state was fragmented and banish to CSS classes, javascript vars, data attributes and more confusing state holders.

To the rescue, Redux introduced a simple layer between triggering a state change and actually changing the state.

![webpack start page: what is webpack?](/assets/build/gordux/flow.png)

After some beers, I found out all of the benefits about saning the state can be archived using the redux pattern without redux. Let's see how this works.

## Actions

In Redux actions are simple functions returning javascript objects containing a ```type``` property and a payload with properties like ```id``` to calculate a state change. The descript what is happening - not how.

```js
const COUNT_UP = "COUNT_UP";
function countUp() {
    return {
        type: COUNT_UP
    };
}
```

Actions say the [same as in redux](http://redux.js.org/docs/basics/Actions.html).

## Reducers

Reducers define the how. The have the single task to take a ```state``` and a ```action``` argument and return the new state. Read more about [Reducers](http://redux.js.org/docs/basics/Reducers.html) in the Redux Docs.

```js
function reducer(state, action) {
  switch (action.type) {
    case COUNT_UP:
      return state + 1;
    default:
      return state
  }
}
```

As they are pure js. Gordux.js has nothing todo. :beer:

## Store

What is the store? Actually, the redux state-store is a plain js object. It's the single source of state-truth. Every action is dispatched through the store's reducer function. This can call one or a chain of reducers. After modifying the state, the store runs all registered state change listeners. Let's see what react does.

```js
// create a store with reducer
import { createStore } from 'redux'
import reducer from './reducers'
import render from './render'

let store = createStore(reducer);

// subscribe a state change handler
store.subscribe(render)

// dispatch a action
store.dispatch(countUp());
```

The lets do this without ```import { createStore } from 'redux'```.

```js
// create a store with reducer
import reducer from './reducers'
import render from './render'

let store = {};

document.addEventListener('action', function(e) {
    store = reducer(store, e.detail || {});
    document.dispatchEvent(new CustomEvent('state'));
}, false);

// subscribe a state change handler
document.addEventListener('state', render);

// dispatch a action
document.dispatchEvent(new CustomEvent('action', { detail: countUp()}));
```

## Yo, cross-browser

[custom-event](https://github.com/webmodules/custom-event) a cross-browser `CustomEvent` constructor.
```sh
npm install custom-event -D
```

## Counter Vanilla Compare

- [Counter Vanilla in Redux.js](https://k94n.com/gordux.js/counter_vanilla__redux.html)
- [Counter Vanilla in vanilla.js](https://k94n.com/gordux.js/counter_vanilla__vanilla.html)

## More Links

- [Gordux Github Repo](https://github.com/k9ordon/gordux.js)
- [Gordux Demo](https://k94n.com/gordux.js/)
