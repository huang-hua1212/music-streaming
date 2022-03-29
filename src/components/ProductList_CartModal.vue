<template>
  <div
    class="modal fade"
    id="modalCart"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
    ref="cartModal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel" style="margin-left: 1.2vh; font-weight: bold">
            Shopping Cart
          </h5>
          <div style="float: left; margin-left: 2px"></div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            style="margin-right: 1vh"
          ></button>
        </div>
        <div class="modal-body" style="padding-top: 0vh">
          <div class="container">
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
                      <img :src="item.product.imageUrl" style="width: 100%" />
                    </div>
                  </td>
                  <td style="padding-top: 5vh">
                    {{ item.product.title }}
                  </td>
                  <td style="padding-top: 5vh">
                    {{ item.product.price }}
                  </td>
                  <td style="width: 18vh">
                    <!-- <input
                      type="number"
                      style="width: 50px; text-align:center;"
                      v-model="item.qty"
                      @change="changeNumInCart(item)"
                    /> -->
                    <div class="row" style="padding-left: 4vh; padding-top: 3vh">
                      <!-- <div class = 'col-auto'
                       style = '
                      width: 4vh;
                      height: 0vh;
                      font-weight: bold;
                      font-size: 5vh;'>
                      <a role = 'button'
                      @click.prevent = 'deleteNumProduct(item)'
                      style = 'height: 2vh;'>
                      <font-awesome-icon icon="circle-minus" size="1x"/>
                      </a>
                      </div>
                      <p class = 'col-auto'
                      style = 'text-align: center;
                      padding-top: 2vh; '>
                      {{item.qty}}
                      </p>
                      <div class = 'col-auto'
                       style = '
                      width: 3vh;
                      height: 0vh;
                      font-weight: bold;
                      font-size: 4vh;'>
                      <a role = 'button'
                      @click.prevent = 'deleteNumProduct(item)'
                      style = 'height: 1.5vh;'>
                      <font-awesome-icon icon="circle-plus" size="1x"/>
                      </a>
                      </div> -->
                      <div class="wrapper">
                        <span class="minus" @click.prevent="decrement(item)">-</span>
                        <span class="num">{{ item.qty }}</span>
                        <span class="plus" @click.prevent="increment(item)">+</span>
                      </div>
                    </div>
                  </td>
                  <!-- <td style = 'padding-top: 3vh'>
                    {{ item.final_total }}
                  </td> -->
                  <td style="padding-top: 4vh">
                    <h3>${{ item.final_total }}</h3>
                    <div>
                      <a href="#" @click.prevent="deleteProduct(item)">Remove </a>
                    </div>
                    <!-- <button
                      type="button"
                      class="btn btn-primary"
                      @click.prevent="deleteProduct(item)"
                    >
                      刪除
                    </button> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer" style="margin-right: 6.5vh; margin-bottom: 2vh">
          <button
            type="button"
            class="btn btn-warning"
            @click.prevent="deleteAllProductsInCart"
            style="margin-left: 0px"
          >
            全部刪除
          </button>
          <!-- <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button> -->
          <button type="button" class="btn btn-primary" @click.prevent="checkout">結帳</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Progress bar -->
  <div style="position: relative">
    <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  props: ['cartId'],
  data() {
    return {
      isLoading: false,
      productsInCart: [],
      modal: {
        cartModal: '',
      },
      test: '',
    };
  },
  components: { Loading },
  mounted() {
    this.modal.cartModal = new Modal(this.$refs.cartModal);
    this.modal.cartModal.hide();
    this.loadProductsInCart();
  },
  methods: {
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
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 990);
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
    openModal() {
      this.modal.cartModal.show();
    },
    closeModal() {
      this.modal.cartModal.hide();
    },
    checkout() {
      // 前往結帳頁面
      this.closeModal(); // 記得先關閉Modal
      this.$router.push('/checkout-payment-design/checkout-payment-designstep1');
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
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.fa-1x {
  font-size: 0.5em;
}
.modal-footer {
  border-top: white;
}

/* increment decrement Number */
/* Google fonts import link */
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
