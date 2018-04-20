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
              <li @click="chgContext(field.fieldKey,field.fieldUrl,$event)">{{field.fieldName}}</li>
            </template>
          </ul>
        </div>
        <div class="head-nav-right">
          <ul class="nav-list">
            <li @click="chgContext('search','/Search',$event)">
              搜索
            </li>
            <li @click="chgContext('login','/Login',$event)">登录</li>
            <li @click="chgContext('regist','/Regist',$event)">注册</li>
            <li @click="chgContext('about','/About',$event)">关于</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <LoginDialog ref="loginDialog"></LoginDialog>
    </div>
    <div class="app-foot">
      <p>Copyright © 2015-2018 abaoworld. 京ICP备xxxx号</p>
    </div>


  </div>
</template>

<script>
import LoginDialog from './components/Login.vue'

export default {
  components:{
    LoginDialog,
  },
  name: 'App',
  data:function () {
    return {
      fieldList:[
        {fieldName:'首页',fieldUrl:'/',fieldKey:'home'},
        {fieldName:'专栏',fieldUrl:'/CommPage',fieldKey:'professional'},
        {fieldName:'后端',fieldUrl:'/CommPage',fieldKey:'backend'},
        {fieldName:'WEB',fieldUrl:'/CommPage',fieldKey:'web'},
        {fieldName:'资讯',fieldUrl:'/CommPage',fieldKey:'news'},
      ],
      currentCtx:""
    };
  },
  methods: {
    showDialog (param) {

    },
    chgContext(fieldKey,fieldUrl,e){
      //console.log(field);
      var dom =e.target;
      console.log(dom.nodeType);
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
        this.$refs.loginDialog.$refs.loginDialog.open()
      }else{
        this.$router.push({ path: fieldUrl })
      }

    }
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
  width: 1200px;
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
  width: 1200px;
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
</style>
