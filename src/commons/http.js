/*提供http请求相关的工具*/
import Vue from 'vue'
import axios from "axios";

const REQUEST_URL = 'http://127.0.0.1:58080';

axios.defaults.baseURL = REQUEST_URL

export default {
  REQUEST_URL,
  post:function (url,params) {
    let rspData = {}
    return axios.post(url,params).then((resp)=>{
      //console.log(resp)
      if(resp.status === 200){
        rspData = resp.data;
        if(rspData.rspCode !== '0000'){
          new Vue().$notify({
            title: '提示',
            message: rspData.rspCode+'-'+rspData.rspMsg,
            type: 'error',
            duration: '2000'
          })
        }
      }else {
        new Vue().$notify({
          title: '提示',
          message: '通信异常',
          type: 'error',
          duration: '2000'
        })
        throw new Error()
      }
      return rspData
    })


  }

}
