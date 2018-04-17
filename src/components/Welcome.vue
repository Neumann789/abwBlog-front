<template>
<!--推荐内容-->
  <!--最新内容-->
  <div id="welcome"class="welcomeCls">
      <div id="recommendArticleListDIV">
        <table ref="recommendTable"></table>
      </div>

    <div id="newestListDIV">
      <P>最近更新</P>
      <table ref="newestArticleListTable"></table>
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
        newestArticleList:[
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"2",articleTitle:"爬虫",articleDesc:"爬虫的工作原理",articleImage:"../static/蜘蛛精侠.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"2",articleTitle:"爬虫",articleDesc:"爬虫的工作原理",articleImage:"../static/蜘蛛精侠.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"2",articleTitle:"爬虫",articleDesc:"爬虫的工作原理",articleImage:"../static/蜘蛛精侠.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
          {articleId:"1",articleTitle:"物联网渗透",articleDesc:"物联网是如何渗透的",articleImage:"../static/物联网渗透.png"},
        ]
      }
    },
    mounted () {
      this.initRecommendArticleList();
      this.initNewestArticleList();
    },
    methods:{
      initRecommendArticleList() {
        //console.log(this.$refs.recommendTable);
        var col = 4;
        var len = this.recommendArticleList.length;
        console.log(len);
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
        var col = 2;
        var len = this.newestArticleList.length;
        console.log(len);
        var trs = '';
        for(var i=0;i<len  ;i+=col){
          var tr = '<tr>';
          for(var j = i;j<i+col && j<len;j++){
            var td = '<td>';
            td = td + '<p>'+this.newestArticleList[j].articleTitle+'</p>';
            td =td + '</td>';

            tr = tr + td;
          }
          tr = tr+'</tr>';
          trs = trs + tr;
        }
        this.$refs.newestArticleListTable.innerHTML=trs;

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
