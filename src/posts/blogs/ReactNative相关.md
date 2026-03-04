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

### 开发过程如遇到截断性报错，请按照报错源提示路径，冷静细心查找报错原因，解决问题!!!

### 初始启动

1. 插拔数据线
2. adb reverse tcp:8081 tcp:8081
3. yarn dev(重要：**开发模式下必须先确保手机打开了usb调试**)
4. 手机点开app


删除当前文件夹下所有以build命名的文件夹及内部文件

```powershell
Get-ChildItem -Path . -Recurse -Directory -Filter "build" | Remove-Item -Recurse -Force
```


### 重连手机

1. 插拔数据线(**必须确认手机打开了开发者模式，且usb调试也已打开!!!**)
2. `adb reverse tcp:8081 tcp:8081`  (返回提示8081则为正确连接)
3. `adb devices`可查看当前可用设备(如以上两个命令无效，请再次确认手机打开了开发者模式，且usb调试也已打开)
4. `yarn start` (`yarn start --reset-cache`可清除 Metro 缓存)
5. 手机点开app
6. 键入r，重加载app(已连接的情况下，可能需要多点击几次reload app或r，手机重进app)
7. 键入d(或者摇晃手机)，手机上会出现调试栏目，点击debug，跳转到浏览器`http://localhost:8081/debugger-ui/` 可查看开发打印信息(或**关闭浏览器自动默认调试页**：http://localhost:8081/debugger-ui/， **运行React Native Debugger调试工具**，然后重跑重开应用，React Native Debugger调试工具内执行Edit -> Redo)


### 真机远程(借用抓包工具filddler)

1. 手机装好app
2. 电脑启动热点，手机连接(注意代理地址和电脑端ipconfig的地址一致如：192.168.1.129)，此时使用`adb devices` 和`adb reverse tcp:8081 tcp:8081` 无法看到有效设备为正常情况
3. 电脑如果有开启了fildder**抓包工具**，手机上连接的热点也需**手动设置好代理地址**，和配置好和**抓包工具相同的端口**，执行yarn start启动应用才能连接上，否则会一直提示`No apps connected. Sending "reload" to all React Native apps failed. Make sure your app is running in the simulator or on a phone connected via USB.`

###  通过adb命令来连接android设备装包

https://share.note.youdao.com/s/BjBh1Pyf

1、连接设备：adb connect 手动输入的ip地址

2、安装包： adb install 包地址

### 手机连接app启动失败

1. 非特殊情况，手机不要连接电脑热点

### react-native-debugger(必用)

[react-native-debugger](https://github.com/jhen0409/react-native-debugger/releases)

![](https://s21.ax1x.com/2025/07/29/pVY2Uj1.png)

#### 常见问题

当React Native Debugger提示 **Another debugger is already connected** 时，先关闭浏览器自动默认调试页：http://localhost:8081/debugger-ui/， 然后重跑重开应用，React Native Debugger内执行Edit -> Redo

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
2. **清理app应用数据缓存(有效)**或重装app


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
    // 事件监听必须通过函数名来指定，因为移除监听时需要通过名称指定的函数才能正确进行移除
    EventBus.on('refreshTab', this.eventOnFn);
  }
  
  eventOnFn(args) {
      console.log("%c Line:129 🥛 refreshTab", "color:#33a5ff", args);
      this.showCurrentTab()
  }
  
  componentWillUnmount() {
    // EventBus.off移除时必需加上相应的监听函数
    EventBus.off('refreshTab', this.eventOnFn);
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

#### Text文本相关

```js
import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class TestPage extends Component {
  render() {
    return (
      <View style={styles.body}>
        <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.notice_title}>我是长文本</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    width: 200,
    height: 100
  },
  notice_title: {
    color: '#333333',
    fontSize: 15,
  }
})
```

#### ImageBackground背景图片

```js
<ImageBackground
  source={{ uri: 'https://s21.ax1x.com/2025/08/07/pVaP2GV.png' }}
  // source={{ uri: 'https://s21.ax1x.com/2025/08/07/pVaP2GV.png' }}
  resizeMode="stretch"
  style={styles.resource_bg}
>
  <LinearGradient
    colors={['#ebebebff', '#3b3b3bff']} // 渐变颜色数组
    start={{ x: 0, y: 0 }}        // 渐变起点（左侧中间）
    end={{ x: 0, y: 1 }}          // 渐变终点（右侧中间）
    style={styles.bottom_grey}>
    <Text style={styles.right_bottom}>1231</Text>
  </LinearGradient>
</ImageBackground>
```

#### LinearGradient渐变色

需熟悉LinearGradient的start end方向是如何运确定的

```js
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class TestPage extends Component {
  render() {
    return (
          <>
            <LinearGradient
              colors={['#FFE3C8', '#FFFCFC']} // 渐变颜色数组
              start={{ x: 0, y: 0.5 }}        // 渐变起点（左侧中间）
              end={{ x: 1, y: 0.5 }}          // 渐变终点（右侧中间）
              style={styles.body}
            >
              <Text>ChildLearnSituation</Text>
            </LinearGradient>

            <LinearGradient
              colors={['white', 'rgba(255, 255, 255, 0.5)', 'transparent', 'transparent', 'rgba(255, 255, 255, 0.5)', 'white']}
              locations={[0, 0.05, 0.2, 0.8, 0.95, 1]} // 设置渐变百分比位置colors数量需和locations的数量保持一致
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}          // 渐变终点（右侧中间）
              style={styles.linear_gradient}
              pointerEvents='none' // pointerEvents设置为none让触摸事件穿透LinearGradient，这样其内部节点可以接收到触摸事件。
            ></LinearGradient>
          </>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    width: 200,
    height: 100
  },
})
```

#### Modal弹窗

```js
import { Text, StyleSheet, View, Image, TouchableWithoutFeedback, Alert, Modal, Dimensions, ScrollView } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import BlockHeader from '~/page-component/home/BlockHeader'
import { useSelfPageStore } from '../SelfPageStore';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native';

const ChildLearnSituation = (props) => {
  const selfPageStore = props.selfPageStore;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState([
    { id: 1, name: "万知学", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 2, name: "李小萌", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 3, name: "张小明", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 4, name: "刘小华", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 5, name: "王小乐", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 6, name: "赵小雨", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 7, name: "赵小雨", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 8, name: "赵小雨", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
    { id: 9, name: "赵小雨", avatar: 'https://s21.ax1x.com/2025/07/29/pVY5G4K.png' },
  ]);

  useEffect(() => {
    // 初始化选择第一个孩子
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0]);
    }

    // 模拟数据加载
    getChildLearnSituationFn();
  }, []);

  const getChildLearnSituationFn = async () => {
    // 实际项目中这里会调用API获取数据
    // const res = await selfPageStore.getChildLearnSituationData()
    // selfPageStore.setChildLearnSituationData(res);

    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const handleSelectChild = (child) => {
    setSelectedChild(child);
  }

  const confirmSelection = () => {
    setModalVisible(false);
    // 这里可以添加保存选择的逻辑
  }

  return (
    <LinearGradient
      colors={['#FFE3C8', '#FFFCFC']} // 渐变颜色数组
      start={{ x: 0, y: 0.5 }}        // 渐变起点（左侧中间）
      end={{ x: 1, y: 0.5 }}          // 渐变终点（右侧中间）
      style={styles.body}
    >
      <View style={styles.situation_line}>
        <View style={styles.left_avatar_text}>
          {selectedChild && (
            <Image
              source={{ uri: selectedChild.avatar }}
              style={styles.avatar_image}
            />
          )}
          <View style={styles.center_text}>
            <View style={styles.top_text}>
              <View>
                <Text style={styles.top_left_text}>
                  {selectedChild ? selectedChild.name : '请选择孩子'}
                </Text>
              </View>
              <View><Text style={styles.top_right_text}>的学习情况</Text></View>
            </View>
            <Text style={styles.bottom_text}>点击切换其它孩子学习情况</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('~image/home/selfPage/switch_child.png')}
            style={styles.right_switch}
          />
        </TouchableOpacity>

        {/* 弹窗 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>切换孩子</Text>

              <ScrollView style={styles.childList}>
                {children.map((child) => (
                  <TouchableOpacity
                    key={child.id}
                    style={[
                      styles.child_item,
                      selectedChild?.id === child.id && styles.selected_child
                    ]}
                    onPress={() => handleSelectChild(child)}
                  >
                    <View style={styles.child_info}>
                      <Image
                        source={{ uri: child.avatar }}
                        style={styles.child_avatar}
                      />
                      <Text style={styles.child_name}>{child.name}</Text>
                    </View>
                    {selectedChild?.id === child.id ? (
                      <Image
                        source={require('~image/home/icon-checked.png')}
                        style={styles.iconCheck}
                      ></Image>
                    ) : (
                      <Image
                        source={require('~image/home/icon-check.png')}
                        style={styles.iconCheck}
                      ></Image>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.btns}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.resetTxt}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.ok]}
                  onPress={confirmSelection}
                >
                  <Text style={styles.okTxt}>确定</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  )
}

const withStore = (BaseComponent) => (props) => {
  const selfPageStore = useSelfPageStore();
  return <BaseComponent {...props} selfPageStore={selfPageStore} />;
};

export default withStore(ChildLearnSituation)

const styles = StyleSheet.create({
  body: {
    padding: 11,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
    boxSizing: 'border-box',
    padding: 10
  },
  situation_line: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left_avatar_text: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar_image: {
    width: 54,
    height: 54,
    marginRight: 10,
    borderRadius: 10
  },
  center_text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 6,
    position: 'relative',
    top: 1
  },
  top_text: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5
  },
  top_left_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E4281D',
  },
  top_right_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bottom_text: {
    color: '#999',
    fontSize: 12
  },
  right_switch: {
    width: 26,
    height: 26
  },
  // 弹窗相关样式
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.7,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15
  },
  childList: {
    width: '100%',
    marginBottom: 15,
  },
  child_item: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  selected_child: {
    backgroundColor: '#FFF8F8',
  },
  child_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCheck: {
    height: 20,
    width: 20,
  },
  child_avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 15,
  },
  child_name: {
    fontSize: 16,
    color: '#333',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14,
    width: '100%',
    paddingTop: 10,
  },
  btn: {
    width: 80,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fe483d',
    borderRadius: 18,
  },
  ok: {
    backgroundColor: '#fe483d',
    borderColor: '#fe483d',
  },
  resetTxt: {
    color: '#fe483d',
    fontWeight: '500',
  },
  okTxt: {
    color: '#fff',
    fontWeight: '500',
  },
})
```

#### tab切换组件(react-native-tab-view)

```js
import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Text } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

class HomePage extends React.PureComponent {
  static propTypes = {
    itemWidth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showTabbar: false,
      index: 0,
      routes: [
        { key: '1', title: '推荐' },
        { key: '2', title: '个人主页' },
      ],
      sliderWidth: 0,
    };
    // this.showCurrentTab();
  }

  renderRecommendContent = () => {
    return <Text>推荐页</Text>;
  };

  renderSelfContent = () => {
    return <Text>个人主页</Text>;
  }

  // tabbar栏目
  _renderTabBar = (props) => {
    // console.log("%c Line:313 🍌 props", "color:#ea7e5c", props);
    return <>{
      this.state.showTabbar ? <TabBar
        scrollEnabled={true}
        {...props}
        gap={0}
        style={{
          height: 40,
          backgroundColor: '#fff',
          shadowColor: '#fff',
          borderWidth: 0,
          elevation: 0,
          // marginBottom: 10,
          width: this.state.sliderWidth - 40,
          paddingRight: 16
        }}
        indicatorStyle={{
          display: 'none',
        }}
        tabStyle={{
          position: 'relative',
          padding: 0,
          width: 'auto',
          marginRight: 12,
        }}
        contentContainerStyle={{}}
        pressColor={'#fff'}
        onTabPress={({ route, preventDefault }) => {
          if (route.key === 'third' || route.key === 'fourth') {
            return false
          } else return true
        }}
        renderLabel={({ route, focused, color }) => {
          // console.log("%c Line:346 🥚 route", "color:#fca650", route);
          return (
            <View
              style={{
                height: 40,
                position: 'relative',
                bottom: 4,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 8,
                paddingRight: 8,
                backgroundColor: '#fff',
                shadowColor: '#ffffff',
              }}
            >
              <Text
                style={{
                  color: focused ? '#E42419' : '#333333',
                  fontSize: 16,
                  fontWeight: focused ? '800' : '400',
                }}
                numberOfLines={1}
              >
                {route.title}
              </Text>
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    height: 3,
                    width: 16,
                    // left: '50%',
                    // marginLeft: -9,
                    bottom: 0,
                    borderRadius: 2,
                    backgroundColor: '#E42419',
                  }}
                ></View>
              )}
            </View>
          );
        }}
      /> : null
    }</>;
  };

  _handleIndexChange = index => this.setState({ index });

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  render() {
    return (
      <RootSiblingParent>
        <View style={[styles.homePage]}>
          {/* tab栏目 tab行 + 下方内容栏 */}
          <View style={styles.tab_line_view}>
            <TabView
              lazy
              swipeEnabled={this.state.showTabbar ? true : false}
              navigationState={this.state}
              renderScene={SceneMap({
                '1': this.renderRecommendContent,
                '2': this.renderSelfContent,
                // first: this.renderRecommendContent,
                // second: this.renderSelfContent,
              }) || null}
              renderTabBar={this._renderTabBar}
              // 每一个tab的宽度
              tabStyle={{ width: 'auto', minWidth: 68 }}
              renderLazyPlaceholder={this._renderLazyPlaceholder}
              onIndexChange={this._handleIndexChange}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
          </View>
        </View>
      </RootSiblingParent>
    );
  }
}
const withStore = (BaseComponent) => (props) => {
  const navigation = useNavigation();
  return <BaseComponent {...props} navigation={navigation} />;
};
export default withStore(HomePage);

const styles = StyleSheet.create({
  homePage: {
    position: 'relative',
    flex: 1,
  },
  tab_line_view: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f5f6fa',
    overflow: 'hidden',
    width: Dimensions.get('window').width
  }
});

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

常用用法(**示例使用的是webView嵌入本地html页面**，允许内部页面进行滚动操作)

webView嵌入本地html页面打生产包无法正确显示html文件需，考虑将html文件放到**android/app/src/main/assets/** 目录下，引用时区分好环境

cityTraffic.html

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cityTraffic.html</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .container {
      /* width: 100vw;
      height: 100vh; */
      position: relative;
      /* margin: 0 auto; */
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    .relative_contain {
      position: relative;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="relative_contain">
      <button id="test_post_message"></button>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const btn = document.getElementById('test_post_message');

      btn.addEventListener('click', () => cityClick('nc'));

      function cityClick(cityName) {
        console.log("%c Line:194 🥚 cityName", "color:#2eafb0", cityName);
        // 传递字符串显示通信发给app WebView
        window.postMessage(JSON.stringify({ cityName: cityName }))
      }
    });
  </script>
</body>

</html>
```

CityTraffic.js

注意需加入注入监听的js代码

```js
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import { openUrl, swichTabBar } from '~util/openUrl';
import BlockHeader from './BlockHeader';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
import { _throttle } from '~/util/utilFn';

const CITY_DATA = [
  { id: 'nc', name: '南昌市', top: 95, left: 142 },
  { id: 'jj', name: '九江市', top: 18, left: 144 },
  { id: 'jdz', name: '景德镇市', top: 48, left: 216 },
  { id: 'sr', name: '上饶市', top: 90, left: 251 },
  { id: 'yt', name: '鹰潭市', top: 118, left: 210 },
  { id: 'fz', name: '抚州市', top: 145, left: 165 },
  { id: 'yc', name: '宜春市', top: 124, left: 64 },
  { id: 'xy', name: '新余市', top: 160, left: 94 },
  { id: 'px', name: '萍乡市', top: 168, left: 42 },
  { id: 'ja', name: '吉安市', top: 216, left: 86 },
  { id: 'gz', name: '赣州市', top: 274, left: 97 },
  { id: 'gjxq', name: '赣江新区', top: 65, left: 152 },
];

class CityTraffic extends Component {
  static propTypes = {
    dataObj: PropTypes.object,
  };

  state = {
  };

  componentDidMount() {
  }

  // 去查看全部
  toMore = () => {
    let url = this.props.dataObj.url;
    if (url) {
      openUrl(this.props.dataObj);
      return;
    }
    swichTabBar(4);
  };

  handleCityClick = _throttle((getedMessage) => {
    console.log("%c Line:61 🍫 this.props.dataObj.children", "color:#93c0a4", getedMessage, this.props.dataObj.children);
    if (getedMessage) {
      const clickItem = CITY_DATA.find((item) => item.id === getedMessage[0].cityName)
      if (this.props.dataObj.children && this.props.dataObj.children.length) {
        const naviItem = this.props.dataObj.children.find((item) => item.title === clickItem.name)
        openUrl(naviItem)
      }
    }
  }, 100)

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <BlockHeader
          title={this.props.dataObj.title || '城市直通车'}
          toMore={this.toMore}
          ifHideMore={!this.props.dataObj.url}
        />

        <View onPress={(e) => {
          // e.preventDefault()
        }} style={styles.container}>
          <WebView
            // 方法 A: 直接使用 require (iOS/Android 都适用，但 Android 需要配置)
            // 环境区分
            // source={__DEV__ ? require('./cityTraffic.html') : { uri: 'file:///android_asset/cityTraffic.html' }}
            source={__DEV__ ? require('~/../android/app/src/main/assets/cityTraffic.html') : { uri: 'file:///android_asset/cityTraffic.html' }}
            // 允许
            nestedScrollEnabled={true}
            // 注入js的postmessage通信代码(必须加入否则onMessage监听不到h5页面发来的message)
            injectedJavaScript={`(function() {
            var lastMessageTime = 0;
            const MESSAGE_INTERVAL = 1000
            
        let pathname = window.location.pathname.replace('/','')
          // 保留原始的 window.postMessage
          const originalPostMessage = window.postMessage;
          // 覆盖 window.postMessage，使其可以通过 ReactNativeWebView 发送消息
        
          window.postMessage = function(data) {
            // 调用原始的 postMessage
            if(pathname.indexOf('manual') == -1 ){
             originalPostMessage.call(window, data);
            }
            
           
            // 通过 ReactNativeWebView 发送消息
            // window.ReactNativeWebView.postMessage(data); 
            var currentTime = new Date().getTime();
            if ((currentTime - lastMessageTime) >= MESSAGE_INTERVAL) {
                // 如果超过1秒，则发送消息并更新最后一次发送消息的时间戳
                // originalPostMessage.call(window, data);
                window.ReactNativeWebView.postMessage(data);
                lastMessageTime = currentTime;
              } 
          };
        
          // 监听来自 WebView 的消息并转发给 ReactNativeWebView
          window.addEventListener('message', function(event) {
            console.log('Message received: ', event.data);
            window.ReactNativeWebView.postMessage(event.data);
          });
        
        // 替换页面中的返回
        var findArrowCount = 0
        var pages = ['switch-identity','forgot-password']
        function findArrow(){
            setTimeout(function(){
              findArrowCount++
              let back = document.querySelector('[class^="back___"]')
              let dom1 = document.querySelector('button.adm-button-primary')
              if(dom1){
                dom1.addEventListener('click',function(){
                    // 仅仅选择身份页面需要返回
                    if( pathname.indexOf('switch-identity') > -1){
                      window.ReactNativeWebView.postMessage('goBack');
                    }
                })
              }
              if(back){
                back.style.display = 'none'
              }
              if(!dom1  &&  findArrowCount < 6){
                findArrow()
              }
            },500);
        }
        pages.indexOf(pathname) > -1 && findArrow()
        })()
        `}
            // 消息监听
            onMessage={(event) => {
              console.log("%c Line:81 🥛 onMessage event", "color:#ed9ec7", event,);
              this.handleCityClick(event.nativeEvent.data ? JSON.parse(event.nativeEvent.data) : '')
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 22,
    height: 415,
    // height: (Dimensions.get('window').width - 22) * 10 / 8,
    marginTop: 6,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jx_bg: {
    width: '100%',
    height: undefined, // 高度由宽高比决定
    position: 'relative'
  },
});

export default CityTraffic;
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

### 调试解决方案

#### 文件资源引用相关问题

android中**需要被直接引用的资源文件**(不要太大，过大的话建议放入后端资源服务器，以文件链接方式引入)，放到 **android/app/src/main/assets/** 目录下，**生产包打包完成后可将.apk改成.zip后缀解压**，然后结合解压的文件和具体的代码进行排查