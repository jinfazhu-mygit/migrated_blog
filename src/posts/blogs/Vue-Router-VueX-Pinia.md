---
title: 'Vue-Router-VueX-Pinia'
date: 2023-5-10 22:15:00
permalink: '/posts/blogs/Vue-Router-VueX-Pinia'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - vue3
 - vue-router
 - VueX
 - Pinia
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---





# Vue-Router

web的发展主要经历了这样一些阶段：

* **后端路由阶段**：后端根据前端传来的URL生成相应的.html返回给前端，**(页面映射表在后端)**
* **前后端分离阶段**：**不同路径对应的.html页面还是由后端渲染获取**，但**页面不全是由后端渲染**，一些**比较固定的导航的数据由前端渲染**，一些列表数据则还是通过网络请求从后端获取，**此时(页面映射表还是在后端)**
* **单页面富应用（SPA）：**
  * 特点：**不是每次都需要更新全部页面**，只需要**更新需要更新的页面部分即可**
  * 相当于**(页面映射表在前端)**，**不同的页面地址对应不同的页面组件进行展示**即可
  * 按钮点击，改变页面地址，根据地址访问页面(router-view切换显示的组件)


## 路径改变，页面不刷新(只改变页面部分内容)的实现

### URL的hash

* URL的hash也就是**锚点(#)**, 本质上是改变**window.location的href**属性；
* 我们**可以通过直接赋值location.hash来改变href, 但是页面不发生刷新**；

![p9NXQzV.png](https://s1.ax1x.com/2023/05/05/p9NXQzV.png)

### html5的history

history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面：

* **replaceState**：替换原来的路径；
* **pushState**：使用新的路径；
* **popState**：路径的回退；
* **go**：向前或向后改变路径；
* **forward**：向前改变路径；
* **back**：向后改变路径；

![p9NX6dH.png](https://s1.ax1x.com/2023/05/05/p9NX6dH.png)

目前前端流行的三大框架, 都有自己的路由实现:

* **Angular的ngRouter**
* **React的ReactRouter**
* **Vue的vue-router**

Vue Router 是 Vue.js 的官方路由：

* 它与 Vue.js 核心深度集成，让用 Vue.js 构建**单页应用（SPA）**变得非常容易；
* 目前Vue路由最新的版本是4.x版本，我们上课会基于最新的版本讲解；

vue-router是**基于路由和组件**的

* 路由用于设定访问路径, 将**路径和组件映射**起来；
* 在vue-router的单页面应用中, **页面的路径的改变就是组件的切换；**

安装Vue Router：

```cmd
npm install vue-router
```

## 使用步骤(重要)

* 第一步：创建路由需要映射的组件（打算显示的页面）；
* 第二步：通过createRouter创建路由对象，并且传入routes和history模式；
  * 配置路由映射: 组件和路径映射关系的routes数组；
  * 创建基于hash或者history的模式；
* 第三步：使用app注册路由对象（use方法）；
* 第四步：路由使用: 通过`<router-view>`和`<router-link>`；

```vue
<!-- <keep-alive includes="home">
  <router-view />
</keep-alive> -->
// 动态组件结合路由写法改为
<router-view v-slot="{ Component }">
  <keep-alive include="home">
    <component :is="Component" />
  </keep-alive>
</router-view>
```

![p9NxjSI.png](https://s1.ax1x.com/2023/05/05/p9NxjSI.png)

![p9UKFS0.png](https://s1.ax1x.com/2023/05/05/p9UKFS0.png)

## 默认路径与重定向

默认情况下, 进入网站的首页, 我们希望`<router-view>`渲染首页的内容；

![p9UdGoq.png](https://s1.ax1x.com/2023/05/05/p9UdGoq.png)

## history和hash模式

![p9Ud0OJ.png](https://s1.ax1x.com/2023/05/05/p9Ud0OJ.png)

## router-link的一些属性

**to属性**：

* 是一个字符串，或者是一个对象

**replace属性**：

* 设置 replace 属性的话，当点击时，会调用 router.replace()，而不是 router.push()；

**active-class属性**：

* 设置激活a元素后应用的class，默认是router-link-active

**exact-active-class属性**：

* 链接精准激活时，应用于渲染的 `<a>` 的 class，默认是router-link-exact-active；

![p9Ud5md.png](https://s1.ax1x.com/2023/05/05/p9Ud5md.png)

## 路由懒加载(优化首屏渲染)(重要)

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载：

* 如果我们能把**不同路由对应的组件分割成不同的代码块**，然后**当路由被访问的时候才加载对应组件**，这样就会更加**高效**；
* 也可以**提高首屏的渲染效率**；

![p9Uw09f.png](https://s1.ax1x.com/2023/05/05/p9Uw09f.png)

## 路由的其他属性(name,meta)

name属性：路由记录独一无二的名称；跳转路由可以用name(但不推荐)

meta属性：自定义的数据；通过route.meta可以拿到

![p9U0pKe.png](https://s1.ax1x.com/2023/05/05/p9U0pKe.png)

## 区分options api和composition api的写法

**Options API：**

```js
this.$route // 获取当前路由的相关信息
this.$router // 获取路由对象
```

**Composition API：**

```js
import { useRoute, useRouter } from 'vue-router'
const route = useRoute() // 获取当前路由的相关信息
const router = useRouter() // 获取路由对象
```
## 动态路由(重要)

例如，我们可能有一个 User 组件，它应该对**所有用户进行渲染，但是用户的ID是不同**的；

在Vue Router中，我们可以在路径中使用一个**动态字段来实现，我们称之为 路径参数**；

![p9U0Ur4.png](https://s1.ax1x.com/2023/05/05/p9U0Ur4.png)

### 动态路由动态值的获取(beforeRouteUpdate获取同路径不同id下的切换时机获取)

![p9UBI0J.png](https://s1.ax1x.com/2023/05/05/p9UBI0J.png)

## notFound页面(重要)

![p9UboYq.png](https://s1.ax1x.com/2023/05/06/p9UboYq.png)

## 路由的嵌套(重要)

**使用children进行子路由的嵌套**

![p9awMJP.png](https://s1.ax1x.com/2023/05/06/p9awMJP.png)

**在相应的父级路由继续添加`<router-view></router-view>`展示子路由组件**

![p9UXsHg.png](https://s1.ax1x.com/2023/05/06/p9UXsHg.png)](htt

## 编程式导航router路由跳转的方式(重要)

## 页面跳转query参数的传递和使用

**options api里使用this.$router**即可，注意区分route和router对象

![p9UO9sO.png](https://s1.ax1x.com/2023/05/06/p9UO9sO.png)

![p9UXW3q.png](https://s1.ax1x.com/2023/05/06/p9UXW3q.png)


## 页面的前后退

**router.back()**

通过调用 history.back() 回溯历史。相当于 router.go(-1)；

**router.forward()**

通过调用 history.forward() 前进页面。相当于 router.go(1)；

**router.go(2)**

根据参数number的正负决定前进还是后退多少个访问页面

## 动态路由

对于有一部分路由，需要根据**用户身份**，来**判断需要对哪些路由进行注册**，解决了身份权限不足的用户可以在浏览器地址栏通过修改路径访问无权访问的界面的问题

某些情况下我们可能需要动态的来添加路由：

* 比如**根据用户不同的权限，注册不同的路由**；
* 这个时候我们可以使用一个方法 **addRoute**；

![p9awpI1.png](https://s1.ax1x.com/2023/05/06/p9awpI1.png)

![p9aKFv6.png](https://s1.ax1x.com/2023/05/06/p9aKFv6.png)

**动态删除路由**

删除路由有以下三种方式：

* 方式一：**添加一个name相同的路由**；
* 方式二：通过**removeRoute方法，传入路由的名称**；
* 方式三：通过**addRoute方法的返回值回调**，调用addRoute返回的函数即可删除该路由

![p9aKOJA.png](https://s1.ax1x.com/2023/05/06/p9aKOJA.png)

**路由的其他方法**补充：

* **router.hasRoute()：检查路由是否存在。**
* **router.getRoutes()：获取一个包含所有路由记录的数组。**

## 路由导航守卫

**页面跳转**时(浏览器地址发生变化)，通过导航守卫可以在**进入某个页面前**，进行某些**逻辑判断**，**是否有权限、满足条件**进入该页面

全局的前置守卫beforeEach是在导航触发时会被回调的：

它有两个参数：

* **to：即将进入的路由Route对象；**
* **from：即将离开的路由Route对象**；

它有返回值：

* **false**：**取消当前导航；**
* **不返回或者undefined：进行默认导航；**
* 返回一个路由地址：
  * **可以是一个string类型的路径；**
  * **可以是一个对象，对象中包含path、query、params等信息；**

可选的第三个参数：**next（不推荐使用）**

* 在Vue2中我们是通过next函数来决定如何进行跳转的；
* 但是在Vue3中我们是通过返回值来控制的，不再推荐使用next函数，这是因为开发中很容易调用多次next；

![p9a0hAs.png](https://s1.ax1x.com/2023/05/06/p9a0hAs.png)

**其他导航守卫**

Vue还提供了很多的其他守卫函数，目的都是在某一个时刻给予我们回调，让我们可以更好的控制程序的流程或者功能：[其他导航守卫](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html)

### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。





































# Vuex

共享状态的使用

![p9aOy8I.png](https://s1.ax1x.com/2023/05/06/p9aOy8I.png)

## Vuex基本使用

```cmd
npm install vuex
```

![p9ajcB8.png](https://s1.ax1x.com/2023/05/06/p9ajcB8.png)

![p9ajgHS.png](https://s1.ax1x.com/2023/05/06/p9ajgHS.png)

Vuex和单纯的全局对象有什么区别呢？

第一：**Vuex的状态存储是响应式的**

* 当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会被更新；

第二：**你不能直接改变store中的状态**

* 改变store中的状态的唯一途径就显示提交 (commit) mutation；
* 这样使得我们可以方便的跟踪每一个状态的变化，从而让我们能够通过一些工具帮助我们更好的管理应用的状态；

![p9d4Gr9.png](https://s1.ax1x.com/2023/05/07/p9d4Gr9.png)

## 单一状态树

Vuex 使用单一状态树：

* 用一个**对象就包含了全部的应用层级的状态**；
* 采用的是**SSOT，Single Source of Truth，也可以翻译成单一数据源**；

这也意味着，每个**应用将仅仅包含一个 store** 实例；

* **单状态树和模块化并不冲突，后面我们会讲到module**的概念；

单一状态树的优势：

* 如果你的状态信息是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难；
* 所以Vuex也使用了**单一状态树来管理应用层级的全部状态**；
* 单一状态树能够让我们最直接的方式找到某个状态的片段；
* 而且在之后的维护和调试过程中，也可以非常方便的管理和维护；

## state

### mapState映射函数(computed里使用)

如果我们有**很多个状态都需要获取**的话，可以**使用mapState的辅助函数**：

* mapState的方式一：对象类型；
* mapState的方式二：数组类型；
* 也可以使用展开运算符和来原有的computed混合在一起；

### 以下关于state、getters、mutations的map方法先了解使用，一般情况使用普通模式($store.  store. )写就行

### options api里使用mapState

![p9dIju4.png](https://s1.ax1x.com/2023/05/07/p9dIju4.png)

### setup里使用mapState(不推荐，推荐方法三)

方法一：

![p9do02T.png](https://s1.ax1x.com/2023/05/07/p9do02T.png)

方法二：

针对方法一的封装：useState.js

```js
import { computed } from "vue";
import { mapState, useStore } from "vuex";

export default function useState(mapper) {
  const store = useStore()
  // 拿到所有需要map的state对应的函数
  const mapStatesObj = mapState(mapper)

  const resState = {}
  Object.keys(mapStatesObj).forEach(key => {
    // 通过computed拿到每一个state函数对应的state(并绑定正确的this)
    resState[key] = computed(mapStatesObj[key].bind({ $store: store }))
  })

  return resState
}
```

![p9dTxt1.png](https://s1.ax1x.com/2023/05/07/p9dTxt1.png)

**方法三：toRefs解构store.state（推荐在setup里使用这种方式）**

![p9d7u1f.png](https://s1.ax1x.com/2023/05/07/p9d7u1f.png)

## getters

1. 普通用法
2. getters里通过第二个参数调用getter
3. getters里通过回调函数接参数，返回数据

![p9w9FRe.png](https://s1.ax1x.com/2023/05/07/p9w9FRe.png)

### computed里mapGetters(options api)

![p9woRht.png](https://s1.ax1x.com/2023/05/08/p9woRht.png)

### **setup里同state里的三种方法使用getters(composition api)**

第三种自己封装一个同上面useState的useGetters的hooks函数

![p9wHCf1.png](https://s1.ax1x.com/2023/05/08/p9wHCf1.png)

## mutations

**更改vuex中的store的唯一方式是提交(commit)mutation**

不要在mutation中执行异步操作，方便dev-tools捕捉数据

![p9wq8oQ.png](https://s1.ax1x.com/2023/05/08/p9wq8oQ.png)

### 在options api里使用mapMutations

![p9wjxvn.png](https://s1.ax1x.com/2023/05/08/p9wjxvn.png)

### 在composition api里使用mapMutations

![p9wviUU.png](https://s1.ax1x.com/2023/05/08/p9wviUU.png)

## actions

Action**类似于mutation**，不同在于：

* Action**提交的是mutation**，而不是直接变更状态；
* Action可以**包含任意异步操作**；

![p90kalT.png](https://s1.ax1x.com/2023/05/08/p90kalT.png)

这里有一个非常重要的参数**context**：

* **context是一个和store实例均有相同方法和属性的context对象**；
* 所以我们可以从其中获取到commit方法来提交一个mutation，或者通过 **context.state 和 context.getters 来获取 state 和getters；**

**基本使用**

![p90AXP1.png](https://s1.ax1x.com/2023/05/08/p90AXP1.png)

### mapActions
### map对象写法

![p90MJDx.png](https://s1.ax1x.com/2023/05/08/p90MJDx.png)

**options api里使用**

![p90MK5F.png](https://s1.ax1x.com/2023/05/08/p90MK5F.png)

composition api里使用(看选择额，也可不使用，直接store.dispatch)**

![p90M129.png](https://s1.ax1x.com/2023/05/08/p90M129.png)

### actions里异步请求获取页面的数据

**fetch只能在浏览器环境中使用**

**Node环境中需要通过http模块来发送请求**

![p9012a6.png](https://s1.ax1x.com/2023/05/08/p9012a6.png)

![p903lo6.png](https://s1.ax1x.com/2023/05/08/p903lo6.png)

## modules

什么是Module？

* 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，store 对象就有可能变得相当臃肿；


* 为了解决以上问题，**Vuex 允许我们将 store 分割成模块（module）；**
* **每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块**；

![p90jqFU.png](https://s1.ax1x.com/2023/05/09/p90jqFU.png)

### module的局部状态

默认情况下只有**使用不同模块的state时才需要加上相应的模块名($store.state.moduleName.xxx)**，其他的getters、mutations、actions、modules相当于合并到了root的各模块里

![p90z2FK.png](https://s1.ax1x.com/2023/05/09/p90z2FK.png)

### module的命名空间(命名冲突的解决)

默认情况下只有**使用不同模块的state时才需要加上相应的模块名($store.state.moduleName.xxx)**，其他的getters、mutations、actions、modules相当于默认合并到了root的各模块里

所以容易出现的情况就是，获取**一个getters、mutations或dispatch派发一个action，如果某个module有相同命名，则会出现一处调用，多处响应的情况出现**

希望模块具有更高的封装度和复用性，可以添加 namespaced: true 的方式使其成为带命名空间的模块：

* 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名；

**(重点图片!)**

![p9B9KJK.png](https://s1.ax1x.com/2023/05/09/p9B9KJK.png)

### module修改或派发根组件

**如果我们希望在action中修改root中的state**(其实也可以直接调用根组件的action啊)，那么有如下的方式：

![p9B9rLj.png](https://s1.ax1x.com/2023/05/09/p9B9rLj.png)







# Pinia

* Pinia开始于大概2019年，最初是作为一个实验为**Vue重新设计状态管理**，让它用起来像组合式API（Composition API）。
* 从那时到现在，最初的设计原则依然是相同的，并且目前**同时兼容Vue2、Vue3**，也并不要求你使用Composition API；
* Pinia本质上依然是一个**状态管理的库，用于跨组件、页面进行状态共享**（这点和**Vuex、Redux一样**）；

![p9Bnjpj.png](https://s1.ax1x.com/2023/05/09/p9Bnjpj.png)

## Pinia和Vuex的联系与区别(Vuex5的替代版)

* Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 **Vuex 5** 核心团队讨论中的许多想法；
* 最终，团队意识到Pinia已经**实现了Vuex5中大部分内容**，所以最终**决定用Pinia来替代Vuex**；
* 与 Vuex 相比，**Pinia 提供了一个更简单的 API，具有更少的仪式**，提供了 **Composition-API 风格的 API**；
* 最重要的是，在**与 TypeScript 一起使用时具有可靠的类型推断支持**；

### 优势

和Vuex相比，Pinia有很多的优势：

* 比如**mutations 不再存在，只包含state、getters、actions**：
  * 他们经常被认为是 非常 冗长；
  * 他们最初带来了 devtools 集成，但这不再是问题；
* 更**友好的TypeScript支持，Vuex之前对TS的支持很不友好**；
* **不再有modules的嵌套结构**：
  * 你可以**灵活使用每一个store，它们是通过扁平化的方式来相互使用**的；
* 也**不再有命名空间的概念**，不需要记住它们的复杂关系；

## 创建Pinia的Store

```cmd
npm install pinia
```

### 基本使用

什么是Store？

* 一个 Store （如 Pinia）是一个实体，它会持有为**绑定到你组件树的状态和业务逻辑**，也就是保存了全局的状态；
* 它有点像**始终存在，并且每个人都可以读取和写入的组件**；
* 你可以在你的**应用程序中定义任意数量的Store来管理你的状态**；

Store有三个核心概念：

* **state、getters、actions**；
* 等**同于组件的data、computed、methods**；
* 一旦 **store 被实例化，你就可以直接在 store 上访问 state、getters 和 actions 中定义的任何属性**；

返回的函数统一使用useX的规范进行定义

![p9B1tTx.png](https://s1.ax1x.com/2023/05/09/p9B1tTx.png)

## Pinia核心概念State

### state的使用以及相关操作

![p9c8jk4.png](https://s1.ax1x.com/2023/05/14/p9c8jk4.png)

## Pinia核心概念Getters

![p9cJKPJ.png](https://s1.ax1x.com/2023/05/14/p9cJKPJ.png)

## Pinia核心概念Actions

![p9cILkT.png](https://s1.ax1x.com/2023/05/14/p9cILkT.png)

# Axios

**axios功能特点:**

* 在**浏览器中发送 XMLHttpRequests 请求**
* 在 **node.js 中发送 http请求**(自动区分环境)
* **支持 Promise API**
* **拦截请求和响应**
* **转换请求和响应数据**

**支持多种请求方式:**

* **axios(config)**
* **axios.request(config)**
* **axios.get(url[, config])**
* **axios.delete(url[, config])**
* **axios.head(url[, config])**
* **axios.post(url[, data[, config]])**
* **axios.put(url[, data[, config]])**
* **axios.patch(url[, data[, config]])**

具体使用请查看: [axios](https://blog.zhujinfa.top/react%E4%B8%ADaxios%E7%9A%84%E4%BD%BF%E7%94%A8%E3%80%81react-router(v5)/#react%E4%B8%ADaxios%E7%9A%84%E4%BD%BF%E7%94%A8%E3%80%81react-router-v5)

