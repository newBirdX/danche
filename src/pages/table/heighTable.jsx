import React, { Component } from 'react'
import {Card ,Table,Badge, Modal, message} from 'antd'
import axios from "./../../axios"
export default class HeightTable extends Component {
    state={
        data2:[]
    }
    params={
        page:1
    }
    //获取动态数据
    request=()=>{
        let _this=this;
        // console.log("this",_this)
       axios.ajax({
           url:"/table/height/list",
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
                // pagination:Utils.pagination(res,(current)=>{
                //     this.params.page=current;
                //     this.request();
                // })
            })
           }
       })
    }

    //模拟操作删除
    handdleDelect=(item)=>{
        let id=item.id;
        Modal.confirm({
            title:"确认",
            content:"您确定要删除此数据吗?",
            onOk:()=>{
                message.success("删除成功");
                this.request();
            }
        })
    }
    render() {
        let {data2}=this.state;
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
                        "1":<Badge status="success" text="学习"/>,
                        "2":<Badge status="error" text="运动"/>,
                        "3":<Badge status="default" text="做家务"/>,
                        "4":<Badge status="processing" text="敲代码"/>,
                        "5":<Badge status="warning" text="改bug"/>,
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

        const columns2=[
            {
                title:"id",
                dataIndex:"id"
            },
            {
                title:"用户名",
                dataIndex:"name"
            },
            {
                title:"年龄",
                dataIndex:"age",
                sorter:(a,b)=>{
                    return a.age-b.age
                }
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
                        "1":<Badge status="success" text="成功"/>,
                        "2":<Badge status="error" text="失败"/>,
                        "3":<Badge status="default" text="默认"/>,
                        "4":<Badge status="processing" text="进行中"/>,
                        "5":<Badge status="warning" text="警告"/>,
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
                title: "操作",
                render :(text,item)=>{
                    return <a href='javascript:;' onClick={()=>{this.handdleDelect(item)}}>删除</a>
                }
            }
        ] 
        const columns1=[
            {
                title:"id",
                fixed:"left",
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
            },
            {
                title: "早起时间",
                dataIndex: "time"
            },
            {
                title: "早起时间",
                dataIndex: "time"
            },
            {
                title: "早起时间",
                fixed:"right",
                dataIndex: "time"
            }

        ]
        return (
            <div>
                <Card title="头部固定" style={{ marginBottom: "10px" }}>
                    <Table columns={columns} dataSource={data2} bordered={true} pagination={false} scroll={{y:240}}/>
                </Card>
                <Card title="左侧固定" style={{ marginBottom: "10px" }}>
                    <Table columns={columns1} dataSource={data2} bordered={true} pagination={false} scroll={{x:2000}}/>
                </Card>
                <Card title="高级表格" style={{ marginBottom: "10px" }}>
                    <Table columns={columns2} dataSource={data2} bordered={true} pagination={false} />
                </Card>
            </div>
        )
    }
    componentDidMount(){
        this.request();
    }
}
