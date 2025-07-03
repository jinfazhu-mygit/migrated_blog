---
title: 'JavaScript高级'
date: 2021-12-24 21:40:00
permalink: '/posts/blogs/JavaScript高级'
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


# JavaScript高级

## 浏览器内核(WebCore)

* **我们经常会说：不同的浏览器有不同的内核组成**
  * Gecko：早期被Netscape和Mozilla Firefox浏览器浏览器使用； 
  * Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink； 
  * Webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用； 
  * Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等； p等等...

* **事实上，我们经常说的浏览器内核指的是浏览器的排版引擎：**
  * 排版引擎（layout engine），也称为浏览器引擎（browser engine）、**页面渲染引擎**（rendering engine） 或样版引擎。

## JavaScript引擎(JSCore)

* 高级的**编程语言**都是需要**转成**最终的**机器指令**来执行的
* 我们编写的JavaScript无论你交给**浏览器或者Node执行**，最后都是需要被CPU执行的
* **JavaScript引擎帮助我们将JavaScript代码翻译成CPU指令来执行**

* **比较常见的JavaScript引擎有**

  * **SpiderMonkey**：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）；

  * **Chakra**：微软开发，用于IT浏览器；
  * **JavaScriptCore**：WebKit中的JavaScript引擎，Apple公司开发；
  * **V8**：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出；

### JS执行上下文调用栈(ECS)

* js引擎内部有一个**执行上下文栈**（Execution Context Stack，简称**ECS**），它是用于**执行代码的调用栈**。

* **全局的代码块**为了执行会构建一个 **Global Execution Context（GEC）**，GEC会被放到**ECS**中执行；

* 在代码编译阶段会将声明的**变量**和**函数(以内存地址的形式)**放到**GlobalObject(全局对象)**中
* 执行时，进行赋值和函数调用等操作

* 执行的过程中**执行到一个函数**时，就**会根据函数体创建一个函数执行上下文**（**Functional Execution Context**， 简称**FEC**），**并且压入到ECStack**中。

![TNumcQ.png](https://s4.ax1x.com/2021/12/24/TNumcQ.png)

## JS的内存管理与垃圾回收

### 内存管理

* JavaScript会**在定义变量时为我们分配内存**。
* JS对于**不同的数据类型有不同的内存分配方式**
  * 对于**基本数据类型**内存的分配会在执行时， 直接在**栈空间进行分配**；
  * 对于**复杂数据类型**内存的分配会在**堆内存 中开辟一块空间**，**并且将这块空间的指针返回**值变量引用；

### 垃圾回收

* 因为**内存的大小是有限**的，所以当**内存不再需要的时候**，我们需要**对其进行释放**，以便**腾出更多的内存空间**。
* 大部分现代的编程语言都是有自己的**垃圾回收机制**
  * 垃圾回收的英文是**Garbage Collection**，简称GC
  * **GC算法**：找出哪些对象是不再使用的(**引用计数和标记清楚法**)

## 闭包

### 定义

* **一个函数和对其周围状态**（lexical environment，词法环境）的**引用捆绑在一起**（或者说函数被引用包围），这样的组合就是闭包（closure）；
* **AO对象不会被销毁时，不是里面所有的属性都不会被释放**

```js
function foo() {
  var name = 'zjf';
  var age = 21;  // age还是会被回收
  return function() {
    debugger
    console.log(name); // name被捆绑
  }
}

var fn = foo();
fn();
```

## this指向问题

* **this在全局作用域下，指向window;**

### this绑定的四种方式

* this绑定优先级：new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

1. 默认绑定(独立函数调用)

```js
function foo() {
  console.log(this); // window
}
foo();

function foo() {
  console.log(this);
}

var obj = {
  name: 'zjf',
  foo
}

var bar = obj.foo; // 获取到了foo函数
bar();  // 独立函数调用this指向window
```

2. 隐式绑定

```js
function foo() {
  console.log(this);
}

var obj = {
  name: 'zjf',
  foo
}

obj.foo(); // 默认绑定到对象上，this指向该对象obj
```

3. 显式绑定(call, apply, bind)

```js
// call, apply
function foo(num1, num2, num3) {
  console.log(num1 + num2 + num3, this);
}

foo.call("call", 20, 30, 40); // 90 "call"
foo.apply("apply", [20, 30, 40]); // 90 "apply"
// bind
function foo() {
  console.log(this);
}

var newFoo = foo.bind("aaa");

newFoo(); // aaa
newFoo(); // aaa
```

4. new绑定

```js
// this = 构造器创建出来的对象
function Person(name, age) {  // 对象构造器
  this.name = name,
  this.age = age,
  console.log(this);
}

var p1 = new Person('zjf', 21); // 把Person函数当成对象构造器使用  Person { name: 'zjf', age: 21 }

var p2 = new Person('why', 18); // Person { name: 'why', age: 18 }
```

### 特殊情况

```js
function foo() {
  console.log(this);
}

var obj = {
  name: 'zjf',
  age: 21
}

foo.call(obj); // obj
foo.call(null); // window
foo.call(undefined); // window
```

![TNGr1P.png](https://s4.ax1x.com/2021/12/24/TNGr1P.png)

### 理解！！

* **箭头函数和对象不能拦截到this，箭头函数一定会往上级找this，function可以拦截到this**

![7QphCt.png](https://s4.ax1x.com/2022/01/13/7QphCt.png)

### call, apply, bind的实现

```js
// call函数实现
Function.prototype.hycall = function(thisArg, ...args) {
  // console.log('hycall被调用了');
  var fn = this;
  thisArg = thisArg? Object(thisArg): window;
  thisArg.fn = fn;
  var result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
}

function foo() {
  console.log('foo函数被执行了', this);
}

function sum(num1, num2) {
  console.log('sum函数被执行了', this, num1, num2);
  return num1 + num2
}

foo.hycall({name: 'zjf'});
var result = sum.hycall(123, 20, 30);
console.log(result);
```

```js
// apply函数实现
Function.prototype.jfapply = function(thisArg, argArray) {
  var fn = this;

  thisArg = (thisArg !== null && thisArg !== undefined )? Object(thisArg) : window;
  thisArg.fn = fn;
  var result = thisArg.fn(...argArray || []);
  delete thisArg.fn;
  return result;
}

function sum(num1, num2) {
  console.log('sum函数被调用', this, num1, num2);
  return num1 + num2;
}

var result = sum.apply('abc', [20, 30]);
console.log(result);

var result = sum.jfapply('abc');
console.log(result);
```

```js
// bind函数实现
Function.prototype.jfbind = function(thisArg, ...argArray) {
  var fn = this;
  thisArg = (thisArg !== null && thisArg !== undefined)? Object(thisArg): window;

  return function(...arg) {
    thisArg.fn = fn;
    var result = thisArg.fn(...[...argArray, ...arg]);
    delete thisArg.fn;
    return result;
  }

}

function foo(num1) {
  console.log(this, num1);
  return '123';
}

function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4);
}

// var bar = foo.bind('abc');
// bar()

var bar = foo.jfbind(123, 1);
bar(2);

var bar = sum.jfbind('abc', 10, 20);
bar(30, 40);
```

## 函数式编程

### arguments相关

```js
function foo(num1, num2, num3) {

  console.log(arguments.length);

  console.log(arguments[2]);
  console.log(arguments[3]);
  console.log(arguments[4]);

  console.log(arguments.callee);
  // arguments.callee();

}

foo(1, 2, 3, 4, 5);
```

* arguments不能遍历，但可以转化成数组实现

```js
function foo(num1, num2) {
  // 1.遍历
  var newArr = [];
  for(var i = 0; i < arguments.length; i++) {
    newArr.push(arguments[i]);
  }
  console.log(arguments);
  console.log(newArr);

  // 2.Array方法
  var newArr = Array.prototype.slice.call(arguments);
  console.log(newArr);

  var nArr = [].slice.call(arguments);
  console.log(nArr);

  // 3.ES6
  var newArr1 = Array.from(arguments);
  console.log(newArr1);
  
  // 4.展开运算符
  var newArr2 = [...arguments];
  console.log(newArr2);
}

foo(1, 2, 3, 4, 5);
```

* 箭头函数中没有arguments

```js
function foo() {
  return (...arg) => {
    console.log(arguments); // 123
    console.log(arg); // [1, 2, 3, 4]
  }
}

var bar = foo(123);
bar(1, 2, 3, 4);
```

### 纯函数

* **相同的输入对应有相同的输出**
* 不能产生函数以外的**副作用**
* **不依赖于外部因素(变量)**

### JavaScript柯里化

* 只**传递给函数一部分参数**来调用它，让它**返回一个函数去处理剩余的参数**；
* 参数拆分，以函数返回，可以更好的**分步复用函数**

```js
function foo(x, y, z) {
  return x + y + z;
}

console.log(foo(10, 20, 30));

function bar(x) { // 1
  return function(y) {
    return function(z) {
      return x + y + z;
    }
  }
}

var result1 = bar(10)(20)(30);
console.log(result1);

var sum1 = x => y => z => x + y + z; // 简写方式
console.log(sum1(10)(20)(30));
```

**柯里化函数的实现**

```js
function add1( x, y, z ) {
  return x + y + z;
}

// var result = add1(10, 20, 30, 40);
// console.log(result);


function currying(fn) {
  function curried(...arg) {
    // 当传入的参数个数大于等于需要的参数个数时，直接执行函数
    if(arg.length >= fn.length) {
      return fn.call(this, ...arg);
    }else {
      // 参数拼接,返回函数接收第二个参数
      function curried2(...arg2) { // 拼接
        return curried.apply(this, [...arg, ...arg2]); // 递归
      }
      return curried2;
    }
  }
  return curried;
}

var add2 = currying(add1);

console.log(add2(10, 20, 30, 40));
console.log(add2(10, 20)(30));
```

### 组合函数

```js
// 示例
function double(num) {
  return num * 2;
}

function square(num) {
  return num ** 2;
}

console.log(square(double(2)));

function composeFn(m, n) {
  return function(num) {
    return n(m(num));
  }
}

var newFn = composeFn(double, square);
var result = newFn(2);
console.log(result);
```

**通用组合函数的实现**

```js
function double(num) {
  return num * 2;
}

function square(num) {
  return num ** 2;
}

function composeFn(...Fns) {
  var length = Fns.length;
  for(var i = 0; i < length; i++) {
    if(typeof Fns[i] !== 'function') {
      throw new TypeError('Expected arguments are functions!');
    }
  }

  function compose(...args) {
    var index = 0;
    var result = length ? Fns[index].apply(this, args): args;
    while(++index < length) {
      result = Fns[index].call(this, result);
    }
    return result;
  }
  return compose;
}

var newFn = composeFn(double, square);
console.log(newFn(2));
```

## 补充

### with语句

* **with语句可以形成自己的作用域**
* 目前不推荐使用with语句

```js
// "use strict";
var message = "Hello World";

var obj = {
  name: 'zjf',
  age: 21,
  message: 'obj message'
}

function foo() {
  function bar() {
    with(obj) { // with语句可以形成自己的作用域,不推荐使用，"use strict";严格模式下不可使用with语句
      console.log(message); // obj message
    }
  }
  bar();
}

foo();

```

### eval函数

* eval是一个特殊的函数，它**可以将传入的字符串当做JavaScript代码来运行**

* 不建议在开发中使用eval：
  * eval代码的可读性非常的差（代码的可读性是高质量代码的重要原则）；
  * eval是一个字符串，那么有可能在执行的过程中被刻意篡改，那么可能会造成被攻击的风险；
  * eval的执行必须经过JS解释器，不能被JS引擎优化；

```js
var jsString = 'var message = "Hello World";console.log(message);'

eval(jsString);
```

### 严格模式

* 严格模式是一种**具有限制性的JavaScript模式**，从而**使代码隐式的脱离了 ”懒散（sloppy）模式“**；
* 严格模式对正常的JavaScript语义进行了一些**限制**：
  * 严格模式通过 抛出错误 来**消除**一些原有的 **静默（silent）错误**；
  * 严格模式**让JS引擎在执行代码时可以进行更多的优化**（不需要对一些特殊的语法进行处理）；
  * 严格模式**禁用了在ECMAScript未来版本中可能会定义的一些语法**；

**严格模式下的限制举例**

```js
"use strict";

// 1.禁止意外创建全局变量
message = "Hello World";
console.log(message);

function foo() {
  name = 'zjf'; // 非严格模式下相当于var name = 'zjf';
}
foo()
console.log(name);

// 2.不允许有相同的参数名称
function foo(x, y, x) { // Duplicate parameter name not allowed in this context
  console.log(x, y, x); // 30 20 30
}
foo(10, 20, 30);

// 3.静默错误
true.name = 'zjf'; // Cannot create property 'name' on boolean 'true'
NaN = 123; // Cannot assign to read only property 'NaN' of object '#<Window>'

var obj = {};
Object.defineProperty(obj, "name", {
  configurable: false, // 不可配置
  writable: false, // 不可写 read only
  value: "why"
})
console.log(obj.name); // "why"
obj.name = "zjf"; // 静默不报错, 严格模式下Cannot assign to read only property 'name' of object '#<Object>'
delete obj.name; // 静默不报错, 严格模式下Cannot delete property 'name' of #<Object>

// 4.不允许使用原先的八进制格式
var num = 0123;
console.log(num); // Octal literals are not allowed in strict mode.
var num = 0b100; // ES6二进制写法
var num1 = 0o123; // ES6八进制写法
var num2 = 0x123; // ES6十六进制写法
console.log(num, num1, num2); // 4 83 291

// 5.with语句不允许使用

// 6.eval函数不会向上引用变量
var jsString = "var message = 'Hello World'; console.log(message);"
eval(jsString);
console.log(message); // 非严格可使用，严格模式下ReferenceError: message is not defined

// 7.严格模式下，自执行函数指向undefined
function foo() {
  console.log(this); // undefined
}
foo()
```

























/* 

* 该博客由本人归纳自 JS高级进阶PPT(.pdf)， yyds!!!

*/
