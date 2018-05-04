<template>
  <div id="contentShowDiv">
      <div class="content-header">
        <h2>{{contentInfo.title}}</h2>
        <span>
          <p style="float: left;">更新时间:{{contentInfo.modifyTime|timeFormat}}</p>
          <div class="item">
            <el-badge :value="contentInfo.commentNum" >
              <el-button size="small">评论</el-button>
            </el-badge>
            &nbsp;&nbsp;&nbsp;&nbsp;
             <el-badge :value="contentInfo.viewNum" >
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
            <el-button type="warning" @click="showCommentEdit(null)" >发表评论</el-button>
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
                  <p style="float:left;" class="comment_head">{{scope.row.commentUserName}}  {{scope.row.modifyTime|timeFormat}}  #{{scope.row.floorNum}}楼 </p>
                  <div style="text-align: right;">
                    <el-button @click="handleAccusat(scope.row)" type="text" size="small">举报</el-button>
                    <el-button type="text" size="small" @click="showCommentEdit(scope.row)">回复</el-button>
                    <el-button type="text" size="small" @click="showChildCommentList(scope.row,$event)">查看回复</el-button>
                  </div>
                </div>
                <div style="clear:both" >
                  <div v-html="scope.row.commentContent"></div>
                  <div :ref="'childCommentListDiv'+scope.row.id" style="display: none;margin-left: 50px;">
                    <el-table
                      :data="scope.row.childCommentList"
                      style="width: 100%" :show-header="false">
                      <el-table-column label="全部评论">
                        <template slot-scope="scope2">
                          <div>
                            <p style="float:left;" class="comment_head">{{scope2.row.commentUserName}}  {{scope2.row.modifyTime|timeFormat}} </p>
                            <div style="text-align: right;">
                              <el-button @click="handleAccusat(scope2.row)" type="text" size="small">举报</el-button>
                              <el-button type="text" size="small" @click="showCommentEdit(scope2.row)">回复</el-button>
                            </div>
                            <div style="clear:both" v-html="scope2.row.commentContent">
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
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

  .comment_head{
    font-size: 14px;
    font-weight: bold;
  }
</style>
<script>
  import {
    ABWBLOG_COMMENT_ADDCOMMENT, ABWBLOG_COMMENT_GETCOMMENTLISTBYCONTENT, ABWBLOG_COMMENT_QUERYCHILDCOMMENTSBYROOT,
    ABWBLOG_SEARCH_CONTENT_LIST, ABWBLOG_SEARCH_SINGLE_CONTENT,
    KEY_LOGIN_CURRENT_USER_INFO
  } from "../commons/constants";
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
        selectedComment:{},
        commentInfoList: []

      }
    },
    components: {
      Editor
    },

    watch: {
      contentInfo(){
        this.refreshCommentList();
      }
    },
    mounted:function () {
      console.log(this.$router,999)
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
        http.post(ABWBLOG_SEARCH_SINGLE_CONTENT,params).then((resp)=>{
         //console.log("resp",resp)
         this.contentInfo = resp.data;
         if(typeof(this.contentInfo) != "undefined"){
           this.$refs.contentShowMainDiv.innerHTML = this.contentInfo.content
         }

       })
      },
      updateParentContent(val){
        //console.log("updateParentContent",val)
        this.commentInfo.commentContent = val
      },
      showCommentEdit(selectedComment){
        this.commentInfo = {} //清空评论
        this.selectedComment = {} //清空上一次被回复的评论
        if(selectedComment !== null){
          this.selectedComment = selectedComment
        }
        if(this.$refs.commentEditDiv.style.display == 'none'){
          this.$refs.commentEditDiv.style.display = 'block';
          this.$refs.pushButton.style.display = 'none';
        }else{
          this.$refs.commentEditDiv.style.display = 'none';
          this.$refs.pushButton.style.display = 'block';
        }

      },
      confirmPush(){
        let currentUser = utils.read(KEY_LOGIN_CURRENT_USER_INFO);
        if(typeof(currentUser) === "undefined"){
          alert("请先登录")
          return
        }
        if(this.commentInfo.commentContent.length<10){
          alert("输入内容不能为空")
          return
        }
        this.commentInfo.commentUserName=currentUser.userName
        this.commentInfo.commentUserId = currentUser.id
        if(JSON.stringify(this.selectedComment) == "{}"){
          this.commentInfo.toUserName = this.contentInfo.userName
          this.commentInfo.toUserId = this.contentInfo.userId
          //this.commentInfo.toCommentId = this.contentInfo.id
          this.commentInfo.contentId = this.contentInfo.id
          this.commentInfo.commentClass = 'R'//对文章的直接评论设置评论级别为根评论
        }else{
          this.commentInfo.toUserName = this.selectedComment.commentUserName
          this.commentInfo.toUserId = this.selectedComment.commentUserId
          this.commentInfo.toCommentId = this.selectedComment.id
          this.commentInfo.contentId = this.selectedComment.contentId
          this.commentInfo.commentClass = 'C' //对文章的直接评论设置评论级别为子评论
        }

        //console.log("confirmPush",this.commentInfo)
        http.post(ABWBLOG_COMMENT_ADDCOMMENT,this.commentInfo).then((resp)=> {
          console.log(ABWBLOG_COMMENT_ADDCOMMENT, resp)
          this.refreshCommentList()
        })
        this.$refs.commentEditDiv.style.display = 'none';
        this.$refs.pushButton.style.display = 'block';

      },

      cancelPush(){
        this.$refs.commentEditDiv.style.display = 'none';
        this.$refs.pushButton.style.display = 'block';
      },

      refreshCommentList(){

        http.post(ABWBLOG_COMMENT_GETCOMMENTLISTBYCONTENT,this.contentInfo).then((resp)=> {
          this.commentInfoList = resp.data;
        })

        /*this.commentInfoList = [
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
        ]*/
      },
      showChildCommentList(selectedComment,event){
        let btnDom = event.target;
        let selectedChildCommentListDiv = this.$refs['childCommentListDiv'+ selectedComment.id]
        if(selectedChildCommentListDiv.style.display === 'none') {
          selectedChildCommentListDiv.style.display = "block"
          btnDom.innerText = '收起回复'
        }else{
          this.$refs['childCommentListDiv'+ selectedComment.id].style.display = "none"
          btnDom.innerText = '查看回复'
        }
      },
      showChildCommentList2(selectedComment,event){
        //console.log("showChildCommentList",this.$refs['childCommentListDiv'+ selectedComment.id])
        let btnDom = event.target;
        let selectedChildCommentListDiv = this.$refs['childCommentListDiv'+ selectedComment.id]
        if(selectedChildCommentListDiv.style.display === 'none'){
          selectedChildCommentListDiv.style.display = "block"
          btnDom.innerText = '收起回复'
          console.log("showChildCommentList",selectedComment)
          http.post(ABWBLOG_COMMENT_QUERYCHILDCOMMENTSBYROOT,selectedComment).then((resp)=> {

            console.log(ABWBLOG_COMMENT_QUERYCHILDCOMMENTSBYROOT,resp)
            let childCommentList = resp.data
            var col = 1;
            var len = childCommentList.length;
            var trs = '';
            for(var i=0;i<len  ;i+=col){
              var tr = '<tr>';
              for(var j = i;j<i+col && j<len;j++){
                var td = '<td>';
                td = td + '<p class="comment_head">'+childCommentList[j].commentUserName+' 回复 '+childCommentList[j].toUserName+'   '+utils.timeFormat(childCommentList[j].modifyTime)+'</p>'
                td = td + '<p>'+childCommentList[j].commentContent+'</p>';

                td = td + '<div style="text-align: right;">';
                td = td + '<a @click="handleClick(scope.row)">举报</a>';
                td = td + '<a  @click="showCommentEdit(scope.row)">回复</a>';
                td = td + '</div>'
                td =td + '</td>';

                tr = tr + td;
              }
              tr = tr+'</tr>';
              trs = trs + tr;
            }
            selectedChildCommentListDiv.innerHTML=trs;
          })
        }else{
          this.$refs['childCommentListDiv'+ selectedComment.id].style.display = "none"
          btnDom.innerText = '查看回复'
        }
      },

      handleAccusat(selectedComment){
        alert("待开发")
      }


    },

  }
</script>
