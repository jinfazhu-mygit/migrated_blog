var obj = {
  name: 'zjf',
  age: 21
}

var info = Object.create(obj, {
  address: {
    value: '北京市',
    enumerable: true
  }
})

console.log(info); // { address: '北京市' }
console.log(info.__proto__); // { name: 'zjf', age: 21 }
// hasOwnProperty是否在自身对象上,对象属性的判断
console.log(info.hasOwnProperty('address')); // true
console.log(info.hasOwnProperty('name')); // false

// in 操作符 判断属性是否能访问到
console.log("address" in info); // true
console.log('name' in info); // true