---
title: 'JS模块化(CommonJS-ES Module)相关'
date: 2022-2-16 20:10:00
permalink: '/posts/blogs/JS模块化(CommonJS-ES Module)相关'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

# JS模块化

* 模块化开发最终的目的是将程序划分成**一个个小的结构**；
* 在**结构中编写属于自己的逻辑代码，有自己的作用域，不会影响到其他的结构**；
* 将自己**希望暴露的变量、函数、对象等导出**给其结构**使用**；
* 也可以通过某种方式，**导入另外结构中的变量、函数、对象**等；
* 更加灵活的复用代码块

## CommonJS

* **CommonJS是一个规范**，**最初**提出来是在**浏览器以外的地方使用**，并且当时被命名为ServerJS，后来为了 体现它的广泛性，修改为CommonJS，平时我们也会简称为CJS。
* Node中对CommonJS进行了支持和实现
* 在Node中**每一个js文件都是一个单独的模块**；
* 这个模块中包括**CommonJS规范的核心变量**：**exports、module.exports、require**；

### 基本使用

```js
// zjf.js
const name = 'zjf';
const age = 21;
function foo(num1, num2) {
  return num1 + num2
}
// 1.module.exportrs导出
module.exports = {
  name,
  age,
  foo
}

// 2.因为源码中module.exports = {}
// exports = module.exports
exports.name = name;
exports.age = age;
exports.foo = foo;

// main.js
const zjf = require('./zjf'); // 模块被第一次加载时会运行一次, 多次引用也只加载一次,引入一次即会存入缓存中，所以多次引用相同模块也只会执行一次

console.log(zjf.name);
console.log(zjf.age);
console.log(zjf.foo);
```

### **require补充**

```js
require('axios');
// 先查找node核心模块
// 再查找当前层级的mode_modules文件夹下的模块/axios/index.js
// 当前层级下的node_modules文件下找不到就去上层node_modules找

require('./zjf');
// 先找当前文件夹下的zjf.js
// 再找当前文件夹下的zjf.json
// 再找当前文件夹下的zjf.node
// 再找当前文件夹下的/zjf/index.js
// 再找当前文件夹下的/zjf/index.json
// 再找当前文件夹下的/zjf/index.node
```

## AMD/CMD



## ES Module

* ES Module和CommonJS的模块化有一些不同之处：
  * 一方面它使用了**import**和**export**关键字；
  * 另一方面它采用编译期的静态分析，并且也加入了动态引用的方式；
* ES Module模块采用**export**和**import**关键字来实现模块化
* 采用**ES Module将自动采用严格模式：use strict**；
* **node环境下不能运行ES Module代码**，可通过**.html文件**的script标签中加上**type="module"**在浏览器中运行

### 常见用法

```js
// foo.js
// 1.export导出
export const name = 'zjf';
export const age = 22;

export function foo() {
  console.log('foo function');
}

export class Person {

}

// 2.export导出和声明分开
const name = 'zjf';
const age = 22;

function foo() {
  console.log('foo function');
}

export { // 固定语法
  name,
  age,
  foo
}

// 3.第二种导出时起别名(较少用)
export {
  name as fName,
  age as fAge,
  foo as fFoo
}

// main.js
// 1.普通导入
import { fName, fAge, fFoo } from './foo.js'; // 在浏览器中运行必须加上.js,以及script标签必须加上type = module

// 2.起别名
import { fName as name, fAge as age, fFoo as foo } from './foo.js'

// 3.直接拿到导出的所有内容，放到一个标识符中
import * as foo from './foo.js';

console.log(foo.fName);
console.log(foo.fAge);
```

### **import和export结合使用**

```js
// index.js中转
// 1. 普通导出
import { sum, sub } from './math.js';
import { timeFormat, priceFormat } from './format.js';

export {
  sum,
  sub,
  timeFormat,
  priceFormat
}

// 2.导入导出结合
export { sum, sub } from './math.js';
export { timeFormat, priceFormat } from './format.js';

// 3.导入同时导出所有
export * from './math.js';
export * from './format.js';
```

### **默认导出(export default)**

```js
// foo.js
const name = 'zjf';
const age = 22;

const foo = 'foo value';

export {
  name,
  age,
  // foo as default // 默认导出方式一
}

// 默认导出方式二(默认导出只能有一个)
// 默认到处和普通导出可以同时存在
export default foo;

// main.js
// 针对性导出
import { name, age } from './foo.js';

// 导入默认值(默认导出导入可以和针对性导出导入同时存在)
import zjf from './foo.js';
console.log(zjf);
console.log(name);
console.log(age);
```

### **import函数(同步导入与异步导入)**

```js
// 1.针对性导入(同步)
import { name, age, foo } from './foo.js';

console.log(name);
console.log(age);
console.log(foo);

// 2.异步导入
import('./foo.js').then(res => {
  console.log(res);
})

console.log('不影响后续代码');
// ES11新增的特性
// meta属性本身也是一个对象：{ url: '当前模块所在路径' }
console.log(import.meta);// foo.js
const name = 'zjf';
const age = 22;

const foo = 'foo value';

export {
  name,
  age,
  foo
}

// main.js
// 1.针对性导入(同步)
import { name, age, foo } from './foo.js';

console.log(name);
console.log(age);
console.log(foo);

// 2.异步导入
import('./foo.js').then(res => {
  console.log(res);
})

console.log('不影响后续代码');
// ES11新增的特性
// meta属性本身也是一个对象：{ url: '当前模块所在路径' }
console.log(import.meta);
```

### **导出数据修改的相关限制**
  * **ES Module中只有导出方才可以修改导出的数据**，**导入方修改不了导入的数据**
  * CommonJS中无论是导出方还是导入方都可以修改数据

```js
// foo.js
const name = 'zjf';
const age = 22;

setTimeout(() => { // 导出方可改
  name = '12312',
  age = 30
}, 1000);

export {
  name,
  age
}

// main.js
import { name, age } from './foo.js';

setTimeout(() => { // 导入方不可改导入的数据
  console.log(name, age);
}, 2000);
```

### **CommonJS与ES Module混用**

* 只有在**高版本node**(低版本node可能没有ES Module相关配置)和**webpack环境**下commonJS和ES Module才可以混用

```js
// foo.js
const name = 'zjf';
const age = 22;

// commonjs导出
module.exports = {
  name,
  age
}

// index.js
// ES Module导入
import { name, age } from './foo';

// CommonJS导入
// const { name, age } = require('./bar');

console.log(name);
console.log(age);
```

