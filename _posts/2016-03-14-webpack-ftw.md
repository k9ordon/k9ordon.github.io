---
title: Webpack FTW!!!!
updated: 2016-03-14 12:00
tweet: 709360990924701696
---

This post covers the code examples from my talk „[Webpack FTW- shipping a frontend](https://speakerdeck.com/k9ordon/webpack-ftw)“. It should help you understand what webpack is capable of.

Currently, we use **Grunt.js** for all the build steps at a mid to large size project. Module dependencies are written in an amd header and a handcrafted concat array is used for bundling our front-end-code into logic chunks. As the project is getting bigger and more developers joining the codebase this is getting very tricky to maintain.

First I evaluated **browserify**. It does exactly what I was searching for: Bundle up all dependencies. But as our web application has a very high-performance requirement, we need to split our application in multiple small bundles. This leads to shared common code. I did some sandboxed examples with „factor-bundle“, but it just feels not right and broke in some of our tests.

Next up was webpack. It instantly got me with its [start page](https://webpack.github.io/):

![webpack start page: what is webpack?](https://raw.githubusercontent.com/webpack/webpack.github.com/54e36e6fd7934b3bf91eb6d1ef5be09f1d8631b4/assets/what-is-webpack.png)

> „Every static asset should be able to be a module“ :ok_hand:

Instead of just bundling up just your javascript it bundles everything. Perfect. Code Splitting built in. Chunks are loaded on demand. Amazing. ES6 Module. Consistent source maps through all steps. Yadda yadda yadda everything. Lets get to code:

## Setup
:guardsman: Cpt. obviously: you need [node.js](http://lmgtfy.com/?q=install+node.js).

Install webpack global. If you want some dev tools magic install webpack-dev-server.

```sh
npm install webpack -g
npm install webpack-dev-server -g
```

## A simple bundle

As this was a talk with fancy slides here are some in-ur-face-images to visualize what's happening:

![](/assets/webpack-ftw/1.png)

First we just do a simple webpack bundle with some dependencies. Check out the [example code](https://github.com/k9ordon/webpack-ftw/tree/master/1-bundle).
Then we run webpack for bundling all out requirements from entry.js to bundle.js.

```sh
webpack entry.js bundle.js
```

This almost the same what the browserify cli does.


## The CSS thing

![](/assets/webpack-ftw/2.png)

Next we add CSS the build. We need a loader to process the CSS.

```sh
npm i CSS-loader style-loader -D
```

Now we can simply include a CSS file to the module ```require('style!css!./entry.css')``` and its added to the dependency tree as well. This cryptic „style!CSS!“ brainfuck defines the appropriate loader. This can be handled via a webpack config - see next step.

Look at dat [Example Code](https://github.com/k9ordon/webpack-ftw/tree/master/2-cssthing).

In this example, CSS is shipped with the bundled js files. Its also possible to ship „real“ CSS files. This is covered in step  4.

## Loaders & Config

![](/assets/webpack-ftw/3.png)

Loaders are some kind of pre-processing. There is a [huge list of loaders](http://webpack.github.io/docs/list-of-loaders.html) available. In this example, we preprocess es6 with babel. So let's install the babel-loader and babel.

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

Entry and Output property are same as the cli option. Additionally, we add a ```loaders``` array. This contains all „special behaving“ requirements. The ```test``` property tells webpack what loader is applied to the matching files. Now you just have to ```require('./entry.css')``` and it automatically loads through the CSS loader.

Looki looks [Example Code](https://github.com/k9ordon/webpack-ftw/tree/master/3-loaders) and run this config:

```sh
webpack --config webpack.config.js
```

## Code Splitting

![](/assets/webpack-ftw/4.png)

In this part webpack will split our code into 2 entry chunks and share code as commons.js.     [Example Code](https://github.com/k9ordon/webpack-ftw/tree/master/4-codesplitting)

Furthermore, we will extract „real“ CSS files. Extracting text needs the extract-text-webpack-plugin so here we go:

```sh
npm install extract-text-webpack-plugin -D
```

Our new ```webpack.config.js```:

```js
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // multiple named entries
    entry: {
        bundle1: "./entry1.js",
        bundle2: "./entry2.js"
    },
…
    plugins: [
        // extract css to css files
    new ExtractTextPlugin("[name].css"),
        // extract common code to commons.js
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js")
    ]
}
```

More about dynamic loading of chunks, synchronously requires and other stuff at [webpack documentation](https://webpack.github.io/docs/code-splitting.html).

## Dev Server & Hot Module Replacement

Webpack-dev-server is a node.js Express server, which uses the webpack-dev-middleware and Socket.IO to serve the webpack bundle. Hot Module Replacement (```—hot``` flag) only replaces a changed module instead of a full page reload. The dev server comes as an independent package and must be installed separately with ```npm install webpack-dev-server -g```. There are [2 ways](https://webpack.github.io/docs/webpack-dev-server.html#automatic-refresh) to run the server: Iframe mode and Inline mode. In this example we use inline (```—inline```).  

Start a development server with hot module reload at [localhost:8080](http://localhost:8080/webpack-dev-server/)

```sh
webpack-dev-server --config webpack.config.js --hot --inline -d
```

Learn [more about webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html).

## Production Build

For production, there are usually some optimizations to make sure stuff is efficient. Webpack comes with a bunch of optimizations as you can read in their [https://webpack.github.io/docs/optimization.html](documentation). To simplify the process we use the production shortcut (```-p```-Flag). This will minimize     respectively uglify command for all your CSS and js. To get our node.js dependency to production we set the node env variable.

```sh
NODE_ENV=production webpack --config webpack.config.js -p
```

**Webpack adds 243B for runtime plus 20B per module or 4B per dependency.** :flushed: Amazingly small. Here is a [comparison](https://webpack.github.io/docs/comparison.html) of other bundlers.

## Slides

<script async class="speakerdeck-embed" data-id="0068e8a9c2a6461f81bdb835fb0ee40a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>
