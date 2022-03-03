<template>
  <nav class="navbar navbar-expand-sm">
    <div
      class="collapse navbar-collapse navbar-sty"
      id="navbarText"
      style="border: red solid"
    >
      <ul class="navbar-nav mr-auto col-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
      <ul
        class="nav-right navbar-nav mr-auto col-auto"
        style="border: red solid"
      >
        <li class="nav-item fs-5">
          <div style="max-width: auto">
            <a
              class="nav-link"
              id="navbarDropdownCart"
              role="button"
              @click="openCartModal"
            >
              <font-awesome-icon icon="cart-shopping" size="1x" />
              <div v-if="productsInCartLength">
                <span class="badge rounded-pill badge-notification bg-danger">
                  {{ productsInCartLength }}
                </span>
              </div>
            </a>
          </div>
        </li>
        <li class="nav-item"></li>
      </ul>
    </div>
  </nav>

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
  >
    <!-- <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div> -->
    <div class="carousel-inner nav-carousel-inner">
      <div
        class="carousel-item"
        v-for="(item, idx) in imagePath"
        :key="idx"
        :class="{ active: idx === 0 }"
      >
        <div
          class="backOfImg"
          :style="{ backgroundImage: `url(${item})` }"
          style="border: black solid"
        ></div>
        <img :src="item" class="d-block" alt="" />
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
  <div class="content text-white" style="margin-bottom: 150px">
    <div
      class="freshSuggest ms-auto"
      style="border: white solid; padding-bottom: 2.5%"
    >
      <!-- <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselLatestSongs"
        data-bs-slide="prev"
      >
        <span
          class="carousel-control-prev-icon latestSong-Carousel-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Previous</span>
      </button>---->
      <!-- <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselLatestSongs"
        data-bs-slide="next"
      >
        <span
          class="carousel-control-next-icon latestSong-Carousel-next-icon"
          aria-hidden="true"
        ></span>
        <span class="visually-hidden">Next</span>
      </button> -->

      <h2 style="letter-spacing: 2px">新歌推薦</h2>
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
                class="freshSuggestImg col-sm-3"
                v-for="it in item"
                :key="it"
                style="border: yellow solid"
              >
                <img :src="it.album.images[1].url" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chartList ms-auto container">
      <div class="row">
        <div
          class="chartImg col-3"
          style="padding: 0px; position: relative"
          v-for="item in allChart"
          :key="item"
        >
          <!-- {{ item.title }} -->
          <router-link :to="`/ChartPlaylist/${item.id}`">
            <div class="overlapPanel">
              <h3>{{ item.title }}</h3>
              <hr />
            </div>
          </router-link>
          <img :src="item.images[1].url" />
        </div>
      </div>
    </div>

    <div
      class="playList-MemorySong ms-auto container"
      style="border: white solid; height: 320px; margin-top: 4%; padding: 0"
    >
      <h2 style="margin-left: 5px; letter-spacing: 1px">音樂回憶</h2>
    </div>
    <div
      class="news"
      style="border: white solid; height: 320px; margin-top: 4%"
    >
      <!-- 參考標語 -->
      <h3>Don't miss</h3>
      <h3>Must Read</h3>
      <h3>Good To Read</h3>
      <h3>Featured</h3>
      <div><buttom type="button">Load More</buttom></div>
      <h4>新聞區</h4>
      <h5>新聞區</h5>
    </div>

    <div
      class="randomLyric"
      style="border: white solid; height: auto; margin-top: 4%"
    >
      <!-- 參考標語 -->
      <h2 style="margin-left: 5px; letter-spacing: 1px" hidden>每日歌詞</h2>
      <div
        style="margin-top: 6%; max-width: 80%; margin-left: 10%; width: auto"
      >
        <h3
          style="
            letter-spacing: 4px;
            white-space: pre-wrap;
            line-height: 60px;
            text-align: center;
          "
          v-html="dailyLyric.text"
        ></h3>
        <h5
          style="
            font-style: italic;
            margin-top: 4%;
            margin-left: 15%;
            text-align: right;
            width: 70%;
          "
        >
          by {{ dailyLyric.writer }}
        </h5>
      </div>
    </div>
  </div>

  <footer
  class="footer text-white"
    style="
      border: white solid;
      margin-bottom: 0;
      width: 100%;
      height: 250px;
      text-align: center;
    "
  >
    <h1>Footer</h1>
  </footer>
</template>

<script>
// 參考
// 新聞: https://www.pixelmattic.com/blog/best-news-website-designs/
// carousel參考https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_carousel2&stacked=h
import axios from 'axios';
import qs from 'query-string';
import 'vue-loading-overlay/dist/vue-loading.css';

const testLyricText = '我曾將青春翻湧成她\n也曾指尖彈出盛夏\n心之所動 且就隨緣去吧\n\n'
  + '這一路上走走停停\n順著少年漂流的痕跡\n邁出車站的前一刻\n竟有些猶豫\n\n不禁笑這近鄉情怯'
  + '\n仍無可避免 而長野的天 依舊那麼暖\n風吹起了從前\n\n從前初識這世間 萬般流連'
  + '\n看著天邊似在眼前 也甘願赴湯蹈火去走它一遍\n如今走過這世間 萬般流連\n'
  + '\n翻過歲月不同側臉 措不及防闖入你的笑顏\n\n我曾難自拔於世界之大'
  + '\n也沉溺於其中夢話';
export default {
  data() {
    return {
      musixmatchAccessToken: '1429bba043518ec0e509edd12f151731',
      musixmatchAccessTokenArray: [
        '1429bba043518ec0e509edd12f151731',
        '5b50630c7d65f4a374b27ad929e1a073',
      ],
      isLoading: false,
      isShowProgressBar: false,
      isLogin: false,
      url: process.env.VUE_APP_API, // 'https://vue3-course-api.hexschool.io/v2',
      path: 'cakeshop',
      productsToSell: [],
      temp: {},
      productsInCartLength: 0,
      account: {
        username: '',
        password: '',
      },
      // test: process.env.VUE_APP_API,
      // productsInCart: [],
      // cartId: '',

      slide: 0,
      sliding: null,
      imagePath: [
        'https://images.unsplash.com/photo-1645812579074-2e82763422df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
        'https://images.unsplash.com/photo-1645742175891-9207e6a52e6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1555918001-e20d10c2bc1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],

      latestSongsList: [],
      dailyLyric: {
        writer: '',
        text: '',
      },
      allChart: [],
    };
  },
  watch: {},
  created() {
    this.getChart();
    // this.getDailyLyric(); // 會耗損API
    this.testGetDailyLyric();
    this.getLatestSongs();
  },
  methods: {
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 970);
    },
    /// ///////
    // openLoginModal() {
    //   this.$refs.callLoginModal.openModal();
    // },
    // openCartModal() {
    //   this.$refs.callCartModal.openModal();
    // },
    // addProduct(temp = this.temp) {
    //   this.showLoading();
    //   const tempInFunction = temp;
    //   tempInFunction.num = 1;
    //   const cart = {
    //     product_id: temp.id,
    //     qty: temp.num,
    //   };
    //   axios
    //     .post(
    //       `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
    //       { data: cart }
    //     )
    //     .then(() => {
    //       this.$refs.callCartModal.loadProductsInCart();
    //       this.computProductLength();
    //     });
    // },
    // computProductLength() {
    //   axios
    //     .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
    //     .then((res) => {
    //       this.productsInCartLength = res.data.data.carts.length;
    //     });
    // },
    // login() {
    //   axios
    //     .post(`${process.env.VUE_APP_API}/admin/signin`, this.account)
    //     .then((res) => {
    //       const { token, expired } = res.data;
    //       document.cookie = `hexToken=${token}; expired=${new Date(
    //         expired
    //       )};path=/`;
    //       window.location.href = "VueSpringClass_hw2.html";
    //     });
    // },
    // https://cors-anywhere.herokuapp.com/

    getKKboxAccessToken() {
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
            // withCredentials: true,
            // data: {
            //   grant_type: 'client_credentials',
            //   client_id: '94bc95aa9cdcd73c8d5e10ce0146e40a',
            //   client_secret: '27995ba42851ede2928d759cb2d56d17',
            // },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded',
            },
            crossdomain: true,
          },
        )
        .then((res) => console.log(res)) // 成功拿到資料後讓回傳的資料匯入Vue的data中
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
    refreshToken() {
      axios
        .post(
          'https://all-the-cors.herokuapp.com/https://account.kkbox.com/oauth2/token?grant_type=authorization_code&code=tES0iTvx8nu--_fFoJFWHA==&client_id=94bc95aa9cdcd73c8d5e10ce0146e40a&client_secret=27995ba42851ede2928d759cb2d56d17',
          {
            withCredentials: true,
            // data: {
            //   grant_type: 'client_credentials',
            //   client_id: '94bc95aa9cdcd73c8d5e10ce0146e40a',
            //   client_secret: '27995ba42851ede2928d759cb2d56d17',
            // },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded',
              Authorization:
                'Basic {BASE64_ENCODE(94bc95aa9cdcd73c8d5e10ce0146e40a:27995ba42851ede2928d759cb2d56d17)}',
            },
            crossdomain: true,
          },
        )
        .then((res) => console.log(res)) // 成功拿到資料後讓回傳的資料匯入Vue的data中
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
    getLatestSongs() {
      axios
        .get(
          'https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/new-hits-playlists/DZrC8m29ciOFY2JAm3?territory=TW',
          {
            headers: {
              Authorization: 'Bearer tES0iTvx8nu--_fFoJFWHA==',
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
        })
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
      // axios
      //   .get(
      //     'https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/search',
      //     {
      //       params: {
      //         q: 'Mayday',
      //         type: 'track',
      //         territory: 'TW',
      //         offset: 0,
      //         limit: 50,
      //       },
      //       headers: {

      //         Authorization: 'Bearer tES0iTvx8nu--_fFoJFWHA==',
      //         Accept: 'application/json',
      //         'content-type': 'application/json',
      //       },
      //       crossdomain: true,
      //     },
      //   )
      //   .then((res) => console.log(res)) // 成功拿到資料後讓回傳的資料匯入Vue的data中
      //   .catch((error) => {
      //     console.dir(error); // 失敗的話回傳連線異常
      //   });
    },
    getChart() {
      axios
        .get(
          'https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/charts?territory=TW&limit=10',
          {
            headers: {
              Authorization: 'Bearer tES0iTvx8nu--_fFoJFWHA==',
              Accept: 'application/json',
              'content-type': 'application/json',
            },
            crossdomain: true,
          },
        )
        .then((res) => {
          this.allChart = res.data.data.slice(1, 9);
        }) // 成功拿到資料後讓回傳的資料匯入Vue的data中
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
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
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
          // accessToken過期
          this.changeMusixmatchAccessToken();
          this.getDailyLyric();
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
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
          // accessToken過期
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
  },
};
// SUCCESS SUCCESS SUCCESS SUCCESS
// axios
//         .get(
//           'https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/new-hits-playlists/DZrC8m29ciOFY2JAm3?territory=TW',
//           {

//             headers: {
//               Authorization: 'Bearer tES0iTvx8nu--_fFoJFWHA==',
//               Accept: 'application/json',
//               'content-type': 'application/json',
//             },
//             crossdomain: true,
//           },
//         )
//         .then((res) => console.log(res)) // 成功拿到資料後讓回傳的資料匯入Vue的data中
//         .catch((error) => {
//           console.dir(error); // 失敗的話回傳連線異常
//         });
</script>
<style lang="scss" scoped>
// 參考
// 新聞: https://www.pixelmattic.com/blog/best-news-website-designs/
//carousel參考https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_carousel2&stacked=h
nav {
  background-color: #191919;
}
.navbar-sty {
  max-width: 75%;
  margin-left: 12.5%;
}
.backOfImg {
  // 毛玻璃效果
  filter: blur(10px);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-position: center;
}
.nav-carousel-inner > .carousel-item img,
.nav-carousel-inner > .carousel-item a img {
  width: 75%;
  max-height: 550px;
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
nav .navbar-nav li a {
  color: white;
}
.nav-right {
  max-height: 50px;
  margin-left: auto;
}
.nav-link span {
  position: relative;
  top: -45px;
  right: -50%;
  font-size: 35%;
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
.overlapPanel h3 {
  margin-left: 5%;
  margin-top: 68%;
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
</style>
