---
title: 'Node.js'
date: 2021-8-17 8:40:00
permalink: '/posts/blogs/Node.js复学'
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


### node.js回调函数

1. 由于Js的单线程运行方式，对于异步来说，依托回调来实现是一种很好的方式，**回调函数是处理异步的一种方式**，但不是有回调函数就有异步。

2. 回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

### [Node.js 工具模块](https://www.runoob.com/nodejs/nodejs-utitlity-module.html)

1. **[OS模块](https://www.runoob.com/nodejs/nodejs-os-module.html)**：提供基本的系统操作函数。
2. **[Path模块](https://www.runoob.com/nodejs/nodejs-path-module.html)**：提供了处理和转换文件路径的工具。

```js
const path=require('path')

const basePath='/user/zjf'
const filename='111.txt'

//jion不管路径是啥都拼一起，./不拼
const filepath1=path.join(basePath,filename) // \user\zjf\111.txt  路径拼接  
//resolve会判断拼接的路径字符串中是否有/、./、../开头的路径，若没有则自动拼接上当前文件所在路径；../则会以当前文件的上一级进行拼接
//如果被拼接文件的路径有/，则打印/__.__
const filepath2=path.resolve(basePath,filename) // E:\user\zjf\111.txt  路径拼接  

console.log(filepath1);
console.log(filepath2);
```

```js
const path=require('path')

var file='/user/zjf/111.txt'

console.log(path.dirname(file)); // /user/zjf
console.log(path.basename(file)); // 111.txt
console.log(path.extname(file)); // .txt
```



1. **[Net模块](https://www.runoob.com/nodejs/nodejs-net-module.html)**：用于底层的网络通信。提供了服务端和客户端的的操作。
2. **[DNS模块](https://www.runoob.com/nodejs/nodejs-dns-module.html)**：用于解析域名
3. **[Domain模块](https://www.runoob.com/nodejs/nodejs-domain-module.html)**：简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的。

### Node.js文件系统(fs模块)

1. Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有**异步的** **fs.readFile()** 和**同步的 fs.readFileSync()**。

   异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。

   建议大家使用**异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞**。

```js
const fs=require('fs')
//异步读取 推荐
fs.readFile('input.txt',function(err,data){
  if(err){
    return console.error(err)
  }
  console.log("异步读取的数据"+data.toString())
})
//encoding的设置
fs.readFile('./abc.txt',{encoding:'utf-8'},(err,data)=>{
  if(err){
    return err
  }
  console.log(data); //正常打印
})
//同步读取
var data=fs.readFileSync('input.txt')
console.log("同步读取的数据"+data.toString())

console.log("程序执行完毕")
```

2.**打开文件**：**fs.open ** 语法格式：fs.open(path,  flags[,  mode],  callback)

![fwcJwF.png](https://z3.ax1x.com/2021/08/12/fwcJwF.png)

```js
var fs = require("fs");

// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});
//文件描述符获取
const fs=require('fs')

fs.open('./abc.txt',(err,info)=>{
  if(err){
    console.log(err);
    return
  }
  console.log(info); //fs.open获取了一个数字,这个数字对应了abc.txt这个文件
  //可通过文件描述符获取文件信息
  fs.fstat(info,(err,data)=>{
    if(err){
      console.log(data);
      return
    }
    console.log(data);//打印这个数字info对应文件文件信息
  })
})
```

1. **获取文件信息**   格式：**fs.stat(path, callback)**  fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。

![fwRAL6.png](https://z3.ax1x.com/2021/08/12/fwRAL6.png)

```js
//stat回调异步执行
var fs = require('fs');

fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
    if(err){
        return console.error(err);
    }
    console.log(stats.isFile());         //true
})
//fs.statSync同步读取文件信息
const fs=require('fs')

const pathname='./111.txt'

const stat=fs.statSync(pathname)
console.log(stat);
console.log('同步执行');
//promise的方法实现回调(node中许多方法都有回调，应该都可以用pormise来处理，解决回调地狱)
const fs=require('fs')

const filepath='./111.txt'

fs.promises.stat(filepath).then(info=>{
  console.log(info);
}).catch(err=>{
  console.log(err);
})
```

4.**写入文件**  格式：fs.writeFile(file, data[, options], flags[,  mode], callback)  **writeFile 直接打开文件默认是 w模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。**

![fwcJwF.png](https://z3.ax1x.com/2021/08/12/fwcJwF.png)


```js
var fs = require("fs");

console.log("准备写入文件");
fs.writeFile('input.txt', '我是通 过fs.writeFile 追加入文件的内容', {flag:"a"},  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});
```

1. **读取文件** 格式：**fs.read**(fd, buffer, offset, length, position, callback)  先fs.open打开文件，再fs.read读取

[![fwhUYD.png](https://z3.ax1x.com/2021/08/12/fwhUYD.png)

1. **关闭文件** 格式：fs.close(fd, callback)
2. **截取文件** 格式：fs.ftruncate(fd, len,callback)

![fw57JU.png](https://z3.ax1x.com/2021/08/12/fw57JU.png)


1. **删除文件** 格式：**fs.unlink(path, callback)**

```js
var fs = require("fs");
var buf = new Buffer.alloc(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) { //先打开文件
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("截取10字节内的文件内容，超出部分将被去除。");
   
   // 截取文件
   fs.ftruncate(fd, 10, function(err){  //截取文件
      if (err){
         console.log(err);
      } 
      console.log("文件截取成功。");
      console.log("读取相同的文件"); 
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){ //读取文件
         if (err){
            console.log(err);
         }

         // 仅输出读取的字节
         if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }

         // 关闭文件
         fs.close(fd, function(err){  //关闭文件
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功！");
         });
         fs.unlink('input.txt', function(err) { //删除文件
   			if (err) {
       			return console.error(err);
   			}
   			console.log("文件删除成功！");
		 });
      });
   });
});
```

9.[**目录删除与读取**](https://www.runoob.com/nodejs/nodejs-fs.html)

```js
//读取某个目录下的所有文件
const fs=require('fs');
const path=require('path');

function readFile(filepath){
  fs.readdir(filepath,{withFileTypes:true},(err,files)=>{
    for(let item of files){
      //如果是文件夹
      if(item.isDirectory()){
        const Path=path.resolve(filepath,item.name)
        readFile(Path);
      }else{
        console.log(item.name);
      }
    }
  })
}

readFile('./test')
```




### node.js事件循环

1. Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

2. event模块的**添加事件监听eventEmitter.on('eventName',eventHandler);**event模块的**事件触发eventEmitter.emit('eventName')。**

```js
//引入events模块
const events = require('events');
//创建eventEmitter对象
const eventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function connected(){
  console.log('连接成功');
  // 触发data_received事件
  eventEmitter.emit('data_received');
}

// 使用匿名函数绑定data_received事件
eventEmitter.on('data_received',function(){
  console.log('数据接收成功');
});

// 绑定connection事件处理程序
eventEmitter.on('connection',connectHandler)
// 触发connection事件
eventEmitter.emit('connection');

console.log('程序执行完毕');
```

3. EventEmitter 的每个事件由一个事件名和若干个**参数**组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个**事件监听器**。
  当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
4. addListener和.on添加事件监听，removeListener和.emit移除事件监听

```js
//event.js 文件 引入event模块
var events = require('events'); 
//实例化EventEmitter对象
var emitter = new events.EventEmitter(); 
// emitter.emit('error') //
//监听器1
var listener1=function listener1(){
    console.log("监听器1执行")
}
//监听器2
var listener2=function listener2(){
    console.log("监听器2执行")
}

//addListener添加监听
emitter.addListener('someEvent', listener1); 
//.on添加监听
emitter.on('someEvent', listener2); 
//listenerCount计算监听器数量
console.log("现在有"+emitter.listenerCount('someEvent')+"个监听器监听该函数")
//.emit触发
emitter.emit('someEvent'); 
//removeListener
emitter.removeListener('someEvent',listener1)
console.log("listener1监听器移除")
console.log("现在有"+emitter.listenerCount('someEvent')+"个监听器监听该函数")
console.log("被监听的事件有"+emitter.eventNames())
console.log("程序执行完毕!")

$ node event.js //运行结果
现在有2个监听器监听该函数
监听器1执行
监听器2执行
listener1监听器移除
现在有1个监听器监听该函数
someEvent
程序执行完毕!
```

5. EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。我们**一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃**。(给错误事件添加监听应当先addListener("error",callback),或.on("error")添加监听 )

```js
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.emit('error'); 

emitter.on('error')
```

运行时会显示以下错误：

```js
node.js:201 
throw e; // process.nextTick error, or 'error' event on first tick 
^ 
Error: Uncaught, unspecified 'error' event. 
at EventEmitter.emit (events.js:50:15) 
at Object.<anonymous> (/home/byvoid/error.js:5:9) 
at Module._compile (module.js:441:26) 
at Object..js (module.js:459:10) 
at Module.load (module.js:348:31) 
at Function._load (module.js:308:12) 
at Array.0 (module.js:479:10) 
at EventEmitter._tickCallback (node.js:192:40) 
```

6. **宏任务队列**：ajax，setTimeout，setInterval，DOM监听，UI Rendering等
  **微任务队列**：Promise的then回调(相当于await之后的代码)，Mutation Observer API，queueMicrotask(回调函数) ，while循环的等待，等
7. js事件执行顺序：先同步，再在异步队列中分为**微任务**和**宏任务**，按队列顺序入队出队执行，微任务先于宏任务，微任务执行完后再执行宏任务
8. node内部LIBUV一个事件循环的执行顺序：main script => nextTicks => other microtask ( Promise.then ) => timers(setTimeout/setInterval) => setImmediate

### 包管理工具(npm)

1. 通常通过**npm init**初始化项目，创建**package.json**配置信息

```package.json
//package.json常见属性
{
  "name": "npmtest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js", //指定项目入口文件
  "scripts": { //执行命令
    "start":"node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC", //协议
  "dependencies": { //生产和开发时都要用到的依赖
    "axios": "^0.21.1" //^0.21.1表示主版本不变，后两个始终保持为最新版 ~X.Y.Z表示X,Y保持不变，Z始终保持为最新版
  },
  "devDependencies": { //开发时依赖
    
  },
  "engines": {}, //用于指定node和npm的版本号
  "browserslist":{} //用于配置打包后的javascript浏览器的兼容情况
}

```

2. **npm install**

```
npm install ___ -g//全局安装  npm uninstall ___
npm install ___  //本地安装(安装为开发和生产依赖)
npm install ___ --save-dev //安装为开发时依赖 npm uninstall ___ --save-dev
npm rebuild //强制重新build构建
npm config get cache //获取缓存地址
npm config get registry //获取registry镜像地址
npm cache clean //清除缓存
```

3. npm install原理以及**npm5的缓存策略**

![hScWcj.jpg](https://z3.ax1x.com/2021/08/22/hScWcj.jpg)

1. **yarn**

![hS5j7d.png](https://z3.ax1x.com/2021/08/22/hS5j7d.png)

1. **cnpm**：**npm的registry镜像**，registry为https://registry.npmjs.org存储包的地方，每10分钟更新一次

```
npm config set registry https://registry.npm.taobao.org
```

5. **npx**：npx的作用非常之多，比较常见的是使用它来调用((**默认为当前项目中的某个模块**)的指令



### Buffer(缓冲区)

1. JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个**Buffer 类**，该类用来**创建一个专门存放二进制数据的缓存区**。

2. **Buffer类的创建**

```js
const message="你好呀";
//buffer.from或new Buffer(),  默认为utf-8的格式,还有utf16le编码格式，编码格式可选
const buffer=Buffer.from(message,'utf16le');

console.log(buffer);
//buffer.toString()解码,默认为utf-8解码
console.log(buffer.toString('utf16le'));


// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

3. **写入缓冲区**：buf.write

```js
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len); //写入字节数：14
```

4. **读取缓冲区数据**：buf.toString

```js
buf = Buffer.alloc(26); 
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;  //97 至 122
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   //使用 'ascii' 编码, 并输出: abcde
console.log( buf.toString('utf8',0,5));    // 使用 'utf8' 编码, 并输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用默认的 'utf8' 编码, 并输出: abcde
```

5. **Buffer转换为JSON对象**：buf.toJSON  当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 **toJSON()**。

```js
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]); //创建buffer类(区)
const json = JSON.stringify(buf); //隐式调用了buf.toJSON,后stringify

console.log(json); // 输出: {"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});

console.log(copy); // 输出: <Buffer 01 02 03 04 05>
```

6. **缓冲区合并**：Buffer.concat

```js
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log(buffer3.toString()); //菜鸟教程www.runoob.com
```

7. **缓冲区比较**：buf.compare

```js
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
//输出： ABC在ABCD之前
```

8. **拷贝缓冲区**：buf.copy

```js
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

buf2.copy(buf1, 2); //将 buf2 插入到 buf1 指定位置上(覆盖相应的长度)

console.log(buf1.toString()); //abRUNOOBijkl
```

9. **缓冲区裁剪**：buf.slice

```js
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log(buffer2.toString()); //ru
```

10. **缓冲区长度**：buf.length

```js
var buffer = Buffer.from('www.runoob.com');
//  缓冲区长度
console.log(buffer.length); //14
```

### Stream(流)

1. Stream 是一个**抽象接口**，Node 中有很多对象实现了这个接口。Stream 有四种流类型：**Readable-可读操作、Writable-可写操作、Duplex-可读可写操作、Transform-操作被写入数据，然后读出结果**

2. 所有的 Stream 对象都是 EventEmitter 的实例。**常用的事件**有：**data-当有数据可读时触发、end-没有数据可读时触发、error-在接收和写入过程中发生错误时触发、finish-所有数据已被写入到底层系统时触发**

3. **从流中读取数据(fs模块)**  fs.createReadStream('文件名')

```js
var fs = require("fs");
var data = '';

// 创建可读流 start,end可决定读取流的起止位置
var readerStream = fs.createReadStream('input.txt',{
    start: 3,
    end: 6,
    highWaterMark: 2  //从第3读到第6， 3、4， 5、6
});

var writeStream = fs.createWriteStream('input',{
	flags: "a"/"r+"; // 创建并使用/可读可写权限
    start: "4"
})

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
   readerStream.pause(); //暂停读取
   setTimeout(()=>{
     readerStream.resume(); //恢复读取
   },1000); //每隔1秒读一次
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
输出结果：
程序执行完毕
Hello World
```

4. **写入流(fs模块)** fs.createWriteStream('文件名')

```js
var fs = require("fs");
var data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中  确定要写入的文件 start可决定写入流的起始位置
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据  确定要写入的内容和格式
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> finish、error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

5. **管道流** ：管道提供了一个**输出流到输入流**的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。 readerStream.pipe(writerStream)

```js
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```

6. **链式流**：链式是通过连接**输出流到另外一个流并创建多个流操作链**的机制。链式流一般用于管道操作。

* 管道和链式来压缩文件(**zlib模块进行压缩解压操作**)

```js
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())  //压缩
  .pipe(fs.createWriteStream('input.txt.gz')); //写入压缩包
  
console.log("文件压缩完成。");
```

* 管道和链式来解压文件(zlib模块)

```js
var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())  //解压
  .pipe(fs.createWriteStream('input.txt')); //写入至文件
  
console.log("文件解压完成。");
```

### Node.js模块系统

1. 为了让Node.js的**文件**可以**相互调用**，Node.js提供了一个简单的模块系统。模块是Node.js 应用程序的基本组成部分，**文件和模块是一一对应**的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

2. **引入模块**  Node.js 提供了 **exports** 和 **require** 两个对象，其中 **exports 是模块公开的接口**，**require 用于从外部获取一个模块的接口**，即所获取模块的 exports 对象。

```js
//main.js   require引入 hello模块(文件)
var hello = require('./hello');
hello.world(); //引用
//hello.js  exports导出 world
exports.world = function() {
  console.log('Hello World');
}

//有时候我们只是想把一个对象封装到模块中,格式如下，的module.exports是exports的一个引用，
//exports和module.exports导出的模块可用CommonJS的require引入，也可用ES的import引入 import _ from '_'
//ES的export{},用import引入，不可用CommonJS的require引入，import相当于是一个异步的引入
module.exports=function(){
  //...
}
//例
//hello.js 
function Hello() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 
}; 
module.exports = Hello; //导出
//main.js
var Hello = require('./hello'); 
hello = new Hello(); 
hello.setName('BYVoid'); 
hello.sayHello();  //Hello BYVoid
```

3. **服务器端的模块放在哪里**：由于 **Node.js 中存在 4 类模块（原生模块和3种文件模块）**，尽管 require 方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同，如图所示：

![img](https://www.runoob.com/wp-content/uploads/2014/03/nodejs-require.jpg)


### Node.js Web模块(http)

1. **使用Node创建Web服务器**：Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块。

```js
const http=require('http')
const fs=require('fs')
const url=require('url')

http.createServer(function(req,res){
  var pathname=url.parse(req.url).pathname
  fs.readFile(pathname.substr(1),function(err,data){
    if(err){
      res.writeHead(404,{"Content-Type":"text/html"})
    }else{
      res.writeHead(200,{"Content-Type":"text/html"})
      res.write(data.toString())
    }
    res.end()
  })
}).listen(8000,console.log("服务已开启在8000端口"))  // 访问localhost:8000/index.html

const server2=new http.Server((req,res)=>{  //另一种写法,创建服务
  res.end("server2");
})

server2.listen(8888,'localhost',()=>{ //端口，主机，回调 localhost=>127.0.0.1 :回环地址，使用本地主机ip不能访问，如果是'0.0.0.0'则可以通过localhost,0.0.0.0,本地主机ip访问。
  console.log('server2 listen at 8888');
})
server2.listen(()=>{ //未传端口号，由系统默认分配端口
  console.log('server2 listen');
  console.log(server2.address().port); //未指定端口，使用address().port打印实际端口
})

//当前目录下index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h2>43245</h2>
</body>
</html>

//createServer的req相关(req.url)
const http = require('http');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req,res)=>{
  // request对象中封装了客户端给服务器传过来的所有信息
  console.log(req.url);
  console.log(url.parse(req.url));

  const { pathname, query } = url.parse(req.url);//解析get请求的url
  if(pathname === '/login'){
    console.log(query);
    console.log(qs.parse(query));
    const {name, password} = qs.parse(query);//解析请求参数
    console.log(name,password);
    res.end('请求成功')
  }

})

server.listen(8000,()=>{
  console.log('server listen at:'+server.address().port);
})
```

![IScqN8.png](https://z3.ax1x.com/2021/10/31/IScqN8.png)
![IScbAf.png](https://z3.ax1x.com/2021/10/31/IScbAf.png)
![IS2AdP.png](https://z3.ax1x.com/2021/10/31/IS2AdP.png)
![ISWcKH.png](https://z3.ax1x.com/2021/10/31/ISWcKH.png)

```js
//createServer的req相关(req.methods)
const http = require('http');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req,res)=>{
  const {pathname} = url.parse(req.url);
  if(pathname === '/login'){
    if(req.method === 'POST'){ //判断post请求
      req.setEncoding('utf-8');
      req.on('data',(data)=>{
        const {name, password} = JSON.parse(data); //解析请求参数的json
        console.log(name,password);

        res.end('post请求成功');
      })
    }
  }
})

server.listen(8000,()=>{
  console.log('server listen at:8000');
})
```

```js
//createServer的response对象相关知识
const http = require('http');

const server = http.createServer((req,res)=>{
  // 设置响应状态码方式1:直接赋值
  // res.statusCode=402
  // 设置响应状态码方式2:和Head一起设置
  // res.writeHead(503)
    
  // 设置响应Header方式1:
  // res.setHeader("Content-Type","text/plain;charset=utf8");
  // 设置响应Header方式2:
  res.writeHead(200,{
    "Content-Type": "text/html;charset=utf8",
  })

  res.write('<h2>这是h2标题内容，可通过设置相应头的"Content-Type":"text/html"解析出来</h2>'); //res.end('响应结果') === res.write('响应结果); res.end();
  res.end();
})

server.listen(8000,()=>{
  console.log('server listen at:8000');
})
```






2. **使用Node创建Web客户端(发送请求)**

```js
const http = require('http');

http.get('http://localhost:8000', (res) => {  //发送get请求
  res.on('data', (data) => {
    console.log(data.toString());
  })
  res.on('end', () => {
    console.log('获取到了所有数据');
  })
})

http.request({ // 另一种方式
  method: 'POST',
  hostname: 'localhost',
  port: 8000
}, (res) => {
  res.on('data', (data) => {
    console.log(data.toString());
  });

  res.on('end', () => {
    console.log('所有数据接收完毕');
  });
}).end(); //必须有.end标志结束，不然会阻塞
```

3. **原生文件上传，node接收**

```js
//错误的接收方法
const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req,res) => {
  const { pathname } = url.parse(req.url)
  if(pathname === '/upload'){
    if(req.method === 'POST'){
      const fileWriter = fs.createWriteStream('./foo.png', { flags: 'a+' });
      // req.pipe(fileWriter);  管道方式

      req.on('data', (data) => {
        console.log(data);
        fileWriter.write(data); // 直接把图片文件以及头信息写入了foo.png，将导致图片解析出错
      });

      req.on('end', () => {
        console.log('文件上传成功');
        res.end('文件上传成功');
      });
    }
  }
}).listen('8000', '0.0.0.0', () => {
  console.log('文件上传服务器启动成功');
})
// 正确的做法
const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

http.createServer((req,res) => {
  const { pathname } = url.parse(req.url)
  if(pathname === '/upload'){
    if(req.method === 'POST'){
      // 上传文件必须以二进制进行解析
      req.setEncoding('binary');

      let body = '';  //以字符串拼接
      const boundary = req.headers['content-type'].split(';')[1].replace(' boundary=', ''); //获取body尾部的boundary
      console.log(boundary);

      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        console.log(body);
        // 1.获取image/png的位置
        const payload = qs.parse(body, '\r\n', ': '); // 获取以/r/n结尾，: 分割的数据
        const type = payload["Content-Type"]; // 获取文件类型名

        // 2.获取文件实际开始的index
        const typeIndex = body.indexOf(type);
        const typeLength = type.length;
        let imageData = body.substring(typeIndex + typeLength);

        // 3.去除前部空格
        imageData = imageData.replace(/^\s\s*/, '');

        // 4.去除最后的boundary
        imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`));

        fs.writeFile('./foo.png', imageData, 'binary', (err) => {
          res.end('文件上传成功')
        });
      });
    }
  }
}).listen('8000', '0.0.0.0', () => {
  console.log('文件上传服务器启动成功');
})
```
![oiOaND.png](https://z3.ax1x.com/2021/11/24/oiOaND.png)









### Node.js函数

1. 在 JavaScript中，一个函数可以作为另一个函数的参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。Node.js 中函数的使用与 JavaScript 类似。

```js
function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}

execute(say, "Hello");
```

2. 我们**可以把一个函数作为变量**传递。但是我们不一定要绕这个"先定义，再传递"的圈子，我们**可以直接在另一个函数的括号**中定义和**传递**这个函数：

```js
function execute(someFunction, value) {
  someFunction(value);
}

execute(function(word){ console.log(word) }, "Hello");
```

3. **函数传递是如何让HTTP让服务器工作的**

```js
//函数参数方式创建服务
const http=require('http')

function onRequest(request,response){
  response.writeHead(200,{"Content-Type":"text/plain"}) //写返回头
  response.write("Hello World") //返回的内容
  response.end()
}

http.createServer(onRequest) //函数名
.listen(8000,()=>{console.log("服务已开启在8000端口")})
//匿名函数参数方式创建服务
const http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"}); //写返回头
  response.write("Hello World"); //返回的内容
  response.end();
}).listen(8888,()=>{console.log("服务已开启在本地8888端口")});
```

### Node.js路由

1. 我们要**为路由提供请求的 URL **和其他需要的 **GET 及 POST 参数**，随后路由需要根据这些数据来执行相应的代码。因此，我们需要**查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。**

2. 我们**需要的所有数据都会包含在 request 对象中**，该对象作为 onRequest() 回调函数的第一个参数传递。但是**为了解析这些数据**，我们需要额外的 Node.JS 模块，它们分别是 **url 和 querystring 模块**。**我们也可以用 querystring 模块来解析 POST 请求体中的参数**

```js
                   url.parse(string).query  //解析出查询字段
                                           |
           url.parse(string).pathname      |//解析出路径
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
              querystring.parse(queryString)["foo"]    |//解析出查询字段foo对应的值
                                            |
                         querystring.parse(queryString)["hello"]//解析出查询字段hello对应的值
```

3. 在添加更多的逻辑以前，我们先来看看如何**把路由和服务器整合起来**。我们的服务器应当知道路由的存在并加以有效利用。我们当然可以通过硬编码的方式将这一依赖项绑定到服务器上，但是其它语言的编程经验告诉我们这会是一件非常痛苦的事，因此我们将**使用依赖注入的方式较松散地添加路由模块**。

```js
//router.js
function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route; //exports为一个空对象，往里面导入route

//server.js
const http = require("http");
const url = require("url");
 
function start(route) { //使用router
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname; //解析出了路由路径(重点)
      
    route(pathname); //注入router
 
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
 
exports.start = start; //exports为一个空对象，往里面导入start

//index.js
const server = require("./server"); //引入
const router = require("./router"); //引入
 
server.start(router.route); //注入
```

### Node.js全局对象[Node.js全局对象](https://www.runoob.com/nodejs/nodejs-global-object.html)

1. JavaScript 中有一个特殊的对象，称为全局对象（Global Object），**它及其所有属性都可以在程序的任何地方访问，即全局变量**。在浏览器 JavaScript 中，通常 window 是全局对象， 而 **Node.js 中的全局对象是 global**，所有**全局变量**（除了 global 本身以外）都是 **global 对象的属性**。
2. **__filename**：表示**当前正在执行的脚本的文件名**。它将**输出文件所在位置的绝对路径**，且和命令行参数所指定的文件名不一定相同。 如果**在模块中，返回的值是模块文件的路径**。
3. **__dirname**：表示**当前执行脚本所在的目录。**

```js
console.log(__filename) // E:/learnNode/main.js
console.log(__dirname) // E:/learnNode

console.clear(); //清空当前行之前的控制台信息
console.trace(); //打印函数调用栈
```

1. **setTimeout(cb,ms)**：全局函数在指定的毫秒(ms)数后执行指定函数(cb)。**：setTimeout() **只执行一次指定函数。返回一个代表定时器的句柄值。
2. **clearTimeout(t)**：用于**停止一个之前通过 setTimeout() 创建的定时器**。 参数 **t** 是通过 setTimeout() 函数创建的定时器。
3. **setInterval(cb,ms)**：setInterval() 方法会**不停地调用函数**，**直到 clearInterval() 被调用**或**窗口被关闭**。
4. **process**：用于**描述当前Node.js 进程状态的对象**，**提供了一个与操作系统的简单接口。**

### Node.js常用工具[Node.js常用工具](https://www.runoob.com/nodejs/nodejs-util.html)

1. util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能 过于精简的不足。
2. **util.callbackify**接收异步回调

```js
const util = require('util');

async function fn() {
  return 'hello world';
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});

function fn() {
  return Promise.reject(null); //以Promise的null拒绝
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  // 当 Promise 被以 `null` 拒绝时，它被包装为 Error 并且原始值存储在 `reason` 中。
  err && err.hasOwnProperty('reason') && err.reason === null;  // true
});
```

3. **util.inherits**：是一个**实现对象间原型继承**的函数。

```js
var util = require('util'); 
function Base() { 
    this.name = 'base'; 
    this.base = 1991; 
    this.sayHello = function() { 
    console.log('Hello ' + this.name); 
    }; 
} 
Base.prototype.showName = function() { 
    console.log(this.name);
}; 
function Sub() { 
    this.name = 'sub'; 
} 
util.inherits(Sub, Base); //实现继承
var objBase = new Base(); 
objBase.showName(); //base
objBase.sayHello(); //Hello base
console.log(objBase); //{name:"base",base:1991,sayHello:[Function]}
var objSub = new Sub(); 
objSub.showName(); //sub 注：这里**能**访问到Base原型链prototype上的showName属性
//objSub.sayHello(); //报错：util.inherits不能访问到Base原有的一些属性
console.log(objSub);/
```

4. **util.inspect**：**可将任意对象转换为字符串**的方法，通常**用于调试和错误输出。**它至少接受一个参数 object，即要转换的对象。

```js
var util = require('util'); 
function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
    return this.name; 
    }; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true)); 
//输出
Person { name: 'byvoid', toString: [Function] }
Person {
  name: 'byvoid',
  toString: 
   { [Function]
     [length]: 0,
     [name]: '',
     [arguments]: null,
     [caller]: null,
     [prototype]: { [constructor]: [Circular] } } }
```

5. **util.isArray(object)**：如果给定的参数 "object" 是一个数组返回 true，否则返回 false。

```js
var util = require('util');

util.isArray([])
  // true
util.isArray(new Array)
  // true
util.isArray({})
  // false
```

6.**util.isRegExp(object)**：如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。

```js
var util = require('util');

util.isRegExp(/some regexp/)
  // true
util.isRegExp(new RegExp('another regexp'))
  // true
util.isRegExp({})
  // false
```

7. **util.isDate(object)**：如果给定的参数 "object" 是一个日期返回true，否则返回false。

```js
var util = require('util');

util.isDate(new Date())
  // true
util.isDate(Date())
  // false (without 'new' returns a String)
util.isDate({})
  // false
```



### Node.js GET/POST请求

1. **获取GET请求内容**：由于GET请求直接被嵌入在路径(**req.url**)中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。 node.js 中 url 模块中的 parse 函数提供了这个功能。

```js
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true))); //util.inspect字符化url.parse解析出来的req.url
}).listen(8000);
//获取url的参数
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
 
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
 
}).listen(8000);
```

2. **获取POST请求内容 **  node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。这里使用的是querystring.parse将post请求信息解析为真正的POST格式，然后返回客户端

```js
const http=require('http')
const querystring=require('querystring')
const util=require('util')

http.createServer(function(req,res){
  var data="" //定义空data用于存储请求体信息

  req.on('data',(chunk)=>{ //当接收到数据时，将其存入data中
    data+=chunk
  })
  req.on('end',()=>{
    data=querystring.parse(data) //将获得的请求体信息转回post的请求体格式
    res.writeHead(200,{'Content-Type':'text/html; charset=utf8'})
    res.end(util.inspect(data)) //利用工具类util.inspect字符化返回客户端
  })
}).listen(8000,()=>{
  console.log("服务已在8000端口开启")
})
```


### Express框架

1. Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。使用 Express 可以快速地搭建一个完整功能的网站。

2. **安装Express**

![fBLEvV.png](https://z3.ax1x.com/2021/08/13/fBLEvV.png)

1. **使用示例**

```js
const express=require('express')
const app=express()
//对GET请求进行处理
app.get('/',function(req,res){
  res.send('hello world')
})

var server=app.listen(8000,function(){
  //获取主机地址
  var host=server.address().address
  //获取端口地址
  var port=server.address().port

  console.log("应用实例访问地址为：http://%s:%s",host,port)
})

```

4. **路由** ：在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。

```js
const express=require('express')
const app=express()
//使用express.static可访问静态文件
app.use('/public',express.static('public'));

app.get('/',function(req,res){
  res.send('这是首页')
})

app.post('/',function(req,res){
  res.send('POST请求返回的数据')
})

app.get('/route',function(req,res){
  res.send('路由页面')
})

app.get('/fds',function(req,res){
  res.send('fds页面')
})

app.get('/ab*cd',function(req,res){
  res.send('可正则匹配的页面')
})

var server=app.listen(8000,function(){
  var host=server.address().address
  var port=server.address().port

  console.log('http://%s:%s',host,port)
})
```

5. **静态文件**：Express 提供了内置的中间件 **express.static** 来设置静态文件，可以使用 **express.static** 中间件来设置静态文件路径

```js
app.use('/public',express.static('public'));
```

6.**GET方法**

```js
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form action="http://127.0.0.1:8000/express_get" method="GET">//重点，指定url,以及请求的方法为POST http://127.0.0.1:8000可略写
    <input type="text" name="first_name"><br/>
    <input type="text" name="last_name">
    <input type="submit" value="submit"></input>
  </form>
</body>
</html>
//expressget.js
const express=require('express')
const app=express()
//允许访问静态文件
app.use('/public',express.static('public'))
//index.html路由
app.get('/index.html',function(req,res){
  res.sendFile(__dirname+"/"+"index.html")
})
//express_get路由
app.get("/express_get",function(req,res){
  var response={
    "first_name":req.query.first_name,
    "last_name":req.query.last_name
  }
  console.log(response);
  res.end(JSON.stringify(response))
})

var server=app.listen(8000,function(){
  var host=server.address().address
  var port=server.address().port
  console.log(host,port)//127.0.0.1,8000
})
```

7.**POST方法**

```js
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form action="http://127.0.0.1:8000/express_post" method="POST">
    <input type="text" name="first_name">
    <input type="text" name="last_name">
    <input type="submit" value="提交">
  </form>
</body>
</html>
//expresspost.js
const express=require('express')
const app=express()
var bodyParser=require('body-parser')//引入post解析模块
//创建application/x-www-form-urlencoded编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false})

app.use('/public',express.static('public'))

app.get('/index.html',(req,res)=>{
  res.sendFile(__dirname+"/"+"index.html")//当前路径+同级文件名
})
app.post('/express_post',urlencodedParser,(req,res)=>{//使用urlencodedParser
  var response={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name
  }
  res.end(JSON.stringify(response))
})

app.listen(8000,()=>{console.log("服务开启在8000端口");})
```

8. **文件上传**

9. **Cookie管理**：我们可以**使用中间件向 Node.js 服务器发送 cookie 信息**，以下代码输出了客户端发送的 cookie 信息：

```js
//express.js
const express=require('express')
const cookieParser=require('cookie-parser')
const util=require('util')

const app=express()
app.use(cookieParser())

app.get('/',(req,res)=>{
  console.log("cookies:"+util.inspect(req.cookies));
})

app.listen(8000,()=>{console.log("服务开启在8000端口");})
```

### [RESTful API](https://www.runoob.com/nodejs/nodejs-restful-api.html)：增删改查json数据

### Node.js多进程

