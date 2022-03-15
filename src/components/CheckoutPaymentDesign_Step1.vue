<template>
  <div style="width: 60%; margin-left: 20%; margin-top: 20vh; height: 40%;">
    <div
      class="container"
      style="border-radius: 5px; background-color: white; padding: 5vh; padding-bottom: 4%"
    >
      <table class="table" style="text-align: center">
        <thead style="font-size: 2.5vh">
          <th style="padding-left: 1%">產品名稱</th>
          <th style="padding-left: 1%">售價</th>
          <th style="padding-left: 1%">數量</th>
          <th style="padding-left: 1%">小計</th>
          <th style="padding-left: 1%">變更</th>
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
              <input
                type="number"
                style="width: 8vh"
                v-model="item.qty"
                @change="changeNumInCart(item)"
              />
            </td>
            <td>
              {{ item.final_total }}
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click.prevent="deleteProduct(item)"
              style = 'font-size: 2vh'>
                刪除
              </button>
            </td>
          </tr>
        </tbody>
        <div class = 'table-btn' style = 'border-top: none; margin-right: -158%;'>
        <button
          type="button"
          class="btn btn-primary"
          style="float: right; margin-top: 2%;
          font-size: 2vh"
          @click.prevent="toCheckPaymentStep2"
        >
          結帳
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click.prevent="deleteAllProductsInCart"
          style="float: right; margin-top: 2%;
          font-size: 2vh"
        >
          全部刪除
        </button>
      </div>
      </table>
      <!-- <div>
        <button
          type="button"
          class="btn btn-primary"
          style="float: right; margin-right: 8%; margin-top: 3%;
          font-size: 2vh"
          @click.prevent="toCheckPaymentStep2"
        >
          結帳
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click.prevent="deleteAllProductsInCart"
          style="float: right; margin-right: 2%; margin-top: 3%;
          font-size: 2vh"
        >
          全部刪除
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoading: false,
      productsInCart: [],
      currentStep: 1,
    };
  },
  created() {
    this.loadProductsInCart();
  },
  mounted() {
    this.$emit('changeCurrentStep', 1);
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
        this.$emit('computProductLength', this.productsInCart.length);
      });
    },
    changeNumInCart(item) {
      this.test = item;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
          data: cart,
        })
        .then(() => {
          this.loadProductsInCart();
        });
    },
    deleteProduct(item) {
      this.showLoading();
      axios
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`)
        .then(() => {
          this.loadProductsInCart();
        });
    },
    deleteAllProductsInCart() {
      this.showLoading();
      axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`).then(() => {
        this.loadProductsInCart();
        // 回到首頁
        this.$router.push('/');
      });
    },
  },
};
</script>
