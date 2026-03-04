# migrated_blog
旧博客迁移

# 发版流程
## 1.发版前请先解决yarn dev的warnings
## 2.git add .
## 3.git commit -m''
## 4.git push成功后github action流自动执行发版操作

# 注意如下事项!!!
## 1.md文件名 不能有+ 、 ， $ 
## 2.md文件title permalink不能有+ 、 ， $ 
## 3.title、permalink要和md文件名相同
## 4.md文件内容<>标签不在代码内部需要添加`<>`,一定保证这条，不然github的action发版会失败
## 5.编译文件注意使用无痕或强刷页面, 重新yarn dev
## 6.例如![20201203173047824](hy1glc0v225vaj30wl0hkn05.png)无法展示的图片会影响action发版
<!-- 46 |    <thead>
47 |            <th>表头1</th>
   |     ^^^^^^^^^^^^
48 |      <th>表头2</th>
   |      ^^^^^^^^^^^^
49 |    </thead> -->
<b>上述那两个th标签的warning不会影响action发版</b>


