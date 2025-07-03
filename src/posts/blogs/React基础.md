---
title: 'React基础'
date: 2022-5-29 22:00:00
permalink: '/posts/blogs/React基础'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - React
 - javascript
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


## React开发依赖、基本使用及案例实现

* 开发React依赖3个库
  * react: 包含react所必须的核心代码
  * react-dom: react渲染在不同平台所需要的核心代码
  * babel: 将jsx转换成React代码的工具(可将ES6转ES5，以及将jsx语法的代码转成React.CreateElement的代码)

* 基本使用

```html
<body>
    <div id="app">app</div>
    <!-- 引入react,react-dom以及babel -->
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- 使用jsx,并且希望script中的jsx代码被解析，必须在script标签中添加一个属性 -->
    <script type="text/babel">
        // ReactDOM.render(渲染的内容， 挂载的对象)
        ReactDOM.render(<h3>Hello React</h3>, document.getElementById("app"));
    </script>
</body>
```

* ### 案例应用

```html
<body>
    <div id="app">app</div>
    <!-- 引入react,react-dom以及babel -->
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- 使用jsx,并且希望script中的jsx代码被解析，必须在script标签中添加一个属性 -->
    <script type="text/babel">
        let message = 'Hello World'; // 注意变量挂载的区别

        // 点击事件的回调函数
        function btnClick() {
            message = 'Hello React'; // 直接修改无法触发数据渲染
            console.log(message);
            render(); // 手动触发执行渲染函数,真正开发过程中不要手动调用render函数
        }

        // 将渲染逻辑放入一个render函数中去
        function render() {
            // ReactDOM.render(渲染的内容， 挂载的对象)
            // <!-- jsx特点：多个标签最外层只能有一个标签，同vue的模板渲染类似 -->
            ReactDOM.render(
                <div>
                    <h3>{message}</h3>
                    <button onClick={btnClick}>修改文本</button>
                </div>,
                document.getElementById("app")
            );
        }
        // 默认执行一次渲染函数
        render();
    </script>
</body>
```

* ### react基本的完整使用案例实现

```jsx

// 以类的方式创建组件(是该类继承自React.Component即可)
class App extends React.Component {
constructor() {
  super(); // 调用super即可使用父类包含的属性及方法，必须初始化父类
  // 通过内部的state对象存放message
  this.state = {
    message: 'Hello World'
  }
}

render() { // render函数有特殊的含义，其内部的this指向的是类本身，同constructor的this所示
  // 类(组件)中的render函数返回需要渲染的节点，其中的()表示一个整体
  // 可通过bind显示绑定修改函数调用的内部的this
  return (
    <div>
      <h3>{this.state.message}</h3>
      <button onClick={this.btnClick.bind(this)}>修改文本</button>  
    </div>
  )
}

btnClick() {
  // 类中的函数内部的this指向的是该类实例化后新创建的对象，
  // 这里并未实例化，所以this指向undefined,在绑定点击事件时通过bind改变函数内部的this
  // console.log(this); // undefined
  // this.state.message = 'Hello React';
  // console.log(this.state);
  // 通过setState可以达到修改数据并且会自动触发render函数重新渲染
  this.setState({
    message: 'Hello React'
  })
}
}

ReactDOM.render(<App/>, document.getElementById("app"));
```

## jsx基本语法

* **JSX是一种JavaScript的语法扩展(exxtension)**，也在很多地方称之为**JavaScript XML**，因为看起来就是一段XML语法
* 列表案例(render函数内**循环**相关的语法)

```jsx
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: ['星际穿越', '大话西游', '1213', '9009']
    }

    this.liClick = this.liClick.bind(this);
  }
  render() {
    const movieLis = [];
    for(let movie of this.state.movies) {
      movieLis.push(<li onClick={this.liClick}>{movie}</li>);
    }

    return (
      <div>
        <h3>电影列表1</h3>
        <ul>
          {movieLis}
        </ul>
        <h3>电影列表2</h3>
        <ul>
          {this.state.movies.map((item) => <li>{item}</li>)}
        </ul>
      </div>
    )
  }

  liClick(event) {
    // 直接打印event对象数据全为null,是因为React里面的事件并不是真实的DOM事件，而是自己在原生DOM事件上进行了封装与合成。
    // 合成事件是由事件池来管理的，合成事件对象可能会被重用，合成事件的所有属性也会随之被清空。所以当在异步处理程序（如setTimeout等等）中或者浏览器控制台中去访问合成事件的属性，默认react 会把其属性全部设为null。
    // 通过添加event.persist();将当前的合成事件从事件池中移除了，所以能够继续保有对该事件的引用以及仍然能访问该事件的属性。
    event.persist();
    console.log(event._targetInst.index);
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
```

* 计数器案例

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h3>{this.state.counter}</h3>
        <button onClick={this.increment.bind(this)}>+1</button>
        <button onClick={this.decrement.bind(this)}>-1</button>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1
    })
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));
```

* ### 基本语法认识

  * **JSX的顶层只能有一个根元素**，所以我们很多时候会在外层**包裹一个div原生**
  * 为了方便阅读及换行，我们通常在**jsx的外层包裹一个()**
  * JSX中的标签可以是但标签也可以是双标签，但是**单标签必须以/>结尾**
  * render函数中的**注释**：

  ```jsx
  render() {
    return (
      <div>
        {/* 我是一段注释 */}
        <h3>{this.state.counter}</h3>
        <button onClick={this.increment.bind(this)}>+1</button>
        <button onClick={this.decrement.bind(this)}>-1</button>
      </div>
    )
  }
  ```

  * jsx中**null,undefined,bool类型都是不显示**的，可通过+""、**String(null)、String(undefined)或bool.toString()方法转成字符串显示**

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'zjf',
        age: 22,
        names: ['hgd', 'gfd', 'hyte'],
        test1: null,
        test2: undefined,
        test3: true,
        flag: true,
      }
    }

    render() {
      return (
        <div>
          <h3>{this.state.name}</h3>
          <h3>{this.state.age}</h3>
          <h3>{this.state.names}</h3>

          <h3>{this.state.test1+''}</h3>
          <h3>{this.state.test2+''}</h3>
          <h3>{this.state.test3.toString()}</h3>

          <h3>{this.state.flag ? '你好呀': null}</h3>
        </div>
      )
    }
  }

  ReactDOM.render(<App/>, document.getElementById("app"));
  ```

  * **对象不能作为jsx的子类**

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        obj: {
          name: 'zjf',
          age: 22
        }
      }
    }

    render() {
      return (
        <div>
          {/*错误用法*/}
          <h3>{this.state.obj}</h3>
        </div>
      )
    }
  }

  ReactDOM.render(<App/>, document.getElementById("app"));
  ```

  * **jsx嵌入表达式**

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: 'zz',
        lastName: 'jjff',
        isLogin: true,
      }
    }

    render() {
      const { firstName, lastName, isLogin } = this.state;

      return (
        <div>
          {/*1.运算符表达式*/}
          <h3>{firstName + lastName}</h3>
          <h3>{ 20*30 }</h3>
          {/*2.三目运算符*/}
          <h3>{isLogin? '登陆成功': '登陆失败'}</h3>
          {/*3.函数调用*/}
          <h3>{this.getFullName()}</h3>
        </div>
      )
    }

    getFullName() {
      return this.state.firstName + this.state.lastName;
    }
  }

  ReactDOM.render(<App/>, document.getElementById("app"));
  ```

  * **jsx属性绑定**

  ```jsx
  function getImageSize(imgUrl, size) {
    return imgUrl + `?param=${imgUrl}${size}x${size}`
  }

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: 'state绑定的标题',
        imgUrl: 'https://s1.ax1x.com/2022/05/28/XnqBb8.png',
        link: 'http://www.baidu.com',
        active: true,
      }
    }

    render() {
      const { title, imgUrl, link, active } = this.state;
      return (
        <div>
          <h3 title={title}>我是标题</h3>
          {/*属性可以写表达式，可以是外部导入的函数*/}
          <img src={getImageSize(imgUrl, 140)} alt="图片显示失败"/>
          <a href={link} target="_blank">百度一下</a>
          {/*jsx中className表示类名,以及动态添加class类名*/}
          <div className="box title">我是div元素</div>
          <div className={"box title " + (active? "active": "")}>我也是div元素</div>
          {/*jsx绑定style,{{}}的形式，必须使用驼峰标识，""表示固定值，不加引号表示使用的是外部变量*/}
          <div style={{ color: "red", fontSize: "50px" }}>我是div，绑定style样式</div>
        </div> 
      )
    }
  }

  ReactDOM.render(<App/>, document.getElementById("app"));
  ```

  * **jsx事件绑定及参数传递**

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '我是消息',
        movies: [ '123', '456', '789', '101' ]
      }

      this.btnClick = this.btnClick.bind(this);
    }

    render() {
      return (
        <div>
          {/*1.通过bind绑定this*/}
          <button onClick={this.btnClick}>点击按钮1</button>
          <button onClick={this.btnClick}>点击按钮2</button>
          {/*2.绑定一个箭头函数使其自动往上层找this*/}
          <button onClick={this.increment}>+1</button>
          {/*3.推荐：绑定一个箭头函数，在箭头函数中调用相应的函数，实现相关操作，也方便传递参数*/}
          <button onClick={() => { this.decrement(123) }}>-1</button>
          {/*4.遍历传参最优解*/}
          <ul>
            {
              this.state.movies.map((item, index, arr) => {
                return (
                  <li className="item" 
                      onClick={e => { this.liClick(item, index, e); }}
                      title="li">
                      {item}
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    }
    // 点击事件自带的event事件对象
    btnClick(event) {
      // event.persist();
      console.log(this, event);
    }

    increment = () => {
      console.log(this);
    }

    decrement(name) {
      console.log(this, name);
    }

    liClick(item, index, e) {
      console.log(item, index, e);
    }
  }

  ReactDOM.render(<App/>, document.getElementById("app"));
  ```

  * **jsx条件渲染**

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: false
      }
    }

    render() {
      const { isLogin } = this.state;

      // 1.通过if判断:适合逻辑代码非常多的情况
      let welcome = null;
      if(isLogin) {
        welcome = <h3>欢迎回来</h3>
      } else {
        welcome = <h3>请先登录</h3>
      }

      return (
        <div>
          {welcome}
          {/*2.三目运算符*/}
          <button onClick={e => this.loginClick()}>{isLogin ? "退出": "登录"}</button>

          <hr/>
          {/*3.逻辑与*/}
          <h3>{ isLogin && "你好，123" }</h3>
          {isLogin && <h3>你好，123</h3>}
          <h3>44</h3>
        </div>
      )
    }

    loginClick() {
      this.setState({
        isLogin: !this.state.isLogin
      })
    }
  }
  ```

  * **jsx条件渲染v-show效果**

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: false
      }
    }

    render() {
      const { isLogin } = this.state;

      // 1.通过if判断:适合逻辑代码非常多的情况
      let welcome = null;
      if(isLogin) {
        welcome = <h3>欢迎回来</h3>
      } else {
        welcome = <h3>请先登录</h3>
      }

      return (
        <div>
          {welcome}
          {/*2.三目运算符*/}
          <button onClick={e => this.loginClick()}>{isLogin ? "退出": "登录"}</button>

          <hr/>
          {/*3.逻辑与*/}
          <h3>{ isLogin && "你好，123" }</h3>
          {isLogin && <h3>你好，123</h3>}
          <h3>44</h3>
        </div>
      )
    }

    loginClick() {
      this.setState({
        isLogin: !this.state.isLogin
      })
    }
  }
  ```

  * **jsx列表筛选渲染(filter的使用)**

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        nums: [120, 40, 50, 67, 90, 88, 49, 99, 330]
      }
    }

    render() {
      return (
        <div>
          {/*filter筛选出大于等于50的li*/}
          <ul>
            {
              this.state.nums.filter(item => item >= 50).map(item => <li>{item}</li>)
            }
          </ul>
          {/*截取前4条数据进行渲染*/}
          <ul>
            {
              this.state.nums.slice(0, 4).map(item => <li>{item}</li>)
            }
          </ul>
        </div>
      )
    }
  }
  ```

  ## jsx本质(jsx -> React.createElement() -> ReactElement对象(虚拟DOM节点) -> 真实DOM)

  * 通过babel将会将节点元素转换成React.createElement(tagName, options, children)形式的代码
  * jsx的本质等价于React.createElement(tagName, options, children);

  ```jsx
  const message1 = <h3>h3标题</h3>;
  // 上行代码等价于
  // babel会将jsx自动转化为React.createElement的形式
  const message2 = React.createElement("h3", null, "h3标题");

  ReactDOM.render(message2, document.getElementById("app"));
  ```

  * 可以直接在babel官网进行验证：[https://babeljs.io](https://babeljs.io),生成**React.createElement();**
  * **通过React.createElement最终创建出来的是ReactElement对象**，React会将ReactElement对象**组成一个JavaScript的对象树**
  * 再通过**ReactDOM.render函数将ReactElement(虚拟DOM)和真实的浏览器DOM节点进行同步(渲染)**(react是如此，react-native是将ReactElement对象渲染成ios或android端对应的其他节点控件)

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {

      }
    }

    render() {
      var reactElementObj = (
        <div>
          <div className="header">
            <h3 title="标题">标题</h3>  
          </div>
          <div className="content">
            <h3>我是内容</h3>  
          </div>
          <div className="bottom">
            <h3>我是尾部内容</h3>
          </div>
        </div>
      )
      console.log(reactElementObj); // 如下图所示
      return reactElementObj;
    }
  }

  ReactDOM.render(<App/>, document.getElementById("app"));
  ```

  ![XQ38pV.png](https://s1.ax1x.com/2022/05/29/XQ38pV.png)

  * ### 书籍案例实现

  ```jsx
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        books: [
          {
            id: 1,
            name: '《算法导论》',
            date: '2006-9',
            price: 85.00,
            count: 2
          },
          {
            id: 2,
            name: '《UNIX编程艺术》',
            date: '2006-2',
            price: 59.00,
            count: 1
          },
          {
            id: 3,
            name: '《编程珠玑》',
            date: '2008-10',
            price: 39.00,
            count: 1
          },
          {
            id: 4,
            name: '《代码大全》',
            date: '2006-3',
            price: 128.00,
            count: 1
          },
        ]
      }
    }

    renderBooks() {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th></th>  
                <th>书籍名称</th>  
                <th>出版日期</th>  
                <th>价格</th>  
                <th>购买数量</th>  
                <th>操作</th>  
              </tr>  
            </thead>  
            <tbody>
              {
                this.state.books.map((item, index) => {
                  return (
                    <tr>
                      <td>{index+1}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>
                        <button disabled={ item.count < 1 } onClick={e => this.changeCount(index, -1)}>-</button>  
                        <span className="count">{item.count}</span>
                        <button onClick={e => this.changeCount(index, 1)}>+</button>
                      </td>
                      <td>
                        <button onClick={e => this.removeItem(index)}>移除</button>  
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <h2>总价为：{formatPrice(this.getTotalPrice())}</h2>
        </div>
      )
    }

    renderEmpty() {
      return <h2>购物车为空~</h2>
    }

    render() {
      return this.state.books.length ? this.renderBooks(): this.renderEmpty();
    }

    changeCount(index, count) {
      const newBooks = [...this.state.books];
      newBooks[index].count += count;
      this.setState({
        books: newBooks
      })
    }

    removeItem(index) {
      // state中数据的不可变性
      this.setState({
        books: this.state.books.filter((item, indey, arr) => {
          return indey !== index
        })
      })
    }

    getTotalPrice() {
      // let total = 0;
      // this.state.books.forEach(item => {
      //   total += item.count * item.price;
      // })
      // return total;

      return this.state.books.reduce((prev, item, curIndex, arr) => {
        return prev + item.price * item.count;
      }, 0)
    }
  }

  ReactDOM.render(<App/>, document.getElementById("app"));
  ```