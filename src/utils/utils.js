import React from "react";
import { Select } from "antd";
let {Option}=Select
//公共插件
export default {
    //显示时间
    formatDate(time){
        if(time==="") return "";
        let date=new Date(time);
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() +" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    },
    //分页插件
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
        current:data.result.page,
        pageSize:data.result.page_size,
        total:data.result.total,
        showTotal:()=>{
            return `共${data.result.total}条`
        },
        // showQuickJumper:true
        }
    },
    //表单封装中用来遍历返回每一项select的option，以数组形式返回，通过jsx模板语法进行数组遍历
    getOptions(data){
        if(!data){
            return [];
        }
        let options=[];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    }
}