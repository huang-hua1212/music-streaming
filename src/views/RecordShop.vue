<template>
<nav class="navbar navbar-expand-sm">
    <div class="collapse navbar-collapse navbar-sty" id="navbarText">
      <ul class="navbar-nav mr-auto col-auto nav-left" style="font-size: 19px">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" href="#">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link record-shop"
            href="#"
            @mouseover="
              {
                recordShopDropDown = !recordShopDropDown;
              }
            "
            >Record Shop</router-link
          >
          <transition
            name="fade"
            class="record-shop-dropdown"
            v-if="recordShopDropDown"
            @mouseenter="
              {
                recordShopDropDown = true;
              }
            "
            @mouseleave="
              {
                recordShopDropDown = false;
              }
            "
          >
            <ul class="record-shop-dropdown-ul">
              <li style="margin-top: 8px">
                <router-link to="/record-shop/">CDs</router-link>
              </li>
              <li>
                <router-link to="/record-shop/CDs">Vinyls</router-link>
              </li>
              <li>
                <router-link to="/record-shop/Vinyls"
                  >DVDs</router-link
                >
              </li>
              <li>
                <router-link to="/record-shop/Blu-ray_Disc"
                  >Blu-ray Disc</router-link
                >
              </li>
            </ul>
          </transition>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" href="#"
            >Latest News</router-link
          >
        </li>
      </ul>
      <ul class="nav-right navbar-nav mr-auto col-auto">
        <li class="nav-item fs-5">
          <div style="max-width: auto">
            <a
              class="nav-link"
              id="navbarDropdownCart"
              role="button"
              @click.prevent="openCartModal"
            >
              <font-awesome-icon icon="cart-shopping" size="1x" />
              <div v-if="productsInCartLength">
                <span class="badge rounded-pill badge-notification bg-danger">
                  {{ productsInCartLength }}
                </span>
              </div>
            </a>
          </div>
        </li>
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
            class="nav-link fs-4"
            id="navbarDropdownPersonProfile "
            role="button"
            aria-expanded="false"
            v-if="isLogin"
            href="#"
          >
            <i class="bi bi-person-lines-fill"></i>
            <span>&nbsp;</span>
          </a>

          <a
            v-else
            href="#"
            @click.prevent="openLoginModal"
            style="padding-top: 50%; margin-top: 30%; font-size: 19px"
          >
            LogIn
          </a>
        </li>
      </ul>
    </div>
  </nav>

<router-view/>

</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" scoped>
/*NavBar left部分 */
nav {
  background-color: #191919;
  padding-bottom: 0;
}
.navbar-sty {
  max-width: 75%;
  margin-left: 12.5%;
}

.nav-carousel-inner > .carousel-item img,
.nav-carousel-inner > .carousel-item a img {
  width: 75%;
  max-height: 550px;
  margin: auto;
}
.navCarousel-prev-icon {
  margin-bottom: 50%;
  margin-left: 20px;
}
.navCarousel-next-icon {
  margin-bottom: 50%;
  margin-right: 20px;
}
.carousel-control-next,
.carousel-control-prev {
  width: 12%;
}

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
.nav-link span {
  position: relative;
  top: -45px;
  right: -50%;
  font-size: 35%;
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

/** nav link hover effect*/
.nav-right .login {
  padding-left: 2px;
  padding-right: 2px;
  cursor: pointer;
  position: relative;
  margin-bottom: 3px;
  margin-right: 12px;
}

.nav-right .login::after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 1px;

  background-color: #ffffff;
  transition: all 0.3s;
}
.nav-right .login::after {
  left: 0;
  bottom: 0;
}
.nav-right .login:hover::after {
  width: 100%;
}
// nav right

</style>
