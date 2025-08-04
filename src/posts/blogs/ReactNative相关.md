---
title: 'ReactNative相关'
date: 2025-07-08 18:40:00
permalink: '/posts/blogs/ReactNative相关'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
 - react-native
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---



##  

### 官方文档、环境配置

https://www.react-native.cn/

### 初始启动

1. 插拔数据线
2. adb reverse tcp:8081 tcp:8081
3. yarn dev
4. 手机点开app


删除当前文件夹下所有以build命名的文件夹及内部文件

```powershell
Get-ChildItem -Path . -Recurse -Directory -Filter "build" | Remove-Item -Recurse -Force
```


### 重连手机

1. 插拔数据线
2. `adb reverse tcp:8081 tcp:8081`  (返回提示8081则为正确连接)
3. `adb devices`可查看当前可用设备
4. `yarn start` (`yarn start --reset-cache`可清除 Metro 缓存)
5. 手机点开app
6. 键入r，重加载app(已连接的情况下，可能需要多点击几次reload app或r，手机重进app)
7. 键入d(或者摇晃手机)，手机上会出现调试栏目，点击debug，跳转到浏览器`http://localhost:8081/debugger-ui/` 可查看开发打印信息(或关闭浏览器自动默认调试页：http://localhost:8081/debugger-ui/，然后重跑重开应用，React Native Debugger调试工具内执行Edit -> Redo)


### 真机远程(借用抓包工具filddler)

1. 手机装好app
2. 电脑启动热点，手机连接(注意代理地址和电脑端ipconfig的地址一致如：192.168.1.129)，此时使用`adb devices` 和`adb reverse tcp:8081 tcp:8081` 无法看到有效设备为正常情况
3. 电脑如果有开启了fildder**抓包工具**，手机上连接的热点也需**手动设置好代理地址**，和配置好和**抓包工具相同的端口**，执行yarn start启动应用才能连接上，否则会一直提示`No apps connected. Sending "reload" to all React Native apps failed. Make sure your app is running in the simulator or on a phone connected via USB.`

### 手机连接app启动失败

1. 非特殊情况，手机不要连接电脑热点

### react-native-debugger(必用)

[react-native-debugger](https://github.com/jhen0409/react-native-debugger/releases)

![](https://s21.ax1x.com/2025/07/29/pVY2Uj1.png)

#### 常见问题

当React Native Debugger提示 **Another debugger is already connected** 时，先关闭浏览器自动默认调试页：http://localhost:8081/debugger-ui/，然后重跑重开应用，React Native Debugger内执行Edit -> Redo

![](https://s21.ax1x.com/2025/07/29/pVY5G4K.png)

* 移除不影响流程的警告和报错

![](https://s21.ax1x.com/2025/07/30/pVtFzdI.png)

* 当启动了react-native-debugger时可能会出现**影响虚拟机交互**如长按拖动的功能
* **React Native 默认不监控网络请求**，需要手动添加拦截代码后react-native-debugger才能看到应用接口请求
* https://chat.deepseek.com/a/chat/s/360c0792-bfdc-4241-bc84-a7d6ff6dc7d5

index.js：

```js
// ⚠️ 添加网络请求监控（开发环境生效） React Native Debugger调试用
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
}
```

### 外部虚拟机

#### [genymotion](https://www.genymotion.com/)

虚拟机启动应用打不开：重启虚拟机

#### 常见问题

代码修改无效、app运行卡顿，无法点击：

1. 清除app后台重进尝试
2. 清理app应用缓存或重装app


出现阻断性错误记得**切换查看报错**，或者重走以上流程

### 常用方法

#### **新建View节点**

View节点宽高无法继承，通常使用`Dimensions.get('window').width` `Dimensions.get('window').height`

```js
<View style={styles.test}></View>

test {
  position: 'relative',
  flex: 1,
}
```

#### 返回监听

**hardwareBackPress**

```js
import { Text, StyleSheet, View, Image, NativeModules, BackHandler } from 'react-native'
import React, { Component, useEffect } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const TabChange = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }
  }, []);

  const handleBackPress = () => {
    // 根据需求实现返回键的逻辑，例如导航返回上一页
    NativeModules.IntentModule.back();
  };

  const goBack = () => {
    NativeModules.IntentModule.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.backView} onTouchStart={goBack}>
          <Image
            source={require('~image/common/back.png')}
            style={styles.back}
          />
        </View>
        <Text style={styles.title}>栏目切换</Text>
      </View>
    </View>
  )
}

export default TabChange

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: statusBarHeight,
  },
})
```

#### 全局事件总线EventEmit

/utils/eventBus.js

```js
import { EventEmitter } from 'events';

export const EventBus = new EventEmitter();
EventBus.setMaxListeners(20);
```

```js
import { EventBus } from '~/util/eventBus';

class TestPage extends React.PureComponent {
  componentDidMount() {
    EventBus.on('refreshTab', (args) => {
      console.log("%c Line:129 🥛 refreshTab", "color:#33a5ff", args);
      this.showCurrentTab()
    });
  }
  
  componentWillUnmount() {
    EventBus.off('refreshTab');
  }
}
```

```js
class OtherPage extends React.PureComponent {
  componentDidMount() {
    EventBus.emit('refreshTab', { test: '123abc' });
  }
}
```

### 组件内部常用命令

创建组件：rnc、rncs、

导入组件：imp

### StyleSheet

flexDirection: columns、columns-reverse、row、row-reverse

```react
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});
```

#### Flexbox

#### ScroolView滚动

嵌套View

#### Dimensions设备信息获取

#### Plateform平台

```react
<View style={{ height: Platform.OS === 'ios' ? 0 : 40 }}></View>
```

#### WebView内置浏览器

```
yarn add react-native-webview
```

[react-native-webview官网](https://github.com/react-native-webview/react-native-webview)

#### Picker选择

```
yarn add @react-native-picker/picker
```

[react-native-picker官网](https://github.com/react-native-picker/picker)

注意：不同版本的配置方式不同，以及不同平台之间使用的差异

#### Swiper轮播

```
yarn add react-native-swiper
```

[react-native-swiper官网](https://github.com/leecade/react-native-swiper)

swiper组件通常使用`<ScrollView>`进行包裹，而不是`<View>` ，否则会出现报错

#### AsyncStorage缓存

相当于web的localStorage

```
yarn add @react-native-async-storage/async-storage
```

[react-native-async-storage官网](https://github.com/react-native-async-storage/async-storage)

[文档](https://react-native-async-storage.github.io/async-storage/docs/install/)

#### Geolocation定位

```
yarn add @react-native-community/geolocation
```

[react-native-geolocation官网](https://github.com/michalchudziak/react-native-geolocation)

`AndroidManifest.xml` 在项目`/android/app/src/main`目录下

[getcurrentposition](https://github.com/michalchudziak/react-native-geolocation?tab=readme-ov-file#getcurrentposition)

```js
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(
  info => console.log(info),
  error => console.log(error),
  {
    timeout: 10000
  }
);
```

#### Camera

react-native-camera

```
yarn add react-native-vision-camera
```

[react-native-camera官网](https://github.com/mrousavy/react-native-vision-camera)

官网文档：https://react-native-vision-camera.com/docs/guides

#### ImagePicker图片选择

```
yarn add react-native-image-picker
```

[react-native-image-picker官网](https://github.com/react-native-image-picker/react-native-image-picker)

### 路由与导航

[react-navigation官网](https://github.com/react-navigation/react-navigation)

[csdn指导方案](https://blog.csdn.net/weixin_49132888/article/details/143501921)

```
yarn add @react-navigation/native
```

```js
this.props.navigation.navigate('xxx', { KEY: '' })

this.props.navigation.push('xxx', { KEY: '' })

this.props.route.params.KEY

this.props.route.params.KEY
```

#### 矢量图标库


[react-native-vector-icons官网](https://github.com/oblador/react-native-vector-icons)

包含Ionicons、FontAwesome、AntDesign图标库


