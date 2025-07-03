---
title: 'TypeScript'
date: 2022-6-5 23:30:00
permalink: '/posts/blogs/TypeScript'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - React
 - javascript
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


## TypeScript

### typescript简介

* **由微软开发**
* ts以js为基础构建的语言
* ts是一个**js的超集**
* 是可以**在任何支持javascript的平台中执行**
* ts扩展了js,并**添加了类型**
* ts不能被js解析器直接执行，**需经过编译后成js再执行**
* 拥有**丰富的配置选项**，可**选择编译成不同版本的js**，适配不同的浏览器

### ts环境安装与搭建

#### 安装

```shell
npm install typescript -g
tsc --version
```

#### 运行环境

![pCG2YRg.png](https://s1.ax1x.com/2023/06/21/pCG2YRg.png)

```js
tsc index.ts // 会根据index.ts文件生成一个index.js文件

// 或直接
ts-node index.ts
```

### 基本类型使用

```ts
// 1.可以直接使用字面量进行类型声明
let a: 10;
a = 10;
// a = 11;

// 2.联合类型：可以使用|来连接多个类型
let b: 'male' | 'female';
b = 'male';
b = 'female';

let c: number | string;
c = 10;
c = 'abc';
// c = true; // 不能将类型“boolean”分配给类型“string | number”。

// 3.any表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS类型检测
// 不建议使用，会影响其他变量的类型
// let d; // 不设置类型，隐式设置为any
let d: any;
d = 'abc';
d = 10;

// 4.unknown 表示未知类型
let e: unknown;
e = 10;
e = 'abc';

let s: string;

// d的类型是any,它可以赋值给任意变量(影响了s的类型)
s = d;
// unknown 实际上就是一个类型安全的any
// e的类型是unknown,不能直接赋值给其他变量
// 可通过类型检测后，进行赋值
if(typeof e === 'string') {
  s = e;
}
// 也可以通过类型断言,告诉编译器e的实际类型
s = e as string;
s = <string>e;

// 5.void 不写返回值会自动将返回值设置为void,也会根据函数内return的值进行自动判断
// 当类型设置为void后，表示该函数没有返回值
function foo(): void {
  // return 'a'
}

// 6.never 表示永远不会返回结果,连空也不返回，可用于报错调用
function bar(): never {
  throw new Error('This is an errror message!');
}

// 7.object 表示一个js对象类型
// 一般不使用: object，因为对象、数组和函数都属于object，不易分辨
let a: object;
a = {};
a = function() {};
// 使用{}指定为对象，也可指定对象中包含哪些属性(结构必须一致)
// 类型后面加上?表示是可选属性
let b: { name: string, age?: number };
b = { name: 'abc', age: 22 };
// [xxx: type]: any 表示任意属性
let c: { name: string, [propName: string]: any };
c = { name: 'abc', age: 22, asd: 'asda' };

// 8.通过箭头函数定义函数类型结构
// ...展开运算符需结合any来使用
let d: (a: number, b: number, ...c: any) => number;
d = function(a, b, c, d) {
    return a + b;
}

// 9.array 数组的类型定义
// string[]表示字符串数组、number[]数值数组
let e: string[];
let f: Array<string>; // 推荐使用Array方式

let g: number[];
let h: Array<number>;

let i: object[];
let j: Array<{[propName: string]: any}>; // 效果同上行代码

i = [{}, {name: 'zjf'}, []];
j = [{}, {name: 'zjf'}, []];

let k: Array<any>; // 任意数组

// 以下为ts独有的类型
// 10.tuple 元组：固定长度及类型的数组
let l: [number, string, ...any];
l = [10, 'ts', 1, 'ds'];

// 11.enum 枚举类型
enum Gender {
  Male, // 0
  Female // 1
}
let m: { name: string, gender: Gender };
m = { name: 'zjf', gender: Gender.Male };
console.log(m.gender === Gender.Male); // true

// 12. &的用法
let n: { name: string } & { age: number };
n = { name: 'zjf', age: 22 };

// 13.type 类型的别名
type strType = string;
type myType = 1 | 2 | 3 | 4 | 5;
let o: strType; // 等同于let o: string;
let p: myType; // 等同于let p: 1 | 2 | 3 | 4 | 5;
o = 'abc';
p = 5;
```

#### 对象的任意属性写法(根据实际情况使用)

```ts
// [xxx: type]: any 表示任意属性
let c: { name: string, [propName: string]: any };
c = { name: 'abc', age: 22, asd: 'asda' };

let i: object[];
let j: Array<{[propName: string]: any}>; // 效果同上行代码
```

### ts编译选项

* 使用命令**tsc app.ts -w**即可对app.ts文件的状态进行监视，自动进行app.js文件的更新
* 通过在文件目录下添加**tsconfig.json**文件，然后使用**tsc**命令即可对该文件夹下所有的.ts文件进行编译并且生成相应的.js文件；
* **有tsconfig.json文件的情况下**，使用**tsc -w**即可对该文件夹下所有.ts文件开启监视
* tsconfig.json：

```json
{/*
  tsconfig.json是ts编译器的配置文件，可以在里面写注释
    "include" 用来指定哪些ts文件需要被编译, **表示任意文件夹 *表示任意文件
    "exclude" 用于指定哪些文件不需要被编译
      默认值：["node_modules", "bower_components", "jspm_packages"]
    "extends" 定义被继承的配置文件 "extends": "./configs/base"
    "files" 指定被编译文件的列表，只有需要编译的文件少时才会用到 "files": [ "core.ts", "sys.ts" ]
*/
  "include": [
    "./src/**/*"
  ],
//  "exclude": [
//    "./src/test/**/*"
//  ]
  /*
    compilerOptions 编译器的选项
  */
  "compilerOptions": {
    // target 用来指定ts被编译为ES的版本
    // '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017',
    // 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'.
    "target": "ES6",
    // module 指定要使用的模块化方案
    // 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020',
    // 'es2022', 'esnext', 'node16', 'nodenext'.
    "module": "es6",
    // lib 用于指定项目中要使用的库,获得相应库的代码提示
    // 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext',
    //'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.pr
    //omise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'e
    //s2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol'
    //, 'es2020.bigint', 'es2020.date', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2020.number', 'es2021.promise', 'es2021.string'
    //, 'es2021.weakref', 'es2021.intl', 'es2022.array', 'es2022.error', 'es2022.intl', 'es2022.object', 'es2022.string', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.int
    //l', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'.
    // "lib": ["es6","dom"]
    // 根据当前文件目录结构，指定相应目录下生成所在的目录生成同结构的js文件
    "outDir": "./dist",
    // 将编译后的代码合并成一个js文件进行输出
    // 设置outFile后，所有全局作用域中的代码会合并到同一个文件中,涉及到模块化需要将module设置为amd或system
    // "outFile": "./dist/app.js",
    // 是否对符合编译范围内的js文件进行编译,默认为false不对js进行编译
    "allowJs": true,
    // 检查js代码是否符合语法规范，默认为false
    "checkJs": false,
    // 是否保留编译前的注释，默认不移除
    "removeComments": true,
    // 是否不生成编译后的文件,默认为false(要生成)
    "noEmit": false,
    // 当编译出错，不生成js文件，默认为false(推荐设置为true)
    "noEmitOnError": true,

    // 语法相关配置
    // 所有严格检查的总开关，会将以下所有的严格检查全打开，若部分想要关闭，则需单独设置
    "strict": true,
    // 用于设置编译后的文件是否使用严格模式
    // 当代码中有export/import模块导入导出相关代码时会自动设置为严格模式
    "alwaysStrict": true,
    // 不允许隐式的any，如：function foo(a, b) {} a、b就是隐式的any类型变量
    "noImplicitAny": true,
    // 不允许不明确类型的this，如一个独立函数中的this是否允许存在
    "noImplicitThis": true,
    // 检测可能存在的null出现
    "strictNullChecks": true
  }
}
```

### ts中webpack的使用

* npm init  
* npm install -D webpack webpack-cli typescript ts-loader
* webpack.config.js
* npm install -D @babel/core @babel/preset-env babel-loader core-js

```js
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 指定打包入口文件
  entry: './src/index.ts',
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件
    filename: 'bundle.js',
    // 告诉webpack不要使用自执行箭头函数的形式
    environment: {
      arrowFunction: false
    }
  },
  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器(重点!)
                    targets: {
                      "chrome": '88',
                      "ie": "11"
                    },
                    // 指定corejs的版本,将不满足浏览器要求的代码，用自己写的高级用法加入进去
                    "corejs": '3',
                    // 使用corejs的方式"usage" 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node_modules/
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      // title: "这是一个自定义title"
      template: './public/index.html'
    }),
    // 自动清除dist文件
    new CleanWebpackPlugin()
  ],
  // 哪些文件可作为模块化使用
  resolve: {
    extensions: ['.ts', '.js']
  }
}
```

* tsconfig.json

```json
{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "strict": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

* package.json

```json
{
  "name": "webpack",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open --mode development"
  },
  "author": "",
  "license": "MIT",
  "keywords": [],
  "description": "",
  "devDependencies": {
    "@babel/core": "^7.18.2",
    "@babel/preset-env": "^7.18.2",
    "babel-loader": "^8.2.5",
    "clean-webpack-plugin": "^4.0.0",
    "core-js": "^3.22.8",
    "html-webpack-plugin": "^5.5.0",
    "ts-loader": "^9.3.0",
    "typescript": "^4.7.3",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.1"
  }
}
```

### 泛型的使用

```ts
// 在定义函数或者类时，遇到类型不明确情况就可以使用泛型
// 泛型的意思表示为同等类型

// 定义了一个泛型T,表示任意类型，参数可以设置为该类型，返回值也可以设置为该类型
function fn<T>(a: T): T { 
  return a;
}

// 可直接调用具有泛型的函数
// 不指定泛型，ts会自动对类型进行推断
let result1 = fn(10); // 这次调用泛型T的类型为number
let result2 = fn('abc') // 这次调用T的类型为string

fn<string>('def'); // 指定类型的调用

// 多泛型的使用
function foo<T, K>(a: T, b: K) {
  return a;
}

let result3 = foo<number, string>(10, 'abc');

// 接口也可以结合泛型进行使用,结合type使用
interface Interface<T> {
  content: T
}

type MyType = Interface<string>;
const obj: MyType = {
  content: '123'
}

interface Inter {
  length: number
}

// 泛型可以继承于接口，也可以继承于实现了某个接口的类
function bar<T extends Inter>(a: T):number {
  return a.length;
}

bar('1123'); // '1123'中有length属性，符合要求
// bar(123); // 传参失败，123中没有接口Inter的length属性
bar({ length: 5 }); // 传参成功

// 类中泛型的使用
class D<T extends Inter> {
  constructor(public name: T) {
    this.name = name;
  }
}

const d1 = new D('abc');
const d2 = new D({ length: 10 });
```

### ts面向对象

#### ts类的基本使用

```ts
class Person {
  readonly name: string = 'why'; // 属性默认值设置
  age?: number = 10; // 区分属性和静态属性 ,可选属性
  static age: number = 18; // 静态属性，类上的属性
  constructor(name:string, age?: number) {
    this.name = name; // 需要先定义属性，再赋值
    this.age = age;
  }
  sayHello() {
    console.log('Hello person!');
  }
  static sayHello() {
    console.log('Hello Person class!');
  }

}

const person = new Person('zjf');
console.log(person);
person.sayHello()
Person.sayHello()
```

#### 构造器函数

```ts
class Dog {
  name?: string= 'asd';
  age? = 2;

  constructor(name?: string, age?: number) {
    this.name = name;
    this.age = age;
  }

  bark() { // 普通方法挂载在类的原型上
    console.log('wangwang', this);
  }
}
const dog1 = new Dog('zz', 1);
const dog2 = new Dog('xx', 2);
console.log(dog1);
console.log(dog2);
console.log(dog1 === dog2); // false
console.log(Dog.prototype.bark());
```

#### 类的继承

```ts
( // 以立即执行函数的方式创造独立的作用域，防止不同文件间变量的重复导致报错
  function() {
    class Person {
      name: string;
      age: number;
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
      overrideMethod() {
        console.log('父类的方法');
      }
    }

    class Student extends Person {
      sno: string;
      constructor(name: string, age: number, sno: string) {
        super(name, age); // 父类代码复用(属性复用) super等同于父类Person
        this.sno = sno
      }
      sayHello() {
        console.log('Hello teacher,' + `I am ${this.name}`);
      }
      overrideMethod(): void {
        // 可在此重写父类的方法
      }
    }

    class Teacher extends Person {
      tno: string;
      constructor(name: string, age: number, tno: string) {
        super(name, age);
        this.tno = tno;
      }
      sayHello() {
        console.log('Hello students,' + `I am ${this.name}`);
      }
    }

    const stu = new Student('zjf', 22, '1234');
    const tea = new Teacher('why', 18, '5678');
    console.log(stu);
    console.log(tea);
    stu.sayHello();
    tea.sayHello();
  }
)();
```

#### 抽象类(不能创建实例的类)

```ts
( // 以立即执行函数的方式创造独立的作用域，防止不同文件间变量的重复导致报错
  function() {
    // 指定Person类为抽象类，使其不能用于创建实例，专门用于给别的类继承
    abstract class Person {
      name: string;
      age: number;
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
      overrideMethod() {
        console.log('父类的方法');
      }
      // 可以在抽象类中定义抽象方法，将结构定义好即可，具体由子类来进行实现
      // 抽象方法使用abstract开头，没有方法体
      // 抽象方法只能在抽象类中定义，子类必须对抽象方法重写
      abstract sayHello(): void;
    }

    class Student extends Person {
      sno: string;
      constructor(name: string, age: number, sno: string) {
        super(name, age); // 父类代码复用(属性复用) super等同于父类Person
        this.sno = sno
      }
      sayHello() {
        console.log('Hello teacher,' + `I am ${this.name}`);
      }
      overrideMethod(): void {
        // 可在此重写父类的方法
      }
    }

    class Teacher extends Person {
      constructor(name: string, age: number) {
        super(name, age);
      }
      sayHello(): void {
        
      }
    }

    const stu = new Student('zjf', 22, '1234');
    console.log(stu);
    stu.sayHello();
  }
)();
```

#### interface接口

```ts
(
  function() {
    // 对象类型的限制type
    type myType = {
      name: string,
      age: number,
      // [propName: string]: any
    }

    const obj1: myType = {
      name: 'zjf',
      age: 22
    }

    // 接口就是用来定义一个类的结构,定义一个类应该包含哪些属性和方法
    // 也可以用来定义对象的结构(类型声明的功能)
    // 可以重复定义interface接口，编译器会将该两个接口属性拼接在一起
    // 接口中所有的属性都不能有实际的值，接口中所有的方法都是抽象方法
    interface myInterFace {
      name: string,
      age: number
    }
    
    interface myInterFace {
      gender: string,
      sayHello(): void
    }
    // 接口对对象结构的定义使用
    const obj2: myInterFace = {
      name: 'zjf',
      age: 22,
      gender: '男',
      sayHello() {}
    }
    // 接口对类结构的定义使用
    class MyClass implements myInterFace {
      name: string;
      age: number;
      gender: string;
      constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
      }
      sayHello(): void {
        
      }
    }
  }
)();
```

#### [interface和type的区别](https://blog.csdn.net/weixin_47027124/article/details/128811802)

主要区别在于 **type 一旦定义就不能再添加新的属性**，而 **interface 总是可扩展的**。



#### 属性的类型封装(get和set)

```ts
(
  function() {
    // 私有属性的访问和修改
    class Person {
      // 通过给属性添加修饰符，可以更改属性的访问权限
      // public修饰的属性可以在任意位置访问和修改(子类或实例)
      // private修饰的属性只能在类内部进行访问和修改
        // 可通过在类中添加get和set方法的形式对属性进行访问和修改
      // protected为受保护的属性，只能在当前类和子类中访问
      private _name: string;
      private _age: number;
      constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
      }

      // 原生用法
      // getName() {
      //   return this._name;
      // }

      // setName(value: string) {
      //   console.log(value);
      //   this._name = value
      // }

      // getAge() {
      //   return this._age;
      // }

      // setAge(value: number) {
      //   // 通过方法的形式就可以对设置的值进行验证了
      //   if(value >= 0) {
      //     this._age = value
      //   }
      // }

      // TS中设置getter方法的方式，之后就可直接通过“实例.属性”的方式访问了
      get name() {
        return this._name;
      }
      set name(value) {
        this._name = value
      }
      get age() {
        return this._age;
      }
      set age(value) {
        if(value >= 0) {
          this._age = value
        }
      }
    }

    const per = new Person('zjf', 22);
    // per._name = 'why'; // 属性可以任意被修改会导致对象中的数据变得非常不安全
    // 原生js的用法
    // console.log(per.getName()); // zjf
    // per.setName('why');
    // console.log(per.getName()); // why
    // per.setAge(18);
    // console.log(per);

    // ts的用法
    // 有了get和set方法后就可以直接访问属性和修改属性了，也可以对属性进行拦截
    console.log(per.name);
    per.name = 'why';
    console.log(per.age);
    per.age = -1;
    console.log(per);

    // 以下A、B两个类的写法效果是一样的
    class A {
      constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
      }
    }

    class B {
      public name: string;
      public age: number;
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }
  }
)();
```

#### ts类的语法糖

```js
class Product {
  name: string
  price: number

  constructor(name: string, price: number) {
    this.name = name
    this.price = price
  }
}

// 等价于
class Product {
  constructor(public name: string, public price: number) { }
}
```

### 任意属性值写法

```ts
type classType = {
  [prop: string]: any;
}
```

### ts eslint忽略多行或某一行

```ts
// @ts-ignore
let a = ''

/* eslint-disable */
areaTextNeed={true}
/* eslint-enable */
```

