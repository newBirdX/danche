import React, { Component } from 'react'
import { Form ,Select,Input,Button,Checkbox,Radio } from 'antd'
import Utils from './../../utils/utils'
const FormItem=Form.Item
const Option=Select.Option
export default class FilterForm extends Component {
    initFormList=()=>{
        let fromItemList=[];
        const formList=this.props.form;
        if(formList && formList.length>0){
            formList.map((item)=>{
               let {lable,field,placeholder,initialValue,width,type,list}=item;
               if(type==="SELECT"){
                   const SELECT=<FormItem lable={lable} name={field} key={field} initialValue={initialValue}>
                       <Select placeholder={placeholder} style={{width:width}}>
                           {Utils.getOptions(list)}
                       </Select>
                   </FormItem>
               }

            })
        }
        return fromItemList;
    }
    render() {
        return (
            <Form>

            </Form>
        )
    }
}
