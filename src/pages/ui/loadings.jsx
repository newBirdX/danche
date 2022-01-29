import React, { Component } from 'react'
import {Alert, Card, Space, Spin } from 'antd'
import {LoadingOutlined} from '@ant-design/icons' 
import './style.less'

export default class Loadings extends Component {
    render() {
        return (
            <div>
                <Card title="Spin用法" className='card-wrap'>
                    <Space size="middle">
                    <Spin size='large'/>
                    <Spin indicator={<LoadingOutlined/>}/>
                    </Space>
                </Card>
                <Card title="内容遮罩" className='card-wrap'>
                    <Spin tip="加载中...">
                    <Alert message="React" description="这是一个简单的警示框文本"></Alert>
                    </Spin>
                </Card>
            </div>
        )
    }
}
