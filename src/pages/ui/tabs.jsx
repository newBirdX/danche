import React, { Component } from 'react'
import { Card ,message,Tabs} from 'antd'
import { AppleOutlined } from '@ant-design/icons'
import './style.less'
const { TabPane } = Tabs;
const initialPanes=[
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
export default class Tabs1 extends Component {
    newTabIndex=0;
    state={
        activeKey: initialPanes[0].key,
        panes: initialPanes,
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
      };
      add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: `New Tab${this.newTabIndex}`, content: `Content of new Tab${this.newTabIndex} `, key: activeKey });
        this.setState({
          panes: newPanes,
          activeKey,
        });
      };
    
      remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].key;
          } else {
            newActiveKey = newPanes[0].key;
          }
        }
        this.setState({
          panes: newPanes,
          activeKey: newActiveKey,
        });
      };
    onChange=(activeKey)=>{
        this.setState({activeKey})
    }
    handdleCallback=(key=>{
        message.info("你选择了"+key+"页")
    })
    render() {
        let {panes,activeKey}=this.state;
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
                    <Tabs defaultActiveKey="1" 
                    onChange={this.handdleCallback} 
                    activeKey={activeKey} 
                    type="editable-card" 
                    onChange={this.onChange}
                    onEdit={this.onEdit}
                    > 
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
}
