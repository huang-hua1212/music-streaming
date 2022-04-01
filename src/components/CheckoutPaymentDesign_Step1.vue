<template>
  <div style="width: 60%; margin-left: 20%; margin-top: 20vh; height: 40%;">
    <div
      class="container"
      style="border-radius: 5px; background-color: white; padding: 5vh; padding-bottom: 4%"
    >
      <table class="table" style="text-align: center">
              <!-- <thead>
                <th>產品名稱</th>
                <th>售價</th>
                <th>數量</th>
                <th>小計</th>
                <th>變更</th>
              </thead> -->
              <tbody>
                <tr v-for="item in productsInCart" :key="item.product.id">
                  <td style="width: 2vh; padding-left: 11vh">
                    <div style="width: 8.6vh; padding-top: 2vh; padding-bottom: 2vh">
                      <img :src="item.product.imageUrl" style="width: 100%"
                      alt="圖片未加載完成"/>
                    </div>
                  </td>
                  <td style="padding-top: 5vh">
                    {{ item.product.title }}
                  </td>
                  <td style="padding-top: 5vh">
                    {{ item.product.price }}
                  </td>
                  <td style="width: 18vh">
                    <div class="row" style="padding-left: 4vh; padding-top: 3vh">
                      <div class="wrapper">
                        <span class="minus" @click.prevent="decrement(item)">-</span>
                        <span class="num">{{ item.qty }}</span>
                        <span class="plus" @click.prevent="increment(item)">+</span>
                      </div>
                    </div>
                  </td>
                  <td style="padding-top: 4vh">
                    <h3>${{ item.final_total }}</h3>
                    <div>
                      <a href="#" @click.prevent="deleteProduct(item)">Remove </a>
                    </div>
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
            <button
          type="button"
          class="btn btn-warning"
          style="float: right; margin-right: 12vh;margin-top: 10%;
          font-size: 3vh; font-weight: bold;
          margin-bottom: 10vh;"
          @click.prevent="toCheckPaymentStep2"
        >
          下一步
        </button>
    </div>
  </div>
  <!-- show loading -->
   <div style="position: relative">
      <loading
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="true"
      />
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
    this.showLoading();
    this.handleCompanyName();
    this.loadProductsInCart();
  },
  mounted() {
    this.$emit('changeCurrentStep', 1);
  },
  computed: {
    allTotal() {
      // const formatter = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // });
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
      }, 970);
    },
    decrement(it) {
      const item = it;
      item.qty -= 1;
      this.changeNumInCart(item);
    },
    increment(it) {
      const item = it;
      item.qty += 1;
      this.changeNumInCart(item);
    },
    handleCompanyName() {
      this.$store.commit('addCompanyId', '西打藍');
    },
    toCheckPaymentStep2() {
      // 跳到步驟二
      this.$router.push('/checkout-payment-design/checkout-payment-designstep2');
    },
    loadProductsInCart() {
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
<style lang= 'scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
.wrapper {
  height: 6vh; /* 120px */
  min-width: 15vh; /* 380p */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.wrapper span {
  width: 100%;
  text-align: center;
  font-size: 4vh; /* 55px */
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}
.wrapper span.num {
  font-size: 3vh; /* 50px */
  border-right: 2px solid rgba(0, 0, 0, 0.2);
  border-left: 2px solid rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
// modal background color
.modal-content {
  background-color: rgb(255, 255, 255);
  opacity: 0.9;
}
</style>
