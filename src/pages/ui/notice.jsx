import { Button, Card ,notification, Space} from 'antd'
import React, { Component } from 'react'
import './style.less'
export default class Notice extends Component {
    openNotifiction=(type,direction)=>{
        notification.config({
            placement:direction
        })
        notification[type]({
            message:"哇咔咔新年好哇",
            description:"新的一年到来了，要努力挣钱呀",
        })
    }
    render() {
        return (
            <div>
                <Card title="通知提醒" className='card-wrap'>
                    <Space size="middle">
                    <Button type="primary" onClick={()=>{this.openNotifiction('success','topLeft')}}>Success</Button>
                    <Button type="primary" onClick={()=>{this.openNotifiction('info','topRight')}}>Info</Button>
                    <Button type="primary" onClick={()=>{this.openNotifiction('error','bottomLeft')}}>Error</Button>
                    <Button type="primary" onClick={()=>{this.openNotifiction('warning','bottomRight')}}>Warning</Button>
                    </Space>
                </Card>
            </div>
        )
    }
}
