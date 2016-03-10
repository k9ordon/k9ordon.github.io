---
title: Webpack FTW!!!!
updated: 2016-03-07 23:00
---

[![shipping a frontend](/assets/webpack-ftw/cover.png)](https://speakerdeck.com/k9ordon/webpack-ftw)

simple steps for shipping a frontend with webpack - [yadda, yadda ... take me to the slides](https://speakerdeck.com/k9ordon/webpack-ftw)

## setup

```sh
npm install webpack -g

npm install webpack-dev-server -g
```

## 1. bundle

simple webpack bundle example with dependencies

```sh
webpack entry.js bundle.js
```

![](/assets/webpack-ftw/1.png)



## 2. the css thing
adding css to modules via .js  ```require('style!css!./entry.css')```


```sh
npm i css-loader style-loader -D
```

![](/assets/webpack-ftw/2.png)

## 3. loaders

[preprocess es6 with loaders](https://webpack.github.io/docs/loaders.html). config moved to ```webpack.config.js```

```sh
npm i babel-loader babel-core babel-preset-es2015 -D

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

start a development server with [hot module replacement](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html) at [localhost:8080](http://localhost:8080/webpack-dev-server/)

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
