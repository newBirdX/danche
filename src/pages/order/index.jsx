import React, { Component } from 'react'
import { Card ,Form,Button,Select,Table,DatePicker} from 'antd'
import './../../style/common.less'
import Utils from './../../utils/utils'
import axios from './../../axios'
const FormItem=Form.Item
const Option=Select.Option
export default class Order extends Component {
    state={
        list:[]
    }
    params={
        page:1
    }
    //发送表单数据请求
    requestList=()=>{
        axios.ajax({
            url:"/order/list",
            data:{
                params:this.params.page
            }
        }).then(res=>{
            if(res.code==="0"){
                let list=res.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item;
                })
                this.setState({
                    list,
                })
            }
        })
    }
  render() {
      let {list}=this.state;
      const columns=[
          {
              title:"订单编号",
              dataIndex:"order_sn"
          },
          {
            title:"车辆编号",
            dataIndex:"bike_sn"
        },
        {
            title:"用户名",
            dataIndex:"user_name"
        },
        {
            title:"手机号",
            dataIndex:"mobile"
        },
        {
            title:"里程",
            dataIndex:"distance"
        },
        {
            title:"行驶时长",
            dataIndex:"total_time"
        },
        {
            title:"状态",
            dataIndex:"status",
            render(status){
                return status===1?"进行中":"结束行程";
            }
        },
        {
            title:"开始时间",
            dataIndex:"start_time"
        },
        {
            title:"结束时间",
            dataIndex:"end_time"
        },
        {
            title:"订单金额",
            dataIndex:"total_fee"
        },
        {
            title:"实付金额",
            dataIndex:"user_pay"
        }
      ]
    return (
      <div>
          <Card title="订单管理"><FilterForm></FilterForm></Card>
          <Card style={{marginTop:"10px"}}>
              <Button style={{marginRight:"20px"}}>订单详情</Button>
              <Button>结束订单</Button>
          </Card>
          <div className="content-wrap">
              <Table columns={columns} dataSource={list}/>
          </div>

      </div>
    )
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
                <FormItem label="订单时间" name="start_time">
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                </FormItem>
                <FormItem label="~" name="end_time">
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                </FormItem>
                <FormItem label="订单状态" name="status">
                    <Select placeholder="全部" style={{width:"100px"}}>
                        <Option value="">全部</Option>
                        <Option value="1">进行中</Option>
                        <Option value="2">结束行程</Option>
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