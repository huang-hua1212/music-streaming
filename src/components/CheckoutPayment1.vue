<template>
  <div
    class="container d-flex"
    style="margin-top: 8%; margin-left: 26%; width: 800px"
  >
    <Form v-slot="{ errors }" id="form" @submit="toCheckoutPayment2">
      <!-- 姓名 -->
      <div class="row mb-4 ps-4">
        <label for="form-email" class="col-auto col-form-label">姓名</label>
        <div class="col-sm-10 pe-5 ms-2">
          <Field
            type="text"
            name="name"
            id="name"
            class="form-control"
            placeholder="xxxx"
            rules="required"
            :class="{ 'is-invalid': errors['name'] }"
            v-model="name"
            required
            autofocus
          ></Field>
          <error-message name="name" class="invalid-feedback"></error-message>
        </div>
      </div>

      <!-- 手機電話 -->
      <div class="row mb-4 ps-4">
        <label for="form-email" class="col-auto col-form-label">手機</label>
        <div class="col-sm-10 pe-5 ms-2">
          <Field
            type="text"
            name="手機"
            id="cellphone"
            class="form-control"
            placeholder="xxxx"
            rules="required|min:8"
            :class="{ 'is-invalid': errors['手機'] }"
            v-model="cellphone"
          ></Field>
          <error-message name="手機" class="invalid-feedback"></error-message>
        </div>
      </div>

      <!-- 市話 先隱藏-->
      <div class="row mb-4 ps-4" hidden>
        <label for="form-email" class="col-auto col-form-label">市話</label>
        <div class="col-sm-10 pe-5 ms-2">
          <Field
            type="text"
            name="市話"
            id="telephone"
            class="form-control"
            placeholder="xxxx"
            rules="required|min:8"
            :class="{ 'is-invalid': errors['市話'] }"
            v-model="housephone"
          ></Field>
          <error-message name="市話" class="invalid-feedback"></error-message>
        </div>
      </div>

      <!-- <hr /> -->

      <!-- 信箱 -->
      <div class="row mb-4 ps-4">
        <label for="form-name" class="col-auto col-form-label">信箱</label>
        <div class="col-sm-10 pe-5 ms-2">
          <Field
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="email"
            rules="required|email"
            :class="{ 'is-invalid': errors['email'] }"
            v-model="email"
          ></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
      </div>

      <!-- 地址 -->
      <div class="row">
        <label class="col-auto col-form-label mb-1">居住地址</label>
        <div class="row col-auto">
          <label
            for="formCityOfLiveAddress"
            class="col-auto pe-0 col-form-label"
            >縣市</label
          >
          <div class="col-auto">
            <Field
              class="col-5 form-select"
              name="addressCity"
              id="formCityOfLiveAddress"
              rules="required"
              as="select"
            >
              <!--v-model="profileData.liveAddress.city" v-on:change="getRegion($event)" -->
              <option value="縣市" selected disabled>縣市</option>
              <option value="高雄市" selected disabled>高雄市</option>
              <option>
                <!-- v-for="(cityCode, city) in html.liveAddress.selectCity"
              v-bind:value="[city, cityCode]"
              :key="city"
              {{ city }} -->
              </option>
            </Field>
          </div>
        </div>
        <div class="row col-auto">
          <label
            for="formRegionOfLiveAddress"
            class="col-auto pe-0 col-form-label"
            >鄉鎮[市]區</label
          >
          <div class="col-auto">
            <Field
              name="addressRegion"
              class="form-select"
              id="formRegionOfLiveAddress"
              rules="required"
              v-model="address.region"
              as="select"
            >
              <!--v-model="profileData.liveAddress.region" v-on:change="getRoad($event)" -->
              <option value="鄉鎮[市]區" selected disabled>鄉鎮[市]區</option>
              <option>
                <!-- v-for="region in html.liveAddress.selectRegion"
              v-bind:value="region"
              :key="region"
              {{ region }} -->
              </option>
            </Field>
          </div>
        </div>

        <div class="row col-auto">
          <label
            for="formRoadOfLiveAddress"
            class="col-auto me-0 pe-0 col-form-label"
            >郵遞區號</label
          >
          <div class="col-5">
            <Field
              type="text"
              name="addressRoad"
              placeholder="郵遞區號"
              class="form-control"
              id="formRoadOfLiveAddress"
              rules="required"
              v-model="address.road"
            >
            </Field>
          </div>
        </div>
      </div>

      <div class="ms-4 mt-1 ps-3 mb-4" style="width: 600px">
        <Field
          type="text"
          name="fullAddress"
          class="form-control ms-5 h-100"
          placeholder="xxxxxx"
          v-model="address.fullAddress"
          rules="required"
        ></Field>
        <error-message
          name="fullAddress"
          class="invalid-feedback"
        ></error-message>
      </div>

      <div class="form-group ms-3 mt-1 row mb-4">
        <label for="description" class="col-1">備註</label>
        <div class="col-10 pe-5">
          <textarea class="form-control" rows="4" v-model="memo"></textarea>
        </div>
      </div>
      <div class="row">
        <button
          type="submit"
          class="btn btn-secondary col-2"
          style="margin-left: 550px"
          @click.prevent="toCheckoutPayment2"
        >
          送出
        </button>
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
