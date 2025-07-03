---
title: 'echarts-moment-swiper基本使用'
date: 2022-7-25 15:10:00
permalink: '/posts/blogs/echarts-moment-swiper基本使用'
isTimeLine: true
# sidebar: auto
# sidebarDepth: 1
category:
 - 我的前端路线
tag:
 - echarts
 - moment
 - swiper
# isShowComments: false
# publish: true
icon: pen-to-square
star: true
sticky: true
---


### [Echarts相关基本配置](https://echarts.apache.org/handbook/zh/get-started/)


```jsx
import { url } from 'inspector';
import React, { memo, useEffect } from 'react';
import * as echarts from 'echarts';

import './index.scss'
import myEvent from '../../../type/event';

export default memo(function HomePage() {
  useEffect(() => {
    const statisticDOM = document.getElementById('lg_help_statistic_charts'); // 挂载
    if (statisticDOM) {
      const statisticCharts = echarts.init(statisticDOM);
      let option = {
        grid: { // 表格大小位置设置
          x: "8%",//x 偏移量
          y: "26%", // y 偏移量
          width: "83%", // 宽度
          height: "60%"// 高度
        },
        // 添加tooltip提示
        tooltip: {
          trigger: 'axis'
        },
        legend: { // 折线图右侧小标位置及样式设置
          x: '68%',
          y: '8%',
          itemWidth: 13,
          itemHeight: 9,
          textStyle: {
            fontSize: 12,
            color: '#999'
          },
          data: [{
            name: '学生求助人数',
          }, {
            name: '月均人次',
          }]
        },
        xAxis: {
          name: '日期',
          type: 'category',
          boundaryGap: false,
          nameTextStyle: {
            color: '#999',
            padding: [0, 0, 0, 10]
          },
          axisLine: {
            show: false,    // 是否显示坐标轴轴线
          },
          axisTick: {
            show: false,    // 是否显示坐标轴刻度
          },
          axisLabel: {
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          name: '人数',
          type: 'value',
          nameTextStyle: {
            color: '#999',
            padding: [0, 0, 2, 0]
          },
          // 隐藏y轴
          axisLine: {
            show: false
          },
          // 隐藏刻度线
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 25,
            color: '#999999'
          },
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ["#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec"],
            },
          },
        },
        series: [
          {
            name: '学生求助人数',
            data: [76, 60, 45, 48, 70, 72, 42, 32, 60, 78, 60, 55],
            type: 'line',
            smooth: true,
            showSymbol: false, // 去除折线上的点
            lineStyle: {
              color: '#ff761b',
              fontColor: '#999',
              width: 1.5
            },
            itemStyle: {
              color: '#ff761b'
            }
          },
          {
            name: '月均人次',
            data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            type: 'line',
            smooth: true,
            showSymbol: false, // 去除折线上的点
            lineStyle: {
              color: '#0099ff',
              width: 1.4
            },
            itemStyle: {
              color: '#0099ff'
            },
            areaStyle: {
              color: '#b0d4e7'
            }
          },
        ]
      };
      statisticCharts.setOption(option);
    }
  }, [])

  useEffect(() => {
    return () => {

    }
  }, [])

  const appointSettingClick = () => {
    myEvent.emit('sideBarClick', {
      name: '预约时间设置',
      routerPath: 'meltalHealth/counsellingAppoint/appointTimeSetting'
    })
  }

  return (
    <div className='lg_mentalHealth_homePage'>
      <div className="lg_data_view">
        <div className="lg_graduate_data_total">
          <BlueTitle value="毕业数据总览" />
          <div className="lg_data_total_content">
            <DataItem text='今日预约人数' count='16' unit='人'></DataItem>
            <DataItem text='累计帮助学生人次' count='5600' unit='次'></DataItem>
            <DataItem text='心理咨询师数量' count='15' unit='名'></DataItem>
            <DataItem text='累计问卷填写数量' count='108' unit='份'></DataItem>
          </div>
        </div>
        <div className="lg_stu_help_statistic">
          <BlueTitle value="学生心理求助统计" />
          <div id="lg_help_statistic_charts">
          </div>
        </div>
      </div>
      <div className="lg_appoint_info">
        <div className="lg_data_title">
          <div className="lg_title_left"></div>
          <div className="lg_title_text">预约情况</div>
          <div className="lg_title_right_operate" onClick={appointSettingClick}>
            <div className="lg_icon"></div>
            <span>预约设置</span>
          </div>
        </div>
        
      </div>
    </div>
  )
})

interface BlueTitleProps {
  value: string
}

function BlueTitle(props: BlueTitleProps) {
  return (
    <div className="lg_data_title">
      <div className="lg_title_left"></div>
      <div className="lg_title_text">{props.value}</div>
    </div>
  )
}

interface DataItemProps {
  text: string,
  count: string,
  unit: string
}

function DataItem(props: DataItemProps) {
  const { text, count, unit } = props;
  return (
    <div className="lg_data_item">
      <div className="lg_data_left_img"></div>
      <div className="lg_data_right_textCount">
        <div className="lg_data_top">{props.text}</div>
        <div className="lg_data_bottom">
          <span>{props.count}</span><span>{props.unit}</span>
        </div>
      </div>
    </div>
  )
}
```



### [Moment基本使用](http://momentjs.cn/)

npm install moment

yarn add moment

pnpm install moment

#### 脚手架中文引入

```js
// index.tsx
import 'moment/locale/zh-cn'
```

#### 基本使用

```jsx
export default memo(function Moment() {
  // 用数字0表示当前周，1表示下周，-1表示上周,以此类推
  const [currentWeekNumber, setCurrentWeekNumber] = useState(0);
  
  // 获取当前周所有天的信息
  function getDateColumn(num: number) {
    // 获取日期及对应的周几
    let date = moment().add(7 * currentWeekNumber, 'days').weekday(num).format('MM/DD'); // 下currentWeekNumberz周的第num天
    let week = moment().add(7 * currentWeekNumber, 'days').weekday(num).format('dddd');
    if (date[0] === '0') date = date.slice(1);
    week = '周' + week.slice(2); // 3-19(周三)
    date = date.split('/').join('-');
    return date + `(${week})`
  }
  
  // 获取当前为当月第几周  传数字0表示当前周，1表示下周，-1表示上周,以此类推
  function getMonthWeek(addWeekNum: number): string {
    let currentTimeArr = moment().add(7 * addWeekNum, 'days').month("YYYY/MM/DD").format('YYYY/MM/DD').split('/')
    let year = currentTimeArr[0];
    let month = currentTimeArr[1];
    let day = currentTimeArr[2];
    //获取当前天的月有多少天
    let monthDayCount = moment(moment().add(7 * addWeekNum, 'days').month("YYYY/MM").format('YYYY/MM'), "YYYY/MM").daysInMonth()
    //创建一个新数组，用来接收本月所有周的周日，如果本月最后一天不是周日那也算是周未
    let monthWeekend = []
    console.log(`这月最后一天为周${moment(moment(`${year}/${month}/${monthDayCount} 00:00:00`).format()).day()}`);
    console.log(day);
    console.log(`这月有${monthDayCount}天`);
    // 如果这月最后一天不是周日
    monthWeekend.push(monthDayCount); // 先把这个月最后一天当周日放入周日数组，垫1
    let indexWeek = 0;
    console.log(day);
    for (let i = 1; i <= monthDayCount; i++) {
      let week = moment(moment(`${year}/${month}/${i} 00:00:00`).format()).day()
      if (i < 10 && day == '0' + i || day == i + '') {
        console.log(day);
        indexWeek = monthWeekend.length;
      } else {
        if (week == 0) {
          monthWeekend.push(i);
        }
      }
    }
    console.log(`这为第${month}月`);
    let str = '';
    switch (indexWeek) { // 一个月最多占用六周
      case 1: str = `第一周${currentWeekNumber === 0 ? '(本周)' : ''}`; break;
      case 2: str = `第二周${currentWeekNumber === 0 ? '(本周)' : ''}`; break;
      case 3: str = `第三周${currentWeekNumber === 0 ? '(本周)' : ''}`; break;
      case 4: str = `第四周${currentWeekNumber === 0 ? '(本周)' : ''}`; break;
      case 5: str = `第五周${currentWeekNumber === 0 ? '(本周)' : ''}`; break;
      case 6: str = `第六周${currentWeekNumber === 0 ? '(本周)' : ''}`; break;
      default: break;
    }
    return str;
  }
  return (
    
  )
})
```

### [swpier在react中使用](https://www.swiper.com.cn/index.html)

```jsx
import { Swiper, SwiperSlide } from 'swiper/react' // 引入js
import SwiperCore, { Autoplay, Pagination } from 'swiper/core'  // 引入核心插件和自动播放组件
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/swiper.min.css' // 引入样式\

SwiperCore.use([Autoplay, Pagination]) // 使用插件，插件名放入[]中，

export default function Demo(props) {
  return(
    <div className="lg_consultant_team_swiper">
        <Swiper
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper: any) => console.log(swiper)}
          autoplay={{
            delay: 3000, // 默认延迟3s播放下一张
            stopOnLastSlide: false, // 播放到最后一张时停止：否
            disableOnInteraction: false // 用户操作轮播图后停止 ：是
          }}
          pagination={{
            clickable: true
          }}
          loop={true}
        >
          {/* 咨询师人数/4  传入四个，显示四个， 组件轮播 */}
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div>
  )
}

```

