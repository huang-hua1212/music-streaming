<template>
  <nav class="navbar navbar-expand-sm">
    <div class="collapse navbar-collapse navbar-sty" id="navbarText">
      <ul class="navbar-nav mr-auto col-auto nav-left" style="font-size: 19px">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" href="#">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" href="#">Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" href="#">Aticles</router-link>
        </li>
      </ul>
      <ul class="nav-right navbar-nav mr-auto col-auto">
        <li
          class="nav-item login"
          style="
            overflow: hidden;
            padding-top: 8%;
            margin-left: 6px;
            padding-right: 3px;
          "
        >
          <a
            class="nav-link fs-4 personIcon"
            @click.prevent="
              {
                personMenuDropDown = !personMenuDropDown;
              }
            "
            href="#"
          >
            <font-awesome-icon
              style="margin-bottom: 10%"
              icon="user-astronaut"
              size="1.5x"
            ></font-awesome-icon>
            <span>&nbsp;</span>
          </a>
          <transition
            v-if="personMenuDropDown"
            name="fade"
            class="personDropDownMenu"
          >
            <div class="record-shop-dropdown-ul">
              <a href="#" @click.prevent="logout()"> Logout </a>
            </div></transition
          >
        </li>
      </ul>
    </div>
  </nav>
  <div class="content" style="margin-top: 5%">
    <div class="container" style="border: white solid; max-width: 75%">
      <div class="row">
        <div class="col-3" style="border: pink solid"></div>
        <div
          class="col-9 text-white container"
          style="border: yellow solid; padding: 0"
        >
          <ul style="border: white solid">
            <li class="row"  style="margin: 0;">
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-4" style="border:pink solid;">123</div>
            </li>
            <li class="row"  style="margin: 0;">
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-4" style="border:pink solid;">123</div>
            </li>
            <li class="row"  style="margin: 0;">
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-4" style="border:pink solid;">123</div>
            </li>
            <li class="row"  style="margin: 0;">
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-2" style="border:pink solid;">123</div>
              <div class="col-4" style="border:pink solid;">123</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      personMenuDropDown: false,
    };
  },
  created() {
    this.productsIn();
  },
  methods: {
    logout() {},
    productsIn() {
      const page = 1;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
//navbar
nav {
  background-color: #191919;
  padding-bottom: 0;
}
.navbar-sty {
  max-width: 75%;
  margin-left: 12.5%;
}

/** nav link hover effect*/
.nav-left li {
  padding-left: 2px;
  padding-right: 2px;
  cursor: pointer;
  position: relative;
}

.nav-left li::after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 1px;
  background-color: #ffffff;
  transition: all 0.3s;
}
.nav-left li::after {
  left: 0;
  bottom: 0;
}
.nav-left li:hover::after {
  width: 100%;
}
// nav left end

// 調整cart的icon的顏色
nav .navbar-nav li a {
  color: white;
  text-decoration: none;
}
// nav
.nav-right {
  max-height: 50px;
  margin-left: auto;
  // padding-bottom:0;
}

// nav left end

// 調整cart的icon的顏色
nav .navbar-nav li a {
  color: white;
  text-decoration: none;
}
// nav
// nav end
.personDropDownMenu {
  border: rgb(233, 233, 241) solid;
  cursor: pointer;
  right: 12.5%;
  border-radius: 5px;
  width: 7.5%;
  z-index: 100;
  background-color: #050505;
  position: absolute;
  padding-left: 3.2%;
}
.navbar-nav a li {
  color: white;
  text-decoration: none;
}
ul {
  list-style-type: none;
  padding: 0;
}

</style>
