<template>
  <div id="contentShowDiv">
    <el-container>
      <el-header>
        <h1>{{contentInfo.title}}</h1>
        <p>更新时间:{{contentInfo.modifyTime|timeFormat}}</p>
      </el-header>
      <el-main>
        <div ref="contentShowMainDiv"></div>
      </el-main>
      <el-footer>
        <h1>全部评论</h1>
      </el-footer>
    </el-container>
  </div>
</template>
<style>
  #contentShowDiv{
    margin-top: 100px;
  }

  .el-header, .el-footer {
    color: #333;
    text-align: left;
    line-height: 60px;
  }


  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
<script>
  import {ABWBLOG_SEARCH_CONTENT_LIST} from "../commons/constants";
  import http from "../commons/http";

  export default {

    data(){
      return {
        contentInfo:{

        }
      }
    },

    watch: {
      '$route' (to, from) {
        //console.log(this.$router.currentRoute.query.contentId)
        //console.log("$route",to.query.contentId)
        let contentId = to.query.contentId
        if(typeof(contentId) != "undefined" ){
          //console.log("$route222",to.query.contentId)
          this.querySingleContent(contentId)
        }
      }
    },
    mounted:function () {
     // console.log("contentId",this.$router.currentRoute.query)
      let contentId = this.$router.currentRoute.query.contentId
      if(typeof(contentId) != "undefined" ){
          this.querySingleContent(contentId)
      }
    },

    methods:{
      querySingleContent:function (contentId) {
        let params = {
          id:contentId
        }
        console.log("querySingleContent",contentId);
        http.post(ABWBLOG_SEARCH_CONTENT_LIST,params).then((resp)=>{
         console.log("resp",resp)
         this.contentInfo = resp.data[0];
         this.$refs.contentShowMainDiv.innerHTML = this.contentInfo.content

       })
      }
    }

  }
</script>
