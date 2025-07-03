---
title: 'React-Hooks(React18)'
date: 2023-07-07 9:55:00
permalink: '/posts/blogs/React-Hooks(React18)'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - React
 - javascript
 - typescript
 - hooks
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---




# React hooks

* 使用hooks可以**帮助我们在函数式组件**中**实现类似于class类组件中的state，生命周期**的效果
* hooks针对于**函数式组件来使用**的，不能在class类组件中使用，**不能在普通函数中使用hooks**，但是**可以在以use开头的函数中使用hooks**，react会将其认为是自定义hook
* 类组件中使用hooks方式可以自定义高阶函数中使用hooks
* 只能在**函数最外层调用 Hook**。**不要在循环、条件判断或者子函数**中调用

## useState

* 基本使用

```js
import React, { useState } from 'react'

export default function HookState() {
  // useState传入一个默认值将赋值给返回数组中的第一个数，第二个数为函数，可针对该数进行专门的赋值
  const [ count, setCount ] = useState(0);

  return (
    <div>
      <h3>当前计数：{count}</h3>
      <button onClick={e => {setCount(count+1)}}>+1</button>
      <button onClick={e => {setCount(count-1)}}>-1</button>
    </div>
  )
}
```

```js
import React from 'react'
import { useState } from 'react'

export default function HookState() {
  const [ students, setStudents ] = useState([
    { name: 'zjf', age: 22, height: 1.9 },
    { name: 'why', age: 18, height: 1.88 },
    { name: 'qwe', age: 24, height: 1.99 }
  ])

  function addAgeByIndex(index) {
    const newStudentList = [...students];
    newStudentList[index].age += 1;
    setStudents(newStudentList);
  }

  return (
    <div>
      <h3>学生列表</h3>
      <ul>
        {
          students.map((item, index) => {
            return (
              <li key={item.name}>
                <span>{item.name}</span><span>{item.age}</span>
                <button onClick={e => addAgeByIndex(index)}>age+1</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
```

* **setState和setCount均可以传入一个箭头函数(prevState)**

```js
import React, { useState } from 'react'

export default function HookState() {
  // 通过传入箭头函数的方式将返回值作为默认值赋给变量count
  const [ count, setCount ] = useState(() => 10);

  function addMoreCount() {
    // 重复性的setCount，其内部不是回调函数
    // 默认会对setCount进行合并操作,如下合并后只对count进行了+2(取最后一个setCount)
    // setCount(count + 10);
    // setCount(count + 1);
    // setCount(count + 2);
    // setCount内部使用回调函数拿到了上一次count的值进行操作，如下执行一次函数count加了30
    setCount((prevCount) => prevCount + 10 );
    setCount((prevCount) => prevCount + 10 );
    setCount((prevCount) => prevCount + 10 );
  }

  return (
    <div>
      <h3>当前计数：{count}</h3>
      <button onClick={e => {setCount(count+1)}}>+1</button>
      {/* setCount内传入回调函数可拿到上次count的数值，然后在箭头函数的返回内使用进行相应的赋值操作 */}
      <button onClick={e => {setCount((prevCount) => prevCount + 10)}}>+10</button>
      <button onClick={addMoreCount}>+30</button>
    </div>
  )
}
```

## useEffect(函数式组件的生命周期、依赖监听)

* Effect Hook 可以让你来完成一些**类似于class中生命周期的功能**；
* **基本使用**
* 注意区分**useEffect(() => { })**和**useEffecrt(() => { }, [])**

```js
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function CounterChaneTitle() {
  const [ counter, setCounter ] = useState(0);
  // useEffect无论是第一次还是后续组件更新都会执行该函数
  useEffect(() => {
    // console.log('有更新操作发生，第一次会回调，后续组件更新本函数也进行了回调');
    document.title = counter;
  })

  return (
    <div>
      <h3>当前计数：{counter}</h3>
      <button onClick={e => setCounter(counter + 1)}>+1</button>
    </div>
  )
}
```

* **useEffect第二个参数**(**事件的取消与订阅**，**componentDidMount，componentWillUnMount模拟实现**)

```js
import React, { useEffect, useState } from 'react'

export default function EffectSimulateCancle() {
  const [ counter, setCounter ] = useState(0);
  // useEffect只传第一个参数：第一次会进行订阅，后续每次更新都会执行取消订阅()然后订阅，最后一次会取消订阅
  // 可在useEffect的第二个参数中传入一个空数组，来解决重复性的取消订阅与订阅事件的发生
  useEffect(() => {
    console.log('订阅了一些事件');
    // 第一个参数的返回值可再传入回调函数，其内部相当于componentWillUnMount
    return () => {
      console.log('在此处取消订阅一些事件');
    }
  }, []) // 传入空数组防止重复性的操作，此时useEffect内部相当于componentDidMount包裹了componentWillUnMount

  return (
    <div>
      <h3>EffectSimulateCancle</h3>
      <h3>当前计数：{counter}</h3>
      <button onClick={e => setCounter(counter + 1)}>+1</button>
    </div>
  )
}
```

### useEffect模拟组件生命周期

* **多个useEffect一起使用（重要！！！）**
  * 使用多个useEffect可以将各个生命周期中的处理分离开来，不会像class类组件的生命周期里堆积逻辑的出现

```js
import React from 'react'
import { useState, useEffect } from 'react';

// 使用多个useEffect可以将各个生命周期中的处理分离开来，不会像class类组件的生命周期里堆积逻辑的出现
export default function MultipleUseEffect() {
  const [ counter, setCounter ] = useState(0);
  const [ other, setOther ] = useState('1234');

  useEffect(() => { // componentDidMounted
    console.log('发送网络请求');
  }, [])

  useEffect(() => { // componentDidMounted，componentDidUpdate
    console.log('DOM发生更新后');
  }) // 未传任何依赖，包括[]，相当于componentDidUpdate

  useEffect(() => {
    console.log('counter发生了改变：', counter);
  }, [counter]) // 对counter进行依赖，只有当counter发生改变才会回调内部函数

  useEffect(() => { // componentDidMounted
    console.log('订阅了一些事件');
    return () => { // componentWillUnmount
      console.log('取消订阅一些事件');
    }
  }, [])

  return (
    <div>
      <h3>多个useEffect的使用</h3>
      <h3>{counter}</h3>
      <h3>{other}</h3>
      <button onClick={e => setCounter(counter + 1)}>+1</button>
      <button onClick={e => setOther(other + '0')}>修改other</button>
    </div>
  )
}
```

## useRef的使用

* 闭包陷阱的解决方案useState+useRef
* 简单来说`useRef`就是返回一个子元素索引，此索引在整个生命周期中保持不变。作用也就是：长久保存数据。注意事项，保存的对象发生改变，不通知。**ref绑定的属性变更不会引起重新渲染**

### useRef解决闭包陷阱

```jsx
import React, { memo, useRef } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

let obj = null

const App = memo(() => {
  const [count, setCount] = useState(0)
  // ref不管组件怎么渲染得到的都是一开始的对象
  const nameRef = useRef()
  console.log(obj === nameRef) // 第一次为false后续都为true
  obj = nameRef

  // 通过useRef解决闭包陷阱
  const countRef = useRef()
  countRef.current = count

  const increment = useCallback(() => {
    // 直接使用count每次拿到的还是0
    // setCount(count + 1)

    setCount(countRef.current + 1)
  }, [])

  return (
    <div>
      <h2>Hello World: {count}</h2>
      <button onClick={e => setCount(count+1)}>+1</button>
      <button onClick={increment}>+1</button>
    </div>
  )
})

export default App
```

### useRef绑定DOM

```jsx
import React, { memo, useRef } from 'react'

const App = memo(() => {
  const titleRef = useRef()
  const inputRef = useRef()
  
  function showTitleDom() {
    console.log(titleRef.current)
    inputRef.current.focus()
  }

  return (
    <div>
      <h2 ref={titleRef}>Hello World</h2>
      <input type="text" ref={inputRef} />
      <button onClick={showTitleDom}>查看title的dom</button>
    </div>
  )
})

export default App
```

### useRef实践(定时器的精确清除)

* 未使用`useRef`，如果我们有这样一个需求如下，需要当某个定时器自增的值达到限制条件后就清除该定时器，如下代码。此时以下的代码其实是没有办法完成给出的需求的，当`num`大于`10`后，会发现不停的打印`大于10了，清除定时器`，而其实是定时器没有清除掉的，所以会一直执行这两个打印内容，但是会发现打印出来的`timer`显示`undefined`，这是为什么呢？因为我们每次渲染都是通过`setInterval`重新返回的`timer`，`timer`也在更新，也就丢失了`timer`这个数据，导致无法准确清除某个需要清除的定时器(**每次都获取初始值的问题**)

```jsx
const [num, setNum] = useState(0) 
// 问题行
let timer  
useEffect(() => {  
    timer = setInterval(() => {  
        setNum(num => num+1)  
    },400 )  
}, [])  
useEffect(() => {
    if(num > 10){ 
        console.log('大于10了，清除定时器')  
        console.log('timer：',timer)  
        //  因为每一个timer都是独立render的，所以获取不到  
        clearTimeout(timer) // 这里clear的timer不是刚开始定义时的timer了，而刚开始定义的timer还在执行num的加操作，所以会继续打印'大于10了，清除定时器'
    }  
}, [num])
return (  
    <div>  
        这是一个函数式组件————num:{num}  
    </div>  
)
```

* 使用`useRef`后，代码如下。当`num`自增到11后就打印了一次`大于10了，清除定时器`，然后就停止自增了，因为定时器被清除了。`ref`是一个对象，**`ref.current`存储了该定时器在整个生命周期中的`id`值**，所以当清除定时器的时候，可以准确清除这个定时器
  * 保存一个值，在整个生命周期中维持不变


```jsx
const [num, setNum] = useState(0)  
const ref = useRef()  
useEffect(() => {  
    ref.current = setInterval(() => {  
        setNum( num => num+1 )  
    },400 )
}, [])  
useEffect(() => {  
    if(num > 10){  
        console.log('大于10了，清除定时器')  
        console.log('ref.current',ref.current)  
        clearTimeout(ref.current) // 这里同上节代码不同的是使用ref进行了绑定，使得定时器能够精确的进行清除
    }  
}, [num])  
return (  
    <div>  
        这是一个函数式组件————num:{num}
    </div>  
) 
```

* **重新赋值`ref.current`不会主动触发页面重新渲染**。当我们将代码修改成下面这样，会在控制台打印发现`ref.current`的值打印为`111`，但是页面视图上显示的还是空，这是因为`ref`保存的对象发生改变，**不会主动通知，属性变更不会重新渲染**

```jsx
const [num, setNum] = useState(0)  
const ref = useRef()  
useEffect(() => {  
    ref.current = '111'  
    console.log('ref.current', ref.current)  
}, [])
return (  
    <div>  
    	  这是ref.current的值——ref.current:{ref.current}  
        <br></br>  
        这是一个函数式组件————num:{num}  
    </div>  
)
```

## useCallback(针对于函数，缓存函数，useMemo的语法糖，子组件渲染优化方案)

* 防止组件更新渲染时，内部函数(方法)的重复定义，useCallback每次返回的都是同一个函数，但是**实际上并没有优化**，**useCallback内部还是在每次更新渲染时进行了函数定义**
* useCallback若**需要获取到某个(或多个)最新的值，则在依赖中传入相应的值**即可，也就是所说的**避免闭包陷阱**
* useCallback可以**有效避免子组件的无效重复渲染**(在**子组件传递方法时套上useCallback**)，或者传递方法时不使用箭头函数，**传递方法使用function进行定义也可有效避免子组件的无效重复渲染**





* 总结以上为：**useRef+useCallback**
* **1.当需要将一个函数传递给子组件时, 最好使用useCallback进行优化, 将优化之后的函数, 传递给子组件，之后子组件的渲染将由useCallback中的依赖决定**
* **2. useCallback中需要获取某个或多个最新的state时，传入相应的依赖中即可。**

  * useCallback添加上相应的state依赖以及作为方法传递给子组件，在state发生改变且方法触发方法时，一样会引起子组件的重新渲染，使用**useRef.current代替useCallback的state依赖**
* 3.**useCallback有效避免无关state变化引起的子组件重复渲染**，**useRef有效避免相关state引起的子组件重复渲染(useCallback的依赖替代方案)**


![pCyjtOI.png](https://s1.ax1x.com/2023/07/06/pCyjtOI.png)

## useMemo(根据依赖项，对返回结果进行性能优化，缓存数据，子组件渲染优化)

* 使用`useMemo`可以传递一个创建函数和依赖项，创建函数会需要返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值。简单来说，作用是**让组件中的函数跟随状态更新（即优化函数组件中的功能函数）；**
* 使用useMemo可以避免一些**不必要的重复计算和渲染；**
* 只有当useMemo的依赖发生变化时才进行重新计算



总结为：

* 复杂计算逻辑的重复计算和渲染的优化
* 对象数据的重复定义引起的渲染优化


### useMemo和useCallback总结

实际上**useMemo和useCallback的优化都可以针对于子组件的渲染优化** ，**useMemo还可以优化单个组件中数据的重复逻辑计算**

**useMemo(() => fn, deps) 相当于 useCallback(() => {}, deps)**



## useContext(高阶组件跨组件通信、多子组件复用父组件数据)

### 跨组件通信

![pCs8wkV.png](https://s1.ax1x.com/2023/07/04/pCs8wkV.png)

```js
// App.js
import React from 'react'
import { createContext } from 'react';
import TestComponent from './hooks/03_hook_useContext/useContext的使用';

export const UserContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  return (
    <div>
      <UserContext.Provider value={{ name: 'zjf', age: 22 }}>
        <ThemeContext.Provider value={{ fontSize: '14px', color: 'red' }}>
          <TestComponent />
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

// context.js
import React, { useContext } from 'react'
import { UserContext, ThemeContext } from '../../App'

export default function UseContext() {
  const user = useContext(UserContext); // 直接通过useContext将Provider中的value解析出来即可使用
  const theme = useContext(ThemeContext);
  console.log(user, theme);

  return (
    <div>
      <h3>UseContext的使用</h3>
    </div>
  )
}
```

### 多子组件复用父组件数据

* 未使用`useContext`，我们有下列这样一个场景，我们**父组件有传入一个值到不同的子组件**中，示例给出的代码是`2`个这样的子组件，但是如果我需要添加的子组件特别多呢？总不能总是一个一个这样添加写入吧，而且如果传入的同一个变量名如果发生改变，还得一个个去改，所以我们可以用`useContext`优化一下代码

```jsx
function StateFunction () {  
    const [num, setNum] = useState(1)  
    return (  
        <div>  
            <button onClick={ ()=> setNum(num => num+1) }>增加num的值+1</button>  
            <br></br>  
            这是一个函数式组件——num:{  num }  
            <Item1 num={num}></Item1>  
            <Item2 num={num}></Item2>  
            //	......  
        </div>  
    )  
}  
function Item1 (props) {  
    return (  
        <div>  
            子组件1 num：{ props.num }  
        </div>  
    )  
}  
function Item2 (props) {  
    return (  
        <div>  
            子组件2 num：{ props.num }  
        </div>  
    )  
}
```

* 使用`useContext`优化后，代码如下，这样我们只需要在子组件中使`useContext(Context句柄)`来获取数据即可，添加同类子组件时不需要再关注父组件中子组件定义时的`props`传入值，使用方法如下

  - 需要引入`useContetx`，`createContext`两个内容
  - 通过`createContext`创建一个context句柄
  - `Context.Provider`来确定数据共享范围
  - 通过`value`来分发内容
  - 在子组件中，通过`useContext(Context句柄)`来获取数据
  - **注意事项**，上层数据发生改变，肯定会触发重新渲染（点击`button`按钮触发父组件更新传入的`num`值能看到子组件重新渲染）

```jsx
const Context = createContext(null)  
function StateFunction () {  
    const [num, setNum] = useState(1)  
    return (  
        <div>  
            <button onClick={ ()=> setNum(num => num+1) }>增加num的值+1</button>  
            <br></br>  
            这是一个函数式组件——num:{  num }  
            <Context.Provider value={num}>  
                <Item3></Item3>  
                <Item4></Item4>  
            </Context.Provider>  
        </div>  
    )  
}  
function Item3 () {  
    const num = useContext(Context)  
    return (  
        <div>  
            子组件3: { num }  
        </div>  
    )  
}  
function Item4 () {  
    const num = useContext(Context)  
    return (  
        <div>  
            子组件4: { num+2 }  
        </div>  
    )  
}
```

## [useSelector(redux)](https://blog.zhujinfa.top/redux%E5%A4%8D%E5%AD%A6/#react-redux%E7%9A%84hooks)

### shallowEqual性能优化

useSelector的浅层比较，在一个reducer模块中的state的某个属性发生改变时，与其相关联的使用到了该state的组件将一样会被重新渲染，通过useSelector的第二个参数shallowEqual进行浅层比较即可避免这种情况出现

详情请看代码

```jsx
import React, { memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { addNumberAction, changeMessageAction, subNumberAction } from './store/modules/counter'


// memo高阶组件包裹起来的组件有对应的特点: 只有props发生改变时, 才会重新渲染
const Home = memo((props) => {
  // 父组件中使用了redux counter模块中的count如果父组件中不进行浅层比较shallowEqual
  // 那么子组件中改变counter模块中的message将会引起父组件的重新渲染
  const { message } = useSelector((state) => ({
    message: state.counter.message
  }), shallowEqual)

  const dispatch = useDispatch()
  function changeMessageHandle() {
    dispatch(changeMessageAction("你好啊, 师姐!"))
  }

  console.log("Home render")

  return (
    <div>
      <h2>Home: {message}</h2>
      <button onClick={e => changeMessageHandle()}>修改message</button>
    </div>
  )
})


const App = memo((props) => {
  // 1.使用useSelector将redux中store的数据映射到组件内
  const { count } = useSelector((state) => ({
    count: state.counter.count
  }), shallowEqual)

  // 2.使用dispatch直接派发action
  const dispatch = useDispatch()
  // 子组件中使用了redux counter模块中的message如果子组件中不进行浅层比较shallowEqual
  // 那么父组件中改变counter模块中的count将会引起子组件的重新渲染
  function addNumberHandle(num, isAdd = true) {
    if (isAdd) {
      dispatch(addNumberAction(num))
    } else {
      dispatch(subNumberAction(num))
    }
  }

  console.log("App render")

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => addNumberHandle(1)}>+1</button>
      <button onClick={e => addNumberHandle(6)}>+6</button>
      <button onClick={e => addNumberHandle(6, false)}>-6</button>

      <Home/>
    </div>
  )
})

export default App
```

## [useDispatch](https://blog.zhujinfa.top/redux%E5%A4%8D%E5%AD%A6/#react-redux%E7%9A%84hooks)

以上两个hooks仅**是react-redux库中connect函数的替代方案**，**connect可在类组件和函数式组件中使用，useSelector和useDispatch仅在函数式组件中使用**

connect方式：

![pC6FQKS.png](https://s1.ax1x.com/2023/07/06/pC6FQKS.png)

hooks方式

![pC6FJ5n.png](https://s1.ax1x.com/2023/07/06/pC6FJ5n.png)

## useReducer(复杂数据的管理方案)

redux取代useReducer方案，useReducer取代useState处理复杂数据，所以最终为了规范大部分数据还是用redux，与组件关系紧密再用useState，复杂数据再考虑useReducer

* useReducer仅仅是**useState的一种替代方案**：
  * 在某些场景下，**如果state的处理逻辑比较复杂**，我们**可以通过useReducer来对其进行拆分**；

![pCsJvQg.png](https://s1.ax1x.com/2023/07/04/pCsJvQg.png)

```js
// reducer./js
export default function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return {...state, counter: state.counter + 1};
    case "decrement":
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
}

// home.js
import React, { useState, useReducer } from 'react';

import reducer from './reducer';

export default function Home() {
  // const [count, setCount] = useState(0);
  // useReducer第一个参数为一个reducer函数,第二个参数为state的初始化值(对象)
  // useReducer以数组的方式返回state对象和dispatch函数
  const [state, dispatch] = useReducer(reducer, {counter: 0});

  return (
    <div>
      <h2>Home当前计数: {state.counter}</h2>
      <button onClick={e => dispatch({type: "increment"})}>+1</button>
      <button onClick={e => dispatch({type: "decrement"})}>-1</button>
    </div>
  )
}

// profile.js
import React, { useReducer } from 'react';

import reducer from './reducer';

export default function Profile() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  return (
    <div>
      <h2>Profile当前计数: {state.counter}</h2>
      <button onClick={e => dispatch({ type: "increment" })}>+1</button>
      <button onClick={e => dispatch({ type: "decrement" })}>-1</button>
    </div>
  )
}
```

* 以前是只能在类组件中使用`Redux`，现在我们可以通过`useReducer`在函数式组件中使用`Redux`。作用是可以从状态管理的工具中获取到想要的状态。
  * 如何使用`useReducer`。`Redux`必须要有的内容就是仓库`store`和管理者`reducer`。而`useReducer`也是一样的，需要创建数据仓库`store`和管理者`reducer`，即示例代码注释处。然后我们就可以通过`①`处的定义一个数组获取状态和改变状态的动作，触发动作的时候需要传入`type`类型判断要触发`reducer`哪个动作，然后进行数据的修改。需要注意的地方是，在`reducer`中`return`的对象中，需要将`state`解构，否则状态就剩下一个`num`值了

```jsx
const store = {
    age:18,
    num:1
}	//	数据仓库

const reducer = (state, action) => {
    switch(action.type) {
        case 'add':
            return { ...state, num: action.num+1 }
        default:  
            return { ...state }
    }
} //	管理者

function StateFunction () {  
    const [state,dispacth] = useReducer(reducer, store)  //	①  
    return (
        <div>
            <button onClick={() => dispacth({ type: 'add', num: state.num })}>
                增加num的值+1
            </button>
            <br></br>
            这是一个函数式组件——num:{ state.num }  
        </div>  
    )  
}
```

## useImperativeHandle(子组件节点的权限控制)

**限制父组件对子组件ref节点的操作权限**

```jsx
import React, { memo, useRef, forwardRef, useImperativeHandle } from 'react'

// 注意父组件中通过ref获取子组件节点的方式
const HelloWorld = memo(forwardRef((props, ref) => {

  const inputRef = useRef()

  // 子组件对父组件传入的ref进行处理,限制父组件对子组件ref节点的操作权限
  useImperativeHandle(ref, () => {
    // 返回的对象为父组件中ref所指向
    return {
      focus() {
        console.log("focus")
        inputRef.current.focus()
      },
      setValue(value) {
        inputRef.current.value = value
      }
    }
  })

  return <input type="text" ref={inputRef}/>
}))


const App = memo(() => {
  const titleRef = useRef()
  const inputRef = useRef()

  function handleDOM() {
    // 子组件中仅限制了下列两种方法的使用权限
    inputRef.current.focus()
    inputRef.current.setValue("哈哈哈")
  }

  return (
    <div>
      <h2 ref={titleRef}>哈哈哈</h2>
      <HelloWorld ref={inputRef}/>
      <button onClick={handleDOM}>DOM操作</button>
    </div>
  )
})

export default App
```

### react父组件调用触发子组件方法(useRef)

* **子组件**

```jsx
const LevelObject = memo(forwardRef((props: LevelObjectProps, ref: any) => { // 使用forwardRef将函数包裹，传入props和ref
  // 选中的数据项
  const [selectedPersonList, setSelectedPersonList] = useState<{ name: string, id: number }[]>([]);
  
  useImperativeHandle(ref, () => ({ // 将需要触发的方法放入useImperativeHandle内,useImperativeHandle为固定写法
    initState
  }))

  const initState = () => {
    setSelectedPersonList([]);
  }

  return (
    <div className="lg_Object">
    </div>
  )
}))
```

* **父组件(函数式组件)**

```jsx
export default function AddPunish(props: Props) {
  const levelObject: any = useRef(null); // 注意写法
  
  return (
  	<LevelObject ref={levelObject} />
    <button onClick={() => { levelObject?.current.initState(); }} ></button> // 触发
  )
}
```

* **父组件(类组件)**

```jsx
constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.auditRef = React.createRef();
  }
  
handleCancel = () => {
    this.auditRef.current.initState();
    this.setState({
      visible: false,
    });
  };
 // 子组件声明ref
<AuditContent
    ref={this.auditRef}
/>
```

## useLayoutEffect(DOM更新渲染前的调用)

* **useEffect会在渲染的内容更新到DOM上之后执行，不会阻塞DOM的更新**；
* **useLayoutEffect会在数值变化后，渲染的内容更新到DOM上之前执行，会阻塞DOM的更新**；
* **尽量不使用，防止出现较长时间的阻塞情况出现**

## Raect18新增hook(useId，useTransition，useDeferredValue)

## useTransition(延迟更新，防止阻塞)

* [faker假数据创建库的使用](https://github.com/faker-js/faker)


* 官方解释：**返回一个状态值表示过渡任务的等待状态**，以及一个**启动该过渡任务的函数**。
* useTransition到底是干嘛的呢？它其实在**告诉react对于某部分任务的更新优先级较低，可以稍后进行更新**。

![pC6JnG6.png](https://s1.ax1x.com/2023/07/06/pC6JnG6.png)

```jsx
import React, { memo, useState, useTransition } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const [pending, startTransition] = useTransition()

  function valueChangeHandle(event) {
    startTransition(() => {
      // 将filter操作使用transition进行延迟(后续执行)
      
      const keyword = event.target.value
      const filterShowNames = namesArray.filter(item => item.includes(keyword))
      setShowNames(filterShowNames)
    })
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      {/* // 当filter执行时pending为true,显示加载动画 */}
      <h2>用户名列表: {pending && <span>data loading</span>} </h2>
      <ul>
        {
          showNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App
```

## useDeferredValue(降低某段代码更新层级，防止阻塞更新)

* 官方解释：**useDeferredValue 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后**。
* 在明白了useTransition之后，我们就会发现useDeferredValue的作用是一样的效果，可以让我们的**更新延迟**，而useTransition可以获取到等待的状态pending

![pC6Ymwj.png](https://s1.ax1x.com/2023/07/06/pC6Ymwj.png)

```jsx
import React, { memo, useState, useDeferredValue } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  // 对state数组生成一个延迟数组，当showNames的数组已经修改完成，deferedShowNames才发生改变
  const deferedShowNames = useDeferredValue(showNames)

  function valueChangeHandle(event) {
    const keyword = event.target.value
    const filterShowNames = namesArray.filter(item => item.includes(keyword))
    setShowNames(filterShowNames)
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: </h2>
      {/* 直接使用deferedShowNames数组进行展示 */}
      <ul>
        {
          deferedShowNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App
```


## SPA页面的两个缺陷

### 与SEO搜索引擎优化

**SPA单页面富应用是不利于SEO(Search Engine Optimization)的**，在**百度进行爬虫时爬到的是页面的index.html，对其meta进行匹配排序**，**由于SPA应用的index.html中东西是非常少的，将不利于网站的搜索排名(可能会非常靠后)**，所带来的的流量会非常少，所以**需要进行SEO优化的方式来提高网站的检索度**

### SSR服务端渲染

**SPA单页面富应用，请求页面的流程为下载index.html，bundle.js，运行js，渲染到浏览器**

**早期SSR(JSP，PHP，ASP)页面是在服务器端进行渲染的，浏览器只需请求相应的页面进行展示即可**

![pC6eNG9.png](https://s1.ax1x.com/2023/07/06/pC6eNG9.png)

## SSR同构应用

* 什么是同构？
  * **一套代码既可以在服务端运行又可以在客户端运行，这就是同构应用**。
* 同构**是一种SSR的形态，是现代SSR的一种表现形式**。
  * 当用户发出请求时，先在**服务器通过SSR渲染出首页的内容**。
  * 但是**对应的代码同样可以在客户端被执行**。
  * **客户端执行的目的包括事件绑定等以及其他页面切换时也可以在客户端被渲染(交互的注入hydrate)**；

![pC6un8H.png](https://s1.ax1x.com/2023/07/06/pC6un8H.png)

### Hydration操作注入解释

* 在进行 **SSR 时，我们的页面会呈现为 HTML**。
  * 但**仅 HTML 不足以使页面具有交互性**。例如，浏览器端 JavaScript 为零的页面不能是交互式的（没有 JavaScript 事件处理程序来响应用户操作，例如单击按钮）。
  * **为了使我们的页面具有交互性，除了在 Node.js 中将页面呈现为 HTML 之外**，我们的 **UI 框架（Vue/React/...）还在浏览器中加载和呈现页面。（它创建页面的内部交互，然后将内部交互映射到我们在 Node.js 中呈现的 HTML 的 DOM 元素**。）
* 这个过程称为**hydration**。

### useId

useId是一个用于**生成横跨服务端和客户端的稳定的唯一ID的hook**，能够**保证服务端和客户端产生的id一致**，**避免出现hydration不匹配的hook**



* useId是**用于react的同构应用开发的**，前端的**SPA页面并不需要使用**到
* useId可以**保证应用程序在客户端和服务器端生成唯一的ID**，这样可以**有效的避免通过一些手段生成的id不一致，造成hydration mismatch**；

![pC63URU.png](https://s1.ax1x.com/2023/07/06/pC63URU.png)

```jsx
import React, { memo, useId, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)

  const id = useId()
  // 每次渲染生成的id都是一致
  console.log(id)

  return (
    <div>
      <button onClick={e => setCount(count+1)}>count+1:{count}</button>

      <label htmlFor={id}>
        用户名:<input id={id} type="text" />
      </label>
    </div>
  )
})

export default App
```

## 自定义Hooks练习(逻辑的复用)

**自定义的hook必须以use开头，不然会被当成普通函数来用**

**组件必须大写开头，hooks必须use开头**

### 生命周期的复用

```jsx
import React, { memo, useEffect, useState } from 'react'

// 复用的hook
function useLogLife(cName) {
  useEffect(() => {
    console.log(cName + "组件被创建")
    return () => {
      console.log(cName + "组件被销毁")
    }
  }, [cName])
}

const Home = memo(() => {
  useLogLife("home")

  return <h1>Home Page</h1>
})

const About = memo(() => {
  useLogLife("about")

  return <h1>About Page</h1>
})

const App = memo(() => {
  const [isShow, setIsShow] = useState(true)

  useLogLife("app")

  return (
    <div>
      <h1>App Root Component</h1>
      <button onClick={e => setIsShow(!isShow)}>切换</button>
      { isShow && <Home/> }
      { isShow && <About/> }
    </div>
  )
})

export default App

```

### useContext的获取封装

![pCyXcdK.png](https://s1.ax1x.com/2023/07/05/pCyXcdK.png)

### 窗口滚动位置封装

window.addEventListener('scroll', scrollHandler)

window.removeEventListener('scroll', scrollHandler)

![pCyjmO1.png](https://s1.ax1x.com/2023/07/05/pCyjmO1.png)

### useLocalStorage(有用)

![pC6PKit.png](https://s1.ax1x.com/2023/07/06/pC6PKit.png)