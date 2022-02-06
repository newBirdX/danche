import React, { Component } from 'react'
import { Card, Input ,Form, Button,message,Checkbox} from 'antd'
import {TeamOutlined} from "@ant-design/icons"
const FormItem=Form.Item;
export default class Login extends Component {
    //创建表单ref对象
    formRef=React.createRef();
    onFinish = values => {
        console.log(values)
      }
      handdleSubmit= async () => {
        const form = this.formRef.current
        // 使用 validateFields 获取验证后字段值
        try {
          const values = await form.validateFields(['userName','pwd']);
          message.success(`${values.userName}恭喜你，您通过本次表单学习，您的密码为${values.pwd}`)
          console.log(values)
        } catch (err) {
          console.log(err)
        }
      }
    render() {
        return (
            <div>
                <Card title="水平登录">
                    <Form layout="inline" ref={this.formRef}>
                        <FormItem name="userName" rules={[{
                            required:true,
                            message:"请输入用户名"
                        },{
                            min:5,
                            max:8,
                            message:"长度不在范围内"
                        },{
                            pattern:new RegExp(/^[0-9a-zA-Z_]{1,}$/,"g"),
                            message:"输入只允许包含数字、字母和下划线"

                        }]}>
                            <Input placeholder='请输入用户名'/>
                        </FormItem>
                        <FormItem name="pwd" rules={[{
                            required:true,
                            message:"请输入密码"
                        }]}>
                            <Input.Password />
                        </FormItem>
                        <Button  onClick={this.handdleSubmit}>登录</Button>
                    </Form>
                </Card>
                <Card title="垂直登录" style={{marginTop:10}}>
                    <Form style={{width:300}}>
                        <FormItem>
                            <Input placeholder='请输入用户名' prefix={<TeamOutlined />} addonAfter={<TeamOutlined />}/>
                        </FormItem>
                        <FormItem>
                            <Input.Password />
                        </FormItem>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            >
                            <Checkbox checked="true">Remember me</Checkbox>
                            <a href="#" style={{float:"right"}}>忘记密码</a>
                        </Form.Item>
                        <Button>登录</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}