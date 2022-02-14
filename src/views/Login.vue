<template>
  <div class="content">
    <div class="mb-5">
      <div class="mx-auto mt-5" style="width: 200px">
        <div class="text-center my-5">
          <h2>登入頁面</h2>
        </div>
      </div>

      <div class="container">
        <div class="col-auto">
          <Form v-slot="{ errors }" id="form" class="form-signin" @submit="login">
            <div class="mx-auto col-5 mb-3">
              <Field
                type="email"
                name="email"
                id="email"
                class="form-control"
                placeholder="account"
                rules="email|required"
                :class="{ 'is-invalid': errors['email'] }"
                v-model="account.username"
                required
                autofocus
              ></Field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <!-- <div class="mx-auto col-5 mb-5">
              <Field
                type="password"
                name="password"
                id="forPassword"
                class="form-control"
                placeholder="password"
                rules="required|min:8"
                :class="{ 'is-invalid': errors['password'] }"
                v-model="account.password"
              ></Field>
              <error-message name="password" class="invalid-feedback"></error-message>
            </div> -->
            <!-- rules="required|min:8" -->
            <div class="mx-auto col-5 mb-5">
              <Field
                type="password"
                name="password"
                id="forPassword"
                class="form-control"
                placeholder="password"
                :rules="passWord_verify"
                :class="{ 'is-invalid': errors['password'] }"
                v-model="account.password"
              ></Field>
              <error-message name="password" class="invalid-feedback"></error-message>
            </div>
            <div class="mx-auto col-5">
              <button type="submit" class="btn btn-secondary col-12">登入</button>
            </div>
          </Form>

          <div class="mx-auto col-5 row mt-1">
            <div class="col-4 ps-0">
              <a class="nav-item nav-link text-start ps-0 pt-0 text-secondary" href="#">
                忘記密碼
              </a>
            </div>
            <div class="col-4"></div>
            <div class="col-4 pe-0">
              <a class="nav-item nav-link text-end pe-0 pt-0 text-secondary" href="./LogIn.html">
                註冊
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
export default {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      temp: {},
      data: [],
      productsInCart: [],
      isLogin: false,
      account: {
        username: '',
        password: '',
      },
    };
  },
  created() {},
  methods: {
    passWord_verify(value) {
      const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
      return passwordRules.test(value) ? true : '密碼長度至少八碼，必須包含大小寫英文及數字';
    },
    login() {
      //   const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

      //   // validate ok or not
      //   if (this.account.username.search(emailRule) === -1) {
      //     // alert('輸入不符合');
      //   }
      axios.post(`${url}/admin/signin`, this.account).then((res) => {
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token}; expired=${new Date(expired)};path=/`;
        // window.location = './VueSpringClass_hw4.html';
        this.$router.push('/backend');
      });
      // .catch((error) => {
      // //   console.dir(error);
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-link span {
  position: absolute;
  top: -1px;
  right: -1px;
  font-size: 35%;
}

.content {
  margin-top: 80px;
}
</style>
