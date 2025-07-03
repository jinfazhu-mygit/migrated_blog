---
title: 'cookie-session和token应用'
date: 2021-12-06 23:00:00
permalink: '/posts/blogs/cookie-session和token应用'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - cookie
 - session
 - token
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

## cookie

* 某些网站为了辨别用户身份而**存储 在用户本地终端（Client Side）上的数据**。
* Cookie总是保存在客户端中，按在客户端中的存储位置，Cookie可以分为**内存Cookie**和**硬盘Cookie**。
  * 内存Cookie由浏览器维护，保存在内存中，浏览器关闭时Cookie就会消失，其存在时间是短暂的；
  * 硬盘Cookie保存在硬盘中，有一个过期时间，用户手动清理或者过期时间到时，才会被清理；
* 如何**判断**一个cookie是内存cookie还是硬盘cookie
  * **没有设置过期时间**，**默认**情况下cookie是**内存cookie**，在关闭浏览器时会自动删除；
  * **有设置过期时间**，并且**过期时间不为0或者负数的cookie**，是**硬盘cookie**，需要手动或者到期时，才会删除；

* cookie的生命周期：
  * 默认情况下的cookie是内存cookie，也称之为会话cookie，也就是在浏览器关闭时会自动被删除；
  * 我们可以通过设置expires或者max-age来设置过期的时间；
    * expires：设置的是Date.toUTCString()，设置格式是;expires=date-in-GMTString-format；
    * max-age：设置过期的秒钟，;max-age=max-age-in-seconds (例如一年为60*60*24*365)；

* cookie的**作用域**：（允许cookie发送给哪些URL）

  * Domain：指定哪些主机可以接受cookie
    * 如果不指定，那么默认是 origin，不包括子域名。
    * 如果指定Domain，则包含子域名。例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如developer.mozilla.org）。

  * Path：指定主机下哪些路径可以接受cookie
    * 例如，设置 Path=/docs，则以下地址都会匹配：/docs, /docs/Web/, /docs/Web/HTTP

### 客户端设置cookie


```html
<body>
  <button id="add">添加会话cookie</button>

  <script>
    document.getElementById('add').onclick = function(){
      // document.cookie = 'name=zhujinfa;';
      document.cookie = 'name=zhu;max-age=20;'; // 20秒的硬盘cookie
    }
  </script>
</body>
```

### 服务器端设置cookie

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const testRouter = new Router();

testRouter.get('/set', (ctx, next) => {
  ctx.cookies.set("name", "zhujinfa", { // 设置
    maxAge: 20*1000; // 20秒的硬盘cookie
  })
  ctx.body = "cookie设置成功";
})

testRouter.get('/get', (ctx, next) => {
  const cookie = ctx.cookies.get("name"); // 获取
  ctx.body = `你的cookie是${cookie}`;
})

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log('服务开启在8080端口');
})
```

### 服务器端设置session(只能在服务器端设置)

```js
const Koa = require('koa');
const Router = require('koa-router');
const Session = require('koa-session');

const app = new Koa();

const testRouter = new Router();

// 创建session配置
const session = Session({
  key: 'sessionid', // 名字
  maxAge: 10 * 1000, // 过期时间
  signed: true  // 是否使用session加密签名
}, app);
app.keys = ["aaaa"]; // session加密签名加盐
app.use(session);

// 登录接口
testRouter.get('/setSession', (ctx, next) => {
  // 查数据库得到对应登录用户的id,name
  const id = 110;
  const name = "zhujinfa";

  ctx.session.user = {id, name}; // base64方式设置session

  ctx.body = "setSession success~";
})
// 其他接口(需要判断登录状态的)
testRouter.get('/getSession', (ctx, next) => {
  console.log(ctx.session.user);
  if(ctx.session.user){ // 获取成功
    ctx.body = "getSession success~";
  }else { // 获取失败
    ctx.body = "getSession failed~";
  }
})

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log('服务开启在8080端口');
})
```

**cookie和session的缺点**

* Cookie会被附加在每个HTTP请求中，所以无形中增加了流量（事实上某些请求是不需要的）；
* Cookie是明文传递的，所以存在安全性的问题；
* Cookie的大小限制是4KB，对于复杂的需求来说是不够的；
* 对于浏览器外的其他客户端（比如iOS、Android），**必须手动的设置cookie和session；**

* 对于**分布式系统**和**服务器集群**中**如何可以保证其他系统也可以正确的解析session**？

## token

* 在目前的前后端分离的开发过程中，使用token来进行身份验证的是最多的情况：
  * token可以翻译为令牌；
  * 在验证了用户账号和密码正确的情况，给用户颁发一个令牌；
  * 令牌作为后续用户访问一些接口或者资源的凭证；
  * 我们可以根据这个凭证来判断用户是否有权限来访问；

* 所以token的使用应该分成两个重要的步骤：
  * **生成token**：登录的时候，颁发token；
  * **验证token**：访问某些资源或者接口时，验证token；

### JWT实现token机制

* **JWT生成的Token由三部分组成**：

* header

  * alg：采用的加密算法，默认是 HMAC SHA256（HS256），采用同一个密钥进行 加密和解密；
  * typ：JWT，固定值，通常都写成JWT即可；
  * 会通过base64Url算法进行编码；

* payload

  * 携带的数据，比如我们可以将用户的id和name放到payload中；
  * 默认也会携带iat（issued at），令牌的签发时间；
  * 我们也可以设置过期时间：exp（expiration time）；
  * 会通过base64Url算法进行编码

* signature

  * 设置一个**secretKey(对称加密)**，通过将前两个的结果合并后进行HMACSHA256的算法；
  * **HMACSHA256(base64Url(header)+.+base64Url(payload), secretKey)**;

  * 但是如果secretKey暴露是一件非常危险的事情，因为之后就可以模拟颁发token， 也可以解密token；

* **token：header.payload.signature**

### 对称加密

```js
// jwt(jsonwebtoken)对称加密
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const app = new Koa();

const testRouter = new Router();

const SECRET_KEY = "abccba"; // 设置加密密钥

// 登录接口(生成token)
testRouter.post('/set', (ctx, next) => {
  const user = { id: 110, name: 'why' };
  const token = jwt.sign( user, SECRET_KEY, { // 根据用户信息、密钥、时间等数据生成token
    expiresIn: 10 // 过期时间10秒
  })

  ctx.body = token;
})

// 验证接口(验证token)
testRouter.post('/get', (ctx, next) => {
  console.log(ctx.headers.authorization); // 前端将token放入请求头传给后端验证
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify( token, SECRET_KEY ); // 通过密钥来验证
    ctx.body = result;
  } catch (error) {
    console.log(error.message);
    
  }
})

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log('服务开启在8080端口');
})
```

* HS256加密算法一旦**密钥暴露就是非常危险**的事情：
  * 比如在分布式系统中，每一个子系统都需要获取到密钥；
  * 那么拿到这个密钥后这个子系统既可以发布令牌，也可以验证令牌；
  * 但是对于一些资源服务器来说，它们只需要有验证令牌的能力就可以了；
* 这个时候我们可以使用**非对称加密**，RS256：
  * 私钥（private key）：用于发布令牌；
  * 公钥（public key）：用于验证令牌；
* 我们可以使用openssl来生成一对私钥和公钥：
  * Mac直接使用terminal终端即可；
  * Windows默认的cmd终端是不能直接使用的，建议直接使用**git bash**终端；

```js
openssl
> genrsa -out private.key 1024 // 在相应的文件夹下生成私钥
> rsa -in private.key -pubout -out public.key // 根据私钥生成对应的公钥
```

### 非对称加密

```js
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = new Koa();

const testRouter = new Router();

// 在项目中的任何一个地方的相对路径，都是相对于process.cwd(),项目启动时所在的绝对路径
// console.log(process.cwd());
const PRIVATE_KEY = fs.readFileSync('./keys/private.key');
const PUBLIC_KEY = fs.readFileSync('./keys/public.key');

// 登录接口(生成token)
testRouter.post('/set', (ctx, next) => {
  const user = { id: 110, name: 'why' };
  const token = jwt.sign( user, PRIVATE_KEY,  { // 根据用户信息、密钥、时间等数据生成token
    expiresIn: 10, // 过期时间10秒
    algorithm: "RS256" // 非对称
  })

  ctx.body = token;
})

// 验证接口(验证token)
testRouter.post('/get', (ctx, next) => {
  console.log(ctx.headers.authorization); // 前端将token放入请求头传给后端验证
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify( token, PUBLIC_KEY, {
      algorithm: ["RS256"] // 非对称可用多种解密方式，所以用数组表示
    }); // 通过密钥来验证
    ctx.body = result;
  } catch (error) {
    console.log(error.message);
  }
})

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log('服务开启在8080端口');
})
```

