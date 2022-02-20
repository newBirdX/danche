import React, { Component } from 'react'
import { Menu,Icon } from 'antd'
import { Link } from 'react-router-dom' 
import {connect} from "react-redux"
import { switchMenu} from './../../redux/action'
import menuConfig from '../../config/menuConfig'
import './index.less'
const { SubMenu } = Menu;
class NavLeft extends Component {
    state={
        menuTreeNode:[],
        currentKey:''
    }
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
    handdleClick=({item,key})=>{
        // console.log(item);
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey: key
        })
    }
    render() {
        return (
            <div className='nav-left'>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>单车</h1>
                </div>
                <Menu theme='dark' selectedKeys={this.state.selectedKeys}
                onClick={this.handdleClick}
                >
                    {
                        this.state.menuTreeNode
                    }
                </Menu>
            </div>
        )
    }
    componentWillMount(){
        const menuTreeNode=this.renderMenu(menuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            menuTreeNode,
            currentKey
        });
    }
}
export default connect()(NavLeft)
