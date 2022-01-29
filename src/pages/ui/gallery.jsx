import React, { Component } from 'react'
import {Card,Row,Col,Modal} from 'antd'
import './style.less';
export default class Gallery extends Component {
    state={
        hasVisible:false,  //模态框是否显示
    }
    //点击图片获得大图弹框
    openGallery=(item)=>{
        this.setState({
            hasVisible:true,
            currentImg:'/gallery/'+item
        })
    }
    render() {
        let {hasVisible,currentImg}=this.state;
        const imgs=[
            ["1.png","2.png","3.png","4.png","5.png"],
            ["6.png","7.png","8.png","9.png","10.png"],
            ["11.png","12.png","13.png","14.png","15.png"],
            ["16.png","17.png","18.png","19.png","20.png"],
            ["21.png","22.png","23.png","24.png","25.png"]
        ]
        const imgList=imgs.map((list)=>{
            return (
                list.map((item,index)=>{
                    return (
                        <Card cover={<img src={'/gallery/'+item}/>} style={{marginBottom:"5px"}} onClick={()=>{this.openGallery(item)}} key={index}>
                            <Card.Meta title="React Admin" description="xixi"></Card.Meta>
                        </Card>
                    )
                })
            )
        })
        return (
            <div className='card-wrap'>
                <Row gutter={5}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal visible={hasVisible} title="图片画廊" onCancel={()=>{
                    this.setState({
                        hasVisible:false
                    })
                }} footer={null} width={300} height={500}>
                    {<img src={currentImg} alt="" style={{width:'100%'}}/>}
                </Modal>
            </div>
        )
    }
}
