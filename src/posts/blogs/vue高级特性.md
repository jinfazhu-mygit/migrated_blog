---
title: 'vue高级特性'
date: 2023-5-31 22:15:00
permalink: '/posts/blogs/vue高级特性'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - TypeScript
 - vue3
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


# vue高级语法特性

## 自定义指令

总结：使用自定义指令可以拿到相应节点的生命周期，textContext值，进行相应的操作和封装

自定义指令分为两种：

* **自定义局部指令**：组件中通过 directives 选项，只能在当前组件中使用；


* **自定义全局指令**：app的 directive 方法，可以在任意组件中被使用；

### 自定义组件在options api和composition api中的使用

![p9vNXuD.png](https://s1.ax1x.com/2023/05/31/p9vNXuD.png)

**全局自定义指令**

![p9vamLD.png](https://s1.ax1x.com/2023/05/31/p9vamLD.png)

### 自定义指令的生命周期

(**相当于对某个被绑定的节点的生命周期的监听实现**)

◼ **created**：在绑定元素的 attribute 或事件监听器被应用之前调用；

◼ **beforeMount**：当指令第一次绑定到元素并且在挂载父组件之前调用；

◼ **mounted**：在绑定元素的父组件被挂载后调用；

◼ **beforeUpdate**：在更新包含组件的 VNode 之前调用；

◼ **updated**：在包含组件的 VNode 及其子组件的 VNode 更新后调用；

◼ **beforeUnmount**：在卸载绑定元素的父组件之前调用；

◼ **unmounted**：当指令与元素解除绑定且父组件已卸载时，只调用一次；

![p9vdRjf.png](https://s1.ax1x.com/2023/05/31/p9vdRjf.png)

### 自定义指令拿到相应的参数、修饰符、值

![p9v0jk4.png](https://s1.ax1x.com/2023/05/31/p9v0jk4.png)

**自定义指令实现时间戳格式化**

时间戳一般由**十位或十三位表示**

![p9vhBbd.png](https://s1.ax1x.com/2023/05/31/p9vhBbd.png)

```js
import dayjs from 'dayjs'

export default function directiveFormatTime(app) {
  let format = 'YYYY-MM-DD HH-mm-ss'
  app.directive('ftime', {
    created(el, bindings) {
      if(bindings?.value) format = bindings.value
    },
    mounted(el, bindings) {
      let timeStamp = parseInt(el.textContent)
      if(el.textContent.length === 10) {
        timeStamp *= 1000
      }

      el.textContent = dayjs(timeStamp).format(format)
    }
  })
}
```

## 内置组件teleport

**指定节点的挂载位置**

某些情况下，我们希望组件**不是挂载在这个组件树**上的，可能是移动到Vue app之外的其他位置

一个Vue提供的内置组件，类似于react的Portals；

* teleport翻译过来是心灵传输**、远距离运输**的意思；

它有两个属性：

* to：指定**将其中的内容移动到的目标元素**，可以**使用选择器**；
* disabled：是否禁用 teleport 的功能；

**多个teleport挂载到一个相同的节点上不会覆盖，而是合并**

![p9v4sL4.png](https://s1.ax1x.com/2023/05/31/p9v4sL4.png)

## 内置组件suspense

`<Suspense>` 接受两个插槽：`#default` 和 `#fallback`。它将在内存中渲染默认插槽的同时展示后备插槽内容。

在渲染时遇到异步依赖项 ([异步组件](https://cn.vuejs.org/guide/components/async.html)和具有 [`async setup()`](https://cn.vuejs.org/guide/built-ins/suspense.html#async-setup) 的组件)，它将等到所有异步依赖项解析完成时再显示默认插槽

![p9voLk9.png](https://s1.ax1x.com/2023/05/31/p9voLk9.png)

## app.use本质

通常我们向Vue全局添加一些功能时，会采用插件的模式，它有两种编写方式：

* 对象类型：一个对象，但是必须包含一个 install 的函数，该函数会在安装插件时执行；
* 函数类型：一个function，这个函数会在安装插件时自动执行；

![p9v7zZD.png](https://s1.ax1x.com/2023/05/31/p9v7zZD.png)

```js
import { createApp } from 'vue'
import App from './03_插件的使用/App.vue'



const app = createApp(App)

// 安装插件use的本质
// 1.use可传入对象(对象中需要有install函数)
app.use({
  install: function(app) {
    console.log('传入的对象被执行install函数,参数为app', app)
  }
})

// 2.use可传入函数(函数直接被执行，app为参数)
app.use(function(app) {
  console.log('传入的函数被执行，参数为app', app)
})

app.mount('#app')

```

## h函数(createVNode函数)

虚拟节点(VNode的创建，VTree构建的基础)

我们之前编写的 **template 中的HTML 最终也是使用渲染函数(h函数/createVNode)生成对应的VNode**；

### options api中使用h函数

h函数(创建VNode函数)的三个参数

![p9xPGdA.png](https://s1.ax1x.com/2023/05/31/p9xPGdA.png)

![p9xFqKO.png](https://s1.ax1x.com/2023/05/31/p9xFqKO.png)

```vue
// 去除template模板后，实际上vue中h函数就等于createVNode函数
<script>
import { h } from 'vue'
import Home from "./Home.vue"

export default {
  data() {
    return {
      counter: 0
    }
  },

  // 重点
  render() {
    return h("div", { className: "app" }, [
      h("h2", null, `当前计数: ${this.counter}`),
      h("button", { onClick: this.increment }, "+1"),
      h("button", { onClick: this.decrement }, "-1"),
      h(Home) // 直接使用组件
    ])
  },
  
  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    }
  }
}
</script>

<style scoped></style>
```

### composition api中使用h函数

```vue
<script>
import { h, ref } from 'vue'
import Home from "./Home.vue"

export default {
  setup() {
    const counter = ref(0)

    const increment = () => {
      counter.value++
    }
    const decrement = () => {
      counter.value--
    }

    return () => h("div", { className: "app" }, [
      h("h2", null, `当前计数: ${counter.value}`),
      h("button", { onClick: increment }, "+1"),
      h("button", { onClick: decrement }, "-1"),
      h(Home)
    ])
  }
}
</script>

<style scoped></style>
```

方式二

```vue
<template>
  <render />
  <h2 class="">内容</h2>
</template>

<script setup>
import { ref, h } from 'vue';
import Home from './Home.vue'

const counter = ref(0)

const increment = () => {
  counter.value++
}
const decrement = () => {
  counter.value--
}

// render作为template中的组件进行渲染
const render = () => h("div", { className: "app" }, [
  h("h2", null, `当前计数: ${counter.value}`),
  h("button", { onClick: increment }, "+1"),
  h("button", { onClick: decrement }, "-1"),
  h(Home)
])
</script>

<style scoped></style>
```

## jsx

### 安装与配置

如果我们希望在项目中使用jsx，那么我们需要**添加对jsx的支持**：

* jsx我们通常会**通过Babel来进行转换**（React编写的jsx就是通过babel转换的）；
* 对于Vue来说，我们只需要在**Babel中配置对应的插件**即可；

```
npm install @vue/babel-plugin-jsx -D
```

vite环境：

```
npm install @vitejs/plugin-vue-jsx -D
```

vite.config.js

![p9xERr8.png](https://s1.ax1x.com/2023/05/31/p9xERr8.png)

### vue文件中写jsx代码

#### options api（render函数）

options api中jsx的写法

```vue
<script lang="jsx">
export default {
  data() {
    return {
      counter: 0
    }
  },

  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    }
  },

  render() {
    return (
      <div class='app'>
        <h2>当前计数：{ this.counter }</h2>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
        <p>哈哈哈</p>
      </div>
    )
  }
}
</script>

<style lang="less" scoped></style>
```

#### composition api

compositio api中jsx的三种写法

```vue
<script lang="jsx">
import { ref } from 'vue';

export default {
  setup() {
    const counter = ref(0)
    const increment = () => {
      counter.value++
    }
    const decrement = () => {
      counter.value--
    }

    return () => (
      <div class='app'>
        <h2>当前计数：{counter.value}</h2>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <p>哈哈哈</p>
      </div>
    )
  }
}
</script>

<style lang="less" scoped></style>
```

```vue
<script lang="jsx">
import { ref } from 'vue';

export default {
  setup() {
    const counter = ref(0)
    const increment = () => {
      counter.value++
    }
    const decrement = () => {
      counter.value--
    }

    return {
      counter,
      increment,
      decrement
    }
  },

  render() {
    return (
      <div class='app'>
        <h2>当前计数：{ this.counter }</h2>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
        <p>哈哈哈</p>
      </div>
    )
  }
}
</script>

<style lang="less" scoped></style>
```

```vue
<template>
  <jsx />
</template>

<script lang="jsx" setup>
import { ref } from 'vue';

const counter = ref(0)
const increment = () => {
  counter.value++
}
const decrement = () => {
  counter.value--
}

const jsx = () => (
  <div class='app'>
    <h2>当前计数：{counter.value}</h2>
    <button onClick={increment}>+1</button>
    <button onClick={decrement}>-1</button>
    <p>哈哈哈</p>
  </div>
)
</script>

<style lang="less" scoped></style>
```

## 过渡动画

* React框架本身并没有提供任何动画相关的API，所以在React中使用过渡动画我们需要使用一个第三方库 **react-transition-group**；
* Vue中为我们提供一些**内置组件**和对应的API来完成动画，利用它们我们可以方便的**实现过渡动画效果**；

### transition内置组件

动画执行过程中动态添加类，tarnsition包裹需要过渡的的组件

* 1.自动**嗅探目标元素是否应用了CSS过渡或者动画**，如果有，那么**在恰当的时机添加/删除 CSS类名**；
* 2.如果 **transition 组件提供了JavaScript钩子函数**，这些钩子函数将在恰当的时机被调用；

v-enter-from, v-enter-to, v-enter-active，展示时

v-leave-from, v-leave-to, v-leave-active，隐藏时

```vue
<template>
  <div class="home">
    <button @click="showH2 = !showH2">切换</button>

    <transition>
      <h2 v-if="showH2">123444</h2>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showH2 = ref(false)
</script>

<style scoped>
.v-enter-from, .v-leave-to {
  opacity: 0;
}

.v-enter-to, .v-leave-from {
  opacity: 1;
}

.v-enter-active, .v-leave-active {
  transition: all 1.5s ease;
}
</style>
```

### 适用情景

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡：

* **条件渲染 (使用 v-if)条件展示 (使用 v-show)**
* **动态组件（component）**
* **组件根节点（<Home />）**

### 过渡动画class(transition)

![p9x55J1.png](https://s1.ax1x.com/2023/06/01/p9x55J1.png)

class的**name命名规则**如下：

* 如果我们使用的是一个没有name的transition，那么所有的class是以 v- 作为默认前缀；
* 如果我们添加了一个**name属性**，比如 < transtion name="why">，那么所有的class会以 why- 开头；

![p9x5vFA.png](https://s1.ax1x.com/2023/06/01/p9x5vFA.png)

### 过渡动画与animation

![p9x7GkQ.png](https://s1.ax1x.com/2023/06/01/p9x7GkQ.png)

```vue
<template>
  <div class="home">
    <div>
      <button @click="showH2 = !showH2">切换</button>
    </div>

    <transition name="qwer">
      <h2 v-if="showH2">123444</h2>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showH2 = ref(false)
</script>

<style scoped>
h2 {
  display: inline-block;
}
.qwer-enter-active {
  animation: showText 2s ease;
}

.qwer-leave-active {
  animation: showText 2s ease reverse;
}

@keyframes showText {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
```

### 过渡动画与其它属性(type,duration)

如果**同时使用了过渡和动画（两种动画时间尽量保持一致!!!）**

* **默认情况下，以动画时长最长的为结束时间**
* 并且在这个情况下可能**某一个动画执行结束时，另外一个动画还没有结束**；
* 在这种情况下，我们可以设置 type 属性为 animation 或者 transition 来明确的告知Vue监听的类型；
* **如果设置了type，则当该类型动画执行结束，其余为执行完的动画则闪动到最终状态**

![p9xbnqf.png](https://s1.ax1x.com/2023/06/01/p9xbnqf.png)

```vue
<transition name="qwer" type="transition">
  <h2 v-if="showH2">123444</h2>
</transition>
```

* **如果设置了duration(毫秒)，则表示动画执行最大的时间为duration设置的值，不管动画有无执行完毕**

```vue
<transition name="qwer" type="transition" :duration="1000">
  <h2 v-if="showH2">123444</h2>
</transition>
```

* duration也可以单独设置enter和leave的最大动画时间

```vue
<transition name="qwer" :duration="{ enter: 1500, leave: 3000 }">
  <h2 v-if="showH2">123444</h2>
</transition>
```

### 过渡动画-过渡模式mode(重要)

如果我们**不希望同时执行进入和离开动画**，那么我们需要设置transition的过渡模式：

* in-out: 先执行新节点的显示动画，再执行旧节点的移除动画；(会同时出现)
* out-in: 先执行旧节点的移除动画，再执行新节点的显示动画；(不会同时出现新旧节点)

```vue
<template>
  <div class="home">
    <div>
      <button @click="showH2 = !showH2">切换</button>
    </div>

    <transition name="qwer" mode="out-in">
      <h2 v-if="showH2">哈哈哈</h2>
      <h2 v-else>呵呵呵</h2>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showH2 = ref(false)
</script>

<style scoped>
h2 {
  display: inline-block;
}
.qwer-enter-active {
  animation: showText 2s ease;
}
.qwer-leave-active {
  animation: showText 2s ease reverse;
}

@keyframes showText {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
```

### 过渡模式mode在动态组件(component)中使用

![p9xOHyR.png](https://s1.ax1x.com/2023/06/01/p9xOHyR.png)

```vue
<template>
  <div class="home">
    <div>
      <button @click="showH2 = !showH2">切换</button>
    </div>

    <!-- 结合options api写法，动态改变component, appear属性表示第一次显示也执行动画 -->
    <transition name="qwer" mode="out-in" appear>
      <component :is="showH2? 'home': 'about'"></component>
    </transition>
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import About from './pages/About.vue'
export default {
  components: {
    Home,
    About
  }
}
</script>

<script setup>
import { ref } from 'vue';

const showH2 = ref(true)
</script>

<style scoped>
h2 {
  display: inline-block;
}
.qwer-enter-active {
  animation: showText 2s ease;
}
.qwer-leave-active {
  animation: showText 2s ease reverse;
}

@keyframes showText {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
```

### transition-group

如果希望**渲染的是一个列表**，并且该**列表中添加删除数据也希望有动画执行**呢？

这个时候我们要使用 < transition-group> 组件来完成；

* **默认情况下，它不会渲染一个元素的包裹器**，但是你可以**指定一个元素并以 tag attribute** 进行渲染；
* 过渡模式mode属性不可用，因为我们不再相互切换特有的元素；
* 列表内部元素总是需要**提供唯一的 key** attribute 值；
* CSS **过渡的类将会应用在内部的元素**中，而不是这个组/容器本身；

v-move，name-move对未改变节点的动画处理

![](https://imgbed.link/file/27533)

```vue
<template>
  <div class="app">
    <button @click="addNum">添加节点</button>
    <button @click="removeNum">移除节点</button>
    <button @click="shuffleNum">打乱节点</button>

    <!-- 给变化的列表加上过渡动画 -->
    <!-- transition-group默认不渲染成任何节点，可使用tag进行指定,不能使用mode属性 -->
    <transition-group tag="div" name="gr">
      <template v-for="item in nums" :key="item">
        <span>{{ item }}</span>
      </template>
    </transition-group>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
// shuffle打乱函数
import { shuffle } from 'underscore'

const nums = ref([0, 1, 2, 3, 4, 5, 6, 7, 8])

const addNum = () => {
  nums.value.splice(getRandomIndex(), 0, nums.value.length)
}

const removeNum = () => {
  nums.value.splice(getRandomIndex(), 1)
}

const getRandomIndex = () => {
  return Math.floor(Math.random() * nums.value.length)
}

const shuffleNum = () => {
  nums.value = shuffle(nums.value)
}
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  margin-right: 10px;
}
// 新增的或者删除的节点的动画
.gr-enter-from,
.gr-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.gr-enter-to,
.gr-leave-from {
  opacity: 1;
  transform: translateY();
}

.gr-enter-active {
  transition: all 2s ease;
}

.gr-leave-active {
  transition: all 2s ease;
}

// 其他需要移动的节点的动画
// 添加和移除节点后的突变处理
.gr-move {
  transition: all 2s ease;
}

.gr-leave-active {
  // 移除的特殊处理，当移除时，不需等移除结束再突变位置
  position: absolute;
}
</style>
```

## 响应式原理

1. 数据对应的依赖函数的收集，以及初次执行
2. 以类的方式存储依赖函数
3. 数据对应的响应式函数的自动触发(对象属性的变化监听)
   1. Object.defineProperty(obj, key, { set(){ console.log('监听到数据变化') }, get() { return value } })

![pCShYSx.png](https://s1.ax1x.com/2023/06/02/pCShYSx.png)

```js
/**
  * 1.dep对象数据结构的管理(最难理解)
    * 每一个对象的每一个属性都会对应一个dep对象
    * 同一个对象的多个属性的dep对象是存放一个map对象中
    * 多个对象的map对象, 会被存放到一个objMap的对象中
  * 2.依赖收集: 当执行get函数, 自动的添加fn函数
 */

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if (reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

// 方案一: Object.defineProperty() -> Vue2
// function reactive(obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key]
  
//     Object.defineProperty(obj, key, {
//       set: function(newValue) {
//         value = newValue
//         const dep = getDepend(obj, key)
//         dep.notify() // 通知依赖函数的执行
//       },
//       get: function() {
//         // 拿到obj -> key
//         // console.log("get函数中:", obj, key)
//         // 找到对应的obj对象的key对应的dep对象
//         const dep = getDepend(obj, key)
//         // dep.addDepend(reactiveFn)
//         dep.depend() // 收集依赖函数
  
//         return value
//       }
//     })
//   })  
//   return obj
// }

// 方式二: new Proxy() -> Vue3
function reactive(obj) {
  const objProxy = new Proxy(obj, {
    set: function(target, key, newValue, receiver) {
      // target[key] = newValue
      Reflect.set(target, key, newValue, receiver)
      const dep = getDepend(target, key)
      dep.notify() // 通知依赖函数的执行
    },
    get: function(target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend() // 收集依赖函数
      return Reflect.get(target, key, receiver)
    }
  })
  return objProxy
}


// ========================= 业务代码 ========================
const obj = reactive({
  name: "why",
  age: 18,
  address: "广州市"
})

// 添加依赖函数
watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age)
})

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"


console.log("=============== user =================")
const user = reactive({
  nickname: "abc",
  level: 100
})

watchFn(function() {
  console.log("nickname:", user.nickname)
  console.log("level:", user.level)
})

user.nickname = "cba"
```

