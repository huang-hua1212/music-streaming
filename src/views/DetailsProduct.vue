<template>
  <navbar-black ref="callNavModal"></navbar-black>
  <div class="container text-white" style="width: 75%; margin-top: 2.5%">
    <div class="row">
      <div class="col-auto" style="margin-left: 10vh; padding-top: 6vh">
        <div style="width: 65vh; height: auto">
          <img :src="data.imageUrl" style="max-width: 100%; height: auto" />
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
      height: 100vh;
      padding-top: 20vh;
      margin-bottom: 20vh;
      background: url('https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    "
  >
    <!-- <div style = 'border: white solid;
margin-left: 18%;
width: 100%;
height: 75vh;
background-color: white'></div> -->
    <div class="tabs">
      <input type="radio" name="tabs" id="tabone" checked="checked" />
      <label for="tabone">曲目</label>
      <div class="tab">
        <h1>First Tab Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <input type="radio" name="tabs" id="tabtwo" />
      <label for="tabtwo">購物說明</label>
      <div class="tab">
        <h1>Second Tab Content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
<!--
      <input type="radio" name="tabs" id="tabthree" />
      <label for="tabthree">Third Tab</label>
      <div class="tab">
        <h1>Third tab content</h1>
        <p>hfioezhogehzioghz</p>
      </div> -->
    </div>
  </div>
  <!-- Progress bar -->
  <div style="position: relative">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
  </div>

  <!-- ADD CART SUCCESS ANIMATION -->
  <svg
    class="checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    style="position: absolute; z-index: 100; top: 30vh; left: 100vh"
    v-show="isSuccess"
  >
    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
    <path
      class="checkmark__check"
      fill="none"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </svg>
</template>
<script>
import NavbarBlack from '@/components/NavbarBlack.vue';
import axios from 'axios';
import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      isLoading: false,
      isSuccess: false,
      data: {},
      tracks: [],
    };
  },
  components: { NavbarBlack, Loading },
  created() {
    this.showLoading();
    this.contentIn();
  },
  methods: {
    // 參考: https://bbbootstrap.com/snippets/animated-checkmark-50934051
    showSuccessAnimation() {
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 1500);
    },
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 970);
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
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    addProduct() {
      const cart = {
        product_id: this.data.id,
        qty: 1,
      };
      axios
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          {
            data: cart,
          },
        )
        .then(() => {
          // this.showLoading();
          this.computProductLength();
          this.showSuccessAnimation();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    computProductLength() {
      axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(() => {
          this.$refs.callNavModal.addProduct();
        });
    },
    searchTracksOfAlbum(albumName) {
      axios
        .get(
          `https://all-the-cors.herokuapp.com/https://api.kkbox.com/v1.1/search?q=${albumName}&type=album&territory=TW`,
          {
            headers: {
              Authorization: 'Bearer CSUEk2k0ISNRgn_NasExMw==',
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
                  Authorization: 'Bearer CSUEk2k0ISNRgn_NasExMw==',
                  Accept: 'application/json',
                  'content-type': 'application/json',
                },
                crossdomain: true,
              },
            )
            .then((res1) => {
              this.tracks = res1.data.data;
            })
            .catch((error) => {
              console.dir(error); // 失敗的話回傳連線異常
            });
        })
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
  },
};
</script>
<style lang = 'scss' scoped>
a {
  text-decoration: none;
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
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
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
  margin-left: 18%;
  width: 82.7%;
  height: 72.3vh;
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

.tabs input[type="radio"] {
  display: none;
}

.tabs input[type="radio"]:checked + label {
  background: #fff;
}

.tabs input[type="radio"]:checked + label + .tab {
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
</style>
