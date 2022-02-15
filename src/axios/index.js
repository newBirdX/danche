import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from './../utils/utils'
export default class Axios {
    //jsonp封装
    static jsonp(options){
       return new Promise((resolve,reject)=>{
            Jsonp(options.url,{
                param:'callback'
            },(err,response)=>{
                if(response){
                    resolve(response)
                }else{
                    reject(err.message);
                }
            })
        })
    }

    //axios封装
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading!==false){
            loading=document.getElementById("ajaxLoading");
            loading.style.display="block";
        }
        let baseUrl="";
        if(options.data.isMock){
            //mock测试接口
            baseUrl="https://www.fastmock.site/mock/0e827611eeb4dc2a9a8e807dcd10f12c/mockapi";
        }else{
            //真实接口
            baseUrl="https://www.fastmock.site/mock/0e827611eeb4dc2a9a8e807dcd10f12c/mockapi";
        }
       return new Promise((resolve,reject)=>{
           axios({
               url:options.url,
               method:"get",
               baseURL:baseUrl,
               timeout:2000,
               params:(options.data && options.data.params) || ''
           }).then(response=>{
            if(options.data && options.data.isShowLoading!==false){
                loading=document.getElementById("ajaxLoading");
                loading.style.display="none";
            }
               if(response.status===200){
                   let res=response.data;
                   if(res.code==="0"){
                       resolve(res)
                   }else{
                    Modal.info({
                        title:"提示",
                        content:res.data.msg
                    })
                } 
               }else{
                   reject(response.data);
               }
           })
       }) 
    }

    //表单数据请求
    static requestList(_this,url,params,isMock){
        const data={
            params:params,
            isMock:isMock
        }
        this.ajax({
            url:url,
            data
        }).then(res=>{
            if(res && res.result){
                let list=res.result.item_list.map((item,index)=>{
                    item.key=index;
                    return item;
                })
                _this.setState({
                    list,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page=current;
                        _this.requestList();
                    })
                })
            }
        })
    }

}