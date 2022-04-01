<template>
  <navbar-black ref="callNavModal"></navbar-black>
  <div class="container text-white" style="width: 75%; margin-top: 2.5%">
    <div class="row">
      <div class="col-auto" style="margin-left: 10vh; padding-top: 6vh">
        <div style="width: 65vh; height: auto">
          <img :src="data.imageUrl" style="max-width: 100%; height: auto"
          alt="圖片未加載完成"/>
        </div>
      </div>
      <div class="col-auto" style="max-width: 75vh">
        <h1 style="margin-top: 7vh; margin-left: 3vh; letter-spacing: 1vh">
          {{ data.title }}
        </h1>
        <div style="margin-top: 6vh; margin-left: 3vh; letter-spacing: 1vh">
          <p style="margin-bottom: 0.1vh; font-style: italic">發行年份</p>
          <p style="font-size: 3vh">{{ data.releaseYear }}</p>
        </div>
        <div style="margin-top: 5vh; margin-left: 3vh; letter-spacing: 1vh">
          <p style="margin-bottom: 0.1vh; font-style: italic">音樂類型</p>
          <p style="font-size: 3vh">{{ data.musicStyle }}</p>
        </div>
        <div style="margin-top: 5vh; margin-left: 3vh">
          <p>{{ data.description }}</p>
        </div>
        <div style="margin-top: 5vh; margin-left: 3vh; letter-spacing: 1vh">
          <a
            style="
              text-align: cetner;
              letter-spacing: 1vh;
              padding-left: 3vh;
              padding-right: 3vh;
              padding-top: 1.5vh;
              padding-bottom: 1.5vh;
              background-color: yellow;
              border-radius: 1vh;
              color: black;
              font-weight: bold;
            "
            href="#"
            @click.prevent="addProduct()"
            >加入購物車</a
          >
        </div>
      </div>
    </div>
  </div>
  <!-- TAB REPLACEMENT -->
  <div
    class="container"
    style="
      max-width: 100%;
      margin-top: 10%;
      height: 106vh;
      padding-top: 20vh;
      margin-bottom: 20vh;
      background: url('https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    "
  >
    <div class="tabs">
      <input type="radio" name="tabs" id="tabone" checked="checked" />
      <label for="tabone">曲目</label>
      <div class="tab">
        <div style="float: left; margin-left: 1vh; width: 53%">
          <div><h5>Disc1</h5></div>
          <ul class="songList" style="margin-top: 3vh; width: 100%; height: 67vh; overflow-y: auto">
            <li
              v-for="(track, idx) in tracks"
              :key="track"
              style="height: 6.5vh; padding-top: 1.8vh"
            >
              <div style="display: flex">
                <p v-if="idx + 1 < 10">{{ '0' + (idx + 1) }}</p>
                <p v-else>{{ idx + 1 }}</p>
                <p style="margin-left: 2vh">{{ track.name }}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- right part -->
        <div class="" style="float: left; margin-left: auto; height: 100%; width: 46%">
          <div style="float: left; margin-left: 18%; margin-top: 15%; width: 16vh; padding: 0">
            <a role="button" href="https://www.spotify.com/tw/">
              <img
                style="width: 100%; height: auto"
                src="https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
                alt="圖片未加載完成"
              />
            </a>
          </div>
          <div style="float: left; margin-left: 6vh; margin-top: 15%; width: 16vh; padding: 0">
            <a role="button" href="https://www.youtube.com/">
              <img
                style="width: 100%; height: auto"
                src="https://seeklogo.com/images/Y/youtube-square-logo-3F9D037665-seeklogo.com.png"
                alt="圖片未加載完成"
              />
            </a>
          </div>
          <div style="float: left; margin-left: 18%; margin-top: 5vh; width: 16vh; padding: 0">
            <a role="button" href="https://soundcloud.com/">
              <img
                style="width: 100%; height: auto"
                src="https://icons.iconarchive.com/icons/danleech/simple/256/soundcloud-icon.png"
                alt="圖片未加載完成"
              />
            </a>
          </div>
          <div style="float: left; margin-left: 6vh; margin-top: 5vh; width: 16vh; padding: 0">
            <a role="button" href="https://www.kkbox.com/tw/tc/">
              <img
                style="width: 100%; height: auto"
                src="https://scontent.ftpe8-2.fna.fbcdn.net/v/t1.6435-9/121186795_1586856208163841_1963396418935118163_n.png?stp=dst-png_p403x403&_nc_cat=100&ccb=1-5&_nc_sid=7aed08&_nc_ohc=uEPn0_G9d5oAX8t7wNS&_nc_ht=scontent.ftpe8-2.fna&oh=00_AT9ix4ThG3EWMk_tV-2prY6URor6v4iVYgPgc1IBoxk03g&oe=6268631D"
                alt="圖片未加載完成"
              />
            </a>
          </div>
          <div style="float: left; margin-left: 18%; margin-top: 5vh; width: 16vh; padding: 0">
            <a role="button" href="https://www.apple.com/tw/apple-music/">
              <img
                style="width: 100%; height: auto"
                src="https://cdn2.thelineofbestfit.com/images/made/images/remote/https_cdn2.thelineofbestfit.com/media/2014/apple_music_960_960_90.jpg"
                alt="圖片未加載完成"
              />
            </a>
          </div>
        </div>
        <!-- <h1>First Tab Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p> -->
      </div>

      <input type="radio" name="tabs" id="tabtwo" />
      <label for="tabtwo">購物說明</label>
      <div class="tab">
        <div style="width: 98%; margin-top: 2vh">
          <p style="word-wrap: break-word">
            退換貨說明
            <br /><br />
            1.收到商品後如發現有瑕疵或破損或是配件短缺的狀況，需要辦理換貨，請於到貨後7天內登錄「我的帳戶」頁面申請「換貨」，我們將盡速為您處理。
            <br /><br />
            2.收到商品後可享有7天免費鑑賞期(含例假日)，鑑賞期係供您參考、觀賞、品鑑比較。退換貨（依照退貨程序辦理退貨）時敬請保持原包裝商品的完整，我們完全保障您的購物權益。
            <br /><br />
            3.退換貨注意事項：退貨的商品必須必須回復原狀，亦即必須回復至您收到商品時的原始狀態 (
            包含主附件、內外包裝、隨機文件、贈品、活動贈品等 )
          </p>
          <p>限量商品購買提醒：因數量有限，若庫存不足時，將無法提供換貨，敬請包涵見諒。</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Progress bar -->
  <div style="position: relative">
    <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
  </div>

  <!-- ADD CART SUCCESS ANIMATION -->
  <svg
    class="checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    style="position: absolute; z-index: 100;left: 100vh"
    :style = "{top: window.y + 'vh'}"
    v-show="isSuccess"
  >
    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
  </svg>

<!-- footer -->
  <footer
    class="footer text-white"
    style="
      margin-top: 0%;
      margin-bottom: 0;
      width: 100%;
      height: 120px;
      text-align: center;
      padding: 2%;
      background-color: #000000;
    "
  >
    <img
      style="width: 100px; height: 40px"
      src="https://storage.googleapis.com/vue-course-api.appspot.com/record-shop/1647107643454.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kqRZZ03yHPmRgXpQb6LdfwfDPUU8qcfStNPiCsglNAomY%2BncZLFA9zAp8nGEJFyF8ada8XAWBxcVxV9NmqC3vx8LsQISVkalgAoM3Syzx4u%2BasVYFB7LjqHJ20EevMHd5WWFr2rq4tr4gVl84MpRRC9kCf%2BDpTKGNwoEwmANlVTs1ZARLB1gPz3Skua%2BCpYPVWVj2Em8TAzNMq4%2B7NjpRD%2Fx9Z3PWOxQ20d0GAlg%2BTt7d18BIahDFjzEGru0LHydr5EI%2F%2BFEF8ZzzFx0T2KFKMSp7XtphZEUlPep73T%2BXO9K86HEWIbxE5hy7Q7OOzYpRanRXNcNx%2Bl4FBJDfY4%2B0w%3D%3D"
      alt="圖片未加載完成"
    />
    <div>
      <h5>Copyright © 2022 hua</h5>
    </div>
  </footer>
</template>
<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import NavbarBlack from '@/components/NavbarBlack.vue';
import qs from 'query-string';

export default {
  data() {
    return {
      isLoading: false,
      isSuccess: false,
      access_token: '',
      window: {
        y: 0,
      },
      data: {},
      tracks: [],
    };
  },
  components: { NavbarBlack, Loading },
  created() {
    this.showLoading();
    this.getKKboxAccessToken(this.searchTracksOfAlbum);
    this.contentIn();
  },
  methods: {
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
          if (func1 !== undefined) {
            func1();
          }
          if (func2 !== undefined) {
            func2();
          }
        });
    },
    // 參考: https://bbbootstrap.com/snippets/animated-checkmark-50934051
    showSuccessAnimation() {
      this.window.y = 100 * (window.scrollY / window.innerHeight) + 30;
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 1200);
    },
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1660);
    },
    contentIn() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      axios
        .get(url)
        .then((res) => {
          this.data = res.data.product;
          const albumName = this.data.title;
          this.searchTracksOfAlbum(albumName);
        });
    },
    addProduct() {
      const cart = {
        product_id: this.data.id,
        qty: 1,
      };
      axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
          data: cart,
        })
        .then(() => {
          // this.showLoading();
          this.computProductLength();
          this.showSuccessAnimation();
        });
    },
    computProductLength() {
      axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`).then(() => {
        this.$refs.callNavModal.addProduct();
      });
    },
    searchTracksOfAlbum(albumName) {
      axios
        .get(
          `https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/search?q=${albumName}&type=album&territory=TW`,
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
          const albumId = res.data.albums.data[0].id;
          axios
            .get(
              `https://api.kkbox.com/v1.1/albums/${albumId}/tracks?territory=TW&offset=0&limit=500`,
              {
                headers: {
                  Authorization: `Bearer ${this.access_token}`,
                  Accept: 'application/json',
                  'content-type': 'application/json',
                },
                crossdomain: true,
              },
            )
            .then((res1) => {
              this.tracks = res1.data.data;
            });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
  border-bottom: solid 1px #ebebeb;
}

/* ADD CART SUCCESS ANIMATION */
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
/* tab change */
/* 參考:https://codepen.io/celcarpe/pen/VwZrJpj */
.tabs {
  display: flex;
  flex-wrap: wrap;
  /* height: 300px; */
  /* width: 500px; */
  margin-left: 22%;
  width: 78.78%; /*78.78%;*/
  height: 78.4vh;
}

.tabs label {
  order: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  margin-right: 0.2rem;
  cursor: pointer;
  background-color: pink;
  font-weight: bold;
  transition: background ease 0.3s;
}

.tabs .tab {
  order: 9;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: none;
  padding: 1rem;
  background: #fff;
  padding: 20px;
  /* box-shadow: -10px 10px 0px 0px black; */
}

.tabs input[type='radio'] {
  display: none;
}

.tabs input[type='radio']:checked + label {
  background: #fff;
}

.tabs input[type='radio']:checked + label + .tab {
  display: block;
}

@media (max-width: 465px) {
  .tabs .tab,
  .tabs label {
    order: initial;
  }

  .tabs label {
    width: 100%;
    margin-left: 50px;
  }
}
/* 參考: http://jsfiddle.net/frosdqy/mvrt98ga/ */
/* scrollbar style */
ul::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5; */
  background: none;
}

ul::-webkit-scrollbar {
  width: 2vh;
  background-color: #f5f5f5;
}

ul::-webkit-scrollbar-thumb {
  /* border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555; */
  border-radius: 12px;
  border: 4px solid rgba(255, 255, 255, 0);
  background-clip: content-box;
  background-color: #aaa;
}
</style>
