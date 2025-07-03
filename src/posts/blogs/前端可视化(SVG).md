---
title: '前端可视化(SVG)'
date: 2023-6-11 23:25:00
permalink: '/posts/blogs/前端可视化(SVG)'
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
 - svg
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---




# SVG

## SVG介绍

* SVG 全称为（Scalable Vector Graphics），即**可缩放矢量图形**。
* SVG 是一种**基于XML格式的矢量图**，主要用于**定义二维图形，支持交互和动画**。
* SVG 规范是**万维网联盟(W3C) 自 1998 年以来开发的标准**。
* SVG 图像可在**不损失质量的情况下按比例缩放，并支持压缩**。
* 基于XML的SVG可轻松的用**文本编辑器或矢量图形编辑器创建和编辑**，并**可以直接在浏览器显示**。SVG

## SVG历史

![pCkA1ot.png](https://s1.ax1x.com/2023/06/08/pCkA1ot.png)

## 优缺点

**优点**

![pCkA0wn.png](https://s1.ax1x.com/2023/06/08/pCkA0wn.png)

**缺点**

![pCkAsYV.png](https://s1.ax1x.com/2023/06/08/pCkAsYV.png)

## 应用场景

* SVG 非常适合显示**矢量徽标（Logo）、图标（ICON）和其他几何设计**。
* SVG 适合应用在需**适配多种尺寸的屏幕上展示，因为SVG的扩展性**更好。
* 当需要**创建简单的动画时，SVG 是一种理想的格式**。
  * **SVG 可以与 JS 交互来制作线条动画**、过渡和其他复杂的动画。
  * **SVG 可以与 CSS 动画(animation)**交互，也可以使用自己内置的 SMIL 动画。
* **SVG 也非常适合制作各种图表（条形图、折线图、饼图、散点图等等）**，以及**大屏可视化页面开发**。

## SVG和Canvas的区别

![pCkVRaR.png](https://s1.ax1x.com/2023/06/08/pCkVRaR.png)

## SVG初体验

**绘制SVG矢量图常用有4种方式**：

 方式一：在一个**单独的svg文件中绘制，svg文件可直接在浏览器预览或嵌入到HTML中使用**（推荐）

 方式二：直接在**HTML文件中使用svg元素来绘制**（推荐）

 方式三：直接使用**JavaScript代码来生成svg矢量图**。

 方式四：使用**AI（Adobe IIIustractor）矢量绘图工具**来绘制矢量图，并导出为svg文件（推荐）

**SVG 初体验**

* 第一步：**新建一个 svg 文件，在文件第一行编写XML文件声明**


* 第二步：**编写 一个`<svg>`元素，并给该元素添加如下属性**：
  * version： 指定使用svg的版本，值为 1.0 和 1.1，并没有 2.0，不写version就是2.0。
  * baseProfile：SVG 2 之前，**version 和 baseProfile 属性用来验证和识别 SVG 版本**。**而SVG2后不推荐使用这两个属性了**。
  * **width / height** ：指定svg画布（视口）的宽和高，默认值分别为300和150，默认使用px单位。
  * **xmlns**：给svg元素帮定一个**命名空间**（http://www.w3.org/2000/svg）意味着这个 `<svg>` 标签和它的子元素都属于该命名空间下。


* 第三步：**在`< svg >`元素中添加 图形（比如：`<rect>`） 元素**
* 第四步：在**浏览器直接预览 或 嵌入到 HTML中预览**（嵌入HTML有6种方案）

**.svg文件**

```html
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- 
  svg 1.1 的语法：

  1)XML声明:（可选） 
    standalone="no"：XML文档会依赖外部标记声明来验证XML的数据是否有效

  2）文档的声明（即外部标记声明）（可选） 
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
      "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

  3）baseProfile="full" 适用pc， tiny适用手机
 -->
<svg
  version="1.1"
  baseProfile="full"
  width="300"
  height="150"
  xmlns="http://www.w3.org/2000/svg"
  style="border:1px solid pink"
>
  <rect x="10" y="10" width="100" height="50"></rect>
</svg>
```

**.svg文件**


```html
<?xml version="1.0" standalone="no" ?>
<!-- 
  svg 2.0 语法 
  1) version 已被删除，写了1.1对SVG2.0渲染和处理没有任何影响
-->
<svg
  width="300"
  height="150"
  xmlns="http://www.w3.org/2000/svg"
  style="border:1px solid pink"
>
  <rect x="10" y="10" width="100" height="50"></rect>
</svg>
```

**.html文件使用svg**


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 
      当在HTML语法中使用svg时，命名空间由HTML解析器自动提供, 不需要手动添加。
     -->
    <svg style="border: 1px solid red">
      <rect x="10" y="10" width="100" height="100"></rect>
    </svg>
  </body>
</html>

```

**.html文件中使用js创建svg**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <svg style="border: 1px solid red" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="100"></rect>
    </svg>

    <script>
      // 1.规定命名空间
      let xmlns = "http://www.w3.org/2000/svg";
      let boxWidth = 300;
      let boxHeight = 150;

      // 2.创建SVG元素
      let svgEl = document.createElementNS(xmlns, "svg");
      let rectEl = document.createElementNS(xmlns, "rect");

      // 3.给SVG元素添加属性
      svgEl.setAttributeNS(null, "version", "1.1");
      svgEl.setAttributeNS(null, "width", boxWidth);
      svgEl.setAttributeNS(null, "height", boxHeight);
      svgEl.style.border = "1px solid green";

      rectEl.setAttributeNS(null, "width", 100);
      rectEl.setAttributeNS(null, "height", 40);

      // 4.把SVG元素插入到DOM中
      svgEl.appendChild(rectEl);
      document.body.appendChild(svgEl);
    </script>
  </body>
</html>

```

### XML和DTD声明

![pCkO1bD.png](https://s1.ax1x.com/2023/06/08/pCkO1bD.png)

## svg使用

### img的src

不支持交互

```html
<img src="./rect.svg" alt="" />
```

### background-image: url()

不支持交互

```html
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Document</title>
<style>
  .box {
    width: 300px;
    height: 150px;
    background-image: url(./rect.svg);
    background-repeat: no-repeat;
  }
</style>
</head>
<body>
  <div class="box"></div>
</body>
```

### .html文件直接引入<svg></svg>

作为HTML 的DOM元素，支持交互，只兼容ie9以上

```html
<body>
  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="100"></rect>
  </svg>
</body>
```

### 其它使用方式

方式四：**object元素（了解）**。

* 支持交互式 svg，能拿到object的引用，为 SVG 设置动画、更改其样式表等

方式五：**iframe元素（了解）** 。

* 支持交互式 svg，能拿到iframe的引用，为 SVG 设置动画、更改其样式表等

方式六：**embed元素（了解）** 。

* 支持交互式 svg，能拿到embed的引用，为 SVG 设置动画、更改其样式表等，对旧版浏览器有更好的支持。

![pCkjAh9.png](https://s1.ax1x.com/2023/06/08/pCkjAh9.png)

## SVG Grid和坐标系

SVG 使用的坐标系统（网格系统）和 Canvas的差不多。**坐标系是 以左上角为 (0,0) 坐标原点**，坐标以像素为单位，x 轴正方向是向右，y 轴正方向是向下。

* `<svg>`元素和其它元素一样也是有**一个坐标空间的，其原点位于元素的左上角，被称为初始视口坐标系**
* `<svg>`的 **transform 属性可以用来移动、旋转、缩放SVG中的某个元素**，**如`<svg>`中某个元素用了变形，该元素内部会建立一个新的坐标系统**，**该元素默认后续所有变化都是基于新创建的坐标系统**。

![pCkj7g1.png](https://s1.ax1x.com/2023/06/08/pCkj7g1.png)

  ```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1); // 粉色透明背景
    }
  </style>
</head>
<body>
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" > // xmlns命名空间可省略不写，自动指向http://www.w3.org/2000/svg
    <rect x="10" y="10" width="100" height="100"></rect>
  </svg>
</body>
</html>
  ```

### 坐标系单位(视口坐标系和用户坐标系)

**SVG坐标系统，在没有明确指定单位时，默认以像素为单位**

![pCASsaT.png](https://s1.ax1x.com/2023/06/08/pCASsaT.png)

![pCASciF.png](https://s1.ax1x.com/2023/06/08/pCASciF.png)

### 视口viewport和视图框viewBox

**视口（viewport）**

* 视口是 **SVG 可见的区域**（也可以说是SVG画布大小）。可以将视口视为**可看到特定场景的窗口**。
* 可以使用`<svg>`元素的**width和height属性指定视口的大小**。
* 一旦设置了最外层 SVG 元素的宽度和高度，浏览器就会建立**初始视口坐标系**和**初始用户坐标系(一开始情况下，初始视口坐标系和初始用户坐标系是等同的)**。

**视口坐标系**

* 视口坐标系是在视口上建立的坐标系，原点在视口左上角的点(0, 0)，x轴正向向右，y轴正向下。
* 初始视口坐标系中的一个单位等于视口中的一个像素，该坐标系类似于 HTML 元素的坐标系。

**视图框（viewBox）**

* **viewport是 SVG 画布的大小，而 viewBox 是用来定义用户坐标系中的位置和尺寸 （该区域通常会被缩放填充视口）**。


* viewBox 也可理解为是用来指定用户坐标系大小。因为SVG的图形都是绘制到该区域中。用户坐标系可以比视口坐标系更小或更大，也可以在视口内完全或部分可见。

* 一旦创建了视口坐标系（`<svg>`使用width和height），浏览器就会创建一个与其相同的默认用户坐标

viewBox = `<min-x> <min-y> <width> <height>`，比如：**viewBox =' 50 50 100 100' 展示的区域为viewBox未缩放前(50, 50)到(100, 100)区域的图案**

  ✓ `<min-x>`和`<min-y>` 确定视图框的左上角坐标（不是修改用户坐标系的原点，绘图还是从原来的 0, 0 开始）

  ✓ `<width>` `<height>`确定该视图框的宽度和高度。

  ➢ 宽度和高度不必与父`<svg>`元素上设置的宽度和高度相同。

  ➢ 宽度和高度负值无效，为 0 是禁用元素的显示。

**用户坐标系**（ 也称为当前坐标系或正在使用的用户空间，后面绘图都是参照该坐标系 ）

* 用户坐标系是建立在 SVG 视口上的坐标系。该坐标系最初与视口坐标系相同——它的原点位于视口的左上角。
* 使用viewBox属性，可以修改初始用户坐标系，使其不再与视口坐标系相同。





**viewport和viewBox有相同的宽高比**

**viewBox会等比例缩放到viewport的大小**，**相应的viewBox内的图形也会跟随viewBox的大小进行相应的缩放**

![pCApzc9.png](https://s1.ax1x.com/2023/06/08/pCApzc9.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

 
  <!-- 展示区域为未扩大前的(50, 50)到(100, 100)区域 viewBox展示了扩大四倍 -->
  <svg width="400" height="400" viewBox="50 50 100 100" >
    <circle cx="50" cy="50" r="50"></circle>
  </svg>

</body>
</html>
```

![pCA9vUf.png](https://s1.ax1x.com/2023/06/08/pCA9vUf.png)

**viewport和viewBox有不同的宽高比**

preserveAspectRatio：none 表示强制拉伸viewBox至viewport一致

preserveAspectRatio：xMinYMin表示viewBox等比例拉伸后，靠左上角显示

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>

<body>

  <!-- 1.默认情况下viewBox等比例拉伸到最大后，然后在viewport里居中 -->
  <!-- <svg width="400" height="400" viewBox="0 0 200 100"> -->
  <!-- 2.preserveAspectRatio: none表示强制拉伸viewBox至viewport一致 -->
  <!-- <svg width="400" height="400" viewBox="0 0 200 100" preserveAspectRatio="none"> -->
  <!-- 3.preserveAspectRatio: xMinYMin表示viewBox等比例拉伸后，靠左上角显示 -->
  <svg width="400" height="400" viewBox="0 0 200 100" preserveAspectRatio="xMinYMin">
    <circle cx="50" cy="50" r="50"></circle>
  </svg>

</body>

</html>
```

## svg绘制图形

### 绘制矩形(rect)

![pCAPeeI.png](https://s1.ax1x.com/2023/06/08/pCAPeeI.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>
</head>

<body>
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">

    <rect x="0" y="0" width="100" height="50"></rect>
    <!-- rx：x方向上的圆角 ry：y方向上的圆角 -->
    <rect x="100" y="100" width="100" height="50" rx="20" ry="20"></rect>
  </svg>
</body>

</html>
```

### 绘制圆(circle)

![pCAZhVJ.png](https://s1.ax1x.com/2023/06/08/pCAZhVJ.png)

`<circle>`元素3 个基本属性

* r ：圆的半径
* cx ：圆心的 x轴位置
* cy ：圆心的 y轴位置
* fill: 圆的填充色


### 绘制椭圆(ellipse)

![pCAZ55R.png](https://s1.ax1x.com/2023/06/08/pCAZ55R.png)

`<ellipse>`元素4 个基本属性

 rx :椭圆的 x轴半径

 ry :椭圆的 y轴半径

 cx :椭圆中心的 x轴位置

 cy :椭圆中心的 y轴位置

### 绘制线条直线(line)

![pCAZoP1.png](https://s1.ax1x.com/2023/06/08/pCAZoP1.png)

`<line>`元素4 个基本属性

* x1 :起点的 x 轴位置

* y1 :起点的 y轴位置

* x2 :终点的 x轴位置

* y2 :终点的 y轴位置


* stroke:描边色


* stroke-width:描边宽度


### 绘制折线(polyline)

![pCAZT8x.png](https://s1.ax1x.com/2023/06/08/pCAZT8x.png)

`<polyline>`元素1 个基本属性

* points : 点集数列。每个数字用空白、逗号、终止命令符或者换行符分隔开（成对的数字就行）。
  * 每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。
  * 所以点列表 (0,0), (1,1) 和 (2,2) 可以写成这样：“0 0, 1 1, 2 2”。
  * 支持格式： “0 0, 1 1, 2 2”或 “0 ，0 , 1， 1, 2， 2”或 “0 0 1 1 2 2”
* fill : 颜色或'transparent'透明不填充(默认是填充的)
* stroke: 颜色或'transparent'(默认是填充的)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }
    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    
    <!-- 第1种写法 -->
    <!-- <polyline points="20 0, 80 50, 20, 100"></polyline> -->
    <polyline points="20 0, 80 50, 20, 100" fill="transparent" stroke="red"></polyline>

    <!-- 第2种写法 -->
    <!-- <polyline points="20 0 80 50 20 100"></polyline> -->

    <!-- 第3种写法 -->
    <!-- <polyline points="20 ,0 ,80 ,50 ,20, 100"></polyline> -->

  </svg>

</body>
</html>
```



### 绘制多边形(polygon)

**会自动闭合的折线**

![pCAZqKO.png](https://s1.ax1x.com/2023/06/08/pCAZqKO.png)

`<polygon>`元素1 个基本属性

- points : 点集数列。每个数字用空白、逗号、终止命令符或者换行符分隔开（成对的数字就行）。
  - 每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。
  - 所以点列表 (0,0), (1,1) 和 (2,2) 可以写成这样：“0 0, 1 1, 2 2”。
  - 支持格式： “0 0, 1 1, 2 2”或 “0 ，0 , 1， 1, 2， 2”或 “0 0 1 1 2 2”
- fill : 颜色或'transparent'透明不填充(默认是填充的)
- stroke: 颜色或'transparent'(默认是填充的)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }
    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <polygon points="20 0, 80 50, 20 100" fill="transparent" stroke="red"></polygon>
  </svg>
</body>
</html>
```

### 绘制路径(path)

`<path>`元素可能是 **SVG 中最常见的形状**。你可以**用 < path >元素绘制矩形（直角矩形或圆角矩形）、圆形、椭圆、折线形、多边形，以及一些其他的形状，例如贝塞尔曲线、2 次曲线等曲线**。

`<path>`元素1 个基本属性

* d :一个点集数列，以及其它关于如何绘制路径的信息，必须M命令开头。
* 所以点列表 (0,0), (1,1) 和 (2,2) 推荐写成这样：“M 0 0, 1 1, 2 2”。
  * 支持格式： “M 0 0, 1 1, 2 2”或 “M0 0, 1 1, 2 2” 或 “M 0 ，0 , 1， 1, 2， 2”或 “M 0 0 1 1 2 2”
* `<path>` 元素的形状是**通过属性d定义的，属性d的值是一个 “命令 + 参数 ”的序列**。
* 每一个命令都有两种表示方式，**一种是用大写字母，表示采用绝对定位**。**另一种是用小写字母，表示采用相对定位（例如：从上一个点开始，向上移动 10px，向左移动 7px）**。

![pCAnJ81.png](https://s1.ax1x.com/2023/06/08/pCAnJ81.png)

![pCAmzgP.png](https://s1.ax1x.com/2023/06/08/pCAmzgP.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }
    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
  
    <!-- 1.使用path 绘制一个三角形 -->
    <!-- <path d="M 20 0, 80 50, 20 100" fill="transparent" stroke="red"></path> -->


    <!-- 1.使用path 绘制一个闭合的三角形 -->
    <!-- <path d="M 20 0, 80 50, 20 100 Z" fill="transparent" stroke="red"></path> -->


    
    <!-- 1.使用 path 绘图的命令:
      M  moveTo 必写以M开头
      Z  close path 可选
      L  lineTo 可省略
    -->
    <path d="M 20 0,L 80 50,L 20 100 Z" fill="transparent" stroke="red"></path>
    <!-- 小写的l表示相对于上一个坐标点位置的坐标位置 -->
    <path d="M 20 100,L 80 150,l 20 50 Z" fill="transparent" stroke="red"></path>

  </svg>

</body>
</html>
```

### 绘制图片(image)

* image 元素没设置 x , y 值，它们自动被设置为 0。


* image 元素没设置 height 、width 时，默认为图片大小。


* width 、height 等于 0，将不会呈现这个图像。


* 需在 href 属性上引用外部的图像，不是src属性。


* 注意svg1.x版本的写法，或两钟版本都写

![pCAuQQP.png](https://s1.ax1x.com/2023/06/08/pCAuQQP.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>
  <!-- svg 2.0版本的语法 -->
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <image 
     x="0"
     y="0"
     href="../images/googlelogo_color_92x30dp.png"
     width="100"
     height="100"
    >
    </image>
  </svg>

     <!-- svg 2.0 + 1.0 版本的语法( 为了兼容以前的浏览器的写法 ) -->
  <svg 
    version="1.0"
    baseProfile="full"
    width="300" height="300" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <image 
      x="0"
      y="0"
      xlink:href="../images/googlelogo_color_92x30dp.png"
      href="../images/googlelogo_color_92x30dp.png"
      width="100"
      height="100"
    >
    </image>
  </svg>
</body>
</html>
```

### 绘制文字(text)

`<text>`元素的基本属性

* x 和 y 属性决定了文本在用户坐标系中显示的位置。
* text-anchor 文本流方向属性，可以有 start、middle、end 或 inherit 值，默认值 start
* dominant-baseline 基线对齐属性 : 有 auto 、middle 或 hanging 值, 默认值：auto

![pCAaZGV.png](https://s1.ax1x.com/2023/06/09/pCAaZGV.png)

`<tspan>` 元素用来标记大块文本的子部分，它必须是一个text元素或别的tspan元素的子元素。

* x 和 y 属性决定了文本在视口坐标系中显示的位置。
* alignment-baseline 基线对齐属性：auto 、baseline、middle、hanging、top、bottom ... ,默认是 auto

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }

    /* text{
      fill: red;
    } */
  </style>

</head>

<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">

    <!-- 1.在svg中绘制一个文字 -->
    <!-- <text x="100" y="100" font-size="50" fill="red">Ay</text> -->

    <!-- 2.文本的对齐方式 -->
    <!-- <text x="100" y="100" text-anchor="middle"  font-size="50" fill="red">Ay</text> -->

    <!-- 3.基线对齐方式 :
      有 auto 、middle 或 hanging 值, 默认值：auto
    -->
    <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" font-size="30" fill="red">Ay</text>
    <text x="100" y="200" dominant-baseline="middle" font-size="30" fill="red">
      哈哈哈
      <!-- 默认情况下tspan自动跟随在text哈哈哈后面 -->
      <tspan >￥123</tspan>
      <!-- tspan里的x,y坐标是相对于视口坐标系的位置进行调整的， -->
      <tspan x="0" y="0" alignment-baseline="hanging" fill="black">￥123</tspan>
    </text>

  </svg>

</body>

</html>
```

### 元素的组合(g)

`<g>`元素是用来组合元素的容器。

- 添加到g元素上的**变换会应用****到其所有的子元素**上。
- 添加到g元素的**属性大部分会被其所有的子元素继承**。
- g元素也可以用来定义复杂的对象，之后可以通过`<use>`元素来引用它们

![pCAd1Og.png](https://s1.ax1x.com/2023/06/09/pCAd1Og.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >

    <!-- <circle cx="50" cy="50" r="25" fill="transparent" stroke="red"></circle>
    <circle cx="80" cy="50" r="25" fill="transparent" stroke="red"></circle>
    <circle cx="110" cy="50" r="25" fill="transparent" stroke="red"></circle>
    <circle cx="140" cy="50" r="25" fill="transparent" stroke="red"></circle> -->

    <!-- 
      g 元素没有专有的属性,只有全局的属性
      全局属性:id  class  style fill stroke onclick
     -->
    <!-- 属性继承 -->
    <g fill="transparent" stroke="red">
      <circle cx="50" cy="50" r="25"></circle>
      <circle cx="80" cy="50" r="25"></circle>
      <circle cx="110" cy="50" r="25"></circle>
      <circle cx="140" cy="50" r="25"></circle>  
    </g>

  </svg>

</body>
</html>
```

### 图形的定义与复用(defs和use)

SVG 是允许我们定义一些可复用元素的。

* 即把可复用的元素定义在< defs >元素里面，然后通过`<use>`元素来引用和显示。
* 这样可以增加 SVG 内容的易读性、复用性和利于无障碍开发。

< defs >元素，定义可复用元素。

* **例如：定义基本图形、组合图形、渐变、滤镜、样式等等。**
* **在`< defs >`元素中定义的图形元素是不会直接显示的。**
* 可在**视口任意地方用`<use>`来呈现在defs中定义的元**素。
* `<defs>`元素没有专有属性，使用时**通常也不需添加任何属性**。
* defs元素参照的是用户坐标系



`<use>`元素从 SVG 文档中获取节点，并将获取到的节点复制到指定的地方。

`<use>`元素的属性

* **href： 需要复制元素/片段的 URL 或 ID**（支持跨SVG引用）。默认值：无
* xlink:href：（SVG2.0已弃用）需要复制的元素/片段的 URL 或 ID 。默认值：无
* **x / y ：元素的 x / y 坐标（相对复制元素的位置**）。 默认值：0
* **width / height** ：元素的宽和高（**在引入svg或symbol元素才起作用**）。 默认值：0

![pCA0xoj.png](https://s1.ax1x.com/2023/06/09/pCA0xoj.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>

<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 0.样式 -->
      <style>
        rect {
          fill: green;
        }
      </style>
      <!-- 1.定义了一个矩形 -->
      <rect id="rectangle" x="0" y="0" width="100" height="50"></rect>

      <!-- 2.定义了一个组合图形 -->
      <g id="logo" fill="transparent" stroke="red">
        <circle cx="50" cy="50" r="25"></circle>
        <circle cx="80" cy="50" r="25"></circle>
        <circle cx="110" cy="50" r="25"></circle>
        <circle cx="140" cy="50" r="25"></circle>
      </g>
      <!-- 定义渐变 -->
      <!-- 滤镜 -->
    </defs>

    <!-- 在这里进行图形的复用 -->
    <use href="#rectangle"></use>
    <!-- 复用图形的坐标是相对于原来定义图形是的坐标位置 -->
    <use x="100" y="100" href="#rectangle"></use>

    <use href="#logo"></use>
    <use x="100" y="100" href="#logo"></use>
  </svg>


  <!-- 跨svg复用图形 -->
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- use引入的元素宽和高是不生效的，只用use引用的图形是 svg 或 symbol 才会起作用 -->
    <use href="#rectangle" width="200" height="100"></use>
  </svg>
</body>

</html>
```

### 图形元素复用(symbol和use)

< symbol>元素和< defs>元素类似，也是用于**定义可复用元素**，然后通过< use>元素来引用显示。

* 在< symbol>元素中定义的图形元素默认也是不会显示在界面上。一个svg里通常有多个symbol
* < symbol>元素常见的应用场景是用来定义各种小图标，比如：icon、logo、徽章等

< symbol>元素的属性

* viewBox：定义当前 < symbol> 的视图框。
* x / y ：symbol元素的 x / y坐标。 默认值：0

< use>

* width / height：使用symbol元素时的宽高。 默认值：0

![pCAr6Wn.png](https://s1.ax1x.com/2023/06/09/pCAr6Wn.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>


  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <!-- 注意symbol里的viewBox属性，相当于规定了相应的用户坐标系 -->
    <!-- 1.ICON previous-->
    <symbol id="previous" viewBox="0 0 100 100">
      <path fill="currentColor" d="M 80 0,L 20 50, L 80 100 Z"></path>
    </symbol>

    <!-- 2.ICON next -->
    <symbol id="next" viewBox="0 0 100 100">
      <polygon points="20 0, 80 50, 20 100"></polygon>
    </symbol>

    <!-- 复用 -->
    <!-- 用户坐标系的自动填充 use里不使用width和height的symbol会对svg进行自动填充 -->
    <use href="#previous"></use>
    <!-- use symbol的width height限制显示大小 -->
    <use href="#previous" width="100" height="100"></use>
  </svg>


  <!-- 复用 -->
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <!-- 直接在use上指定ICON的 width和 hegiht -->
    <use href="#previous" width="50" height="50"></use>
  </svg>

  <!-- 这个属于缩小 -->
  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" >
    <use href="#previous" ></use>
  </svg>

  <!-- 属于放大 -->
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" >
    <use href="#previous" ></use>
  </svg>
</body>
</html>
```

### symbol实现svg精灵图

[iconfont官网](https://www.iconfont.cn/)

https://www.iconfont.cn/

多个SVG ICON文件-合并成SVG精灵图：https://www.zhangxinxu.com/sp/svgo

[格式化xml](https://c.runoob.com/front-end/710/)

https://c.runoob.com/front-end/710/

![pCAXOPJ.png](https://s1.ax1x.com/2023/06/09/pCAXOPJ.png)

### 填充(fill)

fill 填充属性，专门用来给SVG中的元素填充颜色。

* fill =“color”。支持：颜色名、十六进制值、rgb、 rgba 、 currentColor （继承自身或父亲字体color）。


* fill-opacity = ”number ”， 该属性专门用来控制填充色的不透明，值为 0 到 1。

![pCAjNLV.png](https://s1.ax1x.com/2023/06/09/pCAjNLV.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
      color: green;
    }
  </style>

</head>

<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- <style>
        rect{
          color: red;
        }
      </style> -->
    </defs>

    <!-- 基本的使用 -->
    <!-- <rect x="10" y="10" width="100" height="100" 
     fill="red"
     fill-opacity="0.4"
    ></rect> -->

    <!-- currentColor先从自身找颜色，后再从父级找颜色 -->
    <rect x="10" y="10" width="100" height="100" fill="currentColor"></rect>
  </svg>

</body>

</html>
```

### 描边(stroke)

* **stroke = “color”**： 指定元素边框填充颜色。

* **stroke-opacity = “number”**：控制元素边框填充颜色的透明度。

* **stroke-width = “number”**：指定边框的宽度。注意，边框是以路径为中心线绘制的。

* **stroke-linecap =“butt | square | round”**：控制边框端点的样式。

* **stroke-linejoin = “miter | round | bevel”**:控制两条线段连接处样式

![pCAva6I.png](https://s1.ax1x.com/2023/06/09/pCAva6I.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }
    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    
    <!-- 
      stroke , 而不是 fill
     -->
    <line x1="100" y1="100"  x2="200" y2="100" 
      stroke="red" 
      stroke-width="5"
      stroke-linecap="round"
    >
    </line>

    <polyline points="20 0, 80 50, 20 100" 
      stroke="red" 
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="transparent"
    >
    </polyline>
  </svg>
</body>
</html>
```

### 虚线与偏移量(stroke-dasharray、stroke-dashoffset)

* **stroke-dasharray** =“number [, number , ….]”: **虚线的间隔大小[虚,实,虚,实,虚,实,虚,实...]**，将虚线类型应用在边框上。
  * 该值**必须是用逗号分割的数字组成的数列**，空格会被忽略。



* **stroke-dashoffset：指定在dasharray模式下路径的偏移量（虚线向左上的偏移量）**。
  * 值为number类型，除了可以正值，也可以取负值。
    ![pCESVk8.png](https://s1.ax1x.com/2023/06/09/pCESVk8.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }
    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <!-- stroke , 而不是 fill -->
    <!-- stroke-dasharray虚线的间隔大小[虚,实,虚,实,虚,实,虚,实...] -->
    <!-- stroke-dasharray="10" === stroke-dasharray="[10,10,10,10...]" -->
    <line x1="100" y1="80"  x2="200" y2="80" 
      stroke="red" 
      stroke-width="10"
      stroke-dasharray="10"
    ></line>

    <!-- stroke-dashoffset虚线向左偏移10 -->
    <line x1="100" y1="100"  x2="200" y2="100" 
      stroke="red" 
      stroke-width="10"
      stroke-dasharray="100"
      stroke-dashoffset="10"
    ></line>
  </svg>

</body>
</html>
```

### svg的css样式

![pCESb9g.png](https://s1.ax1x.com/2023/06/09/pCESb9g.png)

**CSS样式优先级别**：**内联的style > defs中的style > 外部 / head内部 > 属性 fill**

## SVG动画

### 渐变色

![pCE1vAf.png](https://s1.ax1x.com/2023/06/09/pCE1vAf.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <!-- 定义可以复用的元素: 样式, 渐变, 图形, 滤镜... -->
    <defs>
      <!-- 默认的渐变色 -->
      <linearGradient id="gradient1">
        <stop offset="0%" stop-color="red"></stop>
        <stop offset="50%" stop-color="green"></stop>
        <stop offset="100%" stop-color="blue"></stop>
      </linearGradient>

      <!-- 这个是制定渐变的方向 x1 y1 x2 y2两个坐标表示渐变方向 -->
      <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="1"  >
        <stop offset="0%" stop-color="red"></stop>
        <stop offset="50%" stop-color="green"></stop>
        <stop offset="100%" stop-color="blue"></stop>
      </linearGradient>

      <!-- 通过形变 渐变色角度旋转(了解) -->
      <linearGradient id="gradient3" gradientTransform="rotate(30)">
        <stop offset="0%" stop-color="red"></stop>
        <stop offset="50%" stop-color="green"></stop>
        <stop offset="100%" stop-color="blue"></stop>
      </linearGradient>

    </defs>

    <rect x="0" y="0" width="100" height="50" fill="url(#gradient1)"></rect>
    <rect x="0" y="100" width="100" height="50" fill="url(#gradient2)"></rect>
    <rect x="0" y="200" width="100" height="50" fill="url(#gradient3)"></rect>
  </svg>

</body>
</html>
```

### 滤镜毛玻璃(filter)

CSS实现毛玻璃backdrop-filter

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
    .box {
      width: 200px;
      height: 200px;
      position: relative;
    }
    .bg-cover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      backdrop-filter: blur(8px);
    }
  </style>
</head>
<body>
  
  <div class="box">
    <img src="../../images/avatar.jpeg" alt="">
    <div class="bg-cover"></div>
  </div>
</body>
</html>
```

CSS实现毛玻璃filter

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
    .box {
      width: 200px;
      height: 200px;
      position: relative;

      overflow: hidden;
    }
    .box img {
      filter: blur(8px);
    }
  </style>
</head>
<body>
  
  <div class="box">
    <img src="../../images/avatar.jpeg" alt="">
  </div>
</body>
</html>
```

canvas滤镜效果

使用SVG的 filter 和 feGaussianBlur 元素（建议少用）

* < filter>：元素作为滤镜操作的容器，该元素定义的滤镜效果需要在SVG元素上的 filter 属性引用。
  * **x ， y, width, height 定义了在画布上应用此过滤器的矩形区域。x， y 默认值为 -10%（相对自身）；width ，height 默认值为 120% （相对自身**） 。
* **< feGaussianBlur >**：该滤镜专门对输入图像进行高斯模糊
  * **stdDeviation** 熟悉指定模糊的程度
* `<feOffset>` ：该滤镜可以对输入图像指定它的偏移量。

![pCE8ZqI.png](https://s1.ax1x.com/2023/06/09/pCE8ZqI.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      /* background-image: url(../images/grid.png); */
    }
    svg{
      /* background-color: rgba(255, 0, 0, 0.1); */
    }
  </style>

</head>
<body>

  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" >
    <defs>
      <!-- 高斯模糊的 效果 -->
      <!-- <filter x='0' y='0' width='100' height='100' id="blurFilter"> -->
      <!-- filter中的x，y,width,height默认是以使用节点的中心为原点的,默认不需要写这四个属性!!! -->
      <filter id="blurFilter">
        <!--  ......  -->
        <feGaussianBlur stdDeviation="8"></feGaussianBlur>
      </filter>
    </defs>
    <image 
      href="../images/avatar.jpeg"
      width="200"
      height="200"
      filter="url(#blurFilter)"
    >
    </image>
  </svg>

</body>
</html>
```

### 形变transform-translate

translate(x, y)函数

* 一个值时，设置x轴上的平移，而第二个值默认赋值为0
* 二个值时，设置x轴和y轴上的平移

平移会修改坐标系，元素内部会建立一个新的坐标系。

![pCEJluj.png](https://s1.ax1x.com/2023/06/09/pCEJluj.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>

<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- 1.平移一个元素 -->
    <!-- <rect x="0" y="0" width="100" height="50"
      transform="translate(200, 200)"
    >
    </rect> -->

    <!-- 2.平移一个元素, 在元素的内部会创建一个新的坐标系统 -->
    <!-- <rect 
      transform="translate(100, 100)"
      x="-10" y="-10" width="100" height="50"
    >
    </rect> -->

    <!-- 2.平移一个元素, 在元素的内部会创建一个新的坐标系统 -->
    <g transform="translate(100, 100)">
      <rect x="10" y="10" width="100" height="50">
      </rect>
    </g>
  </svg>
</body>

</html>
```

### 形变transform-rotate

**rotate(deg, cx, cy)** 函数

* 一个值时，设置**z轴上的旋转的角度**。
* cx，cy表示的是旋转的原点，设置cx，cy相当于设置了新坐标系的原点
* 当translate和rotate一起使用时，使用先后顺序不同，展示的效果也会不同

![pCEJ656.png](https://s1.ax1x.com/2023/06/09/pCEJ656.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>

<body>
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="50" />
    <!-- 1.旋转一个元素 -->
    <rect transform="rotate(45, 50, 25) translate(100, 0)" x="0" y="0" width="100" height="50">
    </rect>
    <!-- 平移和旋转的先后顺序不同，展示的效果也不同 -->
    <rect transform="translate(100, 0) rotate(45, 50, 25)" x="0" y="0" width="100" height="50">
    </rect>
  </svg>
</body>

</html>
```

### 形变transfor-scale

**缩放不仅仅改变元素大小，也会改变坐标系的刻度大小**

scale(x, y)函数

* 二个值时：它需要两个数字，作为比率计算如何缩放。0.5 表示收缩到 50%。
* 一个值时：第二个数字被忽略了，它默认等于第一个值

![pCEYuIx.png](https://s1.ax1x.com/2023/06/09/pCEYuIx.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>

<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- 1.缩放一个元素 -->
    <!-- <rect 
      transform="translate(100, 100) scale(1, 2)"
      x="0" y="0" width="100" height="50"
    ></rect> -->

    <!-- 2.修改缩放的原点 -->
    <rect 
      transform="translate(100, 100) scale(2)" 
      x="-25" y="-25" 
      width="50" height="50"
    ></rect>

    <!-- 3.修改缩放的原点 -->
    <g transform="scale(2)">
      <!-- 缩放改变了坐标系的刻度大小x轴移10，实际20 -->
      <rect
        transform="translate(10, 0)"
        x="0" y="0" width="50" height="50"
      ></rect>
    </g>
  </svg>
</body>

</html>
```

### stroke描边动画效果(利用虚线的移动)

**stroke-dasharray: 140px;**

**stroke-dashoffset: 140px;**

**animation: strokeMove 3s linear forwards;**
![pCfgZNj.png](https://s1.ax1x.com/2023/07/12/pCfgZNj.png)

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
      background-image: url(../../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }

    #movePath {
      /* 虚线 */
      stroke-dasharray: 140px;
      /* 不可见 移动到可见 */
      stroke-dashoffset: 140px;
      animation: strokeMove 3s linear forwards infinite;
    }

    @keyframes strokeMove {
      100% {
        stroke-dashoffset: 0px;
      }
    }
  </style>
</head>
<body>
  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <path id="movePath" d="M 100 60, 200 60, 200 100" stroke="red" stroke-width="6" fill="transparent"></path>
  </svg>
</body>
</html>
```

### 雪糕描边动画案例实现

![pCfg3bF.png](https://s1.ax1x.com/2023/07/12/pCfg3bF.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 0,  1.75 800,  2.5 200 -->
    <style>
      .outline {
        stroke-dasharray: 1020px;
        stroke-dashoffset: 1020px;
        animation: lineShow 2.4s linear forwards;
      }

      .stick {
        stroke-dasharray: 800px;
        stroke-dashoffset: 800px;
        animation: lineShow 3s linear forwards;
      }

      .inside-l, .inside-r {
        stroke-dasharray: 800px;
        stroke-dashoffset: 800px;
        animation: lineShow 4s linear forwards;
      }

      .drop {
        stroke-dasharray: 37px;
        stroke-dashoffset: 37px;
        animation: lineShow 0.6s linear 2.4s forwards;
      }

      @keyframes lineShow {
        100% {
          stroke-dashoffset: 0px;
        }
      }
    </style>
  </head>
  <body>
    <svg
      id="popsicle"
      width="300"
      height="400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 177.3 449.1"
    >
      <g stroke="black" stroke-width="5px">
        <!-- 手柄 -->
        <path
          class="stick"
          d="M408.8,395.9V502.4a18.8,18.8,0,0,1-18.8,18.8h0a18.8,18.8,0,0,1-18.8-18.8V415.3"
          transform="translate(-301.2 -73.5)"
          fill="none"
        />
        <!-- 水滴 -->
        <path
          class="drop"
          d="M359.1,453.5c0,3.1-2.1,5.6-4.7,5.6s-4.7-2.5-4.7-5.6,2.1-8.3,4.7-8.3S359.1,450.4,359.1,453.5Z"
          transform="translate(-301.2 -73.5)"
          fill="none"
        />
        <!-- 外层 -->
        <path
          class="outline"
          d="M389.9,75h0a87.4,87.4,0,0,0-87.2,87.2v218a15.7,15.7,0,0,0,15.7,15.7h12a4.3,4.3,0,0,1,4.1,4.8h0.1v17c0,8.2,9.1,7.9,9.1,0v-6c0-5.2,5.8-5.2,5.8,0v20.5c0,7.7,9.8,7.7,9.8,0V407.2c0-5.2,6.4-5.2,6.4,0v2.7c0,7.7,8.8,7.7,8.8,0v-6c0-6.4,3.9-7.8,6-8.1h80.9a15.7,15.7,0,0,0,15.7-15.7v-218A87.4,87.4,0,0,0,389.9,75Z"
          transform="translate(-301.2 -73.5)"
          fill="none"
        />

        <!-- 里面左边 -->
        <path
          class="inside-l"
          d="M55.5,68h0A20.2,20.2,0,0,1,75.7,88.2V276.9a4.5,4.5,0,0,1-4.5,4.5H39.8a4.5,4.5,0,0,1-4.5-4.5V88.2A20.2,20.2,0,0,1,55.5,68Z"
          fill="none"
        />
        <!-- 里面左边 -->
        <path
          class="inside-r"
          d="M121.8,68h0A20.2,20.2,0,0,1,142,88.2V277a4.4,4.4,0,0,1-4.4,4.4H106.1a4.4,4.4,0,0,1-4.4-4.4V88.2A20.2,20.2,0,0,1,121.8,68Z"
          fill="none"
        />
      </g>
    </svg>

    <script>
      window.onload = function () {
        getPathLength("stick"); // 252px
        getPathLength("drop"); // 36
        getPathLength("outline"); // 1019
        getPathLength("inside-l"); // 486
        getPathLength("inside-r"); // 486
      };

      function getPathLength(className) {
        let stickEl = document.getElementsByClassName(className)[0];
        let stickLength = stickEl.getTotalLength();
        console.log(className + "Length=", stickLength);
      }
    </script>
  </body>
</html>
```

### SVG实现动画的方式总结

* 1**.用JS脚本实现**：可以直接通过 JavaScript 在来给 SVG 创建动画和开发交互式的用户界面。
* 2.**用CSS样式实现**：自 2008 年以来，CSS动画已成为WebKit中的一项功能，使得我们可以通过CSS动画的方式来给文档对象模型(DOM) 中的 SVG 文件编写动态效果。


* 3**.用SMIL实现**：一种基于SMIL语言实现的SVG动画。

![pCEh7oq.png](https://s1.ax1x.com/2023/06/10/pCEh7oq.png)

## SMIL

SVG**用SMIL方式实现动画**，SMIL允许你做下面这些事情：

* 变动一个**元素的数字属性（x、y……**）
* 变动**变形属性（translation 或 rotation）**
* 变动**颜色属性**
* **物件方向与运动路径方向同步等等**



SMIL方式实现动画**的优势**：

* 只需在页面放几个animate元素就可以实现强大的动画效果，**无需任何CSS和JS代码**。
* SMIL支持**声明式动画**。声明式动画不需指定如何做某事的细节，而是指定最终结果应该是什么，将实现细节留给客户端软件
* 在 JavaScript 中，动画通常使用 setTimeout() 或 setInterval() 等方法创建，这些方法需要手动管理动画的时间。而**SMIL 声明式动画可以让浏览器自动处理**，比如：**动画轨迹直接与动画对象相关联、物体和运动路径方向、管理动画时间等等**。
* SMIL 动画还有一个令人愉快的特点是，**动画与对象本身是紧密集成的，对于代码的编写和阅读性都非常好**。

SVG 中支持SMIL动画的元素：

* `<set> <animate>` `<animateTransform>` `<animateMotion><animateColor>`
* 更多：https://www.w3.org/TR/SVG11/animate.html#AnimationElements

![pCE49T1.png](https://s1.ax1x.com/2023/06/10/pCE49T1.png)

### Set动画突变(理解)

总结：set为元素状态的突变

`< set>`元素提供了一种简单的方法，可以在指定的时间内设置属性的值。

* set元素是最简单的 SVG 动画元素。它是在经过特定时间间隔后，将属性设置为某个值（不是过度动画效果）。因此，**图像不是连续动画，而是改变一次属性值**。
* 它**支持所有属性类型**，包括那些无法合理插值的属性类型，例如：字符串 和 布尔值。而对于可以合理插值的属性通常首选`<animate>`元素

`< set>`元素常用属性：

* **attributeName**：指示将在**动画期间更改的目标元素的 CSS 属性（ property ）或属性（ attribute ）的名称**。


* **attributeType: (已过期**，不推荐)指定定义目标属性的类型（值为：CSS | XML | auto）。
* **to** : 定义在特定时间**设置目标属性的值**。该值必须与目标属性的要求相匹配。 值类型：< anything>；默认值：无
* **begin：定义何时开始动画或何时丢弃元素**，默认是 0s ( begin支持多种类型的值 )，**也可以是某个事件发生的时间点**。

![pCE4WA1.png](https://s1.ax1x.com/2023/06/10/pCE4WA1.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>

<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="50" fill="red">
      <!-- 矩形延时3s后跳到右边x=200 -->
      <set
        attributeName='x'
        to="200"
        begin="3s"
      ></set>
    </rect>
  </svg>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect id="rectangle" x="0" y="0" width="100" height="50" fill="green">
      <!-- 矩形点击后跳到右边x=200 -->
      <set
        attributeName='x'
        to="200"
        begin="rectangle.click"
      ></set>
    </rect>
  </svg>
</body>
</html>
```

### Animate动画过渡(掌握)

< animate>元素给某个属性创建过度动画效果。需将animate元素嵌套在要应用动画的元素内。

< animate>元素常用属性：

* **attributeName**：指将在动画期间更改目标元素的 property （CSS 属）或 attribute的名称。
* 动画值属性：

  * **from**：在动画期间将被修改的属性的初始值。没有默认值。

  * **to** :在动画期间将被修改的属性的最终值。没有默认值。

  * **values**：该属性具有不同的含义，具体取决于使用它的上下文（没有默认值） 。
    * 它定义了在动画过度中使用的一系列值，值需要用分号隔开，比如：values=“2; 3; 4; 5”。**values会对时间段进行均分** 为了实现平滑效果，**values首尾值尽量保持一致**
    * 当**values属性定义时，from、to会被忽略**。
* 动画时间属性：
  * **begin**：定义**何时开始动画或何时丢弃元素**。默认是 0s ，**也可以是某个事件发生的时间点**。

  * **dur：动画的持续时间**，该值必须，并要求大于 0。单位可以用小时 ( h)、分钟 ( m)、秒 ( s) 或毫秒 ( ms) 表示。

  * **fill：定义动画的最终状态**。 **freeze**（保持最后一个动画帧的状态） | **remove**（保持第一个动画帧的状态）

  * **repeatCount**：指示动画将发生的次数：**< number> | indefinite**。没有默认值。

![pCf6rQK.png](https://s1.ax1x.com/2023/07/12/pCf6rQK.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" >
    <rect x="0" y="0" width="100" height="50" fill="red">
      <!-- 
        1.animate 元素的基本使用
       -->
      <!-- <animate
        attributeName="x"
        form="0"
        to="200"
        dur="3s"
        begin="2s"
        fill="freeze"
      > -->
      <!-- 
        2.animate 元素的基本使用(3个属性时必须的)
       -->
      <animate
        attributeName="x"
        to="200"
        dur="3s"
      ></animate> 
    </rect>
  </svg>

  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" >
    <rect x="0" y="0" width="100" height="50" fill="green">
      <!-- values存在时from to不会生效,values会对时间段进行均分 -->
      <animate
        attributeName="x"
        values="0; 170; 200"
        dur="3s"
        repeatCount="indefinite"
      >
      </animate>

      <!-- 一个svg重使用多个animate动画结合进行展示 -->
      <animate
        attributeName="fill"
        values="red;green"
        dur="3s"
        repeatCount="indefinite"
      >
      </animate>
    </rect>

  </svg>

  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" >
    <rect x="0" y="0" width="100" height="50" fill="pink">
      <animate
        id="oneAnimate"
        attributeName="x"
        values="0;200"
        dur="3s"
        fill="freeze"
      >
      </animate>

      <!-- id指定某个动画结束后执行下一个动画 -->
      <animate
        attributeName="y"
        values="0;100"
        dur="3s"
        fill="freeze"
        begin="oneAnimate.end"
      >
      </animate>
    </rect>
  </svg>
</body>
</html>
```

### animateTransform(掌握形变的过渡)

< animateTransform >元素常用属性：

* **attributeName**：指示将在动画期间更改的目标元素的 CSS 属性（ property ）或属性（ attribute ）的名称。

* **type** ：一个指定类型的属性，在不同的使用场景下，有不同的意思：

  * 在< animateTransform>元素，只支持 **translate(x, y) | rotate(deg, cx, cy) | scale(x, y) | skewX(x) | skewY(y)** 。

  ![pCELHu6.png](https://s1.ax1x.com/2023/06/10/pCELHu6.png)

  * 在 HTML 中的 < style > 和 < script > 元素，它定义了元素内容的类型。

* 动画值属性：from、to 、values

* 动画时间属性：begin、dur、fill、repeatCount

![pCf6IQf.png](https://s1.ax1x.com/2023/07/12/pCf6IQf.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <!-- 以下所有的from to都可以用values来表示出来,以;分隔即可 -->
  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" >
    <rect x="0" y="0" width="100" height="50" fill="red">
      <animateTransform
        attributeName="transform"
        type="translate"
        from="0, 0"
        to="200, 0"
        dur="2s"
        begin="1s"
        repeatCount="indefinite"
      >
      </animateTransform>
    </rect>
  </svg>

  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" >
    <rect x="0" y="0" width="50" height="50" fill="red">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="20s"
        begin="1s"
        repeatCount="indefinite"
      >
      </animateTransform>
    </rect>
  </svg>

  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" >
    <rect x="0" y="0" width="100" height="50" fill="red">
      <animateTransform
        attributeName="transform"
        type="scale"
        from="1 1"
        to="1 3"
        dur="2s"
        begin="1s"
        repeatCount="indefinite"
      >
      </animateTransform>
    </rect>
  </svg>

</body>
</html>
```

### animateMotion(掌握路径跟随动画)

< aniamteMotion >元素常用属性：

* **path**：**定义运动的路径**，值和`<path>`元素的d属性一样，**也可用`<mpath>`的 href 引用 一个 `<path>`**。
* **rotate** ：动画元素自动跟随路径旋转，使元素动画方向和路径方向相同，值类型：<数字> | auto | auto-reverse; 默认值：0
* 动画值属性： from、to 、values
* 动画时间属性： begin、dur、fill、repeatCount

![pCfcanS.png](https://s1.ax1x.com/2023/07/12/pCfcanS.png)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body,
    ul {
      margin: 0;
      padding: 0;
    }

    body {
      background-image: url(../images/grid.png);
    }

    svg {
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>

<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- 画一条路径 -->
    <path id="movePath" d="M 0 100,L 100 30,L 200 100,L 300 30" fill="transparent" stroke="red"></path>

    <!-- 将animateMotion的path值等同于path的d值 -->
    <rect x="-10" y="-5" width="20" height="10" rx="4" ry="4" fill="red">
      <animateMotion
        path="M 0 100, L 100 30, L 200 100, L 300 30"
        dur="5s"
        rotate="auto"
        repeatCount="indefinite"
      ></animateMotion>
    </rect>
    <!-- 使用mpath指定路径id -->
    <rect x="-10" y="-5" width="20" height="10" rx="4" ry="4" fill="red">
      <animateMotion
        dur="5s"
        rotate="auto"
        repeatCount="indefinite"
      >
        <mpath href="#movePath"></mpath>
      </animateMotion>
    </rect>
  </svg>
</body>
</html>
```

元素和动画分离写法

![pCfcanS.png](https://s1.ax1x.com/2023/07/12/pCfcanS.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    
    <!-- 1.图形 -->
    <path id="linePath" d="M 0 100, L 100 30, L 200 100, L 300 30" fill="transparent" stroke="red"></path>
    <rect id="rectangle" x="-10" y="-5" width="20" height="10" rx="4" ry="4" fill="red"></rect>

    <!-- 2.动画 分别用href指定运动图形和运动路径 -->
    <animateMotion
      href="#rectangle"
      dur="5s"
      rotate="auto"
      fill="freeze"
    >
      <mpath href="#linePath"></mpath>
    </animateMotion>
  </svg>

</body>
</html>
```

### 纸飞机路径跟随案例

![pCfc71x.png](https://s1.ax1x.com/2023/07/12/pCfc71x.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <svg width="800" height="400" viewBox="0 0 3387 1270">
      <defs>
        <style>
          svg {
            background-color: #28505d;
          }
          /**飞机飞行路线**/
          .planePath {
            stroke: #d9dada;
            stroke-width: 0.5%;
            stroke-dasharray: 1% 2%;
            stroke-linecap: round;
            fill: none;
          }
          /**飞机颜色**/
          .fil1 {
            fill: #d9dada;
          }
          .fil2 {
            fill: #c5c6c6;
          }
          .fil4 {
            fill: #9d9e9e;
          }
          .fil3 {
            fill: #aeafb0;
          }
        </style>
      </defs>

      <!-- 飞行路径 -->
      <path
        id="planePath"
        class="planePath"
        d="M-226 626c439,4 636,-213 934,-225 755,-31 602,769 1334,658 562,-86 668,-698 266,-908 -401,-210 -893,189 -632,630 260,441 747,121 1051,91 360,-36 889,179 889,179"
      />

      <!-- 飞机图形-->
      <g id="plane">
        <polygon
          class="fil1"
          points="-141,-10 199,0 -198,-72 -188,-61 -171,-57 -184,-57 "
        />
        <polygon class="fil2" points="199,0 -141,-10 -163,63 -123,9 " />
        <polygon
          class="fil3"
          points="-95,39 -113,32 -123,9 -163,63 -105,53 -108,45 -87,48 -90,45 -103,41 -94,41 "
        />
        <path
          class="fil4"
          d="M-87 48l-21 -3 3 8 19 -4 -1 -1zm-26 -16l18 7 -2 -1 32 -7 -29 1 11 -4 -24 -1 -16 -18 10 23zm10 9l13 4 -4 -4 -9 0z"
        />
        <polygon
          class="fil1"
          points="-83,28 -94,32 -65,31 -97,38 -86,49 -67,70 199,0 -123,9 -107,27 "
        />
      </g>

      <!-- 定义路径跟随动画，使用href分别挂载图形和路径 -->
      <animateMotion
        href="#plane"
        dur="5s"
        rotate="auto"
        repeatCount="indefinite"
      >
        <mpath href="#planePath"></mpath>
      </animateMotion>
    </svg>
  </body>
</html>
```

### 加载动画案例

![pCfcLnO.png](https://s1.ax1x.com/2023/07/12/pCfcLnO.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #e74c3c;
      }
      svg {
        margin: 40px;
      }
    </style>
  </head>
  <body>
    <!-- 
      1)音乐播放动画: 
        0, 0.1, 0.3, 0.5, 0.1 
        30; 100; 30
        1s
    -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="100"
      viewBox="0 0 80 100"
    >
      <!-- line 1 -->
      <rect
        fill="#fff"
        width="3"
        height="100"
        transform="rotate(180,3,50)"
      >
        <animate
          attributeName="height"
          values="30;100;30"
          dur="1.4s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <!-- line2 -->
      <rect
        x="17"
        fill="#fff"
        width="3"
        height="100"
        transform="rotate(180 20 50)"
      >
        <animate
          attributeName="height"
          values="30;100;30"
          dur="1.4s"
          repeatCount="indefinite"
          begin="0.1s"
        ></animate>
      </rect>
      <!-- line3 -->
      <rect
        x="40"
        fill="#fff"
        width="3"
        height="100"
        transform="rotate(180,40,50)"
      >
        <animate
          attributeName="height"
          values="30;100;30"
          dur="1.4s"
          repeatCount="indefinite"
          begin="0.2s"
        ></animate>
      </rect>
      <!-- line4 -->
      <rect
        x="60"
        fill="#fff"
        width="3"
        height="100"
        transform="rotate(180 58 50)"
      >
        <animate
          attributeName="height"
          values="30;100;30"
          dur="1.7s"
          repeatCount="indefinite"
          begin="0.24s"
        ></animate>
      </rect>
      <!-- line4 -->
      <rect
        x="80"
        fill="#fff"
        width="3"
        height="100"
        transform="translate(0) rotate(180 76 50)"
      >
        <animate
          attributeName="height"
          values="30;100;30"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
      </rect>
    </svg>

    <!-- 2.进度条动画
      0.1, 0.2, 0.3
      0;1 ;0
      1s
    -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.4s"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.4s"
          repeatCount="indefinite"
          begin="0.1s"
        ></animate>
      </circle>
      <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.4s"
          repeatCount="indefinite"
          begin="0.2s"
        ></animate>
      </circle>
    </svg>

    <!-- 3.转动动画 
      0 50 50
      360 50 50
      -360 50 50
      5s
      
      0.1 , 0.2, 0.3, 0.4, 0.5,
      0 5 ; 0 -5; 0 5
      1s
    -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <!-- big circle -->
      <circle
        fill="none"
        stroke="#fff"
        stroke-width="6"
        stroke-miterlimit="15"
        stroke-dasharray="14.2472,14.2472"
        cx="50"
        cy="50"
        r="47"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          dur="3s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>

      <!-- small circle -->
      <circle
        fill="none"
        stroke="#fff"
        stroke-width="1"
        stroke-miterlimit="10"
        stroke-dasharray="10,10"
        cx="50"
        cy="50"
        r="39"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;-360 50 50"
          dur="4s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>

      <!-- rect -->
      <g fill="#fff">
        <rect x="30" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -4;0 6;0 -4"
            dur="1.5"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
        <rect x="40" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -4;0 6;0 -4"
            dur="1.5"
            repeatCount="indefinite"
            begin="0.1s"
          ></animateTransform>
        </rect>
        <rect x="50" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -4;0 6;0 -4"
            dur="1.5"
            repeatCount="indefinite"
            begin="0.2s"
          ></animateTransform>
        </rect>
        <rect x="60" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -4;0 6;0 -4"
            dur="1.5"
            repeatCount="indefinite"
            begin="0.3s"
          ></animateTransform>
        </rect>
        <rect x="70" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -4;0 6;0 -4"
            dur="1.5"
            repeatCount="indefinite"
            begin="0.4s"
          ></animateTransform>
        </rect>
      </g>
    </svg>
  </body>
</html>
```

### 水球体案例

重点在于：波浪水平动画的控制

初始加载时，水的上升动画，控制节点的.style.transform = `translateY(0, {}$%)`

![123](https://wx2.sinaimg.cn/large/007eMerIgy1heu4pi1j59g30ei0d1dn7.gif)

![pCVWC5V.png](https://s1.ax1x.com/2023/06/11/pCVWC5V.png)

## [SVG第三方动画库(snap.svg)](snapsvg.io)

**一个使用js创建和操作svg的 JavaScript 库 ( 类似jQuery )。**

* Snap.svg 是一个专门用于处理SVG的 JavaScript 库 ( 类似jQuery )。
* Snap 为 Web 开发人员提供了干净、直观、功能强大的API，这些API专门用来操作SVG。
* Snap 可用于创建动画，操作现有的 SVG 内容，以及生成 SVG 内容。

Snap.svg常用的API：

* **Snap： 工厂函数，创建或获取SVG**
  * **Snap(w, h) 、Snap(selector)….**
* **Paper: 纸张 | SVG画布**
  * **circle、rect、line、path、text….**
* **Element：元素**
  * **animate、attr、select、before、after…**
* **mina：通常用到的一些动画时间函数。**
  * **mina.linear、mina.easeIn、mina.easeOut、bounce(跳动)…**.

### 案例用法参照

![pCVfxkq.png](https://s1.ax1x.com/2023/06/11/pCVfxkq.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <script src="./libs/snap.svg-min.js"></script>
  <script>
    window.onload = function() {
      // 1.Snap创建一个svg
      let svg = Snap(300, 300)
      // svg.paper = svg
      // console.log(svg === svg.paper) // true

      // 2.在svg画布中绘制一个圆 创建的svg的.paper属性会指向该svg
      // let c = svg.circle(100, 100, 50)
      let c = svg.paper.circle(100, 100, 50)

      // 3.给圆添加一些属性
      c.attr({
        fill: 'transparent',
        stroke: 'red'
      })
      // 拿到svg的元素的对象 
      // console.log(svg.node)
      // 4.将svg添加到body中
      document.body.appendChild(svg.node)
    }
  </script>
</body>
</html>
```

![](https://fb.video.weibocdn.com/o8/1xc4YRktlx0869giDl0A0104120007tw0E018.mp4?label=gif_mp4&template=456x454.28.0&ssig=Ooi7Xrvps%2B&Expires=1686459011&KID=unistore,video)

![pCVWpEq.png](https://s1.ax1x.com/2023/06/11/pCVWpEq.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg id="hySvg" width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <rect id="rectangle1" x="0" y="0" width="100" height="50"></rect>
  </svg>

  <script src="./libs/snap.svg-min.js"></script>
  <script>
    window.onload = function() {
      // Snap获取svg节点
      let svg = Snap('#hySvg')
      let paper = svg.paper

      // 1.svg中再添加绘制一个矩形
      let rectangle = paper.rect(0, 100, 100, 50)
      rectangle.attr({
        fill: 'red'
      })

      // 2.选择一个svg中存在的矩形节点进行操作
      let rectangle1 = paper.select('#rectangle1')
      rectangle1.attr({
        fill: 'green'
      })

      // 3.动画的实现( requestAnimatationFrame  1s 61次)
      // Snap.animate(
      //   0, // from
      //   200, // to
      //   function(val) {
      //     console.log('val', val)
      //     // 这里会回调 61 次, 会将0-200拆分成61份
      //     rectangle1.attr({
      //       x: val
      //     })
      //   },
      //   1000, // 毫秒 -> 1s
      //   mina.linear,
      //   function() {
      //     console.log('动画结束了')
      //   }
      // )
    

      Snap.animate(
        [0, 0], // from x ,y 
        [200, 200], // to x, y
        function(val) { // val会拿到变化中的值
          // 这里会回调多次,(类似于requstAnimationFrame) 会将0-200拆分成61份
          console.log('val', val)
          rectangle1.attr({
            x: val[0],
            y: val[1]
          })
        },
        3000, // 毫秒 -> 1s
        mina.easeout,
        function() {
          console.log('动画结束了')
        }
      )
    }
  </script>
</body>
</html>
```

## Gsap动画库(掌握)

什么是GSAP

* **GSAP全称是（ GreenSock Animation Platform）GreenSock 动画平台**。
* **GSAP 是一个强大的 JavaScript 动画库，可让开发人员轻松的制作各种复杂的动画**。

GSAP动画库的特点

* 与Snap.svg不一样，**GSAP无论是HTML 元素、还是SVG、或是Vue、React组件的动画，都可以满足你的需求**。
* GSAP的还**提供了一些插件**，可以**用最少的代码创建令人震惊的动画**，比如：**ScrollTrigger插件和MorphSVG插件**。
  * https://greensock.com/scrolltrigger
* GSAP 的核心是一个**高速的属性操纵器**，随着时间的推移，它可**以极高的准确性更新值**。它**比 jQuery 快 20 倍**！
* GSAP **使用起来非常灵活，在你想要动画的地方基本都可以使用**，并且是**零依赖**。
* [官网](https://greensock.com/docs)
* 可通过离线包文档进行查看，或者github中下载



### 官方文档永远是第一要义

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <rect id="rectangle" x="100" y="100" width="100" height="100" fill="red"
    onclick="scaleRectangle()" 
    ></rect>
  </svg>

  <!-- 
    window.gsap = {}
   -->
   <script src="./libs/gsap.min.js"></script>
   <script>
    // 节点点击触发动画
    function scaleRectangle() {
      // 1.补间动画( 参数一也是支持数组的 )
      // gsap.to(['#rectangle'], {
      //   scale: 0.5, // 1 - 0.5
      //   duration: 1
      // })

      // gsap.from(['#rectangle'], {
      //   scale: 0.3,  // 0.3 - 1
      //   duration: 1
      // })

      // gsap.fromTo(['#rectangle'], 
      //   {
      //     scale: 0,  // 0%
      //     // duration: 4 // 0.5
      //   },
      //   {
      //     scale: 1,  // 100%
      //     duration: 2, // 0.5
      //     repeat:1,
      //   })

      // gsap.to(['#rectangle'], {
      //   scale: 0.5, // 1 - 0.5
      //   duration: 1,
      //   // transformOrigin: 'center'  // 动画的原点
      //   // transformOrigin: 'left'  // 动画的原点
      //   // transformOrigin: 'top'  // 动画的原点
      //   // transformOrigin: 'right'  // 动画的原点
      //   // transformOrigin: 'bottom'  // 动画的原点
      // })

      // 过渡效果
      gsap.to(['#rectangle'], {
        scale: 0.5, // 1 - 0.5
        duration: 1,
        transformOrigin: 'center',  // 动画的原点
        ease: 'bounce.out'   // power1.out
      })
    }
    
   </script>
</body>
</html>
```

### 动画时间线(timeline时间线的自动管理)

动画时间线（TimeLine）：

* **时间线（TimeLine）是用来创建易于调整、有弹性的动画序列**。
* 当我们将**补间添加到时间线（Timeline）**时，默认情况下，它们会**按照添加到时间轴的顺序一个接一个地播放**。

TimeLine的使用步骤：

* 第一步：通过**gsap.timeline( vars ) 拿到时间线对象**
  * timeline文档： https://greensock.com/docs/v3/GSAP/Timeline
* 第二步：**调用时间线上的 Tween 动画方法，比如：form、to 等**。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body, ul{
      margin: 0;
      padding: 0;
    }

    body{
      background-image: url(../images/grid.png);
    }
    svg{
      background-color: rgba(255, 0, 0, 0.1);
    }
  </style>

</head>
<body>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
    <rect id="rectangle1" x="0" y="0" width="50" height="50" fill="red" onclick="scaleRectangle()" ></rect>
    <rect id="rectangle2" x="100" y="0" width="50" height="50" fill="red"></rect>
    <rect id="rectangle3" x="200" y="0" width="50" height="50" fill="red"></rect>
  </svg>

  <!-- 
    window.gsap = {}
   -->
   <script src="./libs/gsap.min.js"></script>
   <script>
    function scaleRectangle() {

      let timeline = gsap.timeline() // 动画时间线

      timeline.to(['#rectangle1', '#rectangle2'], {
        scale: 0.5,
        duration: 1
      })

      // .to('#rectangle2', {
      //   scale: 0.5,
      //   duration: 1,
      // })

      .to('#rectangle3', {
        scale: 0.5,
        duration: 1,
      })

    }
   </script>
</body>
</html>
```

### 滑板车链式动画案例(包含时间线和提前执行)

![pClQSVe.png](https://s1.ax1x.com/2023/06/17/pClQSVe.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 滑板车 -->
    <svg
      id="scooter"
      height="512"
      width="512"
      viewBox="0 0 512.004 512.004"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="footer-block"
        d="m175.669 463.803c-8.283 0-15-6.716-15-15 0-53.743-43.723-97.467-97.467-97.467-14.622 0-28.673 3.153-41.762 9.371-7.483 3.555-16.432.371-19.986-7.112-3.555-7.482-.37-16.431 7.113-19.985 17.143-8.143 35.525-12.273 54.635-12.273 70.286 0 127.467 57.182 127.467 127.467 0 8.283-6.714 14.999-15 14.999z"
        fill="#c5e1e6"
      />
      <path
        id="footboard2"
        d="m442.768 321.476c-63.027 2.945-113.414 51.086-120.563 112.327h-210.801c-8.285 0-15 6.716-15 15s6.715 15 15 15h224.932c8.285 0 15-6.716 15-15 0-52.162 40.777-94.928 92.832-97.36 8.275-.387 14.67-7.408 14.283-15.684-.387-8.275-7.402-14.684-15.683-14.283z"
        fill="#008adf"
      />
      <path
        id="footboard1"
        d="m442.768 321.476c-63.027 2.945-113.414 51.086-120.563 112.327h-66.204v30h80.335c8.285 0 15-6.716 15-15 0-52.162 40.777-94.928 92.832-97.36 8.275-.387 14.67-7.408 14.283-15.684-.387-8.275-7.402-14.684-15.683-14.283z"
        fill="#0065a3"
      />
      <path
        id="scooter-head"
        d="m448.787 415.604c-7.721 0-14.279-5.923-14.932-13.755l-28.796-345.572c-1.291-15.484-11.852-26.275-20.521-26.275-8.283 0-15-6.716-15-15s6.717-15 15-15c12.9 0 25.295 5.971 34.9 16.811 8.852 9.99 14.361 23.12 15.518 36.972l28.797 345.573c.688 8.256-5.447 15.506-13.703 16.194-.425.035-.847.052-1.263.052z"
        fill="#8db9c4"
      />
      <circle id="wheel4" cx="63.203" cy="448.803" fill="#c5e1e6" r="48.2" />
      <path
        id="wheel3"
        d="m63.203 512.002c-34.848 0-63.199-28.351-63.199-63.199 0-34.849 28.352-63.199 63.199-63.199 34.85 0 63.201 28.35 63.201 63.199 0 34.848-28.352 63.199-63.201 63.199zm0-96.398c-18.306 0-33.199 14.893-33.199 33.199 0 18.307 14.894 33.199 33.199 33.199 18.307 0 33.201-14.893 33.201-33.199s-14.895-33.199-33.201-33.199z"
        fill="#1d4659"
      />
      <circle id="wheel2" cx="448.803" cy="448.803" fill="#8db9c4" r="48.2" />
      <g fill="#0e232c">
        <path
          id="wheel1"
          d="m448.803 512.002c-34.848 0-63.199-28.351-63.199-63.199 0-34.849 28.352-63.199 63.199-63.199 34.85 0 63.201 28.35 63.201 63.199 0 34.848-28.352 63.199-63.201 63.199zm0-96.398c-18.307 0-33.199 14.893-33.199 33.199 0 18.307 14.893 33.199 33.199 33.199 18.307 0 33.201-14.893 33.201-33.199s-14.895-33.199-33.201-33.199z"
        />
        <path
          id="head-block"
          d="m352.402.002c-8.283 0-15 6.716-15 15s6.717 15 15 15h32.135v-30h-32.135z"
        />
      </g>
    </svg>
    <script src="./libs/gsap.min.js"></script>
    <script>
     window.onload = function() {

      let tl = gsap.timeline({
        repeat: 0, // 重复的次数, 0表示一次
        // yoyo: true // 反向执行动画
      })

      // timeline动画时间线的链式执行
      // 1.给车轮做动画
      tl.from(
        [
        '#wheel1', // begin= 0s
        '#wheel2', // 0.2
        '#wheel3', // 0.4
        '#wheel4' // 0.6
        ], 
        {
        scaleX: 0,
        scaleY: 0,
        duration: 1,
        transformOrigin: 'center',
        ease: 'bounce.out',
        stagger: 0.2
      })

      .from([
        "#footboard1",
        "#footboard2"
      ], {
        scaleX: 0,
        duration: 1,
        transformOrigin: 'left',
        ease: 'bounce.out',
      })
      
      .from([
        "#scooter-head"
      ], {
        scaleY: 0,
        duration: 1,
        transformOrigin: 'bottom',
        ease: 'bounce.out',
      })
      
      .from([
        "#head-block",
        "#footer-block"
      ], {
        scaleX: 0,
        duration: 1,
        transformOrigin: 'right',
        ease: 'bounce.out',
      }, '-=1') // '-=1'表示提前一秒执行
     }
    </script>
  </body>
</html>

```

