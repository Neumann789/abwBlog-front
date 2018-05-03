<template>
  <div id="contentShowDiv">
      <div class="content-header">
        <h2>{{contentInfo.title}}</h2>
        <span>
          <p style="float: left;">更新时间:{{contentInfo.modifyTime|timeFormat}}</p>
          <div class="item">
            <el-badge :value="12" >
              <el-button size="small">评论</el-button>
            </el-badge>
            &nbsp;&nbsp;&nbsp;&nbsp;
             <el-badge :value="12" >
              <el-button size="small">阅读</el-button>
            </el-badge>
          </div>
          </span>
      </div>
      <div>
        <article ref="contentShowMainDiv">
        </article>
      </div>
      <div>
        <div id="pushCommentDiv" style="margin-bottom: 10px">
          <div ref="pushButton" style="text-align: right;">
            <el-button type="warning" @click="showCommentEdit" >发表评论</el-button>
          </div>
          <div ref="commentEditDiv" style="display: none">
            <div id="pushBtns">
              <el-button ref="confirmPushButton" type="success" @click="confirmPush">提交</el-button>
              <el-button ref="cancelPushButton" type="success" @click="cancelPush">取消</el-button>
            </div >
            <editor @updateParentContent="updateParentContent"></editor>
          </div>
        </div>
        <div id="showCommentsDiv">

          <el-table
            :data="commentInfoList"
            style="width: 100%">
            <el-table-column
              label="全部评论">
              <template slot-scope="scope">
                <div>
                  <p style="float:left;">{{scope.row.userName}}  {{scope.row.modifyTime}}  #{{scope.row.floorNum}}楼 </p>
                  <div style="text-align: right;">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">举报</el-button>
                    <el-button type="text" size="small">回复</el-button>
                  </div>
                </div>
                <div style="clear:both" @onload.native="loadCommentContent(scope.row.commentContent,$event)">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>
<style>

  #pushBtns{
    text-align: right;
    margin-bottom: 5px;
  }

  .item {
    text-align: right;
  }
  #contentShowDiv{
    margin-top: 100px;
  }

  .content-header{
    height:120px;
    border-bottom: 1px solid #e3e3e3;
  }

  .el-footer{
    height:800px;
  }


  .el-main {
    color: #333;
  }
</style>
<script>
  import {ABWBLOG_SEARCH_CONTENT_LIST, KEY_LOGIN_CURRENT_USER_INFO} from "../commons/constants";
  import http from "../commons/http";
  import Editor from './editor/editor.vue'
  import utils from "../commons/utils";

  export default {

    data(){
      return {
        contentInfo:{

        },

        commentInfo:{
          userName:"",
          toUserName:"",
          modifyTime:"",
          commentContent:"",
          floorNum:""
        },
        commentInfoList: [{
          userName:"",
          toUserName:"",
          modifyTime:"",
          commentContent:"",
          floorNum:"",
          childCommentInfoList:[{
            userName:"",
            toUserName:"",
            modifyTime:"",
            commentContent:"",
            floorNum:""
          }]
        },{
          userName:"",
          toUserName:"",
          modifyTime:"",
          commentContent:"",
          childCommentInfoList:[{
            userName:"",
            toUserName:"",
            modifyTime:"",
            commentContent:""
          }]
        }

        ]

      }
    },
    components: {
      Editor
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

      this.refreshCommentList();


    },

    methods:{
      querySingleContent:function (contentId) {
        let params = {
          id:contentId
        }
        console.log("querySingleContent",contentId);
        http.post(ABWBLOG_SEARCH_CONTENT_LIST,params).then((resp)=>{
         //console.log("resp",resp)
         this.contentInfo = resp.data[0];
         if(typeof(this.contentInfo) != "undefined"){
           this.$refs.contentShowMainDiv.innerHTML = this.contentInfo.content
         }

       })
      },
      updateParentContent(val){
        console.log("updateParentContent",val)
        this.commentInfo.commentContent = val
      },
      showCommentEdit(){
        if(this.$refs.commentEditDiv.style.display == 'none'){
          this.$refs.commentEditDiv.style.display = 'block';
          this.$refs.pushButton.style.display = 'none';
        }else{
          this.$refs.commentEditDiv.style.display = 'none';
        }

      },
      confirmPush(){
        console.log("confirmPush",this.commentInfo.commentContent)
        let currentUser = utils.read(KEY_LOGIN_CURRENT_USER_INFO);
/*        userName:"",
          toUserName:"",
          modifyTime:"",
          commentContent:"",
          floorNum:""*/
        this.commentInfo.userName=currentUser.userName
        this.commentInfo.toUserName = this.contentInfo.userName

        this.commentInfoList.push(this.commentInfo)

        this.$refs.commentEditDiv.style.display = 'none';
        this.$refs.pushButton.style.display = 'block';
      },

      cancelPush(){
        this.$refs.commentEditDiv.style.display = 'none';
        this.$refs.pushButton.style.display = 'block';
      },

      refreshCommentList(){

        this.commentInfoList = [
          {
            userName:"james",
            toUserName:"fhb",
            modifyTime:"2018-05-03 15:50:00",
            commentContent:"说得好",
            floorNum:3
          },{
            userName:"wade",
            toUserName:"fhb",
            modifyTime:"2018-05-03 15:50:00",
            commentContent:"说得好",
            floorNum:2
          },{
            userName:"kebi",
            toUserName:"fhb",
            modifyTime:"2018-05-03 15:50:00",
            commentContent:"说得好",
            floorNum:1
          },
        ]
      }

    },
    loadCommentContent(commentContent,even){
      console.log("loadCommentContent",commentContent,even)
      let divDom = even.target;
      divDom.innerHTML = commentContent
    }

  }
</script>
