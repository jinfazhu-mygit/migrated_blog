---
title: 'Promise用法详解及手写Promise'
date: 2022-2-09 22:00:00
permalink: '/posts/blogs/Promise用法详解及手写Promise'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - Promise
 - javascript
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


# Promise用法详解及手写Promise

## 回调函数方式解决异步

```js
/**
 * 回调函数方式
 * 弊端：1.在封装的时候必须要自己设计好calllback名称，并且使用好
 * 2.如果是别人封装的，我们必须去查文档或者看源码去了解该函数的用法
 */
function requestData(url, successCallback, errorCalllback) {
  setTimeout(() => {
    if(url === 'zjf'){
      // 请求成功
      successCallback('请求成功');
    }else {
      // 请求失败
      errorCalllback('请求失败');
    }
  }, 2000);
}

requestData('zjf', (res) => {
  console.log(res);
}, (err) => {
  console.log(err);
})
// 更好的方案 承诺promise
```

## Promise的基本使用

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(url === 'zjf'){
        // 请求成功
        let successsMessage = 'success';
        resolve(successsMessage);
      }else {
        // 请求失败
        let errorMessage = 'error';
        reject(errorMessage);
      }
    }, 2000);
  })
}

const promise = requestData('zjf');
promise.then((res) => {
  console.log('请求成功');
}, (err) => {
  console.log('请求失败');
})
promise.then((res) => { // then方法另一写法
  console.log('请求成功', res);
}).catch((err) => {
  console.log('请求失败', err);
})
```

## Promise的三种状态

```js
// Promise的三种状态
// Promise状态一旦确定下来就不能再更改
new Promise((resolve, reject) => {
  resolve(); // 当执行到executor函数时为pending(待定)状态
}).then(res => {
  console.log('success'); // 当执行到then函数时为fulfilled/resolved(已解决)状态
}, err => {
  console.log('failed'); // 当执行到catch函数时为rejected(失败)状态
})
```

## Promise的resolve参数

```js
/**
 * 1.Promise的resolve回调可以传入基本数据
 * 2.可传入一个promise,相当于状态移交
 * 3.可传入一个对象，如果该对象中有then方法，则会将状态移交给对象的then方法(实现thenable)
 */

// 2.resolve传入promise作为参数(参数转交)
const newPromise = new Promise((resolve, reject) => {
  resolve('resolve message');
})

new Promise((resolve, reject) => {
  resolve(newPromise);
}).then(res => {
  console.log('res:', res);
}, err => {
  console.log('err:', err);
})

// 3.resolve传入一个对象(thenable)作为参数
new Promise((resolve, reject) => {
  const obj = {
    then: function(resolve, reject){
      // resolve('resolve message');
      reject('reject message');
    }
  }
  resolve(obj);
}).then(res => {
  console.log('res:', res);
}, err => {
  console.log('err:', err);
})
```

## Promise对象方法then

```js
// Promise有哪些对象方法
console.log(Promise.prototype); // Object [Promise] {} 很多方法被隐藏了
console.log(Object.getOwnPropertyDescriptors(Promise.prototype));

// 1.then方法多次调用
const promise = new Promise((resolve, reject) => {
  resolve('resolve message');
})

promise.then((res1) => {
  console.log('success', res1);
})

promise.then((res2) => {
  console.log('success', res2);
})

// 2.then方法传入的回调函数，可以有返回值
// then方法本身也是有返回值的，它的返回值是Promise
// 1> 如果返回的是一个普通值(数值/字符串/undefined),那么这个普通的值将作为一个新的Promise的resolve值
promise.then((res) => { // 链式调用
  console.log('res', res);
  return 'aaaa'; // 这里创建了一个新的Promise,返回值作为resolve传入的参数
}).then((res) => {
  console.log(res); // aaaa
  return 'bbbb';
}).then(res => {
  console.log(res); // bbbb
})
// 2>如果返回的是Promise
promise.then(res => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('11111')
    }, 1000);
  })
}).then(res => {
  console.log('res:', res);
})
// 3>如果返回的是一个对象，并且实现了thenable
promise.then(res => {
  return {
    then: function(resolve, reject) {
      resolve('22222')
    }
  }
}).then(res => {
  console.log('res:', res);
})
```

## Promise对象方法catch

```js
const promise = new Promise((resolve, reject) => {
  // reject('error message'); // reject触发then方法第二个参数回调(catch也可以)
  // throw new Error('error message'); // throw new Error也可触发then方法第二个参数回调
  resolve('aaa');
})

promise.then(res => {
  // return new Promise((resolve, reject) => {
  //   reject('err')
  // })

  throw new Error('error message'); // throw new Error也可触发catch方法回调
}).catch(err => {
  console.log('err:', err);
})

// 拒绝捕获的问题
const promise1 = new Promise((resolve, reject) => {
  reject('1111');
})

promise1.then(res => { // 未对抛出的异常进行正确的捕获

})

// promise1.catch(err => {
//   console.log('err：', err);
// })

// catch方法的返回值
const promise2 = new Promise((resolve, reject) => {
  reject('1111');
})

promise2.then((res) => {

}).catch(err => {
  console.log('err1', err);
  return 'catch or then'; // 将会被下一个then方法捕获，相当于这里的Promise里调用了resolve('catch or then)
}).then(res => {
  console.log('res1', res);
}).catch(err => {
  console.log('err2', err);
})
```

## Promise对象方法finally

```js
const promise = new Promise((resolve, reject) => {
  // resolve('1111');
  reject('err message');
})

promise.then(res => {
  console.log('res:', res);
}).catch(err => {
  console.log('err:', err);
}).finally(() => { // 无论是resolved状态还是rejected状态一定执行的方法
  console.log('finally code execute');
})
```

## Promise类方法resolve

```js
// 转promise对象
// 1.
function foo() {
  const obj = { name: 'zjf' };
  return new Promise(resolve => {
    resolve(obj);
  })
}

foo().then(res => {
  console.log('res:', res);
})

// 2.Promise.resolve
// 1>传入普通的值
const promise1 = Promise.resolve({ name: 'zjf' });
promise1.then(res => {
  console.log(res);
})
// 2>传入promise
const promise2 = Promise.resolve(new Promise(resolve => {
  resolve('1111');
}))
promise2.then(res => {
  console.log(res);
})
// 3>传入thenable对象

```

## Promise类方法reject

```js
// const promise = Promise.reject('1111');
// 相当于
// const promise = new Promise((resolve,reject) => {
//   reject('1111');
// })

// 注意：无论reject中传入什么值都是一样的(直接返回)
const promise = Promise.reject({
  then: function(resolve, reject) {
    reject('1234')
  }
}) // 或
const promise = Promise.reject(new Promise(() => {}))

promise.then(res => {
  console.log(res);
}).catch(err => {
  console.log(err); 
})
```

## Promise类方法all,allSettled

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('11111');
  }, 1000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('22222');
  }, 2000);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('33333');
  }, 3000);
})

// 所有promise都变成fulfilled后，再拿到结果
// 如果在拿到所有结果之前，有一个promise变成了rejected,那么整个promise将是rejected
Promise.all([p1, p2, p3, 'aaaaa']).then(res => {
  console.log(res);
}).catch(err => {
  console.log('err:', err);
})
```

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('11111');
  }, 1000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('22222');
  }, 2000);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('33333');
  }, 3000);
})

// allSettled无论promise是被resolve还是reject都会被记录下来其状态及对应的值
Promise.allSettled([p1, p2, p3]).then(res => {
  console.log(res);
})
// [
//   { status: 'fulfilled', value: '11111' },
//   { status: 'rejected', reason: '22222' },
//   { status: 'fulfilled', value: '33333' } 
// ]
```

## Promise类方法race,any

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('11111');
  }, 3000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('22222');
  }, 500);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('33333');
  }, 1000);
})

// race:竞赛/竞速
// 只要有一个promise达到fulfilled或rejected状态，就结束
Promise.race([p1, p2, p3]).then(res => {
  console.log('res', res);
}).catch(err => {
  console.log('err:', err);
})
```

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('11111');
  }, 3000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('22222');
  }, 500);
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('33333');
  }, 1000);
})

// any方法any
// 一定等到有一个promise为fulfilled,或所有都为reject状态才结束
Promise.any([p1, p2, p3]).then(res => {
  console.log('res', res);
}).catch(err => {
  console.log('err:', err);
})
```

## 手写Promise

### 结构设计及then方法设计

* 实现基本结构
* 实现promise状态控制
* 实现回调执行

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        queueMicrotask(() => {
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilled(this.value);
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        queueMicrotask(() => {
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejected(this.reason);
        });
      }
    }

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }
}

const promise = new JFPromise((resolve, reject) => {
  resolve('11111');
  reject('22222');
})

promise.then(res => {
  console.log(res);
}, err => {
  console.log(err);
})
```

### then方法优化一

* 实现多then调用(数组方式接收，遍历执行)
* 异步promise收集及处理

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          })
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          })
        });
      }
    }

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value);
    }
    if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason);
    }

    // 将成功的回调和失败的回调放入到数组中
    if(onFulfilled) {
      this.onFulfilledFns.push(onFulfilled);
    }
    if(onRejected) {
      this.onRejectedFns.push(onRejected);
    }
  }
}

const promise = new JFPromise((resolve, reject) => {
  resolve('11111');
  reject('22222');
})

promise.then(res => {
  console.log('res1:', res);
}, err => {
  console.log('err1:', err);
})

promise.then(res => {
  console.log('res2:', res);
}, err => {
  console.log('err2:', err);
})
// 在确定promise后，
setTimeout(() => {
  promise.then(res => {
    console.log('res3', res);
  }, err => {
    console.log('err3', err);
  })
}, 1000);
```

### then方法优化二

* 实现then方法链式调用(链式返回promise)

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          })
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          })
        });
      }
    }
    // 捕获首个promise的异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new JFPromise((resolve, reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        // try {
        //   const value = onFulfilled(this.value);
        //   resolve(value);
        // } catch (error) {
        //   reject(error);
        // }
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
        // try {
        //   const reason = onRejected(this.reason);
        //   resolve(reason);
        // } catch (error) {
        //   reject(error);
        // }
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
  
      // 将成功的回调和失败的回调放入到数组中
      if(onFulfilled) {
        // this.onFulfilledFns.push(onFulfilled);
        this.onFulfilledFns.push(() => {
          // try {
          //   const value = onFulfilled(this.value);
          //   resolve(value);
          // } catch (error) {
          //   reject(error);
          // }
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
        })
      }
      if(onRejected) {
        this.onRejectedFns.push(() => {
          // try {
          //   const reason = onRejected(this.reason);
          //   resolve(reason);
          // } catch (error) {
          //   reject(error);
          // }
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
        });
      }

    })
  }
}

const promise = new JFPromise((resolve, reject) => {
  resolve('11111');
})

promise.then(res => {
  console.log('res1:', res);
  return 'aaaaa';
}, err => {
  console.log('err1:', err);
}).then(res => {
  console.log('res2:', res);
}, err => {
  console.log('err2:', err);
})
```

### catch方法实现

* .catch写法实现
* then方法第二个参数undefined判断

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          })
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          })
        });
      }
    }
    // 捕获首个promise的异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // catch方法
    onRejected = onRejected || (err => { throw err; });
    // 链式调用
    return new JFPromise((resolve, reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
  
      // 将成功的回调和失败的回调放入到数组中
      if(this.status === PROMISE_STATUS_PENDING) {
        if(onFulfilled) {
          // this.onFulfilledFns.push(onFulfilled);
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
          })
        }
        if(onRejected) {
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
          });
        }
      }

    })
  }

  catch(onRejected) {
    this.then(undefined, onRejected);
  }
}

const promise = new JFPromise((resolve, reject) => {
  // resolve('11111');
  reject('22222');
})

promise.then(res => {
  console.log('res1:', res);
}).catch(err => {
  console.log('err2:', err);
})
```

### finally方法实现

* .finally方法实现
* onfulfilled值判断

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          })
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          })
        });
      }
    }
    // 捕获首个promise的异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // catch方法
    onRejected = onRejected || (err => { throw err; });
    // finally方法优化
    onFulfilled = onFulfilled || (value => { return value; });
    // 链式调用
    return new JFPromise((resolve, reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
  
      // 将成功的回调和失败的回调放入到数组中
      if(this.status === PROMISE_STATUS_PENDING) {
        if(onFulfilled) {
          // this.onFulfilledFns.push(onFulfilled);
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
          })
        }
        if(onRejected) {
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
          });
        }
      }

    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(() => {
      onFinally();
    }, () => {
      onFinally();
    })
  }
}

const promise = new JFPromise((resolve, reject) => {
  resolve('11111');
  // reject('22222');
})

promise.then(res => {
  console.log('res1:', res);
}).catch(err => {
  console.log('err1:', err);
}).finally(() => {
  console.log('finally');
})
```

### Promise类方法实现resolve,reject

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          })
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          })
        });
      }
    }
    // 捕获首个promise的异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // catch方法
    onRejected = onRejected || (err => { throw err; });
    // finally方法优化
    onFulfilled = onFulfilled || (value => { return value; });
    // 链式调用
    return new JFPromise((resolve, reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
  
      // 将成功的回调和失败的回调放入到数组中
      if(this.status === PROMISE_STATUS_PENDING) {
        if(onFulfilled) {
          // this.onFulfilledFns.push(onFulfilled);
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
          })
        }
        if(onRejected) {
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
          });
        }
      }

    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(() => {
      onFinally();
    }, () => {
      onFinally();
    })
  }

  static resolve(value) {
    return new JFPromise((resolve, reject) => { resolve(value); })
  }

  static reject(reason) {
    return new JFPromise((resolve, reject) => { reject(reason); })
  }
}

JFPromise.resolve('aaaaa').then(res => {
  console.log('res1:', res);
})

JFPromise.reject('err message').catch(err => {
  console.log('err:', err);
})
```

### Promise类方法实现all,allSettled

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          })
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          })
        });
      }
    }
    // 捕获首个promise的异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // catch方法
    onRejected = onRejected || (err => { throw err; });
    // finally方法优化
    onFulfilled = onFulfilled || (value => { return value; });
    // 链式调用
    return new JFPromise((resolve, reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
  
      // 将成功的回调和失败的回调放入到数组中
      if(this.status === PROMISE_STATUS_PENDING) {
        if(onFulfilled) {
          // this.onFulfilledFns.push(onFulfilled);
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
          })
        }
        if(onRejected) {
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
          });
        }
      }

    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(() => {
      onFinally();
    }, () => {
      onFinally();
    })
  }

  static resolve(value) {
    return new JFPromise((resolve, reject) => { resolve(value); })
  }

  static reject(reason) {
    return new JFPromise((resolve, reject) => { reject(reason); })
  }

  static all(promises) {
    return new JFPromise((resolve, reject) => {
      const list = []; // 接收所有promise的res返回值
      promises.forEach(promise => {
        promise.then(res => {
          list.push(res);
          if(list.length === promises.length) {
            resolve(list);
          }
        }, err => {
          reject(err);
        })
      })
    })
  }

  static allSettled(promises) {
    return new JFPromise(resolve => {
      const results = [];
      promises.forEach(promise => {
        promise.then(res => {
          results.push({ status: PROMISE_STATUS_FULFILLED, value: res });
          if(results.length === promises.length) {
            resolve(results);
          }
        }, err => {
          results.push({ status: PROMISE_STATUS_REJECTED, reason: err });
          if(results.length === promises.length) {
            resolve(results);
          }
        })
      })
    }) 
  }
}

const p1 = new JFPromise((resolve, reject) => {
  setTimeout(() => { resolve('11111'); }, 1000);
})
const p2 = new JFPromise((resolve, reject) => {
  setTimeout(() => { reject('22222'); }, 2000);
})
const p3 = new JFPromise((resolve, reject) => {
  setTimeout(() => { resolve('33333'); }, 3000);
})

JFPromise.all([p1, p2, p3]).then(res => {
  console.log('res:', res);
}).catch(err => {
  console.log('err:', err);
})

JFPromise.allSettled([p1, p2, p3]).then(res => {
  console.log('res:', res);
})
```

### Promise类方法实现race,any

```js
// promise三种状态
const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class JFPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log('resolve被调用');
          // 执行then传进来的第一个回调函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          })
        });
      }
    }

    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if(this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log('reject被调用');
          // 执行then传进来的第二个回调函数
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          })
        });
      }
    }
    // 捕获首个promise的异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // catch方法
    onRejected = onRejected || (err => { throw err; });
    // finally方法优化
    onFulfilled = onFulfilled || (value => { return value; });
    // 链式调用
    return new JFPromise((resolve, reject) => {
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if(this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
  
      // 将成功的回调和失败的回调放入到数组中
      if(this.status === PROMISE_STATUS_PENDING) {
        if(onFulfilled) {
          // this.onFulfilledFns.push(onFulfilled);
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
          })
        }
        if(onRejected) {
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
          });
        }
      }

    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(() => {
      onFinally();
    }, () => {
      onFinally();
    })
  }

  static resolve(value) {
    return new JFPromise((resolve, reject) => { resolve(value); })
  }

  static reject(reason) {
    return new JFPromise((resolve, reject) => { reject(reason); })
  }

  static all(promises) {
    return new JFPromise((resolve, reject) => {
      const list = []; // 接收所有promise的res返回值
      promises.forEach(promise => {
        promise.then(res => {
          list.push(res);
          if(list.length === promises.length) {
            resolve(list);
          }
        }, err => {
          reject(err);
        })
      })
    })
  }

  static allSettled(promises) {
    return new JFPromise(resolve => {
      const results = [];
      promises.forEach(promise => {
        promise.then(res => {
          results.push({ status: PROMISE_STATUS_FULFILLED, value: res });
          if(results.length === promises.length) {
            resolve(results);
          }
        }, err => {
          results.push({ status: PROMISE_STATUS_REJECTED, reason: err });
          if(results.length === promises.length) {
            resolve(results);
          }
        })
      })
    }) 
  }

  static race(promises) {
    return new JFPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(res => {
          resolve(res);
        },err => {
          reject(err);
        })
      })
    })
  }
  // 1.至少有一个成功就回调
  // 2.或所有promise都reject再回调
  static any(promises) {
    const reasons = [];
    return new JFPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(res => {
          resolve(res);
        }, err => {
          reasons.push(err);
          if(reasons.length === promises.length) {
            reject(reasons);
          }
        })
      })
    })
  }
}

const p1 = new JFPromise((resolve, reject) => {
  setTimeout(() => { reject('11111'); }, 4000);
})

const p2 = new JFPromise((resolve, reject) => {
  setTimeout(() => { reject('22222'); }, 2000);
})

const p3 = new JFPromise((resolve, reject) => {
  setTimeout(() => { reject('33333'); }, 3000);
})

// JFPromise.all([p1, p2, p3]).then(res => {
//   console.log('res:', res);
// }).catch(err => {
//   console.log('err:', err);
// })

// JFPromise.allSettled([p1, p2, p3]).then(res => {
//   console.log('res:', res);
// })

JFPromise.any([p1, p2, p3]).then(res => {
  console.log('res:', res);
}, err => {
  console.log('err:', err);
})
```

**coderwhy yyds!!!**