---
title: 'react-virtual长列表优化 react-custom-scrollbars-2自定义滚动条'
date: 2022-11-15 14:20:00
permalink: '/posts/blogs/react-virtual长列表优化 react-custom-scrollbars-2自定义滚动条'
isTimeLine: true
# sidebar: true
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - React
 - 性能优化
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---





# 针对大数据量的渲染优化库：react-virtual(List)的基本使用

## react-virtual库的安装及引用

### 安装

github地址：[https://github.com/bvaughn/react-virtualized](https://github.com/bvaughn/react-virtualized)

使用命令：

```vim
npm install react-virtualized --save
```

安装过程可能会出现(**react版本库以及react-virtualized库之间的存在版本冲突问题**)

```vim
npm ERR! peer react@"^15.3.0 || ^16.0.0-alpha" from react-virtualized@9.22.3
```

则使用：

```js
npm install react-virtualized --legacy-peer-deps
```

### 使用

```jsx
// react-virtualized长列表优化
import 'react-virtualized/styles.css';
// List可用于渲染列表内需要重复渲染的节点，
import List from 'react-virtualized/dist/commonjs/List';
// AutoSizer库可以以用于自动获取子List所在父级的宽高，以回调参数的方式传递给List
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';


export default class index extends Component {
  constructor(props: any) {
    super(props);
    
    this.state = {
      // 生成长度为1000的随机数组
      list: new Array(1000).fill(Math.rendom(0, 1)* 100.toFixed(0))
    }
    
    this.rowRenderer = this.rowRenderer.bind(this);
  }
  
  // rowRenderer返回需要重复进行渲染的节点
  rowRenderer(arg: { key: Key, index: number, isScrolling: unknown, isVisible: any, style: any }) { // 此处为ts写法，js可直接使用对象解构，在函数内使用
    return (
      // stlye一定要用上!!!，否则会出现列表闪动、样式错误的问题
      <div key={arg.key} style={arg.style}>
        {arg.index}
        {this.state.list[index]}
      </div>
    )
  }
  
  render() {
    return (
      <AutoSizer>
        {({ width, height }) => ( // 此处width，height为AutoSizer自动获取的父级高度，List可采用也可自定义给定List的高度
          <List
            width={width} // 定义列表宽度
            height={height}  // heihgt定义了实际会动态渲染的列表高度，并不是设置为行高*行数，这样的话达不到动态渲染的效果
            rowHeight={30}   // 定义每个item的高度
            rowCount={this.props.datalist.length} // 需要渲染的列表条数，同时也相当于规定了会渲染的数据条数
            rowRenderer={this.rowRenderer} // 需要重复渲染的节点
          />
        )}
      </AutoSizer>
    )
  }
}
```

其他用法及细节参考：[使用文档](https://github.com/bvaughn/react-virtualized/blob/master/docs/README.md)

# react自定义滚动条使用

https://blog.csdn.net/tuzi007a/article/details/122989456

为什么需要自定义滚动条？

1. 应用场景：在弹窗内渲染列表，列表元素点击后弹窗将会关闭，如果此时对列表自带滚动条进行拖动，拖动结束后弹窗也会被触发关闭，那么一个独立于列表之外的滚动条就很有存在的必要了
2. react-custom-scrollbar-2则是独立于列表元素之外的滚动条，可自定义功能丰富
3. 流畅的本机浏览器滚动
4. 移动设备的本机滚动条
5. [完全可定制](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/customization.md)
6. [自动隐藏](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/usage.md#auto-hide)
7. [自动高度](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/usage.md#auto-height)
8. [通用](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/usage.md#universal-rendering)（在客户端和服务器上运行）
9. `requestAnimationFrame` 60fps
10. 没有多余的样式表
11. 经过良好测试，代码覆盖率100％
12. [基本使用：](https://www.cnblogs.com/Ewarm/p/12016810.html)


```jsx
import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        onScroll={this.handleScroll}
        onScrollFrame={this.handleScrollFrame}
        onScrollStart={this.handleScrollStart}
        onScrollStop={this.handleScrollStop}
        onUpdate={this.handleUpdate}
        renderView={this.renderView}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderThumbVertical={this.renderThumbVertical}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax={200}
        thumbMinSize={30}
        universal={true}
        {...this.props}>
    );
  }
}
```

All properties are documented in the [API docs](https://github.com/malte-wessel/react-custom-scrollbars/blob/master/docs/API.md)

