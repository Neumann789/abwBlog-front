<template>
  <div id="search">
    <input type="text" class="search" placeholder="搜索" v-model.trim="title" />
  </div>
</template>

<script>
  // 节流函数
  const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  export default {
    name: 'search',
    data() {
      return {
        title: '',
        search:[]
      };
    },
    watch: {
      //watch title change
      title() {
        delay(() => {
          this.fetchData();
        }, 300);
      },
    },
    methods: {
      async fetchData(val) {
        const res = await this.fetch({
          url: '写上你的URL',
          method: 'GET',
          params: { title: this.title },
        });
        this.search = res.data.list;
      },
    },
    mounted() {},
  };
</script>
