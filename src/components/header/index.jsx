import React, { Component } from 'react';
import { Row,Col } from 'antd'
import axios1 from '../../axios'
import './index.less'
import Utils from '../../utils/utils'
export default class Header extends Component {
  state={
    userName:"刘聪",
    sysTime:"" //时间
  }
  //获取天气api
  getWeatherApi(){

  }
  render() {
    let {userName,sysTime}=this.state;
    return <div className='header'>
      <Row className='header-top'>
        <Col span="24">
          <span>欢迎，{userName}先生</span>
          <a href="#">退出</a>
        </Col>
      </Row>
      <Row className='breadcrumb'>
        <Col span="4" className='breadcrumb-title'>
          首页
        </Col>
        <Col span="20" className='weather'>
          <span className='date'>{sysTime}</span>
          <span className='weather-detail'>多云转晴</span>
        </Col>
      </Row>
    </div>;
  }
  componentDidMount(){
    setInterval(() => {
      let time= Utils.formatDate(new Date().getTime());
      this.setState({sysTime:time})
    }, 1000);
  }
}
