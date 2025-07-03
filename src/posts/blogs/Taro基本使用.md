---
title: 'Taro基本使用'
date: 2022-11-1 20:40:00
permalink: '/posts/blogs/Taro基本使用'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - React
 - javascript
 - typescript
 - 跨端
 - 小程序
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---



### [taro基本使用](https://taro-docs.jd.com/docs/)

![x7fbUf.png](https://s1.ax1x.com/2022/11/01/x7fbUf.png)

#### 环境安装

* 首先，你需要使用 npm 或者 yarn 全局安装 `@tarojs/cli`，或者直接使用 [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b):

```javascript
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli

# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli

# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli
```

* 如果安装过程出现`sass`相关的安装错误，请在安装 [mirror-config-china](https://www.npmjs.com/package/mirror-config-china) 后重试。

```javascript
npm install -g mirror-config-china
```

* 可以使用 `npm info` 查看 Taro 版本信息，在这里你可以看到当前最新版本

```javascript
npm info @tarojs/cli
```

#### 创建项目

* 使用命令创建模板项目：

```javascript
taro init myApp
```

* npm 5.2+ 也可在不全局安装的情况下使用 npx 创建模板项目：

```javascript
npx @tarojs/cli init myApp
```

* 在创建完项目之后，Taro 会默认开始安装项目所需要的依赖，安装使用的工具按照 yarn > cnpm > npm 顺序进行检测。一般来说，依赖安装会比较顺利，但**某些情况下可能会安装失败**，这时候你可以在项目目录下**自己使用安装命令进行安装**：`npm install || cnpm install || pnpm install || yarn`

#### 编译运行(其他小程序编译允许请查看[taro文档](https://taro-docs.jd.com/docs/GETTING-STARTED#%E7%BC%96%E8%AF%91%E8%BF%90%E8%A1%8C))

```javascript
# yarn
$ yarn dev:weapp
$ yarn build:weapp

# npm script
$ npm run dev:weapp
$ npm run build:weapp

# 仅限全局安装
$ taro build --type weapp --watch
$ taro build --type weapp

# watch 同时开启压缩
$ set NODE_ENV=production && taro build --type weapp --watch # CMD
$ NODE_ENV=production taro build --type weapp --watch # Bash
```

### [webpack编译配置](https://docs.taro.zone/docs/config)

### [设计稿与尺寸单位px](https://docs.taro.zone/docs/size)

* Taro 默认以 750px 作为换算尺寸标准，如设计稿不是 750px 为标准需修改designWidth
  * 比如：设计稿是 640px，则需修改 config/index.js 中 designWidth 为 640
* 在**Taro中单位建议使用 px、 百分比 %，Taro 默认会对所有单位进行转换**。
  * 在 Taro中写尺寸按照 1:1 关系来写，即设计稿量长度 100px，那么尺寸就写 100px，当转成微信小程序时尺寸为 100rpx，当转成 H5 时尺寸以 rem 为单位。
  * 如你希望部分 px 单位不被转换成 rpx 或 rem ，最简单做法就是在 px 单位中增加一个大写字母。


* JS 中行内样式的转换
  * 在编译时，Taro 会帮你对样式做尺寸转换操作
  * 但是**如果是在 JS 中书写了行内样式，那么编译时就无法做替换**了
  * 针对这种情况，**Taro 提供了 API Taro.pxTransform 来做运行时的尺寸转换**。

```jsx
export default class StyleTaro extends Component {
  render() {
    const lineStyle = {
      // fontSize: 30, // 30px是不会被转换
      fontSize: Taro.pxTransform(30), // 30px是会被转换, 15px -> 30rpx
      color: "green",
    };
    return (
      <View>
        <View style={lineStyle}>行内样式，px的转换</View>
        <View style={{ fontSize: Taro.pxTransform(30) }}>
          行内样式，px的转换
        </View>
      </View>
    );
  }
}
```

#### 编译时px自动转换的忽略

* 忽略单个属性
  * 当前忽略单个属性的最简单的方法，就是 px 单位使用大写字母Px或PX。


* 忽略样式文件
  * 对于头部包含注释 /*postcss-pxtransform disable*/ 的文件，插件不予转换处理。

![pCUyQlF.png](https://s1.ax1x.com/2023/06/26/pCUyQlF.png)

### [全局样式和局部样式](https://docs.taro.zone/docs/css-modules)

module.css文件里的嵌套规则要和jsx里节点嵌套结构一致

![pCUgmFI.png](https://s1.ax1x.com/2023/06/26/pCUgmFI.png)

### 背景图片

为了方便开发，**Taro 提供了直接在样式文件中引用本地资源的方式，其原理是通过 PostCSS 的 postcss-url 插件将样式中本地资源引用转换成 Base64 格式**，从而能正常加载。

* 不建议使用太大的背景图，大图需挪到服务器上，从网络地址引用。
* 本地背景图片的引用支持：相对路径和绝对路径 。

![pCU72l9.png](https://s1.ax1x.com/2023/06/26/pCU72l9.png)

### iconfont字体图标

iconfont下载图标包代码，放入项目，引入对应的css文件，css文件中对应相应的.ttf文件

![pCUHV00.png](https://s1.ax1x.com/2023/06/26/pCUHV00.png)

### Taro命令创建页面

终端输入：taro create --name pageName

新建的页面，都需在 app.config.json 中的 pages 列表上配置

### 页面跳转

![pCUbSD1.png](https://s1.ax1x.com/2023/06/26/pCUbSD1.png)

### taro页面跳转接参getCurrentInstance

```jsx
import { Text, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
// 传参
Taro.navigateTo({
  url: `/zjfPackages/pages/index?consultantId=${item.ConsultantID}`
})
// 接参使用
import React, { memo } from 'react'

export default memo(function index() {
  const { router } = getCurrentInstance();
  
  return (
    <View>{router.params.consultantId}</View>
  )
})
```

### [EventChannel正向和逆向传递数据(仅支持微信小程序)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

正向传递(上述连接供参考)

![pCUbaV0.png](https://s1.ax1x.com/2023/06/26/pCUbaV0.png)

逆向传递

![pCUboxH.png](https://s1.ax1x.com/2023/06/26/pCUboxH.png)



### 事件总线(适合逆向传递)

为了支持跨组件、跨页面之间的通信，Taro 提供了全局事件总线：Taro.eventCenter

* Taro.eventCenter.on( eventName, function ) 监听一个事件


* Taro.eventCenter.trigger( eventName, data) 触发一个事件


* Taro.eventCenter.off( eventName, function ) 取消监听事件

跳转前的页面：

![pCUbOdP.png](https://s1.ax1x.com/2023/06/26/pCUbOdP.png)

跳转后的页面：

![pCUqeWF.png](https://s1.ax1x.com/2023/06/26/pCUqeWF.png)

### [页面生命周期](https://docs.taro.zone/docs/react-page/)

Taro 页面组件除了支持 React 组件生命周期 方法外，还根据小程序的标准，额外支持以下页面生命周期：

* **onLoad** (options) 在小程序环境中对应页面的 onLoad。
  * 通过访问 options 参数或调用 getCurrentInstance().router，可以访问到页面路由参数
* **componentDidShow**() 在小程序环境中对应页面的 onShow。
* **onReady** () 在小程序环境中对应页面的 onReady。
  * 可以使用 createCanvasContext 或 createSelectorQuery 等 API 访问小程序渲染层 DOM 节点
* **componentDidHide** () 在小程序环境中对应页面的 onHide。
* **onUnload** () 在小程序环境中对应页面的 onUnload。
  * 一般情况下建议使用 React 的 componentWillUnmount 生命周期处理页面卸载时的逻辑。
* **onPullDownRefresh**() 监听用户下拉动作，需要在相应的页面config.js中配置enablePullDownRefresh: true，可能需要重跑项目生效。
* **onReachBottom**() 监听用户上拉触底事件。

#### 函数式组件中接参和生命周期函数使用

```jsx
export default Index() {
	// 为什么使用useRef？因为useRef存的对象在整个组件的生命周期中都是保持同一个对象
    const $instance = useRef(Taro.getCurrentInstance());
    console.log("router.params=>", $instance.current.router.params);

    // 1.支持组件的生命周期
    useEffect(() => {
      // console.log("detail05 useEffect");
      return () => {
        // console.log("detail05 useEffect unMount");
      };
    }, []);

    // 2.页面的声明周期
    useLoad((options) => {
      console.log("detail05 useLoad", options);
    });
    useDidShow(() => {
      console.log("detail05 useDidShow");
    });
    useReady(() => {
      console.log("detail05 useReady");
    });
    useDidHide(() => {
      console.log("detail05 useDidHide");
    });
    useUnload(() => {
      console.log("detail05 useUnload");
    });
    usePullDownRefresh(() => {
      console.log("detail05 usePullDownRefresh");
      setTimeout(() => {
        Taro.stopPullDownRefresh();
      }, 1000);
    });

    useReachBottom(() => {
      console.log("detail05 useReachBottom");
    });
}

```

## [跨端兼容(process.env.TARO_ENV和多端文件)](https://taro-docs.jd.com/docs/envs)

### 1.内置环境变量process.env.TARO_ENV

**process.env.TARO_ENV**，用于判断当前的编译平台类型，有效值为：**weapp/h5/swan/alipay/tt/qq/jd/rn**

```jsx
import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import SelfButton from '@/components/self-button'

export default function CrossPlateform() {

  useLoad(() => {
    if (process.env.TARO_ENV === 'h5') {
      console.log('h5端')
    }
    if (process.env.TARO_ENV === 'weapp') {
      console.log('weapp端')
    }
  })

  return (
    <View className='cross-plateform'>
      {
        process.env.TARO_ENV === 'h5' && <SelfButton>h5端展示的button</SelfButton>
      }
      {
        process.env.TARO_ENV === 'weapp' && <SelfButton type='warning'>weapp端展示的button</SelfButton>
      }
    </View>
  )
}
```

### 2.统一接口的多端文件(.h5.jsx，.weapp.jsx，.js...等文件)

**将一个文件分成.h5，.weapp等多个文件(再在该文件不同的组件下写不同环境下的代码即可)**，当使用该组件时，taro会**自动根据运行端的环境去读取相应的文件**

![pCa8yNj.png](https://s1.ax1x.com/2023/06/27/pCa8yNj.png)

使用要点：

* 1.不同端的对应文件一定要**统一接口和调用方式**。
* 2.引用文件的时候，只需**写默认文件名，不用带文件后缀**。
* 3.最好有一个**平台无关的默认文件(index.jsx)**，这样在使用 TS 的时候也不会出现报错。

不同端对应不同逻辑

![pCaDLRS.png](https://s1.ax1x.com/2023/06/27/pCaDLRS.png)

## Redux Toolkit

请看redux复学博客

## 打包与部署

![pCBlV9s.png](https://s1.ax1x.com/2023/06/30/pCBlV9s.png)

























### 开发者工具配置代码片段(依个人喜好)

```json
{
  "Print to console": {
    "prefix": "cl",
    "body": [
      "console.log($1);"
    ],
    "description": "Log output to console"
  },
  "rcc": {
    "prefix": "rcc",
    "body": [
      "definePageConfig({",
      "  navigationBarTitleText: '页面标题'",
      "})",
      "",
      "import React, { Component } from 'react';",
      "",
      "export default class index extends Component {",
      "  render() {",
      "    return (",
      "      <>",
      "        $1",
      "      </>",
      "    )",
      "  }",
      "}",
      ""
    ],
    "description": "rcc"
  },
  "rfc": {
    "prefix": "rfc",
    "body": [
      "definePageConfig({",
      "  navigationBarTitleText: '页面标题'",
      "})",
      "",
      "import React from 'react';",
      "",
      "export default function index() {",
      "  return (",
      "    <>",
      "      $1",
      "    </>",
      "  )",
      "}",
      ""
    ],
    "description": "rfc"
  }
}
```

## [taro-ui](https://taro-ui.jd.com/#/docs/introduction)

`Taro UI` 是一款基于 [Taro](https://taro.aotu.io/) 框架开发的多端 UI 组件库

#### Taro

Taro 是由 [京东·凹凸实验室](https://aotu.io/) 倾力打造的多端开发解决方案。现如今市面上端的形态多种多样，Web、ReactNative、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信小程序、H5、RN等）运行的代码。

#### 特性

- 基于 `Taro` 开发 UI 组件
- 一套组件可以在 `微信小程序`，`支付宝小程序`，`百度小程序`，`H5` 多端适配运行（`ReactNative` 端暂不支持）
- 提供友好的 API，可灵活的使用组件

#### 各组件使用方式请结合文档

### 其他具体使用方法不做赘述，多看文档!!!

### 代码简单示例

```jsx
definePageConfig({
  navigationBarTitleText: '首页'
})

import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

interface IndexState {
  name: string,
  list: any[]
}

export default class Index extends Component<PropsWithChildren, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      list: []
    };
    this.downloadFileClick = this.downloadFileClick.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    console.log('zzxxcc');
  }

  downloadFileClick() {
    Taro.showToast({
      title: "弹窗内容",
      icon: 'error',
      duration: 2000
    })
  }

  render() {
    return (
      <View className='index'>
        <Swiper
          className='box'
          autoplay
          circular
          indicatorDots
          interval={1000}
          indicatorColor='#999'
          onClick={() => { }}
          onAnimationFinish={() => { }}
        >
          {/* <SwiperItem>
            <View className='text'>1</View>
          </SwiperItem> */}
          <SwiperItem>
            <View className='text'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='text'>3</View>
          </SwiperItem>
        </Swiper>
        <Text>Hello world!</Text>
        <AtButton type='primary' onClick={this.downloadFileClick}>I</AtButton>
      </View>
    )
  }
}
```

## taro与富文本

### [taro展示富文本以及手动添加表格边框](https://taro-docs.jd.com/docs/html#html-%E8%BD%AC%E4%B9%89)

直接设置 HTML 不会让 HTML 标签带上浏览器的默认样式，Taro 提供两种内置样式我们可以直接引入生效：

- `@tarojs/taro/html.css`: [W3C HTML4 的内置样式](https://www.w3.org/TR/CSS2/sample.html)，只有 HTML4 标签样式，体积较小，兼容性强，能适应大多数情况。

### 富文本表格内容在h5端展示的节点：

![z4XWex.png](https://s1.ax1x.com/2022/12/13/z4XWex.png)

h5端添加表格展示边框

```scss
.lg_rich_text_show {
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }
  
  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  
  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }
  
  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
}
```

### 同样的富文本表格内容在taro小程序端展示的节点：

**弊端**：taro小程序端无法同网页端一样自动解析decode解码如下：

```tsx
&nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;
```



```html
<View className="taro_html" dangerouslySetInnerHTML={{ __html: doubleElectionDetailInfo?.Introduction }}></View>
```

![z4jiXn.png](https://s1.ax1x.com/2022/12/13/z4jiXn.png)

taro端添加富文本表格边框

```scss
@import '@tarojs/taro/html.css'; // 必须在使用了小程序taro_html对应的样式文件中加入小程序端富文本标签默认样式!!!

.taro_html {
  width: calc(100% - 135.3px);
  >view { // 文本默认超出换行
    width: 100%;
    margin: 0px;
    word-break: break-all;
  }
  .h5-table {
    width: 100%;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }

  .h5-table .h5-td,
  .h5-table .h5-th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }

  .h5-table .h5-th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  .h5-blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  .h5-code {
    display: inline-block;
    display: inline;
    zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }

  .h5-pre .h5-code {
    display: block;
  }

  /* ul ol 样式 */
  .h5-ul,
  .h5-ol {
    margin: 10px 0 10px 20px;
  }
}
```

### [RichText展示富文本](https://taro-docs.jd.com/docs/components/base/rich-text)

```jsx
import { RichText } from '@tarojs/components';
import React, { memo } from 'react';

import 'index.scss';

export default memo(function index() {
  const showTableBorder = (e) => {
    // 正则添加表格类名
    let data = e?.replace(/<table([\s\w"-=\/\.:;]+)/ig, '<table$1 class="table"')
      .replace(/<td([\s\w"-=\/\.:;]+)/ig, '<td$1 class="td"')
      .replace(/<td\s*/ig, '<td class="td" ')
      .replace(/<th\s*/ig, '<th class="th" ')
    return data
  }
  
  return (
    <RichText nodes={showTableBorder(node)} space={'nbsp'} className={'richContent'}></RichText>
  )
})

// index.scss
// 同通过类名添加表格边框
.richContent .table{
  border-collapse: collapse;
  color: #333;
}
.richContent .table,.richContent .table .td,.richContent .table .th{
    min-width: 20px;
    border: 1px solid #dadada !important;
    box-sizing: border-box;
}
.richContent .table .th{
  background-color: #F5F5F5;
  font-weight: normal;
}
```

### [taro WebView使用](https://taro-docs.jd.com/docs/components/open/web-view)

src：webview 指向网页的链接。可打开关联的公众号的文章，其它网页需登录[小程序管理后台](https://mp.weixin.qq.com/wxamp/index/index?lang=zh_CN)配置业务域名。

```jsx
import { View, WebView } from '@tarojs/components'

<View className='webview'>
    <WebView src={this.url} />
 </View>
```



