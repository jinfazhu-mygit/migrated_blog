---
title: 'html5-css'
date: 2021-4-24 23:58:00
permalink: '/posts/blogs/html5-css'
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


## html/css 知识回顾

### 1.无序列表与有序列表

```javascript
无序列表：
<ul>
  <li></li>
  <li></li>
</ul>
有序列表：
<ol>
  <li></li>
  <li></li>
</ol>
<style>
  li{
    list-style:inside;  //消除li的.
  }
</style>
```

无序列表：
<ul>
  <li></li>
  <li></li>
</ul>
有序列表：
<ol>
  <li></li>
  <li></li>
</ol>

### 2.表格表现形式

```javascript
<table>
  <thead>
  	<th>表头1</th>
    <th>表头2</th>
  </thead>
  <tbody>
  	<tr>
    	<td>第一行内容</td>
      <td>第一行内容</td>
    </tr>
    <tr>
    	<td>第二行内容</td>
      <td>第二行内容</td>
    </tr>
  </tbody>
</table>
```

<table>
  <thead>
  	<th>表头1</th>
    <th>表头2</th>
  </thead>
  <tbody>
  	<tr>
    	<td>第一行内容</td>
      <td>第一行内容</td>
    </tr>
    <tr>
    	<td>第二行内容</td>
      <td>第二行内容</td>
    </tr>
  </tbody>
</table>

### 3.表单

```html
<form action="">
  <label for="username">用户名:</label>  //for属性与input框内的id相绑定
  <input id="username" type="text" placeholder="框内提示">
  <label for="password">密码:</label>
  <input id="password" type="password" placeholder="框内提示">//type="password"框内信息显示为***
  <select name="sex" id="">
    <option value="sex">男</option>
    <option value="sex">女</option>
  </select><br/>
  <input type="button" value="按钮">
  <label>男</label><input type="radio" name="sex"><label>女</label><input type="radio" name="sex">
  <label>运动爱好:</label>
  <label>篮球</label><input type="checkbox" value="篮球"><label>足球</label><input type="checkbox" value="足球"><label>羽毛球</label><input type="checkbox" value="羽毛球">
  <input type="submit" value="提交">
</form>
```

<form action="">
  <label for="username">用户名:</label>
  <input id="username" type="text" placeholder="框内提示">
  <label for="password">密码:</label>
  <input id="password" type="password" placeholder="框内提示">
  <select name="sex" id="">
    <option value="sex">男</option>
    <option value="sex">女</option>
  </select><br/>
  <input type="button" value="按钮">
  <label>男</label><input type="radio" name="sex"><label>女</label><input type="radio" name="sex">
  <label>运动爱好:</label>
  <label>篮球</label><input type="checkbox" value="篮球"><label>足球</label><input type="checkbox" value="足球"><label>羽毛球</label><input type="checkbox" value="羽毛球">
  <input type="submit" value="提交">
</form>

### 4. css选择器

#### 4.1元素选择器: element: h1,h2,img,p...

#### 4.2类选择器:  .className

#### 4.3 id选择器:  #idName

#### 4.4通配符选择器: *

#### 4.5层级选择器: selector1 selector2  其中selector2为selector1的子集

#### 4.6组合选择器: selector1,selector2

#### 4.7伪类选择器: selector: hover

#### 4.8伪元素选择器: selector::before selector::after 可在selector元素前后添加元素

#### 4.9选择器权重: id(100)>class(10)>element(1)；  样式后加!important权重最高；层级的选择权重会叠加进行比较

#### 4.10[常用选择器](https://juejin.cn/post/6844903741661904903#heading-4)

### 5. div盒子相关属性

#### 5.1边框:

```javascript
<style>
	border-width: 10px;  border-style: solid/dotted/dashed/double/none; border-color: red;
	border: 10px solid red;  
	border-radius:_ _ _ _或border-radius:_ _ (对角)或border-radius:_%
</style>
```

#### 5.2外边距: 

```html
表现形式:margin,margin-top,margin-right,margin-bottom,margin-left
1. margin:top right bottom left
2. margin:top auto/left
```

#### 5.3内边距: 针对div子集的样式

```html
padding:top right bottom left
padding:top auto/left
```

#### 5.4阴影

```html
box-shadow:_px _px _px rgba(100,100,100,0.1)
前两个px分别为X方向Y方向上的偏移量，第三个px为模糊度，rgba内设置的是透明度
```

#### 5.5溢出属性(over-flow)

```html
over-flow:hidden;
over-flow:auto;  //滚动条形式
```

### 6.定位(top,right,bottom,left)

#### 6.1绝对定位: position: absolute  相对于浏览器左上角，若父元素position为relative，则相对于父元素

#### 6.2相对定位: position: relative 相对于元素的原位置

#### 6.3固定定位: position: fixed 相对于浏览器窗口

### 7. html5新增标签

#### 7.1 header,nav,aside,article,section,footer

#### 7.2 音频

```html
<audio src="" controls autoplay></audio>
```

#### 7.3视频

```html
<video src="" controls autoplay></video>
```

### 8.过渡属性与渐变

#### 8.1属性：

```html
transform:rotate(_deg)旋转度数
transform:scale(_)缩放倍数
transform:transform(_px,_px)XY方向的大小变换
```

#### 8.2渐变:

##### 8.2.1过渡属性

```html
transition-porperty:transform  //指定渐变的为transform属性
```

##### 8.2.2函数

```html
<style>
	transition-timing-function:ease //开始与结束慢，中间变化快
	transition-timing-function:linear //匀速变化
	transition-timing-function:ease-in //开始慢
	transition-timing-function:ease-out //结束慢
	transition-timing-function:ease-in-out //与ease类似，动作幅度比ease大
</style>
```

##### 8.2.3延迟

```html
<style>
	transiton-delay:2s  //延迟变化时间
</style>
```

##### 8.2.4旋转原点的设置

```html
<style>
	transform-origin:0 0;  //以(0，0)为原点进行旋转
</style>
```

#### 8.3综合:

```html
<style>
	.box{
	width:100px;
	height:100px;
	background-color:red;
	transform-origin:100 100;
	transition: transform 2s ease 0s; //transform属性，变化2秒，ease,延迟0秒
	}
	.box:hover{
	transform:rotate(360deg);
	transform:translate(200px,200px)
	}
</style>
```

### 9.动画效果

#### 9.1定义动画

```html
<style>
  @keyflames anim{
    0%{
      transform:rotate(0deg);
    }
    50%{
      transform:rotate(180deg);
		}
    100%{
      transform:rotate(360deg);
    }
  }
</style>
```

#### 9.2动画调用

```html
anim:anim/动画名 执行时间 速率 延迟 次数(函数)
动画名:keyflames  执行时间:执行秒数  延迟:延迟执行秒数  次数:ease,linear,ease-in,ease-out,ease-in-out,infinate(无限执行)
animation: rotate 13s linear infinite;
```

#### 9.3动画暂停

```html
<style>
	.box:hover{
		animation-play-state:paused; // 或running
	}
</style>
```

### 10. flex弹性盒子布局(display: flex)

#### 10.1 flex-direction:设置flex项目排列方向

```html
<style>
	.container{
		display: flex;
		flex-direction: row;  //主轴水平，从左开始排列
		flex-direction: row-reverse;  //主轴水平，从右开始排列
		flex-direction: column;  //主轴垂直，起点在上
		flex-direction: reverse;  //主轴垂直，起点在下
	}
</style>
```

#### 10.2 justify-content: flex项目沿主轴排列方式

```html
<style>
	.container{
		display:flex;
		justify-content: flex-start;  //左对齐
		justify-content: flex-end;  //右对齐
		justify-content: center;  //居中
		justify-content: space-between;  //分布于两边
		justify-content: space-around;  //每个flex项目间隔相等 但两边为0.5/1/0.5
		justify-content: space-evenly;  //每个flex项目间隔相等 但两边为1/1/1
	}
</style>
```

#### 10.3 align-items: flex项目沿交叉轴排列方式

```html
<style>
	.container{
		display:flex;
		align-items: flex-start;  //沿交叉轴起点对齐
		align-items: flex-end;  //沿交叉轴终点对齐
		align-items: center;  //位于交叉轴中间
		align-items: stretch;  //沿交叉轴延伸
		align-items: baseline;  //沿项目的第一行文字对齐
	}
</style>
```

#### 10.4 flex-wrap: 轴线排列的换行

```html
<style>
	.container{
		display:flex;
		flex-wrap: nowrap;  //不换行
		flex-wrap: wrap;  //换行
		flex-wrap: wrap-reverse;  //换行，第一行在下方
	}
</style>
```

#### 10.5 flex其他

##### 10.5.1 使用flex:__;可设置flex项目所占容器比例

##### 10.5.2 align-self: flex项目的对齐方式(auto|flex-start|center|baseline|stretch)

### 11. grid布局(display: grid)

#### 11.1 grid容器布局的划分

```html
<style>
	.container{
		display:grid;
		grid-template-rows:100px,100px,100px;  //可设置多个
		grid-template-columns:100px,100px,100px;  //可设置多个
	}
</style>
<style>
	.container{
		display:grid;
		grid-template-rows:1fr,2fr,1fr;  //按比例划分
		grid-template-columns:2fr,1fr,1fr;  //按比例划分
	}
</style>
<style>
	.container{
		display:flex;
		flex-wrap: nowrap;  //不换行
		flex-wrap: wrap;  //换行
		flex-wrap: wrap-reverse;  //换行，第一行在下方
	}
</style>
```

#### 11.2 grid项目内容对齐方式

```html
<style>
	.container{
		display:grid;
		grid-template-rows:100px,100px,100px;
		grid-template-columns:100px,100px,100px;
		justify-items:start|center|end|stretch;  //水平方向默认为stretch延伸
		align-items:start|center|end|stretch;  //垂直方向默认为stretch延伸
	}
</style>
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
```

```html
<style>
	.container{
		display:grid;
		grid-template-rows:100px,100px,100px;
		grid-template-columns:100px,100px,100px;
		justify-content:start|center|end|stretch;  //container子项目水平方向位置
		align-content:start|center|end|stretch;  //container子项目垂直方向位置
	}
</style>
```

```html
<style>
  .container{
    display:grid;
    grid-auto-rows:50px;  //溢出行的高度设置
		grid-auto-columns:50px;  //溢出列的宽度设置
		grid-auto-flow:column;  //列排
  }
</style>

<style>
  .contain{
    grid-column-start:1;  //针对某个子项目用线的序号排布，column为竖线
		grid-column-end:4;
		grid-column:1/4;  //简写
    
    grid-row-start:1;  //针对某个子项目用线的序号排布,row为横线
		grid-row-end:4;
		grid-row:1/4;  //简写

		justify-self:start;  //针对某个子项目内容水平布局
		align-self:start;  //针对某个子项目内容垂直布局
  }
</style>
```

#### 11.3常用

![pFDv4zR.png](https://s21.ax1x.com/2024/03/06/pFDv4zR.png)

```css
display: grid; // grid布局
grid-template-columns: repeat(5, 104px); // 五列104px 也可用 104px 104px 104px 104px 104px
grid-template-rows: repeat(auto-fill, 104px); // 自动行 item高度为104px
grid-gap: 42px; // 还有grid-column-gap和grid-row-gap分别区分行列间距
```

### 12. em与rem

#### 12.1 em: em为相对长度单位，相对于当前对象内文本的字体尺寸。如当前行内文本字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。em会继承父元素字体大小

##### 12.1.1 通过设置body选择器的Font-size即可改变em的值，如令Font-size=62.5%,即16px*0.625=10px,此时1em即等于font-size=10px,或直接指定font-size: 10px;

```html
<style>
	.em{
    font-size:10px;
  }
</style>
```

#### 12.2 使用rem为元素设定字体大小时，仍然是相对大小，但相对的是**HTML根元素**。可以做到只修改根元素就成比例地调整所有字体大小

```html
<style>
  html{
    font-size:20px;
  }
</style>
```



:wink::wink::wink:


## 文本相关

* font-family: "微软雅黑"，"Microsoft YaHei",Arial;  设置文本字体
* font-weight: bold|bolder|700；   直接通过设置number数值(100-900)来设置文本粗细(默认为400)
* font-style: italic|normal  斜体设置
* font: italic 700 16px/lineheight 'Microsoft yahei'  复合写法 (*font-size*和*font-family***必须有**)
* text-align: left|center|right  文本对齐
* text-decoration: **none**|**underline**|overline|linethrough  划线(a标签的下划线可通过此去除)
* text-indent: 20px|2em; p的首行缩进，*2em*表示当前**一个文字**大小的两倍
* line-height: 26px;  其中line-height包括的是**上间距**、**字高**、**下间距之和**

## background相关

```css
background-color: red;
background-image: none|url(...)    背景图片
background-repeat: repeat|norepeat|repeat-x|repeat-y;    是否**平铺背景图片**，以及平铺方向 
background-position: x y;   使用方位名词left|center|right|top|bottom或_px _px确定图片的位置
background-attachment: scroll|fixed  背景图片位置是否固定
background: red url() no-repeat scroll top left    //背景图片复合写法
background: rgba(0,0,0,1)  最后一个参数设置透明度
```

### 颜色渐变按钮

```css
background: url('../../images/---.png') no-repeat 0px 0px, linear-gradient(to right, #009cff, #39d7ff);
```

## 影响div盒子大小的因素

* width height
* border
* padding  如果盒子本身未指定width/height属性，则此时padding不会撑开盒子大小
* div内元素的大小，如文本的line-height

### 阴影

box-shadow: h-shadow(水平偏移量) v-shadow(垂直偏移量) blur(模糊度) spread(阴影大小) color(颜色rgba(0,0,0,.5)可表示透明度) inset(外部/内部阴影)

text-shadow: h-shadow(水平偏移量) v-shadow(垂直偏移量) blur(模糊度) color(颜色rgba(0,0,0,.5)可表示透明度)

### 标准流、浮动流、定位

多个块级元素纵向排列找**标准流**，多个块级元素横向排列找**浮动**(浮动可以·让多个块级元素一行内排列显示)

## 浮动

float: left/right/none

* 浮动元素脱离标准流(不在保留原来的位置)

* 浮动元素会一行内显示且元素顶部对齐(如果父级宽度装不下浮动的盒子，多出的盒子会另起一行)

* 浮动元素具有**行内块元素**的特性

* 浮动流常常与标准流父元素相结合使用 (注：浮动流不能撑开为标准流的父元素，需**清除浮动**才可)

* 浮动只会影响浮动盒子后面的标准流，不影响前面的标准流

* **清除浮动**: 

  1. 额外标签法:在最后一个浮动元素后加空div,给其添加 clear:both；
  2. 给浮动元素的父元素添加overflow: hidden;
  3. :after伪元素法:给父元素添加clearfix

  ```css
  <style>
  .clearfix:after{
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }  
  .clearfix{/*IE6,7专有*/
    *zoom: 1;
  }
  </style>
  ```

  4. 双伪元素法: 给父元素添加clearfix

  ```css
  <style>
  	.clearfix:before,
  	.clearfix:after{
    	content: "";
    	display:table;
  	}
  	.clearfix:after{
    	clear:both;
  	}
  	.clearfix{
    	*zoom: 1;
  	}
  </style>
  ```

## *PS相关操作*

* alt+滚轮:缩放图片
* ctrl+r切换标尺工具
* 移动工具+点击图片+图层导出为png/**合并**图层(ctrl+e)+导出为png/shift+c**切片工具**+导出为web格式+选中的切片(在图层最下方去除背景，导出web png格式即为透明背景)  **cutterman**插件安装使用

## CSS规范

```css
<style>  //书写顺序规范
div {
  display: block;
  position: relative;
  float: left;
  
  width: 100px;
  height: 100px;
  margin: 0 auto;
  padding: 20px 0;
  
  font-family: Arial,"Microsoft yahei",Helvetica;
  color: #333;
  background: red url() no-repeat scroll top left;
  border-radius: 10px;
}
</style>
```

1. 确定页面版心；
2. 分析行模块；
3. 以及每个行模块中的列模块；
4. 先理结构，后写样式；


## 杂项

* border: 0;  //消除按钮边框
* 两个行内块元素排列在一起，默认有间距，同为浮动消除间距
* a链接字体颜色单独设置，继承有问题

## 定位复述

* **相对定位**relative：相对于原本位置变换位置，不脱离标准流
* **绝对定位**absolute：只**相对于**有定位的父元素(以**最近一级的有定位的父元素**)或**浏览器窗口**，**脱离标准流**
* **固定定位**fixed：相对于**浏览器可视窗口**位置固定
* **粘性定位**sticky：必须添加top,bottom,left,right其中一个才有效果
* **z-index**：**加了定位的元素**可通过z-index确定显示的权重
* 行内元素添加了定位后，可直接设置宽高
* 浮动元素不会压住标准流的文字，定位元素会压住标准流文字

## 显示与隐藏

* **display**: none; //不显示元素，且不占有原来位置，但**实际还存在，只是不显示和不占位**
* visibility: inherit|visible|collapse|hidden  //inherit继承父元素的可见性，visible可视，hidden**隐藏(隐藏后还占位)**，collapse针对表格
* overflow: visible|hidden|scroll|auto  //auto在有超出时才添加滚动条，不超出不加
