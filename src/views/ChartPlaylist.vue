<template>
  <div class="pageCover text-white" style="height: 400px; border: white solid">
    <h1>pageCover</h1>
  </div>
  <div
    class="text-white row"
    style="
      height: 800px;
      margin-top: 4%;
      border: white solid;
      max-width: 75%;
      margin-left: 12.5%;
    "
  >
    <div
      class="col-6 container"
      style="height: 100%; min-height: 100%; padding-left: 0; padding-right: 0"
    >
      <div
        class="row pt-3 pb-3"
        style="margin-left: 0%; width: 100%; border: #8adae3 solid; height: 13%"
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
            line-height: 260%;
          "
        >
          {{ id + 1 }}
        </h4>

        <!-- 歌的照片 -->
        <div
          class="col-2 picture p-0"
          style="
            max-height: 100%;
            max-width: 100%;
            position: relative;
            padding-right: 0;
          "
        >
          <a href="#" @click.prevent="playSong(item)">
            <div class="overlapPanel" style="padding: 0">
              <font-awesome-icon
                icon="play"
                size="2x"
                style="margin-left: 28%; margin-top: 20%"
              />
            </div>
          </a>
          <img
            :src="item.album.images[1].url"
            style="
              border: white solid;
              margin-left: auto;
              height: 100%;
              width: auto;
            "
          />
        </div>

        <!-- 歌名 -->
        <div
          class="col-6"
          style="
            border: white solid;
            padding-top: 2%;
            padding-left: 0;
            margin-left: 0;
          "
        >
          <p style="font-size: 13px; letter-spacing: 1.5px">
            {{ item.name }}
          </p>
        </div>

        <!-- 加入歌單 -->
        <div class="col-1" style="margin-top: 3.5%">
          <a class="" style="color: white" href="#" @click.prevent="">
            <font-awesome-icon icon="plus" size="2x" />
          </a>
        </div>
      </div>
    </div>

    <div
      class="col-6 container"
      style="height: 100%; min-height: 100%; padding-left: 0; padding-right: 0"
    >
      <div
        class="row pt-3 pb-3"
        style="margin-left: 0%; width: 100%; border: #8adae3 solid; height: 13%"
        v-for="(item, id) in chartPlayList[1]"
        :key="id"
      >
        <!-- rank顯示 -->
        <h4
          class="col-1"
          :class="{ 'ps-0': id + chartPlayList[1].length + 1 > 9 }"
          style="
            border: #6614d9 solid;
            padding-right: 0;
            margin: 0;
            line-height: 260%;
          "
        >
          {{ id + chartPlayList[1].length + 1 }}
        </h4>
        <!-- 歌的照片 -->
        <div
          class="col-2 picture p-0"
          style="
            max-height: 100%;
            max-width: 100%;
            position: relative;
            padding-right: 0;
          "
        >
          <a href="#" @click.prevent="playSong(item)">
            <div class="overlapPanel" style="padding: 0">
              <font-awesome-icon
                icon="play"
                size="2x"
                style="margin-left: 28%; margin-top: 20%"
              />
            </div>
          </a>
          <img
            :src="item.album.images[1].url"
            style="
              border: white solid;
              margin-left: auto;
              height: 100%;
              width: auto;
            "
          />
        </div>
        <!-- 歌名 -->
        <div
          class="col-6"
          style="
            border: white solid;
            padding-top: 2%;
            padding-left: 0;
            margin-left: 0;
          "
        >
          <p style="font-size: 13px; letter-spacing: 1.5px">
            {{ item.name }}
          </p>
        </div>

        <!-- 加入歌單 -->
        <div class="col-1" style="margin-top: 3.5%">
          <a class="" style="color: white" href="#" @click.prevent="">
            <font-awesome-icon icon="plus" size="2x" />
          </a>
        </div>
      </div>
    </div>

    <div style="height: 40%; border: white solid">你可能想聽</div>
  </div>

  <div class="currentPlaySong" style="position: fixed; bottom: 0; width: 100%">
    <iframe
      :src="currentSongHref"
      allow="autoplay"
      style="height: 100px; width: 100%"
    />
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      chartId: 'DZrC8m29ciOFY2JAm3',
      chartPlayList: [],
      currentSong: {},
      currentSongHref: '',
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
          const songPside = 6;
          this.chartPlayList[0] = [...tempArray.slice(0, songPside)];
          this.chartPlayList[1] = [
            ...tempArray.slice(songPside, songPside * 2),
          ];
        })
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
    playSong(item) {
      this.currentSong = { ...item };
      const songHref = `https://widget.kkbox.com/v1/?id=${this.currentSong.id}&type=song&terr=TW&lang=TW&autoplay=true`;
      this.currentSongHref = songHref;
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
<style lang="scss" scoped>
.picture {
  width: 14.75%;
}
.overlapPanel {
  display: none;
  z-index: 100;
  position: absolute;
  left: 0;
  // right: 0;
  height: 100%;
  width: auto;
  overflow: hidden;
  width: 100%;
  background-color: #0e0c0c;
  opacity: 0.5;
  justify-content: center;
}
.picture a:hover,
picture a {
  color: white;
}
.picture {
  overflow: hidden;
  border-radius: 3px;
}
.picture:hover .overlapPanel {
  display: block;
}
</style>
