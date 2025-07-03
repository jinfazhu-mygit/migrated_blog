---
title: 'vue响应式原理(Proxy代理与Reflect反射)'
date: 2022-2-1 16:45:00
permalink: '/posts/blogs/vue响应式原理(Proxy代理与Reflect反射)'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
 - vue响应式原理
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

# Vue响应式原理(Proxy代理与Reflect反射)

## 对象监听

### Object.defineProperty的(存取属性描述)监听对象

```js
const obj = {
  _name: 'zjf',
  age: 21
}

// 监听所有属性
Object.keys(obj).forEach(key => { // 缺点多
  let value = obj[key];
  Object.defineProperty(obj, key, {
    get: function() {
      console.log(`监听到obj的${key}属性被访问`);
      return value;
    },
    set: function(newValue) {
      console.log(`监听到obj的${key}属性被设置值`);
      value = newValue;
    }
  })
})

obj._name = 'why';
obj.age = 22;
console.log(obj._name);
console.log(obj.age);
```

* 缺点
  * 存储数据描述符设计的初衷并不是为了去监听一个完整的对 象
  * 如果我们想监听更加丰富的操作，比如**新增属性**、**删除属性**，那么 Object.defineProperty是无能为力的。

## Proxy的使用

* 在ES6中，新增了一个Proxy类，这个类从名字就可以看出来，是**用于帮助我们创建一个对象代理**的

  * 我们希望**监听一个对象的相关操作**，那么我们可以**先创建一个代理对象（Proxy对象）**；
  * 之后对**该对象的所有操作**，都**通过代理对象来完成**，代理对象**可以监听我们想要对原对象进行哪些操作**；

### **基本使用**

```js
const obj = {
  name: 'zjf',
  age: 21
}

// 创建代理对象objProxy
const objProxy = new Proxy(obj, { // 重写捕获器
  // 获取值时的捕获器
  get: function(target, key) {
    console.log(`监听到对象的${key}属性被访问`, target);
    return target[key];
  },
  // 修改值时的捕获器
  set(target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置`, target);
    target[key] = newValue;
  }
}); // 传入对象和捕获器

console.log(objProxy.name);
console.log(objProxy.age);

objProxy.name = 'why';
objProxy.age = 22;

console.log(obj);
```

### **Proxy的其他捕获器**

```js
const obj = {
  name: 'zjf',
  age: 21
}

const objProxy = new Proxy(obj, { // 重写捕获器
  // 获取值时的捕获器
  get: function(target, key) {
    console.log(`监听到对象的${key}属性被访问`, target);
    return target[key];
  },
  // 修改值时的捕获器
  set(target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置`, target);
    target[key] = newValue;
  },
  // 监听in的捕获器
  has(target, key) {
    console.log(`监听到对象的${key}属性in操作`, target);
    return key in target;
  },
  // 删除捕获器
  deleteProperty: function(target, key) {
    console.log(`监听到对象的${key}属性删除操作`, target);
    delete target[key];
  }
});

console.log('name' in objProxy);
delete objProxy.name;
console.log(obj); // { age: 21 }
```

### **Proxy对函数对象的监听**(**apply和construct捕获器**)

```js
function foo() {

}

const fooProxy = new Proxy(foo, {
  apply: function(target, thisArg, arr) {
    console.log(`对foo函数进行了apply调用`, target, thisArg, arr); // 对foo函数进行了apply调用 [Function: foo] {} [ 1, 2, 3 ]
    return target.apply(thisArg, arr);
  },
  construct: function(target, argArray, newTarget) {
    console.log(`对foo函数进行了new调用`, argArray); // 对foo函数进行了new调用 [ 'abc', 'cba' ]
    return new target(...argArray);
  }
})

fooProxy.apply({}, [1, 2, 3]);
new fooProxy('abc', 'cba');
```

## Proxy结合Reflect的使用

### Reflect的作用

* 它主要提供了很多**操作JavaScript对象的方法**，有点像**Object中操作对象的方法**；

* 比如**Reflect.getPrototypeOf(target)**类似于 **Object.getPrototypeOf()**；

* 如果我们有Object可以做这些操作，那么**为什么还需要有Reflect这样的新增对象呢**？

  * 这是因为在早期的ECMA规范中没有考虑到这种**对 对象本身 的操作如何设计会更加规范**，所以**将这些API放到了Object上面**；

  * 但是**Object作为一个构造函数**，这些操作实际上**放到它身上并不合适**；
  * 另外还包含一些类似于 **in**、**delete**操作符，让JS看起来是会有一些奇怪的；

  * 所以在ES6中新增了**Reflect**，让我们这些操作都集中到了Reflect对象上；

* Object和Reflect对象之间的API关系，可以参考MDN文档：

[比较 Reflect 和 Object 方法 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods)

```js
const obj = {
  name: 'zjf',
  age: 21
}

const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    // return target[key];
    return Reflect.get(target, key); // Reflect反射方式
  },
  set: function(target, key, newValue, receiver) {
    // target[key] = newValue;
    Reflect.set(target, key, newValue);
  }
})

objProxy.name = 'why';
console.log(objProxy.name);
```

### Reflect中**receiver的作用**：
  * **如果我们的源对象（obj）有setter、getter的访问器属性**，那么**可以通过receiver来改变里面的this**；
  * receiver**默认指向的是Proxy代理创建出来的代理对象**

```js
const obj = {
  _name: 'zjf',
  get name() {
    return this._name; // receiver可改变this的指向
  },
  set name(value) {
    this._name = value;
  }
}
// 监听get,set执行过程
const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) { // receiver是创建出来的代理对象objProxy
    console.log('get方法被访问---', key, receiver);
    console.log(receiver === objProxy); // true
    return Reflect.get(target, key, receiver); // 传入receiver,objProxy被访问两次，第一次是objProxy.name,第二次是objProxy._name
  },
  set: function(target, key, newValue, receiver) {
    console.log('set方法被访问---', key, receiver);
    Reflect.set(target, key, newValue, receiver);
  }
})

console.log(objProxy.name);
// objProxy.name = 'why';
```

### **Reflect中construct的作用**

```js
function Student(name, age) {
  this.name = name,
  this.age = age
}

function Teacher() {

}

const stu = new Student('zjf', 21);
console.log(stu); // Student { name: 'zjf', age: 21 }
console.log(stu.__proto__ === Student.prototype); // true

// 执行Student函数中的内容，但是创建出来的对象是Teacher类型
const teacher = Reflect.construct(Student, ['zjf', 21], Teacher);
console.log(teacher); // Teacher { name: 'zjf', age: 21 }
console.log(teacher.__proto__ === Teacher.prototype); // true
```

## vue3响应式原理

* 当对象发生变化，自动执行相应的操作，操作较多，将众多放入函数内；

* 于是响应式就变成，当对象发生变化，自动执行相应的函数；
* 那么如何区分函数是否是响应式执行的呢；
### 响应式函数watchFn实现

```js
// 封装一个响应式的函数
let reactiveArr = [];
function watchFn(fn) {
  reactiveArr.push(fn); // 将需要响应式的函数放入数组中
}

// 对象的响应式
let obj = {
  name: 'zjf',
  age: 22
}

// 对象发生变化需要执行的代码
watchFn(
  function foo() {
    let newName = obj.name;
    console.log(newName);
  }
)
watchFn(
  function demo() {
    console.log('响应式', 'demo----');
  }
)

function bar() {
  console.log('其他的普通函数');
  console.log('这个函数不需要任何的响应式');
}

// 发生变化
obj.name = 'why';
// 执行相应的需要响应的函数
reactiveArr.forEach(fn => { 
  fn();
})
```

* 目前我们收集的依赖是放到一个数组中来保存的，但是这里会存在**数据管理的问题**：
  * 实际开发中需要监听很多对象的响应式;
  * 对象**需要监听的不只是一个属性**，它们**很多属性的变化**，**都会有对应的响应式函数**

### 封装收集类

```js
// 封装收集类
class Depend {
  constructor() {
    this.reactiveFns = [];
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn);
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn();
    })
  }
}

const depend = new Depend();
function watchFn(fn) {
  depend.addDepend(fn);
}

// 对象的响应式
let obj = {
  name: 'zjf', // 一个属性对应一个depend对象
  age: 22 // 一个属性对应一个depend对象
}

// 对象发生变化需要执行的代码
watchFn(
  function foo() {
    let newName = obj.name;
    console.log(newName);
  }
)
watchFn(
  function demo() {
    console.log('响应式', 'demo----');
  }
)

function bar() {
  console.log('其他的普通函数');
  console.log('这个函数不需要任何的响应式');
}

// 发生变化
obj.name = 'why';
depend.notify();
```

* 自动监听对象的变化
  * 方式一：通过 Object.defineProperty的方式（vue2采用的方式）；
  * 方式二：通过new Proxy的方式（vue3采用的方式）；

### 自动监听对象

```js
// 封装收集类
class Depend {
  constructor() {
    this.reactiveFns = [];
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn);
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn();
    })
  }
}

const depend = new Depend();
function watchFn(fn) {
  depend.addDepend(fn);
}

// 对象的响应式
let obj = {
  name: 'zjf', // 一个属性对应一个depend对象
  age: 22 // 一个属性对应一个depend对象
}

// 自动监听对象的属性变化: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver);
    depend.notify(); // 执行监听函数
  }
})

// 对象发生变化需要执行的代码
watchFn(
  function foo() {
    let newName = objProxy.name;
    console.log(newName);
  }
)
watchFn(
  function demo() {
    console.log('响应式', 'demo----');
  }
)

function bar() {
  console.log('其他的普通函数');
  console.log('这个函数不需要任何的响应式');
}

// 发生变化
objProxy.name = 'why';
objProxy.name = 'zhu';
```

* **对象依赖的管理**
* 实际开发中我们会有**不同的对象**，另外会有**不同的属性**需要管理；
* 如何实现**通过对象和相应的key值获取相应的依赖，执行响应式函数**呢；
* 可以通过**WeakMap来指定不同的对象对应不同的map**，再通过**Map和key值来获取相应的depend依赖**

### 对象依赖管理

```js
// 封装收集类
class Depend {
  constructor() {
    this.reactiveFns = [];
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn);
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn();
    })
  }
}
// 封装一个响应式的函数
let activeReactiveFn = null;
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 封装一个获取depend的函数                                                                                 
const targetWeakMap = new WeakMap();
function getDepend(target, key) {
  // 获取target对象对应的map
  let map = targetWeakMap.get(target);
  if(!map) {
    map = new Map();
    targetWeakMap.set(target, map);
  }

  // 通过map中的key获取相应的depend依赖
  let depend = map.get(key);
  if(!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

// 对象的响应式
let obj = {
  name: 'zjf', // 一个属性应该对应一个depend对象
  age: 22 
}

// 自动监听对象的属性变化: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    // 根据target.key获取对应的depend
    const depend = getDepend(target, key); // 正确的收集对象属性depend依赖对应的响应式函数
    depend.addDepend(activeReactiveFn);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver);
    // depend依赖应当通过target,key来进行区分执行,不同的对象,包括相同对象的不同属性执行不同的depend依赖
    const depend = getDepend(target, key); // 获取对象相应属性的依赖
    // console.log(depend.reactiveFns); 
    depend.notify(); // 拿到该依赖对应的函数执行
  }
})

// 对象发生变化需要执行的代码
watchFn(function() {
  console.log(objProxy.name, 'objProxyield.name对应的函数1');
})
watchFn(function() {
  console.log(objProxy.name, 'objProxyield.name对应的函数2');
})
watchFn(function() {
  console.log(objProxy.age, 'objProxyield.age对应的函数1');
})
watchFn(function() {
  console.log(objProxy.age, 'objProxyield.age对应的函数2');
})

console.log('分割线----------分割线');

// 发生变化
objProxy.name = 'why';
// objProxy.age = 'zhu';

/**
zjf objProxyield.name对应的函数1
zjf objProxyield.name对应的函数2
22 objProxyield.age对应的函数1
22 objProxyield.age对应的函数2
分割线----------分割线
why objProxyield.name对应的函数1
why objProxyield.name对应的函数2
 */
```

* **优化**

```js
// 全局收集函数
let activeReactiveFn = null;

// 封装收集类
class Depend {
  constructor() { // 优化二
    this.reactiveFns = new Set(); // 防止重复，防止一个函数被两次添加
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.push(reactiveFn);
  // }
  // 优化一
  depend() {
    if(activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn();
    })
  }
}
// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 封装一个获取depend的函数                                                                                 
const targetWeakMap = new WeakMap();
function getDepend(target, key) {
  // 获取target对象对应的map
  let map = targetWeakMap.get(target);
  if(!map) {
    map = new Map();
    targetWeakMap.set(target, map);
  }

  // 通过map中的key获取相应的depend依赖
  let depend = map.get(key);
  if(!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

// 对象的响应式
let obj = {
  name: 'zjf', // 一个属性应该对应一个depend对象
  age: 22 
}

// 自动监听对象的属性变化: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    // 根据target.key获取对应的depend
    const depend = getDepend(target, key); // 正确的收集对象属性depend依赖对应的响应式函数
    // depend.addDepend(activeReactiveFn);
    depend.depend();
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver);
    // depend依赖应当通过target,key来进行区分执行,不同的对象,包括相同对象的不同属性执行不同的depend依赖
    const depend = getDepend(target, key); // 获取对象相应属性的依赖
    // console.log(depend.reactiveFns); 
    depend.notify(); // 拿到该依赖对应的函数执行
  }
})

// watchFn
watchFn(() => {
  console.log(objProxy.name, '11111111');
  console.log(objProxy.name, '22222222');
})

objProxy.name = 'why';
```

### vue3响应式实现最终方案

```js
// 全局收集函数
let activeReactiveFn = null;

// 封装收集类
class Depend {
  constructor() { // 优化二
    this.reactiveFns = new Set(); // 防止重复，防止一个函数被两次添加
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.push(reactiveFn);
  // }
  // 优化一
  depend() {
    if(activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn();
    })
  }
}
// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 封装一个获取depend的函数                                                                                 
const targetWeakMap = new WeakMap();
function getDepend(target, key) {
  // 获取target对象对应的map
  let map = targetWeakMap.get(target);
  if(!map) {
    map = new Map();
    targetWeakMap.set(target, map);
  }

  // 通过map中的key获取相应的depend依赖
  let depend = map.get(key);
  if(!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}
// 代理封装
function reactive(obj) {
  return new Proxy(obj, {
    get: function(target, key, receiver) {
      // 根据target.key获取对应的depend
      const depend = getDepend(target, key); // 正确的收集对象属性depend依赖对应的响应式函数
      // depend.addDepend(activeReactiveFn);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set: function(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      // depend依赖应当通过target,key来进行区分执行,不同的对象,包括相同对象的不同属性执行不同的depend依赖
      const depend = getDepend(target, key); // 获取对象相应属性的依赖
      // console.log(depend.reactiveFns); 
      depend.notify(); // 拿到该依赖对应的函数执行
    }
  })
}

// 响应式对象
const info = reactive({
  address: '北京市',
  height: 1.9
})

watchFn(() => {
  console.log(info.address);
})

info.address = '上海市';

const foo = reactive({
  name: 'foo'
})
watchFn(() => {
  console.log(foo.name);
})
foo.name = 'bar';
```

### vue2响应式实现方案

```js
// 全局收集函数
let activeReactiveFn = null;

// 封装收集类
class Depend {
  constructor() { // 优化二
    this.reactiveFns = new Set(); // 防止重复，防止一个函数被两次添加
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.push(reactiveFn);
  // }
  // 优化一
  depend() {
    if(activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn();
    })
  }
}
// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 封装一个获取depend的函数                                                                                 
const targetWeakMap = new WeakMap();
function getDepend(target, key) {
  // 获取target对象对应的map
  let map = targetWeakMap.get(target);
  if(!map) {
    map = new Map();
    targetWeakMap.set(target, map);
  }

  // 通过map中的key获取相应的depend依赖
  let depend = map.get(key);
  if(!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}
// 代理封装
function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get: function() {
        const depend = getDepend(obj, key);
        depend.depend();
        return value;
      },
      set: function(newValue) {
        value = newValue;
        const depend = getDepend(obj, key);
        depend.notify();
      }
    })
  })
  return obj;
}

// 响应式对象
const obj = reactive({
  name: 'zjf',
  age: 22
})
watchFn(() => {
  console.log(obj.name);
})
obj.name = 'why';

const info = reactive({
  address: '北京市',
  height: 1.9
})

watchFn(() => {
  console.log(info.address);
})

info.address = '上海市';
```







/* 

* 该博客由本人归纳自 JS高级进阶PPT(.pdf)，coderwhy yyds!!!

*/