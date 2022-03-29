<template>
  <div style="width: 58%; margin-left: 21%; margin-top: 20vh; height: 40%">
    <p style="font-size: 2.5vh; color: white; margin-left: 5%; margin-bottom: 0; line-height: 20%">
      <!-- Shop Details -->
      購物車明細
    </p>
    <div class="container" style="border-radius: 5px; padding: 5vh; padding-bottom: 4%">
      <table class="table text-white" style="text-align: center">
        <thead style="font-size: 2.8vh">
          <td style="padding-left: 1%"></td>
          <th style="padding-left: 1%">名稱</th>
          <th style="padding-left: 1%">售價</th>
          <th style="padding-left: 1%">數量</th>
          <th style="padding-left: 1%">小計</th>
        </thead>
        <tbody>
          <tr
            v-for="item in productsInCart"
            :key="item.product.id"
            style="height: 1.6vh; font-size: 2.8vh"
          >
            <td style="width: 2vh; padding-left: 11vh">
              <div style="width: 8.6vh; padding-top: 2vh; padding-bottom: 2vh">
                <img :src="item.product.imageUrl" style="width: 100%" />
              </div>
            </td>
            <td style="padding-top: 5vh">
              {{ item.product.title }}
            </td>
            <td style="padding-top: 5vh">
              {{ item.product.price }}
            </td>
            <td style="padding-top: 5vh">
              <div type="number">
                <p>{{ item.qty }}</p>
              </div>
            </td>
            <td style="padding-top: 5vh">
              {{ item.final_total }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="text-white" style="margin-top: 3%">
    <p
      style="font-size: 2.5vh;
      margin-left: 50vh;
      color: white;
      line-height: 20%;"
    >
      收件資訊
    </p>
    <div
      style="
        margin-left: 25%;
        width: 50%;
        background-color: #fafafa;
        border-radius: 2vh;
        font-size: 2vh;
        color: #424242;
        padding-left: 5vh;
      "
    >
      <div>
        <p style="padding-top: 2vh">收件者: {{ this.personFile.name }}</p>
      </div>
      <div>
        <p>聯絡電話: {{ this.personFile.cellphone }}</p>
      </div>
      <div>
        <p>Email: {{ this.personFile.email }}</p>
      </div>
      <div>
        <p>
          住址: {{ this.personFile.address.city }}
          {{ this.personFile.address.district }}
          {{ this.personFile.address.zipcode }}
        </p>
      </div>
      <div>
        <p style="margin-left: 4vh">{{ this.personFile.address.fullAddress }}</p>
      </div>
    </div>
  </div>
  <button
    type="button"
    class="btn btn-warning"
    style="
      padding-right: 2%;
      padding-left: 2%;
      margin-top: 6%;
      margin-bottom: 5%;
      margin-left: 69%;
      letter-spacing: 2px;
      font-weight: bold;
    "
    @click="completeOrder"
  >
    確認
  </button>
  <!-- show loading -->
  <div style="position: relative">
    <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
  </div>
</template>
<script>
import axios from 'axios';
// import mitt from 'mitt';
import cookie from 'json-cookie';

// const emitter = mitt();
export default {
  data() {
    return {
      isLoading: false,
      productsInCart: [],
      currentStep: 3,
      personFile: {},
    };
  },
  created() {
    // sendProduct
    // emitter.on('sendBuyerProfile', (profile) => {
    //   console.log('profile', profile);
    //   this.data = profile;
    // });
    this.personFile = cookie.get('json-profile');
    cookie.delete('json-profile');
    this.loadProductsInCart();
  },
  mounted() {
    // emitter.on('sendBuyerProfile', (profile) => {
    //   console.log('profile', profile);
    //   this.data = profile;
    // });
    this.$emit('changeCurrentStep', 3);
  },
  methods: {
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    completeOrder() {
      const data = {
        user: {
          name: this.personFile.name,
          email: this.personFile.email,
          tel: this.personFile.cellphone,
          address: this.personFile.address.fullAddress,
        },
        message: '',
      };
      axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data })
        .then(() => {
          // 回到首頁
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    loadProductsInCart() {
      axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`).then((res) => {
        this.productsInCart = res.data.data.carts;
      });
    },
  },
};
</script>
