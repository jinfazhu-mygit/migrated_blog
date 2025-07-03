---
title: 'ES6'
date: 2021-12-30 21:00:00
permalink: '/posts/blogs/ES6'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
 - ES新语法
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

# ES6

## 1

### 字面量增强写法

```js
var name = 'zjf';
var age = 21;

var obj = {
  // 1.property shorthand(属性的简写)
  name,
  age,

  // 2.method shorthand
  foo: function() {
    console.log(this);
  },
  bar() {
    console.log(this);
  },
  baz:() => {
    console.log(this);
  },

  // 3.computed property name(计算属性名)
  [name + 123]: 'hahaha'
}

obj.foo();
obj.bar();
obj.baz();
console.log(obj);
```

### 解构

**数组解构**

```js
var names = ['abc', 'cba', 'nba'];

var [item1, item2, item3] = names;
console.log(item1, item2, item3);

var [, , itemz] = names;
console.log(itemz); // nba

var [itemx, ...items] = names;
console.log(itemx, items); // abc, ['cba', 'nba']
// 解构默认值赋值
var [itema, itemb, itemc, itemd = 'zfz'] = names;
console.log(itemd);
```

**对象解构**

```js
var obj = {
  name: 'zjf',
  age: 21,
  height: 1.9
}

var { name, age, height } = obj;
console.log(name, age, height);

var { age } = obj;
console.log(age);

var { name: newName } = obj;
console.log(newName);
// 若没有相应的属性，则根据默认值打印使用
var { address: newAddress = '广州市' } = obj;
console.log(newAddress);

function foo({name, age}) {
  console.log(name, age);
}
foo(obj);
```

## let/const

* 用到了let/const声明的变量实际上，已经不是保存在VO( variable object )上了，而是在VE( variable environment )上，

### 作用域提升

* 作用域提升：在声明变量的作用域中，如果这个**变量可以在声明之前被访问**，那么我们可以称之为**作用域提升**；

* let/const是没有作用域提升的，因为当先使用变量后声明的话，Cannot access ___ before initialization

```js
// 块代码
// ES5没有块级作用域
{
  var foo = "var"
}

console.log(foo); // var
// ES5中只有两个东西会形成作用域
// 1.全局作用域
// 2.函数作用域

console.log(baz);
let baz = 'baz'; // Cannot access baz before initialization
```

### 块级作用域

* 在ES6中新增了块级作用域，并且通过let、const、function、class声明的标识符是具备块级作用域的限制的：

```js
{
  let foo = "let";
  function bar() {
    console.log('bar function');
  };
  class Person {}
}

console.log(foo); // foo is not defined
// 对于函数，不同的浏览器有不同的实现(大部分浏览器为了兼容以前的代码，让function没有块级作用域)
bar(); // bar function
console.log(Person); // Person is not defined
```

* **{}-if-switch-for块级代码**

```js
{
  let foo = 'foo';
}

// if语句代码是块级作用域
if(true) {
  var foo = "foo";
  let bar = "bar";
}

console.log(foo); // foo
console.log(bar); // bar is not defined

// switch语句代码是块级作用域
var color = "red";
switch(color) {
  case "red":
    var foo = "foo";
    let bar = "bar";
}

console.log(foo); // foo
console.log(bar); // bar is not defined

// for语句代码也是块级作用域
for(var baz = 0; baz < 5; baz++) {
  console.log('1');
}
console.log(baz); // 5

for(let bax = 0; baz < 5; baz++) {
  console.log('1');
}
console.log(bax); // bax is not defined
```

* **块级作用域应用**

```js
const btns = document.getElementsByTagName('button');

for(var i = 0; i < btns.length; i++) {
  (function (n) { // var实现button点击事件记录方式
    btns[i].onclick = function() {
      console.log('第'+ n + '个按钮点击了');
    }
  })(i)
}

for(let i = 0; i < btns.length; i++) {
  btns[i].onclick = function() { // let实现button点击事件记录方式
    console.log('第'+ i +'个按钮被点击');
  }
}

for(const btn of btns) {
  console.log(btn);
}
```

### ES6其他补充

* **模板字符串 标签模板字符串**

```js
let name = 'zjf';
let age = 21;
let height = 1.9;
// 嵌入使用
const message = `my name is ${name}, age is ${age}, height is ${height}`;
console.log(message);

function ageDouble() {
  return age * 2
}
console.log(`double age is ${age * 2}`); // 运算
console.log(`age double is ${ageDouble()}`); // 函数调用

// 标签模板字符串
function foo(...args) {
  console.log(args); // [ [ 'Hell', 'oWo', 'rld' ], 'zjf', 21 ]
}
foo`Hell${name}oWo${age}rld`; // 模板字符串函数调用，并且分割，传参
```

* **函数默认参数**

```js
// 1.ES5函数默认参数
// function foo(m, n) {
//   m = m || 'aaa'; // 当传入0或""时，默认也是取后面部分
//   n = n || 'bbb';
//   console.log(m, n);
// }

// 1.ES6函数默认参数
function foo(m = 'aaa', n = 'bbb') {
  console.log(m, n); // 0 ''
}

foo(0, "");

// 2.对象参数默认值以及解构
function printInfo({name, age} = {name: 'zjf', age: 21}) {
  console.log(name, age); // zjf 21
};
// 另一种写法
function printInfo1({name = 'zjf', age = 21} = {}) {
  console.log(name, age); // zjf 21
}
printInfo();
printInfo1();

// 3.有默认值的形参最好放到最后
function bar(x, y, z = 30) {
  console.log(x, y, z);
}
bar(10, 20); // 10 20 30

// 4.有默认值的函数的length属性
function baz(x, y, z = 1) {
  console.log(x, y, z);
}
console.log(baz.length); // 2,只算x, y
```

* **函数的剩余参数**

```js
function foo(x, y, ...args) { // 剩余参数必须放到最后
  console.log(x, y); // 10 20
  console.log(args); // [ 30, 40, 50 ]
  // arguments对应的只是一个可迭代对象，不是一个数组，尽量不使用
  console.log(arguments); //[Arguments] { '0': 10, '1': 20, '2': 30, '3': 40, '4': 50 }
}

foo(10, 20, 30, 40, 50);
```

* **箭头函数补充**

```js
function foo() {

}
var bar = () => {

}
console.log(foo.prototype); // {}
console.log(bar.prototype); // undefined 箭头函数是没有显式原型的，所以不能作为构造函数
```

* **展开语法使用**

```js
const names = ["abc", "cba", "nba"]
const name = "why"
const info = {name: "why", age: 18}

// 1.函数调用时
function foo(x, y, z) {
  console.log(x, y, z)
}

// foo.apply(null, names)
foo(...names) // abc cba nba
foo(...name) // w h y

// 2.构造数组时
const newNames = [...names, ...name]
console.log(newNames) // [ 'abc', 'cba', 'nba', 'w', 'h', 'y' ]

// 3.构建对象字面量时ES2018(ES9)
const obj = { ...info, address: "广州市", ...names }
console.log(obj) // { 0: 'abc', 1: 'cba', 2: 'nba', name: 'why', 'age': 18, address: '广州市' } 

// 展开语法进行的浅拷贝
const info = {
  name: 'zjf',
  friend: {
    name: 'zxc'
  }
}

const obj = {...info, name: 'zzjf'};
console.log(info);
console.log(obj);

obj.friend.name = 'zzjjf'; // info和obj里的friend的name都变成了zzjjf
console.log(info);
console.log(obj);
```

* **ES6表示数值的方式**

```js
const num1 = 100; // 十进制

// b -> binary
const num2 = 0b100; // 二进制
// o -> octonary
const num3 = 0o100; // 八进制
// x -> hexadecimal
const num4 = 0x100; // 十六进制

console.log(num1, num2, num3, num4);

// 大的数值连接符
const num = 10_000_000_000_000;
console.log(num);
```

## Symbol

* Symbol是ES6中新增的一个基本数据类型，翻译为符号。
* 为什么需要Symbol
  * 在ES6之前，对象的**属性名都是字符串形式**，那么很**容易造成属性名的冲突**
  * 比如原来有一个对象，我们希望在其中添加一个新的属性和值，但是我们在不确定它原来内部有什么内容的情况下， 很容易造成**冲突**，从而**覆盖掉它内部的某个属性**；

* Symbol就是为了解决上面的问题，用来**生成一个独一无二的值**。
  * Symbol值是通过**Symbol函数**来生成的，生成后**可以作为属性名**；
  * 也就是在ES6中，对象的属性名可以使用**字符串**，也可以使用**Symbol值**；

* **创建Symbol**

```js
// 1.ES6中Symbol的使用
const s1 = Symbol();
const s2 = Symbol();
// Symbol每次创建出来的symbol都是不一样的
console.log(s1 === s2); // false

// ES2019(ES10)中，Symbol还有一个描述(description)
const s3 = Symbol('aaa');
console.log(s3.description); // aaa

```

* **基本使用**

```js
// Symbol值作为key
// 在定义对象字面量时使用
const obj = {
  [s1]: "abc",
  [s2]: "cba"
}

// 新增属性
obj[s3] = "nba";

// Object.defineproperty方式
const s4 = Symbol();
Object.defineProperty(obj, s4, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 'mba'
})

console.log(obj); 
// {
//   [Symbol()]: 'abc',
//   [Symbol()]: 'cba',
//   [Symbol(aaa)]: 'nba',
//   [Symbol()]: 'mba'
// }
console.log(obj[s1], obj[s2], obj[s3], obj[s4]); // abc cba nba mba
```

* **对象中Symbol属性值的获取**

```js
// 使用Symbol作为key的属性名，在遍历/Object.keys等中时获取不到这些Symbol值
// 需要Object.getOwnPropertySymbols获取所有的key值，再通过obj[key]才能访问到相应的值
console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(), Symbol(), Symbol(aaa), Symbol() ]
const sKeys = Object.getOwnPropertySymbols(obj);
for(const sKey of sKeys) {
  console.log(obj[sKey]); // abc cba nba mba
}
```

* **创建相同的symbol**

```js
// 创建一样的Symbol, Symbol.for(key)/Symbol.keyFor(symbol)
const sa = Symbol.for('aaa');
const sb = Symbol.for('aaa');
console.log(sa === sb); // true

const key = Symbol.keyFor(sa); // 拿到sa的for值
console.log(key); // aaa
const sc = Symbol.for(key);
console.log(sa === sc); // true
```

## 新增数据结构Set

* Set是一个新增的数据结构，可以用来保存数据，类似于数组，但是和数组的区别是元素不能重复
  * 创建Set我们需要通过Set构造函数（暂时没有字面量创建的方式）：
* 我们可以发现Set中存放的元素是不会重复的，那么Set有一个非常常用的功能就是给**数组去重**

```js
// 1.创建set结构
const set = new Set();
set.add(10);
set.add(11);
set.add(12);

set.add(10);

// 2.添加对象特别注意
set.add({});
set.add({}); // 添加上两个{},{}所指内存地址不同

const obj = new Object();
set.add(obj);
set.add(obj); // 只添加上一个，obj所指内存地址相同

console.log(set);

// 3.用于数组去重
const arr = [10, 24, 30, 34, 24, 10];
// const newArr = [];
// for(const item of arr) {
//   if(newArr.indexOf(item) === -1) {
//     newArr.push(item);
//   }
// }

const newSet = new Set(arr);
// const newArr = Array.from(newSet); // 可迭代对象转回数组
const newArr = [...newSet];

console.log(newArr);

// 4.size属性
console.log(newSet.size); // 4

// 5.Set的方法
// add
newSet.add(100);
// delete
newSet.delete(10);
console.log(newSet);
// has
console.log(newSet.has(100)); // true
// clear
newSet.clear();
console.log(newSet);

// 6.对set遍历
newSet.forEach(item => {
  console.log(item);
})

for (const item of newSet) {
  console.log(item);
}
```

### WeakSet

* 和Set的区别一：**WeakSet中只能存放对象类型**，**不能存放基本数据类型**
* 和Set的区别一：WeakSet对**元素(对象)的引用是弱引用**，如果没有其他引用对某个对象进行引用，那么GC可以对该对象进行回收

```js
const weakSet = new WeakSet();
// 区别1：WeakSet只能存放对象类型
// weakSet.add(10); // Invalid value used in weak set
// weakSet.add({});

// 区别2：对对象是弱引用
let obj = {
  name: 'zjf'
}

const set = new Set();
set.add(obj); // 强引用指向obj的内存地址
weakSet.add(obj); // 弱引用指向obj的内存地址
obj = null;
console.log(set); // 即使使obj = null也不会被GC回收
console.log(weakSet); // 如果没有其他对象对obj进行引用，将会被回收
// weakSet没有clear方法

// 应用场景
const newWeakSet = new WeakSet();
class Person {
  constructor() {
    newWeakSet.add(this);
  }

  running() {
    if(!newWeakSet.has(this)){
      throw new Error('不能通过非构造方式创建出来的this调用running方法');
    }else {
      console.log('running~', this);
    }
  }
}

const p = new Person();
p.running();
p.running.call({name: 'zjf'});
```

## 新增数据结构Map

* 之前我们可以使用对象来存储映射关系，他们有什么区别呢？

  * 事实上我们**对象存储映射关系只能用字符串（ES6新增了Symbol）作为属性名（key）**

  * 某些情况下我们可能希望通过**其他类型作为key**，比如**对象**，这个时候会自动**将对象转成字符串来作为key**

```js
// 1.JavaScipt中对象是不能作为对象的key来使用的
const obj1 = { name: 'zjf' };
const obj2 = { name: 'why' };

const obj = {
  [obj1]: 'aaa',
  [obj2]: 'bbb'
}

console.log(obj); // { '[object Object]': 'bbb' }

// 2.Map允许对象类型来作为key
// 构造方法使用
const map = new Map();

map.set(obj1, 'aaa');
map.set(obj2, 'bbb');
map.set(3, 'ccc'); // 也允许其他数据类型
console.log(map); // Map(2) { { name: 'zjf' } => 'aaa', { name: 'why' } => 'bbb' }

const map2 = new Map([[obj1, 'aaa'], [obj2, 'bbb'], [4, 'ddd']]);
console.log(map2);

// 3.map常见的属性和方法
// set
map2.set('name', 'zjf');
// get(key)
console.log(map2.get(obj1)); // aaa
// has
console.log(map2.has(obj1)); // true
// delete
console.log(map2.delete(4)); // true
// clear
// map2.clear()
// 遍历
map2.forEach((item, key) => {
  console.log(key, item);
})

for(const item of map2) {
  console.log(item[0], item[1]);
}

for(const [key, item] of map2) {
  console.log(key, item);
}

console.log(map2);
```

### WeakMap

```js
let obj = { name: 'zjf' };
// 区别一：Map强引用与WeakMap弱引用
const map = new Map();
map.set(obj, 'aaa'); // 强引用obj

const weakMap = new WeakMap();
weakMap.set(obj, 'aaa'); // 弱引用obj
// 区别二：Map可添加基本数据类型，WeakMap只可以添加对象类型(弱引用)
// weakMap.set(1, 'bbb'); // Invalid value used as weak map key

// 3.常见方法
// get
console.log(weakMap.get(obj)); // aaa
// has
console.log(weakMap.has(obj)); // true
//delete
console.log(weakMap.delete(obj)); // true

console.log(map);
console.log(weakMap);
```

* 应用场景(vue3响应式原理，对对象的映射关系)

```js
// WeakMap响应式原理应用场景
const obj = {
  name: 'zjf',
  age: 21
}

function objNameFn1() {
  console.log('obj的name发生了变化1');
}
function objNameFn2() {
  console.log('obj的name发生了变化2');
}
function objAgeFn1() {
  console.log('obj的age发生了变化2');
}
function objAgeFn2() {
  console.log('obj的age发生了变化2');
}
//创建weakmap
const weakMap = new WeakMap();
// 对obj的数据收集
const map = new Map();
map.set('name', [objNameFn1, objNameFn2]);
map.set('age', [objAgeFn1, objAgeFn2]);
weakMap.set(obj, map);
// 如果obj.name发生了变化
obj.name = 'why';
const targetMap = weakMap.get(obj);
const fns = targetMap.get('name');
fns.forEach(item => item());
```

