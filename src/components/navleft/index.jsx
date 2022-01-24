import React, { Component } from 'react'
import { Menu,Icon } from 'antd'
import { Link } from 'react-router-dom' 
import menuConfig from '../../config/menuConfig'
import './index.less'
const { SubMenu } = Menu;
export default class NavLeft extends Component {
    // state={
    //     menuTreeNode:[]
    // }
    //菜单渲染
    renderMenu=(data)=>{
        return data.map(item=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }else{
            return (
                <Menu.Item title={item.title} key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
            )
        }
        })
    }
    render() {
        return (
            <div>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>单车</h1>
                </div>
                <Menu theme='dark'>
                    {
                        this.state.menuTreeNode
                    }
                </Menu>
            </div>
        )
    }
    componentWillMount(){
        const menuTreeNode=this.renderMenu(menuConfig);
        console.log(menuTreeNode);
        this.setState({menuTreeNode});
    }
}
