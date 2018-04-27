<template>
  <div>
    <el-dialog id="loginDialog" @close="$emit('update:show',false)" :visible.sync="loginDialogVisible" :show="show" center>
      <el-form :model="loginForm" ref="loginForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginComfirm" center>登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  #loginDialog{
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
        loginForm: {
          userName: '',
          password:''

        },
        formLabelWidth: '60px',
        loginDialogVisible: this.show,
      };
    },
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      handleClose () {
        this.loginDialogVisible = false;
        this.$refs['loginForm'].resetFields()
      },
      loginComfirm: function () {
        http.post('/abwBlog/login', this.loginForm).then((resp) => {
          logUtils.log(resp)
          utils.save(KEY_LOGIN_CURRENT_USER_INFO,resp.data)
          this.handleClose();
          this.$emit("listenLoginEvent",resp.data)
        });
      }
    },
    watch:{
      show(){
        this.loginDialogVisible = this.show;
      }
    }
  };
</script>
