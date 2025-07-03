---
title: '前端可视化(CSS3D-Canvas)'
date: 2023-6-08 22:00:00
permalink: '/posts/blogs/前端可视化(CSS3D-Canvas)'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - css
 - js
 - 可视化
 - 动画
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---




# 前端可视化(CSS3D、Canvas)

## 2D动画transform

常见的函数transform function有：

* 平移：translate(x, y)
* 缩放：scale(x, y)
* 旋转：rotate(deg) 在lineTo前使用
* 倾斜：skew(deg, deg)



* CSS 中的每个元素都有一个坐标系，其**原点位于元素的左上角**，左上角这被称为**初始坐标系**。

* 用**transform时，坐标系的原点默认会移动到元素的中心(重点)**。

* 因为**transform-origin属性的默认值为50% 50%**，即该原点将会作为变换元素的中心点。

* 用**transform属性旋转或倾斜元素，会变换或倾斜元素的坐标系**。并且该元素**所有后续变换都将基于新坐标系的变换**。

* 因此，**transform属性中变换函数的顺序非常重要**——**不同的顺序会导致不同的变换结果**。

### transform-origin

![pC9UjDP.png](https://s1.ax1x.com/2023/06/04/pC9UjDP.png)


## 3D动画 - transform

常见的函数transform function有：

* 平移：**translate3d(tx, ty, tz)**
  * translateX(tx) 、translateY(ty)、**translateZ(tz)**
* 缩放：**scale3d(sx, sy, sz)**

  * scaleX(sy)、scaleY(sy)、**scaleZ(sz)**、

* 旋转：**rotate3d(x, y, z, a)**

  * rotateX(x)、rotateY(y)、**rotateZ(z)**

3D形变函数会创建一个合成层来启用GPU硬件加速，比如： translate3d、 translateZ、 scale3d 、 rotate3d、...

### 3D旋转rotateZ 、rotateX、rotateY、rotate3d

**rotate3d(x, y, z, a)** a表示角度deg

* **x：`<number>` 类型，可以是 0 到 1 之间的数值，表示旋转轴 X 坐标方向的矢量( 用来计算形变矩阵中的值 )。**

*** y：`<number>` 类型，可以是 0 到 1 之间的数值，表示旋转轴 Y 坐标方向的矢量。**

*** z：`<number>` 类型，可以是 0 到 1 之间的数值，表示旋转轴 Z 坐标方向的矢量。**

*** a：`<angle>` 类型，表示旋转角度。正的角度值表示顺时针旋转，负值表示逆时针旋转。**

![pC9djk8.png](https://s1.ax1x.com/2023/06/04/pC9djk8.png)



### 3D位移 - translateX、translateY、translateZ

* **translateX(tx)等同于 translate(tx, 0) 或者 translate3d(tx, 0, 0)。**
* **translateY(ty) 等同于translate(0, ty) 或者 translate3d(0, ty, 0)。**
* **translateZ(zx)等同于 translate3d(0, 0, tz)。**


### 3D缩放 - scaleX、scaleY、scaleZ(基于坐标原点的缩放)

**scale在某个方向上的缩放值跟坐标原点有关，默认情况下scale值为1**，**所有方向上的缩放都是在坐标原点的基础之上进行的**

scale3d(sx, 1, 1) 会启用GPU硬件加速

* scaleX(sx) 等价于scale(sx, 1) 或 scale3d(sx, 1, 1) 。
* scaleY(sy)等价于 scale(1, sy) 或 scale3d(1, sy, 1)。
* scaleZ(sz)等价于 scale3d(1, 1, sz)。

```css
/* 形变 */
transform: scaleX(2) scaleY(2);
/* 简写 */
transform: scale3d(2, 2, 1);
transform-origin: 0 0;
```

### [3D透视-perspective(近大远小)](https://codepen.io/mburakerman/pen/wrZKwe)

倾斜效果的实现

**相当于设置摄像头点光源距离物体的位置(理解)**

实际上就是默认情况下，俯视图距离是无限远的，当设置perspective之后，就相当于设置了距离观察面的距离，近大远小的效果就实现了。

透视：**perspective**

* **定了观察者与 z=0 平面的距离**，使具有三维位置变换的元素产生透视效果（**z表示Z轴**）。

* **z>0 的三维元素比正常的大，而 z<0 时则比正常的小**，大小程度由该**属性的值决定**。

**透视的两种使用方式：**

* 1.在父元素上定义 CSS 透视属性：

![pC9wXuR.png](https://s1.ax1x.com/2023/06/04/pC9wXuR.png)

```html
<head>  
  <style>
    body{
      margin: 0;
      padding: 0;
      background-image: url(../images/grid.png);
    }
    .box{
      position: relative;
      width: 200px;
      height: 100px;
      background-color: skyblue;
      
      /* 在父元素添加透视效果 */
      perspective: 200px;
    }

    .item{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: pink;
      /* 形变 */
      transform: rotateY(60deg);
    }
  </style>
</head>
<body>
  
  <div class="box">div
    <div class="item">10</div>
  </div>
</body>
```

* 2.**如果它是子元素或单元素子元素，可以使用函数 perspective()**

![pC90SUK.png](https://s1.ax1x.com/2023/06/04/pC90SUK.png)

```html
<head>
  <style>
    body{
      margin: 0;
      padding: 0;
      background-image: url(../images/grid.png);
    }
    .box{
      position: relative;
      width: 200px;
      height: 100px;
      background-color: skyblue;
      
      /* 在当前元素中直接添加透视效果 */
      transform: perspective(200px) rotateY(60deg);
    }

  </style>
</head>
<body>
  <div class="box">div</div>
</body>
```
### 3D空间transform-style

**注意：子元素位置复用，不要直接复制，然后直接修改**

**正确的做法：**

1. 复制后，在后续添加相应的操作 


2. **父级元素先初始化好状态，在父级状态的基础上修改子元素！！！**

注意：transform-style: preserve-3d;一般是设置在**父元素(舞台)**上（所以一般是对父子级元素来启用3D空间）；两个不同父元素的元素使用3D空间会有问题

* **flat：指示元素的子元素位于元素本身的平面内。**
* **preserve-3d：指示元素的子元素应位于 3D 空间中。**


**正方体案例实现**

```html
<head>
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .container {
      margin-left: 200px;
      margin-top: 200px;
      position: relative;
      transform-style: preserve-3d;
      // 父级基础状态变换好
      transform: rotateX(-33.5deg) rotateY(45deg);
    }

    .item {
      width: 100px;
      height: 100px;
      opacity: 0.4;
      transform-origin: 50% 50%;
      position: absolute;

    }

    .f {
      background-color: #dba3a3;
      transform: rotateY(90deg) translate3d(50px, 0px, -50px);
    }

    .b {
      background-color: #9dcf61;
      transform: rotateY(90deg) translate3d(50px, 0px, 50px);
    }

    .l {
      background-color: #5293c9;
      transform: translate3d(0px, 0px, -100px);
    }

    .r {
      background-color: #53568e;
    }

    .u {
      background-color: #e17ba9;
      transform: rotateX(90deg) translate3d(0px, -50px, 50px);
    }

    .d {
      background-color: #9f59c2;
      transform: rotateX(90deg) translate3d(0px, -50px, -50px);
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="item f">f</div>
    <div class="item b">b</div>
    <div class="item l">l</div>
    <div class="item r">r</div>
    <div class="item u">u</div>
    <div class="item d">d</div>
  </div>
</body>

</html>
```

子级元素添加状态的情况

```html
<head>
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .container {
      margin-left: 200px;
      margin-top: 200px;
      position: relative;
      transform-style: preserve-3d;
    }

    .item {
      width: 100px;
      height: 100px;
      opacity: 0.4;
      transform-origin: 50% 50%;
      position: absolute;
      
    }

    .f {
      background-color: #dba3a3;
      transform: rotateX(-33.5deg) rotateY(45deg) translateZ(50px) rotateY(90deg) translate3d(50px, 0px, -50px);
    }
    .b {
      background-color: #9dcf61;
      transform: rotateX(-33.5deg) rotateY(45deg) translateZ(50px) rotateY(90deg) translate3d(50px, 0px, 50px);
    }
    .l {
      background-color: #5293c9;
      transform: rotateX(-33.5deg) rotateY(45deg) translateZ(50px) translate3d(0px, 0px, -100px);
    }
    .r {
      background-color: #53568e;
      transform: rotateX(-33.5deg) rotateY(45deg) translateZ(50px);
    }
    .u {
      background-color: #e17ba9;
      transform: rotateX(-33.5deg) rotateY(45deg) translateZ(50px) rotateX(90deg) translate3d(0px, -50px, 50px);
    }
    .d {
      background-color: #9f59c2;
      transform: rotateX(-33.5deg) rotateY(45deg) translateZ(50px) rotateX(90deg) translate3d(0px, -50px, -50px);
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="item f">f</div>
    <div class="item b">b</div>
    <div class="item l">l</div>
    <div class="item r">r</div>
    <div class="item u">u</div>
    <div class="item d">d</div>
  </div>
</body>

</html>
```

### 背面可见性-backface-visibility

**backface-visibility**

* visible：背面朝向用户时可见。

* hidden：背面朝向用户时不可见。

![pCfgU81.png](https://s1.ax1x.com/2023/07/12/pCfgU81.png)

```html
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    body {
      padding: 100px;
      background-image: url(./grid.png);
    }

    .box {
      width: 200px;
      height: 100px;
      position: relative;
      background-color: #a6d4a2;
      perspective: 800px;
    }

    .item {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #529db3;
      /* 背向可见性 */
      backface-visibility: hidden;
      animation: rotate 6s linear infinite;
    }

    @keyframes rotate {
      0% {
        transform: rotateY(0deg);
      }
      100% {
        transform: rotateY(360deg);
      }
    }
  </style>
</head>

<body>
  <div class="box">
    <div class="item">3</div>
  </div>
</body>

</html>
```

### 案例实现webpack-logo

![pCfgTaQ.png](https://s1.ax1x.com/2023/07/12/pCfgTaQ.png)

### 浏览器渲染流程

#### 渲染流程

![pCCv1v8.png](https://s1.ax1x.com/2023/06/05/pCCv1v8.png)

* 页面**元素位置、大小发生变化，往往会导致其他节点联动（所以，在做动画的时候，使用一个父元素进行包裹很重要，可极大减少回流的发生的可能）**，**需要重新计算布局，这个过程称为回流（Reflow）**。
* **默认标准流（1）**是在同一层上绘制，一些特殊属性会创建新的层绘制（比如说position为非static），这些层称为**渲染层（2）**。
* 一些不影响布局的 **CSS 修改也会导致该渲染层重绘（Repaint），回流必然会导致重绘**。

**Composite合成层**：**一些特殊属性会创建一个新的合成层（3  CompositingLayer ）**，并可以利用**GPU来加速绘制**，这是浏览器的一种优化手段。**合成层确实可以提高性能，但是它以消耗内存为代价**，因此**不能滥用作为 web 性能优化策略和过度使用**。

### 动画性能优化

#### 创建一个新的渲染层（减少回流）

* 有明确的定位属性（relative、fixed、sticky、absolute）
* 透明度（opacity 小于 1）
* 有 CSS transform 属性（不为 none）
* 当前有对于 opacity、transform、fliter、backdrop-filter 应用动画
* backface-visibility 属性为 hidden
* ....

#### 创建合成层 

**合成层会开始GPU加速页面渲染，但不能滥用，不然会耗费较大内存，导致浏览器页面崩溃**

* **对 opacity、transform、fliter、backdropfilter应用了animation或transition（需要是active的animation或者 transition）**
* **有 3D transform 函数：比如： translate3d、 translateZ、 scale3d 、 rotate3d ...**
* **will-change** 设置为 opacity、transform、top、left、bottom、right，比如：will-change: opacity , transform;
  * 其中 top、left等需要设置明确的定位属性，如 relative 等


## Canvas

* Canvas提供了非常多的JavaScript绘图API（比如：绘制路径、矩形、圆、文本和图像等方法），与<canvas>元素可以绘制各种2D图形。
* Canvas API 主要**聚焦于 2D 图形**。当然也可以**使用`<canvas>`元素对象的 WebGL API 来绘制 2D 和 3D 图形**。
* 可以**用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理**等方面。

**Canvas 优点：**

* Canvas提供的功能更原始，适合像素处理，动态渲染和数据量大的绘制，如：**图片编辑、热力图、炫光尾迹特效**等。

* Canvas非常**适合图像密集型的游戏开发，适合频繁重绘许多的对象**。

* Canvas能够**以 .png 或 .jpg 格式保存结果图像，适合对图片进行像素级的处理**。

**Canvas 缺点：**

* 在移动端可以能会因为**Canvas数量多**，而导致**内存占用**超出了手机的承受能力，导致浏览器崩溃。

* Canvas 绘图**只能通过JavaScript脚本操作**（all in js）。

* Canvas 是由**一个个像素点构成的图形**，**放大**会使图形变得颗粒状和像素化，导致**模糊**。

### canvas绘制矩形相关(strokeRect,fillRect,clearRect橡皮擦)

* **fillRect(x, y, width, height)： 绘制一个填充的矩形  fillStyle = 'red'背景颜色**
* **strokeRect(x, y, width, height)： 绘制一个矩形的边框 strokeStyle = 'red' 边框颜色**
* **clearRect(x, y, width, height)： 清除指定矩形区域(橡皮擦)，让清除部分完全透明**

![pCPBI1S.png](https://s1.ax1x.com/2023/06/06/pCPBI1S.png)

```html
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      background-image: url('../images//grid.png');
    }
    canvas {
      background-color: rgba(234, 118, 118, 0.4);
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="300" height="300">您的浏览器不支持canvas，请升级浏览器</canvas>

  <script>
    // 需要在页面加载完成后获取节点
    window.onload = function() {
      const canvasEl = document.getElementById('canvas')
      // 对象方式打印节点
      // console.log('%O', canvasEl)
      if(!canvasEl.getContext) return
      // canvasRenderingContext2D
      const canvasContext = canvasEl.getContext('2d')
      // console.log(canvasContext)
      // 1.创建填充矩形
      canvasContext.fillStyle = 'red'
      canvasContext.fillRect(0, 0, 100, 50) // 坐标x, 坐标y, 宽, 高
      // 2.创建边框矩形
      canvasContext.strokeStyle = 'blue'
      canvasContext.strokeRect(100, 100, 100, 50)
      // 3.矩形的橡皮擦
      canvasContext.clearRect(90, 40, 10, 10)
    }
  </script>
</body>
</html>
```

### canvas绘制路径相关

使用路径绘制图形的步骤：

1. 首先需要创建路径起始点（**beginPath**）。
2. 然后使用画图命令去**画出路径( arc （画圆）、lineTo 、moveTo（移动画笔）)。**
3. 之后把**路径闭合( closePath , 不是必须)**。
4. 一旦路径生成，就能通过描边(**stroke**)或填充路径区域(**fill**)来渲染图形。

以下是绘制路径时，常要用到的函数

* **beginPath**()：**新建一条路径，生成之后，图形绘制命令被指向到新的路径上绘图，不会关联到旧的路径**。
* **moveTo**()：**移动画笔起始坐标位置**
* **lineTo()：画笔绘画结束点位置**
* **closePath()：闭合路径之后图形绘制命令又重新指向到 beginPath之前的上下文中。**
* **stroke()：通过线条来绘制图形轮廓/描边（针对当前路径图形）。**
* **fill()：通过填充路径的内容区域生成实心的图形（针对当前路径图形），fill自动实现了closePath闭合**

#### 绘制线段(moveTo, lineTo)

![pCPyi7j.png](https://s1.ax1x.com/2023/06/06/pCPyi7j.png)

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')
  canvasContext.lineWidth = 2
  // 1. beginPath开始绘画
  canvasContext.beginPath()
  // 2. moveTo移动画笔起始位置、lineTo设置笔画结束位置
  canvasContext.moveTo(20, 10)
  canvasContext.lineTo(100, 10)
  // 3. closePath闭合路径的启用 根据实际情况而定
  canvasContext.closePath()
  // 4. stroke或fill展示渲染出图画
  canvasContext.stroke()
}
```

#### 绘制三角形(moveTo, lineTo,closePath)

![pCPgI5d.png](https://s1.ax1x.com/2023/06/06/pCPgI5d.png)

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')
  // 1.绘制闭合线段三角形
  canvasContext.beginPath()

  canvasContext.moveTo(50, 0)
  canvasContext.lineTo(100, 50)
  canvasContext.lineTo(50, 100)

  canvasContext.closePath()

  canvasContext.strokeStyle = 'red'
  canvasContext.stroke() // stroke默认不自动闭合路径，需手动调用closePath

  // 2. 绘制填充三角形
  canvasContext.beginPath()

  canvasContext.moveTo(150, 0)
  canvasContext.lineTo(200, 50)
  canvasContext.lineTo(150, 100)

  canvasContext.fillStyle = 'red'
  canvasContext.fill() // fill默认自动闭合路径，会自动调用closePath
}
```

#### 绘制圆弧(Arc)、圆(Circle)

arc(x, y, radius, startAngle, endAngle, anticlockwise)，该方法有六个参数：

重点：**弧度 = 弧长 / 半径**

所以 整圆弧度为：2 * Math.PI * r / r = 2 * Math.PI  **整圆弧度为2* Math.PI**

* **x、y：为绘制圆弧所在圆上的圆心坐标。**
* **radius：为圆弧半径。**
* **startAngle、endAngle：该参数用弧度定义了开始以及结束的弧度。这些都是以 x 轴为基准。**
* **anticlockwise：为一个布尔值。为 true ，是逆时针方向，为false，默认是顺时针方向，默认为false。**

![pCPRlfs.png](https://s1.ax1x.com/2023/06/06/pCPRlfs.png)

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')

  // 方式一(推荐)
  canvasContext.beginPath()
  // x, y, r, startRad, endRad, antiClock逆时针默认为false
  canvasContext.arc(50, 50, 25, 0, 2 * Math.PI, false)
  canvasContext.stroke()

  canvasContext.beginPath()
  canvasContext.arc(150, 250, 25, 0, Math.PI) // 默认顺时针
  canvasContext.stroke() // canvasContext.fill()

  // 方式二
  // canvasContext.beginPath()
  // canvasContext.arc(50, 50, 25, 0, 2 * Math.PI, false)
  // // 手动移动画笔到下一个圆弧的起始点
  // canvasContext.moveTo(175, 250)
  // canvasContext.arc(150, 250, 25, 0, Math.PI) // 默认顺时针
  // canvasContext.stroke()
}
```

#### 路径绘制矩形(rect)

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  // 对象方式打印节点
  // console.log('%O', canvasEl)
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')

  canvasContext.beginPath()
  canvasContext.rect(50, 0, 100, 50)
  // canvasContext.closePath()
  // canvasContext.stroke()
  canvasContext.fill()
}
```

### canvas颜色colors

* **fillStyle = color**： 设置图形的填充颜色，**需在 fill() 函数前调用。**
* **strokeStyle = color**： 设置图形轮廓的颜色，**需在 stroke() 函数前调用。**

color可以设置的值：**关键字、十六进制、rgb、rgba格式**。

```js
ctx.fillStyle = 'red'
ctx.fillStyle = '#ffaaff'
ctx.fillStyle = 'rgb(255, 0, 123)'
ctx.fillStyle = 'rgba(255, 0, 123, 0.3)'

ctx.strokeStyle = 'red'
ctx.strokeStyle = '#ffaaff'
ctx.strokeStyle = 'rgb(255, 0, 123)'
ctx.strokeStyle = 'rgba(255, 0, 123, 0.3)'
```

* **一旦设置了 strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值。**
* **如果你要给图形上不同的颜色，你需要重新设置 fillStyle 或 strokeStyle 的值。**


### 透明度Transparent

1. 使用**strokeStyle**和**fillStyle**的**RGBA**属性（局部颜色）
2. **globalAlpha**属性（全局透明度，指定该行代码后续所有元素的透明度，之前的不受影响）
   1. **globalAlpha = 0 ~ 1**
   2. **这个属性影响到 canvas 里所有图形的透明度**
   3. **有效的值范围是 0.0（完全透明）到 1.0（完全不透明），默认是 1.0。**

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  // 对象方式打印节点
  // console.log('%O', canvasEl)
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')

  // 全局透明度
  canvasContext.globalAlpha = '0.3'

  canvasContext.beginPath()
  canvasContext.rect(10, 10, 90, 40)
  // 局部颜色
  canvasContext.fillStyle = 'rgba(255, 0, 0, 0.6)'
  canvasContext.fill()

  canvasContext.beginPath()
  canvasContext.rect(100, 50, 90, 40)
  // 局部颜色
  canvasContext.fillStyle = 'rgba(0, 255, 0, 0.8)'
  canvasContext.fill()
}
```

### 线型Line styles

* lineWidth = value： 设置线条宽度。

* lineCap = type： 设置线条末端样式。

* lineJoin = type： 设定线条与线条间接合处的样式。

#### lineWidth

**lineWidth**与**像素边界**的位置决定了是否会有自动填充色

* 设置**线条宽度的属性值必须为正数。默认值是 1.0px**，不需单位。（ 零、负数、Infinity和NaN值将被忽略）
* 线宽是**指给定路径的中心到两边的粗细**。换句话说就是在**路径的两边各绘制线宽的一半**。

* 如果你想要绘制一条从 (3,1) 到 (3,5)，宽度是 1.0 的线条，你会得到像第二幅图一样的结果。
  * 路径的**两边个各延伸半个像素填充并渲染出1像素的线条**（深蓝色部分）
  * **两边剩下的半个像素又会以实际画笔颜色一半色调来填充**（浅蓝部分）
  * 实际画出线条的区域为（浅蓝和深蓝的部分），填充色大于1像素了，这就是为何宽度为 1.0 的线经常并不准确的原因。
* 要解决这个问题，必须**对路径精确的控制**。如，1px的线条会在路径两边各延伸半像素，那么像第三幅图那样绘制从 **(3.5 ,1) 到 (3.5, 5) 的线条**，其**边缘正好落在像素边界**，填充出来就是**准确的宽为 1.0 的线条**。

![pCiUlIf.png](https://s1.ax1x.com/2023/06/06/pCiUlIf.png)

注意线条与像素边界的位置

![pCiU2LR.png](https://s1.ax1x.com/2023/06/06/pCiU2LR.png)

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  // 对象方式打印节点
  // console.log('%O', canvasEl)
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')
  // console.log(canvasContext)
  // 创建边框矩形
  canvasContext.strokeStyle = 'blue'
  // 仔细体会下两个矩形的区别(一个会自动填充，一个刚好到边界)
  // 不能完全被clear,还包含0.5px外部 + 0.5px填充色
  canvasContext.strokeRect(100, 100, 100, 50)
  // 刚好完全被clear，刚好到像素边界
  // canvasContext.strokeRect(100.5, 100.5, 99, 49)
  // 矩形的橡皮擦x, y, width, height
  canvasContext.clearRect(100, 100, 100, 50)
}
```

#### lineCap线端点样式

lineCap： 属性的值决定了**线段端点显示**的样子。它可以为下面的三种的其中之一：

* butt 截断，默认是 butt。
* round 圆形
* square 正方形

![pCiach8.png](https://s1.ax1x.com/2023/06/06/pCiach8.png)

#### lineJoin线条连接处样式

lineJoin： 属性的值决定了**图形中线段连接处**所显示的样子。它可以是这三种之一：

* round 圆形
* bevel 斜角
* miter 斜槽规，默认是 miter。

![pCiaR1g.png](https://s1.ax1x.com/2023/06/06/pCiaR1g.png)

### 绘制文本

canvas 提供了两种方法来渲染文本：

* fillText(text, x, y [, maxWidth])
  * 在 (x,y) 位置，填充指定的文本
  * 绘制的最大宽度（可选）。
* strokeText(text, x, y [, maxWidth])
  * 在 (x,y) 位置，绘制文本边框
  * 绘制的最大宽度（可选）

文本的样式（需在绘制文本前调用）

* **font** = value： 当前绘制文本的样式。这个字符串使用和 CSS font 属性相同的语法。默认的字体是：**10px sans-serif**。
* **textAlign** = value：文本对齐选项。可选的值包括：**start**, end, left, right or center. 默认值是 start
* **textBaseline** = value：基线对齐选项。可选的值包括：top, hanging, middle, **alphabetic**, ideographic, bottom。默认值是 alphabetic。

![pCiwiaq.png](https://s1.ax1x.com/2023/06/06/pCiwiaq.png)

![pCid1gg.png](https://s1.ax1x.com/2023/06/06/pCid1gg.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      background-image: url('../images//grid.png');
    }
    canvas {
      background-color: rgba(234, 118, 118, 0.4);
    }
  </style>
</head>
<body>
  <canvas id="canvas" width="300" height="300">您的浏览器不支持canvas，请升级浏览器</canvas>

  <script>
    // 需要在页面加载完成后获取节点
    window.onload = function() {
      const canvasEl = document.getElementById('canvas')
      // 对象方式打印节点
      // console.log('%O', canvasEl)
      if(!canvasEl.getContext) return
      // canvasRenderingContext2D
      const canvasContext = canvasEl.getContext('2d')
      
      canvasContext.font = '30px sans-serif'
      canvasContext.textAlign = 'start'
      canvasContext.textBaseline = 'top'
      
      canvasContext.fillText('Ay', 100, 100)
      // canvasContext.strokeText('Ay', 100, 100)
    }
  </script>
</body>
</html>
```

### 绘制图片

绘制图片，可以使用 drawImage 方法将它渲染到 日7999；‘【··I9里\

[[。][drawImage 方法有三种形态：

* **drawImage(image, x, y)**
  * 其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
* **drawImage(image, x, y, width, height)**
  * 包含图片缩放
  * 这个方法多了 2 个参数：width 和 height，这两个参数用来控制 当向 canvas 画入时应该缩放的大小
* **drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)**
  * 包含图片裁剪
  * 第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它 8 个参数最好是参照右边的图解，前 4 个是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小。

**图片的来源**，canvas 的 API 可以使用下面这些类型中的一种作为图片的源：

* **HTMLImageElement**：这些图片是**由Image()函数构造出来**的，或者任何的<img>元素。
* document.getElement
* HTMLVideoElement：用一个 HTML 的 `<video>`元素作为你的图片源，可以从视频中抓取当前帧作为一个图像。
* HTMLCanvasElement：可以使用另一个 `<canvas>` 元素作为你的图片源。

![pCi0etP.png](https://s1.ax1x.com/2023/06/06/pCi0etP.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    
    body {
      background-image: url(../images/grid.png);
    }
    
    canvas {
      background-color: rgba(255, 0, 0, 0.3);
    }
  </style>
</head>
<body>
  <canvas id="test" width="300" height="300"></canvas>
  <image id="img" src="../images/backdrop.png" style="visibility: hidden;"></image>

  <script>
    window.onload = function () {
      const canvasEl = document.getElementById('test')
      if(!canvasEl.getContext) return
      const canvasCtx = canvasEl.getContext('2d')

      // 创建image对象
      const image = new Image()
      image.src = '../images/backdrop.png'

      // 图片加载完成时
      image.onload = function() {
        // canvas画图
        canvasCtx.drawImage(image, 0, 0)

        // 后续线条在图片的基础上显示(后绘制的图案会层叠上去)
        canvasCtx.beginPath()
        canvasCtx.moveTo(40, 100)
        canvasCtx.lineTo(50, 30)
        canvasCtx.lineTo(70, 80)
        canvasCtx.lineTo(130, 30)

        canvasCtx.stroke()
      }

      // document方式绘制
      const imgEl = document.getElementById('img')
      canvasCtx.drawImage(imgEl, 0, 150)
    }
  </script>
</body>
</html>
```

### canvas绘画状态的保存(栈save,restore)

* Canvas**在绘画时，会产生相应的绘画状态**，其实**我们是可以将某些绘画的状态存储在栈中来为以后复用**。


* Canvas **绘画状态的可以调用 save 和 restore 方法**是用来保存和恢复，这**两个方法都没有参数**，并且**它们是成对存在的**。

保存和恢复（Canvas）绘画状态

* **save()**：保存画布 (canvas) 的所有绘画状态
* **restore()**：恢复画布 (canvas) 的所有绘画状态

可保存的状态包括：

* 当前**应用的变形（即移动，旋转和缩放）**
* 以及这些属性：**strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin**, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, **font, textAlign, textBaseline** ......


* 当前的**裁切路径（clipping path）**

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  // 对象方式打印节点
  // console.log('%O', canvasEl)
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')

  canvasContext.fillStyle = 'red'
  canvasContext.fillRect(10, 10, 30, 20)
  canvasContext.save() // 状态入栈

  canvasContext.fillStyle = 'green'
  canvasContext.fillRect(50, 10, 30, 20)
  canvasContext.save() // 状态入栈

  canvasContext.fillStyle = 'blue'
  canvasContext.fillRect(90, 10, 30, 20)
  canvasContext.save() // 状态入栈

  canvasContext.restore() // 状态出栈
  // canvasContext.fillStyle = 'blue'
  canvasContext.fillRect(90, 40, 30, 60)

  canvasContext.restore() // 状态出栈
  // canvasContext.fillStyle = 'green'
  canvasContext.fillRect(50, 40, 30, 60)

  canvasContext.restore() // 状态出栈
  // canvasContext.fillStyle = 'red'
  canvasContext.fillRect(10, 40, 30, 60)
}
```

### 形变Transform

**Canvas和CSS3一样也是支持变形，形变是一种更强大的方法**，**可以将坐标原点移动到另一点、形变可以对网格进行旋转和缩放**



Canvas的**形变有4种方法**实现：

* **translate(x, y)：用来移动 canvas 的原点到一个不同的位置。**
  * x 是左右偏移量，y 是上下偏移量（无需要单位）
* **rotate(angle)：用于以原点为中心旋转 canvas，即沿着z轴旋转**。在线出来前使用
  * **angle是旋转的弧度**，是顺时针方向，以弧度为单位。
* **scale(x, y)：用来增减图形在 canvas 中像素数目，对图形进行缩小或放大**。
  * **x 为水平缩放因子，y 为垂直缩放因子。如果比 1 小，会缩小图形，如果比 1 大会放大图形。默认值为 1，也支持负数**。
* transform(a, b, c, d, e, f)： 允许对变形矩阵直接修改。这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵。



注意绘图顺序事项：**1. 先save保存状态  2. 形变  3. 再绘制图形**  **4. restore恢复状态**

* 在做**变形之前先调用 save 方法保存状态**是一个良好的习惯，**大多数情况下，调用 restore 方法比手动恢复原先的状态要简单得多**。
* **形变需要在绘制图形前调用。**

### 形变四部曲

**1. 先save保存形变前的状态  2. 形变  3. 绘制图形**  **4. restore恢复状态**

![pCifC1s.png](https://s1.ax1x.com/2023/06/07/pCifC1s.png)

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  // 对象方式打印节点
  // console.log('%O', canvasEl)
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')

  // 1.save形变的状态
  canvasContext.save()
  // 2.形变translate坐标原点为100， 100
  canvasContext.translate(100, 100)
  // 形变rotate图形45度(π / 4)
  canvasContext.rotate(Math.PI / 4)
  // 形变scale图形大小扩大两倍
  canvasContext.scale(2, 2)
  // 3.绘制
  canvasContext.fillRect(0, 0, 50, 50)
  // 4.restore恢复原状态
  canvasContext.restore()

  // 形变四部曲
  canvasContext.save()
  canvasContext.translate(20, 20) // translate坐标原点为20, 20
  canvasContext.strokeRect(0, 0, 80, 80)
  canvasContext.restore()
}
```

### canvas动画

为了**实现动画**，我们需要**对画布上所有图形进行一帧一帧的重绘**（比如在1秒绘60帧就可绘出流畅的动画了）,

需要一些可以定时执行重绘的方法。然而在Canvas中有三种方法可以实现：

* 分别为 **setInterval 、 setTimeout 和 requestAnimationFrame(推荐)** 三种方法来定期执行指定函数进行重绘



Canvas **画出一帧动画的基本步骤（如要画出流畅动画，1s 需绘60帧）**：

* 第一步：**用 clearRect 方法清空 canvas** ，除非接下来要画的内容会完全充满 canvas（例如背景图），否则你需要清空所有。

形变四部曲：**保存，形变，绘画，恢复**

* 第二步：保存 canvas 状态，如果加了 canvas 状态的设置（样式，变形之类的），又想在每画一帧之时都是原始状态的话。你需要先保存一下，后面再恢复原始状态。
* 第三步：绘制动画图形（animated shapes） ，即绘制动画中的一帧。
* 第四步：恢复 canvas 状态，如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。



setInterval 定时器的缺陷

* **setInterval 定时器不是非常精准的，因为setInterval 的回调函数是放到了宏任务中等待执行**。
* 如果**微任务中一直有未处理完成的任务，那么setInterval 的回调函数就有可能不会在指定时间内触发回调**。
* 如果想要更加平稳和更加精准的定时执行某个任务的话，可以使用requestAnimationFrame函数



#### requestAnimationFrame

获取requestAnimationFrame一秒的调用次数（60？实际测试一秒166次/帧，多少帧不重要，不一定非要60）

```js
requestAnimationFrame(draw)

// 测试一秒requestAnimationFrame会调用几次
const startTime = new Date().getTime()
function draw() {
  const endTime = new Date().getTime()
  if(endTime - startTime >= 1000) return
  console.log('draw被调用')
  requestAnimationFrame(draw)
}
```

实现秒针案例

![pCf2VsK.png](https://s1.ax1x.com/2023/07/12/pCf2VsK.png)

```js
// 需要在页面加载完成后获取节点
window.onload = function() {
  const canvasEl = document.getElementById('canvas')
  // 对象方式打印节点
  // console.log('%O', canvasEl)
  if(!canvasEl.getContext) return
  // canvasRenderingContext2D
  const canvasContext = canvasEl.getContext('2d')

  requestAnimationFrame(draw)

  function draw() {
    const time = new Date()
    const second = time.getSeconds()
    const millSecond = time.getMilliseconds()
    // 清除画布
    canvasContext.clearRect(0, 0, 300, 300)
    // 四部曲
    canvasContext.save()

    canvasContext.translate(100, 100)
    // 旋转秒对应的弧度加上毫秒对应的弧度
    canvasContext.rotate(Math.PI * 2 / 60 * second + Math.PI * 2 / 60 / 1000 * millSecond)

    canvasContext.beginPath()
    canvasContext.strokeStyle = 'red'
    canvasContext.lineWidth = 4
    canvasContext.lineCap = 'round'
    canvasContext.moveTo(0, 0)
    canvasContext.lineTo(0, -80)
    canvasContext.stroke()

    canvasContext.restore()

    requestAnimationFrame(draw)
  }
}
```

### 太阳系案例

![pCfgL2q.png](https://s1.ax1x.com/2023/07/12/pCfgL2q.png)

```js
window.onload = function () {
  const canvasEl = document.getElementById('canvas')
  if (!canvasEl.getContext) return
  const ctx = canvasEl.getContext('2d')

  let sun = new Image()
  sun.src = '../../images/canvas_sun.png'
  let earth = new Image()
  earth.src = '../../images/canvas_earth.png'
  let moon = new Image()
  moon.src = '../../images/canvas_moon.png'

  ctx.translate(0, 0)
  requestAnimationFrame(draw)

  function draw() {
    const time = new Date()
    const second = time.getSeconds()
    const milliSecond = time.getMilliseconds()
    // 清除画布
    ctx.clearRect(0, 0, 300, 300)
    // 四部曲
    ctx.save()

    // 背景和地球路径绘制
    ctx.save() // bg start
    ctx.drawImage(sun, 0, 0) // 背景图
    ctx.restore() // bg end

    // 地球展示
    ctx.save() // earth start
    ctx.translate(150, 150) // 太阳坐标系
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(0, 255, 268, 0.2)'
    ctx.arc(0, 0, 105, 0, Math.PI * 2)
    ctx.stroke()
    // 地球旋转 60s一圈
    ctx.rotate(Math.PI * 2 / 60 * second + Math.PI * 2 / 60 / 1000 * milliSecond)
    ctx.translate(105, 0) // 太阳坐标系
    ctx.drawImage(earth, -12, -12)

    // 月球展示
    ctx.save() // moon start
    // 月球旋转 10s一圈
    ctx.rotate(Math.PI * 2 / 10 * second + Math.PI * 2 / 10 / 1000 * milliSecond)
    ctx.translate(28, 0) // 月球坐标系
    ctx.drawImage(moon, -3.5, -3.5)
    ctx.restore() // moon end

    ctx.restore() // earth end

    ctx.restore()
    requestAnimationFrame(draw)
  }
}
```

### 时钟案例

求圆上x, y的坐标：

![pCFDygf.png](https://s1.ax1x.com/2023/06/07/pCFDygf.png)

* 圆上x, y轴坐标实际上就是右图的 ( AB, BC )，AC为时钟半径
* x= AB = cosa * AC => x = Math.cos(弧度) * R
* y= BC = sina * AC => y = Math.sin(弧度) * R

**数字刻度细节**

![pCFDfEj.png](https://s1.ax1x.com/2023/06/07/pCFDfEj.png)

![pCfgxqU.png](https://s1.ax1x.com/2023/07/12/pCfgxqU.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url('../../images/grid.png');
    }

    canvas {
      background-color: rgba(255, 0, 0, 0.1);
    }

    .container {
      margin: 10px;
      width: 300px;
      height: 300px;
      border-radius: 50px;
      background-color: black !important;
    }
  </style>
</head>

<body>
  <div class="container">
    <canvas id="canvas" width="300" height="300">您的浏览器不支持canvas，请升级浏览器</canvas>
  </div>

  <script>
    window.onload = function () {
      const canvasEl = document.getElementById('canvas')
      if (!canvasEl.getContext) return
      const ctx = canvasEl.getContext('2d')

      ctx.translate(0, 0)
      requestAnimationFrame(draw)

      function draw() {
        const time = new Date()
        const hour = time.getHours()
        const minute = time.getMinutes()
        const second = time.getSeconds()
        // 清除画布
        ctx.clearRect(0, 0, 300, 300)
        ctx.save()
        // 1.绘制圆盘
        paintPan()
        // 2.绘制圆盘内数字
        drawNumber()
        // 3. 绘制时针
        drawHourNeedle(hour, minute, second)
        // 4. 绘制分针
        drawMinuteNeedle(minute, second)
        // 5. 绘制秒针
        drawSecondNeedle(second)
        // 6.绘制刻度
        drawScale()
        ctx.restore()
        requestAnimationFrame(draw)

        function paintPan() {
          ctx.save() // 圆盘start
          ctx.fillStyle = '#fff'
          ctx.translate(150, 150)
          ctx.beginPath()
          ctx.arc(0, 0, 130, 0, Math.PI * 2)
          ctx.fill()

          // 中心点
          ctx.save()
          ctx.fillStyle = 'red'
          ctx.beginPath()
          ctx.arc(0, 0, 4, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          ctx.restore() // 圆盘end
        }

        function drawNumber() {
          ctx.save()
          ctx.translate(150, 150)

          ctx.font = '30px fangsong'
          ctx.textBaseline = 'middle'
          ctx.textAlign = 'center'

          ctx.fillText(3, 100, 0)
          // 根据弧度和数字数组获取相应的位置
          const nums = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]

          for (let i = 0; i < nums.length; i++) {
            // 3对应的弧度：Math.PI * 2 / 12 * 0
            // 4对应的弧度：Math.PI * 2 / 12 * 1
            // nums[i]对应的弧度：Math.PI * 2 / 12 * i 
            // nums[i]对应的x坐标为Math.cos(Math.PI / 6 * i) * R
            const xAxis = Math.cos(Math.PI / 6 * i) * 100
            const yAxis = Math.sin(Math.PI / 6 * i) * 100
            ctx.fillText(nums[i], xAxis, yAxis)
          }
          ctx.restore()
        }

        function drawHourNeedle(hour, minute, second) {
          ctx.save()
          ctx.translate(150, 150)
          // 旋转
          // Math.PI * 2 / 12   1小时
          // Math.PI * 2 / 12 / 60   1分钟
          // Math.PI * 2 / 12 / 60 / 60   1秒
          ctx.rotate(
            Math.PI * 2 / 12 * hour +
            Math.PI * 2 / 12 / 60 * minute +
            Math.PI * 2 / 12 / 60 / 60 * second
          )
          ctx.beginPath()
          ctx.lineWidth = 6
          ctx.lineCap = 'round'
          ctx.moveTo(0, 0)
          ctx.lineTo(0, -60)
          ctx.stroke()
          ctx.restore()
        }

        function drawMinuteNeedle(minute, second) {
          ctx.save()
          ctx.translate(150, 150)
          // 旋转
          // Math.PI * 2 / 60   1分钟
          // Math.PI * 2 / 60 / 60   1秒
          ctx.rotate(
            Math.PI * 2 / 60 * minute +
            Math.PI * 2 / 60 / 60 * second
          )
          ctx.beginPath()
          ctx.lineWidth = 4
          ctx.lineCap = 'round'
          ctx.moveTo(0, 0)
          ctx.lineTo(0, -75)
          ctx.stroke()
          ctx.restore()
        }

        function drawSecondNeedle(second) {
          ctx.save()
          ctx.translate(150, 150)
          // 旋转
          // Math.PI * 2 / 60   1秒
          ctx.rotate(
            Math.PI * 2 / 60 * second
          )
          ctx.beginPath()
          ctx.strokeStyle = 'red'
          ctx.lineWidth = 2
          ctx.lineCap = 'round'
          ctx.moveTo(0, 0)
          ctx.lineTo(0, -90)
          ctx.stroke()
          ctx.restore()
        }

        function drawScale() {
          ctx.save()
          ctx.translate(150, 150)

          // 时刻度
          ctx.lineWidth = 4
          for (let i = 0; i < 12; i++) {
            ctx.rotate(Math.PI * 2 / 12)
            ctx.beginPath()
            ctx.moveTo(0, -130)
            ctx.lineTo(0, -122)
            ctx.stroke()
          }

          // 分刻度
          ctx.lineWidth = 2
          for (let i = 0; i < 60; i++) {
            ctx.rotate(Math.PI * 2 / 60)
            ctx.beginPath()
            ctx.moveTo(0, -130)
            ctx.lineTo(0, -126)
            ctx.stroke()
          }

          ctx.restore()
        }
      }
    }
  </script>
</body>

</html>
```


