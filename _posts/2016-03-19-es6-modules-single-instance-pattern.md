---
title: ES6 Modules - Single Instance Pattern
updated: 2016-03-22 21:15
category: ES6
---

In this post, we will create a singleton like class in beautiful minimal vanilla es6 module syntax. Singletons exports are useful for single instance modules without reading and writing to the global space (```window```, ```window.app```, ...). Our singleton like instance can easily be im/exported with es6 module syntax.  Additionally, classes can be used in a higher level of the class chain if exported. The magic behind is simple: **ES6 Modules are singletons - the instance is created when module is loaded.**

## The pattern

Create your class and export an instance of it.

```js
// File: yolo.js

class Yolo {}
export let yolo = new Yolo();
```

To import the instance simply import it from your module. ES6 modules make sure it's the same instance of the class as you require somewhere else.

```js
// File: laser.js

import { yolo } from "./yolo.js";
// yolo is a single instance of Yolo class
```

```js
// File: cat.js

import { yolo } from "./yolo.js";
// same yolo as in laster.js
```

## Example

This example shows:

- A **main module** containing one **child module**
- Both of them share a single **notification broker** instance

You can grab a [copy of the code at github](https://github.com/k9ordon/es6-module-single-instance) or [webpackbin](http://www.webpackbin.com/NJdpRL8px).

I use webpack and babel-es2015 to run this example.

```sh
npm install webpack babel-loader babel-preset-es2015
```

## Notifications Class

First, we create a quite basic notifications class in ```notifications.js```. The constructor creates a message array. This will hold all our messages for later usage (like showing message count in a UI). The second method (```add(message)```) just pushes a given message to the messages array.

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

Everytime someone calls the ```add``` Method we get the total count of notification messages in the instance and the message body.

If we ```import { Notifications } from "./notifications.js“;``` we get our Notifications class. Cool.

So beside of exporting the class we also export a new instance of the Notifications class using „```let```“ to always export a single instance of notifications.

```js
export let notifications = new Notifications();
```

That's all the voodoo. **Let** used in global scope makes sure ```notifications``` is not reused. So every time we import with ```import { notifications } from "./notifications.js“;``` we get the same instance of the ```Notifications``` class.

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

    // create new children
    // (they call notifications.add in constructor)
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

The up counting total count shows that notifications instance is unique. :metal:

### extending

```js
// transformer.js
import { Yolo } from "./yolo.js";
// Yolo is Yolo class

class TransformerYolo extends Yolo {}

export let transformerYolo = new TransformerYolo();
```

## Exporting class breaks singleton pattern ?!? :scream: :flushed: :sob:

> Singleton pattern restricts object creation for a class to only one instance.

So if you ```import { Notifications, notifications } from "./notifications.js“;``` and ```new Notifications()``` you get another instance of Notifications class. You are not restricted from creating an instantiation of the class. If this is a problem you can get the restriction by simply **not** export the class. :nail_care:

- You can get a working example of this code at [webpackbin.com](http://www.webpackbin.com/NJdpRL8px)
- [Repository with example code](https://github.com/k9ordon/es6-module-single-instance) on GitHub
