---
title: 'Redux'
date: 2022-6-18 22:00:00
permalink: '/posts/blogs/Redux'
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


## Redux

* Redux就**是一个帮助我们管理State的容器**：**Redux是JavaScript的状态容器**，提供了**可预测的状态管理**
* Redux除了和React一起使用之外，它**也可以和其他界面库一起来使用（比如Vue）**，并且它非常小（包括依赖在内，只有2kb）
* **store**存储，将数据存入至一个公共的对象中，进行数据共享
* Redux要求**所有数据的变化**，必须**通过派发（dispatch）action来更新**；
* 如何**将state和action联系在一起**？**reducer**
  * reducer是一个纯函数
  * **reducer**做的事情就是**将传入的state和action结合起来生成一个新的state**

### Redux三大原则

#### 单一数据源

* 整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中：
* Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护；
* 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改；

#### State是只读的

* **唯一修改State的方法一定是触发action**，不要试图在其他地方通过任何的方式来修改State：


* 这样就确保了View或网络请求都不能直接修改state，它们**只能通过action**来描述自己想要如何修改state；
* 这样可以**保证所有的修改都被集中化处理**，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题；

#### 使用纯函数来执行修改

* 通过**reducer将 旧state和 actions联系在一起**，并且返回一个新的State：
* 随着应用程序的复杂度增加，我们可以**将reducer拆分成多个小的reducers**，分别**操作不同state tree的一部分**；
* 但是**所有的reducer都应该是纯函数**，不能产生任何的副作用；

### Redux的使用

* 安装

```cmd
npm install redux --save
```

* 1.**创建一个对象，作为我们要保存的状态**：
* 2.**创建Store来存储这个state**
  * 创建store时必须创建reducer；
  * 我们可以通过 **store.getState()** 来获取当前的state
* 3.通过**action来修改state**
  * 通过**dispatch来派发action**；
  * 通常**action中都会有type属性，也可以携带其他的数据**；
* 4.修改**reducer中的处理代码**
  * 这里一定要记住，reducer是一个纯函数，不需要直接修改state；
  * 后面我会讲到直接修改state带来的问题；
* 5.可以**在派发action之前，监听store的变化**

```js
// react17 未封装写法
const redux = require('redux');

// 1.store 2.action 3.reducer
// 初始化的数据
const initialState = {
  counter: 0
}

// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
      break;
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
      break;
    case 'ADD_NUMBER':
      return { ...state, counter: state.counter + action.num };
      break;
    case 'SUB_NUMBER':
      return { ...state, counter: state.conter - action.num };
      break;
    default:
      return state;
  }
}

// store
// 在创建store的时候传入一个reducer纯函数
// const store = redux.createStore(); // 弃用
const store = redux.createStore(reducer);

// 订阅store的修改
store.subscribe(() => {
  console.log('counter:', store.getState().counter);
})

// actions
const action1 = { type: "INCREMENT" };
const action2 = { type: "DECREMNT" };
const action3 = { type: "ADD_NUMBER", num: 5 };
const action4 = { type: "SUB_NUMBER", num: 12 };

// 派发action，实际上就是执行reducer纯函数
store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);
```

### Redux对比mobx

#### 共同点

* 为了**解决状态管理混乱**、无法有效同步的问题，**统一维护管理应用状态**
* 某一状态只有一个可信数据来源（通常命名为store，指状态容器）
* 操作更新状态方式统一，并且可控（通常以action方式提供更新状态的途径）
* 支持将store与React组件连接，如`react-redux`，`mobx-react`

#### 区别

Redux更多的是遵循Flux模式的一种实现，是一个 JavaScript 库，它关注点主要是以下几方面∶

* Reducer∶ **定义应用状态如何响应不同动作（action）**，如何更新状态;
* Action∶ 一个JavaScript对象，**描述动作相关信息**，主要包含type属性和payload属性∶


* Store∶ 管理action和reducer及其关系的对象，主要提供以下功能∶
  * **维护应用状态并支持访问状态(getState())**;
  * **支持监听action的分发，更新状态(dispatch(action))**;
  * 支持**订阅store的变更(subscribe(listener))**;
* 异步流∶ 由于Redux所有对store状态的变更，都应该通过action触发，**异步任务**（通常都是业务或获取数据任务）也不例外，而为了不将业务或数据相关的任务混入React组件中，就**需要使用其他框架配合管理异步任务流程，如redux-thunk，redux-saga等**;

Mobx是一个**透明函数响应式编程的状态管理库**，它使得状态管理简单可伸缩∶

* Action∶**定义改变状态的动作函数**，包括**如何变更状态**;
* Store∶ 集中**管理模块状态（State）和动作(action)**
* Derivation（衍生）∶ 从应用状态中派生而出，且没有任何其他影响的数据

#### 对比总结

* `redux`将数据保存在**单一的store**中，`mobx`将数据保存在**分散的多个store**中
* redux使用`plain object`保存数据，需要手动处理变化后的操作;mobx适用**observable**保存数据，**数据变化后自动处理响应的操作**
* **redux使用不可变状态**，这意味着状态是只读的，**不能直接去修改它**，**而是应该返回一个新的状态**，**同时使用纯函数；**mobx中的状态是可变的，可以直接对其进行修改
* mobx相对来说比较简单，在其中有很多的抽象，**mobx更多的使用面向对象的编程思维**;redux会比较复杂，因为其中的**函数式编程思想**掌握起来不是那么容易，同时需要**借助一系列的中间件(redux-thunk、redux-saga)来处理异步和副作用**
* mobx中有更多的抽象和封装，调试会比较困难，同时结果也难以预测;而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

### Redux对比Vuex

#### 相同点

* 通过state共享数据
* 流程一致：定义全局state，触发，修改state
* 原理相似，通过全局注入store

#### 不同点

* 从实现原理上来说：
  * **Redux 使用的是不可变数据**，**而Vuex的数据是可变的**。`Redux`每次都是用**新的state替换旧的state**，而`Vuex`是**直接修改**
  * Redux 在检测数据变化的时候，是通过 **diff 的方式比较差异**的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的
* 从表现层来说：
  * vuex定义了**state、getter、mutation、action**四个对象；redux定义了**state、reducer、action**。
  * vuex中state统一存放，方便理解；redux state依赖所有reducer的初始值
  * vuex有getter,目的是快捷得到state；redux没有这层，react-redux mapStateToProps参数做了这个工作。
  * vuex中mutation只是单纯**赋值**(很浅的一层)；redux中reducer只是单纯**设置新state**(很浅的一层)。他俩作用类似，但书写方式不同
  * vuex中action有较为复杂的异步ajax请求；redux中action中可简单可复杂,简单就直接发送数据对象（{type:xxx, your-data}）,复杂需要调用异步ajax（依赖redux-thunk插件）。
  * vuex触发方式有两种**commit同步和dispatch异步**；**redux同步和异步都使用dispatch**