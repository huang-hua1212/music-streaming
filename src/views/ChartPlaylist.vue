<template>
  <navbar-black></navbar-black>
  <music-player-sidebar
  ref="playersSidebar"
  :songs= 'playList'></music-player-sidebar>
  <div class="pageCover text-white" style="height: 510px">
    <div class="page-cover-overlap text-black">
      <p class="chinese">{{ this.chartName.zhName }}日榜</p>
      <h3>Top {{ this.chartName.engName }} Daily Singles Chart</h3>
    </div>
    <!-- PAGE COVER -->
    <section class="holder">
      <div class="item-holder first-item-holder" :style="cssPropsUrl1">
        <!-- <div class="title-holder">
          <p>ITEM 1</p>
        </div> -->
      </div>
      <div class="item-holder" :style="cssPropsUrl2">
        <!-- <div class="title-holder">
          <p>ITEM 2</p>
        </div> -->
      </div>
      <div class="item-holder" :style="cssPropsUrl3">
        <!-- <div class="title-holder">
          <p>ITEM 3</p>
        </div> -->
      </div>
      <div class="item-holder final-item-holder" :style="cssPropsUrl4">
        <!-- <div class="title-holder">
          <p>ITEM 4</p>
        </div> -->
      </div>
    </section>
  </div>
  <div
    class="text-white row"
    style="height: 800px; margin-top: 6%; max-width: 75%; margin-left: 12.5%"
  >
    <div
      class="col-6 container"
      style="height: 100%; min-height: 100%; padding-left: 0; padding-right: 0"
    >
      <div
        class="row pt-3 pb-3"
        style="margin-left: 0%; width: 100%; height: 13%"
        v-for="(item, id) in chartPlayList[0]"
        :key="id"
      >
        <h4
          class="col-1"
          :class="{ 'ps-0': id > 8 }"
          style="padding-right: 0; margin: 0; line-height: 260%"
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
                style="margin-left: 34%; margin-top: 25%"
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
            padding-top: 2%;
            padding-left: 0;
            margin-left: 0;
            padding-right: 0;
          "
        >
          <p style="font-size: 13px; letter-spacing: 1.5px">
            {{ item.name }}
          </p>
        </div>

        <!-- 加入歌單 -->
        <div class="col-1" style="padding-left: 0; margin-top: 3.5%">
          <a class="" style="color: white" href="#"
          @click.prevent="addToPlaylist(item)">
            <font-awesome-icon icon="plus" size="2x" />
          </a>
        </div>
        <!-- More -->
        <div class="col-1" style="margin-top: 3.5%">
          <a class="" style="color: white" href="#" @click.prevent="">
            <font-awesome-icon icon="ellipsis" size="2x" />
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
        style="margin-left: 0%; width: 100%; height: 13%"
        v-for="(item, id) in chartPlayList[1]"
        :key="id"
      >
        <!-- rank顯示 -->
        <h4
          class="col-1"
          :class="{ 'ps-0': id + chartPlayList[1].length + 1 > 9 }"
          style="padding-right: 0; margin: 0; line-height: 260%"
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
                style="margin-left: 34%; margin-top: 25%"
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
            padding-top: 2%;
            padding-left: 0;
            margin-left: 0;
            padding-right: 0;
          "
        >
          <p style="font-size: 13px; letter-spacing: 1.5px">
            {{ item.name }}
          </p>
        </div>

        <!-- 加入歌單 -->
        <div class="col-1" style="padding-left: 0; margin-top: 3.5%">
          <a class="" style="color: white" href="#" @click.prevent="addToPlaylist(item)">
            <font-awesome-icon icon="plus" size="2x" />
          </a>
        </div>
        <!-- More -->
        <div class="col-1" style="margin-top: 3.5%">
          <a class="" style="color: white" href="#" @click.prevent="">
            <font-awesome-icon icon="ellipsis" size="2x" />
          </a>
        </div>
      </div>
    </div>

    <!-- <div style="height: 40%; border: white solid">你可能想聽</div> -->
  </div>

  <div style="position: relative">
      <loading
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="true"
      />
    </div>

  <div class="currentPlaySong" style="position: fixed; bottom: 0; width: 100%">
    <iframe
      :src="currentSongHref"
      allow="autoplay"
      style="height: 100px; width: 100%"
    />
  </div>
  <footer
    class="footer text-white"
    style="
      margin-top: 0%;
      margin-bottom: 0;
      width: 100%;
      height: 120px;
      text-align: center;
      padding: 2%;
    "
  >
    <img
      style="width: 100px; height: 40px"
      src="https://storage.googleapis.com/vue-course-api.appspot.com/record-shop/1647107643454.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kqRZZ03yHPmRgXpQb6LdfwfDPUU8qcfStNPiCsglNAomY%2BncZLFA9zAp8nGEJFyF8ada8XAWBxcVxV9NmqC3vx8LsQISVkalgAoM3Syzx4u%2BasVYFB7LjqHJ20EevMHd5WWFr2rq4tr4gVl84MpRRC9kCf%2BDpTKGNwoEwmANlVTs1ZARLB1gPz3Skua%2BCpYPVWVj2Em8TAzNMq4%2B7NjpRD%2Fx9Z3PWOxQ20d0GAlg%2BTt7d18BIahDFjzEGru0LHydr5EI%2F%2BFEF8ZzzFx0T2KFKMSp7XtphZEUlPep73T%2BXO9K86HEWIbxE5hy7Q7OOzYpRanRXNcNx%2Bl4FBJDfY4%2B0w%3D%3D"
    />
    <div>
      <h5>Copyright © 2022 hua</h5>
    </div>
  </footer>
</template>
<script>
import axios from 'axios';
import NavbarBlack from '@/components/NavbarBlack.vue';
import musicPlayerSidebar from '@/components/MusicPlayer_Sidebar.vue';
import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      isLoading: false,
      chartName: {
        zhName: '',
        engName: '',
      },
      chartId: 'DZrC8m29ciOFY2JAm3',
      chartPlayList: [],
      currentSong: {},
      currentSongHref: '',
      cssPropsUrl1: {
        backgroundImage: '',
      },
      cssPropsUrl2: {
        backgroundImage: '',
      },
      cssPropsUrl3: {
        backgroundImage: '',
      },
      cssPropsUrl4: {
        backgroundImage: '',
      },
      playList: [],
    };
  },
  components: {
    NavbarBlack, musicPlayerSidebar, Loading,
  },
  created() {
    this.checkChartName();
  },
  mounted() {
    this.getChartPlayList();
  },
  methods: {
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 970);
    },
    addToPlaylist(item) {
      this.showLoading();
      this.playList.push(item);
      this.$refs.playersSidebar.openNav();
      setTimeout(() => {
        this.$refs.playersSidebar.closeNav();
      }, 2000);

    },
    checkChartName() {
      const chartNam = this.$route.params.name;
      if (chartNam.trim() === '華語單曲日榜') {
        this.chartName = {
          zhName: '華語單曲',
          engName: 'Mandarin',
        };
      } else if (chartNam.trim() === '西洋單曲日榜') {
        this.chartName = {
          zhName: '西洋單曲',
          engName: 'Western',
        };
      } else if (chartNam.trim() === '韓語單曲日榜') {
        this.chartName = {
          zhName: '韓語單曲',
          engName: 'Korean',
        };
      } else if (chartNam.trim() === '日語單曲日榜') {
        this.chartName = {
          zhName: '日語單曲',
          engName: 'Japanese',
        };
      } else if (chartNam.trim() === '台語單曲日榜') {
        this.chartName = {
          zhName: '台語單曲',
          engName: 'Taiwanese',
        };
      } else if (chartNam.trim() === '粵語單曲日榜') {
        this.chartName = {
          zhName: '粵語單曲',
          engName: 'Cantonese',
        };
      } else if (chartNam.trim() === '華語新歌日榜') {
        this.chartName = {
          zhName: '華語新歌',
          engName: 'Latest Mandarin',
        };
      } else if (chartNam.trim() === '西洋新歌日榜') {
        this.chartName = {
          zhName: '西洋新歌',
          engName: 'Latest Western',
        };
      }
    },
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
          this.cssPropsUrl1.backgroundImage = `url(${this.chartPlayList[0][0].album.images[1].url})`;
          this.cssPropsUrl2.backgroundImage = `url(${this.chartPlayList[0][1].album.images[1].url})`;
          this.cssPropsUrl3.backgroundImage = `url(${this.chartPlayList[0][2].album.images[1].url})`;
          this.cssPropsUrl4.backgroundImage = `url(${this.chartPlayList[0][3].album.images[1].url})`;
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
.page-cover-overlap {
  position: absolute;
  background-color: rgb(255, 255, 255);
  width: 60%;
  height: 55%;
  top: 98px;
  left: 0;
  right: 0;
  margin: auto;
  opacity: 0.65;
  z-index: 50;
  .chinese {
    font-weight: bold;
    margin-top: 15%;
    font-size: 50px;
    letter-spacing: 0.5px;
    // text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
}
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
  width: 89%;
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
// 參考 https://codepen.io/pieterheijman/pen/GRgeVgK
// PAGE COVER設計的中間兩個設計
.holder {
  display: flex;
  align-items: left;

  .item-holder {
    background-size: cover;
    height: 70vh;
    width: 100vh;
    max-width: 40%;
    background-color: #191c2c;
    clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
    margin-left: -5%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    &:first-child {
      margin-left: 0;
    }

    .title-holder {
      height: 10px;
      background-color: #191c2c;
      padding-left: 4%;
      color: #fff;
    }
  }
}

// PAGE COVER設計的最左邊設計
.holder {
  display: flex;
  align-items: left;
  .first-item-holder {
    background-size: cover;
    height: 70vh;
    width: 100vh;
    max-width: 40%;
    background-color: #191c2c;
    clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%);
    margin-left: -5%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    &:first-child {
      margin-left: 0;
    }

    .title-holder {
      height: 10px;
      background-color: #191c2c;
      padding-left: 4%;
      color: #fff;
    }
  }
}

// PAGE COVER設計的最右邊設計
.holder {
  display: flex;
  align-items: left;
  .final-item-holder {
    background-size: cover;
    height: 70vh;
    width: 100vh;
    max-width: 40%;
    background-color: #191c2c;
    clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
    margin-left: -5%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    &:first-child {
      margin-left: 0;
    }

    .title-holder {
      height: 10px;
      background-color: #191c2c;
      padding-left: 4%;
      color: #fff;
    }
  }
}
.footer {
  background-color: #000000;
}
</style>
