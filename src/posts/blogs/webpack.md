---
title: 'webpack'
date: 2022-3-18 23:00:00
permalink: '/posts/blogs/webpack'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - webpack
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


## webpack
### 认识webpack
* 随着前端的快速发展，目前前端的开发已经变的越来越复杂了
  * 开发过程中我们需要通过**模块化的方式**来开发
  * 也会使用一些**高级的特性来加快我们的开发效率或者安全性**，比如通过**ES6+**、**TypeScript**开发脚本逻辑，
    通过**sass、less**等方式来编写css样式代码
  * 开发过程中，我们还希望**实时的监听文件的变化**来并且**反映到浏览器**上，提高开发的效率
  * 开发完成后我们还需要**将代码进行压缩**、**合并以及其他相关的优化**
* 但是对于很多的前端开发者来说，并不需要思考这些问题，日常的开发中根本就没有面临这些问题：
  * 这是因为目前前端开发我们通常都会直接使用三大框架来开发：**Vue**、**React**、**Angular**；
  * 但是事实上，这三大框架的创建过程我们都是借助于脚手架（CLI）的；
  * 事实上**Vue-CLI、create-react-app、Angular-CLI都是基于webpack**来帮助我们**支持模块化、less、
    TypeScript、打包优化**等的；

### webpack是什么

webpack is a **static module bundler** for **modern** JavaScript applications.

**webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序**

* 打包**bundler**：webpack可以将帮助我们进行打包，所以它是一个打包压缩工具
* 静态的**static**：这样表述的原因是我们最终可以将**代码打包(转换大部分浏览器适配的)成最终的静态资源**（部署到静态服务器）；
* 模块化**module**：webpack默认支持各种模块化开发，**ES Module、CommonJS、AMD**等；
* 现代的**modern**：我们前端说过，正是因为现代前端开发面临各种各样的问题，才催生了webpack的出现和发
  展；

### vue项目加载的文件有哪些呢
* JavaScript的打包：
  * 将ES6转换成ES5的语法；
  * TypeScript的处理，将其转换成JavaScript；
* Css的处理：
  * CSS文件模块的加载、提取；
  * Less、Sass等预处理器的处理；
* 资源文件img、font：
  * 图片img文件的加载；
  * 字体font文件的加载；
* HTML资源的处理：
  * 打包HTML资源文件；
* 处理vue项目的SFC文件.vue文件；

### webpack的默认打包
npm install webpack webpack-cli -g(全局安装)
npm install webpack webpack-cli -D(本地当前项目安装)

* 在目录下直接执行webpack命令
```
webpack  // 使用的是电脑上全局的webpack进行打包
```

*  生成一个dist文件夹，里面存放一个main.js的文件，就是我们打包之后的文件

*  我们发现是可以正常进行打包的，但是有一个问题，webpack是如何确定我们的**入口**的呢
  *  当我们运行webpack时，webpack会查找当前目录下的**src/index.js**作为入口
  *  如果当前项目中没有存在src/index.js文件，那么会报错
*  我们也可以通过配置来指定入口和出口
```
npx webpack --entry ./src/index.js --ouput-path ./dist/main.js(默认执行的路径,使用npx webpack，npx webpack使用的是当前项目下的node_modules的.bin目录下的webpack)
npx webpack --entry ./src/main.js --ouput-path ./dist/bundle.js
```
### 局部webpack的使用

* 在当前项目下的package.json中配置scripts属性

```json
{
  "scripts": {
    "build": "webpack --entry ./src/index.js --ouput-path ./dist/main.js" // 默认使用的是当前项目安装的webpack
  }
}
```

* 配置文件
  * webpack默认会在webpack.config.js文件中找相关的配置
  * 可在package.json中修改相应的配置文件名

```js
"scripts": {
    "build": "webpack --config wp.config.js"
 },
```

### webpack的依赖图(重要)

* **webpack在处理应用程序时，它会根据命令或者配置文件找到入口文件;**
* **从入口开始**，会**生成一个依赖关系图**，这个**依赖关系图会包含应用程序中所需的所有模块**(根据以来图**只对使用到的模块进行打包**)(比如**.js文件、css文件、图片、字**
  **体**等);
* 然后遍历图结构，打包一个个模块（**根据文件的不同使用不同的loader来解析**）；

### css-loader的使用

* loader 可以用于**对模块的源代码**进行转换
* 我们可以**将css文件也看成是一个模块**，我们是**通过import来加载这个模块**的
* 加载css文件来说，我们需要一个可以**读取css文件的loader**；
* 内联方式：在引入的样式前加上使用的loader,并使用!分割

```js
import 'css-loader!../css/index.css';
```

* webpack.config.js配置方式

```json
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'css-loader',  // 单个
        use: [ // 多个Loader配置
          // { loader: 'css-loader' },
          "style-loader",
          "css-loader"
        ]
      }
    ]
  }
}
```

### style-loader

* 经过上一步我们已经可以通过**css-loader来加载css文件**了
* 但是因为**css-loader只是负责将css文件进行解析**，并不会将解析后的css以`<style></style>`方式或`<link/>`方式插入到页面中
* 我们希望再完成**插入style的操作**，那么我们还需要另外一个loader，就是**style-loader**
* 安装好style-loader后，应注意使用方式，在**webpack.config.js**中**loader的加载顺序**是**从右到左(从下到上)**进行的，所以style-loader应该放在css-loader的前面

### less文件的处理

#### less工具处理

* 使用less工具可以将.less文件内容转换成.css文件内容进行使用(使用的是lessc)

```
npm install less -D
```

* 执行如下命令

```
npx lessc ./test.less demo.css
```

#### less-loader的使用

* 在项目中我们会编写大量的css，使用less-loader(自带less工具进行文件转换成.css)就能自动使用less工具自动将less转到css

```
npm install less-loader -D
```

### postcss

* postcss可用于**进行一些CSS的转换和适配**，比如自动**添加浏览器前缀**、**css样式的重置**；
* 使用postcss postcss-cli工具，postcss工具依赖于**autoprefixer**工具
* 项目中使用**postcss-loader+autoprefixer**可实现相同功能，使用如下配置

```json
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'css-loader',  // 单个
        use: [ // 多个Loader配置
          // { loader: 'css-loader' },
          "style-loader",
          "css-loader",
          "postcss-loader"  // 这种写法默认会在postcss.config.js找相应配置
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         require('autoprefixer')
          //       ]
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

### postcss-preset-env

* 我们可以使用另外一个插件：postcss-preset-env
* postcss-preset-env也是一个postcss的插件,比autoprefixer更强大一点，比如可以解析rgba: #45454580  解析透明度
* 也包括会自动帮助我们添加**autoprefixer**（所以相当于已经内置了autoprefixer）

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-preset-env')
  ]
}
```

### 图片加载方案

* 在项目中使用图片，比较常见的是两种方案：
  * background-image: url(“图片路径”);
  * img标签设置src

```css
  background-image: url("../image/nhlt.jpg");
```

```js
import zznh from '../image/zznh.png';

const img = document.createElement('img');
img.src = zznh;
```

### file-loader

* 要处理jpg、png、svg、gif等格式的图片，我们也需要有对应的**loader：file-loader**

#### 文件命名规则

* 为了希望我们处理后的文件名称按照一定的规则进行显示：比如保留原来的**文件名、扩展名**，同时为了防止重复，包含一个**哈希值**等
* 个时候我们可以使用**PlaceHolders**来完成，webpack给我们提供了大量的PlaceHolders来显示不同的内容：
  *  https://webpack.js.org/loaders/file-loader/#placeholders
* 介绍几个最常用的placeholder
  * [ext]： 处理文件的扩展名；
  * [name]：处理文件的名称；
  * [hash]：文件的内容，使用MD4的散列函数处理，生成的一个128位的hash值（32个十六进制）；
  * [contentHash]：在file-loader中和[hash]结果是一致的（在webpack的一些其他地方不一样，后面会讲到）；
  * [hash:]：截图hash的长度，默认32个字符太长了；
  * [path]：文件相对于webpack配置文件的路径；

```js
// 常用写法
{
  test: /\.(jpg|png|gif|svg)$/,
  loader: 'file-loader',
  options: {
    // outputPath: 'img', // 规范输出文件夹的两种写法
    name: "img/[name]_[hash:6].[ext]"
  },
  // 当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，
  // 你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，
  // 你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决
  type: 'javascript/auto'
}
```

### url-loader

* **url-loader和file-loader的工作方式是相似**的，但是可以将较小的文件，转成base64的URI(不规范大小将转换所有匹配的文件)。

```js
{
  test: /\.(jpe?g|png|gif|svg)$/i,
  loader: 'url-loader',
  options: {
    // outputPath: 'img',
    name: "img/[name]_[hash:6].[ext]",
    esModule: false, // 处理图片不显示 查看元素<img src="[object Module]"> 问题
    limit: 100 * 1024 // 100kb大小限制，小于该值的将保存在js文件中，大于该值的将按照路径配置存放
  },
  type: 'javascript/auto'
},
```

### asset module type

* 在**webpack5之前**，加载各种资源(jpg,jpeg,png,svg,gif)我们需要使用一些loader，比如raw-loader 、url-loader、file-loader；

* **在webpack5开始**，**我们可以直接使用资源模块类型（asset module type）**，来**替代**上面的这些**loader**；

* 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

  * **asset/resource** 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现；
  * **asset/inline** 导出一个资源的 data URI。之前通过使用 url-loader 实现；
  * **asset/source** 导出资源的源代码。之前通过使用 raw-loader 实现；
  * **asset** 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体

  积限制实现

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    // assetModuleFilename: "img/[name]_[hash:6][ext]" // 第二种写法
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      { // webpack5已经内置file-loader/url-loader
        test: /.(jpe?g|png|svg|gif)$/i,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      { // 字体文件加载相关 与<i></i>标签相关
        test: /\.(eot|ttf|woff2?)/,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:6][ext]"
        }
      }
    ]
  },
  performance: { // 文件大小限制提示关闭
    hints: false
  }
}
```

### plugin

* **Webpack的另一个核心是Plugin，官方有这样一段对Plugin的描述**：
  * While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables
* 上面表达的含义翻译过来就是：
  * Loader是用于特定的模块类型进行转换；
  * Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等；

#### CleanWebpackPlugin

* 前面我们演示的过程中，每次修改了一些配置，重新打包时，都需要**手动删除dist文件夹**：
  * 我们可以借助于一个插件来帮助我们完成，这个插件就是CleanWebpackPlugin

```bash
npm install clean-webpack-plugin -D
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

#### HtmlWebpackPlugin

* 在**进行项目部署**的时，必然也是需要**有对应的入口文件index.html**；
* 所以我们也需要**对index.html进行打包处理**；
* 对HTML进行打包处理我们可以使用另外一个插件：**HtmlWebpackPlugin**；

```bash
npm install html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```

* 在html-webpack-plugin的源码中，有一个**default_index.ejs模块**，上面的方式使用的就是html-webpack-plugin的默认模板；

#### 自定义html模板

* **如果我们想在自己的模块中加入一些比较特别的内容**：
  * 比如添加一个**noscript标签**，在用户的J**avaScript被关闭时，给予响应的提示**；
  * 比如在开发vue或者react项目时，我们需要一个**可以挂载后续组件的根标签** ；
* 可以将我们自定义好的.html文件放在public文件夹下

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

* 上面的代码中，会有一些类似这样的语法**<% 变量 %>**，这个是**EJS模块填充数据**的方式
* 上面的模板中使用了**BASE_URL**的常量，我们可以通过webpack自带的DefinePlugin来对其进行设置。
* <link rel="icon" href="<%= BASE_URL %>favicon.ico">

```js
// webpack.config.js
const { DefinePlugin } = require('webpack');

module.exports = {
  plugins: [
    new CleanWebpackPlugin();
    new HtmlWebpackPlugin({
      title: 'html模板标题设置',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    })
  ]
}
```

#### CopyWebpackPlugin

* 在vue的打包过程中，如果我们将一些文件放到**public的目录**下，那么这个目录**会被复制到dist文件夹**中
  * 这个复制的功能，我们可以使用**CopyWebpackPlugin**来完成
  * npm install copy-webpack-plugin -D
* 接下来配置CopyWebpackPlugin即可

```js
// webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      pattern: [
        {
          from: 'public',
          to: './',
          globOptions: {
            ignore: [ '**/index.html' ]
          }
        }
      ]
    })
  ]
}
```

#### Mode配置

* Mode配置选项，可以告知webpack使用响应模式的内置优化：
  * 默认值是production(什么都不设置的情况下)；
  * 可选值有：'none'|'development'|'production'
* 以下贴一项较为完善的webpack.config.js代码

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // 设置模式
  // development 开发阶段，会设置development,不丑化代码
  // production 准备打包上线的时候，设置production
  mode: 'development',
  // 设置source-map，建立js映射文件，方便调试代码和错误
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/bundle.js',
    // assetModuleFilename: "img/[name]_[hash:6][ext]"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.(jpg|png|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     // outputPath: 'img',
      //     name: "img/[name]_[hash:6].[ext]"
      //   },
      //   // 当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，
      //   // 你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，
      //   // 你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决
      //   type: 'javascript/auto'
      // },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loader: 'url-loader',
      //   options: {
      //     // outputPath: 'img',
      //     name: "img/[name]_[hash:6].[ext]",
      //     esModule: false, // 处理图片不显示 查看元素<img src="[object Module]"> 问题
      //     limit: 100 * 1024
      //   },
      //   type: 'javascript/auto'
      // },
      { // webpack5已经内置file-loader/url-loader
        test: /.(jpe?g|png|svg|gif)$/i,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      {
        test: /\.(eot|ttf|woff2?)/,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:6][ext]"
        }
      }
    ]
  },
  // performance: {
  //   hints: false
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '11123345',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: './',
          globOptions: {
            ignore: [ '**/index.html' ]
          }
        }
      ]
    })
  ] 
}
```






/* 

* 该博客由本人摘录自coderwhy Vue3 + TS课程ppt，coderwhy yyds!!!

*/