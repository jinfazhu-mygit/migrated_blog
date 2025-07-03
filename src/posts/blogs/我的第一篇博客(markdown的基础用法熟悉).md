---
title: '我的第一篇博客(markdown的基础用法熟悉)'
date: 2021-4-20 18:00:58
permalink: '/posts/blogs/我的第一篇博客(markdown的基础用法熟悉)'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 其他
tag:
 - markdown grammar
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---
## MarkDown语法

### 1.标题

# \# 一级标题 => 一级标题

## \##二级标题 => 二级标题

### \### 三级标题 => 三级标题

#### \#### 四级标题 => 四级标题

##### \##### 五级标题 => 五级标题

###### \###### 六级标题 => 六级标题

### 2.字体与删除线

```java
*斜体*
**粗体**
***粗斜体***
~~我被删除~~
```

*斜体*
**粗体**
***粗斜体***

~~我被删除~~

### 3.分割线与换行

```java
---
***
这里开始<br/>换行
我是上一行<br/>我是下一行
```

---

***

这里开始<br/>换行
我是上一行<br/>我是下一行

### 4.引用

```java
>这是引用的内容
>这是引用的内容
>>这是引用的内容
>>>这是引用的内容
>>>>这是引用的内容
```

>这是引用的内容
>这是引用的内容
>>这是引用的内容
>>
>>>这是引用的内容
>
>>>>这是引用的内容

### 5.图片、音频、视频的嵌入

#### 5.1图片：

```java
![图片名称](图片路径)  //路径可在线引用和本地引用
```

![看我在线引用](https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=829001561,3501283555&fm=26&gp=0.jpg)

- 上面的是在线引用的图片

![看我本地引用](/naruto.jpg)

- 上面的鸣人是本地引用的

#### 5.2音频

```html
<audio id="audio" controls="" preload="none">
  <source id="mp3" src="https://assets.smallsunnyfox.com/music/2.mp3">
</audio>
```

<audio id="audio" controls="" preload="none">
  <source id="mp3" src="https://assets.smallsunnyfox.com/music/2.mp3">
</audio>

#### 5.3视频

```html
<video id="video" controls="" preload="none" poster="">
      <source id="mp4" src="" type="video/mp4">
</video>
poster链入视频封面
```

### 6.超链接

```java
[链接名称](链接地址)
```

[我的github](https://github.com/jinfazhu-mygit)

[码云](https://gitee.com/)

[阿里云](https://aliyun.com/)

### 7.有序列表与无序列表

```java
- 第一条无序列表(注意有空格,无序列表用-+*都可以表示出来)
- 第二条无序列表
- 第三条无序列表

- 第一层无序列表(列表嵌套可灵活使用，无需嵌有序，有序嵌无序，有序嵌有序)
   - 第二层无序列表
   - 第二层无序列表

1. 第一条有序列表(注意有空格)
2. 第二条有序列表
3. 第三条有序列表
```

- 第一条无序列表
- 第二条无序列表
- 第三条无序列表



- 第一层无序列表
   - 第二层无序列表
   - 第二层无序列表



1. 第一条有序列表
2. 第二条有序列表
3. 第三条有序列表

### 8.表格

要使用个人建议直接用Typora右键生成，按下Ctrl+'/',即可拿到表格源码！

### 9.嵌入代码

```java
Typora使用(```语言)，即可嵌入代码，语言可选
```



### 10.流程图

```java
​```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&```
```

```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&```
```

### 11.Emoji

```java
:horse:  :tada: :smile:等其他各种Emoji
```

:horse:   :tada: :smile:


```other
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::
```

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

