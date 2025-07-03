---
title: 'ES6新特性'
date: 2021-7-2 17:40:00
permalink: '/posts/blogs/ES6新特性'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
# isShowComments: false
publish: false
---

## ES6新特性

### 1.let,const

* let表示声明变量，而const表示声明常量，两者都为块级作用域；const 声明的变量都会被认为是常量，意思就是它的值被设置完成后就不能再修改了
* 如果const的是一个对象，对象所包含的值是可以被修改的。抽象一点儿说，就是对象所指向的地址没有变就行
* let 关键词声明的变量不具备变量提升（hoisting）特性(必须先声明再使用)
* const 在声明时必须被赋值

### 2.模板字符串

* 基本的字符串格式化。将**表达式**嵌入字符串中进行拼接。用${}来界定
* ES6反引号(``)直接使用，可直接换行

### 3.箭头函数

```js
// ES5
var add = function (a, b) {
    return a + b;
};
// 使用箭头函数
var add = (a, b) => a + b;

// ES5
[1,2,3].map((function(x){
    return x + 1;
}).bind(this));
    
// 使用箭头函数
[1,2,3].map(x => x + 1);
```

* 当你的函数有且**仅有一个参数**的时候，是可以省略掉括号的。当你函数**返回有且仅有一个表达式**的时候可以省略{} 和 return；

### 4.函数参数默认值

```js
// ES6之前，当未传入参数时，text = 'default'；
function printText(text) {
    text = text || 'default';
    console.log(text);
}

// ES6；
function printText(text = 'default') {
    console.log(text);
}

printText('hello'); // hello
printText();// default
```

### 5.对象和数组解构

```js
// 对象
const student = {
    name: 'Sam',
    age: 22,
    sex: '男'
}
// 数组
// const student = ['Sam', 22, '男'];

// ES5；
const name = student.name;
const age = student.age;
const sex = student.sex;
console.log(name + ' --- ' + age + ' --- ' + sex);

// ES6
const { name, age, sex } = student;
console.log(name + ' --- ' + age + ' --- ' + sex);
```

### 6.ES6中的类

* ES6支持class语法，不过，ES6的class不是新的对象继承模型，它只是原型链的语法糖表现形式。
* 函数中使用 static 关键词定义构造函数的的方法和属性

```js
class Student{
  constructor(){
    console.log("I'm a student");
  }
  study(){
    console.log('study!');
  }
  static read(){
    console.log('read!');
  }
}

console.log(typeof Student);// function
let stu=new Student();
stu.study();//study!
stu.read();//read!
```

* 类的继承和超集

```js
class Phone {
  constructor() {
    console.log("I'm a phone.");
  }
}
 
class MI extends Phone {
  constructor() {
    super();
    console.log("I'm a phone designed by xiaomi");
  }
}
 
let mi8 = new MI();
```

* extends 允许一个子类继承父类，需要注意的是，子类的constructor 函数中需要执行 super() 函数。 当然，你也可以在子类方法中调用父类的方法，如super.parentMethodName()。

