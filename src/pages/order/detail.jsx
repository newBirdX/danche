import React, { Component } from 'react'
import { Card } from 'antd'
import './detail.less'
import axios from './../../axios'
export default class Detail extends Component {
    state={
        orderInfo:{}
    }
    map={

    }
    getDetailInfo=(orderId)=>{
        axios.ajax({
            url:"/order/detail",
            data:{
                params:{
                    orderId
                }
            }
        }).then(res=>{
            if(res.code==="0"){
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap(res.result);
            }
        })
    }
    //初始化地图
    renderMap=(result)=>{
        this.map=new window.BMapGL.Map("orderDetailMap");
        this.map.centerAndZoom(new window.BMapGL.Point(119.613447,39.93823), 11);
        this.addMapControl();
        this.drawBikeRoute(result.position_list)
        this.drawServiceArea(result.area_list)
    }
    //添加地图控件
    addMapControl=()=>{
        let map=this.map;
        map.enableScrollWheelZoom(true);
        map.addControl( new window.BMapGL.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT})); 
        map.addControl( new window.BMapGL.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT})); 
    }
    //绘制用户的行驶路线
    drawBikeRoute=(positionList)=>{
        let map=this.map;
        //起点
        let startPoint="";
        //终点
        let endPoint="";
        if(positionList.length>0){
            let first =positionList[0];
            let last =positionList[positionList.length-1];
            //起点坐标
            startPoint=new window.BMapGL.Point(first.lon,first.lat);
            //起点图标
           let startIcon= new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
                imgSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            })
            //通过marker将起点和图标联系起来
            let startMarker=new window.BMapGL.Marker(startPoint,{icon:startIcon})
             //终点坐标
             endPoint=new window.BMapGL.Point(last.lon,last.lat);
             //终点图标
            let endIcon= new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
                 imgSize:new window.BMapGL.Size(36,42),
                 anchor:new window.BMapGL.Size(36,42)
             })
             //通过marker将终点和图标联系起来
             let endMarker=new window.BMapGL.Marker(endPoint,{icon:endIcon})
            map.addOverlay(startMarker);
            map.addOverlay(endMarker);
            //连接路线图
            let trackPoint=[];
            for(let i=0;i<positionList.length;i++){
                let point =positionList[i];
                trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
            }
            let polyline= new window.BMapGL.Polyline(trackPoint,{
                strokeColor:"#1869AD",
                strokeWeight:3,
                strokeOpacity:1
            })
            map.addOverlay(polyline);
        }
    }
    //绘制服务区
    drawServiceArea=(areaList)=>{
        let map=this.map;
        //连接路线图
        let trackPoint=[];
        for(let i=0;i<areaList.length;i++){
            let point =areaList[i];
            trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
        }
        let polygon=new window.BMapGL.Polygon(trackPoint,{
            strokeColor:"#CE0000",
            strokeWeight:4,
            fillColor:"#ff8605"
        })
        map.addOverlay(polygon);
    }
    render() {
        let {orderInfo}=this.state;
        return (
            <div>
                <Card>
                    <div id='orderDetailMap' className='order-map'></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode===1?"服务区":"停车点"}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">电话号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                    <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{orderInfo.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo.distance}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
    componentDidMount(){
        let orderId=this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo();
        }
    }
}
