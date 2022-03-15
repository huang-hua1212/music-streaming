<template>
  <!-- <navbar-black></navbar-black> -->

  <div>
    <!-- <router-link to="/checkout-payment1">Child1</router-link> -->
    <checkout-payment-steps
      :length="4"
      :currentStep="currentStep"
      class="mt-5 d-flex justify-content-center"
      style = 'margin-left: -2vh'
    ></checkout-payment-steps>
  </div>
  <router-view @changeCurrentStep = "changeCurrentStep"/>
</template>
<script>

import CheckoutPaymentSteps from '@/components/CheckoutPayment_Steps.vue';
// import NavbarBlack from '@/components/NavbarBlack.vue';

export default {
  data() {
    return {
      currentStep: 1,
    };
  },
  components: {
    CheckoutPaymentSteps,
    // NavbarBlack,
  },
  created() {
    // this.currentStep = this.$refs.child.currentStep;
  },
  methods: {
    changeCurrentStep(stepth) {
      this.currentStep = stepth;
    },
  },
};
</script>
<style lang="scss" scoped></style>
