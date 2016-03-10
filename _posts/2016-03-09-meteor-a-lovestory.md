---
title: Meteor.js - A lovestory
updated: 2016-03-09 23:00
---

Meteor is a **fullstack javascript framework** for building modern web applications on a complete javascript stack (Mongodb, Nodejs, Browser). If you want to build application fast - it's definitely the way to go.
This article is a rough overview of some selected concepts and technics I am using for side projects. Some key benefits of meteor:

- Barely no dev-ops from first line to production
- Sophisticated Template Engine
- Realtime per default
- Painless cordova mobile builds

Meteor is very well [documented](http://docs.meteor.com/#/full/) and has a huge package-catalog called [Atmosphere](https://atmospherejs.com/).

## Installation

First things first: You need [nodejs](http://lmgtfy.com/?q=install+node.js) - yolo.

```sh
curl https://install.meteor.com/ | sh
```

Thats it for the cool kids (more for the [windows peeps](https://install.meteor.com/windows) - painless too its an .exe lol). You now has ```meteor```. Thats all you need.

## Project bootstrapping

```sh
meteor create leproject
meteor
```

We create a project named „leproject“ (:guardsman: obviously ur own project name). After starting the project with ```meteor``` command we are ready for code. The dev environment includes a running mongodb host,  node.js server and live reload with [hotcodepush](http://info.meteor.com/blog/meteor-hot-code-push). Meteor also creates some sample files go get you up fast.

## App structure

Basically its simple: **All files are concatenated** and shipped. :metal:

There are some „special“ directories inside your project affecting: load order, where they are loaded, and some other characteristics.

- **/client** javascript that is only shipped to client. Will not affect node.js. Files in this directory are executed before other client code. Equivalent to ```if (Meteor.isClient) {}``` wrapped code.
- **/server** as you can guess this is the opposite of client.  ```if (Meteor.isServer) {}```
- **/public** served as-is to the client. Images, icons and other static unprocessed assets.
- **/private** Only accessible from server code. Can be loaded via [Assets api](http://docs.meteor.com/#assets).
- **/lib** common code like collections and utilities. Loaded first.

When Meteor.js concatenates javascript there are some rules for controlling the order. From first to last:
*html templates > files beginning with main > files inside lib > deeper Path > alphabetical*

Read [more about load order](http://docs.meteor.com/#/full/fileloadorder) on meteor.com.

## Views

Meteors in-house template engine is called **blaze**. Its declarative, simple and reactive. The matching template language is called spacebars, which is Meteor's dialect of Handlebars.

> „Blaze fulfills the same purpose as Angular, Backbone, Ember, React, Polymer, or Knockout, but is much easier to use.“

Its also possible to switch the engine to [react.js](https://www.meteor.com/tutorials/react/creating-an-app) or [angular.js](https://www.meteor.com/tutorials/angular/creating-an-app).

Example template from app boilerplate:
{% raw %}
```html
<head>
  <title>yolo</title>
</head>

<body>
  <h1>Welcome to Meteor!</h1>
  {{> hello}}
</body>

<template name="hello">
  <button>Click Me</button>
  <p>You ve pressed the button {{counter}} times.</p>
</template>
```
{% endraw %}

## UI flow

Every template has its own data scope with **helpers**. User interactions are handled via **events**. Thats all.

```js
Session.setDefault('counter', 0);

Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    Session.set('counter', Session.get('counter') + 1);
  }
});
```

## Preprocessing Less

A very common task is setting up your css preprocessor. Meteor's amazing package system does this extremely painless:

```sh
meteor add less
```

Add a less file and it’s shipped processed. Source map support, watcher for live reload and everything. Same for coffee script, sass whatever.

## Deploying :open_mouth:

After 5 minutes of sophisticated hacking its time to deploy out web application. From my experience this is the part where the beer comes in. Searching for a poster, setting up linux, installing web server, configuring databases … :beer:
As I we knew from the beginning meteor is about rapid prototyping. So forget all the beers stuff about configuration and installing apt stuff. We do it the meteor way:

```sh
meteor deploy leproject
```
:guardsman: Cpt. obvious again: leproject is your project name.

Your app is now live at leproject.meteor.com - This is officially available for prototyping only and is no production solution. It’s a fast way to get all the dev-ops stuff out of the way and just build the MVP.

## Mobile builds

As meteor has cordova build in this is also a very straight forward process. Add the platform and run it.

```sh
meteor add-platform ios
meteor run ios
```

This will fire up the iOS simulator from Xcode and boots your app in a phonegap wrapper.

```meteor run ios-device``` starts the application on a connected iOS device. More about [running on mobile](https://www.meteor.com/tutorials/blaze/running-on-mobile).

## Collections & Data

Meteors persistent data layer is Monogodb with some more magic.

Data fetching is done with a Protocol called [DDP](https://www.meteor.com/ddp) (Distributed Data Protocol). Just remember its **REST for Websockets**. Everything in meteor is realtime by default, which is done by livequery a live database connector for Mongo (theoretically also mysql #wtf). From a very high perspective: You do a query - get results - get all the changes to this query via web socket. :raised_hands:

Meteor also feels fast because of a concept called **Optimistic UI**. All the data the fly between mongodb and client gets cached in a minimongo. If a template gets rendered it instantly renders with data from minimongo and then updates with data from monogdb.

Enough theory - now some code. Somewhere in your global scope:

```js
Yos = new Mongo.Collection('yos');
```

Add a new event to a template containing a form:

```js
Template.form.events({
    "submit form": function (event) {
        event.preventDefault();

        Yos.insert({
            createdAt: new Date()
        });
    }
});
```

You just successfully added a record and pushed it in realtime to all clients observing a query like:

```js
Template.list.helpers({
    yos: function() {
        return Yos.find({}, {limit:10, sort:{createdAt:-1}});
    }
});
```

## MVC

As meteor doesnt come with a build in router there are some 3rd party routers. Meteor guide recommends [flow-router](https://atmospherejs.com/kadira/flow-router). Another common router is [Iron Router](https://github.com/iron-meteor/iron-router).

Install iron router via atmosphere - again easy as firin:

```sh
meteor add iron:router
```

Sample route:

```js
Router.route('/', function () {
  this.render(
      'Index',
      {data: {iAmFlag: 1}}
  );
});
```

## „We need user accounts“

While using emberjs or other client frameworks this is really a pain. Compared to drawing a login button in your mockups. You need an implementation for the client, a backend service with does the user logic, session handling, emailing … yadda yadda yadda. As meteor is a full stack framework **meteor packages are also full stack**.

So lets point out the fast lane:

```sh
meteor add accounts-ui accounts-password
```

Bruh. Done.

{% raw %}
In your template include the ```{{> loginButtons}}``` partial to register/login. And you have ```{{#if currentUser}}``` available to do stuff for logged in users.
{% endraw %}
Again this is for rapid prototyping. You can also roll your own routes/templates/logic whatever for more sophistication. But MVP can be done fast.

Same with oauth: ```meteor add accounts-facebook``` lets you do a full fleged Facebook oauth. Woooot? :scream:

## Seo

```sh
meteor add spiderable
```

> Uses the AJAX Crawling specification published by Google to serve HTML to compatible spiders (Google, Bing, Yandex, and more).

Uses phantom.js to serve a „spiderable“ static version of your javascript application behind the ```?_escaped_fragment_=```


## Final words

I :green_heart: meteor.js for getting non funky stuff out of the way. You can build fast and modern stuff very efficient. And go to the more refined stuff in later iterations.
