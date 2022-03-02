<template>
  <div class="pageCover text-white" style="height: 400px; border: white solid">
    <h1>pageCover</h1>
  </div>
  <div
    class="text-white row"
    style="
      height: 1200px;
      margin-top: 4%;
      border: white solid;
      max-width: 75%;
      margin-left: 12.5%;
    "
  >
    <div
      class="col-6 container"
      style="
        border: yellow solid;
        height: 100%;
        min-height: 100%;
        padding-left: 0;
        padding-right: 0;
      "
    >
      <div
        class="row pt-3 pb-3"
        style="margin-left: 0%; width: 100%; border: #8adae3 solid; height: 10%"
        v-for="(item, id) in chartPlayList[0]"
        :key="id"
      >
        <h4
          class="col-1"
          :class="{ 'ps-0': id > 8 }"
          style="
            border: #6614d9 solid;
            padding-right: 0;
            margin: 0;
            line-height: 310%;
          "
        >
          {{ id + 1 }}
        </h4>
        <div
          class="col-2 picture p-0"
          style=" max-height: 100%"
        >
          <img
            :src="item.album.images[1].url"
            style="margin-left: auto; height: 100%; width: auto"
          />
        </div>
        <div class="col-6" style="border:white solid;padding-top:2%;">
          <p style="font-size:15px; letter-spacing: 1.5px">{{ item.name }}</p>
        </div>
      </div>
    </div>

  <div
      class="col-6 container"
      style="
        border: yellow solid;
        height: 100%;
        min-height: 100%;
        padding-left: 0;
        padding-right: 0;
      "
    >
      <div
        class="row pt-3 pb-3"
        style="margin-left: 0%; width: 100%; border: #8adae3 solid; height: 10%"
        v-for="(item, id) in chartPlayList[0]"
        :key="id"
      >
        <h4
          class="col-1 ps-0"
          style="
            border: #6614d9 solid;
            padding-right: 0;
            margin: 0;
            line-height: 310%;
          "
        >
          {{ id + 10 }}
        </h4>
        <div
          class="col-2 picture p-0"
          style=" max-height: 100%"
        >
          <img
            :src="item.album.images[1].url"
            style="margin-left: auto; height: 100%; width: auto"
          />
        </div>
        <div class="col-6" style="border:white solid;padding-top:2%;">
          <p style="font-size:15px; letter-spacing: 1.5px">{{ item.name }}</p>
        </div>
      </div>
    </div>

   
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      chartId: 'DZrC8m29ciOFY2JAm3',
      chartPlayList: [],
    };
  },
  mounted() {
    this.getChartPlayList();
  },
  methods: {
    getChartPlayList() {
      this.chartId = this.$route.params.id;
      const chartPath = `https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/new-hits-playlists/${this.chartId}/tracks?territory=TW&limit=30`;
      axios
        .get(chartPath, {
          headers: {
            Authorization: 'Bearer tES0iTvx8nu--_fFoJFWHA==',
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          crossdomain: true,
        })
        .then((res1) => {
          const tempArray = [...res1.data.data];

          this.chartPlayList[0] = [...tempArray.slice(0, 10)];
          this.chartPlayList[1] = [...tempArray.slice(10, 20)];

          console.log(this.chartPlayList[0]);
        })
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
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
