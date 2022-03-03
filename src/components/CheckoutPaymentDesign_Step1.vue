<template>
  <div
    style="width: 60%; margin-left: 20%; margin-top: 8%; border: white dashed"
  >
    <Form v-slot="{ errors }" id="form" @submit="toCheckoutPayment2">
      <div class="form__group field" style="margin-left: 20%">
        <Field
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          rules="required"
          :class="{ 'is-invalid': errors['name'] }"
          v-model="name"
        ></Field>
        <label for="name" class="form__label">Name</label>
        <error-message
          name="name"
          class="invalid-feedback"
          style="position: absolute; top: 45%; left: 100%"
        ></error-message>
      </div>
      <div class="form__group field" style="margin-left: 20%">
        <Field
          type="input"
          class="form__field"
          placeholder="Phone Number"
          name="手機號碼"
          id="cellphone"
          rules="required"
          :class="{ 'is-invalid': errors['手機號碼'] }"
          v-model="cellphone"
        ></Field>
        <label for="cellphone" class="form__label">Phone Number</label>
        <error-message
          name="手機號碼"
          class="invalid-feedback"
          style="position: absolute; top: 45%; left: 100%"
        ></error-message>
      </div>
      <div class="form__group field" style="margin-left: 20%">
        <Field
          type="input"
          class="form__field"
          placeholder="Email"
          name="信箱"
          id="email"
          rules="required|email"
          :class="{ 'is-invalid': errors['信箱'] }"
          v-model="email"
        ></Field>
        <label for="email" class="form__label">Email</label>
        <error-message
          name="信箱"
          class="invalid-feedback"
          style="position: absolute; top: 45%; left: 100%"
        ></error-message>
      </div>
    </Form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      step: 1,
      name: '',
      email: '',
      cellphone: '',
      housephone: '',
      address: {
        city: '',
        region: '',
        road: '',
        fullAddress: '',
      },
      memo: '',
      data: '',
    };
  },
  methods: {
    cellphone_verify(value) {
      const cellphoneRules = /09\d{8}/;
      return cellphoneRules.test(value) ? true : '手機號碼必須以09為開頭';
    },
    telephone1_verify(value) {
      const telephoneRules = /\d{2,3}/;
      return telephoneRules.test(value) ? true : '市話區碼未符合規則';
    },
    telephone2_verify(value) {
      const telephoneRules = /\d{4}-?\d{4}$/;
      return telephoneRules.test(value) ? true : '市話號碼未符合規則';
    },
    toCheckoutPayment2() {
      const data = {
        user: {
          name: this.name,
          email: this.email,
          tel: this.cellphone,
          address: this.address.fullAddress,
        },
        message: this.memo,
      };
      axios
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          { data },
        )
        .then(() => {
          this.data = data;
          this.$router.push('/checkout-payment-top/checkout-payment2');
        });
    },
    // getRegion() {},
  },
};
</script>
<style lang="scss" scoped>
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 0.95rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 0.95rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
/* reset input */
.form__field {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
</style>
