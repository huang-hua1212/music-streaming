<template>
  <navbar-black></navbar-black>

  <!-- carousel參考https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_carousel2&stacked=h -->
  <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="prev"
  >
    <span
      class="carousel-control-prev-icon navCarousel-prev-icon"
      aria-hidden="true"
    ></span>
    <span class="visually-hidden">Previous</span>
  </button>

  <div
    id="carouselExampleIndicators"
    class="carousel slide"
    data-bs-ride="carousel"
    style="max-height: 550px; overflow-y: hidden"
  >
    <div class="carousel-inner nav-carousel-inner">
      <div
        class="carousel-item"
        v-for="(item, idx) in imagePath"
        :key="idx"
        :class="{ active: idx === 0 }"
      >
        <div
          class="backOfImg"
          :style="{ backgroundImage: `url(${item.imgUrl})` }"
          style="border: black solid"
        ></div>
        <router-link :to="item.to">
          <img
            style="margin-top: -600px"
            :src="item.imgUrl"
            class="d-block"
            alt="圖片未加載完成"
          />
        </router-link>
      </div>
    </div>
  </div>
  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="next"
  >
    <span
      class="carousel-control-next-icon navCarousel-next-icon"
      aria-hidden="true"
    ></span>
    <span class="visually-hidden">Next</span>
  </button>

  <!-- 內容Content -->
  <div class="content text-white" style="margin-bottom: 0px">
    <div
      class="freshSuggest ms-auto"
      style="border: white solid; border-radius: 10px"
    >
      <p
        style="
          margin-left: 2%;
          font-size: 5vh;
          margin-top: 1%;
          margin-bottom: 1%;
          letter-spacing: 2px;
          font-style: oblique;
        "
      >
        Latest Songs
      </p>
      <div
        class="carousel slide freshSuggestCarousel container"
        id="carouselLatestSongs"
        data-bs-ride="carousel"
        data-bs-interval="false"
      >
        <!-- data-bs-interval="false"停止自動  -->
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(item, idx) in latestSongsList"
            :key="item"
            :class="{ active: idx === 0 }"
          >
            <div class="mt-3 freshSuggestImgs row">
              <div
                class="freshSuggestImg picture col-sm-3 p-0"
                v-for="it in item"
                :key="it"
                style="
                  border: #212120 solid;
                  max-height: 100%;
                  max-width: 100%;
                  position: relative;
                  padding-right: 0;
                "
              >
                <a href="#" @click.prevent="playSong(it)">
                  <div class="overlapPanelLatestSong" style="padding: 0">
                    <font-awesome-icon
                      icon="play"
                      size="3x"
                      style="margin-left: 42%; margin-top: 38%"
                    />
                  </div>
                </a>
                <img :src="it.album.images[1].url"
                alt="圖片未加載完成"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselLatestSongs"
          data-bs-slide-to="0"
          aria-current="true"
          aria-label="Slide 1"
          @click="changeLatestSongCarousel(0)"
          :class="{ active: latestSongCarouselIdx === 0 }"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselLatestSongs"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          @click="changeLatestSongCarousel(1)"
          :class="{ active: latestSongCarouselIdx === 1 }"
        ></button>
      </div>
    </div>

    <div class="chartList ms-auto container">
      <p
        style="
          margin-top: 5%;
          font-size: 5vh;
          margin-bottom: 1%;
          letter-spacing: 2px;
          font-style: oblique;
        "
      >
        Hottest Charts
      </p>
      <div class="row">
        <div
          class="chartImg col-3"
          style="padding: 0px; position: relative"
          v-for="item in allChart"
          :key="item"
        >
          <router-link :to="`/ChartPlaylist/${item.id}/${item.title}`">
            <div class="overlapPanel">
              <p style="font-size: 5vh">{{ item.title }}</p>
              <hr />
            </div>
          </router-link>
          <img :src="item.images[1].url"
          alt="圖片未加載完成"/>
        </div>
      </div>
    </div>

    <!-- <div
      class="playList-MemorySong ms-auto container"
      style="border: white solid; height: 320px; margin-top: 4%; padding: 0"
    >
      <h2 style="margin-left: 5px; letter-spacing: 1px">音樂回憶</h2>
    </div> -->

    <div
      class="playList-MemorySong ms-auto container"
      style="
        border: white solid;
        height: 350px;
        margin-top: 4%;
        padding: 0;
        padding-bottom: 30px;
        overflow: hidden;
      "
    >
      <p
        style="
          margin-left: 1%;
          margin-top: 1%;
          font-size: 5vh;
          margin-bottom: 1%;
          letter-spacing: 1px;
          font-style: oblique;
        "
      >
        Latest MV
      </p>
      <div
        class="carousel-video grid-animation"
        style="display: flex; height: 80%; margin-bottom: 2%"
      >
        <div
          class="perVideo elements"
          style="float: left; margin-left: 4%; margin-bottom: 2%"
          v-for="item in videoList"
          :key="item.id"
        >
          <iframe
            id="player"
            type="text/html"
            width="100%"
            height="100%"
            :src="item.iframeSrc"
            frameborder="0"
          ></iframe>
        </div>
        <div
          class="perVideo elements"
          style="float: left; margin-left: 4%; margin-bottom: 2%"
          v-for="item in videoList"
          :key="item.id"
        >
          <iframe
            id="player"
            type="text/html"
            width="100%"
            height="100%"
            :src="item.iframeSrc"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
    <div
      class="randomLyric"
      style="height: auto; margin-top: 4%"
    >
      <!-- 參考標語 -->
      <h2 style="margin-left: 5px; letter-spacing: 1px" hidden>每日歌詞</h2>
      <div
        style="margin-top: 1%; max-width: 80%; margin-left: 10%; width: auto;
        color: #e8e3e3;"
      >
        <p
          style="
            letter-spacing: 4px;
            white-space: pre-wrap;
            line-height: 5vh;
            text-align: center;
            font-size: 2.5vh;
          "
          v-html="dailyLyric.text"
        ></p>
        <p
          style="
            font-style: italic;
            margin-top: 2%;
            margin-left: 0%;
            text-align: right;
            width: 70%;
            font-size: 2.5vh;
          "
        >
          -{{ dailyLyric.writer }}
        </p>
      </div>
    </div>
    <div hidden><blockquote>
      {{dailyLyric.text}}
<cite> {{ dailyLyric.writer }}</cite>
</blockquote></div>
  </div>
  <!-- Loading -->
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
      margin-top: 8%;
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
// 參考
// 新聞: https://www.pixelmattic.com/blog/best-news-website-designs/
// carousel參考https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_carousel2&stacked=h
import axios from 'axios';
import qs from 'query-string';
import 'vue-loading-overlay/dist/vue-loading.css';
import NavbarBlack from '@/components/NavbarBlack.vue';
import Loading from 'vue-loading-overlay';

const testLyricText = '我曾將青春翻湧成她\n也曾指尖彈出盛夏\n心之所動 且就隨緣去吧\n\n'
  + '這一路上走走停停\n順著少年漂流的痕跡\n邁出車站的前一刻\n竟有些猶豫\n\n不禁笑這近鄉情怯'
  + '\n仍無可避免 而長野的天 依舊那麼暖\n風吹起了從前\n\n從前初識這世間 萬般流連'
  + '\n看著天邊似在眼前 也甘願赴湯蹈火去走它一遍\n如今走過這世間 萬般流連\n'
  + '\n翻過歲月不同側臉 措不及防闖入你的笑顏\n\n我曾難自拔於世界之大'
  + '\n也沉溺於其中夢話';
export default {
  data() {
    return {
      isLoading: false,
      currentSongHref: '',
      access_token: '',
      youtubeApiKeyArray: [
        'AIzaSyAiDdbkL-phVHXwR0YNxAgjVE7V0xOLmG8',
        'AIzaSyAPfa88f3-wUXl9BeEu4qRanejhlaIvwnc',
      ],
      youtubeApiKey: 'AIzaSyAPfa88f3-wUXl9BeEu4qRanejhlaIvwnc',
      musixmatchAccessToken: '1429bba043518ec0e509edd12f151731',
      musixmatchAccessTokenArray: [
        '1429bba043518ec0e509edd12f151731',
        '5b50630c7d65f4a374b27ad929e1a073',
      ],
      recordShopDropDown: false,
      productsToSell: [],
      temp: {},
      slide: 0,
      sliding: null,
      imagePath: [
        {
          imgUrl: 'https://i.kfs.io/album/global/121656465,1v1/fit/500x500.jpg',
          to: '/record-shop/vinyls/-MxhOSKEQE7NmVP8YH_N',
        },
        {
          imgUrl: 'https://i.kfs.io/album/global/142042170,2v1/fit/700x700.jpg',
          to: '',
        },
        {
          imgUrl: 'https://i.kfs.io/album/global/162300536,0v1/fit/700x700.jpg',
          to: '',
        },
      ],
      // imagePath: [
      //   'https://i.kfs.io/album/global/121656465,1v1/fit/500x500.jpg',
      //   'https://i.kfs.io/album/global/142042170,2v1/fit/700x700.jpg',
      //   'https://i.kfs.io/album/global/162300536,0v1/fit/700x700.jpg',
      //   'https://i.kfs.io/album/global/161307573,1v1/fit/700x700.jpg',
      //   // 'https://i.kfs.io/album/tw/1550023,0v1/fit/500x500.jpg',
      //   // 'https://i.kfs.io/artist/global/20635,0v13/fit/500x500.jpg',
      //   // 'https://images.unsplash.com/photo-1645812579074-2e82763422df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
      //   // 'https://images.unsplash.com/photo-1645742175891-9207e6a52e6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      //   // 'https://images.unsplash.com/photo-1555918001-e20d10c2bc1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      // ],
      latestSongsList: [],
      dailyLyric: {
        writer: '',
        text: '',
      },
      allChart: [],
      videoList: [],
      latestSongCarouselIdx: 0,
    };
  },
  components: { NavbarBlack, Loading },
  created() {
    this.isLoading = true;
    // TEST
    this.getKKboxAccessToken(this.getChart, this.getLatestSongs);
    // 全部皆呼叫axios，但都不具相關性，故可以
    // this.getChart();
    this.getDailyLyric(); // 會耗損API
    // this.testGetDailyLyric();
    // this.getLatestSongs();
    this.getLatestVideo();
  },
  methods: {
    changeLatestSongCarousel(it) {
      this.latestSongCarouselIdx = it;
    },
    showLoading(time) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, time);
    },
    getKKboxAccessToken(func1, func2) {
      const oauth = {
        grant_type: 'client_credentials',
        client_id: '94bc95aa9cdcd73c8d5e10ce0146e40a',
        client_secret: '27995ba42851ede2928d759cb2d56d17',
      };
      axios
        .post(
          'https://all-the-cors.herokuapp.com/https://account.kkbox.com/oauth2/token', // '?grant_type=client_credentials&client_id=94bc95aa9cdcd73c8d5e10ce0146e40a&client_secret=27995ba42851ede2928d759cb2d56d17',
          qs.stringify(oauth),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded',
            },
            crossdomain: true,
          },
        )
        .then((res) => {
          this.access_token = res.data.access_token;
          if (func1) {
            func1();
          }
          if (func2) {
            func2();
          }
        });
    },
    refreshToken() {
      axios
        .post(
          'https://all-the-cors.herokuapp.com/https://account.kkbox.com/oauth2/token?grant_type=authorization_code&code=tES0iTvx8nu--_fFoJFWHA==&client_id=94bc95aa9cdcd73c8d5e10ce0146e40a&client_secret=27995ba42851ede2928d759cb2d56d17',
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded',
              Authorization:
                'Basic {BASE64_ENCODE(94bc95aa9cdcd73c8d5e10ce0146e40a:27995ba42851ede2928d759cb2d56d17)}',
            },
            crossdomain: true,
          },
        )
        .then((res) => console.log(res));
    },
    getLatestSongs() {
      axios
        .get(
          'https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/new-hits-playlists/DZrC8m29ciOFY2JAm3?territory=TW',
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
              Accept: 'application/json',
              'content-type': 'application/json',
            },
            crossdomain: true,
          },
        )
        .then((res) => {
          const songList = [...res.data.tracks.data];
          for (let i = 0; i < 2; i += 1) {
            this.latestSongsList.push(songList.slice(i * 4, (i + 1) * 4));
          }
          this.latestSongsList = [...this.latestSongsList];
          this.latestSongsList[0] = [...this.latestSongsList[0]];
          this.latestSongsList[1] = [...this.latestSongsList[1]];
        });
    },
    getChart() {
      axios
        .get(
          'https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/charts?territory=TW&limit=10',
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
              Accept: 'application/json',
              'content-type': 'application/json',
            },
            crossdomain: true,
          },
        )
        .then((res) => {
          this.allChart = res.data.data.slice(1, 9);
          this.imagePath[1].to = `/ChartPlaylist/${this.allChart[0].id}/${this.allChart[0].title}`;
          this.imagePath[2].to = `/ChartPlaylist/${this.allChart[2].id}/${this.allChart[2].title}`;
        });
    },
    testGetDailyLyric() {
      const index = testLyricText.indexOf('\n\n');
      this.dailyLyric.text = testLyricText.slice(0, index + 1);
      this.dailyLyric.writer = '青峰';
    },
    getDailyLyric() {
      const artist = '吳青峰';
      const artistIdPath = `https://all-the-cors.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${artist}&page_size=5&apikey=${this.musixmatchAccessToken}`;

      // getArtristID
      axios
        .get(artistIdPath)
        .then((res1) => {
          const artistId = res1.data.message.body.artist_list[0].artist.artist_id;
          const pageNth = 1;
          const pageSize = 10;
          // getSongIDList
          // 查詢某個藝人的pageSize首歌
          const songIdApiPath = `https://all-the-cors.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?f_artist_id=${artistId}&f_has_lyrics=1&page_size=${pageSize}&page=${pageNth}&s_track_rating=ASC&apikey=${this.musixmatchAccessToken}`;
          this.getSongIdApiPath(songIdApiPath, pageSize);
        })
        .catch(() => {
          this.testGetDailyLyric();
        });
    },
    getSongIdApiPath(songIdApiPath, pageSize) {
      axios
        .get(songIdApiPath)
        .then((res2) => {
          const tracksList = res2.data.message.body.track_list;
          const indexOfSong = Math.floor(Math.random() * pageSize);
          const track = tracksList[indexOfSong]; // 第幾首歌
          const trackId = track.track.track_id;
          const trackName = track.track_name;
          this.dailyLyric.trackName = trackName;

          // getSongLyrics
          const lyricPath = `https://all-the-cors.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${this.musixmatchAccessToken}`;
          axios.get(lyricPath).then((res3) => {
            const lyricText = res3.data.message.body.lyrics.lyrics_body;
            const lyricBrakpointIndex = lyricText.indexOf('\n\n');
            this.dailyLyric.text = lyricText.slice(0, lyricBrakpointIndex + 1);
            this.dailyLyric.writer = '青峰';
          });
        })
        .catch(() => {
          this.changeMusixmatchAccessToken();
          this.getDailyLyric();
        });
    },
    changeMusixmatchAccessToken() {
      // 把不能使用的accessToken放最後，使用index 0的accessToken
      const tempIndex = this.musixmatchAccessTokenArray.indexOf(
        this.musixmatchAccessToken,
      );
      this.musixmatchAccessTokenArray.splice(tempIndex, 1);
      this.musixmatchAccessTokenArray.push(this.musixmatchAccessToken);
      this.musixmatchAccessTokenArray = [...this.musixmatchAccessTokenArray];
      const tempaAccessToken = this.musixmatchAccessTokenArray[0]; // prefer destruct array!!!
      this.musixmatchAccessToken = tempaAccessToken;
    },
    changeYoutubeApiKey() {
      // 呼叫 changeYoutubeApiKey
      // 把不能使用的accessToken放最後，使用index 0的accessToken
      const tempIndex = this.youtubeApiKeyArray.indexOf(this.youtubeApiKey);
      this.youtubeApiKeyArray.splice(tempIndex, 1);
      this.youtubeApiKeyArray.push(this.youtubeApiKey);
      this.youtubeApiKeyArray = [...this.musixmatchAccessTokenArray];
      const tempaApiKey = this.youtubeApiKeyArray[0]; // prefer destruct array!!!
      this.youtubeApiKey = tempaApiKey;
    },
    getLatestVideo() {
      // API KEY2 : AIzaSyAPfa88f3-wUXl9BeEu4qRanejhlaIvwnc
      const url = 'https://all-the-cors.herokuapp.com/https://www.googleapis.com/youtube/v3/search';
      const API_KEY = this.youtubeApiKey; // you must replace API_KEY
      // curl \
      //   'https://youtube.googleapis.com/youtube/v3/search?channelId=UCEf_Bc-KVd7onSeifS3py9g&maxResults=25&order=date&key=[YOUR_API_KEY]' \
      //   --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
      //   --header 'Accept: application/json' \
      //   --compressed
      // smtown UCEf_Bc-KVd7onSeifS3py9g
      axios
        .get(url, {
          params: {
            channelId: 'UCweOkPb1wVVH0Q0Tlj4a5Pw',
            order: 'date',
            maxResults: 30, // 預設為五筆資料，可以設定1~50
            key: API_KEY, // 使用 API 只能取得公開的播放清單
          },
        })
        .then((res) => {
          this.videoList = res.data.items.slice(9, 20);
          // this.videoList.map((ele) => this.getThumbnail(ele));
          this.videoList.map((ele) => this.getIframeSrc(ele));
          setTimeout(() => {
            this.isLoading = false;
          }, 2200);
        })
        .catch(() => {
          this.changeYoutubeApiKey();
          this.getLatestVideo();
        });
    },
    //     youtube 照片
    //     https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
    // https://img.youtube.com/vi/<insert-youtube-video-id-here>/1.jpg
    // https://img.youtube.com/vi/<insert-youtube-video-id-here>/2.jpg
    // https://img.youtube.com/vi/<insert-youtube-video-id-here>/3.jpg
    getThumbnail(objOrigin) {
      const obj = objOrigin;
      const url = `https://img.youtube.com/vi/${obj.id.videoId}`;
      // const url2 = `http://www.youtube.com/embed/${origin.id.videoId}?enablejsapi=1&origin=http://example.com`;
      obj.thumbnail = [];
      // obj.iframeSrc = [];
      for (let i = 0; i < 4; i += 1) {
        obj.thumbnail.push(`${url}/${i}.jpg`);
        // obj.iframeSrc.push(url2);
      }
      return obj;
    },
    getIframeSrc(objOrigin) {
      const obj = objOrigin;
      const url = `http://www.youtube.com/embed/${obj.id.videoId}?enablejsapi=1&origin=http://example.com`;
      obj.iframeSrc = '';
      obj.iframeSrc = url;
      return obj;
    },
    playSong(item) {
      this.currentSong = { ...item };
      const songHref = `https://widget.kkbox.com/v1/?id=${this.currentSong.id}&type=song&terr=TW&lang=TW&autoplay=true`;
      this.currentSongHref = songHref;
    },
  },
};
</script>
<style lang="scss" scoped>
// 參考
// 新聞: https://www.pixelmattic.com/blog/best-news-website-designs/
//carousel參考https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_carousel2&stacked=h

// carousel start
.nav-carousel-inner > .carousel-item img,
.nav-carousel-inner > .carousel-item a img {
  width: 75%;
  // max-height: 550px;
  margin: auto;
}
.navCarousel-prev-icon {
  margin-bottom: 50%;
  margin-left: 20px;
}
.navCarousel-next-icon {
  margin-bottom: 50%;
  margin-right: 20px;
}
.carousel-control-next,
.carousel-control-prev {
  width: 12%;
}
// carousel end

/*Modal-Content 部分*/
.modal-content {
  margin-top: 80px;
}
/*Modal-Content */

.backOfImg {
  // 毛玻璃效果
  filter: blur(10px);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-position: center;
}
.freshSuggest {
  width: 75%;
  max-height: 550px;
  margin: auto;
}
.chartList {
  width: 75%;
  // max-height: 550px;
  height: auto;
  margin: auto;
  margin-top: 4%;
}

.chartList img {
  width: 100%;
  height: auto;
  padding: 0 0;
  margin: 0 0;
}

.content {
  margin-top: 4%;
}
.row .chartImg {
  background-position: center center;
  background-repeat: no-repeat;
  // background-size: cover;
  background-size: 100% auto;
  overflow: hidden;
}
.chartImg a {
  color: white;
}
.overlapPanel {
  z-index: 100;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  right: 0;
  height: auto;
  // overflow: hidden;
  width: 100%;
  background-color: #505e61;
  opacity: 0.8;
  justify-content: center;
}
.overlapPanel p {
  margin-left: 5%;
  margin-top: 55%;
}
.overlapPanel hr {
  margin-top: 0;
  line-height: 1rem;
  width: 65%;
}
.chartImg:hover .overlapPanel {
  transform: translateX(100%);
  animation-duration: 5s;
  transition: all 560ms ease;
}
.playList-MemorySong {
  width: 75%;
  margin: auto;
}
.news {
  width: 75%;
  margin: auto;
}
.randomLyric {
  width: 75%;
  margin: auto;
}
.freshSuggest {
  overflow: hidden;
}
.freshSuggestImgs {
  max-width: 100%;
  margin-left: 0px;
  max-height: 100%;
  // overflow: hidden;
  padding-left: 0px;
  // display: flex;
}
// .row .freshSuggestImg {
//   position:relative;
//   overflow: hidden;
//   border-radius: 20px;
//   // margin-left: 0.01%;
// }
// .freshSuggestImgs .col-sm-3 {
//   width: 23%;
//   margin-left: 1.6%;
// }
.freshSuggestCarousel {
  overflow: hidden;
}
.freshSuggestImgs .freshSuggestImg {
  width: 21%;
  margin-left: 3.2%;
  overflow: hidden;
  border-radius: 20px;
  padding: 0;
}
.freshSuggestImg img {
  width: 100%;
  height: auto;
  padding: 0 0;
  margin: 0 0;
}
.freshSuggest .container {
  max-width: 100%;
  padding-left: 0;
  padding-right: 0;
}
// Latest- VideoList
// Latest- VideoList
// Latest- VideoList// Latest- VideoList// Latest- VideoList
.perVideo {
  flex: 0 0 320px;
  padding: 0;
}
.perVideo img {
  width: 100%;
  height: auto;
  padding: 0 0;
  margin: 0 0;
}
/* // scroll animation keyframes */
@keyframes scroll {
  100% {
    transform: translate(-1760px);
  }
  0% {
    transform: translate(0px);
  }
}
.grid-animation {
  animation: scroll 26s linear infinite;
}
.grid-animation:hover {
  animation-play-state: paused;
}
.elements:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2) !important;
  transform: scale(0.97);
}
.footer {
  background-color: #000000;
}

//latest song carousel
.content .carousel-indicators {
  position: relative;
  margin-top: 20px;
}
// latest song effect
.overlapPanelLatestSong {
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
.picture:hover .overlapPanelLatestSong {
  display: block;
}
// 每日歌詞
blockquote {
font-family: Georgia, serif;
font-size: 18px;
font-style: italic;
width: 500px;
margin: 0.25em 0;
padding: 0.35em 40px;
line-height: 1.45;
position: relative;
color: #383838;
}

blockquote:before {
display: block;
padding-left: 10px;
content: "\201C";
font-size: 80px;
position: absolute;
left: -20px;
top: -20px;
color: #7a7a7a;
}

blockquote cite {
color: #999999;
font-size: 14px;
display: block;
margin-top: 5px;
}

blockquote cite:before {
content: "\2014 \2009";
}
</style>
