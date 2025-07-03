---
title: 'React-Router复学(V6)'
date: 2023-07-04 23:30:00
permalink: '/posts/blogs/React-Router复学(V6)'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - React
 - javascript
 - typescript
 - react-router
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---



# react-router(V6)

* 安装React Router：
  * 安装时，我们选择**react-router-dom**；
  * react-router会包含一些react-native的内容，web开发并不需要；

```shell
npm install react-router-dom
```

## HashRouter和BrowserRouter

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { HashRouter, BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
```

## 路由映射配置与跳转

### 映射配置

* **Routes**：包裹所有的Route，在其中匹配一个路由，**Routes所在的位置就是页面切换的位置**
  * **Router5.x使用的是Switch组件**
* **Route：Route**用于路径的匹配；
  * **path**属性：用于设置匹配到的路径；
  * **element**属性：设置匹配到路径后，渲染的组件；
    * **Router5.x使用的是component属性**
  * **exact**：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；
    * **Router6.x不再支持该属性**，自动会进行精准匹配（比如区分/home和/homeBanner路径）

```jsx
// App.jsx
import { Route, Routes } from 'react-router-dom'

<Routes>
  <Route path='/home' element={<Home/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/user' element={<User/>}/>
  <Route path='/profile' element={<Profile/>}/>
  <Route path='*' element={<NotFound/>}/>
</Routes>
```

### 跳转(Link和NavLink)

```jsx
import { Link } from 'react-router-dom'

<Link to="/home">首页</Link> // to 对应 '/home'或'home'都可以
<Link to="about" replace>关于</Link>
<Link to="profile">我的</Link>
<Link to="user">
  <button>用户</button>
</Link>
```

**NavLink**会在**活跃的路由对应的a标签自动加上active的class**

NavLink相比于Link，可以动态的添加style和class

```jsx
<NavLink to='/home' style={({ isActive }) => ({color: isActive? 'red': ''})}></NavLink>
<NavLink to='/home' className={({ isActive }) => isActive? 'nav-link-active': ''}></NavLink>
```

### Navigate导航

Navigate**用于路由的重定向**，**当这个组件出现时，就会执行跳转到对应的to路径中**：

### NotFound

```jsx
import { Route, Routes, Navigate } from 'react-router-dom'

// 已登录就跳到首页
{
  !this.state.isLogin ?
    <button onClick={() => { this.setState({ isLogin }) }}>点击登录</button> :
    <Navigate to='/home'></Navigate>
}

// 重定向效果
<Routes>
  <Route path='/' element={<Navigate to='/home' />}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/user' element={<User/>}/>
  <Route path='/profile' element={<Profile/>}/>
  // 未匹配的路径 去NotFound1页面
  <Route path='*' element={<NotFound/>}/>
</Routes>
```

## 路由嵌套(V6)重点

一级路由嵌套二级，以及二级路由页面的默认页面、Outlet显示二级路由对应的页面

App.jsx

```jsx
<Routes>
  <Route path="/" element={<Navigate to="/home"/>}/>
  <Route path='/home' element={<Home/>}>
    <Route path="/home" element={<Navigate to="/home/recommend"/>}/>
    <Route path="/home/recommend" element={<HomeRecommend/>}/>
    <Route path="/home/ranking" element={<HomeRanking/>}/>
  </Route>
</Routes>
```

Home.jsx

```jsx
<div>
  <h1>Home Page</h1>
  {/* <Link to="/home/recommend">推荐</Link>
  <Link to="/home/ranking">排行榜</Link> */}

  <button onClick={e => this.navigateTo("/home/recommend")}>推荐</button>
  <button onClick={e => this.navigateTo("/home/ranking")}>排行榜</button>
  
  {/* 子路由显示窗口 */}
  <Outlet />
</div>
```

![pCDGjKA.png](https://s1.ax1x.com/2023/07/02/pCDGjKA.png)

## JS代码路由跳转(useNavigate)重点

react-router-dom中与路由相关的hooks还有**useNavigate、useLocation、useParams、useSearchParams...**

**hooks只能在函数式组件内使用**

**只能在函数式组件顶层使用，不能嵌到函数组件的内部函数中使用**

```jsx
import { Routes, Route, useNavigate } from 'react-router-dom'

export default function App(props) {
  const navigate = useNavigate()
  
  function navigateTo(path) {
    navigate(path)
  }
  
  return (
    <div className='app'>
      <button onClick={e => navigateTo('/about')}>关于</button>
      <button onClick={e => navigateTo('/profile')}>我的</button>
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}
```

由于**useNavigate hook不能在类组件中使用**，我们可以**通过高阶组件的方式对useNavigate进行封装**，**继而在类组件中使用**

## 高阶组件封装hooks(实现类组件使用hooks)

![pCDt28S.png](https://s1.ax1x.com/2023/07/02/pCDt28S.png)

/hooks/withRouter.jsx      或/hoc/withRouter目录

```jsx
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"

export default function withRouter(WrapperComponent) {
  // 返回函数式组件
  return props => {
    // 将hooks中各种方法传递给包裹组件
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams) // fromEntries将键值对列表转为对象

    return <WrapperComponent {...props} router={{navigate, params, location, query}}/>
  }
}

```

withRouter

```jsx
import React, { PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'
import withRouter from "../hooks/withRouter"

export class Home extends PureComponent {
  navigateTo(path) {
    const router = this.props.router
    router.navigate(path)
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {/* <Link to="/home/recommend">推荐</Link>
        <Link to="/home/ranking">排行榜</Link> */}

        <button onClick={e => this.navigateTo("/home/recommend")}>推荐</button>
        <button onClick={e => this.navigateTo("/home/ranking")}>排行榜</button>
        <Outlet/>
      </div>
    )
  }
}

export default withRouter(Home)
```

## 路由跳转传参

**params传递**

![pCDaJNq.png](https://s1.ax1x.com/2023/07/02/pCDaJNq.png)

？**search参数传递**

![pCDaU3T.png](https://s1.ax1x.com/2023/07/02/pCDaU3T.png)

## 页面路径配置文件/router/index.js

* 目前我们所有的路由定义都是直接使用**Route组件，并且添加属性来完成**的。

* 但是**这样的方式会让路由变得非常混乱**，我们希望**将所有的路由配置放到一个地方进行集中管理**：

  * **在早期的时候**，Router并且没有提供相关的API，我们**需要借助于react-router-config**完成；

  * 在**Router6.x中，为我们提供了useRoutes API可以完成相关的配置**；

```js
import Home from '../pages/Home'
import HomeRecommend from "../pages/HomeRecommend"
import HomeRanking from "../pages/HomeRanking"
import HomeSongMenu from '../pages/HomeSongMenu'
// import About from "../pages/About"
// import Login from "../pages/Login"
import Category from "../pages/Category"
import Order from "../pages/Order"
import NotFound from '../pages/NotFound'
import Detail from '../pages/Detail'
import User from '../pages/User'
import { Navigate } from 'react-router-dom'
import React from 'react'

const About = React.lazy(() => import("../pages/About"))
const Login = React.lazy(() => import("../pages/Login"))

const routes = [
  {
    path: "/",
    element: <Navigate to="/home"/>
  },
  {
    path: "/home",
    element: <Home/>,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/recommend"/>
      },
      {
        path: "/home/recommend",
        element: <HomeRecommend/>
      },
      {
        path: "/home/ranking",
        element: <HomeRanking/>
      },
      {
        path: "/home/songmenu",
        element: <HomeSongMenu/>
      }
    ]
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/category",
    element: <Category/>
  },
  {
    path: "/order",
    element: <Order/>
  },
  {
    path: "/detail/:id",
    element: <Detail/>
  },
  {
    path: "/user",
    element: <User/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
]

export default routes
```

![pCDw61K.png](https://s1.ax1x.com/2023/07/02/pCDw61K.png)

## 路由组件懒加载(异步加载)

**懒加载对应的结果是打包时会对懒加载组件进行分包**，会**将对应的组件打包划分到新的js文件中，vue中的懒加载同理**

查看上小节/router/index.js代码

![pCDwHc8.png](https://s1.ax1x.com/2023/07/02/pCDwHc8.png)

如果我们对某些组件进行了**异步加载（懒加载）**，那么需要**使用Suspense进行包裹**：

![pCDwW0H.png](https://s1.ax1x.com/2023/07/02/pCDwW0H.png)

```jsx
// import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router-dom"
import { Suspense } from "react"

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(
  // <StrictMode>
    <HashRouter>
      <Suspense fallback={<h3>Loading...</h3>}>
        <App/>
      </Suspense>
    </HashRouter>
  // </StrictMode>
)
```