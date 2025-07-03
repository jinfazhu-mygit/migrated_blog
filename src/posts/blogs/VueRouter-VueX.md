---
title: 'VueRouter-VueX'
date: 2021-6-13 23:11:00
permalink: '/posts/blogs/VueRouter-VueX'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - vue
# isShowComments: true
# publish: true
icon: pen-to-square
star: true
sticky: true
---


# VueRouter+VueX

## VueRouter使用

### /router/index.js

```js
import VueRouter from 'vue-router'  //引入vuerouter模块
import vue from 'vue'  //引入vue模块

vue.use(VueRouter) //使用VueRouter,使用其他第三方插件所要用到Vue.use()

const Home = () => import('../components/Home')  //懒加载引入页面
const HomeNews = () => import('../components/HomeNews') //懒加载引入Home下的嵌套路由
const HomeMessage = () => import('../components/HomeMessage') //懒加载引入Home下的嵌套路由

const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')

const routes = [  //配置路由与组建的映射
  {
    path: '',
    redirect: '/home' //重定向
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [  //定义子路由(嵌套路由)
      // {
      //   path: "",
      //   redirect: 'news'
      // },
      {
        path: 'news',  //不用写成'/news'
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
  },
  {
    path: '/user/:userId', //动态路由
    component: User,
    meta: {
      title: '用户'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    },
  }
]
const router = new VueRouter({ //创建router实例
  routes,  //配置路由与组建的映射
  mode: 'history', //将hash模式设置为history模式
  linkActiveClass: 'active' //当前活跃路由的类名为active
})

router.beforeEach((to, from, next) => { //导航守卫
  document.title = to.matched[0].meta.title;
  console.log(to);
  next();
})

export default router
```

### App.vue

```vue

<template>
  <div id="app">
    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link>
    <router-link :to="'/user/' + userId" tag="button" replace>用户</router-link>
    <router-link :to="{ path: '/profile', query: { name: 'zjf', age: 21 } }" tag="button">归档</router-link>//query传参
    <!-- <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button> -->
    <keep-alive exclude="Profile,User,About">  //keepalive保证Home组件不会被立马销毁
      <router-view></router-view>
  	</keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: "lrii",
    };
  },
  methods: {
    userClick() {
      this.$router.push("/user/" + this.userId);
    },
    profileClick() {
      this.$router.push({
        path: "/profile",
        //query传递参数
        query: {
          name: "zjf",
          age: 21,
        },
      });
    },
  },
};
</script>

<style>
.active {
  color: red;
}
</style>
```

### main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router/index'  //引入router


new Vue({
  el: '#app',
  router,  //使用导出的router
  components: { App },
  template: '<App/>'
})

```

### Home.vue(含组件内守卫)

```vue
<template>
  <div>
    <h2>我是首页</h2>
    <p>2222</p>
    <router-link to="/home/news">新闻</router-link> //子路由
    <router-link to="/home/message">消息</router-link>//子路由
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      path: "/home/news",
    };
  },
  activated() {
    this.$router.push(this.path);
  },
  beforeRouteLeave(to, from, next) {
    console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  },
};
</script>

<style>
</style>
```

## VueX使用

* 官方解释：Vuex是一个专为Vue.js应用程序开发的**状态管理模式**
* 将多个组件共享的变量全部存储在一个对象里面，就是一个**共享的响应式变量存储**

* 流程，store数据的修改可通过官方浏览器插件Devtools监测

![VueX](https://vuex.vuejs.org/vuex.png)
### /store/index.js

```js
import Vue from 'vue'
import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)

const store = new Vuex.Store({ //Vuex.Store()
  state: {
    counter: 10000,
    idle: [
      { name: 'zjf', age: 21 },
      { name: 'zj', age: 19 },
      { name: 'zf', age: 23 },
      { name: 'jf', age: 18 },
    ],
    info: {
      name: 'kobe'
    }
  },
  mutations: {  //改变store的数据的唯一方式就是提交mutations！
    increment(state) { //事件类型加回调函数，state为第一个参数，还可传其他参数
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    incrementCount(state, count) {
      state.counter += count.count
    },
    addAddress(state) { //响应式修改数据
      Vue.set(state.info, 'address', 'luosanji');//响应式添加state数据
      Vue.delete(state.info, 'name');//响应式删除state数据
    },
    updateInfo(state) { //由actions中的异步提交的修改
      state.info.name = 'zjf'
    }
  },
  getters: { //返回对store后处理后的数据,相当于计算属性
    powerCounter(state) {
      return state.counter * state.counter;
    },
    more20stu(state) {
      return state.idle.filter((s) => s.age >= 20);
    },
    more20stuLength(state, getters) { //state,getters都作为参数
      return getters.more20stu.length;
    },
    moreAge(state) {
      return function (age) {
        return state.idle.filter(s => s.age >= age)
      }
    }
  },
  actions: {
    // aUpdateData(context, data) {//接收异步消息
    //   setTimeout(() => {
    //     context.commit('updateInfo');
    //     console.log(data)
    //   }, 1000);
    // }
    aUpdateData(context, data) {//接收异步消息
      return new Promise((resolve, reject) => { //promise实现异步接收
        setTimeout(() => {
          context.commit('updateInfo');
          console.log(data);
          resolve('传给App.vue的数据')
        }, 1000);
      })
    }
  },
  modules: {}
})

export default store
```

### App.vue

```vue
<template>
  <div id="app">
    <button @click="addAddress">修改信息</button>
    <button @click="changeData">异步修改</button>
    <h2>{{ $store.state.info }}</h2>
    <h2>{{ $store.state.counter }}</h2>
    <button @click="addition">+</button>
    <button @click="substraction">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <h2>getters改变得到的{{ $store.getters.powerCounter }}</h2>
    <h2>{{ $store.getters.more20stu }}</h2>
    <h2>{{ $store.getters.more20stuLength }}</h2>
    <h2>{{ $store.getters.moreAge(18) }}</h2>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "app message",
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    //提交修改
    addition() {
      this.$store.commit("increment"); //提交事件类型
    },
    substraction() {
      this.$store.commit("decrement");
    },
    addCount(count) {
      this.$store.commit({
        type: "incrementCount",
        count,
      });
    },
    addAddress() {
      this.$store.commit("addAddress");
    },
    changeData() {
      // this.$store.dispatch("aUpdateData", "actions submit"); //提交异步修改
      this.$store.dispatch("aUpdateData", "传给actions的数据").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>
```

### main.js

```js
import Vue from 'vue'
import App from './App'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
```






