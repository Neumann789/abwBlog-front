<template>
  <div id="createDiv">
    <el-form :model="contentForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="name">
        <el-input v-model="contentForm.title"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="分类" prop="region">
            <el-select v-model="contentForm.category" placeholder="请选择">
              <template v-for="field in fieldList">
                <el-option :label="field.configVal" :value="field.configKey"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签" prop="name">
            <el-input v-model="contentForm.tags" aria-placeholder="多个标签以|分割"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="内容" prop="name">
        <editor @updateParentContent="updateParentContent"></editor>
      </el-form-item>

      <el-form-item prop="themeImage">
        <el-checkbox v-model="isUpload">上传图片</el-checkbox>
        <div ref="picUpload" style="display: none">
          <el-upload
            :action="uploadUrl"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="success">上传</el-button>
          </el-upload>
        </div>
        <div ref="picInput">
        <el-input  v-model="contentForm.themeImage" placeholder="图片链接"></el-input>
        </div>
      </el-form-item>
      <el-form-item style="text-align: center;width: 100%;">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="preview()">预览</el-button>
      </el-form-item>
    </el-form>
    <div ref="previewDiv"></div>
  </div>
</template>

<style>
  #createDiv{
    margin-top:100px;
  }
</style>

<script>
  import Editor from './editor/editor.vue'
  import utils from "../commons/utils";
  import {
    ABWBLOG_CONFIG,
    ABWBLOG_REGIST_CONTENT,
    ABWBLOG_UPLOAD_FILE,
    KEY_LOGIN_CURRENT_USER_INFO
  } from "../commons/constants";
  import http from "../commons/http";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    data(){
      return {
        eContent:"",
        uploadUrl:"",
        contentForm: {
          source: '',
          category: '',
          title: '',
          themeImage: '',
          themeVideo: '',
          tags: '',
          userId:'',
          content:''
        },
        fileList:[],
        fieldList:[],
        isUpload:false

      };
    },
    components: {
      ElCol,
      ElRow,
      Editor
    },
    watch:{
      eContent:function (val) {
        console.log("eContent",val)
        this.contentForm.content = val;
      },
      isUpload:function (val) {
        //console.log("isUpload"+val,this.$refs.picUpload,this.$refs.picInput);
        if(val === true){
          this.$refs.picUpload.style.display = "block";
          this.$refs.picInput.style.display = "none";
        }else{
          this.$refs.picUpload.style.display = "none";
          this.$refs.picInput.style.display = "block";
        }
      }
    },

    methods:{
      submitForm:function () {
        console.log(this.contentForm)
        this.contentForm.userId = utils.read(KEY_LOGIN_CURRENT_USER_INFO).id
        http.post(ABWBLOG_REGIST_CONTENT,this.contentForm).then((resp)=>{
          console.log(resp)
          this.$router.push({path:"/"})
        });
      },

      handleSuccess(resp,file, fileList) {
        console.log(resp)
        if(resp.rspCode === '0000'){
          this.contentForm.themeImage = resp.data
        }else{
          this.fileList = []
        }

      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      updateParentContent(val){
        this.contentForm.content = val
      },
      preview(){
        //console.log('this.$refs.previewDiv',this.$refs.previewDiv)
        //console.log('this.contentForm.content',this.contentForm.content)
        //this.$refs.previewDiv.innerHTML = this.contentForm.content
        this.$alert(this.contentForm.content, '预览', {
          dangerouslyUseHTMLString: true,
          //lockScroll:false,
          customClass:{
            width:"1000px"
          }
        });
      },


    },
    mounted(){
      this.uploadUrl = http.REQUEST_URL + ABWBLOG_UPLOAD_FILE
      utils.loadConfig((config)=>{
        this.fieldList = config.navList
      })


    }
  }
</script>
