<template>
  <navbar-black ref="callNavModal"></navbar-black>
  <div class="container text-white" style="width: 75%;
  margin-top: 2.5%;">
    <div class="row">
      <div class="col-auto" style="padding: 5vh">
        <div style="width: 70vh; height: auto">
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
        <div style="margin-top: 5vh; margin-left: 3vh; letter-spacing: 1vh;
        ">
          <!-- <p style="margin-bottom: 0.1vh; font-style: italic">音樂類型</p> -->
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
</template>
<script>
import NavbarBlack from '@/components/NavbarBlack.vue';
import axios from 'axios';
import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      isLoading: false,
      data: {},
    };
  },
  components: { NavbarBlack, Loading },
  created() {
    this.contentIn();
  },
  methods: {
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
          this.showLoading();
          this.computProductLength();
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
</style>
