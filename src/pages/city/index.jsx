import React, { Component } from 'react';
import { Card ,Button,Table,Form, Select,Modal,message} from 'antd'
import Utils from "./../../utils/utils"
import axios from './../../axios'
import './../../style/common.less'
const FormItem=Form.Item;
const Option=Select.Option
export default class City extends Component {
    state={
        isShowOpenCity:false  //开通城市操作框默认隐藏
    }
    params={
        page:1
    }
    // cityForm=React.createRef();
    //点击开通城市按钮弹出对话框
    handdleOpenCity=()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    //点击开通确认按钮提交表单数据
    handdleSubmit=()=>{
            // 得到 Form 实例
            // 使用 getFieldsValue 获取多个字段值
            const cityInfo = this.cityForm.cityForm.getFieldsValue(['city_id','op_mode','use_mode']);
            console.log(cityInfo);
            axios.ajax({
                url:"/city/open",
                data:{
                    params:cityInfo
                }
            }).then(res=>{
                if(res.code==="0"){
                    message.success(res.result);
                    this.setState({
                        isShowOpenCity:false
                    })
                    this.requestList(); 
                }
            })
    }
    //发送mock请求
    requestList=()=>{
        axios.ajax({
            url:"/open_city",
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            this.setState({
                list:res.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item;
                }),
                pagination:Utils.pagination(res,(current)=>{
                    this.params.page=current;
                    this.request()
                })

            })
        })
    }
  render() {
      let {isShowOpenCity}=this.state;
      const columns=[
          {
              title:"城市ID",
              dataIndex:"id"
          },
          {
            title:"城市名称",
            dataIndex:"name"
        },
        {
            title:"用车模式",
            dataIndex:"mode",
            render(mode){
                let config={
                    "1":"指定停车点模式",
                    "2":"禁停区模式"
                }
                return config[mode];
            }
        },
        {
            title:"营运模式",
            dataIndex:"op_mode",
            render(op_mode){
                let config={
                    "1":"自营",
                    "2":"加盟"
                }
                return config[op_mode]
            }
        },
        {
            title:"授权加盟商",
            dataIndex:"franchisee_name"
        },
        {
            title:"城市管理员",
            dataIndex:"city_admins",
            render(arr){
                return arr.map(item=>{
                    return item.user_name;
                }).join(",")
            }
        },
        {
            title:"城市开通时间",
            dataIndex:"open_time"
        },
        {
            title:"操作时间",
            dataIndex:"update_time",
            render:Utils.formatDate
        },
        {
            title:"操作人",
            dataIndex:"sys_user_name"
        }
      ]
    return <div>
        <Card>
            <FilterForm></FilterForm>
        </Card>
        <Card style={{marginTop:"10px"}}><Button  type="primary" onClick={this.handdleOpenCity}>开通城市</Button></Card>
        <div className='content-wrap'>
            <Table columns={columns} dataSource={this.state.list} bordered/>
        </div>
        <Modal title="开通城市" visible={isShowOpenCity} onCancel={() => {
            this.setState({
                isShowOpenCity: false
            })
        }} onOk={this.handdleSubmit} okText="确定" cancelText="取消"><OpenCityForm ref={(inst)=>{this.cityForm=inst}}/></Modal>
    </div>;
  }
  componentDidMount(){
    this.requestList();
}
}

class FilterForm extends Component{
    render(){
        return (
            <Form layout="inline">
                <FormItem label="城市" name="city_id">
                    <Select placeholder="全部" style={{width:"100px"}}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式" name="mode">
                    <Select placeholder="全部" style={{width:"120px"}}>
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </FormItem>
                <FormItem label="营运模式" name="op_mode">
                    <Select placeholder="全部" style={{width:"80px"}}>
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="加盟商授权状态" name="auth_status">
                    <Select placeholder="全部" style={{width:"100px"}}>
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button >重置</Button>
                </FormItem>
            </Form>
        )
    }
}
class OpenCityForm extends Component{
    render(){
        const formItemLayout={
            lablecol:{
                span:5
            },
            wrappercol:{
                span:10
            }
        }
        return (
            <Form layout="horizontal" ref={(inst)=>{this.cityForm=inst}}>
                <FormItem label="选择城市" {...formItemLayout} name="city_id" >
                    <Select>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                    </Select>
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout} name="op_mode">
                    <Select>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout} name="use_mode">
                    <Select>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        )
    }
}