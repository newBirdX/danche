import React, { Component } from 'react'
import { Card ,message,Tabs} from 'antd'
import { AppleOutlined } from '@ant-design/icons'
import './style.less'
const { TabPane } = Tabs;
export default class Tabs1 extends Component {
    state={
        panes:[]
    }
    handdleCallback=(key=>{
        message.info("你选择了"+key+"页")
    })
    render() {
        let {panes}=this.state;
        return (
            <div>
                <Card title="tab标签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handdleCallback}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="带图标的tab标签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handdleCallback}>
                        <TabPane tab={<span><AppleOutlined/>Tab 1</span>} key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab={<span><AppleOutlined/>Tab 1</span>} key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={<span><AppleOutlined/>Tab 1</span>} key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="带图标的tab标签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handdleCallback} type="editable-card"> 
                        {
                            panes.map((panel)=>{
                                return (
                                    <TabPane tab={panel.title} key={panel.key}>{panel.content }</TabPane>
                                )
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
    componentDidMount(){
        const panes=[
            {
                title:"Tab 1",
                content:"Tab 1",
                key:1
            },
            {
                title:"Tab 2",
                content:"Tab 2",
                key:2
            },
            {
                title:"Tab 3",
                content:"Tab 3",
                key:3
            }
        ]
        this.setState({panes})
    }
}
