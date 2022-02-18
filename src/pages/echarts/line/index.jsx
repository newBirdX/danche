import React, { Component } from 'react'
import { Card } from 'antd'
//按需加载echarts
import echarts from 'echarts/lib/echarts';
//导入折线图
import 'echarts/lib/chart/line'
//鼠标划入显示值
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
//图表副标题（图示）
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactECharts from 'echarts-for-react';
export default class Line extends Component {
    getOption1 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            tooltip:{
                trigger:"axis"
            },
            xAxis: {
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                  name:'订单量',
                  type: 'line',
                  data: [1300, 1400, 1800, 3000, 2000, 1500, 1300],
                  areaStyle: {}
                }
              ]
        }
        return option;
    }
    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            legend: {
                data:["OFO","摩拜","小蓝"]
              },
            tooltip:{
                trigger:"axis"
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'line',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                }, {
                    name: '摩拜',
                    type: 'line',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                }, {
                    name: '小蓝',
                    type: 'line',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                }
              ]
        }
        return option;
    }
    getOption3 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            legend: {
                data:["OFO","摩拜","小蓝"],
                orient: 'vertical',
                left: 'right'
              },
            tooltip:{
                trigger:"axis"
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'line',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                }, {
                    name: '摩拜',
                    type: 'line',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                }, {
                    name: '小蓝',
                    type: 'line',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                }
              ]
        }
        return option;
    }
  render() {
    return (
      <div>
          <Card title="折线图1" style={{height:"500px"}}>
          <ReactECharts option={this.getOption1()} />
          </Card>
          <Card title="折线图2" style={{marginTop:"10px"}}>
          <ReactECharts option={this.getOption2()} />
          </Card>
          <Card title="折线图3" style={{marginTop:"10px"}}>
          <ReactECharts option={this.getOption3()} />
          </Card>
      </div>
    )
  }
}

