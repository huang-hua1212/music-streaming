<template>
  <!-- Modal of personProfile -->
  <div
    class="modal fade"
    id="modalLogin"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
    ref="loginModal"
  >
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- login Components -->
          <!-- <login></login> -->
          <login @close-modal="closeModal"></login>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import login from '@/components/Login.vue';
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: {
        loginModal: '',
        is_openLoginModal: false,
      },
    };
  },
  mounted() {
    this.modal.loginModal = new Modal(this.$refs.loginModal);
  },
  components: { login },
  props: ['isOpenModal'],
  watch: {
    is_openLoginModal(newValue) {
      if (newValue === true) {
        this.modal.loginModal.show();
      }
    },
  },
  methods: {
    closeModal(isCloseLoginModal) {
      this.modal.is_openLoginModal = isCloseLoginModal; // 關閉modal
      // this.$emit('close-modal', isCloseLoginModal);
      this.modal.loginModal.hide();
    },
    openModal() {
      this.modal.loginModal.show();
    },

  },
};
</script>
