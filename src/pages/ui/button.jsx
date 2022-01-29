import React, { Component } from 'react'
import { Card, Button, Pagination } from 'antd'
import { PlusOutlined, FormOutlined, ClearOutlined, FileSearchOutlined, SearchOutlined, DownloadOutlined ,LeftOutlined,RightOutlined} from '@ant-design/icons'
import './style.less'
export default class Buttons extends Component {
    state = {
        isLoading: false  //设置loading初始状态
    }
    handdleChangeLoadingT = () => {
        this.setState({ isLoading: true })
    }
    handdleChangeLoadingF = () => {
        this.setState({ isLoading: false })
    }
    render() {
        let { isLoading } = this.state;
        return (
            <div>
                <Card title="基础按钮" className='card-wrap'>
                    <Button type="primary">主按钮</Button>
                    <Button>普通按钮</Button>
                    <Button type="dashed">虚线按钮</Button>
                    <Button type="danger">警告按钮</Button>
                    <Button disabled>禁用按钮</Button>
                </Card>
                <Card title="图形按钮" className='card-wrap'>
                    <Button icon={<PlusOutlined />}>创建</Button>
                    <Button icon={<FormOutlined />}>编辑</Button>
                    <Button icon={<ClearOutlined />}>删除</Button>
                    <Button icon={<FileSearchOutlined />}>查找</Button>
                    <Button shape='circle' icon={<SearchOutlined />}></Button>
                    <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
                </Card>
                <Card title="Loading按钮" className='card-wrap'>
                    <Button type="primary" loading={isLoading} onClick={this.handdleChangeLoadingT}>主按钮</Button>
                    <Button type="primary" shape='circle' loading={true}></Button>
                    <Button loading={true}>点击加载</Button>
                    <Button type="primary" onClick={this.handdleChangeLoadingF}>关闭</Button>
                </Card>
                <Card title="按钮组" className='card-wrap'>
                    <Button type="primary" icon={<LeftOutlined/>}>上一页</Button>
                    <Button type="primary" icon={<RightOutlined/>}>下一页</Button>
                </Card>
                <Card title="按钮组" className='card-wrap'>
                    <Pagination defaultCurrent={1} total={50} />
                </Card>
            </div>
        )
    }
}
