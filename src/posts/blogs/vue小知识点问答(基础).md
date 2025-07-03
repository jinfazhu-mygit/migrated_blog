---
title: 'vue小知识点问答(基础)'
date: 2021-9-22 17:10:00
permalink: '/posts/blogs/vue小知识点问答(基础)'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - javascript
 - vue
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


## vue小知识点问答(基础)

* ### 为什么data是个函数且返回一个对象

  `data`之所以是一个函数，是因为一个组件可能会多处调用，而**每一次调用就会执行`data函数`并返回新的数据对象**，这样，可以避免多处调用之间的`数据污染`。

* #### [vue常见的修饰符](https://juejin.cn/post/6981628129089421326)有哪些？

  ![4NTySU.png](https://z3.ax1x.com/2021/09/22/4NTySU.png)

* ### 组件间传值的方式有哪些？

  父组件传值给子组件，子组件使用`props`进行接收

  子组件传值给父组件，子组件使用`$emit+事件`对父组件进行传值

  组件中可以使用`$parent`和`$children`获取到父组件实例和子组件实例，进而获取数据

  使用`$attrs`和`$listeners`，在对一些组件进行二次封装时可以方便传值，例如A->B->C

  使用`$refs`获取组件实例，进而获取数据

  使用`Vuex`进行状态管理
  
  
  
  使用`eventBus`进行跨组件触发事件，进而传递数据
  使用`provide`和`inject`，官方建议我们不要用这个，我在看`ElementUI`源码时发现大量使用
  使用浏览器本地缓存，例如`localStorage`

* ### 不需要响应式的数据的处理方法？

  在我们的Vue开发中，会有一些数据，从始至终都`未曾改变过`，这种`死数据`，既然`不改变`，那也就`不需要对他做响应式处理`了，不然只会做一些无用功消耗性能，比如一些写死的下拉框，写死的表格数据，这些数据量大的`死数据`，如果都进行响应式处理，那会消耗大量性能。

  ```js
  // 方法一：将数据定义在data之外
  data () {
      this.list1 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
      this.list2 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
      this.list3 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
      this.list4 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
      this.list5 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
      return {}
   }
      
  // 方法二：Object.freeze()
  data () {
      return {
          list1: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
          list2: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
          list3: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
          list4: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
          list5: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
      }
   }
  ```

* ### 对象新属性无法更新视图，删除属性无法更新视图，为什么？怎么办？

  原因：`Object.defineProperty`没有对对象的新属性进行属性劫持

  对象新属性无法更新视图：使用`Vue.$set(obj, key, value)`,组件中`this.$set(onj, key, value)`

  删除属性无法更新视图：使用`Vue.$delete(obj, key)`,组件中`this.$delete(obj, key)`

* ### 直接arr[index] = xxx无法更新视图怎么办？为什么？怎么办？

  原因：Vue没有对数组进行`Object.defineProperty`的属性劫持，所以直接arr[index] = xxx是无法更新视图的

  使用数组的splice方法，`arr.splice(index, 1, item)`

  使用`Vue.$set(arr, index, value)`

* ### nextTick的用处？

  ```js
  this.name = '林三心'
  this.age = 18
  this.gender = '男'
  ```

  我们修改了三个变量，那问题来了，是每修改一次，DOM就更新一次吗？不是的，Vue采用的是`异步更新`的策略，通俗点说就是，`同一事件循环内`多次修改，会`统一`进行一次`视图更新`，这样才能节省性能嘛

  ```js
  <div ref="testDiv">{{name}}</div>
  
  name: "小林"
  
  this.name = "小尹"
  console.log(this.$refs.testDiv.innerHTML);  // 小林
  ```

  前面说了，Vue是`异步更新`，所以**数据一更新，视图却还没更新**，所以拿到的还是上一次的**旧视图数据**，那么想要拿到最新视图数据怎么办呢？

  ```js
  this.name="小尹"
  this.$nextTick(() => {
      console.log(this.$refs.testDiv.innerHTML);   //小尹
  })
  ```

* ### 子组件改变props里的数据会发生什么?

  如果修改的是基本数据类型，则会报错；

  如果改变的是引用类型，this.obj.key="__"：不报错；this.obj= "~"：会报和基本数据类型一样的错

* ### watch监听一个对象时，如何**排除某些属性的监听**？

  ::: warning

  下面代码是，params发生改变就重新请求数据，无论是a，b，c，d属性改变

  :::

  ```js
  data() {
      return {
        params: {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        },
      };
    },
  watch: {
      params: {
        deep: true,
        handler() {
          this.getList;
        },
      },
    }
  ```

  ::: warning
  但是如果我只想要**a，b改变时重新请求**，**c，d改变时不重新请求**呢？
  :::
  
  ```js
  mounted() {
      Object.keys(this.params)
        .filter((_) => !["c", "d"].includes(_)) // 排除对c，d属性的监听
        .forEach((_) => {
          this.$watch((vm) => vm.params[_], handler, {
            deep: true,
          });
        });
    },
  data() {
      return {
        params: {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        },
      };
    },
  watch: {
      params: {
        deep: true,
        handler() {
          this.getList;
        },
      },
    }
  ```
  
* ### vue的hook的使用

  * 同一组件中使用

  ```js
  // 常用的使用定时器的方式
  export default{
    data(){
      timer:null  
    },
    mounted(){
        this.timer = setInterval(()=>{
        //具体执行内容
        console.log('1');
      },1000);
    }
    beforeDestory(){
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  ```

  上面的做法不好的地方在于：得全局多定义一个timer变量，可以使用hook这么做：

  ```js
  export default{
    methods:{
      fn(){
        let timer = setInterval(()=>{
          //具体执行代码
          console.log('1');
        },1000);
        this.$once('hook:beforeDestroy',()=>{  // 指定beforeDestroy生命周期清除timer
          clearInterval(timer);
          timer = null;
        })
      }
    }
  }
  ```

  * 父子组件使用

  如果子组件需要在mounted时触发父组件的某一个函数，平时都会这么写

  ```js
  //父组件
  <rl-child @childMounted="childMountedHandle"
  />
  method () {
    childMountedHandle() {
    // do something...
    }
  },
  
  // 子组件
  mounted () {
    this.$emit('childMounted')
  },
  ```

  使用hook的话可以更方便：

  ```js
  //父组件
  <rl-child @hook:mounted="childMountedHandle"/>
  
  method () {
    childMountedHandle() {
    // do something...
    }
  },
  ```

* ### Vue的el属性和$mount优先级？

  ```js
  new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
  }).$mount('#ggg')
  ```

  vue官方表示：`el`和`$mount`同时存在时，`el优先级` > `$mount`

* ### 如何获取data中某一个数据的初始状态？

  ```js
  data() {
      return {
        num: 10
    },
  mounted() {
      this.num = 1000
    },
  methods: {
      howMuch() {
          // 计算出num增加了多少，那就是1000 - 初始值
          // **可以通过this.$options.data().xxx来获取初始值**
          console.log(1000 - this.$options.data().num)
      }
    }
  ```

* ### 动态指令和参数

  ```js
  <template>
      ...
      <aButton @[someEvent]="handleSomeEvent()" :[someProps]="1000" />...
  </template>
  <script>
    ...
    data(){
      return{
        ...
        someEvent: someCondition ? "click" : "dbclick",
        someProps: someCondition ? "num" : "price"
      }
    },
    methods: {
      handleSomeEvent(){
        // handle some event
      }
    }  
  </script>
  ```



参考


作者：Sunshine_Lin
链接：https://juejin.cn/post/6984210440276410399
来源：掘金

