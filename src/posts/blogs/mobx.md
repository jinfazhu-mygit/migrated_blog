---
title: 'mobx'
date: 2023-10-06 18:30:00
permalink: '/posts/blogs/mobx'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - mobx
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---




# mobx

## observable和autorun(mobx@5)

监听基本数据类型

```js
import { observable, autorun } from "mobx";

const observableNumber = observable.box(10)
const observableName = observable.box('zzf')

// 自动监听基本数据类型observableNumber变化
// auto首先默认会自动执行一次
autorun(() => {
  console.log(observableNumber.get())
})
setTimeout(() => {
  observableNumber.set(20)
}, 1000);

// 监听基本数据类型observableName变化,两个监听互不干扰
// 需要用到什么就监听什么数据
autorun(() => {
  console.log(observableName.get())
})
setTimeout(() => {
  observableName.set('zzz')
}, 2000);

function App() {
  return (
    <div className="App">App</div>
  );
}

export default App;
```

监听复杂数据类型的两种写法

```js
import { observable, autorun } from "mobx";

// 1. 监听复杂数据类型的map写法
const observableObj = observable.map({
  name: 'zzf',
  age: 10
})
// 粒度化监听，以下只有当observableObj的name属性值改变时才会触发
autorun(() => {
  console.log(observableObj.get('name'))
})
setTimeout(() => {
  observableObj.set('name', 'zzz')
}, 1000);

// 2.监听复杂数据类型的简便写法
const observableObj = observable({
  name: 'zzf',
  age: 10
})
// 粒度化监听，以下只有当observableObj的name属性值改变时才会触发
autorun(() => {
  console.log(observableObj.name)
})
setTimeout(() => {
  observableObj.name = 'zzz'
}, 1000);

function App() {
  return (
    <div className="App">App</div>
  );
}

export default App;
```

## 项目中使用mobx示例(observable+autorun)

/mobx/index.js

```js
import { observable } from "mobx";

const store = observable({
  showTabbar: true,
  userName: 'zzf',
  token: 'zzzzdserw'
})

export default store
```

修改

```js
import store from './mobx'

store.showTabbar = false
```

监听

```js
import { observable, autorun } from "mobx";
import store from "./mobx";

function App() {
  autorun(() => {
    console.log(store.showTabbar)
  })
  
  return (
    <div className="App">App</div>
  );
}

export default App;
```

## 配置configure严格模式

以上通过**store.showTabbar = false来修改store的数据太过随便，不利于后续代码维护调试**，**通过configure配置严格模式，定义相应的action方法来修改store中的数据才更加安全**

/mobx/index.js

```js
import { observable, configure, action } from "mobx";
configure({
  // 非严格模式
  // enforceActions: 'never'
  // 严格模式，不允许在此文件外直接修改store的数据
  enforceActions: 'always'
})

const store = observable({
  showTabbar: true,
  userName: 'zzf',
  token: 'zzzzdserw',

  changeTabShow() {
    this.showTabbar = true
  },
  changeTabHide() {
    this.showTabbar = false
  }
}, {
  // 标记changeTabShow，changeTabHide两个方法是action,专门用于修改showTabbar的值
  changeTabShow: action,
  changeTabHide: action
})

export default store
```

修改

```js
import store from 'mobx'

store.changeTabShow()
store.changeTabHide()
```

## class类+装饰器写法(@observable @action)

/mobx/index.js

```js
import { observable, configure, action } from "mobx";
configure({
  // 非严格模式
  // enforceActions: 'never'
  // 严格模式，不允许在此文件外直接修改store的数据
  enforceActions: 'always'
})

// const store = observable({
//   showTabbar: true,
//   userName: 'zzf',
//   token: 'zzzzdserw',

//   changeTabShow() {
//     this.showTabbar = true
//   },
//   changeTabHide() {
//     this.showTabbar = false
//   }
// }, {
//   // 标记changeTabShow，changeTabHide两个方法是action,专门用于修改showTabbar的值
//   changeTabShow: action,
//   changeTabHide: action
// })

// 类加装饰器写法
class Store {
  @observable showTabbar = true
  @observable userName = 'zzf'
  @observable token = 'zzzzdserw'

  @action changeTabShow() {
    this.showTabbar = true
  }
  @action changeTabHide() {
    this.showTabbar = false
  }
}
const store = new Store()

export default store
```

装饰器语法报错解决

1. 让编辑器支持装饰器语法 (vscode设置搜experimentalDecorators进行勾选)

![pPX7Hyt.png](https://z1.ax1x.com/2023/10/06/pPX7Hyt.png)

2. 代码支持装饰器语法

   2.1

   ```bash
   npm install @babel/core @babel/plugin-proposal-decorators @babel/preset-env
   ```

   2.2 创建.babelrc

   ```
   {
     "presets": [
       "@babel/preset-env"
     ],
     "plugins": [
       [
         "@babel/plugin-proposal-decorators",
         {
           "legacy": true
         }
       ]
     ]
   }
   ```

   2.3 创建config-overrides.js

   ```js
   const path = require('path')
   const { override, addDecoratorsLegacy } = require('customize-cra')
    
   function resolve(dir) {
       return path.join(__dirname, dir)
   }
    
   const customize = () => (config, env) => {
       config.resolve.alias['@'] = resolve('src')
       if (env === 'production') {
           config.externals = {
               'react': 'React',
               'react-dom': 'ReactDOM'
           }
       }
    
       return config
   };
   module.exports = override(addDecoratorsLegacy(), customize())
   ```

   2.4 安装依赖

   ```bash
   npm install customize-cra react-app-rewired
   ```

   2.5 修改package.json

   ```json
   ...
   "scripts": {
     "start": "react-app-rewired start",
     "build": "react-app-rewired build",
     "test": "react-app-rewired test",
     "eject": "react-app-rewired eject"
   }
   ...
   ```

   2.6还有**报错就重新用vscode打开项目重跑**

   ​

## 异步action的处理

```js
import { observable, configure, action, runInAction } from "mobx";
configure({
  // 非严格模式
  // enforceActions: 'never'
  // 严格模式，不允许在此文件外直接修改store的数据
  enforceActions: 'always'
})

// 类加装饰器写法
import axios from 'axios'

class Store {
  @observable list = []
  
  @action async getList() {
    // 1.
    axios.get('http://xxxx').then((res) => {
      // 下面直接给this.list赋值会被认为是在aaction外部修改，出现报错
      // this.list = res.data.list
      // 使用runInAction表示还是在action内部进行的list的修改
      runInAction(() => {
        this.list = res.data.list
      })
    })
    // 2.async+await方式
    const res = await axios.get('http://xxxx')
    runInAction(() => {
      this.list = res.data.list
    })
  }
}
const store = new Store()

export default store
```

## autorun的订阅与取消

```js
import { observable, autorun } from "mobx";
import store from "./mobx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // autorun执行会返回一个取消订阅函数，一般都要在销毁流程中执行取消订阅
    const unsubscribe = autorun(() => {
      console.log(store.list)
    })
    return () => {
      unsubscribe()
    }
  }, []);

  return (
    <div className="App">App</div>
  );
}

export default App;
```

## mobx-react的使用(mobx-react@5)

```bash
npm install mobx-react@5
```

/src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 通过高阶组件的方式注入，子组件通过props获取store的数据
import { Provider } from 'mobx-react';
import store from './mobx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
```
### 类组件中使用mobx-react

![pPXLWjA.png](https://z1.ax1x.com/2023/10/06/pPXLWjA.png)

/src/App.js

```js
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

// 通过inject修饰器注入指定接收的store
@inject('store')
@observer // 使用observer构建当前组件的父组件
class App extends Component {
  componentDidMount() {
    console.log(this.props.store.list, this.props.store.showTabbar)
  }

  render() {
    return (
      <div>
        App
      </div>
    )
  }
}

export default App;
```

### 函数式组件中使用mobx-react

函数式组件中使用方式1

```js
import React from 'react';
import { Observer } from 'mobx-react';
// 手动引入store
import store from "./mobx";

function App() {
  return (
    <div>
      App
      {/* 使用Observer嵌套，返回回调函数的写法 */}
      {/* 简化了原来通过autorun手动监听和移除的方式 */}
      <Observer>
        {
          () => {
            return store.list.map((item) => {
              return <div>{item}</div>
            })
          }
        }
      </Observer>
    </div>
  )
}

export default App
```

函数式组件中使用方式2

```js
import React from 'react';
import { inject, observer } from 'mobx-react';

function App(props) {
  return (
    <div>
      {
        props.store.list.map((item) => {
          return <div>{item}</div>
        })
      }
    </div>
  )
}

export default inject('store')(observer(App))
```

### inject使用

```jsx
// 顶层节点
import Dict from '@/mobx/dict';
import { Provider } from 'mobx-react'

// 先使用高阶组件进行Provide
const App = () => {
  return <Provider Dict={Dict}>
    <Router></Router>
  </Provider>
}

// 使用inject对需要的组件进行注入使用
const indexView = (props) => {
  const { Dict } = props
}
export default inject('Dict')(memo(observer(indexView)))
```

### inject引入多个mobx

**ProviderCom高阶组件**（高阶组件引入后，其子集组件一样进行inject使用）

```jsx
import React, { FC } from 'react'
import { Provider } from 'mobx-react'

/**
 * @description Provider 高价组件
 *
 * @param Child 需要包裹的组件
 * @param mobx mobx 实例对象，或者实例对象组成的数组
 */
// ProviderCom 高阶组件
export default function ProviderCom(
	Child: any,
	mobx: any
) {
	return (props: any) => {
		return (
			<Provider {...mobx}>
				<Child {...props} />
			</Provider>
		)
	}
}
```

**结合ProvideCom注入引用多个mobx**

```jsx
import { inject, observer } from 'mobx-react';

const StandardExamModal = (props) => {
  const {
    ModalMobx,
    Dict
  } = props
}

// 注意写法
export default ProviderCom(inject('ModalMobx', 'Dict')(observer(StandardExamModal)), { ModalMobx, Dict })
```

## mobx添加观测的几种方式

### makeAutoObservable观测

```js
import { toJS, makeAutoObservable } from 'mobx';
import request from '@/service/request';

export class IndexMobx {
  userUnitType: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setInfo = (info: Record<string, any>) => {
    Object.keys(info).forEach(key => {
      this[key as keyof typeof this] = info[key];
    });
  };

  getAuthority = async () => {
    const res: any = await request({
      url: '/support/auth',
      method: 'POST'
    });
  };

  resetMobx = () => {
    this.setInfo({
      userUnitType: ''
    });
  };
}

export default new IndexMobx();
```

### observer+useLocalObservable实例使用法

```js
import { observer, useLocalObservable } from "mobx-react";
import IndexMobx from './mobx';

const IndexView = observer(() => {
  const vm = useLocalObservable(() => IndexMobx)

  return (<div>
    {vm.userUnitType}
  </div>)
})

export default observer(IndexView)
```



