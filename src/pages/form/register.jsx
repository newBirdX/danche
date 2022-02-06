import React, { Component } from 'react'
import { Input,Checkbox,Select,Card,Form ,Button,Radio,InputNumber,Switch,DatePicker,Upload,message} from "antd"
import { LoadingOutlined,PlusOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const FormItem=Form.Item;
const RadioGroup=Radio.Group
const Option=Select.Option
const TextArea=Input.TextArea
const FormItemLayout={
    lableCol:{
        xs:24,
        sm:4,
    },
    wrapperCol:{
        xs:24,
        sm:12
    }
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class Register extends Component {
    state = {
        loading: false,
      };
    formRef = React.createRef();
    onReset = () => {
        this.formRef.current.resetFields();
      };
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
      
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
        return (
            <div>
                <Card title="注册框"> 
                    <Form ref={this.formRef}>
                        <FormItem name="userName" {...FormItemLayout} label="用户名" rules={[{
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
                        <FormItem name="pwd" label="密码" {...FormItemLayout} rules={[{
                            required:true,
                            message:"请输入密码"
                        }]}>
                            <Input.Password />
                        </FormItem>
                        <FormItem name="sex" label="性别" >
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem name="age" label="年龄" >
                            <InputNumber min={1} max={100} defaultValue={1}/>
                        </FormItem>
                        <FormItem name="state" label="当前状态" {...FormItemLayout} >
                            <Select defaultValue="2">
                                <Option value="1">百度</Option>
                                <Option value="2">阿里</Option>
                                <Option value="3">腾讯</Option>
                            </Select>
                        </FormItem>
                        <FormItem name="favourite" label="爱好" {...FormItemLayout}  >
                            <Select mode="multiple" defaultValue="3"> 
                                <Option value="1">足球</Option>
                                <Option value="2">篮球</Option>
                                <Option value="3">乒乓球</Option>
                            </Select>
                        </FormItem>
                        <FormItem name="ismarrty" label="是否已婚" {...FormItemLayout}  >
                            <Switch defaultChecked/>
                        </FormItem>
                        <FormItem name="birthday" label="出生日期" {...FormItemLayout}  >
                            <DatePicker locale={locale}/>
                        </FormItem>
                        <FormItem name="address" label="联系地址" {...FormItemLayout}  >
                            <TextArea autoSize={{minRows:2,maxRows:6}}/>
                        </FormItem>
                        <FormItem name="upload" label="上传头像" {...FormItemLayout}  >
                            <Upload listType="picture-card" showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                             beforeUpload={beforeUpload}
                             onChange={this.handleChange}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </FormItem>
                        <FormItem name="yuedu"  {...FormItemLayout}  >
                            <Checkbox >我已阅读过<a href='#'>保密协议</a></Checkbox>
                        </FormItem>
                        <Button>登录</Button>
                        <Button onClick={this.onReset}>重置</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}
