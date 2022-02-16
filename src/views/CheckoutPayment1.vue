<template>
  <!-- <form type="submit" >
    姓名:<input type="text" v-model="buyerProfile.name" />
    手機電話:<input type="text" v-model="buyerProfile.cellphone" />
    家用電話:<input type="text" v-model="buyerProfile.housephone" />
    住址:<input type="text" v-model="buyerProfile.address" />
    備註:<textarea type="text" v-model="buyerProfile.memo" >
    </textarea>
    <button type="button" @submit.prevent="ensureCheckout()" value="送出"></button>
  </form> -->
  <div class="container">
    <Form v-slot="{ errors }" id="form" @submit="toCheckoutPayment2">
      <!--    <hr> -->
      <!-- 姓名 -->
      <div class="row mb-3">
        <label for="form-email" class="col-auto col-form-label">姓名</label>
        <div class="col-sm-10">
          <Field
            type="text"
            name="name"
            id="name"
            class="form-control"
            :rules="自定義規則"
            :class="{ 'is-invalid': errors['name'] }"
            v-model="name"
            required
          ></Field>
          <error-message name="name" class="invalid-feedback"></error-message>
        </div>
      </div>

      <!-- 手機電話 -->
      <div class="row mb-3">
        <label for="form-email" class="col-auto col-form-label">手機</label>
        <div class="col-sm-10">
          <Field
            type="text"
            name="cellphone"
            id="cellphone"
            class="form-control"
            rules="'min:8'"
            :class="{ 'is-invalid': errors['cellphone'] }"
            v-model="cellphone"
            required
          ></Field>
          <error-message
            name="cellphone"
            class="invalid-feedback"
          ></error-message>
        </div>
      </div>

      <!-- 市話 -->
      <div class="row mb-3">
        <label for="form-email" class="col-auto col-form-label">市話</label>
        <div class="col-sm-10">
          <Field
            type="text"
            name="telephone"
            id="telephone"
            class="form-control"
            :rules="cellphone_verify"
            :class="{ 'is-invalid': errors['cellphone'] }"
            v-model="telephone"
            required
          ></Field>
          <error-message
            name="telephone"
            class="invalid-feedback"
          ></error-message>
        </div>
      </div>

      <!-- <hr /> -->

      <!-- 信箱 -->
      <div class="row mb-3">
        <label for="form-name" class="col-auto col-form-label">信箱</label>
        <div class="col-sm-10">
          <Field
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="account"
            rules="email|required"
            :class="{ 'is-invalid': errors['email'] }"
            v-model="email"
            required
            autofocus
          ></Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
      </div>


      <!--  地址 -->
      <div class="row mb-3">
        <label class="col-auto col-form-label">城市</label>
        <div class="col-sm-10">
          <select class="form-select" aria-label="Default select example">
            <option selected disabled>請選擇您的居住城市</option>
            <option value="1">Taiwan</option>
            <option value="2">Japan</option>
            <option value="3">Korea</option>
          </select>
        </div>
      </div>


      <!-- 地址 -->
      <div>
        <label class="col-form-label mb-1">居住地址:</label>
        <div class="row mb-3">
          <label for="formCityOfLiveAddress" class="col-auto col-form-label"
            >縣市</label
          >
          <select
            class="select col-auto p-1"
            id="formCityOfLiveAddress"
            v-model="profileData.liveAddress.city"
            v-on:change="getRegion($event)"
          >
            <option value="縣市" selected disabled>縣市</option>
            <option
              v-for="(cityCode, city) in html.liveAddress.selectCity"
              v-bind:value="[city, cityCode]"
              :key="city"
            >
              {{ city }}
            </option>
          </select>

          <label for="formRegionOfLiveAddress" class="col-auto col-form-label"
            >鄉鎮[市]區</label
          >
          <select
            class="select col-auto p-1"
            id="formRegionOfLiveAddress"
            v-model="profileData.liveAddress.region"
            v-on:change="getRoad($event)"
          >
            <option value="鄉鎮[市]區" selected disabled>鄉鎮[市]區</option>
            <option
              v-for="region in html.liveAddress.selectRegion"
              v-bind:value="region"
              :key="region"
            >
              {{ region }}
            </option>
          </select>

          <label for="formRoadOfLiveAddress" class="col-auto col-form-label"
            >路(街)名</label
          >
          <select
            class="select col-auto p-1"
            id="formRoadOfLiveAddress"
            v-model="profileData.liveAddress.road"
          >
            <option value="路(街)名" selected disabled>路(街)名</option>
            <option
              v-for="road in html.liveAddress.selectRoad"
              v-bind:value="road"
              :key="road"
            >
              {{ road }}
            </option>
          </select>
        </div>
      </div>



    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      cellPhone: "",
      housephone: "",
      address: "",
      memo: "",
    };
  },
  methods: {
    cellphone_verify(value) {
      const cellphoneRules = /09\d{8}/;
      return cellphoneRules.test(value) ? true : "手機號碼必須以09為開頭";
    },
    telephone1_verify(value) {
      const telephoneRules = /\d{2,3}/;
      return telephoneRules.test(value) ? true : "市話區碼未符合規則";
    },
    telephone2_verify(value) {
      const telephoneRules = /\d{4}\-?\d{4}$/;
      return telephoneRules.test(value) ? true : "市話號碼未符合規則";
    },
    toCheckoutPayment2() {
      this.$router.push("/toCheckoutPayment2");
    },
    getRegion(){

    },
    get
  },
};
</script>
