---
title: 'JS防抖与节流-watch监听-路由监听-attrs'
date: 2021-9-14 17:00:00
permalink: '/posts/blogs/JS防抖与节流-watch监听-路由监听-attrs'
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

#### JS防抖与节流，watch监听，路由监听，$attrs的多层组件传值

**防抖**：防止事件短时间内持续触发，只有当超出定时器规定时间才触发一次

```js
<button>提交</button>
//js
var button=document.getElementByTagName("button")[0];
let timer=null;  //设置定时器
button.onclick=function(){
  if(timer!==null){
    clearTimeOut(timer); //超出了定时时间，timer置为null
  }
  timer=setTimeOut(()=>{ //若还在定时器规定的时间内触发，则不断刷新定时时间
    console.log("button点击触发"); //需要防抖的事件，只有在超出定时时间才触发
  },300);
}
```

**节流**：针对短时间内快速连续触发的事件，降低其触发频率

```js
<button>提交</button>
//js
var button=document.getElementByTagName("button")[0];
let timer=true; //初始化timer为true,为触发事件做准备
button.onclick=function(){   //window.scroll鼠标滚轮事件是一个比较好的节流例子
  if(timer){  //开始触发
    setTimeOut(()=>{
      console.log("按钮点击触发");
      timer=true;  //让定时器保持为true，通过设置时间来降低频率
    },300);  //设置触发频率
  }
  timer=false; //timer置为false，结束持续触发
}
```

总结：**防抖**实际上更适用于点击事件(非持续性事件)，**节流**更适用于持续性事件，如：window.scroll鼠标滚轮事件

**watch监听**：watch是一个非常高效的监听器，可以用于监听**路由变化**($route(to,from), '$route.query')、**组件的data数据变化**、还可以通过watch的**immediate**和**deep**属性灵活的控制监听到的事件及数据所要触发的事件以及监听深度。

1、watch监听data数据

```js
// 浅监听
const app=new Vue({
  el:"#app",
  data:{
    value:"123"
  },
  watch:{ //浅监听
    value:function(newVal,oldVal){
      console.log("newVal: "+newVal);
      console.log("oldVal: "+oldVal);
    }
  }
})
// 深度监听：能监听到对象内的值
const app=new Vue({
  el:"#app",
  data:{
    value:{name:'zjf'} //对象
  },
  watch:{ //深度监听
    'value.name':{
      handler(newVal,oldVal){
        console.log(newVal);
        console.log(oldVal);
      },
      immidiate:false, //若为true 当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行
      deep:true, // 深度监听，能监听到对象内对应的值
    }
  }
})
```

2、监听路由

```js
const app=new Vue({
  el:"#app",
  data:{
    value:{name:'zjf'}
  },
  watch: {
    '$route.query':{  // 这里监听的是路由查询字段的变化
      handler(newObj,oldObj){
        console.log("执行了监听路由参数page",newObj,oldObj)
        //...相应的需要执行的事件
      },
      immediate: false, // 为true时，在第一次赋值时也会执行一次，为false时，在第一次赋值时不执行，只有当数据发生改变时才执行
      // 深度观察监听
      deep: true,
    },
  },
})
// 1、监听路由的来去
watch:{
    $route(to,from){
      console.log(from.path);//从哪来
      console.log(to.path);//到哪去
    }
}
// 2、监听新老路由信息
watch:{
    $route:{
      handler(val,oldval){
        console.log(val);//新路由信息
        console.log(oldval);//老路由信息
      },
      // 深度观察监听
      deep: true
    }
  }
// 3、监听路由变化，触发方法
methods:{
  getPath(){
    console.log(1111)
  }
},
watch:{
  '$route':'getPath' // 路由变化,直接触发了getPath方法
}
// 4、不使用watch的监听
this.$router.beforeEach((to, from, next) => {
    console.log(to);
    next();
});
```

**[$attrs传值](https://www.cnblogs.com/qianxiaox/p/15149691.html)**

