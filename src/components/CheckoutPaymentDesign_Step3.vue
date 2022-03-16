<template>
  <div style="width: 58%; margin-left: 21%; margin-top: 20vh; height: 40%">
    <p
      style="
        font-size: 3.5vh;
        color: white;
        margin-left: 5%;
        margin-bottom: 0;
        line-height: 20%;
      "
    >
      Shop Details
    </p>
    <div
      class="container"
      style="border-radius: 5px; padding: 5vh; padding-bottom: 4%"
    >
      <table class="table text-white" style="text-align: center">
        <thead style="font-size: 2.8vh">
          <th style="padding-left: 1%">產品名稱</th>
          <th style="padding-left: 1%">售價</th>
          <th style="padding-left: 1%">數量</th>
          <th style="padding-left: 1%">小計</th>
          <!-- <th style="padding-left: 1%">變更</th> -->
        </thead>
        <tbody>
          <tr
            v-for="item in productsInCart"
            :key="item.product.id"
            style="height: 1.6vh; font-size: 2.8vh"
          >
            <td>
              {{ item.product.title }}
            </td>
            <td>
              {{ item.product.price }}
            </td>
            <td>
              <div type="number">
                <p>{{ item.qty }}</p>
              </div>
            </td>
            <td>
              {{ item.final_total }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="text-white" style="margin-top: 3%">
    <p
      style="font-size: 3.5vh; color: white; margin-left: 24%; line-height: 20%"
    >
      Payment & Shipping Information
    </p>
    <div
      style="
        margin-top: 2%;
        margin-left: 23.5%;
        width: 53%;
        border: white dashed;
        font-size: 3vh;
      "
    >
      <div>
        <p>收件者: {{ this.personFile.name }}</p>
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
        <p>{{ this.personFile.address.fullAddress }}</p>
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
      margin-left: 64%;
      letter-spacing: 2px;
    "
    @click="completeOrder"
  >
    確認
  </button>
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
    console.log(cookie.get('json-profile'));
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
      axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
        { data })
        .then(() => {
          // 回到首頁
          this.$router.push('/home');
        }).catch((err) => {
          console.log(err.response);
        });
    },
    loadProductsInCart() {
      console.log('觸發loadProductsInCart');
      axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.productsInCart = res.data.data.carts;
        });
    },
  },
};
</script>
