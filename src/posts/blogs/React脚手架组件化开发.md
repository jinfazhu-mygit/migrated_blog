---
title: 'React脚手架组件化开发'
date: 2022-6-1 21:30:00
permalink: '/posts/blogs/React脚手架组件化开发'
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



## React脚手架组件化开发

* 对于现在比较流行的三大框架都有属于自己的脚手架
  * Vue的脚手架：vue-cli
  * Angular的脚手架：angular-cli
  * React的脚手架：create-react-app
* 他们的作用都是帮助我们生成一个通用的目录结构，并且已经将我们所需的环境配置好了。
* 通过命令：**npm install -g create-react-app**全局安装create-react-app

## 组件化开发

* **React**的组件相对于Vue更加的**灵活和多样**，按照不同的方式可以分成很多类组件：
  * 根据组件的**定义方式**，可以分为：**函数组件(Functional Component )和类组件(Class Component)**；
  * 根据**组件内部是否有状态需要维护**，可以分成：**无状态组件(Stateless Component )和有状态组件(Stateful Component)**；
  * 根据**组件的不同职责**，可以分成：**展示型组件(Presentational Component)和容器型组件(Container Component)**；

### render函数的返回值

* 当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：
* **React 元素(jsx)**：
  * 例如， 会被 React 渲染为 DOM 节点， 会被 React 渲染为自定义组件
  * **无论是 <div/> 还是 <MyComponent> 均为 React 元素**
* **数组或 fragments**：使得 render 方法可以返回多个元素。
* **Portals**：可以渲染子节点到不同的 DOM 子树中
* **字符串或数值类型**：它们在 DOM 中会被渲染为文本节点
* **布尔类型或 null**：什么都不渲染。

```jsx
import { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      {/*<div>App</div>*/ },
      [
        <div>Hello</div>,
        <div>Hello React</div>
      ]
    )
  }
}
```

### 类组件

* 类组件的定义有如下要求：
  * **组件的名称是大写字符开头**（**无论类组件还是函数组件**）
  * **类组件**需要**继承自 React.Component**
  * 类组件**必须实现render函数**
* 在ES6之前，可以通过create-react-class 模块来定义类组件，但是目前**官网建议我们使用ES6的class类定义**。
* 使用class定义一个组件：
  * constructor是可选的，我们通常在**constructor中初始化一些数据**；
  * **this.state**中维护的就是我们组件内部的数据；
  * **render() 方法是 class 组件中唯一必须实现的方法**；

### 函数式组件

* 函数组件是**使用function来进行定义的函数**，只是**这个函数会返回和类组件中render函数返回一样的内容**。
* **函数组件有自己的特点**（当然，后面我们会讲hooks，就不一样了）
  * 没有生命周期，也会被更新并挂载，但是**没有生命周期函数**
  * **没有this**(组件实例）
  * **没有内部状态（state）**

```jsx
export default function App() {
  return (
    <div>
      <h3>Hello React,我是函数式组件</h3>
    </div>
  )
}
```

## 生命周期(类组件的生命周期)

* React组件也有自己的生命周期，了解组件的生命周期可以让我们在最合适的地方完成自己想要的功能；
* **生命周期是一个抽象的概念**，在生命周期的整个过程，分成了很多个阶段；
  * 比如**装载阶段（Mount）**，组件第一次在DOM树中被渲染的过程；
  * 比如**更新过程（Update）**，组件状态发生变化，重新更新渲染的过程；
  * 比如**卸载过程（Unmount）**，组件从DOM树中被移除的过程；
* React内部为了告诉我们当前处于哪些阶段，会对我们组件内部实现的某些函数进行回调，这些函数就是**生命周期函数**：
  * 比如实现**componentDidMount函数**：组件**已经挂载到DOM**上时，就会回调；
  * 比如实现**componentDidUpdate函数**：组件**已经发生了更新**时，就会回调；
    * 注意：在componentDidUpdate生命周期函数内如果要使用this.setState,一定要加上判断条件，防止形成循环调用导致栈溢出报错
  * 比如实现**componentWillUnmount**函数：**组件即将被移除**时，就会回调；
  * 我们可以**在这些回调函数中编写自己的逻辑代码**，来完成自己的需求功能；

### constructor

* 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数
* constructor中通常只做两件事情：
  * **通过给 this.state 赋值对象来初始化内部的state**；
  * **为事件绑定实例（this）；**

### componentDidMount

* **componentDidMount()** 会在**组件挂载后（插入 DOM 树中）立即调用**
* componentDidMount中通常进行哪里操作呢
  * **依赖于DOM的操作**可以在这里进行；
  * 在**此处发送网络请求就最好的地方**；（官方建议）
  * 可以在此处**添加一些订阅**（会在componentWillUnmount取消订阅）；

### componentDidUpdate

* **componentDidUpdate()** 会在**更新后会被立即调用**，首次渲染不会执
  行此方法。
  * 当**组件更新后，可以在此处对 DOM 进行操作**；
  * 如果你对更新前后的 **props 进行了比较**，也可以选择在此处进行网
    络请求；（例如，当 props 未发生变化时，则不会执行网络请求）。

### componentWillUnmount

* componentWillUnmount() 会在组件卸载及销毁之前直接调用。
  * 在此方法中**执行必要的清理操作**；
  * 例如，**清除 timer**，**取消网络请求或清除**
    在 **componentDidMount() 中创建的订阅**等；

### 不常用的生命周期函数

* **getDerivedStateFromProps**：**state 的值在任何时候都依赖于 props时使用**；该方法返回一个对象来更新state
* **getSnapshotBeforeUpdate**：在**React更新DOM之前回调的一个函数**，可以**获取DOM更新前的一些信息**（比如说滚动位置）；
* **shouldComponentUpdate**：该生命周期函数很常用，但是我们等待讲**性能优化**时再来详细讲解；

## 父子组件通信

### 父传子通信(类组件)

```jsx
import React, { Component } from 'react'

class ChildCpn extends Component {
  // constructor(props) { // 子类(派生类和父类constructor参数对应,默认复用父类的constructor代码)
  //   super(props); // 借用(复用)父类的属性,实现效果同下行代码
  //   // this.props = props;
  // }

  render() {
    const { name, age, height } = this.props;

    return (
      <h3>子组件展示数据: {name + ' ' + age + ' ' + height}</h3>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        {/*以属性的形式传给子组件*/}
        <ChildCpn name="why" age='18' height="1.88"/>
        <ChildCpn name="zjf" age='22' height="1.9"/>
      </div>
    )
  }
}
```

### 父传子通信(函数组件)

```jsx
import React, { Component } from 'react';

function ChildCpn(props) {
  const { name, age, height } = props;

  return (
    <h3>{name + ' ' + age + ' ' + height}</h3>
  )
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name="zjf" age="22" height="1.9"/>
      </div>
    )
  }
}
```

### 属性类型验证prop-types以及默认值设置

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

function ChildCpn(props) {
  const { name, age, height, names } = props;

  return (
    <div>
      <h3>{name + age + height}</h3>
      <ul>
        {
          names.map((item, index) => {
            return <li>{item}</li>
          })
        }
      </ul>
    </div>
  )
}
// prop-types类型检测
ChildCpn.propTypes = {
  name: PropTypes.string.isRequired, // 设置为required
  age: PropTypes.number,
  height: PropTypes.number,
  names: PropTypes.array
}
// 子组件默认值设置,设置了默认值require不报警告
ChildCpn.defaultProps = {
  name: 'why',
  age: 18,
  height: 1.88,
  names: ['aaa', 'bbb', 'ccc']
}
// 类组件类型检测
class ChildCpn2 extends Component {
  // 1.类属性添加方式
  static propTypes = {}
  // 1.类属性方式添加默认值
  static defaultProps = {}
}
// 2.
ChildCpn2.propTypes = {}
//2.
ChildCpn2.defaultProps = {}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name='zjf' age={22} height={1.9} names={[1, 2, 3, 4]}/>
        <ChildCpn/>
      </div>
    )
  }
}
```

### 子传父(自定义属性名传递函数)

```jsx
import React, { Component } from 'react';

class ChildCpn extends Component {
  render() {
    const { btnClick } = this.props;
    return (
      <button onClick={btnClick}>+1</button>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <div>
        <h3>当前计数：{this.state.count}</h3>
        <button onClick={e => this.increment()}>+</button>
        {/* 也是以属性的方式将函数传递给子组件 */}
        {/* 三种方法保证this的指向：bind, =>
        , e => { this.increment() } */}
        <ChildCpn btnClick={this.increment.bind(this)}/>
      </div>
    )
  }
  increment() {
    this.setState({
      count: this.state.count+1
    })
  }
}
```

### React中类似Slot的实现

```jsx
import React, { Component } from 'react'
import TabControl from './TabControl'
import TabControl2 from './TabControl2'

export default class App extends Component {
  render() {
    return (
      <div>
        <TabControl>
          <span>aaa</span>
          <strong>bbb</strong>
          <a href="www.baidu.com">ccc</a>
        </TabControl>
        {/* 直接传递jsx */}
        <TabControl2 
        tabLeft={<a href="/#">ccc</a>} 
        tabCenter={<strong>bbb</strong>} 
        tabRight={<span>aaa</span>}/>
      </div>
    )
  }
}
// TabControl2.js组件(传递jsx实现)  或 通过props.children[0]
import React, { Component } from 'react'
import './TabControl.css'

export default class TabControl2 extends Component {
  render() {
    const { tabLeft, tabCenter, tabRight } = this.props;
    return (
      <div className='tab-control'>
        <div className='tab-item tab-left'>
          {tabLeft}
        </div>
        <div className='tab-item tab-center'>
          {tabCenter}
        </div>
        <div className='tab-item tab-right'>
          {tabRight}
        </div>
      </div>
    )
  }
}
```

### 跨组件通信(Context)

#### 类组件跨组件通信

```jsx
import React, { Component } from 'react'

// 1.创建Context对象(()内部设置的是Context对象共享数据的默认值，当组件层级往上找共享数据没有找到是就使用该默认值)
const UserContext = React.createContext({
  nickName: 'why',
  age: 18
});

class ProfileHeader extends Component {
  render() {
    console.log(this.context);
    return (
      <div>
        <h3>昵称:{this.context.nickName}</h3>
        <h3>age:{this.context.age}</h3>
      </div>
    )
  }
}
// 3.设置类组件的contextType=创建出来的Context对象，获取到共享的context值
ProfileHeader.contextType = UserContext;

function Profile(props) {
  return (
    <div>
      <ProfileHeader/>
      <ul>
        <li>1234</li>
        <li>1234</li>
        <li>1234</li>
        <li>1234</li>
        <li>1234</li>
      </ul>
    </div>
  ) 
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: 'zjf',
      age: 22
    }
  }

  render() {
    return (
      <div>
        {/* 2.通过创建出来的context对象的Provider组件包裹，将相应的值共享出去 */}
        <UserContext.Provider value={this.state}>
          <Profile/>
        </UserContext.Provider>
      </div>
    )
  }
}
```

#### 函数式组件跨组件通信

```jsx
import React, { Component } from 'react'
// 1.创建context,2.provide提供，3.consumer消费使用
// 1.创建Context对象(()内部设置的是Context对象共享数据的默认值，当组件层级往上找共享数据没有找到是就使用该默认值)
const UserContext = React.createContext({
  nickName: 'why',
  age: 18
});
const ThemeContext = React.createContext({
  color: "blue"
})

function ProfileHeader(props) {
  return (
    <UserContext.Consumer>
      {
        value => {
          return (
            <ThemeContext.Consumer>
              {
                theme => {
                  return (
                    <div>
                      <h3 style={{color: theme.color}}>昵称:{value.nickName}</h3>
                      <h3>age:{value.age}</h3>
                      <h3>颜色：{theme.color}</h3>
                    </div>
                  )
                }
              }
            </ThemeContext.Consumer>
          )
        }
      }
    </UserContext.Consumer>
  )
}

function Profile(props) {
  return (
    <div>
      <ProfileHeader/>
      <ul>
        <li>1234</li>
        <li>1234</li>
        <li>1234</li>
        <li>1234</li>
        <li>1234</li>
      </ul>
    </div>
  ) 
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: 'zjf',
      age: 22
    }
  }

  render() {
    return (
      <div>
        {/* 2.通过创建出来的context对象的Provider组件包裹，将相应的值共享出去 */}
        <UserContext.Provider value={this.state}>
          <ThemeContext.Provider value={{color: "red"}}>
            <Profile/>  
          </ThemeContext.Provider> 
        </UserContext.Provider>
      </div>
    )
  }
}
```

### this.setState

* #### setState的异步更新

* setState设计为异步，可以显著的提升性能；

  * 为了**保证state里的数据和props传递的数据保持一致，setState必须和render函数的调用保持一致**
  * 但是如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的
  * 最好的办法应该是**获取到多个更新，之后进行批量更新**；

*  **react18之前在生命周期函数和合成事件中表现为异步**，在**原生事件中表现为同步**。 在**react18优化批处理之后，在任何地方调用setState都会批处理，因此都表现为异步**。

```js
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <h3>当前计数：{this.state.count}</h3>
        <button onClick={e => {this.increment()}}>+1</button>
      </div>
    )
  }

  componentDidUpdate() {
    // 2.更新完成后的数据(最新的数据集)
    console.log(this.state.count);
  }

  increment() {
    // 获取异步更新后的数据
    this.setState({
      count: this.state.count + 1
    }, () => {
      // 3.更新完成后的异步回调(最新的数据集)
      console.log(this.state.count);
    })
    // 1.旧数据(还未变化的数据)
    console.log(this.state.count);
  }
}
```

* 以下代码在**react18之前有效**，**保持setState的同步**
* this.setState()的原理为属性覆盖：**Object.assign({}, 原state, 新state相关的属性)，新属性进行覆盖，旧属性保留**

```js
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <h3>当前计数：{this.state.count}</h3>
        <button onClick={e => {this.increment()}}>+1</button>
        <button id="btn">操作+1</button>
      </div>
    )
  }

  componentDidMount() {
    // 2.原生事件内保持state的同步
    document.getElementById("btn").addEventListener("click", () => {
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count);
    })
  }

  increment() {
    // 1.将setState放入到setTimeout中
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      })
      console.log(this.state.count);
    }, 200);
  }
}
```

* setState的累加

```js
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <h3>当前计数：{this.state.count}</h3>
        <button onClick={e => {this.increment()}}>+1</button>
      </div>
    )
  }

  increment() {
    // this.setState({
    //   count: this.state.count + 1
    // })
    // setState传入函数进行的累加相当于reduce的累加
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1
      }
    })
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1
      }
    })
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1
      }
    })
  }
}
```

### 类组件shouldComponentUpdate生命周期的使用

* shouldComponentUpdate(nextProps, nextState) {}


* 但是如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给我们开发者增加非常多的工作量。
* 最好的方案是**判断props或者state中的数据是否发生了改变**，**来决定shouldComponentUpdate返回true或者false**；
* 我们可以将组件的类继承自**PureComponent**，就会自动根据props和state的变化来判断是否需要重新执行render函数

```js
import React, { PureComponent, Component } from 'react'

class ChildCpn extends PureComponent {
  render() {
    console.log('子组件render函数被调用');
    return (
      <div>我是子组件内容</div>
    )
  }
  // 让子组件继承自PureComponent即可实现自动检测props和state的变化
  // shouldComponentUpdate() {
  //   return false
  // }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: 'zjf'
    }
  }

  render() {
    console.log('App组件render函数被调用');
    return (
      <div>
        <h3>当前计数：{this.state.count}</h3>
        <button onClick={e => { this.increment() }}>+1</button>
        <button onClick={e => {this.changeText()}}>改变文本</button>
        <ChildCpn/>
      </div>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    // nextProps和nextState为最新的数据
    // 实现当count改变时调用render函数重新渲染页面，其他数据更新是不调用render()函数
    if(this.state.count !== nextState.count) {
      return true;
    }

    return false
  }

  increment() {
    this.setState({
      count: this.state.count+1
    })
  }

  changeText() {
    this.setState({
      message: 'why'
    })
  }
}
```

### memo的使用(针对函数式组件的重渲染优化)

```js
import React, { Component, memo } from 'react'

const MemoChildCpn = memo(function ChildCpn(props) {
  console.log('子组件被调用');
  return (
    <h3>我是子组件(函数式组件)内容</h3>
  )
})

export default class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      count: 0
    }
  }

  render() {
    console.log('App组件render函数被调用');
    return (
      <div>
        <h3>当前计数：{this.state.count}</h3>
        <button onClick={e => { this.increment() }}>+1</button>
        <MemoChildCpn/>
      </div>
    )
  }

  increment() {
    this.setState({
      count: this.state.count+1
    })
  }
}
```

### 不可变数据

```js
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {name: 'zjf', age:22},
        {name: 'why', age:18},
        {name: 'lilei', age:25}
      ]
    }
  }

  render() {
    return (
      <div>
        <h3>朋友列表</h3>
        <ul>
          {
            this.state.friends.map((item, index) => {
              return <li key={item.name}>
                        姓名：{item.name} 年龄：{item.age}
                        <button onClick={e => {this.increment(index)}}>+1</button>
                     </li>
            })
          }
        </ul>
        <button onClick={e => {this.addData()}}>新增数据</button>
      </div>
    )
  }

  addData() {
    const friend = { name:'lucy', age: 21 };
    // 推荐做法
    const newFriends = [...this.state.friends];
    newFriends.push(friend);
    this.setState({
      friends: newFriends
    })
  }

  increment(index) {
    const newFriends = [...this.state.friends];
    newFriends[index].age += 1;
    this.setState({
      friends: newFriends
    })
  }

  // shouldComponentUpdate(newProps, newState) {
  //   if(newState.friends !== this.state.friends) {
  //     return true;
  //   }
  //   // 一样就不用重新渲染
  //   return false;
  // }
}
```

### 全局事件传递(跨组件通信，兄弟组件通信，events库的使用)

* 前面通过**Context主要实现的是数据的共享**，但是在开发中如果有**跨组件之间的事件传递**，应该如何操作呢？
  * 在Vue中我们可以通过Vue的实例，快速实现一个事件总线（EventBus），来完成操作；
  * 在React中，我们可以依赖一个使用较多的库 events 来完成对应的操作；
* 我们可以通过npm或者yarn来安装events库：

```js
import React, { PureComponent } from 'react'

import { EventEmitter } from 'events'
// 创建事件总线eventBus
const eventBus = new EventEmitter();

class Home extends PureComponent {
  render() {
    return (
      <div>
        我是Home组件内容
      </div>
    )
  }

  componentDidMount() {
    eventBus.addListener('sayHello', this.handleProfileListener);
  }

  handleProfileListener(...args) {
    console.log(args);
  }
  // 一般需要在组件卸载时移除监听
  componentWillUnmount() {
    eventBus.removeListener('sayHello', this.handleProfileListener);
  }
}

class Profile extends PureComponent {
  render() {
    return (
      <div>
        我是Profile组件内容
        <button onClick={e => {this.emmitEvent()}}>发送全局事件</button>
      </div>
    )
  }
  // 发送事件
  emmitEvent() {
    eventBus.emit("sayHello", 1234, 'I am from Profile')
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home/>
        <Profile/>
      </div>
    )
  }
}
```

### ref、受控和非受控组件

#### react中ref的使用(三种方式)

* **传入字符串**，使用时通过 this.refs.传入的字符串格式获取对应的元素，已不推荐使用；
* **传入一个对象**，对象是通过 React.createRef() 方式创建出来的，使用时获取到创建的对象其中有一个current属性就是对应的元素
* **传入一个函数**，该函数会在DOM被挂载时进行回调，这个函数会传入一个元素对象，我们可以自己保存，使用时，直接拿到之前保存的元素对象即可
* 当 **ref 属性用于 HTML 元素**时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性；
* 当 **ref 属性用于自定义 class 组件**时，ref 对象接收组件的挂载实例作为其 current 属性；
* 不能在函数式组件中使用ref属性，因为他们没有实例

```js
import React, { PureComponent, createRef } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.titleRef2 = createRef();
    this.titleRef3 = null;
  }

  render() {
    return (
      <div>
        {/* 1.<h3 ref=字符串/对象/函数>受控组件内容</h3> */}
        <h3 ref="titleRef">Hello React</h3>
        {/* 2.官方推荐使用 */}
        <h3 ref={this.titleRef2}>Hello React</h3>
        {/* 3.回调函数 */}
        <h3 ref={(args) => this.titleRef3 = args}>Hello React</h3>
        <button onClick={e => {this.changeText()}}>改变文本</button>
      </div>
    )
  }

  changeText() {
    // 1.使用字符串的方式不推荐
    this.refs.titleRef.innerHTML = 'Hello zjf';
    // 2.使用对象的方式
    this.titleRef2.current.innerHTML = 'Hello why';
    // 3.回调函数方式
    this.titleRef3.innerHTML = 'Hello callback';
  }
}
```

#### 受控组件

* 在 HTML 中，表单元素（如`<input/>`,`<textarea/>`和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新;
* 而在 React 中，**可变状态（mutable state**）通常保存在组件的 state 属性中，并且只能通过使用 **setState()**来更新;
  * 1. 我们将两者结合起来，使React的**state成为“唯一数据源”**
  * 2. 渲染表单的 **React 组件还控制着用户输入过程中表单发生的操作**
  * 被 React 以这种方式控制取值的表单输入元素就叫做“**受控组件**”

```js
import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: 'zjf'
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => {this.handleSubmit(e)}}>
          <label htmlFor="username">
            {/* 下面的input就是一个受控组件，通过onchange和value控制的组件 */}
            用户：<input type="text" 
                        id='username' 
                        value={this.state.username} 
                        onChange={e => {this.handleChange(e)}}/>
          </label>
          <input type='submit' value='提交'/>
        </form>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault(); // 取消<input type='submit' value='提交'/>提交的默认事件?
    console.log(this.state.username); // 能拿到最新的数据
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
}
// select受控组件
render() {
  return (
    <div>
      <form onSubmit={e => {this.handleSubmit(e)}}>
        <select name="fruits" 
                value={this.state.fruits}
                onChange={e => {this.handleChange(e)}}>
          <option value="apple">苹果</option>
          <option value="banana">香蕉</option>
          <option value="orange">橘子</option>
        </select>
        <input type='submit' value='提交'/>
      </form>
    </div>
  )
}
```

#### 非受控组件

* React推荐大多数情况下使用 受控组件 来处理表单数据
* 如果要使用非受控组件中的数据，那么我们需要**使用 ref 来从DOM节点中获取表单数据**。

```js
import React, { PureComponent, createRef } from 'react'

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.usernameRef = createRef();
  }

  render() {
    return (
      <div>
        <form onSubmit={e => {this.handleSubmit(e)}}>
          <label htmlFor="username">
            {/* 下面的input就是一个受控组件，通过onchange和value控制的组件 */}
            用户：<input ref={this.usernameRef} type='text' id='username' />
          </label>
          <input type='submit' value='提交'/>
        </form>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault(); // 取消<input type='submit' value='提交'/>提交的默认事件?
    console.log(this.usernameRef.current.value); // 能拿到最新的数据
  }
}
```

### 高阶函数与高阶组件

#### 高阶函数

* 高阶函数的维基百科定义：至少**满足以下条件之一**
  * **接受一个或多个函数作为输入**；
  * **输出一个函数**
* JavaScript中比较常见的**filter、map、reduce都是高阶函数**

#### 高阶组件

* **高阶组件不是组件，是一个函数，参数是组件，返回值也是组件**；
* 1. **创建组件，创建高阶组件** 2. **传入组件，返回组件进行使用**
* 高阶组件的英文是 Higher-Order Components，简称为 HOC；
* 官方的定义：**高阶组件是参数为组件**，**返回值为新组件的函数**；
* 高阶组件并不是React API的一部分，它是基于React的
  组合特性而形成的设计模式；
* 高阶组件在一些React第三方库中非常常见：
  * 比如**redux中的connect**；
  * 比如**react-router中的withRouter**；

```js
import React, { PureComponent } from 'react'

class App extends PureComponent {
  render() {
    return (
      <div>
        App: {this.props.name}
      </div>
    )
  }
}
// 可以自定义组件在devtool工具的名字，通过组件.displayName设置别名
App.displayName = 'zjf';

// 高阶组件常见定义方式(传入组件，返回组件)
function enhanceFunction(WrappedComponent) {
  class NewComponent extends PureComponent { // 返回类组件
    render() {
      // 高阶组件内通信，必须加上{...this.props}将其父组件传递的数据传给新组件
      return <WrappedComponent {...this.props}/>
    }
  }
  NewComponent.displayName = 'why';
  return NewComponent;
}

function enhanceFunction2(WrappedComponent) {
  function NewComponent(props) { // 返回函数组件
    return <WrappedComponent {...props}/>
  }
  NewComponent.displayName = 'why2';
  return NewComponent;
}

const EnhanceComponent = enhanceFunction(App);
const EnhanceComponent2 = enhanceFunction2(App);

export default EnhanceComponent2;
```

#### 高阶组件的应用一(增强props,劫持props)

```js
import React, { PureComponent } from 'react'

class Home extends PureComponent {
  render() {
    return <h3>Home:{`昵称：${this.props.nickName} 等级：${this.props.level} 地区：${this.props.region}`}</h3>
  }
}
class About extends PureComponent {
  render() {
    return <h3>About:{`昵称：${this.props.nickName} 等级：${this.props.level} 地区：${this.props.region}`}</h3>
  }
}

// 定义一个高阶组件,对原来组件的props进行增强(相同的props)
function enhanceRegionComponent(WrappedComponent) {
  return props => {
    return <WrappedComponent {...props} region="中国"></WrappedComponent>
  }
}

const EnhancedHome = enhanceRegionComponent(Home);
const EnhancedAbout = enhanceRegionComponent(About);

class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <EnhancedHome nickName="zjf" level={90}/>
        <EnhancedAbout nickName="why" level={99}/>
      </div>
    )
  }
}

export default App;

// 结合context增强Props
import React, { PureComponent } from 'react'

// 创建context
const UserContext = React.createContext({
  nickName: '默认名字',
  level: -1,
  region: '中国'
})

// 定义一个高阶组件,抽离Consumer,增强props
function enhanceFunction(WrappedComponent) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          user => {
            return <WrappedComponent {...props} {...user}></WrappedComponent>
          }
        }
      </UserContext.Consumer>
    )
  }
}

class Home extends PureComponent {
  render() {
    return <h3>Home:{`昵称：${this.props.nickName} 等级：${this.props.level} 地区：${this.props.region}`}</h3>
  }
}
class About extends PureComponent {
  render() {
    return <h3>About:{`昵称：${this.props.nickName} 等级：${this.props.level} 地区：${this.props.region}`}</h3>
  }
}
// 经过context传参和高阶组件增强后的组件
const HomeEnhancedComponent = enhanceFunction(Home);
const AboutEnhancedComponent = enhanceFunction(About);

class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <UserContext.Provider value={{nickName: 'zjf', level: 90, region: 'zg'}}>
          <HomeEnhancedComponent/>
          <AboutEnhancedComponent/>
        </UserContext.Provider>
      </div>
    )
  }
}

export default App;
```

### 高阶组件的应用二(劫持jsx组件)

```js
import React, { PureComponent } from 'react';

class LoginPage extends PureComponent {
  render() {
    return <h2>LoginPage</h2>
  }
}
// 高阶组件登录验证
function withAuth(WrappedComponent) {
  const NewCpn = props => {
    const {isLogin} = props;
    if (isLogin) {
      return <WrappedComponent {...props}/>
    } else {
      return <LoginPage/>
    }
  }

  NewCpn.displayName = "AuthCpn"

  return NewCpn;
}

// 购物车组件
class CartPage extends PureComponent {
  render() {
    return <h2>CartPage</h2>
  }
}

const AuthCartPage = withAuth(CartPage);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthCartPage isLogin={true}/>
      </div>
    )
  }
}
```

```jsx
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const EnhanceAuth = (WrappedComonent: any) => {
  return (props: any) => {
    const noAuthPage = !localStorage.getItem('token') && window.location.pathname !== '/login'
    const navigate = useNavigate()

    useEffect(() => {
      console.log('wrapComponent effect:', localStorage.getItem('token'), window.location)
      if (noAuthPage) {
        // alert('非登录页无token111, 回登录页!')
        navigate('/login')
      }
    }, []);

    return <>
      {
        noAuthPage ? <></> : <WrappedComonent></WrappedComonent>
      }
    </>
  }
}

export default EnhanceAuth
```

#### 高阶组件的应用(劫持生命周期)

```js
import React, { PureComponent } from 'react';

// 创建高阶组件函数
function withRenderTime(WrappedComponent) {
  return class extends PureComponent {
    // 获取渲染开始的时间 beginTime
    UNSAFE_componentWillMount() {
      this.beginTime = Date.now();
    }

    // 获取渲染完成的时间 endTime
    componentDidMount() {
      this.endTime = Date.now();
      const interval = this.endTime - this.beginTime;
      // 输出渲染所经过的时间，WrappedComponent.name返回组件名
      console.log(`${WrappedComponent.name}渲染时间: ${interval}`)
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}

class Home extends PureComponent {
  render() {
    return <h2>Home</h2>
  }
}


class About extends PureComponent {
  render() {
    return <h2>About</h2>
  }
}

const TimeHome = withRenderTime(Home);
const TimeAbout = withRenderTime(About);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <TimeHome />
        <TimeAbout />
      </div>
    )
  }
}
```

### 组件化补充(ref的转发)

* **用于获取函数式组件中某个元素的DOM**

```js
import React, { PureComponent, createRef, forwardRef } from 'react';

class Home extends PureComponent {
  render() {
    return <h2>Home</h2>
  }
}

// 函数式组件上不能使用ref,使用高阶组件forwardRef返回组件即可加上ref
const Profile = forwardRef(function(props, ref) {
  return <p ref={ref}>Profile</p>
})

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.titleRef = createRef();
    this.homeRef = createRef();
    this.profileRef = createRef();
  }

  render() {
    return (
      <div>
        <h2 ref={this.titleRef}>Hello World</h2>
        <Home ref={this.homeRef}/>
        // 转发
        <Profile ref={this.profileRef} name={"why"}/>

        <button onClick={e => this.printRef()}>打印ref</button>
      </div>
    )
  }

  printRef() {
    console.log(this.titleRef.current);
    console.log(this.homeRef.current);
    console.log(this.profileRef.current);
  }
}
```

### 组件化补充(portals独立组件实现)

* **将渲染的内容独立于父组件，甚至是独立于当前挂载到的DOM元素中**

```js
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Modal extends PureComponent {
  render() {
    // 创建Portal,使得该返回的jsx独立于父组件
    return ReactDOM.createPortal(
      this.props.children,
      // 将该组件挂载到其他元素下
      document.getElementById("root")
    )
  }
}

class Home extends PureComponent {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Modal>
          <h2>Title</h2>
        </Modal>
      </div>
    )
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home/>
      </div>
    )
  }
}
```

### 组件化补充(fragment的使用)

* 开发中，我们总是在一**个组件中返回内容时包裹一个div**元素
* 我们又希望可以**不渲染这样一个div**应该如何操作?
* 使用**Fragment 允许你将子列表分组，而无需向 DOM 添加额外节点**

```js
import React, { PureComponent, Fragment } from 'react';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      friends: [
        {name: "why", age: 18},
        {name: "lilei", age: 20},
        {name: "kobe", age: 25},
      ]
    }
  }

  render() {
    return (
      // 加上fragment标签<Fragment></Fragment>
      <>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <div>
          {
            this.state.friends.map((item, index) => {
              return (
                <Fragment key={item.name}>
                  <div>{item.name}</div>
                  <p>{item.age}</p>
                  <hr/>
                </Fragment>
              )
            })
          }
        </div>
      </>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
```

### 组件化补充(strictMode的使用)

* StrictMode 是一个用来**突出显示应用程序中潜在问题的工具**
  * 与 **Fragment 一样，StrictMode 不会渲染任何可见的 UI**
  * 它**为其后代元素触发额外的检查和警告**
  * 严格模式检查**仅在开发模式下运行；它们不会影响生产构建**
* 可以**为应用程序的任何部分启用严格模式**
* 严格模式下可检查的：
  * **识别不安全的生命周期**：
  * **使用过时的ref API**
  * **使用废弃的findDOMNode方法**
    * 在之前的React API中，可以通过findDOMNode来获取DOM，不过已经不推荐使用了
  * **检查意外的副作用**
    * **组件的constructor会被调用两次**；
    * 是**严格模式下故意进行的操作，让你来查看在这里写的一些逻辑代码被调用多次时，是否会产生一些副作用**
  * 检测过时的**context API**
    * 早期的Context是通过static属性声明Context对象属性，通过getChildContext返回Context对象等方式来使用Context的

```js
import React, { PureComponent, StrictMode } from 'react';

class Home extends PureComponent {
  // 严格模式下constructor会被调用两次
  constructor(props) {
    super(props);

    console.log("home constrcutor");
  }

  // 严格模式下该生命周期不推荐使用
  // UNSAFE_componentWillMount() {
  //   console.log("home componentWillMount");
  // }

  render() {
    return (
      // 严格模式下ref指定字符串不推荐使用
      <div ref="title">
        Home
      </div>
    )
  }
}

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    console.log("profile constructor");
  }

  // UNSAFE_componentWillMount() {
  //   console.log("profile componentWillMount");
  // }

  render() {
    return (
      <div ref="title">
        Profile
      </div>
    )
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div>
        {/* 或<React.StrictMode></React.StrictMode> */}
        <StrictMode>
          <Home/>
        </StrictMode>
        <Profile/>
      </div>
    )
  }
}
```

## react中的样式css

### 内联样式

### 普通css

* 普通的css我们通常会编写到一个单独的文件，之后再进行引入。
* 如果我们按照普通的网页标准去编写，那么也不会有太大的问题；
* 但是**普通的css都属于全局的css，样式之间会相互影响**；
* 这种编写方式最大的问题是**样式之间会相互层叠**掉；

### css modules

* React的脚手架已经内置了css modules的配置：
  * **.css/.less/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss** 等；
  * 之后就可以引用并且进行使用了；
* css modules确实解决了**局部作用域**的问题，也是很多人喜欢在React中使用的一种方案。
* 但是这种方案也有自己的缺陷:
  * 引用的类名，**不能使用连接符(.home-title)**，在JavaScript中是不识别的；
  * 所有的className都必须使用{style.className} 的形式来编写；
  * 不方便动态来修改某些样式，依然需要使用内联样式的方式；

### css in js（styled-components解析本地图片需使用变量的方式）

* CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括**类似于CSS预处理器一样**的**样式嵌套、函数定义、逻辑复用、动态修改状态**等等；
* 目前比较流行的CSS-in-JS的库有哪些呢？
  * styled-components
  * emotion
  * glamorous
* 目前可以说styled-components依然是社区最流行的CSS-in-JS库
* yarn add styled-components或npm install styled-components
* vscode要安装**vscode-styled-component插件**才会有css提示

```js
import React, { PureComponent } from 'react'

import styled from 'styled-components'
// 通过标签模板字符串执行styled.div函数，返回相应的组件
const StyledComponent = styled.div`  // 正常开发情况下会将该组件放在另一个文件中导入使用
  font-size: 45px;
  color: red;
  .banner {
    background-color: #24a1ff;
    span {
      color: #fff;
      &.active {
        color: red;
      }
      &:hover {
        color: blue;
      }
      &::after {
        content: 'aaa'
      }
    }
  }
`

const TitleWrapper = styled.h3`
  text-decoration: underline;
`

export default class Profile extends PureComponent {
  render() {
    return (
      <StyledComponent>
        <TitleWrapper>Profile</TitleWrapper>
        <div className="banner">
          <span>轮播图1</span>
          <span className='active'>轮播图2</span>
          <span>轮播图3</span>
        </div>
      </StyledComponent>
    )

  }
}
```

#### styled-components使用本地图片

```css
import styled from 'styled-components';
import img from '../../../images/test.png';

export const CssDiv = styled.div`
  width: 200px;
  height: 140px;
  background: url(${img}) 0px 0px norepeat;
`
```

#### css in js最牛用法

```js
import React, { PureComponent } from 'react'

import styled from 'styled-components'
// styled.input.attrs函数执行完返回一个函数(attrs的使用)
// 里面的参数会同组件接收到的props一起放到props里供标签字符串回调函数使用(props穿透)
const JFInput = styled.input.attrs({
  borderColor: 'red'
})`
  background-color: lightblue;
  border-color: ${props => props.borderColor};
  color: ${props => props.color};
`

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    }
  }

  render() {
    return (
      <div id="home">
        <h3>Home</h3>
        <JFInput type="password" color={this.state.color}/>
      </div>
    )
  }
}
```

#### styled-components样式继承以及主题色

```js
import React, { PureComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'

const JFButton = styled.button`
  padding: 10px 20px;
  border: 2px solid red;
  color: red;
`
// styled样式的继承
const HYButton = styled(JFButton)`
  color: ${props => props.theme.styleThemeColor};
`

export default class App extends PureComponent {
  render() {
    return (
      // ThemeProvider传主题，后续所有组件均可拿到值
      <ThemeProvider theme={{styleThemeColor: 'blue', fontSize: '30px'}}>
        <JFButton>123</JFButton>
        <HYButton>456</HYButton>
      </ThemeProvider>
    )
  }
}
```

### react中svg的直接组件化使用

```jsx
import { ReactComponent as deleteIcon } from '@/components/filePreview/fileIcon/images/deleteIcon.svg';

function Component() {
  let DeleteIcon = deleteIcon;
  return (
  	<DeleteIcon></DeleteIcon> // 直接当成组件使用
  )
}
```



### react中添加className

```jsx
  <h3 className={"foo " + (this.state.isActive? 'active': '')}>456</h3>
    <h3 className={['foo', 'bar', 'baz'].join(' ')}>123</h3>
  </div>
```

* 我们可以借助于一个**第三方的库：classnames**
* yarn add classsnames  npm install classnames

```jsx
<div>
  {/* 原生react添加class */}
  <h3 className={"foo " + (this.state.isActive? 'active': '')}>456</h3>
  <h3 className={['foo', 'bar', 'baz'].join(' ')}>123</h3>
  {/* classnames库添加class */}
  {/* 调用classNames()函数，会将传入大部分的参数转成字符串以空格间隔返回 */}
  <h3 className='foo bar baz'>我是标题1</h3>
  <h3 className={classNames('foo', 'bar', 'baz')}>我是标题2</h3>
  <h3 className={classNames({"active": this.state.isActive, 'bar': true})}>我是标题3</h3>
  <h3 className={classNames({'active': true}, 'bar', {'foo': false}, null, undefined)}>我是标题4</h3>
  <h3 className={classNames(['active', 'foo', 'bar'])}>我是标题5</h3>
  <h3 className={classNames(['active', {'foo': true}])}>我是标题6</h3>
</div>
```

### [antdesign库的使用](https://ant.design/components/overview-cn/)

* 具体参照文档
* craco库修改全局样式也参照antdesign库的文档[在create-react-app中使用](https://ant.design/docs/react/use-with-create-react-app-cn)，进行全局主题的配置


### 深度stringify(全拷贝)

* 普通的JSON.stringify函数对一个对象或者数组进行stringify的时候遇到函数、undefined、symbol拷贝不下来，使用以下函数即可实现
* 使用示例：

```js
const obj = {
            a: NaN,
            b: '',
            c: true,
            d(){
                console.log('d')
            },
            e: async function*(){
                consoel.log('e')
            },
            f: class {},
            g: [],
            h: new Map([[{}, []]]),
            i: new Set([1,2,1,3]),
            j: /^j$/g,
            [Symbol('k')]: Symbol.for('k'),
            l: 18n,
            m: Math,
            n: new ArrayBuffer(9)
        }
 
    const jsStr = stringify(obj); // 使用该函数进行深度stringify
    console.log(jsStr)
    console.log(eval(jsStr)) // 输出复制后的源对象
```

* 以下是该函数的源码，可直接复制引入到项目中进行使用

```js
/**
 * 将数组或对象转化为字符串
 */
 const typings = {
  number: '[object Number]',
  string: '[object String]',
  boolean: '[object Boolean]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  object: '[object Object]',
  array: '[object Array]',
  regExp: '[object RegExp]',
  math: '[object Math]',
  map: '[object Map]',
  set: '[object Set]',
  function: '[object Function]',
  generator: '[object GeneratorFunction]',
  async: '[object AsyncFunction]',
  asyncGenerator: '[object AsyncGeneratorFunction]',
  arrayBuffer: '[object ArrayBuffer]'
}

const classReg = /^class/
const arrowReg = /=\>/
const funcReg = /^function/
const asyncFuncReg = /^async\s+function/
const asyncGeneratorReg = /^async\s+\*function/

/**
* 主函数
* @param {object | array} val 
* @returns {string}
*/
export default function stringify(val) {
  const type = getType(val)
  // 处理边界
  if (
      type !== typings.object &&
      type !== typings.array
  ) {
      throw new TypeError('Arguments are not arrays or objects')
  }

  return '(' + handler(val, type) + ')'
}

/**
* 处理器
* @param {any} val 
* @param {string} type 
* @returns {string}
*/
function handler(val, type) {
  switch (type) {
      case typings.number:
          return createNum(val)
      case typings.string:
          return createStr(val)
      case typings.boolean:
          return createBool(val)
      case typings.null:
          return createNull()
      case typings.undefined:
          return createUndefined()
      case typings.bigInt:
          return createBigInt(val)
      case typings.symbol:
          return createSymbol(val)
      case typings.function:
          return createFunc(val)
      case typings.generator:
          return createGenerator(val)
      case typings.async:
          return createAsync(val)
      case typings.asyncGenerator:
          return createAsyncGenerator(val)
      case typings.object:
          return createObj(val)
      case typings.array:
          return createArr(val)
      case typings.map:
          return createMap(val)
      case typings.set:
          return createSet(val)
      case typings.regExp:
          return createRegExp(val)
      case typings.math:
          return createMath()
      case typings.arrayBuffer:
          return createBuffer(val)
      default:
          return
  }
}

/**
* 创建函数
*/
function createNum(num) {
  return num
}

function createStr(str) {
  return `'${str}'`
}

function createBool(bool) {
  return bool ? 'true' : 'false'
}

function createNull() {
  return 'null'
}

function createUndefined() {
  return 'undefined'
}

function createBigInt(bigInt) {
  return bigInt.toString() + 'n'
}

function createSymbol(symbol) {
  const description = symbol.description
  const isFor = Symbol.for(description) === symbol

  function isVoid(val) {
      return val === undefined || val === ''
  }
  return isFor ? `Symbol.for(${isVoid(description) ? '' : `'${description}'`})` : `Symbol(${isVoid(description) ? '' : `'${description}'`})`
}

function createFunc(func) {
  const funcStr = func.toString()

  if (funcReg.test(funcStr) || arrowReg.test(funcStr) || classReg.test(funcStr)) {
      return funcStr
  } else {
      return `function ${funcStr}`
  }
}

function createGenerator(generator) {
  const generatorStr = generator.toString()

  return funcReg.test(generatorStr) ? generatorStr : `function ${generatorStr}`
}

function createAsync(asyncFunc) {
  const asyncFuncStr = asyncFunc.toString()

  if (asyncFuncReg.test(asyncFuncStr) || arrowReg.test(asyncFuncStr)) {
      return asyncFuncStr
  } else {
      return asyncFuncStr.replace('async ', 'async function ')
  }
}

function createAsyncGenerator(asyncGenerator) {
  const asyncGeneratorStr = asyncGenerator.toString()

  return asyncGeneratorReg.test(asyncGeneratorStr) ? asyncGeneratorStr : asyncGeneratorStr.replace('async *', 'async function*')
}

function createObj(obj) {
  let start = '{'
  let end = '}'
  let res = ''

  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          res += `${key}: ${handler(obj[key], getType(obj[key]))},`
      }
  }
  const symbolList = Object.getOwnPropertySymbols(obj)
  for (const symbol of symbolList) {
      const symbolStr = createSymbol(symbol)
      res += `[${symbolStr}]: ${handler(obj[symbol], getType(obj[symbol]))},`
  }

  return start + res.slice(0, -1) + end
}

function createArr(arr) {
  let start = '['
  let end = ']'
  let res = ''

  for (const item of arr) {
      res += handler(item, getType(item)) + ','
  }

  return start + res.slice(0, -1) + end
}

function createMap(map) {
  let start = 'new Map(['
  let end = '])'
  let res = ''
  map.forEach((val, key) => {
      res += `[${handler(key, getType(key))}, ${handler(val, getType(val))}],`
  })

  return start + res.slice(0, -1) + end
}

function createSet(set) {
  let start = 'new Set('
  let end = ')'

  return start + createArr([...set]) + end
}

function createRegExp(regExp) {
  return regExp
}

function createMath() {
  return 'Math'
}

function createBuffer(arrayBuffer) {
  return `new ArrayBuffer(${arrayBuffer.byteLength})`
}

/**
* 封装Object.toString方法
* @param {any} val 
* @returns {string}
*/
function getType(val) {
  return Object.prototype.toString.call(val)
}
```

