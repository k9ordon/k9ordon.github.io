---
title: Webpack FTW!!!!
updated: 2016-03-07 23:00
---

This post covers the code examples from my talk „[Webpack FTW- shipping a frontend](https://speakerdeck.com/k9ordon/webpack-ftw)“. It should help you understand what webpack is capable of.

Currently we use **Grunt.js** for all the build steps. Module dependencies are written in an amd header and a handcrafted concate array is used for bundling into logic chunks. As the project is getting bigger and more developers joining the codebase this is getting very tricky to maintain.

First I evaluated **browserify**. It does exactly what I was searching for: Bundle up all dependencies. But as our web application has a very high performance requirement, we need to split out application in multiple small bundles. This leads to shared common code. I did some sandboxed examples with „factor-bundle“, but it just feels not right and broke in some of our tests.

Next up was webpack. It instantly got me with its [start page](https://webpack.github.io/):

![webpack start page: what is webpack?](https://raw.githubusercontent.com/webpack/webpack.github.com/54e36e6fd7934b3bf91eb6d1ef5be09f1d8631b4/assets/what-is-webpack.png)

> „Every static asset should be able to be a module“ :ok_hand:

Instead of just bundling up just your javascript it bundles everything. Perfect. Code Splitting built in. Chunks are loaded on demand. Amazing. ES6 Module. Yadda yadda yadda everything. Lets get to code:

## 0. Setup
Cpt. obviously: you need [node.js](http://lmgtfy.com/?q=install+node.js).

Install webpack global. If you want some dev tools magic install webpack-dev-server.

```sh
npm install webpack -g
npm install webpack-dev-server -g
```

## 1. A simple bundle

First we just do a simple webpack bundle with some dependencies. Check out the [example code](https://github.com/k9ordon/webpack-ftw/tree/master/1-bundle).
Then we run webpack for bundling all out requirements from entry.js to bundle.js.

```sh
webpack entry.js bundle.js
```

This almost the same what the browserify cli does.

As this was I talk here are some fancy images to visualize whats happening:

![](/assets/webpack-ftw/1.png)



## 2. The css thing

Next we add css the the build. We need a loader to process the css.

```sh
npm i css-loader style-loader -D
```

Now we can simply include a css file to the module ```require('style!css!./entry.css')``` and its added to the dependency tree as well. This cryptic „style!css!“ brainfuck defines the appropriate loader. This can be handled via a webpack config - see next step.

Look at dat [Example Code](https://github.com/k9ordon/webpack-ftw/tree/master/2-cssthing).

![](/assets/webpack-ftw/2.png)

In this example css is shipped with the bundled js files. Its also possible to ship „real“ css files. This is covered in step  4.

## 3. Loaders & config

Loaders are some kind of pre-processing. There is a [huge list of loaders](http://webpack.github.io/docs/list-of-loaders.html) available. In this example we preprocess es6 with babel. So lets install the babel-loader and babel.

```sh
npm i babel-loader babel-core babel-preset-es2015 -D
```

To make config more readable we create a ```webpack.config.js``` file.

```js
var webpack = require("webpack");

module.exports = {
    entry: ["./entry.es6.js"],
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.es6\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            loader: "style!css?sourceMap"
        }]
    }
}
```

Entry and Output property are same as the cli option. Additionally we add a ```loaders``` array. This contains all „special behaving“ requirements. The ```test``` property tells webpack what loader is applied to the matching files. Now you just have to ```require('./entry.css')``` and it automatically loads through the css loader.

Looki looks [Example Code](https://github.com/k9ordon/webpack-ftw/tree/master/3-loaders) and run this config:

```sh
webpack --config webpack.config.js
```

![](/assets/webpack-ftw/3.png)


## 4. code splitting

extract css files && commons code
```sh
npm install extract-text-webpack-plugin -D
```

![](/assets/webpack-ftw/4.png)

## 5. dev server & hmr

start a development server with hot module reload at [localhost:8080](http://localhost:8080/webpack-dev-server/)

```sh
webpack-dev-server --config webpack.config.js --hot --inline -d
```

## 6. production build

build uglified for production

```sh
NODE_ENV=production webpack --config webpack.config.js -p
```

## Slides

<script async class="speakerdeck-embed" data-id="0068e8a9c2a6461f81bdb835fb0ee40a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>
