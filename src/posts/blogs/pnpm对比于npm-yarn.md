---
title: 'pnpm对比于npm-yarn'
date: 2022-11-2 15:00:00
permalink: '/posts/blogs/pnpm对比于npm-yarn'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - pnpm
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

## pnpm对比于npm、yarn

### [硬链接与软链接](https://blog.csdn.net/gao_zhennan/article/details/79127232?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-79127232-blog-112852334.pc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-79127232-blog-112852334.pc_relevant_recovery_v2&utm_relevant_index=2)

* 硬链接实现

```vim
ln 源文件 目标文件
```

* 软链接实现

```vim
ln -s 源文件 目标文件
```

**总结：**

* **硬链接等同于cp -p(复制) + 同步更新**
* **软链接像快捷方式，方便我们打开源文件**

### 删除源文件对硬链接文件和软链接文件的影响

和windows一样，**删除源文件，快捷方式也用不了(软链接文件用不了)**。但是**删除源文件，为什么硬链接文件还可以查看**呢？

#### i节点

* **i节点是文件和目录的唯一标识**，每个文件和目录必有i节点，不然操作系统就无法识别该文件或目录，就像没有上户口的黑户。
* 硬链接文件和源文件i节点号相同，并且一个i节点可以对应多个文件名。

![xHwdDe.png](https://s1.ax1x.com/2022/11/02/xHwdDe.png)

* **删除了jys,只是删除了从920586到jys的映射关系**，**不影响它和jys.hard的映射**关系。
* 此图也解释了硬链接的同步更新，**对源文件修改，操作系统只认i节点**，于是操作系统就将修改内容写进所有i节点相同名字不同的文件。
* 相反，修改硬链接文件，操作系统也将同步的将硬链接对应的i节点所有文件都进行修改

## pnpm

### 理解图片即可

![xHBDpt.png](https://s1.ax1x.com/2022/11/02/xHBDpt.png)

### 总结

* **npm2 是通过嵌套的方式管理 node_modules** 的，会有同样的依赖复制多次的问题。
* **npm3+ 和 yarn 是通过铺平的扁平化的方式来管理 node_modules**，解决了嵌套方式的部分问题，但是引入了**幽灵依赖(可以引用非用户手动引入的包)**的问题，并且同名的包只会提升一个版本的，其余的版本依然会复制多次。
* pnpm 则是用了另一种方式，不再是复制了，而是都从**全局 store 硬连接到 node_modules/.pnpm**，然后之间**通过软链接来组织依赖关系**。