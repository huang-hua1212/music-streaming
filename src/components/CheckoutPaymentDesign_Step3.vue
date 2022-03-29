<template>
  <div style="width: 58%; margin-left: 21%; margin-top: 20vh; height: 40%">
    <div
    style="font-size: 2.5vh;
    color: white;
    margin-left: 5%;
    margin-bottom: 0;
    line-height: 20%;
    ">
    <!-- <p>
      購物車明細
    </p> -->
    </div>
    <div class="container" style="border-radius: 5px;
    padding-left: 5vh;
     padding-right: 5vh;
      padding-top: 0%;padding-bottom: 4%">
      <table class="table text-white" style="text-align: center">
        <thead style="font-size: 2.8vh">
          <td style="padding-left: 1%"></td>
          <th style="padding-left: 1%">名稱</th>
          <th style="padding-left: 1%">售價</th>
          <th style="padding-left: 6vh;">數量</th>
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
            <td style="padding-top: 5vh;
            padding-left: 6vh;">
              <div type="number">
                <p>{{ item.qty }}</p>
              </div>
            </td>
            <td style="padding-top: 5vh">
              {{ item.final_total }}
            </td>
          </tr>
        </tbody>
        <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style= 'font-size: 4vh;
                  padding-right: 10vh;'>總計: ${{allTotal}}</td>
                </tr>
              </tfoot>
      </table>
    </div>
  </div>
  <div class="text-white" style="margin-top: 3%;">
    <div
     style="font-size: 2.5vh;
      margin-left: 28%;
      color: white;
      line-height: 20%;">
    <p>
      收件資訊
    </p>
    </div>
    <div
      style="
        margin-left: 26%;
        width: 48%;
        background-color: #fafafa;
        color: #424242;
        padding-left: 5vh;
        height: 45vh;
      "
    >
      <div>
        <p style="padding-top: 3.2vh;
        font-size: 2.1vh;">收件者</p>
        <p style="font-size: 3.2vh;
        font-weight: bold;
        line-height: 0.5vh;"> {{ this.personFile.name }}</p>
      </div>
      <div>
        <p style="margin-top: 4.2vh;font-size: 2vh;">聯絡電話</p>
        <p style="font-size: 3.2vh;
        font-weight: bold;
         line-height: 0.5vh;"> {{ this.personFile.cellphone }}</p>
      </div>
      <div>
        <p style="margin-top: 4.2vh;font-size: 2vh;">信箱</p>
        <p style="font-size: 3.2vh;
        font-weight: bold;
         line-height: 0.5vh;"> {{ this.personFile.email }}</p>
      </div>
      <div>
        <p style="margin-top: 4.2vh;font-size: 2vh;">住址</p>
        <p style="margin-bottom: 3.5vh;
        font-size: 3.2vh;
        font-weight: bold;
         line-height: 0.5vh;"> {{ this.personFile.address.city }}
          {{ this.personFile.address.district }}
          {{ this.personFile.address.zipcode }}
          {{ this.personFile.address.fullAddress }}</p>
        </div>
        <!-- <p
        style="margin-left: 4vh">{{ this.personFile.address.fullAddress }}</p> -->
      </div>
      <!-- <div>
        <p style="margin-left: 4vh">{{ this.personFile.address.fullAddress }}</p>
      </div> -->
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
import cookie from 'json-cookie';

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
    this.personFile = cookie.get('json-profile');
    cookie.delete('json-profile');
    this.loadProductsInCart();
  },
  mounted() {
    this.$emit('changeCurrentStep', 3);
  },
  computed: {
    allTotal() {
      const total = this.productsInCart.reduce((acc, currentValue) => {
        let accumulator = acc;
        accumulator += currentValue.total;
        return accumulator;
      }, 0);
      return total;
    },
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
<style lang = 'scss' scoped>
thead {
  /* background-color: #F6E71D; */
  color: black;
  height: 8vh;
}
tfoot, tbody{
  border-style: none;
  border-top-style: none;
  border-bottom-style: none;
}
tfoot{
  border-bottom-style: none;
}
.container {
  padding-top: 0;
}
</style>
