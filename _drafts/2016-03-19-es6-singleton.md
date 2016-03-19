---
title: ES6 Module Singleton
updated: 2016-03-19 16:00
---

In this post, we will create a singleton class in beautiful vanilla es6 module syntax bundle up with webpack. Singletons are useful for single instance modules without  polluting the global space. They can be required easily as singleton instance or as classes for being used higher in the class chain.

This example shows a main-module containing one child-module. Both of them share a notifications handler. 

You need webpack and babel-es2015

```sh
npm install webpack babel-loader babel-preset-es2015
```

## Notifications Class

First, we create a quite basic notifications class in ```notifications.js```. In the constructor, we create a message array. This will hold all our messages for later usage (like showing message count in a UI). The second method (``add(message)```) just pushes a given message to the messages array.

```js
// notifications.js
export class Notifications {

  constructor() {
    this.messages = [];
  }

  add(message) {
    this.messages.push(message);
  }
}
```

For debugging purpose, we add a document.write and console.log to the ```add``` method.

```js
add(message) {
  this.messages.push(message);

  // debug
  document.write(`<p>${this.messages.length} - ${message}</p>`);
  console.log('messages', this.messages);
}
```

Everytime someone calls the ```add``` Method we get a new line with the message body and a total count of notifications. This indicates the same object is being used.

If we ```import { Notifications } from "./notifications.js“;``` we get our Notifications class. Cool. 

So beside of exporting the class we also export a new instance of the Notifications class using let to get a singleton in the global scope.

```js
export let notifications = new Notifications();
```

That's all the voodoo. **Let** used in global scope makes sure notifications is not reused. So every time we import with ```import { Notifications, notifications } from "./notifications.js“;``` we get the class ```Notifications``` plus the singleton instance ```notifications```. 

## Child-Module

Our first usage of Notifications is in a Child-Module class. It imports the notifications instance as shown. When created it calls the ```add```-Method of notifications.

```js
// child.js
import { notifications } from "./notifications.js";

export class Child {

  constructor(name) {
    this.name = name;

    notifications.add('yolo from ' + this.name)
  }
  
}
```


## Main-Module

To bring this all together we create the main module.

```js
// main.js
import { notifications } from "./notifications.js";
import { Child } from "./child.js";

export class Main {
  constructor() {
   notifications.add('yolo 1 from main');
    
    // create new children (they send messages in constructor)
    let child1 = new Child('le child 1');
    let child2 = new Child('le child 2');

    // send second message from main
    notifications.add('yolo 2 from main');
  }
}
```

Finally bootstrap on domready:

```js
document.addEventListener("DOMContentLoaded", (e) => new Main());
```

## As we run

When we let webpack bundle and execute all of this in browser we get the following makeup in ```document.body```:

```html
<p>1 - yolo 1 from main</p>
<p>2 - yolo from le child 1</p>
<p>3 - yolo from le child 2</p>
<p>4 - yolo 2 from main</p>
```

The up counting total count shows its singleton. 

Once again the full ```notification.js```:

```js
// notifications.js
export class Notifications {
  constructor() {
    this.messages = [];
  }

  add(message) {
    this.messages.push(message);
  }
}

export let notifications = new Notifications();
```

- You can get a working example of this code at [webpackbin.com](http://www.webpackbin.com/NJdpRL8px)
- [Repository with example code](https://github.com/k9ordon/es6-module-singleton) on github