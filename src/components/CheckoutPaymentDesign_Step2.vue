<template>
  <div
    style="width: 60%; margin-left: 20%; margin-top: 8%; border: white dashed"
  >
    <Form v-slot="{ errors }" id="form" @submit="toCheckPaymentStep3">
      <!-- 姓名 -->
      <div class="form__group field" style="margin-left: 23%">
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

      <!-- 手機電話 -->
      <div class="form__group field" style="margin-left: 23%">
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

      <!-- 信箱 -->
      <div class="form__group field" style="margin-left: 23%">
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

      <!-- 地址 -->
      <div class="container row">
        <!-- 縣市 -->
        <div
          class="col-auto form__group field form-group-select"
          style="margin-left: 23%; width: 14%"
        >
          <Field
            class="form__field"
            name="縣市"
            placeholder="縣市"
            id="address1"
            rules="required"
            :class="{ 'is-invalid': errors['縣市'] }"
            v-model="address.city"
            as="select"
          >
            <option value="縣市" disabled selected>縣市</option>
            <option
              v-for="item in addressSelectOptionsCities"
              :key="item.name"
              :value="item.name"
            >
              {{ item.name }}
            </option>
          </Field>

          <error-message name="縣市" class="invalid-feedback"></error-message>
        </div>

        <!-- 區域-->
        <div
          class="col-auto form__group field form-group-select"
          style="margin-left: 5%; width: 14%"
        >
          <Field
            class="form__field"
            name="區域"
            placeholder="區域"
            id="address1"
            rules="required"
            :class="{ 'is-invalid': errors['區域'] }"
            v-model="address.district"
            as="select"
          >
            <option value="區域" disabled selected>區域</option>
            <option
              v-for="it in addressDistrict"
              :key="it.zip"
              :value="it.name"
            >
              {{ it.name }}
            </option>
          </Field>

          <error-message name="區域" class="invalid-feedback"></error-message>
        </div>

        <!-- zipcode -->
        <div
          class="col-auto form__group field"
          style="margin-left: 5%; width: 14%"
        >
          <Field
            type="input"
            class="form__field"
            placeholder="ZipCode"
            name="郵遞區號"
            id="zipcode"
            rules="required"
            :class="{ 'is-invalid': errors['郵遞區號'] }"
            v-model="addressZip"
          ></Field>
          <error-message
            name="郵遞區號"
            class="invalid-feedback"
          ></error-message>
        </div>
      </div>

      <!-- 一般地址 -->
      <div class="form__group field" style="margin-left: 23%">
        <Field
          type="input"
          class="form__field"
          placeholder="Address"
          name="地址"
          id="address"
          rules="required"
          :class="{ 'is-invalid': errors['地址'] }"
          v-model="address.fullAddress"
        ></Field>
        <label for="address" class="form__label">Address</label>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <button
        type="button"
        class="btn btn-warning"
        style="padding-right:2%;padding-left:2%;margin-top:6%;margin-left: 64%; letter-spacing: 2px"
        @click.prevent = 'toCheckPaymentStep3'
      >
        NEXT
      </button>
    </Form>
  </div>
</template>
<script>
import axios from 'axios';
// import mitt from 'mitt';
import cookie from 'json-cookie';

// const emitter = mitt();
export default {
  data() {
    return {
      addressSelectOptionsCities: [],
      addressSelectOptionsDistricts: [],
      step: 2,
      name: '',
      email: '',
      cellphone: '',
      housephone: '',
      address: {
        city: '',
        district: '',
        road: '',
        zipcode: '',
        fullAddress: '',
      },
      memo: '',
      data: '',
      currentStep: 2,
    };
  },
  created() {
    this.$emit('changeCurrentStep', 2);
  },
  mounted() {
    this.getCity();
  },
  computed: {
    addressDistrict() {
      for (let i = 0; i < this.addressSelectOptionsCities.length; i += 1) {
        if (this.addressSelectOptionsCities[i].name === this.address.city) {
          return this.addressSelectOptionsCities[i].districts;
        }
      }
      return 'no value';
    },
    addressZip() {
      for (let j = 0; j < this.addressDistrict.length; j += 1) {
        if (this.addressDistrict[j].name === this.address.district) {
          // this.address.zipcode = this.addressDistrict[j].zip;
          return this.addressDistrict[j].zip;
        }
      }
      return '';
    },
  },
  methods: {
    toCheckPaymentStep3() {
      const buyerProfile = {
        name: this.name,
        email: this.email,
        cellphone: this.cellphone,
        housephone: this.housephone,
        address: {
          city: this.address.city,
          district: this.address.district,
          road: this.address.road,
          zipcode: this.addressZip,
          fullAddress: this.address.fullAddress,
        },
      };
      cookie.set('json-profile', buyerProfile);
      this.$router.push('/checkout-payment-design/checkout-payment-designstep3');
    },
    getCity() {
      const addressApi = 'https://all-the-cors.herokuapp.com/https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json';
      axios
        .get(addressApi)
        .then((res) => {
          this.addressSelectOptionsCities = [...res.data];
        })
        .catch((err) => {
          console.dir(err);
        });
    },

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
.form-group-select select {
  background-color: rgba(41, 38, 38, 0.712);
}
option:disabled {
  color: #ebebeb;
}
</style>
