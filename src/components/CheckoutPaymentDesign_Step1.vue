<template>
  <div style="width: 60%; margin-left: 20%; margin-top: 8%">
    <div
      class="container"
      style="border-radius: 5px; background-color: white; padding: 4%; padding-bottom: 10%"
    >
      <table class="table" style="text-align: center">
        <thead style="font-size: 16px">
          <th style="padding-left: 1%">產品名稱</th>
          <th style="padding-left: 1%">售價</th>
          <th style="padding-left: 1%">數量</th>
          <th style="padding-left: 1%">小計</th>
          <th style="padding-left: 1%">變更</th>
        </thead>
        <tbody>
          <tr v-for="item in productsInCart" :key="item.product.id" style="height: 72px">
            <td>
              {{ item.product.title }}
            </td>
            <td>
              {{ item.product.price }}
            </td>
            <td>
              <input
                type="number"
                style="width: 50px"
                v-model="item.qty"
                @change="changeNumInCart(item)"
              />
            </td>
            <td>
              {{ item.final_total }}
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click.prevent="deleteProduct(item)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          style="float: right; margin-right: 8.5%; margin-top: 3%"
          @click.prevent="toCheckPaymentStep2"
        >
          結帳
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click.prevent="deleteAllProductsInCart"
          style="float: right; margin-right: 4%; margin-top: 3%"
        >
          全部刪除
        </button>
      </div>
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
    };
  },
  created() {
    this.$emit('changeCurrentStep', 1);
    this.loadProductsInCart();
  },
  methods: {
    toCheckPaymentStep2() {
      // 跳到步驟二
      this.$router.push('/checkout-payment-designstep2');
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
