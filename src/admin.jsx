import React, { Component } from 'react';
import {Row,Col} from 'antd'
import './style/common.less' 
import NavLeft from './components/navleft'
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home';
export default class Admin extends Component {
  render() {
    return <div>
      <Row className='container'>
        <Col span="3" className='nav-left'>
          <NavLeft />
        </Col>
        <Col span="21" className='main'>
          <Header/>
          <Row className='content'>
            {/* <Home/> */}
            {this.props.children}
          </Row>
          <Footer/>
        </Col>
      </Row>
    </div>;
  }
}
