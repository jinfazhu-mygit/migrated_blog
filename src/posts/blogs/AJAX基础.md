---
title: 'AJAX基础'
date: 2021-7-17 23:15:00
permalink: '/posts/blogs/AJAX基础'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
 - ajax
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


## AJAX基础

* ### 初始化(终端)

```
npm init -y
npm i expreess  //使用express框架
```

* ### 通过express创建后台，添加监听

![W1gtLd.jpg](https://z3.ax1x.com/2021/07/17/W1gtLd.jpg)

* ### 设置允许跨域(response.setHeader('Access-Control-Allow-Origin','*') ),以及请求的路径'/server'

![W1gEzF.jpg](https://z3.ax1x.com/2021/07/17/W1gEzF.jpg)

* ### 创建XMLHttpRequest对象，以及readystate的0，1，2，3，4的状态

![W1gZM4.jpg](https://z3.ax1x.com/2021/07/17/W1gZM4.jpg)

* ### GET请求的查询字段(在xhr的open属性中设置，?的后面)

![W1gFiV.jpg](https://z3.ax1x.com/2021/07/17/W1gFiV.jpg)

* ### POST请求的接收与发送

![W1gkGT.jpg](https://z3.ax1x.com/2021/07/17/W1gkGT.jpg)

* ### POST请求的请求体( xhr.send()里 )

![W1guZR.jpg](https://z3.ax1x.com/2021/07/17/W1guZR.jpg)

* ### 设置请求头信息 与 自定义请求头信息

![W1guZR.jpg](https://z3.ax1x.com/2021/07/17/W1guZR.jpg)

![W1gMIx.jpg](https://z3.ax1x.com/2021/07/17/W1gMIx.jpg)

* ### app.all option

![W1gKd1.jpg](https://z3.ax1x.com/2021/07/17/W1gKd1.jpg)

* ### 服务端响应JSON数据 ( JSON.stringify(Object)转化为str  JSON.parse(xhr.response)还原 )

JSON.stringify(Object)转化为str

![W1fjDe.jpg](https://z3.ax1x.com/2021/07/17/W1fjDe.jpg)

JSON.parse(xhr.response)  (手动还原) 

![W1fLjO.jpg](https://z3.ax1x.com/2021/07/17/W1fLjO.jpg)

xhr.responseType='json'  (自动还原)

![W1fXuD.jpg](https://z3.ax1x.com/2021/07/17/W1fXuD.jpg)

* ### nodemon的安装，解决IE浏览器缓存问题

nodemon安装与使用  终端命令：

```
npm install -g nodemon
nodemon ___.js //服务端数据改变，不刷新，自动更换页面
```

IE浏览器缓存问题解决

![W3ZZ1s.jpg](https://z3.ax1x.com/2021/07/18/W3ZZ1s.jpg)

* ### AJAX请求超时与网络异常处理

xhr.timeout=   ;

xhr.ontimeout=function(){   };

![W3Zecn.jpg](https://z3.ax1x.com/2021/07/18/W3Zecn.jpg)

xhr.onerror=function(){   };

![W3ZFAS.jpg](https://z3.ax1x.com/2021/07/18/W3ZFAS.jpg)

* ### 取消请求及重复发送问题的解决( xhr.abort(); )

超时
![W3ZAhQ.jpg](https://z3.ax1x.com/2021/07/18/W3ZAhQ.jpg)
重复发送
![W3ZVpj.jpg](https://z3.ax1x.com/2021/07/18/W3ZVpj.jpg)

* ### jQuery发送AJAX请求

```js
$('button').eq(0).click(function(data){
  console.log(data);
},'json')
```
get请求
![W3Zun0.jpg](https://z3.ax1x.com/2021/07/18/W3Zun0.jpg)
post请求
![W3ZKBV.jpg](https://z3.ax1x.com/2021/07/18/W3ZKBV.jpg)

* ### jQuery通用方法发送AJAX请求

![W3YN7Q.jpg](https://z3.ax1x.com/2021/07/18/W3YN7Q.jpg)

![W3Yakj.jpg](https://z3.ax1x.com/2021/07/18/W3Yakj.jpg)

* ### Axios发送AJAX请求(axios使用的是promise回调)

直接用BootCDN引入Axios  crossorigin="annoymous"

get

![W3Yt0g.jpg](https://z3.ax1x.com/2021/07/18/W3Yt0g.jpg)

![W3YBpq.jpg](https://z3.ax1x.com/2021/07/18/W3YBpq.jpg)

post

![W3YYnS.jpg](https://z3.ax1x.com/2021/07/18/W3YYnS.jpg)

* ### fetch函数发送AJAX请求

![W3RGwj.jpg](https://z3.ax1x.com/2021/07/18/W3RGwj.jpg)

* ### 同源策略

协议，域名，端口必须完全相同

![W3Ro0H.jpg](https://z3.ax1x.com/2021/07/18/W3Ro0H.jpg)

* ### JSONP解决跨域原理

**jsonp只支持get请求**

网页有些标签天生具备跨域能力，如：img,link,iframe,script,

![W3R4XD.jpg](https://z3.ax1x.com/2021/07/18/W3R4XD.jpg)

![W3RT7d.jpg](https://z3.ax1x.com/2021/07/18/W3RT7d.jpg)


* ### 原生jsonp实践

![W3Tasx.jpg](https://z3.ax1x.com/2021/07/18/W3Tasx.jpg)

![W3TUQ1.jpg](https://z3.ax1x.com/2021/07/18/W3TUQ1.jpg)

* ### jquery发送jsonp请求

![W3TYW9.jpg](https://z3.ax1x.com/2021/07/18/W3TYW9.jpg)

![W3HpHf.jpg](https://z3.ax1x.com/2021/07/18/W3HpHf.jpg)

![W3TtzR.jpg](https://z3.ax1x.com/2021/07/18/W3TtzR.jpg)

* ### CORS响应头实现跨域

![W3TdL6.jpg](https://z3.ax1x.com/2021/07/18/W3TdL6.jpg)

![W3T0eK.jpg](https://z3.ax1x.com/2021/07/18/W3T0eK.jpg)

































