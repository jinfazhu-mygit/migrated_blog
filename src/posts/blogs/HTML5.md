---
title: 'HTML5'
date: 2021-7-2 17:40:00
permalink: '/posts/blogs/HTML5'
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

## HTML5



### 一、语义化标签

```html
<header></header>
<nav></nav>
<container></container>
<article></article>
<section></section>
<footer></footer>
<aside></aside>
<dialog></dialog>
```

### 二、增强型表单

### 三、视频和音频

```html
<audio></audio>
<video></video>
```

### 四、canvas绘图

```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid red"></canvas>
  <script>
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");//创建内建的HTML5对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
    ctx.fillStyle = "#FF0000";//颜色
    // ctx.fillRect(0, 0, 150, 75);//绘制矩形

    ctx.moveTo(0, 0);//线的起点
    ctx.lineTo(200, 100);//线的终点
    ctx.stroke();//划线

    ctx.font = "30px Arial";//设置字体
    ctx.fillText("Hello World", 0, 30);//设置内容
  </script>
```

### 五、SVG绘图

* SVG是指可伸缩的矢量图形，SVG 是一种使用 XML 描述 2D 图形的语言，Canvas 通过 JavaScript 来绘制 2D 图形
* 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
* Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

### 六、地理定位

```html
<script>
	navigator.geolocation.getCurrentPosition(    
    function(pos){
        console.log('用户定位数据获取成功')　　　　
        console.log(arguments);　　　　
        console.log('定位时间：',pos.timestamp)　　　　
        console.log('经度：',pos.coords.longitude)　　　　
        console.log('纬度：',pos.coords.latitude)　　　　
        console.log('海拔：',pos.coords.altitude)　　　　
        console.log('速度：',pos.coords.speed)
    },   
     //定位成功的回调function(err){ console.log('用户定位数据获取失败')　　　　
     //console.log(arguments);
}        
//定位失败的回调
</script>
```

### 七、拖放API

* 拖放源对象可触发的事件

dragstart:拖动开始

drag:拖动中

dragend:拖动结束

* 拖放的目标对象可触发的事件

dragenter:拖动进入

dragover:拖动悬停

dragleave:拖动着离开

drop:释放



