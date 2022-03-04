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
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="closeModal"
          ></button>
        </div>
        <!-- <div class="modal-body">

          <login @close-modal="closeModal"></login>
        </div> -->
        <div class="modal-body">
          <div class="box" style="font-family: 'Noto Sans', sans-serif">
            <Form class="form" v-slot="{ errors }" id="form" @submit="login">
              <span class="text-center">login</span>
              <div class="warning-hint" :hidden="loginSuccess">
                <p
                  style="
                    line-height: 2.3;
                    text-align: center;
                    font-weight: bold;
                  "
                >
                  Incorrect Email or Password
                </p>
              </div>
              <div style="margin-top: 5%">
                <!-- 信箱 -->
                <div class="form__group field">
                  <Field
                    type="input"
                    class="form__field"
                    placeholder="Email"
                    name="email"
                    id="email"
                    rules="required|email"
                    :class="{ 'is-invalid': errors['email'] }"
                    v-model="email"
                  ></Field>
                  <label for="email" class="form__label">Email</label>
                  <error-message
                    name="email"
                    class="invalid-feedback"
                  ></error-message>
                </div>
              </div>
              <!-- 信箱 -->
              <div class="form__group field">
                <Field
                  type="password"
                  class="form__field"
                  placeholder="Password"
                  name="password"
                  id="password"
                  :rules="passWord_verify"
                  :class="{ 'is-invalid': errors['password'] }"
                  v-model="password"
                ></Field>
                <label for="password" class="form__label">Password</label>
                <error-message
                  name="password"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <button
                type="button"
                class="btn cancelBtn"
                @click.prevent="closeModal()"
              >
                cancel
              </button>

              <button type="submit" class="btn submitBtn">submit</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import axios from 'axios';

export default {
  data() {
    return {
      loginSuccess: true,
      email: '',
      password: '',
      modal: {
        loginModal: '',
        is_openLoginModal: false,
      },
    };
  },
  mounted() {
    this.modal.loginModal = new Modal(this.$refs.loginModal);
  },
  // components: { login, LoginModalBodyTest },
  // components: { LoginModalBodyTest },
  props: ['isOpenModal'],
  watch: {
    is_openLoginModal(newValue) {
      if (newValue === true) {
        this.modal.loginModal.show();
      }
    },
  },
  methods: {
    closeModal() {
      console.log('closemodal');
      // this.modal.is_openLoginModal = isCloseLoginModal; // 關閉modal
      // this.$emit('close-modal', isCloseLoginModal);
      this.email = '';
      this.password = '';
      // this.errors.clear("login");
      // this.errors.clear("register");
      this.modal.loginModal.hide();
    },
    openModal() {
      this.modal.loginModal.show();
    },
    passWord_verify(value) {
      const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
      return passwordRules.test(value)
        ? true
        : '密碼長度至少八碼，必須包含大小寫英文及數字';
    },
    login() {
      axios
        .post(`${process.env.VUE_APP_API}/admin/signin`, {
          username: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log('success!!');
          this.closeModal(); // 要先關閉modal才不會有陰影
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expired=${new Date(
            expired,
          )};path=/`;
          this.loginSuccess = true;
          this.$router.push('/backend');
        })
        .catch((err) => {
          console.log(err);
          this.loginSuccess = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext");
.modal {
  margin-top: 3.5%;
}
.modal-content {
  background-color: rgba(70, 66, 66, 0.5);
}
.box .form {
  margin-left: 20%;
  width: 60%;
}
/*form design */
.cancelBtn {
  color: rgb(62, 122, 233);
  background-color: #fcfcfc;
  outline: none;
  border: 0;
  padding: 10px 20px;
  text-transform: uppercase;
  // margin-bottom: 0px;
  bottom: 80px;
  border-radius: 2px;
  cursor: pointer;
  position: absolute;
  left: 28%;
  // margin-left: 12%;
}
.submitBtn {
  color: #fff;
  background-color: #e74c3c;
  outline: none;
  border: 0;
  padding: 10px 20px;
  // text-transform: uppercase;
  // margin-top: 60px;
  bottom: 80px;
  border-radius: 2px;
  cursor: pointer;
  position: absolute;
  right: 30%;
}
.modal-header {
  border-bottom: rgba(0, 0, 0, 0.89);
}
.modal-content {
  height: 500px;
}

$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 100%;
  margin-left: 0%;
}
.text-center {
  color: #fff;
  text-transform: uppercase;
  font-size: 30px;
  margin: 15px 0 30px 0;
  display: block;
  text-align: center;
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
.warning-hint {
  background-color: #e58f8f;
  height: 40px;
  border: 1px #b34141 solid;
  color: #b62d2f;
}
</style>
