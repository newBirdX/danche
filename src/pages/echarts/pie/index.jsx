import React, { Component } from 'react'
import { Card } from 'antd'
//按需加载echarts
import echarts from 'echarts/lib/echarts';
//导入饼图
import 'echarts/lib/chart/pie'
//鼠标划入显示值
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
//图表副标题（图示）
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactECharts from 'echarts-for-react';
export default class Bar extends Component {
    getOption1 = () => {
        let option = {
            title: {
                text: "用户骑行订单",
                x: "center"
            },
            legend: {
                orient: 'vertical',
                right: 0,
                top: 30,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: "item",
                formatter: "{a}<br/>{b}:{c}({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        { value: 1300, name: "周一" },
                        { value: 1400, name: "周二" },
                        { value: 1800, name: "周三" },
                        { value: 3000, name: "周四" },
                        { value: 2000, name: "周五" },
                        { value: 1500, name: "周六" },
                        { value: 1300, name: "周日" }
                    ],
                    radius: "75%",
                    center: ['50%', '60%'],
                }
            ]
        }
        return option;
    }
    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行订单",
                x: "center"
            },
            legend: {
                orient: 'vertical',
                right: 0,
                top: 30,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: "item",
                formatter: "{a}<br/>{b}:{c}({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        { value: 1300, name: "周一" },
                        { value: 1400, name: "周二" },
                        { value: 1800, name: "周三" },
                        { value: 3000, name: "周四" },
                        { value: 2000, name: "周五" },
                        { value: 1500, name: "周六" },
                        { value: 1300, name: "周日" }
                    ],
                    radius: ['40%', '70%'],
                    center: ['50%', '60%'],
                }
            ]
        }
        return option;
    }
    getOption3 = () => {
        let option = {
            title: {
                text: "用户骑行订单",
                x: "center"
            },
            legend: {
                orient: 'vertical',
                right: 0,
                top: 30,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: "item",
                formatter: "{a}<br/>{b}:{c}({d}%)"
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        { value: 1300, name: "周一" },
                        { value: 1400, name: "周二" },
                        { value: 1800, name: "周三" },
                        { value: 3000, name: "周四" },
                        { value: 2000, name: "周五" },
                        { value: 1500, name: "周六" },
                        { value: 1300, name: "周日" }
                    ].sort((a,b)=>{return a.value-b.value}),
                    roseType:"radius",
                    radius: '70%',
                    center: ['50%', '60%'],
                }
            ]
        }
        return option;
    }
  render() {
    return (
      <div>
          <Card title="饼图" style={{height:"500px"}}>
          <ReactECharts option={this.getOption1()} />
          </Card>
          <Card title="环形图" style={{marginTop:"10px"}}>
          <ReactECharts option={this.getOption2()} />
          </Card>
          <Card title="南丁格尔图" style={{marginTop:"10px"}}>
          <ReactECharts option={this.getOption3()} />
          </Card>
      </div>
    )
  }
}

