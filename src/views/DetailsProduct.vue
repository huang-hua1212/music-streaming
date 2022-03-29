<template>
  <navbar-black ref="callNavModal"></navbar-black>
  <div class="container text-white" style="width: 75%;
  margin-top: 2.5%;">
    <div class="row">
      <div class="col-auto" style="margin-left: 10vh;padding-top: 6vh">
        <div style="width: 60vh; height: auto">
          <img :src="data.imageUrl" style="max-width: 100%; height: auto" />
        </div>
      </div>
      <div class="col-auto" style = 'max-width: 75vh;'>
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
        <div style="margin-top: 5vh; margin-left: 3vh;
        ">
          <p>{{ data.description }}</p>
        </div>
        <div style="margin-top: 5vh; margin-left: 3vh; letter-spacing: 1vh;">
          <a style="text-align: cetner;
          letter-spacing: 1vh;
          padding-left: 3vh;
          padding-right: 3vh;
          padding-top: 1.5vh;
          padding-bottom: 1.5vh;
          background-color: yellow;
          border-radius: 1vh;
          color: black;
          font-weight: bold;"
          href = '#'
          @click.prevent="addProduct()">加入購物車</a>
          </div>
      </div>
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
 <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"
 style = 'position: absolute; z-index: 100; top:30vh; left: 100vh;'
 v-show = 'isSuccess'>
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
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
    };
  },
  components: { NavbarBlack, Loading },
  created() {
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
  },
};
</script>
<style lang = 'scss' scoped>
a{
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
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
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
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0
    }
}

@keyframes scale {

    0%,
    100% {
        transform: none
    }

    50% {
        transform: scale3d(1.1, 1.1, 1)
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #7ac142
    }
}
</style>
