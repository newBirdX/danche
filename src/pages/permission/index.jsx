import React, { Component } from 'react'
import { Card ,Button,Modal,Form,Input,Select, message,Tree,Transfer} from 'antd'
import Etable from './../../components/Etable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from './../../config/menuConfig'

const FormItem=Form.Item;
const Option=Select.Option
const TreeNode=Tree.TreeNode;
export default class Permission extends Component {
  state={
    //创建角色弹框
    isVisible:false,
    //授权弹框
    isPermVisible:false,
    isUserVisible:false
  }
    requestList=()=>{
        axios.requestList(this,"/role/list")
    }
    handdleRole=()=>{
      this.setState({isVisible:true})
    }
    //设置角色权限
    handdlePermission=()=>{
      let item =this.state.selectedItem;
      // console.log(item);
      if(!item){
        Modal.info({
          title:"提示",
          content:"请选择一个角色"
        })
        return ;
      }
      this.setState({
        isPermVisible:true,
        itemInfo:item,
        menuInfo:item.menus
      })
    }
    handdleSubmit=()=>{
      let formdata=this.myForm.myForm.getFieldsValue();
      axios.ajax({
        url:"/role/create",
        data:{
          params:formdata
        }
      }).then(res=>{
        if(res.code==="0"){
          this.setState({isVisible:false})
          message.success(res.msg);
          this.requestList();
          this.myForm.myForm.resetFields();
        }
      })
    }
    //点击修改权限提交按钮
    handdlePermEditSubmit=()=>{
      let data=this.perForm.perForm.getFieldsValue();
      data.role_id = this.state.selectedItem.id;
      data.menus = this.state.menuInfo;
      axios.ajax({
        url: "/permission/edit",
        data: {
          params: {
            ...data
          }
        }
      }).then(res => {
        if (res.code === '0') {
          this.setState({
            isPermVisible: false,
            selectedRowKeys: []
          })
          message.success(res.msg)
          this.requestList()
        }
      })
    }
    //点击用户授权
    handdleUserAuth=()=>{
      let item =this.state.selectedItem;
      // console.log(item);
      if(!item){
        Modal.info({
          title:"提示",
          content:"请选择一个角色"
        })
        return ;
      }
      this.setState({
        isUserVisible:true,
        detailInfo:item
      })
      this.getRoleUserList(item.id);
    }
    //获取用户列表
    getRoleUserList=(id)=>{
      axios.ajax({
        url:"/role/user_list",
        data:{
          params:id
        }
      }).then(res=>{
        if(res.code==="0"){
          this.getAuthUserList(res.result)
        }
      })
    }
    //筛选目标用户
    getAuthUserList=(dataSource)=>{
      const mockData=[];
      const targetKeys=[];
      if(dataSource && dataSource.length>0){
        dataSource.map(item=>{
          const data={
            key: item.user_id,
            title: item.user_name,
            status: item.status
          }
          if (data.status === 1) {
            targetKeys.push(data.key)
          }
          mockData.push(data);
        })
        this.setState({
          mockData,
          targetKeys
        })
      }
    }
     // 用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url:'/role/user_role_edit',
      data:{
        params:{
          ...data
        }
      }
    }).then(res => {
      if(res){
        this.setState({
          isUserVisible:false,
          selectedRowKeys:[]
        })
        message.success(res.msg)
        this.requestList();
      }
    })
  }
    render() {
      let {list,selectedRowKeys,isVisible,isPermVisible,itemInfo,isUserVisible,targetKeys,mockData,detailInfo}=this.state;
        const columns = [{
            title: "角色ID",
            dataIndex: "id"
          }, {
            title: "角色名称",
            dataIndex: "role_name",
            render(role_name){
              let config={
                1:"市场专员",
                2:"财务专员",
                3:"管理人员",
                4:"研发人员"
              }
              return config[role_name]
            }
          }, {
            title: "创建时间",
            dataIndex: "create_time",
            render(create_time) {
              return Utils.formatDate(new Date(create_time))
            }
          }, {
            title: "使用状态",
            dataIndex: "status",
            render(status) {
              return status === 1 ? "启用" : "停用"
            }
          }, {
            title: "授权时间",
            dataIndex: 'authorize_time',
            render(authorize_time) {
              return Utils.formatDate(new Date(authorize_time))
            }
          }, {
            title: "授权人",
            dataIndex: 'authorize_user_name'
          }]
        return (
            <div>
                <Card title="鉴权">
                    <Button type="primary" style={{marginRight:"10px"}} onClick={this.handdleRole}>创建角色</Button>
                    <Button type="primary" style={{marginRight:"10px"}} onClick={this.handdlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handdleUserAuth}>用户授权</Button>
                </Card>
                <Card>
                    <Etable columns={columns} dataSource={list} selectedRowKeys={selectedRowKeys}
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}/>
                </Card>
                <Modal title="创建角色" visible={isVisible}
                onOk={this.handdleSubmit}
                onCancel={()=>{
                  this.setState({isVisible:false})
                  this.myForm.myForm.resetFields();
                  }}>
                  <RoleForm ref={c=>{this.myForm=c}}/>
                </Modal>
                <Modal title="设置权限" visible={isPermVisible} width={600} 
                onOk={this.handdlePermEditSubmit}
                onCancel={()=>{this.setState({isPermVisible:false})}}
                >
                  <PermForm detailInfo={itemInfo} ref={c=>{this.perForm=c}} patchMenuInfo={(checkedKeys)=>{this.setState({
                    menuInfo:checkedKeys
                  })}}/>
                </Modal>
            <Modal title="用户授权"
              visible={isUserVisible}
              width={800}
              onOk={this.handleUserSubmit}
              onCancel={() => {
                this.RoleAuthForm.RoleAuthForm.resetFields();
                this.setState({
                  isUserVisible: false,
                  selectedRowKeys: []
                })
              }}><RoleAuthForm detailInfo={detailInfo} ref={c=>{this.RoleAuthForm=c}} targetKeys={targetKeys} mockData={mockData}
              patchUserInfo={(targetKeys)=>{this.setState({targetKeys})}}
              /></Modal>
            </div>
        )
    }
    componentDidMount(){
      this.requestList();
    }
}
class RoleForm extends Component {
  render() {
      const formItemLayout={
          labelcol:{span:5},
          wrappercol:{span:15}
      }
    return (
      <Form layout="horizontal" ref={c=>{this.myForm=c}}>
          <FormItem label="角色名称" name="role_name" {...formItemLayout}>
              <Input type="text" placeholder="请输入用户名" />
          </FormItem>
          <FormItem label="状态" name="status" {...formItemLayout}>
                  <Select>
                  <Option value={1}>启用</Option>
                  <Option value={2}>未启用</Option>
              </Select>
          </FormItem>
      </Form>
    )
  }
}
class PermForm extends Component {
  //勾选复选框修改父组件state
  onCheck=(checkedKeys)=>{
    this.props.patchMenuInfo(checkedKeys)
  }
  renderTreeNodes=(menuConfig)=>{
    return menuConfig.map((item)=>{
      if(item.children){
        return <TreeNode title={item.title} key={item.key}>{this.renderTreeNodes(item.children)}</TreeNode>
      }else{
        return <TreeNode title={item.title} key={item.key}></TreeNode>
      }
    })
  }
  render() {
    let {detailInfo}=this.props;
    let config={
      1:"市场专员",
      2:"财务专员",
      3:"管理人员",
      4:"研发人员"
    }
    const formItemLayout = {
      labelcol: { span: 5 },
      wrappercol: { span: 15 }
    }
    return (
      <Form layout="horizontal" ref={c=>{this.perForm=c}}>
        <FormItem label="角色名称" {...formItemLayout}>
          <Input placeholder={config[detailInfo.role_name]} disabled/>
        </FormItem>
        <FormItem label="状态" {...formItemLayout} name="status" initialValue={detailInfo.status}> 
          <Select>
            <Option value={1}>启用</Option>
            <Option value={2}>停用</Option>
          </Select>
        </FormItem>
        <Tree 
        checkable //是否有勾选框
        defaultExpandAll  //默认展开
        onCheck={checkedKeys => {  //点击复选框触发,改变父组件中item.menu具体权限
          this.onCheck(checkedKeys)
        }}
        >
          <TreeNode title="平台权限" key="plantform_all">
          {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )

  }
}
class RoleAuthForm extends Component{
  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;
  handleChange=(targetKeys)=>{
    this.props.patchUserInfo(targetKeys)
  }
  render(){
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    let config={
      1:"市场专员",
      2:"财务专员",
      3:"管理人员",
      4:"研发人员"
    }
    let {mockData,targetKeys,detailInfo}=this.props;
    return(
      <Form layout="horizontal" ref={c=>{this.RoleAuthForm=c}} >
        <FormItem label="角色名称" {...formItemLayout}>
          <Input placeholder={config[detailInfo.role_name]} disabled/>
        </FormItem>
        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer 
          listStyle={{width:200,height:400}}
          onChange={this.handleChange}
          dataSource={mockData}
          titles={['待选用户','已选用户']}
          showSearch
          filterOption={this.filterOption}
          targetKeys={targetKeys}
          render={item=>item.title}
          />
        </FormItem>
      </Form>
    )
  }
}