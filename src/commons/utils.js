/*提供相关的工具方法*/

import http from "./http";
import {ABWBLOG_CONFIG, KEY_ALL_CONFIG} from "./constants";

const storage = window.sessionStorage
const configData = {}
export  default {
  configData,
  save:function (key,value) {
    if(typeof value === 'object'){
      value = JSON.stringify(value )
    }
    storage.setItem(key,value)
  },

  read:function (key) {
    var val = storage.getItem(key)
    if (val && val !== '') {
      // return JSON.parse(val) //此处返回为什么使用下面的方式 TODO
      return (new Function('return ' + val))()
    }
  },
  saveMulti:function(datas) {
    datas.forEach(data => save(data.key,data.value))
  },

  readMulti:function (keys) {
    return keys.map(key => read(key))
  },

  clear:function (key) {
      storage.removeItem(key)
  },
  clearAll:function () {
      storage.clear();
  },
  loadConfig:function (f) {
    http.post(ABWBLOG_CONFIG,{}).then((resp)=>{
      configData.data = resp.data
      f(configData.data)
    })
  },
/*  getAllConfig:function () {
    configData.data = this.read(KEY_ALL_CONFIG)
    if(typeof(configData) == "undefined"){
      this.loadConfig()
      configData.data = this.read(KEY_ALL_CONFIG)
    }
    return configData

  }*/
}
