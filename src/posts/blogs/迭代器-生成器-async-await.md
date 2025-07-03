---
title: '迭代器-生成器-async-await'
date: 2022-2-14 14:30:00
permalink: '/posts/blogs/迭代器-生成器-async-await'
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

# 迭代器、生成器、async/await

## 迭代器

### 认识迭代器

* 迭代器（iterator），是确使用户可在容器对象（container，例如链表或数组）上遍访的**对象**(通过iterator.next()方法)；
* next方法返回的对象要符合**迭代器协议（iterator protocol）**
  * 一个无参数或者一个参数的函数，返回一个应当**拥有以下两个属性的对象**
  * **done**: 如果迭代器未将序列迭代完毕，返回false,如果将迭代对象迭代完毕，则返回true
  * **value**:迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

```js
// 编写一个迭代器(对象包含一个next方法，方法返回一个对象包含done和value两个属性)
// 数组
const names = ['abc', 'cba', 'nba'];

// 创建一个迭代器对象来访问数组
let index = 0;
const namesIterator = {
  next: function() { // 可不传或传一个参数
    if( index < names.length ) {
      return { done: false, value: names[index++] };
    }else {
      return { done: true, value: undefined };
    }
  }
}

console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());

// 生成迭代器的函数
function createIterator(arr) {
  let index = 0;
  return { // 通过数组返回一个迭代器
    next: function() {
      if(index < arr.length) {
        return { done: false, value: arr[index++] };
      }else {
        return { done: true, value: undefined };
      }
    }
  }
}

const arr1 = ['111', '222', '333'];

const arrIterator = createIterator(arr1);
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());

// 创建一个无限的迭代器
function unlessIterator() {
  let index = 0;
  return {
    next: function() {
      return { done: false, value: index++ };
    }
  }
}
const iteratorUnless = unlessIterator();
console.log(iteratorUnless.next()); // 0
console.log(iteratorUnless.next()); // 1
console.log(iteratorUnless.next()); // 2
```

### 认识可迭代对象

* 当一个对象实现了iteable protocal协议时，他就是一个可迭代对象；
* 这个对象的要求是必须实现@@iterator方法，在代码中我们使用Symbol.iterator访问该属性

* 当一个对象是可迭代对象的时候我们就可以通过for...of...遍历来获取其内部的值

```js
const names = ['asd', 'fgh', 'jkl']; // 创建出来的数组即是一个可迭代对象
console.log(names[Symbol.iterator]); // [Function: values]

const iterator = names[Symbol.iterator](); // 执行可迭代对象的[Symbol.iterator]属性对应的函数时，会返回一个迭代器
console.log(iterator.next()); // { value: 'asd', done: false }
console.log(iterator.next()); // { value: 'fgh', done: false }
console.log(iterator.next()); // { value: 'jkl', done: false }
console.log(iterator.next()); // { value: 'undefined', done: true }

// String/map/set/NodeList也是可迭代对象
const set = new Set();
set.add(10);
set.add(100);
set.add(1000);
for(const item of set) {
  console.log(item);
}

// 函数中的arguments也是可迭代对象
function fun(x, y, z) {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
  console.log(arguments[Symbol.iterator]); // [Function: values]
}
fun(1, 2, 3)
```

* **可迭代对象应用场景**

```js
const iterableObj = { // 可迭代对象的应用场景
  names: ['abc', 'cba', 'nba'],
  [Symbol.iterator]: function() {
    let index = 0;
    return {
      next: () => {
        if(index < this.names.length) {
          return { done: false, value: this.names[index++] };
        }else {
          return { done: true, value: undefined };
        }
      }
    }
  }
}

const names = [ '111', '222', '333' ];
const newNames = [ '444', '555', '666' ];

// 1.for...of...
for(const item of iterableObj) {
  console.log(item);
}

// 2 ...展开语法(obj可以用...展开运算，但用的不是迭代器)
const arr = [...iterableObj, ...newNames];
console.log(arr);

// 3.解构
const [ name1, name2 ] = names;
console.log(name1, name2);

// 4.创建一些其他对象时
const set1 = new Set(iterableObj);
const set2 = new Set(names);

const arr1 = Array.from(iterableObj);

// 5.Promise.all
Promise.all(iterableObj).then(res => {
  console.log(res);
})
```

* **实现自定义类的可迭代性**

```js
class ClassRoom { // 实现类创建出来的对象都是可迭代对象
  constructor(address, name, students) {
    this.address = address,
    this.name = name,
    this.students = students
  }

  entry(newStu) {
    this.students.push(newStu);
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if(index < this.students.length) {
          return { done: false, value: this.students[index++] };
        }else {
          return { done: true, value: undefined };
        }
      },
      return: () => { // 迭代器中断处理
        console.log('迭代器中断了');
        return { done: true, value: undefined };
      }
    }
  }
}

const classroom = new ClassRoom('三栋五楼', '计算机教室', ['why', 'zjf', 'qwe']);
classroom.entry('asd');

for(const stu of classroom) {
  console.log(stu);
  if( stu === 'zjf' ) break; // 迭代器的中断
}
```



## 生成器

### 认识生成器

* 生成器函数
  * 生成器函数也是一个函数，但是和普通的函数有一些区别
  * 生成器函数需要在**function的后面加一个符号：***
  * 生成器函数可以通过**yield关键字来控制函数的执行流程**
  * **生成器函数的返回值是一个Generator（生成器）**
* **生成器是由生成器函数执行所创建出来的**
* **生成器是一种特殊的迭代器**

```js
function* foo() {
  const value1 = 'aaaa';
  console.log('第一段代码执行',value1);
  yield value1; // 给返回的迭代器的value赋值

  const value2 = 'bbbb';
  console.log('第二段代码执行',value2);
  yield value2;

  const value3 = 'cccc';
  console.log('第三段代码执行',value3);
  yield value3;

  console.log('函数执行完毕');
  return 'over'; // return最好在函数最后执行，可给最后生成的迭代器的value赋值
}

const generator = foo();
console.log('返回值1:', generator.next()); // 返回值1: { value: 'aaaa', done: false }
console.log('返回值2:', generator.next()); // 返回值2: { value: 'bbbb', done: false }
console.log('返回值3:', generator.next()); // 返回值3: { value: 'cccc', done: false }
console.log('返回值4:', generator.next()); // 返回值4: { value: 'over', done: true }
```

### 生成器基本使用

* 生成器函数与生成器执行之间的**参数传递**

```js
function* foo(num) {
  const value1 = 100 * num; // 100 * 5
  console.log('第一段代码执行',value1);
  const n = yield value1; // 接参，供下一段代码使用

  const value2 = 200 * n; // 200 * 10
  console.log('第二段代码执行',value2);
  const m = yield value2;

  const value3 = 300 + m; // 300 + 20
  console.log('第三段代码执行',value3);
  yield value3;

  console.log('函数执行完毕');
  return 'over'; // return最好在函数最后执行，可给最后生成的迭代器的value赋值
}

// 1.生成器上的next方法可以传递参数
const generator = foo(5);
console.log(generator.next()); 
console.log(generator.next(10)); // 传参
console.log(generator.next(20));
console.log(generator.next());
```

* **generator.throw**抛出异常

```js
function* foo() {
  const value1 = 100;
  try {
    yield value1;
  } catch (error) {
    console.log('捕获到异常:', error); // 捕获到异常: error message
  }

  const value2 = 200;
  yield value2;

  console.log('函数执行完毕');
}

const generator = foo();

const result = generator.next();
if(result.value === 100) {
  generator.throw('value1 should not be 100');
}
console.log(generator.next());
```

* **生成器在生成器函数中替代迭代器的使用**

```js
// 生成器替代迭代器
function* createArrIterator(arr) {
  // 4.
  yield* arr; // 分步将arr的值迭代到外部,原理同下
  // 3.
  for(const item of arr) {
    yield item;
  }
  // 2.
  yield arr[index++];
  yield arr[index++];
  yield arr[index++];
  // 1.
  // let index = 0;
  // return {
  //   next: function() {
  //     if(index < arr.length) {
  //       return { done: false, value: arr[index++] };
  //     } else {
  //       return { done: true, value: undefined };
  //     }
  //   }
  // }
}

const names = ['abc', 'cba', 'nba'];
const iterator = createArrIterator(names);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


// 范围迭代函数应用
function* rangeIterator(start, end) {
  let index = start;
  while( index < end ) {
    yield index++;
  }
}

const iterator = rangeIterator(10, 15);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// 教室案例应用
class Classroom {
  constructor(address, name, students) {
    this.address = address;
    this.name = name;
    this.students = students;
  }

  // *[Symbol.iterator]() {
  //   yield* this.students;
  // }

  [Symbol.iterator] = function*() {
    yield* this.students;
  }
}

const classroom = new Classroom('123', '4546', [123, 456, 789]);
for(const item of classroom) {
  console.log(item);
}
```

### 生成器应用场景

* **Promise + generator方案解决回调地狱**

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 1000)
  })
}

// 1.
requestData('zjf').then(res => { // 回调地狱
  requestData(res + 'aaa').then(res => {
    requestData(res + 'bbb').then(res => {
      console.log(res); // zjfaaabbb
    })
  })
})
// 2.Promise的返回值来解决(链式调用)
requestData('zjf').then(res => {
  return requestData(res + 'aaa');
}).then(res => {
  return requestData(res + 'bbb');
}).then(res => {
  console.log(res);
})

// 3.Promise + generator(生成器方式)
function* getData() { // 异步请求代码
  const res1 = yield requestData('zjf');
  const res2 = yield requestData(res1 + 'aaa');
  const res3 = yield requestData(res2 + 'bbb');
  console.log(res4);
}

// 1>手动执行generator函数
// const generator = getData();
// generator.next().value.then(res => {
//   generator.next(res).value.then(res => {
//     generator.next(res).value.then(res => {
//       generator.next(res);
//     })
//   })
// })

// 2>自动执行异步generator函数(重点)
function execGenerator(Fn) {
  const generator = Fn(); // 生成器获取
  function exec(res) { // 递归执行
    const result = generator.next(res);
    if(result.done) return result.value;
    result.value.then(res => {
      exec(res);
    })
  }
  exec();
}
execGenerator(getData);

// 3>第三方包co自动执行生成器函数(npm install co)
// const co = require('co');
// co(getData);

// 引出async/await, 相等于生成器函数的语法糖
// 4.await/async(本质上是generator和Promise的语法糖)
async function getData1() {
  const res1 = await requestData('zjf');
  const res2 = await requestData(res1 + 'aaa');
  const res3 = await requestData(res2 + 'bbb');
  const res4 = await requestData(res3 + 'ccc');
  console.log(res4);
}
getData1();
```



## async/await

* 基本使用

```js
// await/async
async function foo() {

}

const foo2 = async () => {

}

class Foo {
  async bar() {
    
  }
}
```

```js
async function foo() { // async函数的return值或error会在该函数执行完毕后的promies的then(catch)方法中捕获到
  console.log('foo function start');
  console.log('foo function end');

  // return 'aaa';

  // return {
  //   then: function(resolve, reject) {
  //     resolve('aaa')
  //   }
  // }

  return new Promise((resolve, reject) => {
    resolve('bbb');
  })
}

const promise = foo();
promise.then(res => {
  console.log(res);
})

async function foo() {
  console.log('foo function start');
  // 异步函数中的异常，会被作为异步函数返回的Promise的reject值
  throw new Error('error message');

  console.log('foo function end');
}

foo().catch(err => {
  console.log('jf err:', err);
});

console.log('后续代码');
```

* async/await结合使用

```js
function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise中resolve调用返回的值');
    }, 3000);
  })
}
// 1.await跟上表达式
// async function foo() {
//   const res1 = await requestData();
//   console.log('后续需要执行的代码，res1:', res1);

//   const res2 =  await requestData();
//   console.log('后续需要执行的代码，res2:', res2);
// }

// foo();

// 2.await跟上其他的值
async function foo() {
  // const res = await 123; // await跟上普通值

  // const res1 = await { // await跟上thenable
  //   then: function(resolve) {
  //     resolve(123);
  //   }
  // }

  const res2 = await new Promise(resolve => { // await跟上promise
    resolve(123);
  })
  // console.log('res:', res); // res: 123
  // console.log('res1:', res1); // res1: 123
  console.log('res2:', res2); // res2: 123
}

foo();

// 3.reject值将会在异步foo函数.catch方法中捕获到
```







