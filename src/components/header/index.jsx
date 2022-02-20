import React, { Component } from 'react';
import { Row,Col } from 'antd'
import axios1 from '../../axios'
import './index.less'
import { connect } from 'react-redux';
import Utils from '../../utils/utils'
class Header extends Component {
  state={
    userName:"刘聪",
    sysTime:"" //时间
  }
  UNSAFE_componentWillMount(){
    let {getWeatherApi}=this;
    setInterval(() => {
      let time= Utils.formatDate(new Date().getTime());
      this.setState({sysTime:time})
    }, 1000);
    getWeatherApi();
  }
  //获取天气api
  getWeatherApi=()=>{
    let city="北京";
    axios1.jsonp({
      url:`https://www.tianqiapi.com/api?version=v1&appid=21375891&appsecret=fTYv7v5E&city=${encodeURIComponent(city)}`
    })
    .then((res)=>{
      if (res) {
        let city = res.city;
        let wea = res.data[0].wea;
        // console.log(this);
        this.setState({
          city,
          wea
        })
      }
    })
  }
  render() {
    let {userName,sysTime,city,wea}=this.state;
    let {menuType}=this.props;
    return <div className='header'>
      <Row className='header-top'>
        {
          menuType?
          <Col span={8} className='logo'>
            <img src="/assets/logo-ant.svg" alt="图标" />
            <span>单车通用管理系统</span>
          </Col>:""
        }
        <Col span={menuType?"16":"24"}>
          <span>欢迎，{userName}先生</span>
          <a href="#">退出</a>
        </Col>
      </Row>
      {
        menuType?"":
      <Row className='breadcrumb'>
        <Col span="4" className='breadcrumb-title'>
          {this.props.menuName}
        </Col>
        <Col span="20" className='weather'>
          <span className='date'>{sysTime}</span>
          <span className='weather-detail'>{wea}</span>
        </Col>
      </Row>
      }
    </div>;
  }
}
const mapStateToProps=(state)=>{
  return {
    menuName:state.menuName
  }
}
export default connect(mapStateToProps )(Header)