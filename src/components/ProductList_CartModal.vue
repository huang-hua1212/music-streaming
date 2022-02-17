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
                <tr v-for="item in productsInCart" :key="item.id">
                  <td>
                    {{ item.title }}
                  </td>
                  <td>
                    {{ item.price }}
                  </td>
                  <td>
                    <input
                      type="number"
                      style="width: 50px"
                      :value="item.num"
                    />
                  </td>
                  <td>
                    {{ item.num * item.price }}
                  </td>
                  <td>
                    <button type="button" class="btn btn-primary">編輯</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @submit.prevent="checkout"
          >
            結帳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['productsInCart'],
  data() {
    return {
      modal: {
        cartModal: '',
      },
    };
  },
  watch: {
    // 監控
    productsInCart() {},
  },
  mounted() {
    this.modal.cartModal = new Modal(this.$refs.cartModal);
    this.modal.cartModal.hide();
  },
  methods: {
    openModal() {
      this.modal.cartModal.show();
    },
    closeModal() {
      this.modal.cartModal.hide();
    },
    checkout() {
      // 前往結帳頁面
      // this.$router.push('/checkout-payment');//checkout-payment_top
      this.$router.push('/checkout-payment_top');
    },
  },
};
</script>
