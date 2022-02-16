import React, { Component } from 'react'
import { Card ,Button,Modal,Form, Input,Radio,DatePicker,Select,message} from 'antd'
import {PlusOutlined, EditOutlined, DeleteOutlined,SearchOutlined} from "@ant-design/icons"
import moment from 'moment'
import axios from './../../axios'
import Utils from './../../utils/utils'
import Etable from './../../components/Etable'
import BaseForm from './../../components/baseForm'
import './../../style/common.less'
const FormItem=Form.Item
const RadioGroup=Radio.Group
const Option=Select.Option
const TextArea=Input.TextArea
export default class User extends Component {
    state={
        list:[],
        isVisible:false,
        // userInfo:{} 
    }
    params={
        page:1
    }
    formlist=[
        {
            type:"INPUT",
            label:"用户名",
            field:"username",
            placeholder:"请输入用户名称",
            width:100
        },
        {
            type:"INPUT",
            label:"手机号",
            field:"user_mobile",
            placeholder:"请输入手机号",
            width:80
        },
        {
            type:"DATE",
            label:"入职时间",
            field:"user_date",
            placeholder:"请输入日期",
        }
    ]
    //点击查询按钮
    handdleSubmit=(params)=>{
        this.params=params;
        this.requestList();
    }
    //定义ajax
    requestList=()=>{
        axios.requestList(this,"/user/list",this.params)
    }
    //增删改查操作
    handdleOperate=(type)=>{
        let item=this.state.selectedItem;
        console.log(item);
        if(type==="create"){
            this.setState({
                type,
                isVisible:true,
                title:"添加员工"
            })
        }else if(type==="edit"){
             if(!item){
                 Modal.info({
                     title:"提示",
                     content:"请选择一个用户"
                 })
                 return ;
             }
             this.setState({
                 type,
                 isVisible:true,
                 title:"编辑员工",
                 userInfo:item
             })
        }else if(type==="detail"){
            // console.log("detail")
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return ;
            }
            this.setState({
                type,
                isVisible: true,
                title: "员工详情",
                userInfo: item
            })
        }
    }
    //点击添加员工模态框ok按钮
    handdleClick=()=>{
        let {type}=this.state;
        let userInfo=this.myForm.myForm.getFieldValue();
        axios.ajax({
            url:type==="create"?"/user/add":"/user/edit",
            data:{
                params:userInfo
            }
        }).then(res=>{
            if(res.code==="0"){
                this.setState({isVisible:false});
                this.myForm.myForm.resetFields();
                message.success(res.msg);
                this.requestList();
            }
        })
    }
  render() {
      let {list,pagination,selectedRowKeys,selectedIds,title,isVisible,userInfo,type}=this.state;
    const columns=[
        {
            title:"id",
            dataIndex:"id"
        },
        {
            title:"用户名",
            dataIndex:"username"
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
    let footer={};
    if(type==='detail'){
        footer={
            footer:null
        }
    }
    return (
      <div>
          <Card>
              <BaseForm formList={this.formlist} filterSubmit={this.handdleSubmit}/>
          </Card>
          <Card style={{marginTop:"10px"}}>
              <div className='operate-wrap'>
                <Button type="primary" icon={<PlusOutlined/>} onClick={()=>this.handdleOperate('create')}>增加员工</Button>
                <Button type="primary" icon={<EditOutlined/>} onClick={()=>this.handdleOperate('edit')}>编辑员工</Button>
                <Button type="primary" icon={<SearchOutlined/>} onClick={()=>this.handdleOperate('detail')}>员工详情</Button>
                <Button type="primary" icon={<DeleteOutlined/>} onClick={()=>this.handdleOperate('delete')}>删除员工</Button>
             </div>
          </Card>
          <div className="content-wrap">
              <Etable columns={columns} dataSource={list} pagination={pagination} selectedRowKeys={selectedRowKeys} 
                updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                selectedIds={selectedIds}
              />
          </div>
          <Modal title={title} visible={isVisible} onOk={this.handdleClick} 
          onCancel={()=>{
            this.myForm.myForm.resetFields();
            this.setState({isVisible:false})}}
          width={600}
          {...footer}
          >
              <UserForm ref={c=>{this.myForm=c}} userInfo={userInfo} type={type}/>
          </Modal>
      </div>
    )
  }
  componentDidMount(){
      this.requestList();
  }
}

class UserForm extends Component {
    getState = state => {
        return {
            "1":"学习",
            "2":"运动",
            "3":"做家务",
            "4":"敲代码",
            "5":"改bug",
        }[state]
      }
  render() {
      let { type}=this.props; 
      let userInfo=this.props.userInfo || {};
      const formItemLayout={
          labelcol:{span:5},
          wrappercol:{span:15}
      }
    return (
      <Form layout="horizontal" ref={c=>{this.myForm=c}}>
          <FormItem label="用户名" name="username" {...formItemLayout} initialValue={userInfo.username}>
              {
              type === "detail"?userInfo.username:
              <Input type="text" placeholder="请输入用户名" />
              }
          </FormItem>
          <FormItem label="性别" name="sex" {...formItemLayout} initialValue={userInfo.sex}>
              {
                  type === "detail"?userInfo.sex===1?"男":"女":
                  <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
              </RadioGroup>
              }
          </FormItem>
          <FormItem label="状态" name="state" {...formItemLayout} initialValue={userInfo.state}>
              {
                  type === "detail"?this.getState(userInfo.state):
                  <Select>
                  <Option value={1}>学习</Option>
                  <Option value={2}>做饭</Option>
                  <Option value={3}>敲代码</Option>
                  <Option value={4}>嘻嘻</Option>
                  <Option value={5}>哈哈哈</Option>
              </Select>
              }
              
          </FormItem>
          <FormItem label="生日" name="birthday" {...formItemLayout} initialValue={moment(userInfo.birthday)}>
              {
                  type === "detail"?userInfo.birthday:<DatePicker/>
              }
          </FormItem>
          <FormItem label="联系地址" name="address" {...formItemLayout} initialValue={userInfo.address}>
              {
                  type === "detail"?userInfo.address:<TextArea rows={3} placeholder="请输入地址"/>
              }
          </FormItem>
      </Form>
    )
  }
}

