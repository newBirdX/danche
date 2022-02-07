import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
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
        let baseUrl="https://www.fastmock.site/mock/0e827611eeb4dc2a9a8e807dcd10f12c/mockapi";
       return new Promise((resolve,reject)=>{
           axios({
               url:options.url,
               method:"get",
               baseURL:baseUrl,
               timeout:3000,
               params:(options.data && options.data.params) || ''
           }).then(response=>{
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

}