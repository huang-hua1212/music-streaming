<template>
  <div
  style="width: 60%; margin-left: 20%; margin-top: 20vh; height: 40%;">
  <p style = 'font-size: 4.5vh;color: white; text-align: center;
  line-height: 20%;'>Shop Details</p>
    <div
      class="container"
      style="border-radius: 5px; padding: 5vh; padding-bottom: 4%"
    >
      <table class="table text-white" style="text-align: center">
        <thead style="font-size: 2.5vh">
          <th style="padding-left: 1%">產品名稱</th>
          <th style="padding-left: 1%">售價</th>
          <th style="padding-left: 1%">數量</th>
          <th style="padding-left: 1%">小計</th>
          <!-- <th style="padding-left: 1%">變更</th> -->
        </thead>
        <tbody>
          <tr v-for="item in productsInCart" :key="item.product.id" style="height: 1.6vh">
            <td>
              {{ item.product.title }}
            </td>
            <td>
              {{ item.product.price }}
            </td>
            <td>
              <div
                type="number"
              ><p>{{item.qty}}</p></div>
            </td>
            <td>
              {{ item.final_total }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div style = 'margin-top: 3%'>
  <p style = 'font-size: 4.5vh;color: white; text-align: center;
  line-height: 20%;'>Payment & Shipping Information</p>
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
      data: {

      },
    };
  },
  created() {
    // sendProduct
    // emitter.on('sendBuyerProfile', (profile) => {
    //   console.log('profile', profile);
    //   this.data = profile;
    // });
    console.log(cookie.get('json-profile'));
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
    toCheckPaymentStep2() {
      // 跳到步驟二
      this.$router.push('/checkout-payment-design/checkout-payment-designstep2');
    },
    loadProductsInCart() {
      console.log('觸發loadProductsInCart');
      axios.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`).then((res) => {
        this.productsInCart = res.data.data.carts;
      });
    },
  },
};
</script>
