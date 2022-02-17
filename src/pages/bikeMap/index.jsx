import React, { Component } from 'react'
import { Card } from 'antd'
import axios from './../../axios'
import BaseForm from './../../components/baseForm'
export default class BikeMap extends Component {
    state={}
    params={}
    map={}
    handdleSubmit=(filterSubmit)=>{
        this.params=filterSubmit;
        this.requestList();
    }
    //请求地图数据
    requestList=()=>{
        axios.ajax({
            url:"/map/bike_list",
            data:{
                params:this.params
            }
        }).then(res=>{
            if(res.code==="0"){
                this.setState({
                    total_count:res.result.total_count,
                })
                this.renderMap(res);
            }
        })
    }
    //渲染地图
    renderMap=(res)=>{
        let {map}=this.map
        let list=res.result.route_list;
        let serviceList=res.result.service_list
        map = new window.BMapGL.Map("container")
        let gps1=list[0];
        let startPoint=new window.BMapGL.Point(gps1.lon, gps1.lat);
        let gps2=list[list.length-1];
        let endPoint=new window.BMapGL.Point(gps2.lon, gps2.lat);
        //设置中心点坐标
        map.centerAndZoom(endPoint, 15);
        //起点图标
        let startIcon= new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
            imgSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(36,42)
        })
         //通过marker将起点和图标联系起来
         let startMarker=new window.BMapGL.Marker(startPoint,{icon:startIcon})
        //终点图标
        let endIcon= new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
            imgSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        //通过marker将终点和图标联系起来
        let endMarker=new window.BMapGL.Marker(endPoint,{icon:endIcon})
        map.addOverlay(startMarker);
        map.addOverlay(endMarker);

        //绘制路线
        let trackPoint=[];
            for(let i=0;i<list.length;i++){
                let point =list[i];
                trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
            }
            let polyline= new window.BMapGL.Polyline(trackPoint,{
                strokeColor:"#1869AD",
                strokeWeight:3,
                strokeOpacity:1
            })
            map.addOverlay(polyline);

        //添加控件
        map.enableScrollWheelZoom(true);
        map.addControl( new window.BMapGL.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT})); 
        map.addControl( new window.BMapGL.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT})); 
        //绘制服务区
        let trackPoint1=[];
        for(let i=0;i<serviceList.length;i++){
            let point =serviceList[i];
            trackPoint1.push(new window.BMapGL.Point(point.lon,point.lat))
        }
        let polygon=new window.BMapGL.Polygon(trackPoint1,{
            strokeColor:"#CE0000",
            strokeWeight:4,
            // fillColor:"#ff8605"
        })
        map.addOverlay(polygon);

        //添加自行车图标
        let bikeList=res.result.bike_list;
        let bikeIcon= new window.BMapGL.Icon('/assets/bike.jpg',new window.BMapGL.Size(36,42),{
            imgSize:new window.BMapGL.Size(36,42),
            anchor:new window.BMapGL.Size(18,42)
        })
        bikeList.map(item=>{
            let p=item.split(",");
            let point =new window.BMapGL.Point(p[0],p[1]);
            let bikeMarker=new window.BMapGL.Marker(point,{icon:bikeIcon})
            map.addOverlay(bikeMarker);
        })
    }
    formList=[
        {
            type:"城市"
        },
        {
            type:"时间查询"
        },
        {
            type:"SELECT",
            lable:"订单状态",
            field:"order_status",
            placeholder:"全部",
            initialValue:0,
            list:[{id:0,name:"全部"},{id:1,name:"进行中"},{id:2,name:"已结束"}]
        }
    ]
  render() {
      let {total_count}=this.state;
    return (
      <div>
          <Card>
              <BaseForm formList={this.formList} filterSubmit={this.handdleSubmit}></BaseForm>
          </Card>
          <Card style={{marginTop:"10px"}}>
              <div>共{total_count}辆车</div>
              <div id="container" style={{height:"500px"}}></div>
          </Card>
      </div>
    )
  }
  componentDidMount(){
      this.requestList();
  }
}
