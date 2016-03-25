---
title: Gordux.js - The redux pattern in vanilla.js
updated: 2016-03-25 23:00
category: vanilla.js
---

I love the idea of [Redux](/redux-make-the-state-sane-again). Managing state in an application is critical! There is nothing like "the state of a web application". Let's go back a few years when there were none of these "javascript applications". The [query string](https://en.wikipedia.org/wiki/Query_string) did a quite good job in shipping the document (aka web application) with a predictable state. If we change application state we do this by following a hyperlink :cool:.

Some time later javascript UI entered the room with all of its state changing stuff like accordions, toggles and ajax content replacements. Everything was broken. The applications state was banished into a fragmented landscape of CSS classes, javascript variables, data attributes to even more confusing state holders.

To the rescue, Redux introduced a simple layer between triggering a state change and actually changing the state.

![redux ui flow](/assets/build/gordux/flow-0.png)

:beers: After some beers, I found out that all of the benefits of civilizing the state of a browser application can be archived using the redux pattern without redux. Thanks to [Manu Ninja](https://manu.ninja) for merging "gordon" and "redux" to "gordux".

Let's see how this works.

Think of a common UI application state cycle. You click a ```<button>``` and something happens with the content of a dom element (```<div>```).

The cycle starts with an event listener ...

```js
// UI event listener

let $button = document.querySelector('button');
$button.addEventListener("click", function() {
  // some amazing action will happen
  // ... like calcualteStuffAndRender()
});
```

... and typically finishes with a dom update implementation depending on your view-framework. As a basic principle something like this ```innerHTML``` replacement should work:

```js
// UI render method

function render() {
  let $div = document.querySelector('div');
  $div.innerHTML = store;
}
```

The implementation of the UI event and the logic of updating the state has nothing to do with redux. No dependency - so check this off.

![flow stage 1](/assets/build/gordux/flow-1.png)

## Actions

In Redux actions are simple functions returning javascript objects containing a ```type``` and a payload with properties like ```id``` to calculate the state change. They descript **what is happening** with the state (not how).

```js
const COUNT_UP = "COUNT_UP";
function countUp() {
    return {
        type: COUNT_UP
    };
}
```

Actions stay the [same as in redux](http://redux.js.org/docs/basics/Actions.html).

## Reducers

Reducers define **how the states changes** when a given action triggers. Their single task is to modify the ```state``` based on the ```action``` argument and return the new state. Read more about [reducers](http://redux.js.org/docs/basics/Reducers.html) in the Redux Docs.

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

As they are pure javascript functions - gordux.js has nothing to change on this pattern. :beer:

Lets look at our flow chart progress:

![flow stage 2](/assets/build/gordux/flow-2.png)

## Store

What is the store? Actually, the redux state-store is a plain js object. It's the single source of state-truth. Every action is dispatched through the store's reducer function (:guardsman: this can be one or a chain of reducers). After modifying the state, the store emits a state change event to all listeners. Let's see how this looks in redux:

```js
// import redux dependency
import { createStore } from 'redux'

// create a store with reducer
let store = createStore(reducer);

// subscribe a state change handler
store.subscribe(render)

// dispatch a action
store.dispatch(countUp());
```

In a nutshell:

- Actions Events to the store.
- Store reducers calculate a new state.
- A State event to subscribed store listeners.

![flow stage 3](/assets/build/gordux/flow-3.png)

### Events Emitter

As we are already using a event dispatcher in the browser - this is how to trigger a custom event through the a dom event:

```js
// subscribe
document.addEventListener('yolo', function(event) {
    alert('yo' + event.detail);
}, false);

// dispatch
document.dispatchEvent(new CustomEvent('yolo', { detail: "lo"}));
```

This lets us create a redux store without ```import { createStore } from 'redux'```. In the gordux.js pattern you subscribe to the ```action```-events as a callback we run the reducers with the event payload to recalculate and update the state. After that we dispatch a ```state```-event to notify the application that state has changed.

```js
// not import gordux dependency

// create a store with reducer
let store = {};

document.addEventListener('action', function(e) {
    store = reducer(store, e.detail);
    document.dispatchEvent(new CustomEvent('state'));
}, false);

// subscribe a state change handler
document.addEventListener('state', render);

// dispatch a action
document.dispatchEvent(
  new CustomEvent('action', { detail: countUp()})
);
```

Thats all. **Pattern > Package**

![Gordux.js Flow](http://i.giphy.com/PJbWFtODqfq5q.gif)

- Run a [Gordux Demo](https://k94n.com/gordux.js/)


## Yo, cross-browser

Polyfill with [custom-event](https://github.com/webmodules/custom-event) a cross-browser `CustomEvent` constructor.

```sh
npm install custom-event -D
```

```js
import CustomEvent from 'custom-event';
```

## Counter Vanilla Compare

- [Counter Vanilla in Redux.js](https://k94n.com/gordux.js/counter_vanilla__redux.html)
- [Counter Vanilla in vanilla.js](https://k94n.com/gordux.js/counter_vanilla__vanilla.html)

## A logger example

Now that we have this super clean state layer lets make use of it and implement a simple application state logger:

```js
document.addEventListener('action', function(e) {
    console.log("action", e.detail);
});

document.addEventListener('state', function(e) {
    console.log("state changed", state);
});
```

## More :ocean: :ocean: :ocean:

- View the [full pattern](https://github.com/k9ordon/gordux.js/blob/master/pattern.html)
- Contribute to [Gordux.js Github Repo](https://github.com/k9ordon/gordux.js)
- Run a [Gordux.js Demo](https://k94n.com/gordux.js/)
- Include [gordux.js from our CDN](https://k94n.com/assets/gordux.js)
