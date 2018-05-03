<template>
<!--推荐内容-->
  <!--最新内容-->
  <div id="welcome"class="welcomeCls">
    <div id="newestListDIV">
      <P>最近更新</P>
      <el-row :gutter="15">
        <el-col :span="4" v-for="(content, index) in newestContentList" :key="content.id"  :offset="0.5"  @click.native="contentShow(content.id)" @mouseenter.native="cardEnter($event)" @mouseleave.native="cardLeave($event)">
          <el-card :body-style="{ padding: '0px' }" >
            <img :src="content.themeImage|| '../static/蜘蛛精侠.png'" class="image" :title="content.title">
            <div style="padding: 14px;font-size: 13px;color: #999;">
              <el-row>
                <el-col style="float:left">
                  <span>标题: {{content.title|shortFormat}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col style="float:left">
                  <span>分类: {{content.category| categoryFormat}}</span>
                </el-col>
              </el-row>
              <div class="bottom clearfix" style="text-align: left">
                <time class="time">更新时间:{{ content.modifyTime | timeFormat }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>



  </div>
</template>

<script>

  import http from "../commons/http";
  import {ABWBLOG_SEARCH_CONTENT_LIST} from "../commons/constants";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {
      ElCol,
      ElRow},
    data(){
      return {
        newestContentList:[]
      }
    },
    mounted: function() {
      this.loadData();
    },
    watch:{
      '$route' (to, from) {
        this.loadData();
      }
    },
    methods:{
      /*initRecommendArticleList() {
        //console.log(this.$refs.recommendTable);
        var col = 4;
        var len = this.recommendArticleList.length;
       // console.log(len);
        var trs = '';
        for(var i=0;i<len  ;i+=col){
          var tr = '<tr>';
          for(var j = i;j<i+col && j<len;j++){
            var td = '<td>';
            td = td + '<img src="'+this.recommendArticleList[j].articleImage+'"/>';
            td = td + '<p>'+this.recommendArticleList[j].articleTitle+'</p>';
            td =td + '</td>';

            tr = tr + td;
          }
          tr = tr+'</tr>';
          trs = trs + tr;
        }
        this.$refs.recommendTable.innerHTML=trs;

      },
      initNewestArticleList(){
        var col = 1;
        var len = this.newestArticleList.length;
        //console.log(len);
        var trs = '';
        for(var i=0;i<len  ;i+=col){
          var tr = '<tr>';
          for(var j = i;j<i+col && j<len;j++){
            var td = '<td>';
            td = td + '<p>'+this.newestArticleList[j].title+'</p>';
            td =td + '</td>';

            tr = tr + td;
          }
          tr = tr+'</tr>';
          trs = trs + tr;
        }
        this.$refs.newestArticleListTable.innerHTML=trs;

      },*/
      cardEnter:function (e) {
        e.target.style.boxShadow = '10px 10px 5px #888888'
      },
      cardLeave:function (e) {
        e.target.style.boxShadow = ''
      },
      loadData:function () {

        console.log("welcome loadData");
        let params = {
        }
        http.post(ABWBLOG_SEARCH_CONTENT_LIST,params).then((resp)=>{
          this.newestContentList = resp.data
        })
      },
      contentShow:function (contentId) {
        this.$router.push({
          path:"/ContentShow",
          query:{
            contentId:contentId
          }
        })
      }
    }
  }

</script>
<style>
/*
  .index-board-car {
    background: url(../assets/1.png) no-repeat;
  }

  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
*/

  .welcomeCls{
    margin:50px auto;
  }

   .time {
     font-size: 13px;
     color: #999;
   }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    height: 160px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

