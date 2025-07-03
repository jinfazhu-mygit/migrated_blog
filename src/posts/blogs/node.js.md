---
title: 'node.js'
date: 2021-6-6 23:20:00
permalink: '/posts/blogs/node.js'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - node.js
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

## Node.js

### 编写基本的HTTP服务器

1. 下载node至电脑
2. 创建app.js

```js
const http = require('http'); //引入模块

const hostname = '127.0.0.1'; //HTTP服务器监听地址
const port = 3000;  //HTTP服务器监听端口

const server = http.createServer((req, res) => { //创建服务器，回调
  res.statusCode = 200;  //HTTP相应状态码
  res.setHeader('Content-Type', 'text/plain'); //设置相应内容的格式
  res.end("Hello World\n"); //输入内容，结束响应
})

server.listen(port, hostname, () => { //运行服务器，添加监听
  console.log(`Server running at http://${hostname}:${port}`);
})
```

2. 终端运行app.js : node app.js,  即可访问

### modul和exports

1. 每个js文件就是一个模块，每个模块有独立的作用域
2. module是一个对象，代表了当前模块，module.exports是对外的接口。加载模块实际上是读取该模块的module.exports属性。
3. module.exports和exports是恒等的，在实际开发中，建议通过exports.XXX的形式导出变量、函数、类。**但修改exports的指向会导致模块不能正常导出**

```js
//example.js
exports.sum = function(a, b) {
  return a + b;
}
exports = 'Hello World';  //这里导致了sum函数无法导出
```

### require

1. require读取并执行一个JS模块，返回该模块的exports对象。如果模块未找到，则会抛出错误。

```js
//example.js
exports.sum=function(a,b){
  return a+b;
}
//index.js
const math=require('./example');

console.log(math.sum(2,2));  //不同模块方法的调用
//终端运行index.js
node index.js
```

### node.js的异步编程风格(三种方式)

1. #### 回调函数(将函数作为参数使用)

* node.js异步编程可通过回调函数实现，但不能说使用回调函数就异步了(如下)

```js
function test(callback){ //不包含异步的回调
  callback(1);  //对回调函数的操作
}
test(function(data){ //传入回调函数
  console.log(data);
})
```

* 使用示例

```js
func(param..., callback(Error, data)); //param为调用API的参数，如读取文件时传递文件的文件路径，支持多个参数；
//node.js中回调函数的第一个参数永远是Error对象，之后才是调用成功的结果，如果没有出错，第一个参数为null;
例如，读取桌面的data.txt文件
const fs = require('fs'); //fs是node.js核心模块

fs.readFile('~/Desktop/data.txt', function (err, data) {
  if (err) {
    console.log('读取出错', err);
    return;
  }
  console.log(data);
})
```

2. #### Promise

* 使用回调函数当有多个异步操作时，代码可能会出现多层嵌套的情况

* Promise构造函数接收一个执行函数，该函数接收**resolve**和**reject**两个回调函数，当函数执行成功时需调用resolve,执行失败调用reject。

* Promise的原型上提供了两个常用方法，**then**和**catch**,分别用于**执行成功**时和**执行失败**时回调

* ##### 基本使用

```js
const fs = require('fs');
function readFileAsync(path) {
  return Promise(function (resolve, reject) {  //Promise模块引入，resolve,reject回调函数接收
    fs.readFile(path, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    })
  })
}

readFileAsync('~/Deaktop/data.txt')
  .then(function (data) {  //回调resolve函数，处理数据
    console.log(data);
  })
  .catch(function (err) {  //回调reject函数，处理数据
    console.log(err);
  })
```

* ##### 链式使用

```js
const fs = require('fs');
function readFileAsync(path) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {   //异步的操作
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err);
          return
        }
        resolve(data);
      });
    }, 1000);
  });
}

readFileAsync('./data.txt')
  .then((data) => {
    console.log('文件data.txt读取成功' + data);
    return readFileAsync('./data2.txt'); //在then回调中又**链入**了一个Promise
  }).then((data2) => {
    console.log('文件data2.txt2读取成功' + data2); //再次接收
  })
  .catch((err) => {
    console.log('文件读取失败', err); //接收错误
  })
```

3. #### async/await

* async/await关键字是ES2017中新添加的关键字，本质上是Promise的语法糖，使得能够像同步代码一样编写异步代码。
* 示例：

```js
const fs = require('fs');
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      })
    }, 1000);
  })
}
async function readFile() { //async
  try {
    const data = await readFileAsync('./data.txt'); //异步获取数据 await
    const data2 = await readFileAsync('./data2.txt'); //异步获取数据 await
    console.log('文件读取成功' + data);
    console.log('文件读取成功' + data2);
  }
  catch (e) {
    console.log('文件读取失败' + e)
  }
}
readFile();
```

* async只能放在函数声明之前，支持普通函数，箭头函数和类函数。被修饰的函数不管返回什么值都会**返回一个Promise.**

```js
//普通函数
async function doSomething(a,b){
  return a+b;
}
//箭头函数
const doSomething = async (a,b)=>{
  return a+b;
}
//类函数
class Demo{
  async test(a, b){
    return a + b;
  }
}

const data = doSomething(1, 2);  //[object Promise]
doSomething(1, 2).then(function(result) {
  console.log(result); //3
})
```

* await只能在被async修饰的函数内部调用，await可放在任何返回Promise的函数前，Promise执行成功情况下，await语句将返回Promise的成功值；Promise执行错误情况下，await将抛出错误，使用try/catch捕获即可。
* 示例(包装XMLHttpRequest)

```js
function ajaxGet(url, timeout) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); //开启连接
    xhr.timeout = timeout;  //限定超时时间

    xhr.onload = function () {  //获取数据
      resolve(xhr.responseText);
    };
    xhr.onerror = function (e) { //获取异常
      reject(new Error('请求失败'));
    };
    xhr.ontimeout - function () { //超时报错
      reject(new Error('请求超时'));
    };
    xhr.send(null); //发出请求
  });
}
async function getData() {
  try {
    const data = await ajaxGet('xx://a.json', 1000);//接收数据
    console.log(data);
  }
  catch (e) {
    console.error(e);
  }
}
getData();
```





### 
