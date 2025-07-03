---
title: 'mobx1'
date: 2023-08-08 23:40:00
permalink: '/posts/blogs/mobx1'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - vue3
 - SSR
 - SEO
 - nuxt
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---



## SEO搜索引擎优化

![pCc8FgO.png](https://s1.ax1x.com/2023/07/07/pCc8FgO.png)

## SSG静态站点(适用于文档型的网站)

* SSG 应用一般在**构建阶段就确定了网站的内容**。
* 如果网站的内容需要更新了，那必须得**重新再次构建和部署。**
* **构建 SSG 应用常见的库和框架有： Vue Nuxt、 React Next.js 等。**

### 优缺点

SSG的优点：

* **访问速度非常快**，因为每个页面都是在构建阶段就已经提前生成好了。
* **直接给浏览器返回静态的HTML，也有利于SEO**
* SSG应用依然**保留了SPA应用的特性，比如：前端路由、响应式数据、虚拟DOM等**

SSG的缺点：

* 页面**都是静态，不利于展示实时性的内容，实时性**的更适合SSR。
* 如果**站点内容更新了，那必须得重新再次构建和部署**。

## SPA页面

单页面应用程序，

单页应用程序 (SPA) 全称是：Single-page application，SPA应用是在客户端呈现的（术语称：CRS）。

* SPA应用默认只返回一个空HTML页面，如：**body只有< div id=“app”>< /div>**。
* 而整个应用程序的内容都是通过 Javascript 动态加载，包括应用程序的逻辑、UI 以及与服务器通信相关的所有数据。
* **构建 SPA 应用常见的库和框架有： React、AngularJS、Vue.js** 等。

![pCcJk0H.png](https://s1.ax1x.com/2023/07/07/pCcJk0H.png)

### 优缺点

SPA的优点

* 只需加载一次
  * SPA应用程序只需要在第一次请求时加载页面，页面切换不需重新加载，而传统的**Web应用程序必须在每次请求时都得加载页面，需要花费更多时间。因此，SPA页面加载速度要比传统 Web 应用程序更快。**


* 更好的用户体验
  * SPA 提供类似于桌面或移动应用程序的体验。用户切换页面不必重新加载新页面
  * 切换页面只是内容发生了变化，页面并没有重新加载，从而使体验变得更加流畅
* 可轻松的**构建功能丰富的Web应用程序**

SPA的缺点

* **SPA应用默认只返回一个空HTML页面，不利于SEO （search engine optimization )**
* 首屏加载的资源过大时，一样会影响**首屏的渲染**
* 也**不利于构建复杂的项目**，复杂 Web 应用程序的大文件可能变得难以维护

## [SSR服务端渲染(同构应用)](https://blog.zhujinfa.top/React-Hooks(React18)/#ssr%E5%90%8C%E6%9E%84%E5%BA%94%E7%94%A8)

* **SSR应用的页面是在服务端渲染的**，用户**每请求一个SSR页面都会先在服务端进行渲染**，然后**将渲染好的页面，返回给浏览器呈现**。


* 构建 **SSR 应用常见的库和框架有： Vue Nuxt、 React Next.js 等（SSR应用也称同构应用）** 。

使用webpack将应用打包成server_bundle.js和client_bundle.js，客户端展示时将页面结构和交互进行结合(hydration)即可形成完整的交互性网站

![pCcGxt1.png](https://s1.ax1x.com/2023/07/07/pCcGxt1.png)

### 优缺点

SSR的优点

* **更快的首屏渲染速度**
  * 浏览器显示静态页面的内容要比 JavaScript 动态生成的内容快得多。
  * 当用户访问首页时可立即返回静态页面内容，而不需要等待浏览器先加载完整个应用程序。
* **更好的SEO**
  * 爬虫是最擅长爬取静态的HTML页面，服务器端直接返回一个静态的HTML给浏览器。
  * 这样有利于爬虫快速抓取网页内容，并编入索引，有利于SEO。
* SSR应用程序**在 Hydration 之后依然可以保留 Web 应用程序的交互性**。比如：**前端路由、响应式数据、虚拟DOM等**。

SSR的缺点

* **SSR 通常需要对服务器进行更多 API 调用**，以及在**服务器端渲染需要消耗更多的服务器资源，成本高**。
* 增加了一定的**开发成本**，**开发者需要关心哪些代码是运行在服务器端，哪些代码是运行在浏览器端**。
* SSR **配置站点的缓存通常会比SPA站点要复杂一点**。

### SSR解决方案

SSR的解决方案：

* 方案一：php、jsp ...
* 方案二：从零搭建 SSR 项目（ Node+webpack+Vue/React ）
* 方案三：直接使用流行的框架（推荐）
  * **React : Next.js**
  * **Vue3 : Nuxt3 | | Vue2 : Nuxt.js**
  * **Angular : Anglular Universal**

![pCcNq81.png](https://s1.ax1x.com/2023/07/07/pCcNq81.png)



## [学习代码地址](https://gitee.com/zhu-jinfa/SSR-learning-source-code)

## vue3+SSR(Nuxt.js)

## Node Server搭建

npm install express

npm install -D nodemon

npm install -D webpack webpack-cli webpack-node-externals



跑起服务

![pCcObvj.png](https://s1.ax1x.com/2023/07/08/pCcObvj.png)

webpack配置

![pCcjdk6.png](https://s1.ax1x.com/2023/07/08/pCcjdk6.png)



## Vue3 + SSR搭建实例(重点!!!)

总流程图

![pCgSNvD.png](https://s1.ax1x.com/2023/07/08/pCgSNvD.png)

### server服务端(获得静态页面)

需要用到的库

![pCcxbF0.png](https://s1.ax1x.com/2023/07/08/pCcxbF0.png)

创建一个可交互的vue文件App.vue，作为展示页面

![pCcxLWT.png](https://s1.ax1x.com/2023/07/08/pCcxLWT.png)

以函数的方式创建返回SSR实例App.js

![pCcxjlF.png](https://s1.ax1x.com/2023/07/08/pCcxjlF.png)

将SSR实例转成字符串的形式

放入html模板中使用/server/index.js

![pCcxxOJ.png](https://s1.ax1x.com/2023/07/08/pCcxxOJ.png)

配置babel和vue文件加载的loader /config/server.config.js

![pCczpwR.png](https://s1.ax1x.com/2023/07/08/pCczpwR.png)

重新打包，跑起服务，获得不可交互的静态页面

![pCcz9T1.png](https://s1.ax1x.com/2023/07/08/pCcz9T1.png)

### client客户端搭建以及交互混合(hydration)

createApp交互页面挂载

![pCgAn0O.png](https://s1.ax1x.com/2023/07/08/pCgAn0O.png)

客户端webpack打包配置(同server段配置些许区别)

![pCgAcuV.png](https://s1.ax1x.com/2023/07/08/pCgAcuV.png)

server端指定资源文件交互js文件位置

![pCgA2HU.png](https://s1.ax1x.com/2023/07/08/pCgA2HU.png)

**配置客户端打包脚本命令**，**server端的client端都重新打包**，**重跑server端服务**(此时以通过script命令获取到了相应的js交互文件，完成了hydration)，**访问页面，获得相应的可交互页面**

![pCgAHu6.png](https://s1.ax1x.com/2023/07/08/pCgAHu6.png)

控制台警告提示解决，去除未用到的一些功能

![pCgECKP.png](https://s1.ax1x.com/2023/07/08/pCgECKP.png)

### 跨请求状态污染

当某个用户对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个在请求的用户。

我们把这种情况称为：跨请求状态污染。

* 为了避免这种跨请求状态污染，SSR的解决方案是：
  * 可以在每个请求中为整个应用创建一个全新的实例，包括后面的 router 和全局 store等实例。
  * 所以我们在创建App 或 路由 或 Store对象时都是使用一个函数来创建，保证每个请求都会创建一个全新的实例。
  * 这样也会有缺点：需要消耗更多的服务器的资源。

![pCgVFQ1.png](https://s1.ax1x.com/2023/07/08/pCgVFQ1.png)

### webpack-merge配置合并

![pCgVywT.png](https://s1.ax1x.com/2023/07/08/pCgVywT.png)

保留不同配置即可

![pCgV2Y4.png](https://s1.ax1x.com/2023/07/08/pCgV2Y4.png)

### vue-router双端配置

总目录结构：

![pCgnSn1.png](https://s1.ax1x.com/2023/07/08/pCgnSn1.png)

创建createRouter函数(同避免跨请求状态污染的原理)，不同的端使用的路由模式不同，需外部传入/router/index.js

![pCgnp0x.png](https://s1.ax1x.com/2023/07/08/pCgnp0x.png)

页面的切换与展示App.vue

![pCgn976.png](https://s1.ax1x.com/2023/07/08/pCgn976.png)

node服务端配置路由/server/index.js

![pCgnitO.png](https://s1.ax1x.com/2023/07/08/pCgnitO.png)

client客户端配置路由/client/index.js

![pCgnmnI.png](https://s1.ax1x.com/2023/07/08/pCgnmnI.png)

双端打包，重跑即可

### pinia双端配置

pinia创建store

![pCgQPrd.png](https://s1.ax1x.com/2023/07/08/pCgQPrd.png)

服务端配置pinia /src/index.js

![pCgQKMQ.png](https://s1.ax1x.com/2023/07/08/pCgQKMQ.png)

client交互端配置pinia /client/index.js

![pCgQ8I0.png](https://s1.ax1x.com/2023/07/08/pCgQ8I0.png)

页面中使用 /views/About.vue /views/Home.vue

![pCgQaM4.png](https://s1.ax1x.com/2023/07/08/pCgQaM4.png)

## Vue3+nuxt3

## [什么是Nuxt](https://nuxt.com/)

* 在了解 Nuxt 之前，我们先来了解一下创建一个现代应用程序，所需的技术：
  * 支持**数据双向绑定 和 组件化**（ Nuxt 选择了**Vue.js** ）。
  * 处理客户端的**导航**（ Nuxt 选择了**vue-router** ）。
  * 支持开发中**热模块替换和生产环境代码打包**（ Nuxt支持**webpack 5和Vite** ）。
  * 兼容旧版浏览器，支持最新的 **JavaScript 语法转译**（ Nuxt使用**esbuild** ）。
  * 应用程序支持开发环境服务器，也支持**服务器端渲染 或 API接口开发**。
  * Nuxt **使用 h3 来实现部署可移植性**（h3是一个极小的**高性能的http框架**）
    * 如：支持**在 Serverless、Workers 和 Node.js 环境中运行**。
* Nuxt 是一个 **直观的 Web 框架**
  * 自 2016 年 10 月以来，Nuxt专门负责集成上述所描述的事情 ，并提供前端和后端的功能。
  * Nuxt 框架可以用来**快速构建下一个 Vue.js 应用程序**，如**支持 CSR 、SSR、SSG 渲染模式、混合模式的应用**等。

## Nuxt发展史

![pCgcalD.png](https://s1.ax1x.com/2023/07/09/pCgcalD.png)

## Nuxt3特点

![pCgcW6g.png](https://s1.ax1x.com/2023/07/09/pCgcW6g.png)

## 环境搭建

* 在开始之前，请确保您已安装推荐的设置：
  * **Node.js （最新 LTS 版本，或 16.11以上）**
  * VS Code 
    * **Volar、ESLint**、Prettier
* 命令行工具，新建项目（hello-nuxt )
  * **方式一：npx nuxi init hello-nuxt**
  * **方式二：pnpm dlx nuxi init hello-nuxt**
  * 方式三：npm install –g nuxi && nuxi init hello-nuxt
* 运行项目: cd hello-nuxt
  * **yarn install**
  * **npm install**
  * **pnpm install --shamefully-hoist**（创建一个扁平的 node_modules 目录结构，类似npm 和 yarn）
  * yarn dev

### 创建项目报错

* 第一步：ping raw.githubusercontent.com 检查是否通
* 第二步：如果访问不通，代表是网络不通

* 第三步：配置 host，本地解析域名

  * Mac电脑 host 配置路径： /etc/hosts

  * Win 电脑 host 配置路由：c:/Windows/System32/drivers/etc/hosts

* 第四步：在host文件中新增一行 ，编写如下配置：

  * 185.199.108.133 raw.githubusercontent.com

* 第五步：重新ping域名，如果通了就可以用了

## 项目相关

### 目录结构

![pCggxxS.png](https://s1.ax1x.com/2023/07/09/pCggxxS.png)

## [nuxt.config.ts](https://nuxt.com/docs/api/configuration/nuxt-config)

多看官方文档: https://nuxt.com/docs/api/configuration/nuxt-config

nuxt.config.ts 配置文件位于项目的根目录，可对Nuxt进行自定义配置。比如，可以进行如下配置：

* **runtimeConfig**：运行时配置，即定义环境变量
  * 可通过**.env文件中的环境变量来覆盖**，优先级（.env > runtimeConfig）
    * **.env的变量会打入到process.env中**，符合规则的会覆盖runtimeConfig的变量，**仅服务端能访问**
    * .env一般用于某些终端启动应用时动态指定配置，同时支持dev和pro


![pCgRM6S.png](https://s1.ax1x.com/2023/07/09/pCgRM6S.png)

![pCgRz7j.png](https://s1.ax1x.com/2023/07/09/pCgRz7j.png)

.env设置项目运行端口

![pCgWuNR.png](https://s1.ax1x.com/2023/07/09/pCgWuNR.png)

* **appConfig**： 应用配置，定义在构建时确定的公共变量，如：theme
  * 配置会和 **app.config.ts** 的配置合并（优先级 **app.config.ts > appConfig**）
  * **useAppConfig**()

![pCghAw4.png](https://s1.ax1x.com/2023/07/09/pCghAw4.png)

### 模板SEO优化(head)

* app：app配置
  * head：给每个页面上设置head信息，也支持 [useHead](https://nuxt.com/docs/api/composables/use-head) 配置和内置组件。

![pCgjnV1.png](https://s1.ax1x.com/2023/07/09/pCgjnV1.png)

* **ssr**：指定应用渲染模式


* **router**：配置路由相关的信息，比如在客户端渲染可以配置hash路由
* **alias**：路径的别名，默认已配好
* **modules**：配置Nuxt扩展的模块，比如：@pinia/nuxt @nuxt/image
* **routeRules**：定义路由规则，可更改路由的渲染模式或分配基于路由缓存策略（公测阶段）
* **builder**：可指定用 vite 还是 webpack来构建应用，默认是vite。如切换为 webpack 还需要安装额外的依赖。

## [内置组件](https://nuxt.com/docs/api/components/client-only)

Nuxt3 框架也提供一些内置的组件，常用的如下：

* **SEO**组件： **Head、Html、Body、Head、Title、Meta、Style、Link、NoScript、Base**
* **NuxtWelcome**：欢迎页面组件，该组件是 @nuxt/ui的一部分
* **NuxtLayout**：是 Nuxt 自带的页面布局组件
* **NuxtPage**：是 Nuxt 自带的页面占位组件，相当于**router-view**的效果
  * 需要显示位于目录中的顶级或嵌套页面 pages/
  * 是对 router-view 的封装
* **ClientOnly**：该组件中的默认插槽的内容只在客户端渲染
  * 而**fallback插槽的内容只在服务器端渲染**

```vue
<template>
  <div class="home">
    <div>我是Home Page</div>

    <!-- <ClientOnly fallback-tag="h3" fallback="loading....">
      <div>我只会在 client 渲染</div>
    </ClientOnly> -->

    <ClientOnly>
      <div>我只会在 client 渲染</div>
      <template #fallback>
        <h2>服务器端渲染的 loading 页面</h2>
      </template>
    </ClientOnly>
  </div>
</template>
```

* **NuxtLink**：是 Nuxt 自带的页面导航组件
  * 是 Vue Router< **RouterLink**>组件 和 HTML< a>标签的封装。

## 全局样式和局部样式

### 全局样式

1. 使用App.vue中的样式类



2.1 在assets中编写全局样式，比如：globel.scss

2.2 接着在nuxt.config中的css选项中配置

2.3 npm install sass -D

```js
export default defineNuxtConfig({  
  css: [
    '@/assets/css/global.scss',
    '@/assets/css/style.css'
  ]
})
```

3. [全局use](https://nuxt.com/docs/getting-started/assets) ，vue文件，scss文件，css文件、都会加入该css文件

```js
export default defineNuxtConfig({  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/variables.scss" as *;'
        }
      }
    }
  }
})
```

### 局部样式

1. .vue文件的scoped

```vue
<style scoped>
  color: red;
</style>
```

2. @import

```vue
<style lang="scss" scoped>
// 已不推荐，各模块变量名可能会重复导致覆盖(~和@都一样，nuxt默认进行了alias配置)
@import "~/assets/css/variables.scss";

.home {
  color: $color;
  font-size: $fsize;
  @include addBorder()
}
</style>
```

![pC2y1Qe.png](https://s1.ax1x.com/2023/07/10/pC2y1Qe.png)

3. @use

```vue
<style lang="scss" scoped>
// 给模块起一个命名空间
/* @use "~/assets/css/variables.scss" as vb; */
/* .home {
  color: vb.$color;
  font-size: vb.$fsize;
  @include vb.addBorder()
} */

/* 命名* 省略命名空间名 */
@use "~/assets/css/variables.scss" as *;

.home {
  color: $color;
  font-size: $fsize;
  @include addBorder()
}
</style>
```

![pC2ytot.png](https://s1.ax1x.com/2023/07/10/pC2ytot.png)

## 图片与字体资源显示

![pC2gIOg.png](https://s1.ax1x.com/2023/07/10/pC2gIOg.png)

### 字体图标引入

![pC2g7wj.png](https://s1.ax1x.com/2023/07/10/pC2g7wj.png)

```vue
<template>
  <div>
    <h3>Hello Nuxt3</h3>
    <NuxtPage></NuxtPage>

    <!-- 1.public资源使用 -->
    <!-- src='' 自动指向了/public目录下 -->
    <img src="/user.png" alt="">
    <div class="bg"></div>

    <!-- 2.assets目录 -->
    <img src="@/assets/images/avatar.png" alt="">
    <div class="avatar"></div>

    <!-- 3.变量形式导入 -->
    <img :src="feelImg" alt="">

    <!-- 4.字体图标的使用 -->
    <i class="iconfont icon-jichuguanli"></i>
    <i class="iconfont icon-zhongdaxiangmu"></i>
    <i class="iconfont icon-heguiguanli"></i>
  </div>
</template>

<script setup>
import feelImg from '@/assets/images/feel.png'
</script>

<script setup>
</script>

<style lang="scss" scoped>
.bg {
  width: 200px;
  height: 200px;
  background: url(/user.png);
}
.avatar {
  width: 200px;
  height: 200px;
  background: url(@/assets/images/avatar.png) no-repeat;
  background-size: contain;
}

.iconfont {
  font-size: 30px;
}
</style>
```

## 路由

### 新建页面

新建页面步骤

* 1.创建页面文件，比如： **pages/index.vue**
* 2.将**< NuxtPage /> 内置组件添加到 App.vue**

命令快速创建页面

* **npx nuxi add page home**  -> 创建home页面
* **npx nuxi add page profile/index**  -> 创建profile/index.vue页面

### 组件导航跳转(NuxtLink)

* < NuxtLink>是Nuxt内置组件，是对 RouterLink 的封装，用来实现页面的导航。
  * 该组件底层是一**个< a>标签**，因此使用 a + href 属性也支持路由导航
  * 但是用**a标签导航会有触发浏览器默认刷新事件，而 NuxtLink 不会**，**NuxtLink还扩展了其它的属性和功能**
* 应用**Hydration后（已激活，可交互）**，**页面导航会通过前端路由来实现。这可以防止整页刷新**
* **[NuxtLink](https://nuxt.com/docs/api/components/nuxt-link)** 组件属性：
  * **to**：支持路由路径、路由对象、URL
  * **href：to**的别名
  * **activeClass**：激活链接的类名
  * **target**：和a标签的target一样，指定何种方式显示新页面

![pCRwO8e.png](https://s1.ax1x.com/2023/07/10/pCRwO8e.png)

### 编程导航(navigateTo与useRouter)

编程导航不利于SEO，最好使用nuxt-link嵌套使用，使其渲染成a标签

App.vue

```vue
<template>
  <div>NuxtWelcome</div>

  <div>
    <!-- 1.nuxt-link组件to方式跳转 -->
    <nuxt-link to="/"><button>首页</button></nuxt-link>
    <!-- 2.通过navigateTo跳转 -->
    <button @click="categoryClick">分类</button>
    <!-- 3.通过hooks的方式进行导航 -->
    <button @click="profileClick">我的</button>
  </div>
  <NuxtPage></NuxtPage>
</template>


<script setup>
// 优先使用nuxt-link再考虑navigateTo
function categoryClick() {
  // 1.
  // navigateTo('/category')

  // 2.
  // navigateTo({
  //   path: 'category',
  //   query: {
  //     id: 100
  //   }
  // })

  // 3.
  navigateTo('https://www.baidu.com', {
    replace: false,
    external: true
  })
}

const router = useRouter()
function profileClick() {
  // router.back()
  // router.forward()
  // router.go(1)
  router.push({ path: '/profile' }) // 官方推荐直接navigateTo
  // router.replace({ path: '/profile' })
}
// 路由守卫
router.beforeEach((to, from) => {
  console.log(to, from)
  
})
</script>
```

![pCRD8BR.png](https://s1.ax1x.com/2023/07/10/pCRD8BR.png)

## Nuxt动态路由

* pages/detail/[id].vue -> /detail/:id


* pages/detail/user-[id].vue -> /detail/user-:id


* pages/detail/[role]/[id].vue -> /detail/:role/:id


* pages/detail-[role]/[id].vue -> /detail-:role/:id

使用useRoute获取路由页面的信息

![pCR6HL4.png](https://s1.ax1x.com/2023/07/10/pCR6HL4.png)

## 404页面

[...slug].vue，可放pages目录下，表示全局不匹配的路由显示组件，

放某个路由页面下表示，匹配某条路由的一部分后不匹配的页面

写法不一定用slug

![pCWWwlt.png](https://s1.ax1x.com/2023/07/11/pCWWwlt.png)

## 嵌套路由

1. 创建**一级路由，如：parent.vue**


2. 创建一个**与一级路由同名同级的文件夹**，如： parent


3. 在**parent文件夹下，创建一个嵌套的二级路由**

* 如：parent/child1.vue， 则为一个二级路由页面
* 如： **parent/index.vue 则为二级路由默认的页面**

4. 需要在**parent.vue中添加 NuxtPage 路由占位**

![pCWhxoD.png](https://s1.ax1x.com/2023/07/11/pCWhxoD.png)

## 路由中间件

中间件在客户端和服务器端都会执行，但在服务器端只有当页面刷新时才会执行

![pCWIuMn.png](https://s1.ax1x.com/2023/07/11/pCWIuMn.png)

### 全局自动执行中间件

(相当于每个路由页面都会加上该中间件)

![pCWonYD.png](https://s1.ax1x.com/2023/07/11/pCWonYD.png)

### 路由验证(validate)

通过**definePageMeta中的validate属性来对路由进行验证**。

* validate属性接受一个回调函数，回调函数中以 route 作为参数
* 回调函数的返回值支持：

返回 bool 值来确定是否放行路由

返回对象

* { statusCode:401 } // 返回自定义的 401 页面，验证失败

![pCWHrnA.png](https://s1.ax1x.com/2023/07/11/pCWHrnA.png)

### error页面与重定向(clearError)

![pCWHNtK.png](https://s1.ax1x.com/2023/07/11/pCWHNtK.png)

```vue
<template>
  <div class="error">
    <h2>error page</h2>
    <div class="">{{ props.error }}</div>
    <button @click="homeClick">回到首页</button>
  </div>
</template>

<script setup>
const props = defineProps({
  error
})

const homeClick = () => {
  clearError({ redirect: '/' })
}
</script>

<style lang="less" scoped>

</style>
```

