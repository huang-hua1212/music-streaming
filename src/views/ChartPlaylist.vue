<template>
  <div class="pageCover"></div>
</template>
<script>
export default {
  data(){
    chartId:'';
  },
  mounted() {
    this.chartId = this.$route.params.id;

  },
  methods:{
    getChartPlayList(){
      
    }
  }
};

if ('cache' in window) {
  console.log('支援cache');
}
caches.open('my-cache').then((myCache) => {
  // URL only
  myCache.add('/subscribe');

  // Full request object
  myCache.add(
    new Request('/subscribe', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/html',
      }),
      /* more request options */
    }),
  );
});


// OAUTH2對照錯誤表: https://help.salesforce.com/s/articleView?language=zh_TW&type=5&id=sf.remoteaccess_oauth_flow_errors.htm
</script>
