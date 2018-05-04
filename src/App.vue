<template>
  <div id="app">
    <div class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path: '/'}" class="head-logo">
          <img src="./assets/logo.png">
        </router-link>
        <div class="head-nav-left">
          <ul class="nav-list">
            <template v-for="field in fieldList">
              <li @click="chgContext(field.configKey,field.extMap.fieldUrl,$event)">{{field.configVal}}</li>
            </template>
          </ul>
        </div>
        <div class="head-nav-right"  v-bind:class="{ login_class: isActive }" >
          <ul class="nav-list">
            <li style="width: 325px">
              <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="searchKey">
              </el-input>
            </li>
            <li @click="chgContext('login','/Login',$event)">登录</li>
            <li @click="chgContext('regist','/Regist',$event)">注册</li>
            <li @click="chgContext('about','/About',$event)">关于</li>
          </ul>
        </div>
        <div class="head-nav-right" v-bind:class="{ login_class: !isActive }">
          <ul class="nav-list">
            <li style="width: 325px">
              <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="searchKey">
              </el-input>
            </li>
            <li @click="chgContext('create','/Create',$event)">
              <span  class="el-icon-edit-outline" >创作</span>
            </li>
            <li @click="chgContext('userInfoDetail','/UserInfoDetail',$event)" style="text-align: center;line-height: 100%;">
              <img src="./assets/user_icon_default.jpg" width="35px" height="35px" style="margin-top: 7px"/>
              <span style="display: inline-block; margin-top: -26px;vertical-align: middle;">{{userName}}</span>
            </li>
            <li @click="chgContext('loginOut','/Login',$event)">退出</li>
            <li @click="chgContext('about','/About',$event)">关于</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
      <!--<keep-alive>--><!--此处巨坑，导致页面跳转时，路由页面时mounted没有被触发-->
        <router-view></router-view>
      <!--</keep-alive>-->
      <LoginDialog :show.sync="show" @listenLoginEvent="handleLogin"></LoginDialog>
      <RegistDialog :show.sync="registShow"></RegistDialog>
    </div>
    <div class="app-foot">
      <p>Copyright © 2015-2018 abaoworld. 京ICP备xxxx号</p>
    </div>


  </div>
</template>

<script>
import LoginDialog from './components/Login.vue'
import RegistDialog from './components/Regist.vue'
import utils from "./commons/utils";
import {ABWBLOG_CONFIG, KEY_LOGIN_CURRENT_USER_INFO} from "./commons/constants";
import http from "./commons/http";

export default {
  components:{
    LoginDialog,
    RegistDialog
  },
  name: 'App',
  data:function () {
    return {
      fieldList:[],
      currentCtx:"",
      show:false,
      registShow:false,
      userName:"",
      isActive:false,
      searchKey:""
    };
  },
  methods: {
    handleLogin (currentUser) {
      if(currentUser != null){
        this.isActive = true;
        //console.log("currentUser.userName:"+currentUser.userName)
        this.userName = currentUser.userName
        this.$router.push({ path: "/" })
      }
    },
    handleLoginOut(){
      utils.clearAll();
      this.isActive = false;
      this.$router.push({ path: "/" })
    },
    chgContext(fieldKey,fieldUrl,e){
      //console.log(field);
      var dom =e.target;
      //console.log(dom.nodeType);
      if(!dom.nodeName == 'LI'){
          return;
      }
      var childNodeList = dom.parentNode.childNodes;
      console.log(childNodeList.length)
      for(var i = 0;i<childNodeList.length;i++){
        if(childNodeList[i].nodeName == 'LI'){
          childNodeList[i].style.background = '';
        }
      }
      dom.style.background = '#404040';
      if(fieldKey ==='login'){
        this.show = true;
      }else if(fieldKey ==='regist'){
        this.registShow = true;
      }else if(fieldKey ==='loginOut'){
        this.handleLoginOut();
      }else{
        this.$router.push(
          { path: fieldUrl,
            query:{
              category:fieldKey
            }
          })
      }

    }
  },
  watch:{
    searchKey:function () {
      //console.log('searchKey',this.searchKey)
      this.$router.push({
        path:"/Search",
        query:{
          searchContent:this.searchKey
        }
      })
    }
  },
  mounted(){
    utils.loadConfig((config)=>{
      this.fieldList = config.navList
    })

    let currentUser = utils.read(KEY_LOGIN_CURRENT_USER_INFO);
    this.handleLogin(currentUser);
  }
}



</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 50px;
  line-height: 50px;
  width: 100%;
}

.head-logo {
  float: left;
  margin-top: 10px;
}
  .head-logo img {
    width: 30px;
  }

.app-head-inner {
  width: 80%;
  margin: 0 auto;
}

.head-nav-right {
  float: right;
}

.head-nav-left {
  float: left;
}


  .head-nav-right ul,.head-nav-left ul{
    overflow: hidden;
    margin-top: 0px;
  }
  .head-nav-right li,.head-nav-left li{
    cursor:pointer;
    float:left;

  }

  ul{
    list-style:none;
  }

.nav-pile {
  padding: 0 10px;
}

.container {
  width: 75%;
  /*height:900px;*/
  margin: 0 auto;
}

.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #E8E8E8;
  clear: both;
  margin-top: 30px;
/*固定到窗口底部一直显示，不跟随滚动条滚动*/
  position:relative;
  bottom:0px;
  z-index:-1;
}


.nav-list li{
  clear:none;width:80px;text-align: center;
}

.login_class{
  display:none;
}

</style>
