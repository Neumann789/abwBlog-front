<template>
  <!--推荐内容-->
  <!--最新内容-->
  <div id="commPageDiv"class="commPageCls">
    <div id="newestListDIV">
      <h4>最近更新</h4>
      <el-row :gutter="15">
        <template v-if="newestContentList.length<=0">
          <p style="text-align: center">暂无资源</p>
        </template>

        <el-col :span="4" v-for="(content, index) in newestContentList"  :offset="0.5"  @click.native="contentShow(content.id)" @mouseenter.native="cardEnter($event)" @mouseleave.native="cardLeave($event)">
          <el-card :body-style="{ padding: '0px' }"><!--style="box-shadow: 10px 10px 5px #888888"-->
            <img :src="content.themeImage|| '../static/蜘蛛精侠.png'" class="image">
            <div style="padding: 14px;font-size: 13px;color: #999;">
              <el-row>
                <el-col :span="10" style="float:left">
                  <span>{{content.title|shortFormat}}</span>
                </el-col>
                <el-col :span="10"  style="float:right">
                  <span>分类:{{content.category| categoryFormat}}</span>
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
      let category = this.$router.currentRoute.query.category
      if(typeof(category) != "undefined" ) {
        this.loadData(category);
      }
    },
    watch:{
      '$route' (to, from) {
        let category = to.query.category
        if(typeof(category) != "undefined" ) {
          this.loadData(category);
        }
      }
    },
    methods:{
      cardEnter:function (e) {
        e.target.style.boxShadow = '10px 10px 5px #888888'
      },
      cardLeave:function (e) {
        e.target.style.boxShadow = ''
      },
      loadData:function (category) {
        let params = {
          category:category
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

  .commPageCls{
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

