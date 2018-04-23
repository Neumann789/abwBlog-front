<template>
  <div>
    <el-dialog id="registDialog" @close="$emit('update:show',false)" :visible.sync="registDialogVisible" :show="show" center>
      <el-form :model="registForm" ref="registForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="registForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="registForm.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="registForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="常住地" :label-width="formLabelWidth">
          <el-input v-model="registForm.currentAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生地" :label-width="formLabelWidth">
          <el-input v-model="registForm.bornAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="喜好" :label-width="formLabelWidth">
          <el-input v-model="registForm.loves" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" :label-width="formLabelWidth">
          <el-input v-model="registForm.signature" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="registForm.confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="regist" center>注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  #registDialog{
    width: 50%;
    margin:auto;
  }
  .el-input {
    width: 300px;
  }


</style>

<script>
  //:visible.sync="loginDialogVisible"
  import http from "../commons/http";
  import utils from "../commons/utils";
  import {KEY_LOGIN_CURRENT_USER_INFO} from '../commons/constants'
  import * as logUtils from "../commons/logUtils";

  export default {
    data() {
      return {
        registForm: {
          userName: '',
          nickName:"",
          email:'',
          currentAddress:'',
          bornAddress:"",
          loves:"",
          signature:"",
          password:'',
          confirmPassword:''

        },
        formLabelWidth: '120px',
        registDialogVisible: this.show,
      };
    },
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      regist: function () {
        http.post('/abwBlog/regist', this.registForm).then((resp) => {
          logUtils.log(resp)
          this.registDialogVisible = false
          this.$router.push({ path: "/" })
        });
      }
    },
    watch:{
      show(){
        this.registDialogVisible = this.show;
      }
    }
  };
</script>
