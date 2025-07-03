---
title: 'JS面向对象'
date: 2021-12-26 22:00:00
permalink: '/posts/blogs/JS面向对象'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
 - 原型
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


# JS面向对象

## 概念

* JavaScript其实支持多种编程范式的，包括**函数式编程**和**面向对象编程**：
  * JavaScript中的对象被设计成一组属性的无序集合，像是一个**哈希表**，有**key和value**组成；

* **创建对象的两种方式**

```js
// 1.new Object()
var obj = new Object();
obj.name = 'zjf';
obj.age = 21;
obj.running = function() {
  console.log('runing~');
}

// 2.字面量创建
var obj1 = {
  name: 'why',
  age: 18,
  eating: function() {
    console.log('eating');
  }
}
console.log(obj, obj1);
```

* **对属性操作的简单控制**

```js
var obj = {
  name: 'zjf',
  age: 21
}

console.log(obj.name);

obj.name = 'why';
console.log(obj.name); // {name: 'zjf', age: 21}

delete obj.name;
console.log(obj); // { age: 21 }
```

### Object.defineProperty

* Object.defineProperty() 方法会直接在一个对象上**定义一个新属性**，**或者修改一个对象的现有属性**，并返回此对象。
* 接收三个参数
  * obj要定义属性的对象；
  * prop要定义或修改的属性的名称或 Symbol；
  * descriptor要定义或修改的属性描述符；

```js
var obj = {
  name: 'zjf',
  age: 21,
  eating: function() {
    console.log(this.name + 'is running');
  }
}

Object.defineProperty(obj, "height", { // 数据属性描述符
  value: 1.9
})
console.log(obj); // { name: 'zjf', age: 21, eating: [Function: eating] } 实际没有打印出height属性
console.log(obj.height); // 1.9
```

* **数据属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21
}
// 数据属性描述符
Object.defineProperty(obj, "address", { // (增)
  value: '北京',
  // 是否可写入(改)
  writable: false,
  // 配置特性(不可删除，不可重新定义)(删)
  configurable: false, 
  // 配置对应的特性是否可以枚举(查)
  enumerable: true, // 若enumerable为false则在node终端不显示，但是在浏览器会显示为灰色
})

delete obj.address;
console.log(obj.address); // 未被删除
obj.address = '上海';
console.log(obj.address);
console.log(Object.keys(obj)); // ['name', 'age']

for(var key in obj) {
  console.log(key);
}
```

* **存取属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21,
  _address: '北京'
}

// 存取属性描述符
// 1.隐藏某一个私有属性被希望直接被外界使用和赋值
// 2.如果我们希望截获某一个属性他访问核设置值的过程时，也会使用存储属性描述符
// 3.属性拦截也是vue2实现响应式的原理，将inputValue同set方法结合起来
Object.defineProperty(obj, "address", {
  configurable: true,
  enumerable: true,
  set: function(value) {
    bar();
    this._address = value;
  },
  get: function() {
    foo();
    return this._address;
  }
})

console.log(obj.address);
obj.address = '上海';
console.log(obj.address);

function foo() {
  console.log('获取了address的值');
}
function bar() {
  console.log('设置了address的值');
}
```

* **定义多个属性描述符**

```js
var obj = {
  _age: 18,
  // get age() {  // 一种存取属性描述符的写法
  //   return this._age;
  // },
  // set age(value) {
  //   this._age = value;
  // }
};

Object.defineProperties(obj, { // 对象定义多个属性
  name: { // 数据属性描述符
    value: 'zjf',
    writable: true,
    configurable: true,
    enumerable: true
  },
  age: { // 存取属性描述符
    configurable: true,
    enumerable: true,
    get() {
      return this._age;
    },
    set(value) {
      this._age = value;
    }
  }
})

console.log(obj);
obj.age = 21;
console.log(obj.age);
```

* **属性操作补充**

```js
var obj = {
  name: 'zjf',
  age: 21
}

Object.preventExtensions(obj); // 阻止扩展

obj.address = "广州";
obj.height = 1.9;

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

console.log(obj);

// 禁止对象配置、删除里面的属性
for (var key in obj) { // 1
  Object.defineProperty(obj, key, {
    configurable: false,
    enumerable: true,
    writable: true,
    value: obj[key]
  })
}
// 禁止对象配置、删除里面的属性
Object.seal(obj); // 2

// 禁止对象修改里面的属性
Object.freeze(obj);

obj.name = 'zzjf';

delete obj.name;
console.log(obj);

```

## 构造器、原型

### 创建多个对象的方案(工厂模式)

* 通常会有一个工厂方法，通过该方法可以产生想要的对象

```js
function createPerson(name, age, height, address) {
  var obj = {};
  obj.name = name;
  obj.age = age;
  obj.height = height;
  obj.address = address;
  obj.eating = function() {
    console.log(this.name + '在吃东西');
  };
  obj.running = function() {
    console.log(this.name + '在跑步');
  }

  return obj;
}

var p1 = createPerson('张三', 21, 1.88, "北京市");
var p2 = createPerson('李四', 18, 1.98, "上海市");
var p3 = createPerson('王五', 20, 1.78, "广州市");
console.log(p1, p2, p3);
```

* 缺点：**工厂模式创建出来的对象都是Object类型**，**没有更加具体明确(更进一步)的分类**,如createDog也是按照这样的方法来创建,实际应该做一个区分

### 构造函数创建对象(new、原型)

* 使用**构造函数创建对象**时，**可以对创建出来的对象进行一个分类**，如下面代码的Person函数就通过new创建了以Person为分类的对象
* 如果**一个函数被使用new操作符调用**了，那么会执行以下操作(**重要!!!**

1. **在内存中创建一个新的空对象；**
2. **这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；**
3. **构造函数内部的this，会指向新创建出来的对象；**
4. **执行函数的内部代码；**
5. **如果构造函数没有返回非空对象，则返回创建出来的新对象；**

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;

  this.eating = function() {
    console.log(this.name + '在吃东西');
  };
  this.running = function() {
    console.log(this.name + '在跑步');
  }
}

var p1 = new Person("zjf", 21, 1.9, "广州市");
console.log(p1);
// 重点！！
console.log(p1.__proto__ === Person.prototype); // true
```

### 原型的理解

1. **对象原型定义：我们每个对象中都有一个 [[prototype]], 这个属性可以称之为对象的原型(隐式原型)**

```js
var obj = {
  name: 'zjf'
}
var info = {}

console.log(obj.__proto__);
console.log(info.__proto__);

var obj = {
  name: 'why',
  __proto__: { age: 18 }
}
console.log(Object.getPrototypeOf(obj)); // 获取对象原型__proto__

// 原型的作用
// 当我们从一个对象中获取某一个属性时，它会触发[[get]]操作
// 1.首先会在当前对象中去查找对应的属性，如果找到就会直接使用
// 2.如果没有找到，就会沿着它的原型去找

// obj.__proto__.age = 18;
console.log(obj.age);
```

2. **函数原型**：**函数也相当于一个对象**，**有相应的__proto__属性**，但是**比普通对象多一个显式对象prototype**，在**函数定义时prototype对应的原型对象也已经指定**

![T0lvVS.png](https://s4.ax1x.com/2021/12/26/T0lvVS.png)

```js
function foo() {

}

var p1 = new foo();
var p2 = new foo();

console.log(p1.__proto__ === foo.prototype); // true
console.log(p2.__proto__ === foo.prototype); // true

p1.__proto__.name = 'zjf';
p1.name = 'why';
console.log(p1.name);
console.log(p2.name);
```

3. **函数原型上的属性**

```js
// 函数原型修改
foo.prototype = { // 重新指定新的原型对象
  name: 'zjf',
  age: 21,
  height: 1.9
}

var p1 = new foo();
console.log(p1.name);
console.log(p1.age);

Object.defineProperty(foo.prototype, "constructor", { // 添加并配置新原型对象的constructor属性
  enumerable: false,
  configurable: true,
  writable: true,
  value: foo
})

console.log(foo.prototype.constructor);
```

### 原型+构造函数方案创建对象

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;
}
// 通用的方法定义在构造器的原型对象上，让对象通过__proto__属性获取对于的方法，减少代码冗余
Person.prototype.eating = function() {
  console.log(this.name + "在吃东西~");
}
Person.prototype.runing = function() {
  console.log(this.name + "在跑步~");
}

var p1 = new Person('why', 18, 1.88, "广州市");
console.log(p1.name);
console.log(p1.age);
console.log(p1.height);
console.log(p1.address);
p1.eating();
p1.runing();
```

## 原型链


* **究极奥义图**

![TDs2EF.jpg](https://s4.ax1x.com/2021/12/27/TDs2EF.jpg)


* **从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上获取**

```js
var obj = { 
  name: 'zjf',
  age: 21
}

obj.__proto__ = { // 对象内找不到address属性，则去对象的原型上找
  // address: '北京市'
}

obj.__proto__.__proto__ = { // 对象的原型上找不到，则取对象原型的原型上找
  // address: '北京市'
}
// = { } 相当于new Object,创建出来的对象的__proto__指向Object的原型对象
obj.__proto__.__proto__.__proto__ = {
  address: '北京市'
}

console.log(obj.address);
```

* **顶层原型**
  * **如上图所示：顶层原型即为Object函数的原型对象，也是其他对象构造器的原型对象的__proto__所指**

* **顶层原型的**__proto__**所指为null(因为是顶层，所以没有指向的对象)**
* **Object是所有类(函数)的父级，所有类(函数)继承自Object**

```js
function Person() {

}

var p1 = new Person();

console.log(p1.__proto__.constructor);

console.log(Person.prototype.__proto__); // 顶层原型：[Object: null prototype] {},说明Person继承自Object

console.log(Object.getOwnPropertyDescriptors(Object.prototype));
```

## 对象的继承方案

1. **借用函数的继承方案**

   **奥义图**

![TDf3mn.jpg](https://s4.ax1x.com/2021/12/27/TDf3mn.jpg)

```js
function Person(name, age, friends) {
  this.name = name; // 将被借用的公共属性
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + " 在吃东西");
}

function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends); // 借用Person函数的定义属性
  this.sno = sno;
}

var p = new Person();
Student.prototype = p; // 继承实现复用公共函数的原型方法，prototype转移,多出一个对象

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ['why'], 123)
console.log(stu); // Person { name: 'zjf', age: 21, friends: [ 'why' ], sno: 123 }
stu.eating(); // zjf 在吃东西

// 借用构造函数的弊端
// 1.Person构造函数至少被调用了两次(new, Person.call() )
// 2.stu的原型上会多出一些属性，但是这些属性是没有必要存在的，因为借用构造函数创建的对象里已有相应的属性存在
// 已经不需要通过__proto__来访问属性了(部分方法还是要通过__proto__来访问的)
```

2. **原型赋值方案**(不推荐使用!!!)

```js
Student.prototype = Person.prototype;

// 弊端：Student函数将和Person函数共用一个原型对象，不是公共函数的函数添加方法的时候，会直接添加在Person函数的原型上函数Person函数臃肿，内容多
```

3. **寄生组合式继承**

* 为了将Student类的原型对象和Person类的原型对象独立开，重新创建一个新的对象，让这个对象指向Person的原型对象

```js
function createObject(o) { // 指定对象逻辑实现
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) { // 原型对象重新指定
  SubType.prototype = createObject(SuperType.prototype);// 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", {// 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + '在吃东西');
}

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age,friends);
  this.sno = sno;
  this.score = score;
}

inheritPrototype(Student, Person);

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ["why"], 111, 100);

console.log(stu);
stu.eating();
```

4. **重点理解图片**

![Tc1Rb9.jpg](https://s4.ax1x.com/2021/12/29/Tc1Rb9.jpg)

## 对象方法补充

1. **hasOwnProperty**：对象是否有某一个属于自己的属性（不是在原型上的属性）

2. **in/for in**：判断某个属性是否在某个对象或者对象的原型上

```js
var obj = {
  name: 'zjf',
  age: 21
}

var info = Object.create(obj, {
  address: {
    value: '北京市',
    enumerable: true
  }
})

console.log(info); // { address: '北京市' }
console.log(info.__proto__); // { name: 'zjf', age: 21 }
// hasOwnProperty是否在自身对象上,对象属性的判断
console.log(info.hasOwnProperty('address')); // true
console.log(info.hasOwnProperty('name')); // false

// in 操作符 判断属性是否能访问到
console.log("address" in info); // true
console.log('name' in info); // true
```


3. **instanceof**：用于检测某个**对象**，**是否出现在某个实例对象的原型链**上

```js
function createObject(o) {
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype); // 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", { // 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person() {}

function Student() {}

inheritPrototype(Student, Person);
var stu = new Student();

// instance会按照原型链一直往上找,检查某个实例对象是否在原型链上面
console.log(stu instanceof Student); // stu对象属于Student构造函数
console.log(stu instanceof Person); // stu对象也属于Person构造函数
console.log(stu instanceof Object); // Person原型对象__proto__指向Object的原型对象
```


4. **isPrototypeOf**：用于检测构造函数的pototype，是否出现在某个实例对象的原型链上

```js
var obj = {
  name: 'zjf',
  age: 21
}

// isPrototypeOf是判断对象所指的
console.log(obj instanceof Object); // true
console.log(Object.prototype.isPrototypeOf(obj)); // true

var info = Object.create(obj);
console.log(obj.isPrototypeOf(info)); // true
```

## ES6类的使用

1. class**定义类的方式**

* **类本质上是之前的构造函数、原型链的语法糖**

```js
class Person {

}

// 类的特点
console.log(Person.prototype); // {}
console.log(Person.prototype.__proto__); // [Object: null prototype]
console.log(Person.prototype.constructor); // [class Person]
console.log(typeof Person); // function

var p = new Person();
console.log(p.__proto__ === Person.prototype); // true
```

2.  **class的构造方法**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var p1 = new Person('zjf', 21);
var p2 = new Person('why', 18);

console.log(p1);
console.log(p2);
```

3. **class方法相关**

```js
var names = ['zjf', 'why', 'has'];
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = '北京市';
  }
  // 普通实例方法
  eating() { // 直接会在类的原型上定义方法
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  // 类的访问器方法
  get address() {
    return this._address;
  }

  set address(newValue) {
    this._address = newValue;
  }
  // 类的静态方法,静态方法是放在Person内的
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length);
    var name = names[nameIndex];
    var age = Math.floor(Math.random() * 100);
    return new Person(name, age);
  }
}

var p = new Person('zjf', 21);
p.eating();
p.running();
console.log(p.address); // 北京市

console.log(Object.getOwnPropertyDescriptors(Person.prototype)); // constructor,eating,running

for( var i = 0; i< 10; i++ ) {
  console.log(Person.randomPerson());
}
```

4. **继承实现**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  personMethod() {
    console.log('处理逻辑一');
    console.log('处理逻辑二');
    console.log('处理逻辑三');
  }

  static staticMethod() {
    console.log('Person staticMethod');
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age); // 有extends继承存在，就必须要调用super();
    this.sno = sno;
  }

  studying() {
    console.log(this.name + '在学习');
  }
  // 方法重写1
  running() {
    console.log('子类调用running方法，重写');
  }
  // 方法重写2
  personMethod() {
    super.personMethod(); // 逻辑复用，方法重写
    console.log('处理逻辑四');
    console.log('处理逻辑五');
  }

  static staticMethod() {
    super.staticMethod();
    console.log('Student staticMethod');
  }
}

var stu = new Student('zjf', 21, 111);
console.log(stu);
stu.eating();
stu.running();
stu.personMethod();
Student.staticMethod();

console.log(Object.getOwnPropertyDescriptors(Person));
```

5. **JS实现mixin混入效果**

* **JavaScript的类只支持单继承**：也就是**只能有一个父类**

```js
class Person {
  person() {
    console.log('person');
  }
}

function mixinRunner(superClass) {
  return class extends superClass {
    running() {
      console.log('running');
    }
  }
}

function mixinEating(superClass) {
  return class extends superClass {
    eating() {
      console.log('eating');
    }
  }
}

class Student extends Person {
  studying() {
    console.log('studying');
  }
}
// mixinEating继承自mixinRunner,mixinRunner继承自Student,Student继承自Person
var newStudent = mixinEating(mixinRunner(Student));
var stu = new newStudent();
stu.person();
stu.studying();
stu.running();
stu.eating();
```

## 多态

* **不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。**

```tsx
class Shape {
  getArea() {

  }
}

class Rectangle extends Shape {
  getArea() {
    return 100;
  }
}

class Circle extends Shape {
  getArea() {
    return 1000;
  }
}

var r = new Rectangle();
var c = new Circle();

function foo(shape:Shape) {
  shape.getArea();
}

foo(r);
foo(c);
export {}
```

## class的valueOf(类实例的比较)

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  valueOf() {
    return this.age
  }
}

// 创建Person对象
const p1 = new Person("why", 18)
const p2 = new Person("kobe", 31)

console.log(p1 < p2)

const p3 = new Person("james", 26)
console.log(p2 < p3) // false
console.log(p2 > p3) // true

const p4 = new Person("curry", 26)

// valueOf用于比较大于小于，不能用于实例间的==，===，实际上两个不同的实例对象也不会相等
console.log(p3 == p4) // false

```

## 实例as的用法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
doublyNode.prev?.prev;
doublyNode.next?.prev; // 报错
(doublyNode.next as DoublyNode<string>).prev // 正确
```

第二种处理办法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
  next: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
```







/* 

* 该篇博客由本人归纳自coderwhy JS高级进阶PPT(.pdf)，coderwhy yyds!!!

*/

## 概念

* JavaScript其实支持多种编程范式的，包括**函数式编程**和**面向对象编程**：
  * JavaScript中的对象被设计成一组属性的无序集合，像是一个**哈希表**，有**key和value**组成；

* **创建对象的两种方式**

```js
// 1.new Object()
var obj = new Object();
obj.name = 'zjf';
obj.age = 21;
obj.running = function() {
  console.log('runing~');
}

// 2.字面量创建
var obj1 = {
  name: 'why',
  age: 18,
  eating: function() {
    console.log('eating');
  }
}
console.log(obj, obj1);
```

* **对属性操作的简单控制**

```js
var obj = {
  name: 'zjf',
  age: 21
}

console.log(obj.name);

obj.name = 'why';
console.log(obj.name); // {name: 'zjf', age: 21}

delete obj.name;
console.log(obj); // { age: 21 }
```

### Object.defineProperty

* Object.defineProperty() 方法会直接在一个对象上**定义一个新属性**，**或者修改一个对象的现有属性**，并返回此对象。
* 接收三个参数
  * obj要定义属性的对象；
  * prop要定义或修改的属性的名称或 Symbol；
  * descriptor要定义或修改的属性描述符；

```js
var obj = {
  name: 'zjf',
  age: 21,
  eating: function() {
    console.log(this.name + 'is running');
  }
}

Object.defineProperty(obj, "height", { // 数据属性描述符
  value: 1.9
})
console.log(obj); // { name: 'zjf', age: 21, eating: [Function: eating] } 实际没有打印出height属性
console.log(obj.height); // 1.9
```

* **数据属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21
}
// 数据属性描述符
Object.defineProperty(obj, "address", { // (增)
  value: '北京',
  // 是否可写入(改)
  writable: false,
  // 配置特性(不可删除，不可重新定义)(删)
  configurable: false, 
  // 配置对应的特性是否可以枚举(查)
  enumerable: true, // 若enumerable为false则在node终端不显示，但是在浏览器会显示为灰色
})

delete obj.address;
console.log(obj.address); // 未被删除
obj.address = '上海';
console.log(obj.address);
console.log(Object.keys(obj)); // ['name', 'age']

for(var key in obj) {
  console.log(key);
}
```

* **存取属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21,
  _address: '北京'
}

// 存取属性描述符
// 1.隐藏某一个私有属性被希望直接被外界使用和赋值
// 2.如果我们希望截获某一个属性他访问核设置值的过程时，也会使用存储属性描述符
// 3.属性拦截也是vue2实现响应式的原理，将inputValue同set方法结合起来
Object.defineProperty(obj, "address", {
  configurable: true,
  enumerable: true,
  set: function(value) {
    bar();
    this._address = value;
  },
  get: function() {
    foo();
    return this._address;
  }
})

console.log(obj.address);
obj.address = '上海';
console.log(obj.address);

function foo() {
  console.log('获取了address的值');
}
function bar() {
  console.log('设置了address的值');
}
```

* **定义多个属性描述符**

```js
var obj = {
  _age: 18,
  // get age() {  // 一种存取属性描述符的写法
  //   return this._age;
  // },
  // set age(value) {
  //   this._age = value;
  // }
};

Object.defineProperties(obj, { // 对象定义多个属性
  name: { // 数据属性描述符
    value: 'zjf',
    writable: true,
    configurable: true,
    enumerable: true
  },
  age: { // 存取属性描述符
    configurable: true,
    enumerable: true,
    get() {
      return this._age;
    },
    set(value) {
      this._age = value;
    }
  }
})

console.log(obj);
obj.age = 21;
console.log(obj.age);
```

* **属性操作补充**

```js
var obj = {
  name: 'zjf',
  age: 21
}

Object.preventExtensions(obj); // 阻止扩展

obj.address = "广州";
obj.height = 1.9;

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

console.log(obj);

// 禁止对象配置、删除里面的属性
for (var key in obj) { // 1
  Object.defineProperty(obj, key, {
    configurable: false,
    enumerable: true,
    writable: true,
    value: obj[key]
  })
}
// 禁止对象配置、删除里面的属性
Object.seal(obj); // 2

// 禁止对象修改里面的属性
Object.freeze(obj);

obj.name = 'zzjf';

delete obj.name;
console.log(obj);

```

## 构造器、原型

### 创建多个对象的方案(工厂模式)

* 通常会有一个工厂方法，通过该方法可以产生想要的对象

```js
function createPerson(name, age, height, address) {
  var obj = {};
  obj.name = name;
  obj.age = age;
  obj.height = height;
  obj.address = address;
  obj.eating = function() {
    console.log(this.name + '在吃东西');
  };
  obj.running = function() {
    console.log(this.name + '在跑步');
  }

  return obj;
}

var p1 = createPerson('张三', 21, 1.88, "北京市");
var p2 = createPerson('李四', 18, 1.98, "上海市");
var p3 = createPerson('王五', 20, 1.78, "广州市");
console.log(p1, p2, p3);
```

* 缺点：**工厂模式创建出来的对象都是Object类型**，**没有更加具体明确(更进一步)的分类**,如createDog也是按照这样的方法来创建,实际应该做一个区分

### 构造函数创建对象(new、原型)

* 使用**构造函数创建对象**时，**可以对创建出来的对象进行一个分类**，如下面代码的Person函数就通过new创建了以Person为分类的对象
* 如果**一个函数被使用new操作符调用**了，那么会执行以下操作(**重要!!!**

1. **在内存中创建一个新的空对象；**
2. **这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；**
3. **构造函数内部的this，会指向新创建出来的对象；**
4. **执行函数的内部代码；**
5. **如果构造函数没有返回非空对象，则返回创建出来的新对象；**

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;

  this.eating = function() {
    console.log(this.name + '在吃东西');
  };
  this.running = function() {
    console.log(this.name + '在跑步');
  }
}

var p1 = new Person("zjf", 21, 1.9, "广州市");
console.log(p1);
// 重点！！
console.log(p1.__proto__ === Person.prototype); // true
```

### 原型的理解

1. **对象原型定义：我们每个对象中都有一个 [[prototype]], 这个属性可以称之为对象的原型(隐式原型)**

```js
var obj = {
  name: 'zjf'
}
var info = {}

console.log(obj.__proto__);
console.log(info.__proto__);

var obj = {
  name: 'why',
  __proto__: { age: 18 }
}
console.log(Object.getPrototypeOf(obj)); // 获取对象原型__proto__

// 原型的作用
// 当我们从一个对象中获取某一个属性时，它会触发[[get]]操作
// 1.首先会在当前对象中去查找对应的属性，如果找到就会直接使用
// 2.如果没有找到，就会沿着它的原型去找

// obj.__proto__.age = 18;
console.log(obj.age);
```

2. **函数原型**：**函数也相当于一个对象**，**有相应的__proto__属性**，但是**比普通对象多一个显式对象prototype**，在**函数定义时prototype对应的原型对象也已经指定**

![T0lvVS.png](https://s4.ax1x.com/2021/12/26/T0lvVS.png)

```js
function foo() {

}

var p1 = new foo();
var p2 = new foo();

console.log(p1.__proto__ === foo.prototype); // true
console.log(p2.__proto__ === foo.prototype); // true

p1.__proto__.name = 'zjf';
p1.name = 'why';
console.log(p1.name);
console.log(p2.name);
```

3. **函数原型上的属性**

```js
// 函数原型修改
foo.prototype = { // 重新指定新的原型对象
  name: 'zjf',
  age: 21,
  height: 1.9
}

var p1 = new foo();
console.log(p1.name);
console.log(p1.age);

Object.defineProperty(foo.prototype, "constructor", { // 添加并配置新原型对象的constructor属性
  enumerable: false,
  configurable: true,
  writable: true,
  value: foo
})

console.log(foo.prototype.constructor);
```

### 原型+构造函数方案创建对象

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;
}
// 通用的方法定义在构造器的原型对象上，让对象通过__proto__属性获取对于的方法，减少代码冗余
Person.prototype.eating = function() {
  console.log(this.name + "在吃东西~");
}
Person.prototype.runing = function() {
  console.log(this.name + "在跑步~");
}

var p1 = new Person('why', 18, 1.88, "广州市");
console.log(p1.name);
console.log(p1.age);
console.log(p1.height);
console.log(p1.address);
p1.eating();
p1.runing();
```

## 原型链


* **究极奥义图**

![TDs2EF.jpg](https://s4.ax1x.com/2021/12/27/TDs2EF.jpg)


* **从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上获取**

```js
var obj = { 
  name: 'zjf',
  age: 21
}

obj.__proto__ = { // 对象内找不到address属性，则去对象的原型上找
  // address: '北京市'
}

obj.__proto__.__proto__ = { // 对象的原型上找不到，则取对象原型的原型上找
  // address: '北京市'
}
// = { } 相当于new Object,创建出来的对象的__proto__指向Object的原型对象
obj.__proto__.__proto__.__proto__ = {
  address: '北京市'
}

console.log(obj.address);
```

* **顶层原型**
  * **如上图所示：顶层原型即为Object函数的原型对象，也是其他对象构造器的原型对象的__proto__所指**

* **顶层原型的**__proto__**所指为null(因为是顶层，所以没有指向的对象)**
* **Object是所有类(函数)的父级，所有类(函数)继承自Object**

```js
function Person() {

}

var p1 = new Person();

console.log(p1.__proto__.constructor);

console.log(Person.prototype.__proto__); // 顶层原型：[Object: null prototype] {},说明Person继承自Object

console.log(Object.getOwnPropertyDescriptors(Object.prototype));
```

## 对象的继承方案

1. **借用函数的继承方案**

   **奥义图**

![TDf3mn.jpg](https://s4.ax1x.com/2021/12/27/TDf3mn.jpg)

```js
function Person(name, age, friends) {
  this.name = name; // 将被借用的公共属性
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + " 在吃东西");
}

function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends); // 借用Person函数的定义属性
  this.sno = sno;
}

var p = new Person();
Student.prototype = p; // 继承实现复用公共函数的原型方法，prototype转移,多出一个对象

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ['why'], 123)
console.log(stu); // Person { name: 'zjf', age: 21, friends: [ 'why' ], sno: 123 }
stu.eating(); // zjf 在吃东西

// 借用构造函数的弊端
// 1.Person构造函数至少被调用了两次(new, Person.call() )
// 2.stu的原型上会多出一些属性，但是这些属性是没有必要存在的，因为借用构造函数创建的对象里已有相应的属性存在
// 已经不需要通过__proto__来访问属性了(部分方法还是要通过__proto__来访问的)
```

2. **原型赋值方案**(不推荐使用!!!)

```js
Student.prototype = Person.prototype;

// 弊端：Student函数将和Person函数共用一个原型对象，不是公共函数的函数添加方法的时候，会直接添加在Person函数的原型上函数Person函数臃肿，内容多
```

3. **寄生组合式继承**

* 为了将Student类的原型对象和Person类的原型对象独立开，重新创建一个新的对象，让这个对象指向Person的原型对象

```js
function createObject(o) { // 指定对象逻辑实现
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) { // 原型对象重新指定
  SubType.prototype = createObject(SuperType.prototype);// 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", {// 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + '在吃东西');
}

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age,friends);
  this.sno = sno;
  this.score = score;
}

inheritPrototype(Student, Person);

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ["why"], 111, 100);

console.log(stu);
stu.eating();
```

4. **重点理解图片**

![Tc1Rb9.jpg](https://s4.ax1x.com/2021/12/29/Tc1Rb9.jpg)

## 对象方法补充

1. **hasOwnProperty**：对象是否有某一个属于自己的属性（不是在原型上的属性）

2. **in/for in**：判断某个属性是否在某个对象或者对象的原型上

```js
var obj = {
  name: 'zjf',
  age: 21
}

var info = Object.create(obj, {
  address: {
    value: '北京市',
    enumerable: true
  }
})

console.log(info); // { address: '北京市' }
console.log(info.__proto__); // { name: 'zjf', age: 21 }
// hasOwnProperty是否在自身对象上,对象属性的判断
console.log(info.hasOwnProperty('address')); // true
console.log(info.hasOwnProperty('name')); // false

// in 操作符 判断属性是否能访问到
console.log("address" in info); // true
console.log('name' in info); // true
```


3. **instanceof**：用于检测某个**对象**，**是否出现在某个实例对象的原型链**上

```js
function createObject(o) {
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype); // 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", { // 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person() {}

function Student() {}

inheritPrototype(Student, Person);
var stu = new Student();

// instance会按照原型链一直往上找,检查某个实例对象是否在原型链上面
console.log(stu instanceof Student); // stu对象属于Student构造函数
console.log(stu instanceof Person); // stu对象也属于Person构造函数
console.log(stu instanceof Object); // Person原型对象__proto__指向Object的原型对象
```


4. **isPrototypeOf**：用于检测构造函数的pototype，是否出现在某个实例对象的原型链上

```js
var obj = {
  name: 'zjf',
  age: 21
}

// isPrototypeOf是判断对象所指的
console.log(obj instanceof Object); // true
console.log(Object.prototype.isPrototypeOf(obj)); // true

var info = Object.create(obj);
console.log(obj.isPrototypeOf(info)); // true
```

## ES6类的使用

1. class**定义类的方式**

* **类本质上是之前的构造函数、原型链的语法糖**

```js
class Person {

}

// 类的特点
console.log(Person.prototype); // {}
console.log(Person.prototype.__proto__); // [Object: null prototype]
console.log(Person.prototype.constructor); // [class Person]
console.log(typeof Person); // function

var p = new Person();
console.log(p.__proto__ === Person.prototype); // true
```

2.  **class的构造方法**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var p1 = new Person('zjf', 21);
var p2 = new Person('why', 18);

console.log(p1);
console.log(p2);
```

3. **class方法相关**

```js
var names = ['zjf', 'why', 'has'];
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = '北京市';
  }
  // 普通实例方法
  eating() { // 直接会在类的原型上定义方法
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  // 类的访问器方法
  get address() {
    return this._address;
  }

  set address(newValue) {
    this._address = newValue;
  }
  // 类的静态方法,静态方法是放在Person内的
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length);
    var name = names[nameIndex];
    var age = Math.floor(Math.random() * 100);
    return new Person(name, age);
  }
}

var p = new Person('zjf', 21);
p.eating();
p.running();
console.log(p.address); // 北京市

console.log(Object.getOwnPropertyDescriptors(Person.prototype)); // constructor,eating,running

for( var i = 0; i< 10; i++ ) {
  console.log(Person.randomPerson());
}
```

4. **继承实现**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  personMethod() {
    console.log('处理逻辑一');
    console.log('处理逻辑二');
    console.log('处理逻辑三');
  }

  static staticMethod() {
    console.log('Person staticMethod');
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age); // 有extends继承存在，就必须要调用super();
    this.sno = sno;
  }

  studying() {
    console.log(this.name + '在学习');
  }
  // 方法重写1
  running() {
    console.log('子类调用running方法，重写');
  }
  // 方法重写2
  personMethod() {
    super.personMethod(); // 逻辑复用，方法重写
    console.log('处理逻辑四');
    console.log('处理逻辑五');
  }

  static staticMethod() {
    super.staticMethod();
    console.log('Student staticMethod');
  }
}

var stu = new Student('zjf', 21, 111);
console.log(stu);
stu.eating();
stu.running();
stu.personMethod();
Student.staticMethod();

console.log(Object.getOwnPropertyDescriptors(Person));
```

5. **JS实现mixin混入效果**

* **JavaScript的类只支持单继承**：也就是**只能有一个父类**

```js
class Person {
  person() {
    console.log('person');
  }
}

function mixinRunner(superClass) {
  return class extends superClass {
    running() {
      console.log('running');
    }
  }
}

function mixinEating(superClass) {
  return class extends superClass {
    eating() {
      console.log('eating');
    }
  }
}

class Student extends Person {
  studying() {
    console.log('studying');
  }
}
// mixinEating继承自mixinRunner,mixinRunner继承自Student,Student继承自Person
var newStudent = mixinEating(mixinRunner(Student));
var stu = new newStudent();
stu.person();
stu.studying();
stu.running();
stu.eating();
```

## 多态

* **不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。**

```tsx
class Shape {
  getArea() {

  }
}

class Rectangle extends Shape {
  getArea() {
    return 100;
  }
}

class Circle extends Shape {
  getArea() {
    return 1000;
  }
}

var r = new Rectangle();
var c = new Circle();

function foo(shape:Shape) {
  shape.getArea();
}

foo(r);
foo(c);
export {}
```

## class的valueOf(类实例的比较)

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  valueOf() {
    return this.age
  }
}

// 创建Person对象
const p1 = new Person("why", 18)
const p2 = new Person("kobe", 31)

console.log(p1 < p2)

const p3 = new Person("james", 26)
console.log(p2 < p3) // false
console.log(p2 > p3) // true

const p4 = new Person("curry", 26)

// valueOf用于比较大于小于，不能用于实例间的==，===，实际上两个不同的实例对象也不会相等
console.log(p3 == p4) // false

```

## 实例as的用法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
doublyNode.prev?.prev;
doublyNode.next?.prev; // 报错
(doublyNode.next as DoublyNode<string>).prev // 正确
```

第二种处理办法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
  next: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
```







/* 

* 该篇博客由本人归纳自coderwhy JS高级进阶PPT(.pdf)，coderwhy yyds!!!

*/

## 概念

* JavaScript其实支持多种编程范式的，包括**函数式编程**和**面向对象编程**：
  * JavaScript中的对象被设计成一组属性的无序集合，像是一个**哈希表**，有**key和value**组成；

* **创建对象的两种方式**

```js
// 1.new Object()
var obj = new Object();
obj.name = 'zjf';
obj.age = 21;
obj.running = function() {
  console.log('runing~');
}

// 2.字面量创建
var obj1 = {
  name: 'why',
  age: 18,
  eating: function() {
    console.log('eating');
  }
}
console.log(obj, obj1);
```

* **对属性操作的简单控制**

```js
var obj = {
  name: 'zjf',
  age: 21
}

console.log(obj.name);

obj.name = 'why';
console.log(obj.name); // {name: 'zjf', age: 21}

delete obj.name;
console.log(obj); // { age: 21 }
```

### Object.defineProperty

* Object.defineProperty() 方法会直接在一个对象上**定义一个新属性**，**或者修改一个对象的现有属性**，并返回此对象。
* 接收三个参数
  * obj要定义属性的对象；
  * prop要定义或修改的属性的名称或 Symbol；
  * descriptor要定义或修改的属性描述符；

```js
var obj = {
  name: 'zjf',
  age: 21,
  eating: function() {
    console.log(this.name + 'is running');
  }
}

Object.defineProperty(obj, "height", { // 数据属性描述符
  value: 1.9
})
console.log(obj); // { name: 'zjf', age: 21, eating: [Function: eating] } 实际没有打印出height属性
console.log(obj.height); // 1.9
```

* **数据属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21
}
// 数据属性描述符
Object.defineProperty(obj, "address", { // (增)
  value: '北京',
  // 是否可写入(改)
  writable: false,
  // 配置特性(不可删除，不可重新定义)(删)
  configurable: false, 
  // 配置对应的特性是否可以枚举(查)
  enumerable: true, // 若enumerable为false则在node终端不显示，但是在浏览器会显示为灰色
})

delete obj.address;
console.log(obj.address); // 未被删除
obj.address = '上海';
console.log(obj.address);
console.log(Object.keys(obj)); // ['name', 'age']

for(var key in obj) {
  console.log(key);
}
```

* **存取属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21,
  _address: '北京'
}

// 存取属性描述符
// 1.隐藏某一个私有属性被希望直接被外界使用和赋值
// 2.如果我们希望截获某一个属性他访问核设置值的过程时，也会使用存储属性描述符
// 3.属性拦截也是vue2实现响应式的原理，将inputValue同set方法结合起来
Object.defineProperty(obj, "address", {
  configurable: true,
  enumerable: true,
  set: function(value) {
    bar();
    this._address = value;
  },
  get: function() {
    foo();
    return this._address;
  }
})

console.log(obj.address);
obj.address = '上海';
console.log(obj.address);

function foo() {
  console.log('获取了address的值');
}
function bar() {
  console.log('设置了address的值');
}
```

* **定义多个属性描述符**

```js
var obj = {
  _age: 18,
  // get age() {  // 一种存取属性描述符的写法
  //   return this._age;
  // },
  // set age(value) {
  //   this._age = value;
  // }
};

Object.defineProperties(obj, { // 对象定义多个属性
  name: { // 数据属性描述符
    value: 'zjf',
    writable: true,
    configurable: true,
    enumerable: true
  },
  age: { // 存取属性描述符
    configurable: true,
    enumerable: true,
    get() {
      return this._age;
    },
    set(value) {
      this._age = value;
    }
  }
})

console.log(obj);
obj.age = 21;
console.log(obj.age);
```

* **属性操作补充**

```js
var obj = {
  name: 'zjf',
  age: 21
}

Object.preventExtensions(obj); // 阻止扩展

obj.address = "广州";
obj.height = 1.9;

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

console.log(obj);

// 禁止对象配置、删除里面的属性
for (var key in obj) { // 1
  Object.defineProperty(obj, key, {
    configurable: false,
    enumerable: true,
    writable: true,
    value: obj[key]
  })
}
// 禁止对象配置、删除里面的属性
Object.seal(obj); // 2

// 禁止对象修改里面的属性
Object.freeze(obj);

obj.name = 'zzjf';

delete obj.name;
console.log(obj);

```

## 构造器、原型

### 创建多个对象的方案(工厂模式)

* 通常会有一个工厂方法，通过该方法可以产生想要的对象

```js
function createPerson(name, age, height, address) {
  var obj = {};
  obj.name = name;
  obj.age = age;
  obj.height = height;
  obj.address = address;
  obj.eating = function() {
    console.log(this.name + '在吃东西');
  };
  obj.running = function() {
    console.log(this.name + '在跑步');
  }

  return obj;
}

var p1 = createPerson('张三', 21, 1.88, "北京市");
var p2 = createPerson('李四', 18, 1.98, "上海市");
var p3 = createPerson('王五', 20, 1.78, "广州市");
console.log(p1, p2, p3);
```

* 缺点：**工厂模式创建出来的对象都是Object类型**，**没有更加具体明确(更进一步)的分类**,如createDog也是按照这样的方法来创建,实际应该做一个区分

### 构造函数创建对象(new、原型)

* 使用**构造函数创建对象**时，**可以对创建出来的对象进行一个分类**，如下面代码的Person函数就通过new创建了以Person为分类的对象
* 如果**一个函数被使用new操作符调用**了，那么会执行以下操作(**重要!!!**

1. **在内存中创建一个新的空对象；**
2. **这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；**
3. **构造函数内部的this，会指向新创建出来的对象；**
4. **执行函数的内部代码；**
5. **如果构造函数没有返回非空对象，则返回创建出来的新对象；**

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;

  this.eating = function() {
    console.log(this.name + '在吃东西');
  };
  this.running = function() {
    console.log(this.name + '在跑步');
  }
}

var p1 = new Person("zjf", 21, 1.9, "广州市");
console.log(p1);
// 重点！！
console.log(p1.__proto__ === Person.prototype); // true
```

### 原型的理解

1. **对象原型定义：我们每个对象中都有一个 [[prototype]], 这个属性可以称之为对象的原型(隐式原型)**

```js
var obj = {
  name: 'zjf'
}
var info = {}

console.log(obj.__proto__);
console.log(info.__proto__);

var obj = {
  name: 'why',
  __proto__: { age: 18 }
}
console.log(Object.getPrototypeOf(obj)); // 获取对象原型__proto__

// 原型的作用
// 当我们从一个对象中获取某一个属性时，它会触发[[get]]操作
// 1.首先会在当前对象中去查找对应的属性，如果找到就会直接使用
// 2.如果没有找到，就会沿着它的原型去找

// obj.__proto__.age = 18;
console.log(obj.age);
```

2. **函数原型**：**函数也相当于一个对象**，**有相应的__proto__属性**，但是**比普通对象多一个显式对象prototype**，在**函数定义时prototype对应的原型对象也已经指定**

![T0lvVS.png](https://s4.ax1x.com/2021/12/26/T0lvVS.png)

```js
function foo() {

}

var p1 = new foo();
var p2 = new foo();

console.log(p1.__proto__ === foo.prototype); // true
console.log(p2.__proto__ === foo.prototype); // true

p1.__proto__.name = 'zjf';
p1.name = 'why';
console.log(p1.name);
console.log(p2.name);
```

3. **函数原型上的属性**

```js
// 函数原型修改
foo.prototype = { // 重新指定新的原型对象
  name: 'zjf',
  age: 21,
  height: 1.9
}

var p1 = new foo();
console.log(p1.name);
console.log(p1.age);

Object.defineProperty(foo.prototype, "constructor", { // 添加并配置新原型对象的constructor属性
  enumerable: false,
  configurable: true,
  writable: true,
  value: foo
})

console.log(foo.prototype.constructor);
```

### 原型+构造函数方案创建对象

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;
}
// 通用的方法定义在构造器的原型对象上，让对象通过__proto__属性获取对于的方法，减少代码冗余
Person.prototype.eating = function() {
  console.log(this.name + "在吃东西~");
}
Person.prototype.runing = function() {
  console.log(this.name + "在跑步~");
}

var p1 = new Person('why', 18, 1.88, "广州市");
console.log(p1.name);
console.log(p1.age);
console.log(p1.height);
console.log(p1.address);
p1.eating();
p1.runing();
```

## 原型链


* **究极奥义图**

![TDs2EF.jpg](https://s4.ax1x.com/2021/12/27/TDs2EF.jpg)


* **从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上获取**

```js
var obj = { 
  name: 'zjf',
  age: 21
}

obj.__proto__ = { // 对象内找不到address属性，则去对象的原型上找
  // address: '北京市'
}

obj.__proto__.__proto__ = { // 对象的原型上找不到，则取对象原型的原型上找
  // address: '北京市'
}
// = { } 相当于new Object,创建出来的对象的__proto__指向Object的原型对象
obj.__proto__.__proto__.__proto__ = {
  address: '北京市'
}

console.log(obj.address);
```

* **顶层原型**
  * **如上图所示：顶层原型即为Object函数的原型对象，也是其他对象构造器的原型对象的__proto__所指**

* **顶层原型的**__proto__**所指为null(因为是顶层，所以没有指向的对象)**
* **Object是所有类(函数)的父级，所有类(函数)继承自Object**

```js
function Person() {

}

var p1 = new Person();

console.log(p1.__proto__.constructor);

console.log(Person.prototype.__proto__); // 顶层原型：[Object: null prototype] {},说明Person继承自Object

console.log(Object.getOwnPropertyDescriptors(Object.prototype));
```

## 对象的继承方案

1. **借用函数的继承方案**

   **奥义图**

![TDf3mn.jpg](https://s4.ax1x.com/2021/12/27/TDf3mn.jpg)

```js
function Person(name, age, friends) {
  this.name = name; // 将被借用的公共属性
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + " 在吃东西");
}

function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends); // 借用Person函数的定义属性
  this.sno = sno;
}

var p = new Person();
Student.prototype = p; // 继承实现复用公共函数的原型方法，prototype转移,多出一个对象

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ['why'], 123)
console.log(stu); // Person { name: 'zjf', age: 21, friends: [ 'why' ], sno: 123 }
stu.eating(); // zjf 在吃东西

// 借用构造函数的弊端
// 1.Person构造函数至少被调用了两次(new, Person.call() )
// 2.stu的原型上会多出一些属性，但是这些属性是没有必要存在的，因为借用构造函数创建的对象里已有相应的属性存在
// 已经不需要通过__proto__来访问属性了(部分方法还是要通过__proto__来访问的)
```

2. **原型赋值方案**(不推荐使用!!!)

```js
Student.prototype = Person.prototype;

// 弊端：Student函数将和Person函数共用一个原型对象，不是公共函数的函数添加方法的时候，会直接添加在Person函数的原型上函数Person函数臃肿，内容多
```

3. **寄生组合式继承**

* 为了将Student类的原型对象和Person类的原型对象独立开，重新创建一个新的对象，让这个对象指向Person的原型对象

```js
function createObject(o) { // 指定对象逻辑实现
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) { // 原型对象重新指定
  SubType.prototype = createObject(SuperType.prototype);// 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", {// 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + '在吃东西');
}

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age,friends);
  this.sno = sno;
  this.score = score;
}

inheritPrototype(Student, Person);

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ["why"], 111, 100);

console.log(stu);
stu.eating();
```

4. **重点理解图片**

![Tc1Rb9.jpg](https://s4.ax1x.com/2021/12/29/Tc1Rb9.jpg)

## 对象方法补充

1. **hasOwnProperty**：对象是否有某一个属于自己的属性（不是在原型上的属性）

2. **in/for in**：判断某个属性是否在某个对象或者对象的原型上

```js
var obj = {
  name: 'zjf',
  age: 21
}

var info = Object.create(obj, {
  address: {
    value: '北京市',
    enumerable: true
  }
})

console.log(info); // { address: '北京市' }
console.log(info.__proto__); // { name: 'zjf', age: 21 }
// hasOwnProperty是否在自身对象上,对象属性的判断
console.log(info.hasOwnProperty('address')); // true
console.log(info.hasOwnProperty('name')); // false

// in 操作符 判断属性是否能访问到
console.log("address" in info); // true
console.log('name' in info); // true
```


3. **instanceof**：用于检测某个**对象**，**是否出现在某个实例对象的原型链**上

```js
function createObject(o) {
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype); // 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", { // 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person() {}

function Student() {}

inheritPrototype(Student, Person);
var stu = new Student();

// instance会按照原型链一直往上找,检查某个实例对象是否在原型链上面
console.log(stu instanceof Student); // stu对象属于Student构造函数
console.log(stu instanceof Person); // stu对象也属于Person构造函数
console.log(stu instanceof Object); // Person原型对象__proto__指向Object的原型对象
```


4. **isPrototypeOf**：用于检测构造函数的pototype，是否出现在某个实例对象的原型链上

```js
var obj = {
  name: 'zjf',
  age: 21
}

// isPrototypeOf是判断对象所指的
console.log(obj instanceof Object); // true
console.log(Object.prototype.isPrototypeOf(obj)); // true

var info = Object.create(obj);
console.log(obj.isPrototypeOf(info)); // true
```

## ES6类的使用

1. class**定义类的方式**

* **类本质上是之前的构造函数、原型链的语法糖**

```js
class Person {

}

// 类的特点
console.log(Person.prototype); // {}
console.log(Person.prototype.__proto__); // [Object: null prototype]
console.log(Person.prototype.constructor); // [class Person]
console.log(typeof Person); // function

var p = new Person();
console.log(p.__proto__ === Person.prototype); // true
```

2.  **class的构造方法**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var p1 = new Person('zjf', 21);
var p2 = new Person('why', 18);

console.log(p1);
console.log(p2);
```

3. **class方法相关**

```js
var names = ['zjf', 'why', 'has'];
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = '北京市';
  }
  // 普通实例方法
  eating() { // 直接会在类的原型上定义方法
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  // 类的访问器方法
  get address() {
    return this._address;
  }

  set address(newValue) {
    this._address = newValue;
  }
  // 类的静态方法,静态方法是放在Person内的
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length);
    var name = names[nameIndex];
    var age = Math.floor(Math.random() * 100);
    return new Person(name, age);
  }
}

var p = new Person('zjf', 21);
p.eating();
p.running();
console.log(p.address); // 北京市

console.log(Object.getOwnPropertyDescriptors(Person.prototype)); // constructor,eating,running

for( var i = 0; i< 10; i++ ) {
  console.log(Person.randomPerson());
}
```

4. **继承实现**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  personMethod() {
    console.log('处理逻辑一');
    console.log('处理逻辑二');
    console.log('处理逻辑三');
  }

  static staticMethod() {
    console.log('Person staticMethod');
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age); // 有extends继承存在，就必须要调用super();
    this.sno = sno;
  }

  studying() {
    console.log(this.name + '在学习');
  }
  // 方法重写1
  running() {
    console.log('子类调用running方法，重写');
  }
  // 方法重写2
  personMethod() {
    super.personMethod(); // 逻辑复用，方法重写
    console.log('处理逻辑四');
    console.log('处理逻辑五');
  }

  static staticMethod() {
    super.staticMethod();
    console.log('Student staticMethod');
  }
}

var stu = new Student('zjf', 21, 111);
console.log(stu);
stu.eating();
stu.running();
stu.personMethod();
Student.staticMethod();

console.log(Object.getOwnPropertyDescriptors(Person));
```

5. **JS实现mixin混入效果**

* **JavaScript的类只支持单继承**：也就是**只能有一个父类**

```js
class Person {
  person() {
    console.log('person');
  }
}

function mixinRunner(superClass) {
  return class extends superClass {
    running() {
      console.log('running');
    }
  }
}

function mixinEating(superClass) {
  return class extends superClass {
    eating() {
      console.log('eating');
    }
  }
}

class Student extends Person {
  studying() {
    console.log('studying');
  }
}
// mixinEating继承自mixinRunner,mixinRunner继承自Student,Student继承自Person
var newStudent = mixinEating(mixinRunner(Student));
var stu = new newStudent();
stu.person();
stu.studying();
stu.running();
stu.eating();
```

## 多态

* **不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。**

```tsx
class Shape {
  getArea() {

  }
}

class Rectangle extends Shape {
  getArea() {
    return 100;
  }
}

class Circle extends Shape {
  getArea() {
    return 1000;
  }
}

var r = new Rectangle();
var c = new Circle();

function foo(shape:Shape) {
  shape.getArea();
}

foo(r);
foo(c);
export {}
```

## class的valueOf(类实例的比较)

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  valueOf() {
    return this.age
  }
}

// 创建Person对象
const p1 = new Person("why", 18)
const p2 = new Person("kobe", 31)

console.log(p1 < p2)

const p3 = new Person("james", 26)
console.log(p2 < p3) // false
console.log(p2 > p3) // true

const p4 = new Person("curry", 26)

// valueOf用于比较大于小于，不能用于实例间的==，===，实际上两个不同的实例对象也不会相等
console.log(p3 == p4) // false

```

## 实例as的用法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
doublyNode.prev?.prev;
doublyNode.next?.prev; // 报错
(doublyNode.next as DoublyNode<string>).prev // 正确
```

第二种处理办法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
  next: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
```







/* 

* 该篇博客由本人归纳自coderwhy JS高级进阶PPT(.pdf)，coderwhy yyds!!!

*/

## 概念

* JavaScript其实支持多种编程范式的，包括**函数式编程**和**面向对象编程**：
  * JavaScript中的对象被设计成一组属性的无序集合，像是一个**哈希表**，有**key和value**组成；

* **创建对象的两种方式**

```js
// 1.new Object()
var obj = new Object();
obj.name = 'zjf';
obj.age = 21;
obj.running = function() {
  console.log('runing~');
}

// 2.字面量创建
var obj1 = {
  name: 'why',
  age: 18,
  eating: function() {
    console.log('eating');
  }
}
console.log(obj, obj1);
```

* **对属性操作的简单控制**

```js
var obj = {
  name: 'zjf',
  age: 21
}

console.log(obj.name);

obj.name = 'why';
console.log(obj.name); // {name: 'zjf', age: 21}

delete obj.name;
console.log(obj); // { age: 21 }
```

### Object.defineProperty

* Object.defineProperty() 方法会直接在一个对象上**定义一个新属性**，**或者修改一个对象的现有属性**，并返回此对象。
* 接收三个参数
  * obj要定义属性的对象；
  * prop要定义或修改的属性的名称或 Symbol；
  * descriptor要定义或修改的属性描述符；

```js
var obj = {
  name: 'zjf',
  age: 21,
  eating: function() {
    console.log(this.name + 'is running');
  }
}

Object.defineProperty(obj, "height", { // 数据属性描述符
  value: 1.9
})
console.log(obj); // { name: 'zjf', age: 21, eating: [Function: eating] } 实际没有打印出height属性
console.log(obj.height); // 1.9
```

* **数据属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21
}
// 数据属性描述符
Object.defineProperty(obj, "address", { // (增)
  value: '北京',
  // 是否可写入(改)
  writable: false,
  // 配置特性(不可删除，不可重新定义)(删)
  configurable: false, 
  // 配置对应的特性是否可以枚举(查)
  enumerable: true, // 若enumerable为false则在node终端不显示，但是在浏览器会显示为灰色
})

delete obj.address;
console.log(obj.address); // 未被删除
obj.address = '上海';
console.log(obj.address);
console.log(Object.keys(obj)); // ['name', 'age']

for(var key in obj) {
  console.log(key);
}
```

* **存取属性描述符**

```js
var obj = {
  name: 'zjf',
  age: 21,
  _address: '北京'
}

// 存取属性描述符
// 1.隐藏某一个私有属性被希望直接被外界使用和赋值
// 2.如果我们希望截获某一个属性他访问核设置值的过程时，也会使用存储属性描述符
// 3.属性拦截也是vue2实现响应式的原理，将inputValue同set方法结合起来
Object.defineProperty(obj, "address", {
  configurable: true,
  enumerable: true,
  set: function(value) {
    bar();
    this._address = value;
  },
  get: function() {
    foo();
    return this._address;
  }
})

console.log(obj.address);
obj.address = '上海';
console.log(obj.address);

function foo() {
  console.log('获取了address的值');
}
function bar() {
  console.log('设置了address的值');
}
```

* **定义多个属性描述符**

```js
var obj = {
  _age: 18,
  // get age() {  // 一种存取属性描述符的写法
  //   return this._age;
  // },
  // set age(value) {
  //   this._age = value;
  // }
};

Object.defineProperties(obj, { // 对象定义多个属性
  name: { // 数据属性描述符
    value: 'zjf',
    writable: true,
    configurable: true,
    enumerable: true
  },
  age: { // 存取属性描述符
    configurable: true,
    enumerable: true,
    get() {
      return this._age;
    },
    set(value) {
      this._age = value;
    }
  }
})

console.log(obj);
obj.age = 21;
console.log(obj.age);
```

* **属性操作补充**

```js
var obj = {
  name: 'zjf',
  age: 21
}

Object.preventExtensions(obj); // 阻止扩展

obj.address = "广州";
obj.height = 1.9;

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

console.log(obj);

// 禁止对象配置、删除里面的属性
for (var key in obj) { // 1
  Object.defineProperty(obj, key, {
    configurable: false,
    enumerable: true,
    writable: true,
    value: obj[key]
  })
}
// 禁止对象配置、删除里面的属性
Object.seal(obj); // 2

// 禁止对象修改里面的属性
Object.freeze(obj);

obj.name = 'zzjf';

delete obj.name;
console.log(obj);

```

## 构造器、原型

### 创建多个对象的方案(工厂模式)

* 通常会有一个工厂方法，通过该方法可以产生想要的对象

```js
function createPerson(name, age, height, address) {
  var obj = {};
  obj.name = name;
  obj.age = age;
  obj.height = height;
  obj.address = address;
  obj.eating = function() {
    console.log(this.name + '在吃东西');
  };
  obj.running = function() {
    console.log(this.name + '在跑步');
  }

  return obj;
}

var p1 = createPerson('张三', 21, 1.88, "北京市");
var p2 = createPerson('李四', 18, 1.98, "上海市");
var p3 = createPerson('王五', 20, 1.78, "广州市");
console.log(p1, p2, p3);
```

* 缺点：**工厂模式创建出来的对象都是Object类型**，**没有更加具体明确(更进一步)的分类**,如createDog也是按照这样的方法来创建,实际应该做一个区分

### 构造函数创建对象(new、原型)

* 使用**构造函数创建对象**时，**可以对创建出来的对象进行一个分类**，如下面代码的Person函数就通过new创建了以Person为分类的对象
* 如果**一个函数被使用new操作符调用**了，那么会执行以下操作(**重要!!!**

1. **在内存中创建一个新的空对象；**
2. **这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；**
3. **构造函数内部的this，会指向新创建出来的对象；**
4. **执行函数的内部代码；**
5. **如果构造函数没有返回非空对象，则返回创建出来的新对象；**

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;

  this.eating = function() {
    console.log(this.name + '在吃东西');
  };
  this.running = function() {
    console.log(this.name + '在跑步');
  }
}

var p1 = new Person("zjf", 21, 1.9, "广州市");
console.log(p1);
// 重点！！
console.log(p1.__proto__ === Person.prototype); // true
```

### 原型的理解

1. **对象原型定义：我们每个对象中都有一个 [[prototype]], 这个属性可以称之为对象的原型(隐式原型)**

```js
var obj = {
  name: 'zjf'
}
var info = {}

console.log(obj.__proto__);
console.log(info.__proto__);

var obj = {
  name: 'why',
  __proto__: { age: 18 }
}
console.log(Object.getPrototypeOf(obj)); // 获取对象原型__proto__

// 原型的作用
// 当我们从一个对象中获取某一个属性时，它会触发[[get]]操作
// 1.首先会在当前对象中去查找对应的属性，如果找到就会直接使用
// 2.如果没有找到，就会沿着它的原型去找

// obj.__proto__.age = 18;
console.log(obj.age);
```

2. **函数原型**：**函数也相当于一个对象**，**有相应的__proto__属性**，但是**比普通对象多一个显式对象prototype**，在**函数定义时prototype对应的原型对象也已经指定**

![T0lvVS.png](https://s4.ax1x.com/2021/12/26/T0lvVS.png)

```js
function foo() {

}

var p1 = new foo();
var p2 = new foo();

console.log(p1.__proto__ === foo.prototype); // true
console.log(p2.__proto__ === foo.prototype); // true

p1.__proto__.name = 'zjf';
p1.name = 'why';
console.log(p1.name);
console.log(p2.name);
```

3. **函数原型上的属性**

```js
// 函数原型修改
foo.prototype = { // 重新指定新的原型对象
  name: 'zjf',
  age: 21,
  height: 1.9
}

var p1 = new foo();
console.log(p1.name);
console.log(p1.age);

Object.defineProperty(foo.prototype, "constructor", { // 添加并配置新原型对象的constructor属性
  enumerable: false,
  configurable: true,
  writable: true,
  value: foo
})

console.log(foo.prototype.constructor);
```

### 原型+构造函数方案创建对象

```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;
}
// 通用的方法定义在构造器的原型对象上，让对象通过__proto__属性获取对于的方法，减少代码冗余
Person.prototype.eating = function() {
  console.log(this.name + "在吃东西~");
}
Person.prototype.runing = function() {
  console.log(this.name + "在跑步~");
}

var p1 = new Person('why', 18, 1.88, "广州市");
console.log(p1.name);
console.log(p1.age);
console.log(p1.height);
console.log(p1.address);
p1.eating();
p1.runing();
```

## 原型链


* **究极奥义图**

![TDs2EF.jpg](https://s4.ax1x.com/2021/12/27/TDs2EF.jpg)


* **从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上获取**

```js
var obj = { 
  name: 'zjf',
  age: 21
}

obj.__proto__ = { // 对象内找不到address属性，则去对象的原型上找
  // address: '北京市'
}

obj.__proto__.__proto__ = { // 对象的原型上找不到，则取对象原型的原型上找
  // address: '北京市'
}
// = { } 相当于new Object,创建出来的对象的__proto__指向Object的原型对象
obj.__proto__.__proto__.__proto__ = {
  address: '北京市'
}

console.log(obj.address);
```

* **顶层原型**
  * **如上图所示：顶层原型即为Object函数的原型对象，也是其他对象构造器的原型对象的__proto__所指**

* **顶层原型的**__proto__**所指为null(因为是顶层，所以没有指向的对象)**
* **Object是所有类(函数)的父级，所有类(函数)继承自Object**

```js
function Person() {

}

var p1 = new Person();

console.log(p1.__proto__.constructor);

console.log(Person.prototype.__proto__); // 顶层原型：[Object: null prototype] {},说明Person继承自Object

console.log(Object.getOwnPropertyDescriptors(Object.prototype));
```

## 对象的继承方案

1. **借用函数的继承方案**

   **奥义图**

![TDf3mn.jpg](https://s4.ax1x.com/2021/12/27/TDf3mn.jpg)

```js
function Person(name, age, friends) {
  this.name = name; // 将被借用的公共属性
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + " 在吃东西");
}

function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends); // 借用Person函数的定义属性
  this.sno = sno;
}

var p = new Person();
Student.prototype = p; // 继承实现复用公共函数的原型方法，prototype转移,多出一个对象

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ['why'], 123)
console.log(stu); // Person { name: 'zjf', age: 21, friends: [ 'why' ], sno: 123 }
stu.eating(); // zjf 在吃东西

// 借用构造函数的弊端
// 1.Person构造函数至少被调用了两次(new, Person.call() )
// 2.stu的原型上会多出一些属性，但是这些属性是没有必要存在的，因为借用构造函数创建的对象里已有相应的属性存在
// 已经不需要通过__proto__来访问属性了(部分方法还是要通过__proto__来访问的)
```

2. **原型赋值方案**(不推荐使用!!!)

```js
Student.prototype = Person.prototype;

// 弊端：Student函数将和Person函数共用一个原型对象，不是公共函数的函数添加方法的时候，会直接添加在Person函数的原型上函数Person函数臃肿，内容多
```

3. **寄生组合式继承**

* 为了将Student类的原型对象和Person类的原型对象独立开，重新创建一个新的对象，让这个对象指向Person的原型对象

```js
function createObject(o) { // 指定对象逻辑实现
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) { // 原型对象重新指定
  SubType.prototype = createObject(SuperType.prototype);// 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", {// 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.eating = function() {
  console.log(this.name + '在吃东西');
}

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age,friends);
  this.sno = sno;
  this.score = score;
}

inheritPrototype(Student, Person);

Student.prototype.studying = function() {
  console.log(this.name + "在学习");
}

var stu = new Student('zjf', 21, ["why"], 111, 100);

console.log(stu);
stu.eating();
```

4. **重点理解图片**

![Tc1Rb9.jpg](https://s4.ax1x.com/2021/12/29/Tc1Rb9.jpg)

## 对象方法补充

1. **hasOwnProperty**：对象是否有某一个属于自己的属性（不是在原型上的属性）

2. **in/for in**：判断某个属性是否在某个对象或者对象的原型上

```js
var obj = {
  name: 'zjf',
  age: 21
}

var info = Object.create(obj, {
  address: {
    value: '北京市',
    enumerable: true
  }
})

console.log(info); // { address: '北京市' }
console.log(info.__proto__); // { name: 'zjf', age: 21 }
// hasOwnProperty是否在自身对象上,对象属性的判断
console.log(info.hasOwnProperty('address')); // true
console.log(info.hasOwnProperty('name')); // false

// in 操作符 判断属性是否能访问到
console.log("address" in info); // true
console.log('name' in info); // true
```


3. **instanceof**：用于检测某个**对象**，**是否出现在某个实例对象的原型链**上

```js
function createObject(o) {
  function Fn() {};
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype); // 重新创建一个空对象，指向Person.prototype
  Object.defineProperty(SubType.prototype, "constructor", { // 定义新对象的constructor属性，指向子类
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person() {}

function Student() {}

inheritPrototype(Student, Person);
var stu = new Student();

// instance会按照原型链一直往上找,检查某个实例对象是否在原型链上面
console.log(stu instanceof Student); // stu对象属于Student构造函数
console.log(stu instanceof Person); // stu对象也属于Person构造函数
console.log(stu instanceof Object); // Person原型对象__proto__指向Object的原型对象
```


4. **isPrototypeOf**：用于检测构造函数的pototype，是否出现在某个实例对象的原型链上

```js
var obj = {
  name: 'zjf',
  age: 21
}

// isPrototypeOf是判断对象所指的
console.log(obj instanceof Object); // true
console.log(Object.prototype.isPrototypeOf(obj)); // true

var info = Object.create(obj);
console.log(obj.isPrototypeOf(info)); // true
```

## ES6类的使用

1. class**定义类的方式**

* **类本质上是之前的构造函数、原型链的语法糖**

```js
class Person {

}

// 类的特点
console.log(Person.prototype); // {}
console.log(Person.prototype.__proto__); // [Object: null prototype]
console.log(Person.prototype.constructor); // [class Person]
console.log(typeof Person); // function

var p = new Person();
console.log(p.__proto__ === Person.prototype); // true
```

2.  **class的构造方法**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

var p1 = new Person('zjf', 21);
var p2 = new Person('why', 18);

console.log(p1);
console.log(p2);
```

3. **class方法相关**

```js
var names = ['zjf', 'why', 'has'];
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this._address = '北京市';
  }
  // 普通实例方法
  eating() { // 直接会在类的原型上定义方法
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  // 类的访问器方法
  get address() {
    return this._address;
  }

  set address(newValue) {
    this._address = newValue;
  }
  // 类的静态方法,静态方法是放在Person内的
  static randomPerson() {
    var nameIndex = Math.floor(Math.random() * names.length);
    var name = names[nameIndex];
    var age = Math.floor(Math.random() * 100);
    return new Person(name, age);
  }
}

var p = new Person('zjf', 21);
p.eating();
p.running();
console.log(p.address); // 北京市

console.log(Object.getOwnPropertyDescriptors(Person.prototype)); // constructor,eating,running

for( var i = 0; i< 10; i++ ) {
  console.log(Person.randomPerson());
}
```

4. **继承实现**

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + '在吃东西');
  }
  running() {
    console.log(this.name + '在跑步');
  }

  personMethod() {
    console.log('处理逻辑一');
    console.log('处理逻辑二');
    console.log('处理逻辑三');
  }

  static staticMethod() {
    console.log('Person staticMethod');
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age); // 有extends继承存在，就必须要调用super();
    this.sno = sno;
  }

  studying() {
    console.log(this.name + '在学习');
  }
  // 方法重写1
  running() {
    console.log('子类调用running方法，重写');
  }
  // 方法重写2
  personMethod() {
    super.personMethod(); // 逻辑复用，方法重写
    console.log('处理逻辑四');
    console.log('处理逻辑五');
  }

  static staticMethod() {
    super.staticMethod();
    console.log('Student staticMethod');
  }
}

var stu = new Student('zjf', 21, 111);
console.log(stu);
stu.eating();
stu.running();
stu.personMethod();
Student.staticMethod();

console.log(Object.getOwnPropertyDescriptors(Person));
```

5. **JS实现mixin混入效果**

* **JavaScript的类只支持单继承**：也就是**只能有一个父类**

```js
class Person {
  person() {
    console.log('person');
  }
}

function mixinRunner(superClass) {
  return class extends superClass {
    running() {
      console.log('running');
    }
  }
}

function mixinEating(superClass) {
  return class extends superClass {
    eating() {
      console.log('eating');
    }
  }
}

class Student extends Person {
  studying() {
    console.log('studying');
  }
}
// mixinEating继承自mixinRunner,mixinRunner继承自Student,Student继承自Person
var newStudent = mixinEating(mixinRunner(Student));
var stu = new newStudent();
stu.person();
stu.studying();
stu.running();
stu.eating();
```

## 多态

* **不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。**

```tsx
class Shape {
  getArea() {

  }
}

class Rectangle extends Shape {
  getArea() {
    return 100;
  }
}

class Circle extends Shape {
  getArea() {
    return 1000;
  }
}

var r = new Rectangle();
var c = new Circle();

function foo(shape:Shape) {
  shape.getArea();
}

foo(r);
foo(c);
export {}
```

## class的valueOf(类实例的比较)

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  valueOf() {
    return this.age
  }
}

// 创建Person对象
const p1 = new Person("why", 18)
const p2 = new Person("kobe", 31)

console.log(p1 < p2)

const p3 = new Person("james", 26)
console.log(p2 < p3) // false
console.log(p2 > p3) // true

const p4 = new Person("curry", 26)

// valueOf用于比较大于小于，不能用于实例间的==，===，实际上两个不同的实例对象也不会相等
console.log(p3 == p4) // false

```

## 实例as的用法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
doublyNode.prev?.prev;
doublyNode.next?.prev; // 报错
(doublyNode.next as DoublyNode<string>).prev // 正确
```

第二种处理办法

```ts
export class Node<T> {
  value: T
  next: Node<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null
  next: DoublyNode<T> | null
}

const doublyNode = new DoublyNode('aaa')
```







/* 

* 该篇博客由本人归纳自coderwhy JS高级进阶PPT(.pdf)，coderwhy yyds!!!

*/
