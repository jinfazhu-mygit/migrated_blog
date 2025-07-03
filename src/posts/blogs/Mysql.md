---
title: 'Mysql'
date: 2021-12-01 22:25:00
permalink: '/posts/blogs/Mysql'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - mysql
 - sql
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---

## MySql

* 通常我们将数据划分成两类：**关系型数据库**和**非关系型数据库**；
* 关系型数据库：MySQL、Oracle、DB2、SQL Server、Postgre SQL等； 
	* 关系型数据库通常我们会创建很多个二维数据表； 
	* 数据**表之间相互关联**起来，形成一对一、一对多、多对对等关系； 
	* 之后可以利用SQL语句在多张表中查询我们所需的数据； 
	* **支持事务，对数据的访问更加的安全**
* 非关系型数据库：MongoDB、Redis、Memcached、HBse等；
	* **非关系型数据库**的英文其实是Not only SQL，也简称为**NoSQL**； 
	* 相对于关系型数据库更简单一些，存储数据也会更加自由（甚至我们可以直接将一个复杂的json对象直接塞入到数据库中）； 
	* NoSQL是**基于Key-Value的对应关系**，并且查询的过程中**不需要经过SQL解析**，所以性能更高； 
	* NoSQL通常**不支持事物**，需要在自己的程序中来保证一些原子性的操作；
### 下载mysql软件
* 下载地址：https://dev.mysql.com/downloads/mysql/
* Windows推荐下载MSI的版本

### MySql连接

* 添加Path环境变量 C:\Program Files\MySQL\MySQL Server 8.0\bin (默认)

* 终端输入：**mysql -u root -p**  输入密码登录

### 数据库相关操作

* 一个数据库软件中，可以包含很多个数据库，查看数据库：**show databases;**
* 在终端直接**创建一个属于自己的新的数据库**（一般情况下一个新的项目会对应一个新的数据库）：**create database zjf;**
* 查看当前正在使用的数据库：**select database();**
* 使用我们创建的数据库：**use zjf**;
* 查看所有表：**show tables;**
* 在数据库中，创建一张表：

```
create table users( // 回车
	name varchar(20),
	age int,
	height double
);
```

* 插入数据

```
insert into users (name, age, height) values ("xiaoming", 22, 1.70);
insert into users (name, age, height) values ("zhujinfa", 21, 1.72);
```

### GUI工具

* **Navicat**，SQLYog,TablePlus...
* **Navicat**操作
* sql语句熟悉

### SQL数据类型

* **数字类型**
  * 整数数字类型：INTEGER，**INT***，SMALLINT，TINYINT，MEDIUMINT，**BIGINT**；
  * 浮点数字类型：FLOAT，DOUBLE（FLOAT是4个字节，DOUBLE是8个字节）；
  * 精确数字类型：DECIMAL，NUMERIC（DECIMAL是NUMERIC的实现形式），DECIMAL(10, 2)表示保留两位小数；
* **日期类型**
  * **YEAR**以YYYY格式显示值：范围 1901到2155，和 0000；
  * **DATE**类型用于具有日期部分但没有时间部分的值：支持的范围是 '1000-01-01' 到 '9999-12-31'；
  * **DATETIME**类型用于包含日期和时间部分的值：支持的范围是1000-01-01 00:00:00到9999-12-31 23:59:59;
  * **TIMESTAMP**数据类型被用于同时包含日期和时间部分的值：它的范围是UTC的时间范围：'1970-01-01 00:00:01'到'2038-01-19 03:14:07';
  * **DATETIME**或**TIMESTAMP** 值可以包括在高达微秒（6位）精度的后小数秒一部分：比如DATETIME表示的范围可以是'1000-01-01 00:00:00.000000'到'9999-12-31 23:59:59.999999';
* **字符串类型**
  * **CHAR**类型在创建表时为**固定长度**，长度可以是**0到255之间的任何值**，在被查询时，会删除后面的空格；
  * **VARCHAR**类型的值是可变长度的字符串，长度可以指定为0到65535之间的值，在被查询时，不会删除后面的空格；
  * **BINARY**和**VARBINARY** 类型用于存储二进制字符串，存储的是字节字符串；
  * **BLOB**用于存储大的二进制类型；
  * **TEXT**用于存储大的字符串类型；

### 常见表约束

* **PRIMARY KEY**
  * 一张表中，我们为了区分每一条记录的**唯一性**，必须有一个字段是**永远不会重复**，并且**不会为空**的，这个字段我们通常会 将它设置为**主键**；
  * 主键也**可以是多列索引**，PRIMARY KEY(key_part, ...)，我们一般称之为**联合主键**；
* **UNIQUE**
  * 某些字段在开发中我们希望是唯一的，**不会重复**的，比如**手机号码**、**身份证号码**等，这个字段我们可以使用**UNIQUE**来约束;
* **NOT NULL**
  * 某些字段我们要求用户必须插入值，**不可以为空**，这个时候我们可以使用 NOT NULL 来约束；
* **DEFAULT**
  * 某些字段我们希望在没有设置值时给予一个默认值，这个时候我们可以使用 DEFAULT来完成；
* **AUTO_INCREMENT**
  * 某些字段我们希望**不设置值时可以自动进行递增**，**比如用户的id**，这个时候可以使用**AUTO_INCREMENT**来完成；

### **SQL语句**

* **DDL**（Data Definition Language）：数据定义语言；
  * 可以通过DDL语句**对数据库或者表**进行：创建、删除、修改等操作；
* **对数据库的操作**

```sql
# 查看所有数据库
SHOW DATABASES;

# 选中某个数据库
USE zjf;

# 查看当前正在使用的数据库
SELECT DATABASE();

# 新建数据库
-- CREATE DATABASE zzjf;
-- CREATE DATABASE IF NOT EXISTS zzjf;
CREATE DATABASE IF NOT EXISTS zzjjf DEFAULT CHARACTER SET utf8mb4 // 设定字符集
	COLLATE utf8mb4_0900_ai_ci;  // 设定排序规则

# 删除数据库
DROP DATABASE IF EXISTS zzjjf;

# 修改数据库的编码
ALTER DATABASE bili CHARACTER SET = utf8 
	COLLATE = utf8_unicode_ci;
```

* **对表的操作**


```sql
# 查看所有表
SHOW TABLES;

# 新建表
CREATE TABLE IF NOT EXISTS `students`(
	`name` VARCHAR(10),
	`age` INT,
	`score` INT,
	`height` DOUBLE
);

# 删除表
DROP TABLE IF EXISTS `users`;

# 查看表的结构
DESC users;
# 查看创建表的sql语句
SHOW CREATE TABLE `students`;

# 完整的创建表的语法
CREATE TABLE IF NOT EXISTS `users`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	age INT DEFAULT 0,
	phoneNum VARCHAR(20) UNIQUE,
	createTime TIMESTAMP
);

# 修改表
# 1.修改表名
ALTER TABLE `users` RENAME TO `user`;
# 2.添加新的一列
ALTER TABLE `user` ADD `updateTime` TIMESTAMP;
# 3.修改字段名称
ALTER TABLE `user` CHANGE `phoneNum` `telPhone` VARCHAR(20);
# 4.修改字段类型
ALTER TABLE `user` MODIFY `name` VARCHAR(30);
# 5.删除某一个字段
ALTER TABLE `user` DROP `age`;

# 根据一个表结构创建新表
CREATE TABLE `user1` LIKE `user`;
# 根据另一个表的所有内容，创建一个新表,只复制内容
CREATE TABLE `user2` (SELECT * FROM `user`);
```



* **DML**（Data Manipulation Language）：数据操作语言；
  * 可以通过DML语句对**表**进行：**添加**、**删除**、**修改**等操作；

```sql
# 插入数据(时间默认值)
INSERT INTO `user` VALUES (100, 'zjf', '12345678', '2021-12-2', '2021-12-2');

INSERT INTO `user` (name, telPhone, createTime, updateTime) // 不带id,id将自动根据上一条数据id+1生成
  VALUES ('zzjf', '112345678', '2021-12-2', '2021-12-2');
	
INSERT INTO `user` (name, telPhone) VALUES ('zjff', '112234568');

# 创建时间以及更新时间自动生成
ALTER TABLE `user` MODIFY `createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP; // 创建时间
ALTER TABLE `user` MODIFY `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; // 创建时间，更新时间自动生成

# 删除操作
DELETE FROM `user`; //删除user表所有数据
DELETE FROM `user` WHERE id = 102;

# 修改数据
UPDATE `user` SET name = 'zzzjf', telPhone = '111123456' WHERE id = 105;
```



* **DQL**（Data Query Language）：数据查询语言；
  * 可以通过DQL从**数据库中查询记录**；（重点）


**基本查询**

```sql
# 格式
SELECT select_expr [, select_expr]...
	[FROM table_references]
	[WHERE where_condition]
	[ORDER BY expr [ASC | DESC]]
	[LIMIT {[offset,] row_count | row_count OFFSET offset}]
	[GROUP BY expr]
	[HAVING where_condition]
# 创建products的表
CREATE TABLE IF NOT EXISTS `products` (
	id INT PRIMARY KEY AUTO_INCREMENT,
	brand VARCHAR(20),
	title VARCHAR(100) NOT NULL,
	price DOUBLE NOT NULL,
	score DECIMAL(2,1),
	voteCnt INT,
	url VARCHAR(100),
	pid INT
);

# 1.基本查询
# 查询表中的所有数据
SELECT * FROM `products`;
# 查询指定的字段
SELECT title, price FROM `products`;
# 对字段结果起别名
SELECT title as phoneTitle, price as currentPrice FROM `products`;

# 2.where条件查询
# 2.1条件判断语句
# 查询价格小于1000的手机
SELECT * FROM `products` WHERE price < 1000;
# 查询价格等于999的手机
SELECT * FROM `products` WHERE price = 999;
# 查询价格不等于999的手机
SELECT * FROM `products` WHERE price != 999;
SELECT * FROM `products` WHERE price <> 999;
# 查询品牌是华为的手机
SELECT * FROM `products` WHERE brand = '华为';

# 2.2逻辑运算语句
# 查询1000到2000之间的手机
SELECT * FROM `products` WHERE price > 1000 AND price < 2000;
SELECT * FROM `products` WHERE price > 1000 && price < 2000;
# BETWEEN AND包含等于
SELECT * FROM `products` WHERE price BETWEEN 1000 AND 2000;

# 查询价格在5000以上或华为手机
SELECT * FROM `products` WHERE price > 5000 || brand = '华为';
SELECT * FROM `products` WHERE price > 5000 OR brand = '华为';

# 将某些值设为NULL
-- UPDATE `products` SET url = NULL WHERE id >= 84 && id<= 87;
# 查询某个值为NULL的数据
SELECT * FROM `products` WHERE url IS NULL;
SELECT * FROM `products` WHERE url <=> NULL;
SELECT * FROM `products` WHERE url IS NOT NULL;

# 2.3模糊查询
SELECT * FROM `products` WHERE title LIKE '%P%'; // 查询所有title包含'P'的数据,'%'表示零个或多个
SELECT * FROM `products` WHERE title LIKE '_P%'; // 查询所有title第二个字符为'P'的数据

# 2.4IN表示取多个值中的其中一个
SELECT * FROM `products` WHERE brand = '华为' || brand = '小米' || brand = '苹果';
SELECT * FROM `products` WHERE brand IN ('华为', '小米', '苹果');

# 3.对结果进行排序
SELECT * FROM `products` WHERE brand IN ('华为', '小米', '苹果') 
												 ORDER BY price ASC, score DESC;  // ASC升序，DESC降序

# 4.分页查询
SELECT * FROM `products` LIMIT 20 OFFSET 0; // 查询条数，偏移量
SELECT * FROM `products` LIMIT 20 OFFSET 20; // 查询20条，偏移量为20
SELECT * FROM `products` LIMIT 40, 20; // 偏移40条，查20条
```

**聚合函数与GROUP BY**

```sql
# 1.聚合函数的使用(对数据组的操作)
# 求所有手机的价格总和
SELECT SUM(price) AS totalPrice FROM `products`;
# 求所有华为手机的价格总和
SELECT SUM(price) AS totalPrice FROM `products` WHERE brand = '华为';
# 求华为手机的平均价格
SELECT AVG(price) AS avgPrice FROM `products` WHERE brand = '华为';
# 最高手机价格和最低手机价格
SELECT MAX(price) FROM `products`;
SELECT MIN(price) FROM `products`;

# 求华为手机的个数
SELECT COUNT(*) FROM `products` WHERE brand = '华为';
SELECT COUNT(url) FROM `products` WHERE brand = '苹果'; // 苹果手机数据中url不为null的条数
# 去重
SELECT COUNT(price) FROM `products`;  // 所有条数
SELECT COUNT(DISTINCT price) FROM `products`; // 对价格去重后的数据条数

# 2.GROUP BY分组结合聚合函数的使用
SELECT brand, AVG(price), COUNT(*), AVG(score) FROM `products` GROUP BY brand;

# 3.HAVING可对分组之后查询到的结果进一步筛选
SELECT brand, AVG(price) avgPrice, COUNT(*), AVG(price) FROM `products`
 GROUP BY brand HAVING avgPrice > 2000;
# 求不同品牌的手机评分大于7.5的手机平均价格
SELECT brand, AVG(price) FROM `products` WHERE score > 7.5 GROUP BY brand;
```

**多表设计与连接**

```sql
# 1.创建brand表
CREATE TABLE IF NOT EXISTS `brand`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name varchar(20) NOT NULL,
	website varchar(100) UNIQUE,
	phoneRank INT
);
# 插入数据
INSERT INTO `brand` (name, website, phoneRank) VALUES ('华为', 'www.huawei.com', 2);
INSERT INTO `brand` (name, website, phoneRank) VALUES ('苹果', 'www.apple.com', 10);
INSERT INTO `brand` (name, website, phoneRank) VALUES ('小米', 'www.mi.com', 5);
INSERT INTO `brand` (name, website, phoneRank) VALUES ('三星', 'www.sumsung.com', 6);
INSERT INTO `brand` (name, website, phoneRank) VALUES ('OPPO', 'www.oppo.com', 8);
INSERT INTO `brand` (name, website, phoneRank) VALUES ('酷派', 'www.coolpad.com', 9);

# 2.给brand_id设置引用brand表的id
# 添加brand_id字段
ALTER TABLE `products` ADD `brand_id` INT;
# 设置brand_id为外键
ALTER TABLE `products` ADD FOREIGN KEY(brand_id) REFERENCES brand(id);

# 设置brand_id的值
UPDATE `products` SET `brand_id` = 1 WHERE brand = '华为';
UPDATE `products` SET `brand_id` = 2 WHERE brand = '苹果';
UPDATE `products` SET `brand_id` = 3 WHERE brand = '小米';
UPDATE `products` SET `brand_id` = 5 WHERE brand = 'OPPO';

# 3.修改和删除外键引用的id,跟其他表的引用有关,action[ON UPDATE(CASCADE,RESTRICT), ON DELETE(CASCADE,RESTRICT)]
UPDATE `brand` SET id = 100 WHERE name = '华为';

# 4.修改brand_id关联外键时的action ONUPDATE ONDELETE
# 4.1获取到目前的外键的名称 CONSTRAINT ???` FOREIGN KEY (`brand_id`)
SHOW CREATE TABLE `products`;

-- CREATE TABLE `products` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `brand` varchar(20) DEFAULT NULL,
--   `title` varchar(100) NOT NULL,
--   `price` double NOT NULL,
--   `score` decimal(2,1) DEFAULT NULL,
--   `voteCnt` int DEFAULT NULL,
--   `url` varchar(100) DEFAULT NULL,
--   `pid` int DEFAULT NULL,
--   `brand_id` int DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `brand_id` (`brand_id`),
--   CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

# 4.2根据名称将外键删除
ALTER TABLE `products` DROP FOREIGN KEY products_ibfk_1;
# 4.3重新添加外键约束,重新定义action(ON UPDATE, ON DELETE)的属性
ALTER TABLE `products` ADD FOREIGN KEY (brand_id) REFERENCES brand(id)
																			ON UPDATE CASCADE
																			ON DELETE RESTRICT;
# 4.4再修改，修改成功
UPDATE `brand` SET id = 100 WHERE name = '华为';
```

**多表查询(内连接，左连接，右连接)**

```sql
# 1.建表(A, B)
CREATE TABLE IF NOT EXISTS `students`( // 学生表
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	age INT
);

CREATE TABLE IF NOT EXISTS `courses`( // 课程表
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	price DOUBLE
);

INSERT INTO `students` (name, age) VALUES('why', 18);
INSERT INTO `students` (name, age) VALUES('tom', 22);
INSERT INTO `students` (name, age) VALUES('lilei', 25);
INSERT INTO `students` (name, age) VALUES('lucy', 16);
INSERT INTO `students` (name, age) VALUES('lily', 20);
INSERT INTO `courses` (name, price) VALUES ('英语', 100);
INSERT INTO `courses` (name, price) VALUES ('语文', 666);
INSERT INTO `courses` (name, price) VALUES ('数学', 888);
INSERT INTO `courses` (name, price) VALUES ('历史', 80);
INSERT INTO `courses` (name, price) VALUES ('物理', 888);
INSERT INTO `courses` (name, price) VALUES ('生物', 30);

# 2.创建关系表(student_select_course)
CREATE TABLE IF NOT EXISTS `students_select_courses`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	student_id INT NOT NULL,
	course_id INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES students(id) ON UPDATE CASCADE,
	FOREIGN KEY (course_id) REFERENCES courses(id) ON UPDATE CASCADE
);

-- DROP TABLE IF EXISTS `students_select_courses`;
# 3.学生选课
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 1);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 3);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (1, 4);

INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 2);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (3, 3);

INSERT INTO `students_select_courses` (student_id, course_id) VALUES (4, 1);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (4, 2);
INSERT INTO `students_select_courses` (student_id, course_id) VALUES (4, 4);

# 4.查询的需求
# 4.1查询所有选了课的学生，选了哪些课(stu表与ssc选课关系表连接，再与course表连接)(内联接，取交集)
SELECT stu.id id, stu.name stuName, stu.age stuAge, cs.id csId, cs.name csName, cs.price csPrice
FROM `students` stu 
JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
JOIN `courses` cs ON ssc.course_id = cs.id;
# 4.2查询所有学生的选课情况 (左连接)
SELECT stu.id id, stu.name stuName, stu.age stuAge, cs.id csId, cs.name csName, cs.price csPrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id;
# 4.3查询哪些学生没有选课 (左连接)
SELECT stu.id id, stu.name stuName, stu.age stuAge, cs.id csId, cs.name csName, cs.price csPrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE cs.id IS NULL;
# 4.4查询哪些课程没有被学生选择 (右连接)
SELECT stu.id id, stu.name stuName, stu.age stuAge, cs.id csId, cs.name csName, cs.price csPrice
FROM `students` stu
RIGHT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
RIGHT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE stu.id IS NULL;
# (左连接)
SELECT stu.id id, stu.name stuName, stu.age stuAge, cs.id csId, cs.name csName, cs.price csPrice
FROM `courses` cs
LEFT JOIN `students_select_courses` ssc ON cs.id = ssc.course_id
LEFT JOIN `students` stu ON ssc.student_id = stu.id
WHERE stu.id IS NULL;

# 4.5查询某个学生选了哪些课程
SELECT stu.id id, stu.name stuName, stu.age stuAge, cs.id csId, cs.name csName, cs.price csPrice
FROM `students` stu
LEFT JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
LEFT JOIN `courses` cs ON ssc.course_id = cs.id
WHERE stu.id = 2;
```

**对象和数组数据生成**

```sql
# 将联合查询到的数据转成对象(一对多-多列结果转对象)
SELECT 
	products.id id, products.title title, products.price price, 
	JSON_OBJECT('id', brand.id, 'name', brand.name, 'website', brand.website) brand // 另一个表的多个数据放入json对象里传递
FROM `products`
LEFT JOIN `brand` ON products.brand_id = brand.id;

# 将查询到的多条数据组织成对象，放入数组中(多对多-(先分组，再数组内放对象))
SELECT 
	stu.id id, stu.name name, stu.age age,
	JSON_ARRAYAGG(JSON_OBJECT('id', cs.id, 'name', cs.name, 'price', cs.price)) courses // 数组内放对象
FROM `students` stu 
JOIN `students_select_courses` ssc ON stu.id = ssc.student_id
JOIN `courses` cs ON ssc.course_id = cs.id
GROUP BY stu.id; // 按人员id分组
```


* **DCL**（Data Control Language）：数据控制语言；
  * 对**数据库、表格的权限**进行相关**访问控制**操作；

```sql
// 略
```

