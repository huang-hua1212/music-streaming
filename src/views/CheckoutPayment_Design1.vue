<template>
  <div>
    <!-- <router-link to="/checkout-payment1">Child1</router-link> -->
    <checkout-payment-steps
      :length="4"
      :currentStep="1"
      class="mt-5 d-flex justify-content-center"
    ></checkout-payment-steps>
  </div>
  <router-view />
</template>
<script>

import CheckoutPaymentSteps from '@/components/CheckoutPayment_Steps.vue';

export default {
  data() {
    return {};
  },
  components: {
    CheckoutPaymentSteps,
  },
};
</script>
<style lang="scss" scoped></style>
