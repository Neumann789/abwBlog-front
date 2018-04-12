<template>
<!--推荐内容-->
  <!--最新内容-->
  <div id="welcome"class="welcomeCls">
      <div id="recommendArticleListDIV">

        <table ref="recommendTable">

<!--          <tr v-for="(article,index) in recommendArticleList" v-if="index%2 === 0">
            <td>
              <img src="../assets/1.png"/>
              <p>{{recommendArticleList[index].articleTitle}}</p>
            </td>
            <td v-if="(index%2 == 1&&(recommendArticleList.length-1==index))==false">
              <img src="../assets/1.png"/>
              <p>{{recommendArticleList[index+1].articleTitle}}</p>
            </td>

          </tr>-->

        </table>
      </div>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        recommendArticleList:[
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"2",articleTitle:"爬虫",articleDesc:"爬虫的工作原理",articleImage:"../static/蜘蛛精侠.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"2",articleTitle:"爬虫",articleDesc:"爬虫的工作原理",articleImage:"../static/蜘蛛精侠.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"2",articleTitle:"爬虫",articleDesc:"爬虫的工作原理",articleImage:"../static/蜘蛛精侠.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
        ],
        recommendbackground:"url(../assets/1.png) no-repeat;"
      }
    },
    mounted () {
      this.init();
    },
    methods:{
      init() {
        //console.log(this.$refs.recommendTable);
        var col = 4;
        var len = this.recommendArticleList.length;
        console.log(len);
        var trs = '';
        for(var i=0;i<len  ;i+=4){
          var tr = '<tr>';
          for(var j = i;j<i+4 && j<len;j++){
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

      }
    }
  }

</script>
<style>
  .index-board-car {
    background: url(../assets/1.png) no-repeat;
  }

  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }

  .welcomeCls{
    margin:20px auto;
  }

</style>
