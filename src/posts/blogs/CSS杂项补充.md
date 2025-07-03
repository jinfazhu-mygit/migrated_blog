---
title: 'CSS杂项补充'
date: 2021-5-11 22:20:00
permalink: '/posts/blogs/CSS杂项补充'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - html,css
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


## :wink:精灵图:wink:

通过对精灵图进行切割，获取某个图片的大小和坐标，使用**background-position**显示出指定位置的图片

## 字体图标

阿里巴巴iconfont图标库，icomoon.io库(下载，font文件粘贴，style内引入，html复制与使用；import icon 导入新图标，selection.json,下载并替换)

## CSS三角

```css

<style>
	.div {   //1
  	width: 0;
  	height: 0;
  	border: 10px solid transparent;  //透明
  	border-top-color: red;
	}
   .sanjiao {  //2 直角三角形
     width: 0;
     height: 0;
     border-width: 90px 30px 0 0;  //只设置上边框90px,右边框30px
     border-style: solid;  //实线边框
     border-color: red transparent transparent transparent;  //上边框为红，其余透明
   }
</style>
```

## 鼠标样式

```html
<div>
  <p style="cursor: default;">123456</p>  //默认
  <p style="cursor: pointer;">123456</p>  //手指
  <p style="cursor: move;">123456</p>  //十字标
  <p style="cursor: text;">123456</p>  //文本
  <p style="cursor: not-allowed;">123456</p>  //禁止
 </div>
```

## 表单轮廓及文本域拖放取消

**outline: none;**  //表单轮廓(input,button等轮廓的取消)

**resize: none;**  //text-area(评论框等)

## 图片与文本的居中对齐

**vertical-align: middle|top|bottom|baseline(默认) ** (只用于行内元素和行内块元素)

## 文本省略号显示

```css
<style>
    .div {
      width: 130px;
      height: 50px;
      background-color: red;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
</style>
```

## 毛玻璃

```html
<image class="bg-image" src="{{picUrl}}" mode="aspectFill"></image>
<view class="bg-cover"></view>
```

```css
.bg-image, .bg-cover {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 只有定位元素才可以设置z-index层级 */
}

.bg-cover { // 毛玻璃遮盖图片效果，做背景时应该注意将文字颜色改为白色
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(20px);
}
```

## fix顶部布局

```css
page {
    padding-top: fix节点对应的高;
}
.view {
	position: fixed;
}
```

## 一行，换行，两行...

```css
.item {   // 一行...
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

```css
.item {
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
}
```

## 行内多个styles['']写法

```js
<div className={`${styles['item-status']} ${styles[``]}`}>
</div>
```

## less高级用法

代码仅供参考：(以下实现的是less动态传入属性名和大小，根据1920*1080分辨率进行适配的函数)

```less
// 默认设计稿的宽度
@designWidth: 1920;

// 默认设计稿的高度
@designHeight: 1080;

// width、margin左右、padding左右、用
.useDynamicW(@name, @width) {
  @{name}: calc((@width * 100 * 1vw) / @designWidth);
}

// height、line-height、margin上下、padding上下、font-size用
.useDynamicH(@name, @height) {
  @{name}: calc((@height * 100 * 1vh) / @designHeight);
}

// width: calc(100% - vw(200));
.useCalcWidth(@width) {
  height: calc(100% - (@width * 100 * 1vw) / @designHeight)
}

// height: calc(100% - vh(200));
.useCalcHeight(@height) {
  height: calc(100% - (@height * 100 * 1vh) / @designHeight)
}

// 使用

.box {
  .useDynamicW(width, 400)
  .useDynamicH(height, 400)
}
// 注意区别和scss文件的引入方式
@import '~@/utils/utils.less';
```

## scss高级用法

代码仅供参考：(以下实现的是scss动态传入属性名和大小，根据1920*1080分辨率进行适配的函数)

```scss
$baseWidth: 1920;
$baseHeight: 1080;

@function vw($width) {
  @return calc(($width * 100 * 1vw) / $baseWidth);
}

@function vh($height) {
  @return calc(($height * 100 * 1vh) / $baseHeight);
}

// 使用
.box {
  width: vw(400);
  height: vh(400);
}

// 注意区别和scss文件的引入方式
@import '@/utils/utils.scss';
```

## webpack统一全局加上某个less和scss文件配置

```js
module.exports = {
        {
        test: /\.less$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev
            ? 'style-loader'
            : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          cssLoader(),
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              additionalData:
                '@import "~@/utils.less";'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev
            ? 'style-loader'
            : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          cssLoader(),
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData:
                '@import "@/default.module.scss";'
            }
          }
        ]
      },
}
```


![piUWpn0.png](https://z1.ax1x.com/2023/11/20/piUWpn0.png)