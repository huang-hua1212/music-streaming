<template>
  <div class="pageCover text-white" style="height: 400px; border: white solid">
    <h1>pageCover</h1>
  </div>
  <div
    class="text-white row"
    style="
      height: auto;
      margin-top: 4%;
      border: white solid;
      max-width: 75%;
      margin-left: 12.5%;
    "
  >
    <div class="col-6" style="border: yellow solid; height: 520px">
      <div
        style="
          margin-top: 3.2%;
          margin-left: 2.8%;
          width: 94.4%;
          border: #8adae3 solid;
          height: 16.8%;
        "
      ></div>
      
    </div>
    <div class="col-6" style="border: pink solid; height: 900px">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      chartId: "DZrC8m29ciOFY2JAm3",
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
            Authorization: "Bearer tES0iTvx8nu--_fFoJFWHA==",
            Accept: "application/json",
            "content-type": "application/json",
          },
          crossdomain: true,
        })
        .then((res1) => {
          this.chartPlayList = [...res1.data.data];
          console.log(this.chartPlayList[0]);
        })
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
  },
};

if ("cache" in window) {
  console.log("支援cache");
}
caches.open("my-cache").then((myCache) => {
  // URL only
  myCache.add("/subscribe");

  // Full request object
  myCache.add(
    new Request("/subscribe", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "text/html",
      }),
      /* more request options */
    })
  );
});

// OAUTH2對照錯誤表: https://help.salesforce.com/s/articleView?language=zh_TW&type=5&id=sf.remoteaccess_oauth_flow_errors.htm
</script>
