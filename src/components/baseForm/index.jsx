import React, { Component } from 'react'
import { Form, Select, Input, Button, Checkbox, Radio, DatePicker } from 'antd'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
export default class FilterForm extends Component {
    //点击提交按钮
    handleFilterSubmit=()=>{
        //通过ref获取表单各项值
        let fieldsValue=this.myForm.getFieldsValue();
        //父组件定义的方法
        this.props.filterSubmit(fieldsValue);
    }
    //点击重置按钮
    reset=()=>{
        this.myForm.resetFields();
    }

    initFormList = () => {
        let fromItemList = [];
        const formList = this.props.formList;
        if (formList && formList.length > 0) {
            formList.map((item) => {
                let { label, field, placeholder, initialValue, width, type, list } = item;
                //下拉框
                if (type === "SELECT") {
                    const SELECT = <FormItem label={label} name={field} key={field} initialValue={initialValue}>
                        <Select placeholder={placeholder} style={{ width: width }}>
                            {Utils.getOptions(list)}
                        </Select>
                    </FormItem>
                    fromItemList.push(SELECT);
                    //输入框
                } else if (type === "INPUT") {
                    const INPUT = <FormItem label={label} name={field} key={field} initialValue={initialValue}>
                        <Input type="text" placeholder={placeholder} style={{ width: width }} />
                    </FormItem>
                    fromItemList.push(INPUT);
                    //复选框
                } else if (type === "CHECKBOX") {
                    const CHECKBOX = <FormItem label={label} name={field} valuePropName="checked" initialValue={initialValue}>
                        <Checkbox>
                            {label}
                        </Checkbox>
                    </FormItem>
                    fromItemList.push(CHECKBOX)
                    //日期控件
                } else if (type === "DATE") {
                    const DATE = <FormItem label={label} key={field}>
                        <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder="请选择结束时间" style={{ width: width }} />
                    </FormItem>
                    fromItemList.push(DATE)
                    //时间查询组件
                } else if (type === "时间查询") {
                    const begin_time = <FormItem label="订单时间" name="start_time" >
                        <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择开始时间' style={{ width: width }} />
                    </FormItem>
                    fromItemList.push(begin_time);
                    const end_time = <Form.Item label="~" name="end_time" colon={false} >
                        <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择结束时间' style={{ width: width }} />
                    </Form.Item>
                    fromItemList.push(end_time)
                }else if(type==="城市"){
                    const CITY = <FormItem label="城市" name="city" key="city" initialValue={0}>
                        <Select placeholder={placeholder} style={{ width: 80 }}>
                            {Utils.getOptions([{id:0,name:"全部"},{id:1,name:"北京"},{id:2,name:"杭州"},{id:3,name:"上海"}])}
                        </Select>
                    </FormItem>
                    fromItemList.push(CITY);
                }

            })
        }
        return fromItemList;
    }
    render() {
        return (
            <Form layout="inline" ref={(c)=>{this.myForm=c}}>
                {this.initFormList()}
                <Form.Item>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
