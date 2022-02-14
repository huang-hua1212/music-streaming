<template>
  <!-- Modal of personProfile -->
  <div
    class="modal fade"
    id="modalLogin"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-hidden="true"
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
          <login></login>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import login from './Login.vue';

export default {
  components: { login },
};
</script>
