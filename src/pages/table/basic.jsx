import React, { Component } from 'react';
import { Card, Table } from 'antd'
import axios from "./../../axios"
const data=[
    {
        id:"0",
        name:"lc",
        sex:"男",
        state:"Study",
        interest:"篮球",
        birthday:"2000-01-01",
        address:"秦皇岛",
        time:"09:00"
    },
    {
        id:"1",
        name:"jarry",
        sex:"男",
        state:"Study",
        interest:"篮球",
        birthday:"2000-01-01",
        address:"秦皇岛",
        time:"09:00"
    },
    {
        id:"2",
        name:"xiaogang",
        sex:"男",
        state:"Study",
        interest:"篮球",
        birthday:"2000-01-01",
        address:"秦皇岛",
        time:"09:00"
    }
]
export default class Basic extends Component {
    state={
        data2:[]//动态表格数据
    }
    request=()=>{
       axios.ajax({
           url:"/table/list",
           data:{
               params:{
                   page:1
               }
           }
       }).then(res=>{
           if(res.code==="0"){
               this.setState({data2:res.result})
           }
       })
    }
  render() {
      let {data2}=this.state;
      //写好的渲染表格数据
      const columns=[
          {
              title:"id",
              dataIndex:"id"
          },
          {
              title:"用户名",
              dataIndex:"name"
          },
          {
              title:"性别",
              dataIndex:"sex"
          },
          {
              title:"状态",
              dataIndex:"state"
          },
          {
              title: "爱好",
              dataIndex: "interest"
          },
          {
              title: "生日",
              dataIndex: "birthday"
          },
          {
              title: "地址",
              dataIndex: "address"
          },
          {
              title: "早起时间",
              dataIndex: "time"
          }
      ]
    return <div>
        <Card title="基础表格">
            <Table columns={columns} dataSource={data} bordered={true} pagination={false}/>
        </Card>
        <Card title="动态获取数据表格">
            <Table columns={columns} dataSource={data2} bordered={true} pagination={false}/>
        </Card>
    </div>;
  }
  componentDidMount(){
      this.request();
  }
}
