---
title: 'Node中使用mysql及sequelize基本用法'
date: 2021-12-04 18:00:00
permalink: '/posts/blogs/Node中使用mysql及sequelize基本用法'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - mysql
 - node.js
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

## Node中使用mysql

* 前面我们所有的操作都是在GUI工具中，通过执行SQL语句来获取结果的，那真实开发中肯定是通过代码来完成所有的操作的；
* 那么如何可以在Node的代码中执行SQL语句来，这里我们可以借助于两个库：
	* mysql：最早的Node连接MySQL的数据库驱动；
	* **mysql2**：在mysql的基础之上，进行了很多的优化、改进；

## 基本使用( 先npm install mysql2 )

```js
const mysql = require('mysql2');

// 1.创建Mysql连接
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'zjf',
  user: 'root',
  password: '*****'
});

// 2.执行sql语句
const statement = `
  SELECT * FROM products WHERE price > 8000;
`;

connection.query(statement, (err, results, fields) => {
  console.log(results);
  // connection.destroy();
  connection.end();
});

```

## 预处理语句

* **提高性能**：将创建的语句模块发送给MySQL，然后MySQL编译（解析、优化、转换）语句模块，并且存储 它但是不执行，之后我们在真正执行时会给?提供实际的参数才会执行；就算多次执行，也只会编译一次，所 以性能是更高的；
* **防止SQL注入**：之后传入的值不会像模块引擎那样就编译，那么一些SQL注入的内容不会被执行；or 1 = 1不 会被执行；
* 如果再次执行预编译语句，它将会从LRU（Least Recently Used） **Cache**中获取获取，**省略了编译statement 的时间**来提高性能

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'zjf',
  user: 'root',
  password: '******'
});

const statement = `
  SELECT * FROM products WHERE price > ? AND score > ?; // 语句区别
`;
// connection.execute,注意写法区别
connection.execute(statement, [6000, 7], (err, results) => {
  console.log(results);
})
```

## 连接池和Promise用法

* 前面我们是创建了一个连接（connection），但是如果我们有**多个请求**的话，该连接很有可能正在被占用，那么 我们是否需要每次一个请求都去创建一个新的连接呢？
  * 事实上，mysql2给我们提供了连接池（**connection pools**）；
  * 连接池可以**在需要的时候自动创建连接**，并且创建的连接**不会被销毁**，**会放到连接池中**，**后续可以继续使用**；
  * **我们可以在创建连接池的时候设置LIMIT**，也就是**最大创建个数**；

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'zjf',
  user: 'root',
  password: '******',
  connectionLimit: 10 // 设置最大连接数量
});
// 预处理?
const statement = `
  SELECT * FROM products WHERE price > ? AND score > ?;
`;
// promise用法
connection.promise().execute(statement, [6000, 7]).then(([results, fields]) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});
```

## ORM(sequelize操作数据库)

* **对象关系映射**（英语：Object Relational Mapping，简称ORM，或O/RM，或O/R mapping），是一种程序 设计的方案：
  * 从效果上来讲，它提供了一个可在编程语言中，使用 **虚拟对象数据库** 的效果；
  * 比如在Java开发中经常使用的ORM包括：Hibernate、MyBatis；
* Node当中的ORM我们通常使用的是 **sequelize**;
  * **Sequelize**是用于Postgres，MySQL，MariaDB，SQLite和Microsoft SQL Server的基于Node.js 的 ORM；
* 将Sequelize和MySQL一起使用需要安装**mysql2**和**sequelize**;

### sequelize基本使用

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zjf', 'root', '******', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log('连接数据库成功~');
}).catch((err) => {
  console.log('连接数据库失败~');
})

```

### sequelize单表操作

```js
const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize('zjf', 'root', '******', {
  host: 'localhost',
  dialect: 'mysql'
});
// 类映射至表
class Product extends Model{};
Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.DOUBLE,
  score: DataTypes.DOUBLE
},{
  tableName: 'products', // 类映射对应的表
  createdAt: false, // 暂时不使用createdAt和updatedAt
  updatedAt: false,
  sequelize  // 数据库相关
})

async function queryProducts() {
  // 1.查询products表中所有内容
  // const result = await Product.findAll({ // 添加筛选条件
  //   where: {
  //     price: {
  //       [Op.gte]: 5000 // gt:> gte:>= lt:< lte:<= 查询price>=5000的数据
  //     }
  //   }
  // });
  // console.log(result);

  // 2.插入数据
  // const result = await Product.create({
  //   title: '三星nova',
  //   price: 3450,
  //   score: 5.0
  // })
  // console.log(result);

  // 3.更新数据
  const result = await Product.update({
    price: 3688
  },{
    where: {
      id: 1
    }
  });
  console.log(result);
}

queryProducts();
```

### sequelize的一对多操作

```js
const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize('zjf', 'root', '******', {
  host: 'localhost',
  dialect: 'mysql'
});
// 类映射至表
class Brand extends Model {};
Brand.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: DataTypes.STRING,
  phoneRank: DataTypes.INTEGER
}, {
  tableName: 'brand',
  createdAt: false,
  updatedAt: false,
  sequelize
})

class Product extends Model{};
Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.DOUBLE,
  score: DataTypes.DOUBLE,
  brandId: {
    field: 'brand_id',
    type: DataTypes.INTEGER,
    references: {
      model: Brand, // 指定外键所在的类
      key: 'id'
    }
  }
},{
  tableName: 'products', // 类映射对应的表
  createdAt: false, // 暂时不使用createdAt和updatedAt
  updatedAt: false,
  sequelize  // 数据库相关
})

// 将两张表联系在一起
Product.belongsTo(Brand, {
  foreignKey: 'brandId'
});

async function queryProducts() { // 多表查询
  const result = await Product.findAll({
    include: {  // JOIN BRAND类，JOIN `brand`表
      model: Brand
    }
  });
  console.log(result);
}

queryProducts();
```

### sequelize的多对多映射操作

```js
const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize('zjf', 'root', '******', {
  host: 'localhost',
  dialect: 'mysql'
});

// Student
class Student extends Model {}
Student.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNotNull: false
  },
  age: DataTypes.INTEGER
}, {
  tableName: 'students',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// Course
class Course extends Model {}
Course.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNotNull: false
  },
  price: DataTypes.DOUBLE
}, {
  tableName: 'courses',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// StudentCourse
class StudentCourse extends Model {}
StudentCourse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: { // 列名不对应
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'id'
    },
    field: 'student_id' // 映射列名
  },
  courseId: { // 列名不对应
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    },
    field: 'course_id' // 映射列名
  }
}, {
  tableName: 'students_select_courses',
  createdAt: false,
  updatedAt: false,
  sequelize
});

// 多对多关系的联系
Student.belongsToMany(Course, {
  through: StudentCourse, // 经过关系表`students_select_courses`类(StudentCourse)
  foreignKey: 'studentId',
  otherKey: 'courseId'
});

Course.belongsToMany(Student, {
  through: StudentCourse, // 经过关系表`students_select_courses`类(StudentCourse)
  foreignKey: 'courseId',
  otherKey: 'studentId'
});

async function queryProducts() {
  const result = await Student.findAll({
    include: { // JOIN 操作并处理成了对象数组{}数据[]
      model: Course
    }
  });
  console.log(result);
}

queryProducts();
```