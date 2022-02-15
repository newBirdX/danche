import React, { Component } from 'react';
import { Card, Table ,Modal,Button,message} from 'antd'
import axios from "./../../axios"
import Utils from './../../utils/utils';
const data=[
    {
        id:"0",
        name:"lc",
        sex:"男",
        state:"1",
        interest:"3",
        birthday:"2000-01-01",
        address:"秦皇岛",
        time:"09:00"
    },
    {
        id:"1",
        name:"jarry",
        sex:"男",
        state:"2",
        interest:"2",
        birthday:"2000-01-01",
        address:"秦皇岛",
        time:"09:00"
    },
    {
        id:"2",
        name:"xiaogang",
        sex:"男",
        state:"3",
        interest:"3",
        birthday:"2000-01-01",
        address:"秦皇岛",
        time:"09:00"
    }
]
export default class Basic extends Component {
    state={
        data:[], //静态数据
        data2:[]//动态表格数据
    }
    params={
        page:1
    }
    //获取动态数据
    request=()=>{
        let _this=this;
        // console.log("this",_this)
       axios.ajax({
           url:"/table/list",
           data:{
               params:{
                   page:this.params.page
               }
           }
       }).then(res=>{
           if(res.code==="0"){
               res.result.list.map((item,index)=>{
                   item.key=index;
               })
               this.setState({data2:res.result.list,
                selectedRowKeys:[],
                selectedIds:[] ,
                pagination:Utils.pagination(res,(current)=>{
                    this.params.page=current;
                    this.request();
                })
            })
           }
       })
    }
    //点击选中行
    onRowClick=(record,index)=>{
        let selectKey=[index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record 
        })
        // console.log(record)
        Modal.info({
            title:"信息",
            content:`用户名:${record.name}`
        })
    }
    //多选假装删除行
    handdleDel=()=>{
        let rowsId=this.state.selectedIds;
        Modal.confirm({
            title:"删除提示",
            content:`您确定要删除这些数据吗?${rowsId.join("、")}`,
            onOk:()=>{
                message.success("删除成功!")
                this.request();
            }
        })
    }
  render() {
      let {data,data2,selectedRowKeys}=this.state;
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
              dataIndex:"sex",
              render(sex){
                  return sex===1?"男":"女"
              }
          },
          {
              title:"状态",
              dataIndex:"state",
              render(state){
                  let config={
                      "1":"学习",
                      "2":"运动",
                      "3":"做家务",
                      "4":"敲代码",
                      "5":"改bug",
                      "6":"学习react",
                      "7":"做项目"
                  }
                return config[state]
              }
          },
          {
              title: "爱好",
              dataIndex: "interest",
              render(interest){
                 let config={
                    "1":"学习",
                    "2":"劳动",
                    "3":"篮球",
                    "4":"乒乓球"
                 }
                 return config[interest]
              }
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
        <Card title="基础表格" style={{marginBottom:"10px"}}>
            <Table columns={columns} dataSource={data} bordered={true} pagination={false}/>
        </Card>
        <Card title="动态获取数据表格" style={{marginBottom:"10px"}}>
            <Table columns={columns} dataSource={data2} bordered={true} pagination={false}/>
        </Card>
        <Card title="动态获取数据表格--单选">
            <Table columns={columns} dataSource={data2} bordered={true} pagination={false} rowSelection={{type:"radio",selectedRowKeys}}
              onRow={(record,index) => {
                return {
                  onClick: () => {
                      this.onRowClick(record,index);
                  }, // 点击行
                };
              }}
            />
        </Card>
        <Card title="动态获取数据表格--多选">
            <div><Button onClick={this.handdleDel}>删除</Button></div>
            <Table columns={columns} dataSource={data2} bordered={true} pagination={false} rowSelection={{type:"checkbox",selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                let ids=[];
                selectedRows.map((item)=>{
                    ids.push(item.id);
                })
                this.setState({selectedRowKeys,selectedIds:ids})
            }    
        }}
              onRow={(record,index) => {
                return {
                  onClick: () => {
                      this.onRowClick(record,index);
                  }, // 点击行
                };
              }}
            />
        </Card>
        <Card title="动态获取数据表格--分页">
            <Table columns={columns} dataSource={data2} bordered={true} pagination={this.state.pagination}/>
        </Card>
    </div>;
  }
  componentDidMount(){
      data.map((item,index)=>{
          item.key=index;
      })
      this.setState({data:data});
      this.request();
  }
}
