import React, { Component } from 'react'
import { Card ,Form,Button,Select,Table,DatePicker,Modal,message} from 'antd'
import './../../style/common.less'
import axios from './../../axios'
const FormItem=Form.Item
const Option=Select.Option
export default class Order extends Component {
    state={
        list:[],//表单内容
        orderConfirmVisible:false, //结束订单提示框是否显示，
        orderInfo:{}  //结束订单返回信息

    }
    params={
        page:1
    }
    formlist=[
        {
            type:"SELECT",
            lable:"城市",
            field:"city",
            placeholder:"全部",
            initialValue:"1",
            width:100,
            list:[{id:"0",name:"全部"},{id:"1",name:"北京"},{id:"2",name:"天津"},{id:"3",name:"深圳"}]
        },
        {
            type:"时间查询"
        },
        {
            type:"SELECT",
            lable:"订单状态",
            field:"order_status",
            placeholder:"全部",
            initialValue:"1",
            width:100,
            list:[{id:"0",name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"结束行程"}]
        }

    ]
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
       //点击结束订单
       handdleConfirm=()=>{
        let item =this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"提示",
                content:"请选择一条订单结束"
            })
            return ;
        }
        axios.ajax({
            url:"/order/ebike_info",
            data:{
                params:item.id
            }
        }).then(res=>{
            if(res.code==="0"){
              this.setState({
                  orderInfo:res.result,
                  orderConfirmVisible:true
              })
            }
        })
       
    }
    //点击结束订单提示框ok
    handdleFinish=()=>{
        let item =this.state.selectedItem;
        axios.ajax({
            url:"/order/finish_order",
            data:{
                params:item.id
            }
        }).then(res=>{
            if(res.code==="0"){
              this.setState({
                  orderConfirmVisible:false
              })
              message.success(res.result);
              this.requestList();
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
            content:`用户名:${record.user_name}`
        })
    }
    //打开详情页
    openOrderDetail=()=>{
        let item =this.state.selectedItem;
        if(!item){
            Modal.info({
                title:"提示",
                content:"请选择一条订单结束"
            })
            return ;
        }
        window.open(`#/common/order/detail/${item.id}`);
    }
  render() {
      let {list,orderConfirmVisible,orderInfo,selectedRowKeys}=this.state;
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
              <Button style={{marginRight:"20px"}} type="primary" onClick={this.openOrderDetail}>订单详情</Button>
              <Button type="primary" onClick={this.handdleConfirm}>结束订单</Button>
          </Card>
          <div className="content-wrap">
              <Table columns={columns} rowSelection={{type:"radio",selectedRowKeys}}  onRow={(record,index) => {
                return {
                  onClick: () => {
                      this.onRowClick(record,index);
                  }, // 点击行
                };
              }} dataSource={list}/>
          </div>
          <Modal title="结束订单" visible={orderConfirmVisible}  onOk={this.handdleFinish} onCancel={()=>{
              this.setState({
                  orderConfirmVisible:false
              })
          }}>
              <Form>
                  <FormItem label="车辆编号">
                      {orderInfo.bike_sn}
                  </FormItem>
                  <FormItem label="剩余电量">
                      {orderInfo.battery+"%"}
                  </FormItem>
                  <FormItem label="行程开始时间">
                      {orderInfo.start_time}
                  </FormItem>
                  <FormItem label="当前位置">
                      {orderInfo.location}
                  </FormItem>
              </Form>
          </Modal>
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