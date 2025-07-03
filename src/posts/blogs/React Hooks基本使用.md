---
title: 'React Hooks基本使用'
date: 2022-6-20 22:00:00
permalink: '/posts/blogs/React Hooks基本使用'
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


# React hooks

* 使用hooks可以**帮助我们在函数式组件**中**实现类似于class类组件中的state，生命周期**的效果
* hooks针对于函数式组件来使用**的，不能在class类组件中使用
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

* **多个useEffect一起使用（重要！！！）**
  * 使用多个useEffect可以将各个生命周期中的处理分离开来，不会像class类组件的生命周期里堆积逻辑的出现

```js
import React from 'react'
import { useState, useEffect } from 'react';

// 使用多个useEffect可以将各个生命周期中的处理分离开来，不会像class类组件的生命周期里堆积逻辑的出现
export default function MultipleUseEffect() {
  const [ counter, setCounter ] = useState(0);
  const [ other, setOther ] = useState('1234');

  useEffect(() => { // componentMounted
    console.log('发送网络请求');
  }, [])

  useEffect(() => { // componentMounted，componentUpdated
    console.log('DOM发生更新后');
  }) // 未传任何依赖，包括[]，相当于componentUpdated

  useEffect(() => {
    console.log('counter发生了改变：', counter);
  }, [counter]) // 对counter进行依赖，只有当counter发生改变才会回调内部函数

  useEffect(() => { // componentMounted
    console.log('订阅了一些事件');
    return () => { // componentWillUnMount
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

## useMemo(根据依赖项，对数据进行性能优化，缓存数据)

* 使用`useMemo`可以传递一个创建函数和依赖项，创建函数会需要返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值。简单来说，作用是**让组件中的函数跟随状态更新（即优化函数组件中的功能函数）；**
* 使用useMemo可以避免一些**不必要的计算和渲染；**

### 复杂计算逻辑优化使用场景

* 未优化前代码如下。当我们点击`div`区域时，此时触发的`setAge`，改变的是`age`，跟`getDoubleNum`方法其实是不相关的，但是如果你看下控制台，能看到**打印了多次`获取双倍Num`**，说明该方法不断被触发，其实是没必要触发的。如果方法内计算量大、对性能是有一定影响的，所以需要进行优化

```jsx
const [num, setNum] = useState(1)  
const [age, setAge] = useState(18)  
function getDoubleNum() {  
    console.log(`获取双倍Num${num}`)  
    return 2 * num  //	假设为复杂计算逻辑  
}  
return (  
  <div onClick={() => { setAge( age => age+1 )}}>  
      <br></br>  
      这是一个函数式组件————{ getDoubleNum() }  
      <br></br>  
      age的值为————{ age }  
      <br></br>  
  </div>  
) 
```

* 使用`useMemo`优化后代码如下。此时`getDoubleNum`方法是接收一个返回的值，所以要注意注释里所写的，括号是去掉了的。使用`useMemo`后，再点击`div`区域改变`age`的值，此时执行返回的`return 2*num`以及打印**只有在`num`更新时才会去执行，然后返回值给到`getDoubleNum`再渲染到视图上，这样就减少了不必要的计算达到优化的作用**

```jsx
const [num, setNum] = useState(1)  
const [age, setAge] = useState(18)  
const getDoubleNum = useMemo( () => {  
    console.log(`获取双倍Num${num}`)  
    return 2 * num  //	假设为复杂计算逻辑  
},[num] )  
return (  
    <div onClick={ () => { setAge( age => age+1 ) }  }>  
        <br></br>  
        这是一个函数式组件————num：{  getDoubleNum }  //  注意这里没括号，因为是返回值  
        <br></br>  
        age的值为————{ age }  
        <br></br>  
    </div>  
) 
```

### 父子组件重复渲染问题优化使用场景

* 未优化前代码如下。子组件包裹一个`memo`，但是包裹了还是会重新渲染, 为什么呢？因为我们定义的`info`是`const`定义的一个局部变量,**每次重新渲染都是重新定义一个新的`info`**，然后**子组件进行浅层比较**时候，`info`永远是不一样的，所以就会重新渲染（可以按照例子点击按钮，会发现子组件不断打印`我是子组件`）。如果子组件比较复杂的情况下，那么就会对页面性能产生影响

```jsx
const Child = memo( () => {  
    console.log('我是子组件')  
    return <p>我是子组件</p>  
})  
function Parent() {  
    const [show,setShow] = useState(true)  
    const info = {  
        name: 'Even',  
        age: 22  
    }
    return(
        <div>
            <Child info={info} />
            <button onClick={() => setShow(!show)}>点击更新状态</button>
        </div>
    )
}
```

* 使用`useMemo`后代码如下（只给出修改代码，其它代码同上例子）。这样子优化后，**子组件只会在初始化状态时渲染一次**，当我们点击按钮时，**因为`info`其包裹的`useMemo`依赖并没有改变**，返回值是同一个值，所以不会造成子组件重新渲染。

```jsx
const info = useMemo(() => {
  return {
    name: 'Even',
    age: 22
  }
}, [])
```

## useCallback(针对于函数，缓存函数，useMemo的语法糖)

* useCallback和useMemo很类似，作用**也是让某些操作、方法跟随状态的更新而去执行**。
* 与`useMemo`对比：
  * 可以简单这样看作，**`useMemo(() => Fn,deps)`相当于`useCallback(Fn,deps)`**
* 不同点：
  * `useCallback`是**对传过来的回调函数优化**，**返回的是一个函数**；`useMemo`返回值可以是任何，函数，对象等都可以
* 相同点：
  * 在使用方法上，`useMemo`与`useCallback`相同。接收一个函数作为参数，也同样接收第二个参数作为依赖列表

### 为何说`useCallback`缓存的是一个函数（重要区别）

*  useCallback虽然与`useMemo`相似，但其返回及缓存的是一个函数，对比以下示例代码。先说①②③三种情况的对比（可以复制代码然后分别注释①②③代码对比）

  *  当①情况时，只会打印一次`获取双倍Num1`，也就是首次渲染的打印，之后再点击`div`区域改变`age`的值都与其无关，所以不会执行。因为`getDoubleNum`已经获得了`useMemo`中传入的函数执行后返回的值了，获取之后，便将其缓存下来了


  * 当②情况时，首次渲染会打印一次`获取双倍Num1`，然后每点击一次都会打印`获取双倍Num1`，这是为什么呢？不是说`useCallback`也有缓存的功能吗？这是因为我们前面提到的，`useCallback`返回的是一个函数。因为`useCallback`中的函数是在当前组件内定义的，组件重新渲染，它自然也会重新渲染，这又会有同学说了，可是这也不能说明它缓存的是一个函数啊。那么你可以先看看③的依赖为`[]`情况时，那么你就能明白了。**所以说复杂计算逻辑的场景不适合使用useCallback来缓存，因为传入的函数内容会不断执行**。


  * 当③情况时，我们结合②③处标记代码，`set`只能存入唯一值，我们观察打印的`set`的长度
    * 当`useCallback`依赖为空`[]`时，我们连续多次点击`div`区域，虽然`useCallback`中的内容会不断执行，但是我们可以看到打印出来的`set`的长度一直都是1，这就是因为它不断将**同一个函数**添加进`set`，所以`set`的长度不变
    * 而当`useCallback`的依赖为`[num]`时，我们连续多次点击`div`区域，可以看到打印出来的`set`在不断累加，`1、2、3、4、5、6...`。因为`num`在改变，所以每一次缓存的函数都是一个**新的函数**，所以添加进`set`的函数是不一样的，所以`set`的长度点一次加一次

```jsx
const set = new Set()  
export default function StateFunction () {  
    const [num, setNum] = useState(1)
    const getDoubleNum = useMemo(() => {  
        console.log(`获取双倍Num${num}`)
        return 2 * num  //	①假设为复杂计算逻辑
    },[])  
    const getDoubleNumFn = useCallback(() => {
        console.log(`获取双倍Num${num}`)
        return 2 * num  //	②假设为复杂计算逻辑
    },[])
    set.add(getDoubleNum())  //	③注意set打印的长度变化（设置Callback的依赖为[]、[num]进行对比）  
    console.log('set.size：',set.size)  
    return (  
        <div onClick={() => {setNum( num => num+1 )}}>  
            <br></br>
            这是一个函数式组件————num：{ getDoubleNum } //①useMemo情况下
            这是一个函数式组件————num：{ getDoubleNumFn() } //②useCallback情况下
            <br></br>
        </div>  
    )  
}
```

### useCallback适用场景

* 可以对父子组件传参渲染的问题进行优化。简单来说就是，**父组件的传入函数不更新，就不会触发子组件的函数重新执行**

  * 通常而言，父组件更新了，那么子组件也会更新。但是**如果父组件传入子组件的内容不变**，那么子组件某些操作（某些操作是**指需要跟随传入内容的改变而同步进行的操作**）是没必要执行的，这会影响页面性能，所以我们可以对这情况进行优化。
  * 例如示例代码，我们将`getDoubleNum`传入子组件，此时点击`div`区域改变的是`num`的值，我们使用父组件`useCallback`配合子组件的`useEffect`来优化，**只有当父组件的`num`改变导致传入子组件的`getDoubleNum`改变的时候**，我们**才会执行子组件某些需要更新的操作**（即注释标注处代码），这样就可以**避免子组件一些没必要的更新操作反复执行而影响页面性能**


```jsx
function Parent () {
    const [num, setNum] = useState(1)
    const [age, setAge] = useState(18)

    const getDoubleNum = useCallback(() => {
        console.log(`获取双倍Num${num}`)
        return 2 * num
    }, [num])

    return (
        <div onClick={() => {setNum( num => num+1 )}}>
            这是一个函数式组件————num:{getDoubleNum()}
            <br></br>
            age的值为————age:{age}
            <br></br>
            set.size:{set.size}
            <Child callback={getDoubleNum}></Child>
        </div>
    )
}

function Child(props) {
    useEffect(() => {
        console.log('callback更新了') //这里代表的是需要跟随传入内容的改变而同步进行的操作
    }, [props.callback])

    return (
        <div>
            子组件的getDoubleNum{props.callback}
        </div>
    )
}
```

## useMemo和useCallback的正确使用场景

* 使用memo通常有三个原因：
  1. **防止不必要的effect**
  2. **防止不必要的re-render**
  3. **防止不必要的重复计算**
* 后两种优化往往被误用，导致出现大量的无效优化或冗余优化。下面详细介绍这三个优化方式。

### 防止不必要的effect

如果一个值被 useEffect 依赖，那它可能需要被缓存，这样可以避免重复执行 effect.

```jsx
const Component = () => {
  // 在 re-renders 之间缓存 a 的引用
  const a = useMemo(() => ({ test: 1 }), []);

  useEffect(() => {
    // 只有当 a 的值变化时，这里才会被触发
    doSomething();
  }, [a]);

  // the rest of the code
};
```

useCallback同理

```jsx
const Component = () => {
  // 在 re-renders 之间缓存 fetch 函数
  const fetch = useCallback(() => {
    console.log('fetch some data here');
  }, []);

  useEffect(() => {
    // 仅fetch函数的值被改变时，这里才会被触发
    fetch();
  }, [fetch]);

  // the rest of the code
};
```

当变量直接或者通过依赖链成为 useEffect 的依赖项时，那它可能需要被缓存。这是 useMemo 和 useCallback 最基本的用法。

### 防止不必要的re-render

* 正确的阻止re-render需要我们明确三个问题
  1. 组件什么时候会re-render
  2. 如何防止子组件re-render
  3. 如何判断子组件需要缓存

#### 组件什么时候会re-render

三种情况：

1. 当**本身的 props 或 state 改变时**。
2. **Context value 改变时，使用该值的组件会 re-render**。
3. 当**父组件重新渲染时，它所有的子组件都会 re-render，形成一条 re-render 链**。

第三个 re-render 时机经常被开发者忽视，**导致代码中存在大量的无效缓存**。

例如

```jsx
const App = () => {
  const [state, setState] = useState(1);

  const onClick = useCallback(() => {
    console.log('Do something on click');
  }, []);

  return (
	// 无论 onClick 是否被缓存，Page 都会 re-render 
    <Page onClick={onClick} />
  );
};
```

当使用 setState 改变 state 时，App 会 re-render，作为子组件的 Page 也会跟着 re-render。这里 useCallback 是完全无效的，它并不能阻止 Page 的 re-render。

#### 如何防止子组件re-render

**必须同时缓存 onClick 和组件本身，才能实现 Page 不触发 re-render。**

```jsx
const PageMemoized = React.memo(Page); // 缓存组件

const App = () => {
  const [state, setState] = useState(1);

  const onClick = useCallback(() => {
    console.log('Do something on click');
  }, []);

  return (
    // Page 和 onClick 同时 memorize
    <PageMemoized onClick={onClick} />
  );
};
```

由于使用了React.memo，PageMemoized 会**浅比较 props 的变化**后再决定是否 re-render。onClick 被缓存后不会再变化，所以 PageMemoized 不再 re-render。

然而，如果 PageMemoized 再添加一个未被缓存的 props，一切就前功尽弃 :weary:

```jsx
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);

  const onClick = useCallback(() => {
    console.log('Do something on click');
  }, []);

  return (
    // page WILL re-render because value is not memoized
    <PageMemoized onClick={onClick} value={[1, 2, 3]} />
  );
};
```

由于 value 会随着 App 的 re-render 重新定义，引用值发生变化，导致 PageMemoized 仍然会触发 re-render。

现在可以得出结论了，必须同时满足以下两个条件，子组件才不会 re-render：

1. 子组件自身被缓存。
2. 子组件所有的 prop 都被缓存。

#### 如何判断子组件需要缓存

1. 人肉判断，开发或者测试人员在研发过程中感知到渲染性能问题，并进行判断。
2. 通过工具，目前有一些工具协助开发者在查看组件性能:
   1. 如 [React Dev Tools Profiler](https://link.juejin.cn/?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fblog%2F2018%2F09%2F10%2Fintroducing-the-react-profiler.html)，[这篇文章](https://link.juejin.cn/?target=https%3A%2F%2Fmedium.com%2F%40ashr81%2Freact-performance-code-changes-part-i-fc8f2fddb37)介绍了使用方式
   2. 如这个 hooks：[useRenderTimes](https://link.juejin.cn/?target=https%3A%2F%2Fecomfe.github.io%2Freact-hooks%2F%23%2Fhook%2Fdebug%2Fuse-render-times)

### 防止不必要的重复计算

组件渲染才是性能的瓶颈，应该把 useMemo 用在程序里渲染昂贵的组件上，而不是数值计算上。当然，除非这个计算真的很昂贵，比如阶乘计算。

至于为什么不给所有的组件都使用 useMemo，上文已经解释了。useMemo 是有成本的，它会增加整体程序初始化的耗时，并不适合全局全面使用，它更适合做局部的优化。

### 总结

1. **大部分的 useMemo 和 useCallback 都应该移除**，他们可能没有带来任何性能上的优化，反而增加了程序**首次渲染的负担**，并增加程序的复杂性。

2. 使用 useMemo 和 useCallback 优化子组件 re-render 时，

   必须同时满足以下条件才有效

   1. 子组件已通过 React.memo 或 useMemo 被缓存
   2. 子组件所有的 prop 都被缓存

3. **不推荐默认给所有组件都使用缓存**，大量组件初始化时被缓存，可能导致过多的内存消耗，并影响程序初始化渲染的速度。

> 关于第三点有相反观点，详见：[Why We Memo All the Things](https://link.juejin.cn/?target=https%3A%2F%2Fattardi.org%2Fwhy-we-memo-all-the-things%2F%3Futm%5Fsource%3Dttalk.im%26utm%5Fmedium%3Dwebsite%26utm%5Fcampaign%3DTech%252520Talk)，作者推荐默认给全部组件都加上 React.memo，并给所有 props 都套上 useMemo。他认为这样可以降低工程师心智负担，让工程师不必再自己判断什么时候使用 memorize。 作者开发了一款 eslint 插件，以强制要求所有组件和 props 都添加缓存：[eslint-plugin-react-memo](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsteadicat%2Feslint-plugin-react-memo%3Futm%5Fsource%3Dttalk.im%26utm%5Fmedium%3Dwebsite%26utm%5Fcampaign%3DTech%252520Talk)

## useRef的使用(结合useState，useEffect，实现任意地方获取最新的state!!!痛点解决!!!)

* 简单来说`useRef`就是返回一个子元素索引，此索引在整个生命周期中保持不变。作用也就是：长久保存数据。注意事项，保存的对象发生改变，不通知。属性变更不会重新渲染
* 未使用`useRef`，如果我们有这样一个需求如下，需要当某个定时器自增的值达到限制条件后就清除该定时器，如下代码。此时以下的代码其实是没有办法完成给出的需求的，当`num`大于`10`后，会发现不停的打印`大于10了，清除定时器`，而其实是定时器没有清除掉的，所以会一直执行这两个打印内容，但是会发现打印出来的`timer`显示`undefined`，这是为什么呢？因为我们每次渲染都是通过`setInterval`重新返回的`timer`，`timer`也在更新，也就丢失了`timer`这个数据，导致无法准确清除某个需要清除的定时器(**每次都获取初始值的问题**)

```jsx
const [num, setNum] = useState(0)  
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
        clearTimeout(timer) 
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
        clearTimeout(ref.current)  
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

## useContext(跨组件通信、多子组件复用父组件数据)

### 跨组件通信

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

## useReducer

* useReducer仅仅是**useState的一种替代方案**：
  * 在某些场景下，**如果state的处理逻辑比较复杂**，我们**可以通过useReducer来对其进行拆分**；

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

## react父组件调用触发子组件方法(useRef)

* **子组件**

```jsx
const LevelObject = forwardRef((props: LevelObjectProps, ref: any) => { // 使用forwardRef将函数包裹，传入props和ref
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
})
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
    this.auditRef.current.resetForm();
    this.setState({
      visible: false,
    });
  };
 // 子组件声明ref
<AuditContent
    ref={this.auditRef}
/>
```

