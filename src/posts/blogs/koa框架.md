---
title: 'koa框架'
date: 2021-11-29 11:00:00
permalink: '/posts/blogs/koa框架'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - node.js
 - koa
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

## koa

* koa是express同一个团队开发的一个新的**Web框架**
* Koa旨在为Web应用程序和**API提供更小**、**更丰富和更强大的能力**
* 相对于express具有**更强的异步处理能力**
* Koa的核心代码只有1600+行，是一个更加轻量级的框架，我们可以根据**需要安装和使用中间件**

```bash
npm init
npm install koa
```

```js
// 简单用法
const Koa = require('koa'); // 导出了一个类

const app = new Koa();
// Koa并没有提供methods的方式来注册中间件
app.use((ctx, next) => { //context:上下文(包括了req,res) next: 
  console.log('中间件被执行');
  ctx.response.body = "hello world";
})

app.listen(8000, () => {
  console.log('koa初体验服务器启动成功');
})
```

### koa洋葱模型

* 理解：以**next()**为分界的模型，**next()**逐层深入，再依次逐层返回next()之后的代码或操作

### koa注册中间件的方式


```js
// 方式一：根据request自己来判断
const Koa = require('koa');

const app = new Koa();

// koa没有提供路径注册、methods注册、连续注册中间件的方式
app.use((ctx, next) => { // 方式一：根据request自己来判断；
  if(ctx.request.url === '/login') {
    if(ctx.request.method === 'GET') {
      ctx.response.body = "Login Success~";
    }
  } else {
    ctx.response.body = "other request~";
  }
})

app.listen(8000, () => {
  console.log('中间件服务器已启动');
})

// 方式二：使用第三方路由中间件
// ./router/user.js //npm install koa-router
const Router = require('koa-router');

const router = new Router({prefix: "/users"});

router.get('/', (ctx, next) => {
  ctx.response.body = "User Lists~";
})

router.put('/', (ctx, next) => {
  ctx.response.body = "put Lists~";
})

module.exports = router;
// koa-router.js
const Koa = require('koa');
const userRouter = require('./router/user');

const app = new Koa();

// koa没有提供路径注册、methods注册、连续注册中间件的方式
app.use(userRouter.routes()); // 方式二: 使用第三方koa-router
app.use(userRouter.allowedMethods()); // 除定义过的方法外，返回不支持的提示

app.listen(8000, () => {
  console.log('koa路由中间件服务器已启动');
})
```

### koa参数解析服务器(params与query参数)

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const userRouter = new Router({prefix: '/users'});

userRouter.get('/:id', (ctx, next) => {
  console.log(ctx.request.params); // 参数解析
  console.log(ctx.request.query); // query参数解析
  ctx.response.body = "id is "
})

app.use(userRouter.routes());

app.listen(8000, () => {
  console.log('参数处理服务器已启动');
})
```

### koa服务器解析json和urlencoded数据

```js
// 第三方库(koa-bodyparser) npm install koa-bodyparser
const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 引入

const app = new Koa();

app.use(bodyParser()); // 使用

app.use((ctx, next) => {
  console.log(ctx.request.body);
  ctx.response.body = 'hello world json';
})

app.listen(8000, () => {
  console.log('json解析服务器已启动');
})

```

### koa服务器解析form-data数据

```js

// 第三方库(koa-multer) npm install koa-multer
const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 先解析body
const multer = require('koa-multer'); // 再multer解析form-data
const Router = require('koa-router'); // 用于指定路径

const app = new Koa();
const loginRouter = new Router({prefix: '/products'});

const upload = multer();

app.use(bodyParser());

...
const Multer = require('koa-multer');

const avatarUpload = Multer({
  dest: './uploads/avatar' // AVATAR_PATH
});

const avatarHandler = avatarUpload.single('avatar');
# 展示图像
ctx.response.set('content-type', avatarInfo.mimetype); // 文件类型
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`); // 文件名
...


loginRouter.post('/', upload.any(), (ctx, next) => {
  console.log(ctx.request.body); // koa所解析出来的body放置位置 区别!!!
  console.log(ctx.req.body); // koa-multer解析出来的form-data放置位置
  ctx.response.body = '1234';
})

app.use(loginRouter.routes());

app.listen(8000, () => {
  console.log('json解析服务器已启动');
})

```

### koa服务器form-data文件上传

```js

const Koa = require('koa');
const Router = require('koa-router');
const multer = require('koa-multer');
const path = require('path'); //引入path模块解析出文件的后缀名

const app = new Koa();
const uploadRouter = new Router({prefix: '/upload'});

const storage = multer.diskStorage({
  destination: (req, file, cb) => { //指定存放路径
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => { // 存放名
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
})

const upload = multer({
  storage
});

uploadRouter.post('/avatar', upload.single('avatar'), (ctx, next) => {
  console.log(ctx.req.file);
  ctx.response.body = '头像上传成功';
})

app.use(uploadRouter.routes());

app.listen(8000, () => {
  console.log('文件上传服务器已启动');
})
```

### koa数据响应

* **ctx.response.body**将返回的数据类型：string|Buffer|Stream|Object|Array|null
* 如果**ctx.response.status**尚未设置，koa会自动将状态设置为200或204

```js
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  // ctx.response.body = "12345";
  // ctx.response.body = {
  //   name: "zhujinfa",
  //   age: "21"
  // };
  // ctx.response.body = [1, 2, 3, 4, 5];
  // 设置状态码
  ctx.status = 200;
  ctx.body = [1, 2, 3, 4, 5]; //简写 :ctx.request和ctx.response都可简写成ctx.源码中进行了一层代理
})

app.listen(8000, () => {
  console.log('响应内容服务器已启动');
})
```

### 静态服务器

* 使用第三方库koa-static：npm install koa-static

```js
const Koa = require('koa');
const staticAssets = require('koa-static');

const app = new Koa();

app.use(staticAssets('./build'));

app.listen(8000, () => {
  console.log('静态资源服务器已开启');
})
```

### 错误处理

```js
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  const isLogin = false;
  if (!isLogin) {
    ctx.app.emit('error', new Error('您还没有登录'), ctx); // 发出错误
  }
})

app.on('error', (err, ctx) => { // 接收并触发
  ctx.status = 401;
  ctx.body = err.message;
})

app.listen(8000, () => {
  console.log('错误处理服务器启动');
})
```

### 与express对比

* express是完整和强大的，其中帮助我们内置了非常多好用的功能
* koa是简洁和自由的，它只包含最核心的功能，并不会对我们使用其他中间件进行任何的限制
  * 在app中连最基本的get、post都没有提供
  * 需要通过自己或者路由来判断请求方式或者其他功能

* express的中间件回调中不包含promise处理异步数据，koa中的中间件回调包含了一个Promise，可对一部数据进行处理

### express与koa同步异步处理对比

```js
// express处理同步数据
const express = require('express');

const app = express();

const middleWare1 = (req, res, next) => {
  req.message = 'aaa';
  // res.end(req.message); // 返回aaa
  next(); // 执行完所有next后再执行后面的代码
  res.end(req.message); // 返回aaabbbccc
}
const middleWare2 = (req, res, next) => {
  req.message += 'bbb';
  next();
}
const middleWare3 = (req, res, next) => {
  req.message += 'ccc';
  console.log(req.message);
}

app.use(middleWare1, middleWare2, middleWare3);

app.listen(8000, () => {
  console.log('express异步数据实现');
})

```

```js
// koa处理同步数据
const Koa = require('koa');

const app = new Koa();

const middleWare1 = (ctx, next) => {
  ctx.message = 'aaa';
  next();
  ctx.body = ctx.message;
}
const middleWare2 = (ctx, next) => {
  ctx.message += 'bbb';
  next();
}
const middleWare3 = (ctx, next) => {
  ctx.message += 'ccc';
}

app.use(middleWare1); // koa不能连续注册中间件
app.use(middleWare2);
app.use(middleWare3);

app.listen(8000, () => {
  console.log('koa同步数据服务器启动');
})
```

```js
// express处理异步数据
const { default: axios } = require('axios');
const express = require('express');

const app = express();

const middleWare1 = (req, res, next) => {
  req.message = 'aaa';
  // res.end(req.message); // 返回aaa
  next(); // 执行完所有next后的同步代码再执行后面的代码
  res.end(req.message); // 返回aaabbbccc
}
const middleWare2 = (req, res, next) => {
  req.message += 'bbb';
  next();
}
const middleWare3 = (req, res, next) => { // 异步操作，无法实现
  axios.get('http://123.207.32.32:9001/lyric?id=167876').then(result => {
    res.message += result.data.lrc.lyric;
  })
}

app.use(middleWare1, middleWare2, middleWare3);

app.listen(8000, () => {
  console.log('express同步数据实现');
})
```

```js
// koa处理异步数据
const Koa = require('koa');
const axios = require('axios');

const app = new Koa();

const middleWare1 = async (ctx, next) => { // (ctx, next) => {}中next函数包含了一个Promise,可采用async await控制
  ctx.message = 'aaa';
  await next();
  ctx.body = ctx.message;
}
const middleWare2 = async (ctx, next) => { // 
  ctx.message += 'bbb';
  await next();
}
const middleWare3 = async (ctx, next) => { // 异步操作
  const result = await axios.get('http://123.207.32.32:9001/lyric?id=167876');
  ctx.message += result.data.lrc.lyric;
}

app.use(middleWare1);
app.use(middleWare2);
app.use(middleWare3);

app.listen(8000, () => {
  console.log('koa异步数据服务器启动');
})
```


/* 

* 该博客由本人归纳自coderwhy--Node.js PPT(.pdf)，coderwhy yyds!!!

*/