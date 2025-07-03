---
title: 'Git'
date: 2021-9-23 18:00:00
permalink: '/posts/blogs/Git'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - git
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---




## [详细介绍git](https://mp.weixin.qq.com/s/Bf7uVhGiu47uOELjmC5uXQ)

## git常用命令

### 前言

`git `的操作可以通过命令的形式如执行，日常使用就如下图6个命令即可

![xWyjJO.png](https://s1.ax1x.com/2022/10/26/xWyjJO.png)

### 本地代码版本回退(重点)

1. git reflog查看历史操作编号
2. git reset --soft [操作编号] 返回对应的暂存状态，多用于撤销上一步commit，回到原来**add之后**的状态
3. git reset --mixed [操作编号] 返回对应的暂存状态，多用于撤销上一步commit，回到原来**add之前**的状态
4. git reset --hard [操作编号]  返回对应版本，慎用！将会改变和去掉在本地的代码

![pit6NP1.png](https://z1.ax1x.com/2023/11/17/pit6NP1.png)

### 常用命令有哪些

#### 配置

`Git `自带一个 `git config` 的工具来帮助设置控制 `Git `外观和行为的配置变量，在我们安装完`git`之后，第一件事就是设置你的用户名和邮件地址

后续每一个提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改

设置提交代码时的用户信息命令如下：

- git config [--global] user.name "[name]"
- git config [--global] user.email "[email address]"

#### 启动

一个`git`项目的初始有两个途径，分别是：

- git init [project-name]：创建或在当前目录初始化一个git代码库
- git clone url：下载一个项目和它的整个代码历史

#### 日常基本操作

在日常工作中，代码常用的基本操作如下：

- git init 初始化仓库，默认为 master 分支
- git remote add origin ___
- git clone ___
- git pull <远程仓库名> <远程分支名> 拉取远程仓库的分支与本地当前分支合并
- git pull <远程仓库名> <远程分支名>:<本地分支名> 拉取远程仓库的分支与本地某个分支合并
- git status 查看当前分支状态
- git diff 查看当前代码 add后，会 add 哪些内容
- git add . 提交全部文件修改到缓存区
- git add <具体某个文件路径+全名> 提交某些文件到缓存区
- git restore --staged `<file>` 将某文件移除暂存区


- git diff --staged查看现在 commit 提交后，会提交哪些内容
- git commit -a -m"<注释>" === git add. + git commit -m"<注释>" 


- git commit -m "<注释>" 提交代码到本地仓库，并写提交注释
- git commit -v 提交时显示所有diff信息
- git commit --amend [file1][file2] 重做上一次commit，并包括指定文件的新变化
- git log查看提交日志和对应的**校验和**
- **git log --pretty=oneline** 优化显示在一行
- git log --pretty=oneline --graph

![zzJdE9.png](https://s1.ax1x.com/2022/12/27/zzJdE9.png)

* ​

关于提交信息的格式，可以遵循以下的规则：

- feat: 新特性，添加功能
- fix: 修改 bug
- refactor: 代码重构
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改
- test: 测试用例修改
- chore: 其他修改, 比如构建流程, 依赖管理

#### 分支操作

- 分支查看
  - git branch 查看本地所有分支
  - git branch -r 查看远程所有分支
  - git branch -a 查看本地和远程所有分支
- 新建分支
  - git branch <新分支名> 基于当前分支，新建一个分支
  - git checkout -b <新分支名> 把基于当前分支新建分支，并切换为这个分支
  - git checkout --orphan <新分支名> 新建一个空分支（会保留之前分支的所有文件）
- 删除分支
  - git branch -D <分支名> 删除本地某个分支
  - git push <远程库名> :<分支名> 删除远程某个分支
  - git branch <新分支名称> <提交ID> 从提交历史恢复某个删掉的某个分支
- 切换分支
  - git branch -m <原分支名> <新分支名> 分支更名
  - git checkout <分支名> 切换到本地某个分支
  - git checkout <远程库名>/<分支名> 切换到线上某个分支
- 合并分支
  - git merge origin/<分支名1>  将**远程仓库中的分支1代码合并到远程当前所在分支**
  - git merge --abort 合并分支出现冲突时，取消合并，一切回到合并前的状态

#### 远程同步

远程操作常见的命令：

- git fetch [remote] 下载远程仓库的所有变动
- git remote -v 显示所有远程仓库
- git pull remote branch 拉取远程仓库的分支与本地当前分支合并
- git fetch 获取线上最新版信息记录，不合并
- git push remote branch 上传本地指定分支到远程仓库
- git push -u origin master
  - 加了参数-u后，以后即可直接用git push代替git push origin master
- git push --set-upstream origin <新分支1>  创建远程新分支1并推送当前分支代码到新分支1，同时建立与远端分支的关联关系
- git push [remote] --force 强行推送当前分支到远程仓库，即使有冲突
- git push [remote] --all 推送所有分支到远程仓库

#### 撤销

- git checkout [file] 恢复暂存区的指定文件到工作区
- git checkout [commit][file] 恢复某个commit的指定文件到暂存区和工作区
- git checkout . 恢复暂存区的所有文件到工作区

##### [git丢弃操作](https://blog.csdn.net/weixin_44720938/article/details/127726964)

##### 回退

* git通过HEAD指针记录当前版本

* **我们可通过改变HEAD的指向，修改回退版本**：
  * **git reset --hard HEAD**^回退到上一个版本
  * git reset --hard HEAD^^回退到上上个版本
  * git reset --hard HEAD~10回退到前10个版本
  * **git reset --hard <校验和>**回退到某个校验和对应的版本
* 回退后再通过**git reflog --pretty=oneline**可查看操作记录拿到包括操作记录在内的校验和

- git reset [commit] 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
- git reset --hard 重置暂存区与工作区，与上一次commit保持一致
- git reset [file] 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
- git revert [commit] 后者的所有变化都将被前者抵消，并且应用到当前分支

> `reset`：真实硬性回滚，目标版本后面的提交记录全部丢失了
>
> `revert`：同样回滚，这个回滚操作相当于一个提价，目标版本后面的提交记录也全部都有

#### 存储操作

你**正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态**，而你想**转到其他分支上进行一些工作**，但又**不想提交这些杂乱的代码，这时候可以将代码进行存储**

- git stash 暂时将未提交的变化移除
- git stash pop 取出储藏中最后存入的工作状态进行恢复，会删除储藏
- git stash list 查看所有储藏中的工作
- git stash apply <储藏的名称> 取出储藏中对应的工作状态进行恢复，不会删除储藏
- git stash clear 清空所有储藏中的工作
- git stash drop <储藏的名称> 删除对应的某个储藏


## git fetch和git pull的区别

![xWhADe.png](https://s1.ax1x.com/2022/10/26/xWhADe.png)

* 可以看到，**`git fetch`是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中**

* 而`git pull` 则是**将远程主机的最新内容拉下来后直接合并**，即：**`git pull = git fetch + git merge`，这样可能会产生冲突，需要手动解决**

* 在我们本地的`git`文件中对应也存储了`git`**本地仓库分支的`commit ID `**和 **跟踪的远程分支的`commit ID`**，对应文件如下：

  - .git/refs/head/[本地分支]
  - .git/refs/remotes/[正在跟踪的分支]

  使用 `git fetch`更新代码，**本地的库中`master`的`commitID`不变**

  但是与**`git`上面关联的那个`orign/master`的`commit ID`发生改变**

  **这时候我们本地相当于存储了两个代码的版本号，我们还要通过`merge`去合并这两个不同的代码版本**

![xWhK8P.png](https://s1.ax1x.com/2022/10/26/xWhK8P.png)

也就是`fetch`的时候本地的`master`没有变化，但是与远程仓关联的那个版本号被更新了，接下来就是**在本地`merge`合并这两个版本号的代码**

相比之下，使用`git pull`就更加简单粗暴，会将本地的代码更新至远程仓库里面最新的代码版本，如下图：

![xWhQv8.png](https://s1.ax1x.com/2022/10/26/xWhQv8.png)

### 用法

一般远端仓库里有新的内容更新，当我们需要把新内容下载的时候，就使用到`git pull`或者`git fetch`命令

#### fetch

例如从远程的`origin`仓库的`master`分支下载代码到本地并新建一个`temp`分支

```git
git fetch origin master:temp
```

**如果上述没有冒号，则表示将远程`origin`仓库的`master`分支拉取下来到本地当前分支**

这里`git fetch`不会进行合并，执行后需要手动执行`git merge`合并，如下：

```git
git merge temp
```

#### pull

例如将远程主机`origin`的`master`分支拉取过来，与本地的`branchtest`分支合并，命令如下：

```git
git pull origin master:branchtest
```

同样如果上述没有冒号，则表示将远程`origin`仓库的`master`分支拉取下来与本地当前分支合并

### 区别

相同点：

- 在作用上他们的功能是大致相同的，都是起到了更新代码的作用

不同点：

- git pull是相当于从远程仓库获取最新版本，然后再与本地分支merge，即**git pull = git fetch + git merge**
- 相比起来，git fetch 更安全也更符合实际要求，在 merge 前，我们可以查看更新情况，根据实际情况再决定是否合并









## git拉取项目代码

### 拉取


1. 新建一个文件夹，进入，右键git bash here

2. 执行git init进行初始化

   ![4wNxht.png](https://z3.ax1x.com/2021/09/23/4wNxht.png)

3. 创建远程连接：git remote add origin ___

   ![4warsU.png](https://z3.ax1x.com/2021/09/23/4warsU.png)

   ![4wUUgK.png](https://z3.ax1x.com/2021/09/23/4wUUgK.png)

4. **拉取远程分支到本地**：**git fetch origin dev** (dev为远程仓库的分支名)；这里个人建议直接**git fetch origin** 拉取所有存在的远程分支，之后用**Sourcetree**的时候会更快乐

   ![4wdLBF.png](https://z3.ax1x.com/2021/09/23/4wdLBF.png)

5. **本地创建分支并切换到该分支**：**git checkout -b zjf**(本地分支名称)

6. **拉取远端某个分支的代码到刚才创建的本地分支**(zjf)：**git pull origin dev**(远程分支名)

  ![4w0lxx.png](https://z3.ax1x.com/2021/09/23/4w0lxx.png)

7. 现在已经可以在新创建的文件夹下查看到拉取的代码了

   ![4w0oLT.png](https://z3.ax1x.com/2021/09/23/4w0oLT.png)


### 推送

#### 推送本地仓库远程仓库版本问题报错解决

Error: **[rejected] main -＞ main (non-fast-forward)**error: failed to push some refs to
Solution:  **git pull origin main --allow-unrelated-histories**

```js
// 查看变化文件
git status
// 添加到版本管理
git add .
// 提交到本地仓库remotes文件夹(版本库)
git commit -m "submit info"
// 拉取远程代码(本地代码拉取远程，同步) 针对分支拉取
git pull origin dev
git pull --rebase origin dev  // git push origin失败时使用(如：文件不同步)
// 推送 针对分支推送
git push origin dev
git push -u origin dev
```

* 代码取消关联
* git remote remove origin


## git其他常用命令补充：

* **git branch**：**查看**本地已检出的分支，和查看当前正使用的分支是哪个

* **git branch __**：本地**新建该分支**(不切换至该分支)

* **git branch -D __**：**删除**某个**本地分支**

* **git checkout ___**：检出并**切换**至**已拉取的远程分支**，执行后可git branch查看到

  ![4wse61.png](https://z3.ax1x.com/2021/09/23/4wse61.png)

* **git checkout -b __**：本地**新建**一个分支，**并切换**至该分支

  ![4wyS9H.png](https://z3.ax1x.com/2021/09/23/4wyS9H.png)

* **git push origin jf:jf**：将jf**分支推送到远程**

  冒号前面的jf：推送本地的dev分支到远程origin

  冒号后面的jf：远程origin没有会自动创建

* **git push origin --delete jf**：**删除远程仓库**的jf**分支**

#### 更多其他命令不予补充，安利[Sourcetree](https://www.sourcetreeapp.com/)，可视化git代码管理

## github推送数据问题Connection reset by 20.205.243.166 port 22

* ping github.com出现

![xWdBuV.png](https://s1.ax1x.com/2022/10/26/xWdBuV.png)

* 推送代码出现：Connection reset by 20.205.243.166 port 22

### 解决方案一：

切换电脑网络，连接手机wifi进行推送

### 解决方案二：

* C:\Windows\System32\drivers\etc
* HOSTS文件内加上

```cmd
192.30.255.112  github.com git 
185.31.16.184 github.global.ssl.fastly.net
```

* ping github.com

![xWd2C9.png](https://s1.ax1x.com/2022/10/26/xWd2C9.png)



## [生成ssh密钥](https://blog.csdn.net/qq_35495339/article/details/92847819?ops_request_misc=&request_id=&biz_id=102&utm_term=ssh-keygen%20-t%20rsa%E7%94%9F%E6%88%90%20github&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-92847819.142^v60^pc_search_tree,201^v3^add_ask,213^v1^control&spm=1018.2226.3001.4187)

