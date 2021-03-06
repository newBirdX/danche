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
                <Card title="?????????"> 
                    <Form ref={this.formRef}>
                        <FormItem name="userName" {...FormItemLayout} label="?????????" rules={[{
                            required:true,
                            message:"??????????????????"
                        },{
                            min:5,
                            max:8,
                            message:"?????????????????????"
                        },{
                            pattern:new RegExp(/^[0-9a-zA-Z_]{1,}$/,"g"),
                            message:"????????????????????????????????????????????????"

                        }]}>
                            <Input placeholder='??????????????????'/>
                        </FormItem>
                        <FormItem name="pwd" label="??????" {...FormItemLayout} rules={[{
                            required:true,
                            message:"???????????????"
                        }]}>
                            <Input.Password />
                        </FormItem>
                        <FormItem name="sex" label="??????" >
                            <RadioGroup>
                                <Radio value="1">???</Radio>
                                <Radio value="2">???</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem name="age" label="??????" >
                            <InputNumber min={1} max={100} defaultValue={1}/>
                        </FormItem>
                        <FormItem name="state" label="????????????" {...FormItemLayout} >
                            <Select defaultValue="2">
                                <Option value="1">??????</Option>
                                <Option value="2">??????</Option>
                                <Option value="3">??????</Option>
                            </Select>
                        </FormItem>
                        <FormItem name="favourite" label="??????" {...FormItemLayout}  >
                            <Select mode="multiple" defaultValue="3"> 
                                <Option value="1">??????</Option>
                                <Option value="2">??????</Option>
                                <Option value="3">?????????</Option>
                            </Select>
                        </FormItem>
                        <FormItem name="ismarrty" label="????????????" {...FormItemLayout}  >
                            <Switch defaultChecked/>
                        </FormItem>
                        <FormItem name="birthday" label="????????????" {...FormItemLayout}  >
                            <DatePicker locale={locale}/>
                        </FormItem>
                        <FormItem name="address" label="????????????" {...FormItemLayout}  >
                            <TextArea autoSize={{minRows:2,maxRows:6}}/>
                        </FormItem>
                        <FormItem name="upload" label="????????????" {...FormItemLayout}  >
                            <Upload listType="picture-card" showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                             beforeUpload={beforeUpload}
                             onChange={this.handleChange}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </FormItem>
                        <FormItem name="yuedu"  {...FormItemLayout}  >
                            <Checkbox >???????????????<a href='#'>????????????</a></Checkbox>
                        </FormItem>
                        <Button>??????</Button>
                        <Button onClick={this.onReset}>??????</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}
