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
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>

  <div
    id="carouselExampleIndicators"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-indicators">
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
    </div>
    <div class="carousel-inner">
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
      <!-- <div class="carousel-item">
        <img
          src="https://images.unsplash.com/photo-1645812579074-2e82763422df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
          class="d-block"
          alt=""
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://images.unsplash.com/photo-1645812579074-2e82763422df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
          class="d-block"
          alt=""
        />
      </div> -->
    </div>
  </div>
  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>

  <div class="content text-white">
    <div
      class="freshSuggest ms-auto"
      style="border: white solid; height: 320px"
    >
      <h2 style="letter-spacing: 2px">新歌推薦</h2>
    </div>
    <div class="chartSuggest"></div>
  </div>
</template>

<script>
import axios from 'axios';
// import loginModal from '@/components/LoginModal.vue';
// import ProductlistCartmodal from '@/components/ProductList_CartModal.vue';
// import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
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
    };
  },
  //   components: { ProductlistCartmodal, },
  watch: {},
  created() {
    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = cookieToken;
    this.productsIn();
    this.computProductLength();
    // this.getKKboxAccessToken();
    this.getLatestSongs();
  },
  methods: {
    // () {
    //   tonSlideStarthis.sliding = true;
    // },
    // onSlideEnd() {
    //   this.sliding = false;
    // },
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 970);
    },
    /// ///////
    openLoginModal() {
      this.$refs.callLoginModal.openModal();
    },
    openCartModal() {
      this.$refs.callCartModal.openModal();
    },
    addProduct(temp = this.temp) {
      this.showLoading();
      const tempInFunction = temp;
      tempInFunction.num = 1;
      const cart = {
        product_id: temp.id,
        qty: temp.num,
      };
      axios
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data: cart },
        )
        .then(() => {
          this.$refs.callCartModal.loadProductsInCart();
          this.computProductLength();
        });
    },
    computProductLength() {
      axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.productsInCartLength = res.data.data.carts.length;
        });
    },
    productsIn() {
      this.isShowProgressBar = true;
      axios
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`,
        )
        .then((res) => {
          const resAllKey = Object.keys(res.data.products);
          const resAllValues = Object.values(res.data.products);
          const arrRes = resAllValues;
          for (let i = 0; i < resAllKey.length; i += 1) {
            arrRes.id = resAllKey[i];
          }
          this.productsToSell = arrRes;
          this.isShowProgressBar = false;
        });
    },

    details(item) {
      this.temp = JSON.parse(JSON.stringify(item));
    },
    changeImage(key) {
      this.temp.imagesUrl.push(this.temp.imageUrl);
      this.temp.imageUrl = this.temp.imagesUrl[key];
      this.temp.imagesUrl.splice(key, 1);
    },

    login() {
      axios
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.account)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expired=${new Date(
            expired,
          )};path=/`;
          window.location.href = 'VueSpringClass_hw2.html';
        });
    },
    // https://cors-anywhere.herokuapp.com/
    getKKboxAccessToken() {
      axios
        .post(
          'https://cors-anywhere.herokuapp.com/https://account.kkbox.com/oauth2/token?grant_type=client_credentials&client_id=300fd38c8e0b8ddefafcb1d8dae869e7&client_secret=2663578f35f78ca91fefdbe40108366a',
          {
            useCredentails: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded',
            },
          },
        )
        .then((res) => console.log(res)) // 成功拿到資料後讓回傳的資料匯入Vue的data中
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
    getLatestSongs() {
      // const options = {
      //   method: 'GET',
      //   url: 'https://free-nba.p.rapidapi.com/players',
      //   params: { page: '0', per_page: '25' },
      //   headers: {
      //     'x-rapidapi-host': 'free-nba.p.rapidapi.com',
      //     'x-rapidapi-key':
      //       '2d93bde46amsh1b881fcb981ce09p1e88d5jsn7c9cd3758a93',
      //   },
      // };

      // axios
      //   .request(options)
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      axios
        .get(
          '/search',
          {
            params: {
              q: 'Mayday',
              type: 'track',
              territory: 'TW',
              offset: 0,
              limit: 50,
            },
            headers: {
              Authorization: 'Bearer tES0iTvx8nu--_fFoJFWHA==',
              Accept: 'application/json',
              'content-type': 'application/json',
            },
          },
        )
        .then((res) => console.log(res)) // 成功拿到資料後讓回傳的資料匯入Vue的data中
        .catch((error) => {
          console.dir(error); // 失敗的話回傳連線異常
        });
    },
    getChart() {},
  },
};
</script>
<style lang="scss" scoped>
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
.carousel-inner > .carousel-item img,
.carousel-inner > .carousel-item a img {
  width: 75%;
  max-height: 550px;
  margin: auto;
}
.carousel-control-prev-icon {
  margin-bottom: 150px;
  margin-left: 20px;
}
.carousel-control-next-icon {
  margin-bottom: 150px;
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
// carousel參考https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_carousel2&stacked=h
.freshSuggest {
  width: 75%;
  max-height: 550px;
  margin: auto;
}
.content {
  margin-top: 4%;
}
</style>
