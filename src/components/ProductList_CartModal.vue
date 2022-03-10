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
          <h5 class="modal-title" id="modalLabel">購物車</h5>
          <div style="float: left; margin-left: 2px;">123</div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <table class="table">
              <thead>
                <th>產品名稱</th>
                <th>售價</th>
                <th>數量</th>
                <th>小計</th>
                <th>變更</th>
              </thead>
              <tbody>
                <tr v-for="item in productsInCart" :key="item.product.id">
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
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click.prevent="deleteProduct(item)"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
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
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="checkout"
          >
            結帳
          </button>
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
import Modal from 'bootstrap/js/dist/modal';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

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
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 990);
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
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data: cart },
        )
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
      this.$router.push('/checkout-payment-top');
    },
    deleteProduct(item) {
      this.showLoading();
      axios
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
        )
        .then(() => {
          this.loadProductsInCart();
        });
    },
    deleteAllProductsInCart() {
      this.showLoading();
      axios
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`,
        )
        .then(() => {
          this.loadProductsInCart();
        });
    },
  },
};
</script>
