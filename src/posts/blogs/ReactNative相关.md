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

### 官方文档

https://www.react-native.cn/

### 重连手机

1. 插拔数据线
2. adb reverse tcp:8081 tcp:8081
3. yarn start
4. r
5. 手机点开app



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


