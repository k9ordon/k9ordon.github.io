---
title: ES6 Module Singleton
updated: 2016-03-19 16:00
---

In this post we will create a singleton class in beautiful vanilla es6 module syntax bundle up with webpack. Singletons are useful for single instance modules without  polluting the global space. They can be required easily as singleton instance or as classes for being used higher in the class chain.

This example shows a main-module containing one child-module. Both of them share a notification handler.

## Notifications Class

First we create a quite basic notifications class in ```notifications.js```. In the constructor we create a message array. This will hold all our messages for later usage (like showing message count in a UI). The second method (``add(message)```) just pushes a given message to the messages array.

```js
export class Notifications {

  constructor() {
    this.messages = [];
  }

  add(message) {
    this.messages.push(message);
  }
}

```

For debugging purpose we add a document.write and console.log to the ```add``` method.

```js
add(message) {
  this.messages.push(message);

  // debug
  document.write(`<p>${this.messages}</p>`);
  console.log('messages', this.messages);
}
```

If we then ```import { Notifications } from "./notifications.js“;``` we get our Notifications class. So beside of exporting the class we export an instance of a class

## Child-Module

Next up is Child-Module class. It imports

```js
import { Notifications } from "./notifications.js";

export class Child {
  constructor(name) {
    this.name = name;

    notifications.add('yolo from ' + this.name)
  }
}
```




```js
// main.js
// - import Child
// - import Notifications singelton
class Main {}
```


```js
// child.js
// - import Notifications singelton
class Child {}
```




## main.js

```js
import { notifications } from "./notifications.js";
import { Child } from "./child.js";

document.addEventListener("DOMContentLoaded", function(event) {
  notifications.add('yolo 1 from main');

  let child1 = new Child('le child 1');
  let child2 = new Child('le child 2');

  notifications.add('yolo 2 from main');
});
```

## child.js

```js
import { notifications } from "./notifications.js";

export class Child {
  constructor(name) {
    this.name = name;

    notifications.add('yolo from ' + this.name)
  }
}
```

## notifications.js

```js
export class Notifications {
  constructor() {
    this.messages = [];
  }
  add(message) {
    this.messages.push(message);
    document.write(`<p>${this.messages}</p>`)
    console.log('messages', this.messages);
  }
}

export let notifications = new Notifications();
```
