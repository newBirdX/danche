import React, { Component } from 'react'
import { Button, Card ,Modal} from 'antd'
import './style.less'
export default class Modals extends Component {
    state={
        show1:false,
        show2:false,
        show3:false,
        show4:false
    }
    handdleOpen=(type)=>{
        this.setState({
            [type]:true
        })
    }
    handdleConfirm=(style)=>{
        Modal[style]({
            title:"确定？",
            content:"你学会了吗？",
            onOk(){
                console.log("你真棒");
            },
            onCancel(){
                console.log("已取消");
            }
        })
    }
    render() {
        let {show1,show2,show3,show4}=this.state;
        return (
            <div>
                <Card title="基础模态框" className='card-wrap'>
                    <Button type="primary" onClick={()=>{this.handdleOpen('show1')}}>Open</Button>
                    <Button type="primary" onClick={()=>{this.handdleOpen('show2')}}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>{this.handdleOpen('show3')}}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>{this.handdleOpen('show4')}}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className='card-wrap'>
                    <Button type="primary" onClick={()=>{this.handdleConfirm('confirm')}}>Confirm</Button>
                    <Button type="primary" onClick={()=>{this.handdleConfirm('info')}}>Info</Button>
                    <Button type="primary" onClick={()=>{this.handdleConfirm('success')}}>Success</Button>
                    <Button type="primary" onClick={()=>{this.handdleConfirm('error')}}>Error</Button>
                </Card>
                <Modal title="弹窗" visible={show1} onCancel={()=>{
                    this.setState({
                        show1:false
                    })
                }}>
                    <p>测试哈哈哈哈</p>
                </Modal>
                <Modal title="弹窗2" visible={show2} okText="下一步" cancelText="算了" onCancel={()=>{
                    this.setState({show2:false})
                }}>
                    <p>自定义页脚</p>
                </Modal>
                <Modal title="弹窗3" visible={show3} okText="下一步" cancelText="算了" onCancel={()=>{
                    this.setState({show3:false})
                }} style={{top:'20px'}}>
                    <p>距顶部20px</p>
                </Modal>
                <Modal title="弹窗4" visible={show4} okText="下一步" cancelText="算了" onCancel={()=>{
                    this.setState({show4:false})
                }} wrapClassName='vertical-center-modal'>
                    <p>水平垂直居中</p>
                </Modal>
            </div>
        )
    }
}
