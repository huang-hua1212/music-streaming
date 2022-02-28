<template>
  <div></div>
</template>
<script>
// const playListId = this.$route.params;
export default {
  created() {
    if ('caches' in window) {
      console.log('支援cache');
    } else {
      console.log('不支援cache');
    }
    const playListId = this.$route.params.id;
    console.log(playListId);
  },
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
