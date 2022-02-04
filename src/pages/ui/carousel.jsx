import React, { Component } from 'react';
import { Card, Carousel } from 'antd'
import './style.less'
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
export default class Carousel1 extends Component {
  render() {
    return <div>
        <Card title="文字背景轮播图" className='card-wraper'>
            <Carousel  autoplay effect="fade">
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </Card>
        <Card title="图片背景轮播图" className='card-wraper slider-wrap'>
            <Carousel  autoplay effect="fade">
                <div>
                    <img src="/carousel-img/carousel-1.jpg" alt="" />
                </div>
                <div>
                    <img src="/carousel-img/carousel-2.jpg" alt="" />
                </div>
                <div>
                    <img src="/carousel-img/carousel-3.jpg" alt="" />
                </div>
            </Carousel>
        </Card>
    </div>;
  }
}
