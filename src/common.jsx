import React, { Component } from 'react';
import {Row,Col} from 'antd'
import './style/common.less' 
import Header from './components/header'
export default class Common extends Component {
  render() {
    return <div>
      <Row className='simple-page'>
        <Col span={24}>
        <Header menuType="second"/>
        </Col>
      </Row>
      <Row className='content'>
        <Col span={24}>
          {this.props.children}
          </Col>
      </Row>
    </div>;
  }
}
