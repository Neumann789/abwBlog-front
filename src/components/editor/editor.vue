<template>
    <div>
        <!--<div ref="editor" style="text-align:left"></div>-->
      <div id="headerEditor" class="toolbar"></div>
      <!--<div style="padding: 5px 0; color: #ccc">中间隔离带</div>-->
      <div id="textEditor" class="text" style="text-align:left">
        <p>请输入内容</p>
      </div>
    </div>
</template>
<style type="text/css">
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    height: 600px;
  }
</style>

<script>
    import E from 'wangeditor'
    import http from "../../commons/http";
    import {ABWBLOG_UPLOAD_FILE} from "../../commons/constants";

    export default {
      name: 'editor',
      data () {
        return {
          editorContent: this.content
        }
      },
      props: {
        content:String
      },

      methods: {
        getContent: function () {
            alert(this.editorContent)
        }
      },
      watch:{
        content:function (val) {
          //console.log("content",val)
          this.editorContent = val;
        },
        editorContent:function (val) {
          //console.log("editorContent",val)
          this.$emit("updateParentContent",val);
        },

      },
      mounted() {
        //var editor = new E(this.$refs.editor)
        var editor = new E('#headerEditor','#textEditor')
        //var editor = new E(this.$refs.editor)
        editor.customConfig.uploadImgServer = http.REQUEST_URL + ABWBLOG_UPLOAD_FILE
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.zIndex = 100
        console.log("editor",editor)
        console.log("editor.customConfig",editor.customConfig)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }

        editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
            console.log("before");
          },
          success: function (xhr, editor, result) {
            console.log("success");
          },
          fail: function (xhr, editor, result) {
            console.log("fail");
          },
          error: function (xhr, editor) {
            console.log("error");
          },
          timeout: function (xhr, editor) {
            console.log("timeout");
          },

          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
          customInsert: function (insertImg, result, editor) {
            //console.log("customInsert",result.data);
            //var url = result.data
            insertImg(result.data)
          }
        };
        editor.create()
      }
    }
</script>

<style scoped>
</style>
