---
title: 'uniapp跨端应用'
date: 2023-06-27 23:48:00
permalink: '/posts/blogs/uniapp跨端应用'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - vue3
 - vue-router
 - Pinia
 - uniapp
 - 跨端
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---




## uniapp

### 原生VS跨平台

![pCGHQ5d.png](https://s1.ax1x.com/2023/06/21/pCGHQ5d.png)

* 原生开发的特点：

 **性能稳定，使用流畅，用户体验好、功能齐全，安全性有保证，兼容性好，可使用手机所有硬件功能**等

缺点

 但是开发周期长、维护成本高、迭代慢、部署慢、新版本必须重新下载应用

 不支持跨平台，必须同时开发多端代码

* 跨平台开发的特点：

** 可以跨平台，一套代码搞定iOS、Android、微信小程序、H5应用等**

** 开发成本较低，开发周期比原生短**

缺点

 适用于跟系统交互少、页面不太复杂的场景。

 但是对开发者要求高，除了本身JS的了解，还必须熟悉一点原生开发

 **不适合做高性能、复杂用户体验，以及定制高的应用程序。比如：抖音、微信、QQ等**。

 同时开发多端兼容和适配比较麻烦、调试起来不方便。

### 技术选型

 需要做**高性能、复杂用户体验、定制高的APP、需硬件支持的选 原生开发**

 需要性能较好、体验好、跨Android、iOS平台、 H5平台、也需要硬件支持的选 Flutter（采用Dart开发）

 需要**跨小程序、H5平台(web)、Android、iOS平台、不太复杂的先选 uni-app，其次选 Taro**

 **不需要扩平台的，选择对应技术框架即可**

![pCGbDTe.png](https://s1.ax1x.com/2023/06/21/pCGbDTe.png)

### uniapp历程

uni-app的历史

* uni-app中的 uni，读 you ni，是统一的意思。

* **DCloud**于2012年开始研发的小程序技术，并**推出了 HBuilder X 开发工具**。

* 2015年，DCloud正式商用了自己的小程序，产品名为**“流应用”**，
  * 并捐献给了工信部旗下的HTML5中国产业联盟。
* 该应用能接近原生功能和性能的App，并且即点即用，不需要安装。

* 微信团队经过分析，于2016年初决定上线微信小程序业务，但其没有接入中国产业联盟标准，而是订制了自己的标准。

### uniapp架构原理图

![pCGqq4H.png](https://s1.ax1x.com/2023/06/21/pCGqq4H.png)

### HBuilderX

* 方式一**（推荐）：HBuilderX创建 uni-app项目步骤：**
  * 点**工具栏里的文件 -> 新建 -> 项目（快捷键Ctrl+N）**
  * 选择uni-app类型，输入工程名，选择模板，选择Vue版本，点击创建即可。
* 方式二： Vue-CLI 命令行创建
  * 全局安装Vue-CLI （目前仍推荐使用 vue-cli 4.x ）： npm install -g @vue/cli@4
  * 创建项目：**vue create -p dcloudio/uni-preset-vue my-project-name**


* ​

### 运行到不同环境

#### 浏览器H5端

左上角点击运行 -> 运行到浏览器

#### 微信小程序端

微信开发者工具里的打开调用预览

- 1.微信开发者工具需要开启服务端口：**小程序开发工具设置 -> 安全**（目的是让HBuilder可以启动微信开发者工具）
- 2.如第一次使用，需**配置微信开发者工具的安装路径**（会提示下图）。
  - 点击工具栏运行 -> 运行到小程序模拟器 -> 运行设置，配置相应小程序开发者工具的安装路径
- 3.自动启动失败，可用微信开发者工具手动打开项目（项目在unpackage/dist/dev/mp-weixin路径下）。

#### 手机App端

* 第一步：下载mumu模拟器：https://mumu.163.com/mac/index.html

* 第二步：安装并打开mumu模拟器

* 第三步：配置**adb调试桥命令行工具**（用于 HBuilder X 和Android模拟器建立连接，来实时调试和热重载。HBuilder X 是有内置adb的 )

![pCJlzQJ.png](https://s1.ax1x.com/2023/06/22/pCJlzQJ.png)

* HBuilderX**正式版**的adb目录位置：安装路径下的 **tools/adbs** 目录
  * 而MAC下为HBuilderX.app/Contents/tools/adbs目录；
* HBuilderX **Alpha版的adb**目录位置：安装路径下的 **plugins/launcher/tools/adbs** 目录( 需先运行后安装了插槽才会有该目录 )
  * 而MAC下为/Applications/HBuilderX-Alpha.app/Contents/HBuilderX/plugins/launcher/tools/adbs目录
* 在**adbs目录下git bash运行./adb** ，即可使用adb命令（Win和Mac一样）。
* 如想要**全局使用 adb 命令，window电脑可在：设置 -> 高级系统设置 -> 环境变量(双击Path)中将adbs所在的文件路径放进去即可**


* 第四步：HBuilder X 开发工具连接mumu模拟器，使用adb调试桥来连接

  * **./adb connect 127.0.0.1:7555 连接mumu基座**
  * **./adb devices 查看是否连接成功**

  ![pCJ1zh8.png](https://s1.ax1x.com/2023/06/22/pCJ1zh8.png)

（ 端口是固定的，启动mumu模拟器默认是运行在7555端口）

◼ 第五步：选中**项目 -> 运行 ->运行App到手机或模拟器-> 选中Android基座**（基座其实是一个app壳）

![pCJ3p9S.png](https://s1.ax1x.com/2023/06/22/pCJ3p9S.png)

![pCJ3PXj.png](https://s1.ax1x.com/2023/06/22/pCJ3PXj.png)

##### [其它端(ios) 其它模拟器adb环境搭建请查看链接](https://gitee.com/zhu-jinfa/uniapp-adb)

##### 其它模拟器

* Mac 电脑：
  * 可以安装 Xcode 或者 Android Studio 软件。推荐 XCode。

* Window电脑：

  * 安装mumu、夜神、雷电模拟器等（推荐）
  * 可以安装 Android Studio 软件（模拟器大、速度慢、卡）。
* 详细安装教程
  * 可以看上面链接资料中对应的安装文档


### 全局和局部样式

全局样式

* **App.vue 中style的样式为全局样式**，作用于每一个页面（style标签不支持scoped，写了导致样式无效）。
  * App.vue 中通过 @import 语句可以导入外联样式，一样作用于每一个页面。
* **uni.scss 文件也是用来编写全局公共样式**，**通常用来定义全局变量**。

  * **uni.scss 中通过 @import 语句可以导入外联样式，一样作用于每一个页面**。

或

```css
// 编写全局样式
// :deep()
:global(.hy-h-scroll .uni-scroll-view::-webkit-scrollbar){
    display: none;
}
```

局部样式

* 在 **pages 目录下 的 vue 文件的style中的样式为局部样式**，只作用对应的页面，并会覆盖 App.vue 中相同的选择器。
* **vue文件中的style标签也可支持scss等预处理器**，比如：安装dart-sass插件后，style标签便可支持scss写样式了。

* style标签支持**scoped吗？不支持，不需写。**
* 使用**uni.scss(或其它scss文件)中的变量**，需在 HBuilderX 里面**安装 scss 插件**（一般情况下会自动安装dart-sass插件）
* 然后在该组件的 style 上加 **lang=“scss”**，重启即可生效。


### 全局数据globalData

```vue
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		// 定义全局数据
		globalData:{
			name: 'zjf',
			age: 23
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
```

```vue
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'hello uni'
			}
		},
		onLoad() {
			// 获取全局数据
			const app = getApp()
			console.log(app.globalData)
			
			// 获取页面路由
			const route = getCurrentPages()
			console.log(route[route.length - 1].route)
		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>

```

### 常用内置组件

* **view**：视图容器。类似于传统html中的div，用于包裹各种元素内容。（视图容器可以使用div吗？可以，但div不跨平台）
* **text**：文本组件。用于包裹文本内容。
* **button**：在小程序端的主题 和 在其它端的主题色不一样（可通过条件编译来统一风格）。
* **image**：图片。默认宽度 320px、高度 240px
  * 仅支持相对路径、绝对路径，支持导入，支持 base64 码；
* **scrollview**：可滚动视图区域，用于区域滚动。

  * 使用竖向滚动时，需要给 `<scroll-view>` 一个固定高度，通过 css 设置 height

  * 使用横向滚动时，需要给`<scroll-view>`添加white-space: nowrap;样式，子元素设置为行内块级元素。

  * APP和小程序中，请勿在 scroll-view 中使用 map、video 等原生组件。

  * 小程序的 scroll-view 中也不要使用 canvas、textarea 原生组件。

  * 若要使用下拉刷新，建议使用页面的滚动，而不是 scroll-view 。

* **swiper**：滑块视图容器，一般用于左右滑动或上下滑动比如banner轮播图。

  * 默认宽100%，高为150px，可设置swiper组件高度来修改默认高度，图片宽高可用100%。


### [背景图片](https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#%E8%83%8C%E6%99%AF%E5%9B%BE%E7%89%87)

引用的本地图片直接放在static下，还有二级目录可能会出现小程序端不显示的bug

### [字体图标](https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#%E5%AD%97%E4%BD%93%E5%9B%BE%E6%A0%87)

![pCYDbVK.png](https://s1.ax1x.com/2023/06/23/pCYDbVK.png)

## alias别名

alias: {

​    "@": path.resolve(__dirname, "..", "src"),

​    "@/components": path.resolve(__dirname, "..", "src/components"),

  }

## [扩展组件uni-ui库](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)

### 安装uni-ui

按需引入

[全部引入](https://ext.dcloud.net.cn/plugin?id=55)

新建项目时引入

npm引入

### 组件样式重写

◼ 小程序、App直接重写，需要添加 important

◼ H5、App和小程序使用：global( selector ) ，需要添加important

◼ H5 、App和小程序使用：deep( selector ) ，需要添加important

![pCY5Mee.png](https://s1.ax1x.com/2023/06/23/pCY5Mee.png)

## [条件编译-跨端兼容](https://uniapp.dcloud.net.cn/tutorial/platform.html)

针对不同平台的特殊处理

不同文件中写法

![pCtuF76.png](https://s1.ax1x.com/2023/06/24/pCtuF76.png)

## 页面跳转与通讯

### url或EventChannel传递(正向和逆向)

* 方式一：url查询字符串和EventChannel(页面跳转通信)

![pCYo2a4.png](https://s1.ax1x.com/2023/06/23/pCYo2a4.png)

EventChannel正向传参

* options api里的写法

![pCYofi9.png](https://s1.ax1x.com/2023/06/23/pCYofi9.png)

* composition api里的写法

```js
uni.navigateTo({
    url: '/pages/01-detail/01-detail',
    success: (res) => {
        res.eventChannel.emit('dataFromIndex', {
            data: '1111'
        })
    }
})
```

```vue
<script setup>
	import { ref, getCurrentInstance } from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	
	// 由于composition里没有this,所以通过getCurrentInstance获取
	const $instance = ref(getCurrentInstance().proxy)
	// $instance => 相当于options api里的this
	onLoad(() =>{
		const eventChannel = $instance.value.getOpenerEventChannel()
		eventChannel.on('dataFromIndex', (data) => {
			console.log('通过eventChannel获取到index得数据', data)
		})
	})
</script>
```

EventChannel逆向传参

![pCYTg6P.png](https://s1.ax1x.com/2023/06/23/pCYTg6P.png)

* composition api写法

```js
toDetail02() {
    uni.navigateTo({
        url: '/pages/02-detail/02-detail',
        events: {
            dataFromDetail02(data) {
                console.log(data)
            }
        }
    })
}
```

```vue
<template>
	<view>
		<view class="detail02">detail02页面</view>
		<button @click='backClick'>返回</button>
	</view>
</template>

<script setup>
	import { ref, getCurrentInstance } from 'vue'
	
	const $instance = ref(getCurrentInstance().proxy)
	const backClick = () => {
		uni.navigateBack({
			delta: 1
		})
		
		const eventChannel = $instance.value.getOpenerEventChannel()
		eventChannel.emit('dataFromDetail02', {
			data: 'detail02反向传递过来的数据'
		})
	}
</script>

<style lang="scss">

</style>
```

### 事件总线(适合逆向传递数据，不适合正向传递)

uni.$on

uni.$off

uni.$emit

**先on监听，后emit触发，有on添加监听必有off移除监听**

* 方式二：使用事件总线

![pCtuQBt.png](https://s1.ax1x.com/2023/06/24/pCtuQBt.png)

* composition api写法

```vue
<template>
	<button @click='toDetail03'>去detail03页面</button>
</template>

<script setup>
	import {
		onLoad,
		onUnload
	} from '@dcloudio/uni-app'

	onLoad(() => {
		uni.$on('dataFromDetail03', dataFromDetail03)
	})
	onUnload(() => {
		uni.$off('dataFromDetail03', dataFromDetail03)
	})
	const dataFromDetail03 = (data) => {
		console.log('从detail03监听到的数据', data)
	}

	// 跳转
	const toDetail03 = () => {
		uni.navigateTo({
			url: '/pages/03-detail/03-detail'
		})
	}
</script>
```

```vue
<template>
	<view>
		<view class="">detail03</view>
		<button @click='backClick'>返回</button>
	</view>
</template>

<script setup>
	const backClick = () => {
		uni.navigateBack({
			delta: 1
		})
		
		uni.$emit('dataFromDetail03', {
			data: 'detail03 emit 传递出来的数据'
		})
	}
</script>

<style lang="scss">

</style>
```



### globalData

* 方式三：全局数据 globalData

![pCYobZD.png](https://s1.ax1x.com/2023/06/23/pCYobZD.png)

### 本地数据

* 方式四：本地数据存储



### 状态管理库vuex和pinia

* 方式五：Vuex和Pinia，状态管理库




## 页面和组件生命周期

[页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)

[组件生命周期](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

![pCtKuPU.png](https://s1.ax1x.com/2023/06/24/pCtKuPU.png)

composition api里使用生命周期

```vue
<script setup>
	import { ref, onBeforeMount, onMounted } from 'vue'
	import {
		onLoad,
		onShow,
		onReady,
		onHide,
		onUnload,
		onPullDownRefresh,
		onReachBottom
	} from '@dcloudio/uni-app'
	
	// 1.页面的生命周期
	onLoad(() => {
		console.log('detail05 onLoad');
	})
	
	onShow(() => {
		console.log('detail05 onShow');
	})
	
	onReady(() => {
		console.log('detail05 onReady');
	})
	
	onHide(() => {
		console.log('detail05 onHide');
	})
	
	onUnload(() => {
		console.log('detail05 onUnload');
	})
	
	onPullDownRefresh(() => {
		console.log('detail05 onPullDownRefresh');
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 1000)
	})
	
	onReachBottom(() => {
		console.log('detail05 onReachBottom');
	})
	
	// 2.Vue组件的生命周期
	onBeforeMount(() => {
		console.log('detail05 onBeforeMount');
	})
	onMounted(() => {
		console.log('detail05 onMounted');
	})
</script>
```

## [网络请求](https://uniapp.dcloud.net.cn/api/request/request.html)

![pCtQG4K.png](https://s1.ax1x.com/2023/06/24/pCtQG4K.png)



## [数据存储(storage)](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstorage)

## easycom自定义组件

* **传统vue组件，需要创建组件、引用、注册**，三个步骤后才能使用组件， **easycom组件模式可以将其精简为一步**。
* easycom组件规范：组件需**符合components/组件名称/组件名称.vue 的目录结构**。符合以上目录结构的就可不用引用、注册，**直接在页面中使用该组件**了。

## 组件与[生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)

组件中可以使用页面的生命周期吗？在**Options API 语法：组件中不支持使用页面生命周期。**

在**Composition API语法：组件中支持页面生命周期，不同端支持情况有差异**。

## vue中composition api获取this

getCurrentInstance()获取代理对象，$instance在setup里使用记得加上.value

```vue
<script setup>
	import { ref, getCurrentInstance } from 'vue'
	
	// 由于composition里没有this,所以通过getCurrentInstance获取
	const $instance = ref(getCurrentInstance().proxy)
	// $instance => 相当于options api里的this
</script>
```

## [Pinia的使用](https://uniapp.dcloud.net.cn/tutorial/vue3-pinia.html#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86-pinia)

![pCNnRaV.png](https://s1.ax1x.com/2023/06/25/pCNnRaV.png)

* **uni-app 内置了 Pinia**，使用 HBuilder X 不需要手动安装，**直接使用**即可。
* 使用 **CLI 需要手动安装，执行 yarn add pinia 或 npm install pinia**。

## [vue3-lazy](https://blog.csdn.net/lianghecai52171314/article/details/125889601)

```shell
npm install vue3-lazy -S
```

main.ts

```js
// #ifdef H5
import lazyPlugin from 'vue3-lazy'
app.use(lazyPlugin, {
    loading: './assets/images/200.png', // 图片加载时默认图片
    error: './assets/images/200.png'// 图片加载失败时默认图片
})
// #endif
```

页面中使用(根据环境不同加上**条件编译**)

```vue
小程序和app端
<!-- #ifndef H5 -->
<image class="image" :lazy-load="true" :src="itemInfo.show.img" mode="widthFix"></image>
<!-- #endif -->

H5端
<!-- #ifdef H5 -->
<img class="image" v-lazy="itemInfo.show.img" >
<!-- #endif -->
```

## uni-app项目各端部署发布

### 小程序

1. 注册一个小程序账号： https://mp.weixin.qq.com/wxopen/waregister?action=step1
2. 登录已注册好的账号，拿到小程序 APPID： 
3. 发行->打包微信小程序
4. /unackage/dist/build/mp-weixin 自动新开的微信开发者工具里上传发布，微信平台提交审核后，点发布

![pCNhCX8.png](https://s1.ax1x.com/2023/06/25/pCNhCX8.png)

### H5

将打包好的/unackage/dist/build/h5部署到服务器即可(推荐使用vscode远程连接)

![pCNhJhR.png](https://s1.ax1x.com/2023/06/25/pCNhJhR.png)

```shell
yum install nginx

cd /etc/nginx/

service nginx start // 开启nginx服务

直接通过服务器ip即可访问到一个nginx提示页
```

```shell
vi nginx.conf // 或在vscode里修改

user nginx; -> user root;

server {
  root: ; -> /打包文件放置的位置/---;
}

cat nginx.conf // 查看是否修改成功

service nginx reload // 重启服务
```

### app端

#### 1.原生App云端打包

1. manifest.json App配置图标，点自动生成各种图标

启动界面、模块、权限先不管，

![pCN5KwF.png](https://s1.ax1x.com/2023/06/25/pCN5KwF.png)

2. 点击发行App云打包，使用云端证书（会自动生成证书），点击打包

https://dev.dcloud.net.cn/pages/app/list里查看打包项目的证书管理，没有就生成证书

/unpackage/release/apk/

mumu模拟器安装运行该apk文件或手机安装即可运行

#### **1.1手动生成证书：**

![pCUiVL8.png](https://s1.ax1x.com/2023/06/26/pCUiVL8.png)

或

[请下载查看androidStudio使用手册](https://gitee.com/zhu-jinfa/uniapp-adb) [安装andriodStudio](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html#)可视化生成证书



#### 2.Android离线打包

https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html#

或看之前学的uni-app视频



