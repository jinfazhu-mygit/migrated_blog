---
title: 'redux复学'
date: 2023-06-29 23:40:00
permalink: '/posts/blogs/redux复学'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - React
 - javascript
 - typescript
 - redux
 - RTK
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---



# redux

[学习代码地址](https://gitee.com/zhu-jinfa/redux-learning-code)

## 纯函数

* **确定的输入，产生确定的输出**
* **执行后不会产生任何副作用的函数**

## store

定义的状态用于管理数据

## action

通过派发actions修改store中的数据，action是一个**普通的JavaScript对象**，**用来描述这次更新的type和content**



## reducer

将store的state和action结合返回一个新的state给store



## 用法基础

使用store中的数据：store.getState()

![pCa4VVU.png](https://s1.ax1x.com/2023/06/27/pCa4VVU.png)

修改store中的数据：dispatch(action)

![pCaI3ND.png](https://s1.ax1x.com/2023/06/27/pCaI3ND.png)

store数据变化的订阅和取消，switch重写reducer

![pCaIxUO.png](https://s1.ax1x.com/2023/06/27/pCaIxUO.png)

### redux结构划分四件套

1. 动态生成的action，2. actionCreators.js的封装，3. constants.js action的type常量封装，4. reducer.js 函数封装，。

![pCa7QH0.png](https://s1.ax1x.com/2023/06/27/pCa7QH0.png)

使用

![pCaHlMd.png](https://s1.ax1x.com/2023/06/27/pCaHlMd.png)

## redux三大原则

◼ 单一数据源

 整个应用程序的**state被存储在一颗object tree中**，并且这个**object tree只存储在一个 store 中**：

 Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护；

 **单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改**；

◼ State是只读的

 唯一**修改State的方法一定是触发action**，不要试图在其他地方通过任何的方式来修改State：

 这样就确保了View或网络请求都**不能直接修改state**，它们只能**通过action来描述自己想要如何修改state**；

 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题；

◼ 使用**纯函数(reducer)来执行修改**

 通过reducer**将 旧state和 actions联系在一起，并且返回一个新的State**：

 随着应用程序的复杂度增加，我们**可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分**；

 但是所有的reducer都应该是纯函数，不能产生任何的副作用；

![pCd946P.png](https://s1.ax1x.com/2023/06/27/pCd946P.png)

## react中使用redux

### 最基础state初始化加上subscribe订阅

```jsx
import React, { PureComponent } from 'react'
import store from '../store'
import { addNumAction } from '../store/actionCreators'

export class Cart extends PureComponent {
  constructor() {
    super()

    this.state = {
      // 值初始化(store中counter的默认值)
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      // store订阅最新的值
      this.setState({
        counter: store.getState().counter
      })
    })
  }

  addNumClick(num) {
    // 派发action,修改store中的state
    store.dispatch(addNumAction(num))
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h3>Cart counter: {counter}</h3>
        <button onClick={e => this.addNumClick(1)}>+1</button>
        <button onClick={e => this.addNumClick(5)}>+5</button>
        <button onClick={e => this.addNumClick(8)}>+8</button>
      </div>
    )
  }
}

export default Cart
```

## react-redux库

### connect函数(类组件class中使用)

connect函数的两个参数函数**mapStateToProps和mapDispatchToProps，见名知意**

![pCdl5wQ.png](https://s1.ax1x.com/2023/06/28/pCdl5wQ.png)

/src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

.jsx

```jsx
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addNumAction, subNumAction } from '../store/actionCreators'

export class About extends PureComponent {

  calcBtnClick(num, isAdd) {
    if(isAdd) {
      // 调用connect连接的addNum方法,实现dispatch派发action
      this.props.addNum(num)
    } else {
      // 调用connect连接的subNum方法,实现dispatch派发action
      this.props.subNum(num)
    }
  }

  render() {
    // connect函数将store里的state同props一起传给组件了
    // <About {...props, ...}>
    const { counter } = this.props

    return (
      <div>
        <h3>About counter: {counter}</h3>

        <button onClick={e => this.calcBtnClick(7, true)}>+7</button>
        <button onClick={e => this.calcBtnClick(13, true)}>+13</button>
        <button onClick={e => this.calcBtnClick(7, false)}>-7</button>
        <button onClick={e => this.calcBtnClick(13, false)}>-13</button>
      </div>
    )
  }
}

// connect是一个高阶函数，connect()返回的是一个高阶组件
// connect函数接收两个函数参数，第一个函数可将store中的state传给组件的props里使用
// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   }
// }
const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => ({
  addNum: (num) => { dispatch(addNumAction(num)) },
  subNum: (num) => { dispatch(subNumAction(num)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
```

### react-redux的hooks

#### useSelector

#### useDispatch

#### useStore

![pC0Wg39.png](https://s1.ax1x.com/2023/06/30/pC0Wg39.png)

```jsx
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNum } from '@/store/modules/home'

export default function Index() {
  // 1.store数据展示
  const counter = useSelector((state) => {
    // console.log(state)
    return state.home.counter
  })

  // store数据修改
  const dispatch = useDispatch()
  const addClick = (num) => {
    dispatch(addNum(num))
  }
  const subClick = (num) => {
    dispatch(addNum(num))
  }

  return (
    <View className='index'>
      <Text>{counter}</Text>

      <Button onClick={e => addClick(1)}>+1</Button>
      <Button onClick={e => subClick(1)}>-1</Button>
    </View>
  )
}
```

#### dispatch派发异步请求

![pC0fxMR.png](https://s1.ax1x.com/2023/06/30/pC0fxMR.png)

## redux-thunk中间件的应用(异步请求)

npm install redux-thunk

**网络请求到的数据也属于我们状态管理的一部分**，更好的一种方式应该是**将其也交给redux来管理**；

**redux-thunk库使得action函数可以返回一个函数**，

该函数会被调用，并且会传给这个函数一个dispatch函数和getState函数；

* **dispatch函数用于我们之后再次派发action**；
* **getState函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态**；

使得异步网络请求的数据逻辑是放到redux中实现的，组件只需调用该action即可，在该action内部再dispatch派发修改store中的state即可

![pCdhcQI.png](https://s1.ax1x.com/2023/06/28/pCdhcQI.png)

```js
import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// 默认情况下store.dispatch(object)
// 使用redux-thunk中间件即可实现store.dispatch(function)

// redux使用redux-thunk中间件
const store = createStore(reducer, applyMiddleware(thunk))

export default store
```

## react-devtools、redux-devtools

工具下载看项目源码链接https://gitee.com/zhu-jinfa/redux-learning-code

chrome浏览器开发环境开启redux工具，生产环境最好关闭

/store/index.js

```js
import { applyMiddleware, createStore, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// composeEnhancers开启redux调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
```

## 模块划分与合并(combineReducers)

![pCwVm1e.png](https://s1.ax1x.com/2023/06/28/pCwVm1e.png)

：注意模块划分后获取state的方式需要加上一层combineReducer时的命名

```js
import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import counterReducer from './counter'
import homeReducer from './home'

// 默认情况下store.dispatch(object)
// 使用redux-thunk中间件即可实现store.dispatch(function)

// redux使用redux-thunk中间件

// 合并多个reducer
const reducer = combineReducers({
  counter: counterReducer,
  home: homeReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
```

### combineReducer原理类似

![pCwZ3r9.png](https://s1.ax1x.com/2023/06/28/pCwZ3r9.png)

## RTK(ReduxToolkit)工具包

```shell
npm install @reduxjs/toolkit react-redux
```

### 创建单个模块的reducer(createSlice)

createSlice主要包含如下几个参数：

* **name**：用户标记slice的名词
  * 在之后的redux-devtool中会显示对应的名词；
* **initialState**：初始化值
  * 第一次初始化时的值；
* **reducers**：相当于之前的reducer函数
  * 对象类型，并且可以添加很多的函数；
  * 函数类似于redux原来reducer中的一个case语句；
  * 函数的参数：state, action: { type： ，payload:    , }

![pCwDfr4.png](https://s1.ax1x.com/2023/06/29/pCwDfr4.png)

```js
import { createSlice } from '@reduxjs/toolkit'

const counterReducer = createSlice({
  name: 'counter',
  initialState: {
    counter: 123
  },
  reducers: {
    // 定义action,操作state
    addNum(state, { type, payload }) {
      state.counter = state.counter + payload
    },
    subNum(state, { type, payload }) {
      // console.log(action) // {type: 'counter/subNum', payload: _}
      // 可直接使用state.counter = 赋值操作，其内部会自动返回一个新的state
      state.counter = state.counter - payload
    }
  },
})

// counterReducer.actions拿到reducer中定义的action，导出使用
export const { addNum, subNum } = counterReducer.actions
// 注意reducer的导出
export default counterReducer.reducer
```

### 合并多个reducer(configureStore)

configureStore用于创建store对象，常见参数如下：

* **reducer**，将slice中的reducer可以组成一个对象传入此处；
* **middleware**：可以使用参数，传入其他的中间件（自行了解）；
* **devTools**：是否配置devTools工具，默认为true；

![pCwDXse.png](https://s1.ax1x.com/2023/06/29/pCwDXse.png)

```js
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './features/counter'
import homeReducer from './features/home'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer
  }
})

export default store
```

### 继续结合react-redux使用(同上节)

![pCwrQzT.png](https://s1.ax1x.com/2023/06/29/pCwrQzT.png)

类组件中传参调用dispatch

![pP31Jl6.png](https://s1.ax1x.com/2023/08/18/pP31Jl6.png)

函数式组件中传参调用dispatch类似，参考本节 hooks -> useDispatch

### 异步数据action的处理(createAsyncThunk与extraReducers)

最新extraReducers文档请看：https://redux-toolkit.js.org/api/createSlice

第一种写法已deprecated

![pCwc6jf.png](https://s1.ax1x.com/2023/06/29/pCwc6jf.png)

**推荐第二种写法(builder+addCase)**

![pCwqXZ9.png](https://s1.ax1x.com/2023/06/29/pCwqXZ9.png)

/features/home.js

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 使用createAsyncThunk创建异步action，在extraReducers里即可监听到请求的状态变化
export const getHomeMultidataAction = createAsyncThunk('fecthHomeData', async(arg, action) => {
  const res = await axios.get('http://123.207.32.32:8000/home/multidata')
  return res.data
})

const homeReducer = createSlice({
  name: 'home',
  initialState: {
    banners: [],
    recommends: []
  },
  reducer: {
    changeBanners(state, { payload }) {
      state.banners = payload
    },
    changeRecommends(state, { payload }) {
      state.recommends = payload
    }
  },
    // extraReducers: {
  //   // 异步action的三个状态监听
  //   [getHomeMultidataAction.pending](state, { payload }) {
  //     console.log('getHomeMultidataAction.pending')
  //   },
  //   [getHomeMultidataAction.fulfilled](state, { payload }) {
  //     console.log('getHomeMultidataAction.fulfilled')

  //     state.banners = payload.data.banner.list
  //     state.recommends = payload.data.recommend.list
  //   },
  //   [getHomeMultidataAction.rejected](state, { payload }) {
  //     console.log('getHomeMultidataAction.rejected')
  //   },
  // }
  // extraReducers第二种写法(官方推荐最新写法)
  extraReducers: (builder) => {
    builder.addCase(getHomeMultidataAction.pending, (state, action) => {
      console.log('getHomeMultidataAction pending')
    }).addCase(getHomeMultidataAction.fulfilled, (state, { payload }) => {
      console.log('getHomeMultidataAction fulfilled')
      state.banners = payload.data.banner.list
      state.recommends = payload.data.recommend.list
    })
  }
})

export const { changeBanners, changeRecommends } = homeReducer.actions

export default homeReducer.reducer
```

第三种方式(直接**在异步action中dispatch修改state**，2023/6/29无效)

![pCwqzPx.png](https://s1.ax1x.com/2023/06/29/pCwqzPx.png)

### RTK数据不可变性state=的赋值原理

**RTK使用immer库实现了只要当数据被修改时，会自动返回一个新的对象，但是新的对象会尽可能的利用之前的数据结构而不会**

**对内存造成浪费；**

所以RTK里可以直接使用state.counter += 5这样类似的赋值/修改操作

类似的库还有[immutable-js]()及其[使用]()

### React中state的管理

组件内部状态，放组件自身的state中

共享数据、持久状态、路由改变、网络请求数据放redux