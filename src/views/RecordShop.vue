<template>

<navbar-black></navbar-black>

<router-view/>

</template>

<script>
import NavbarBlack from '@/components/NavbarBlack.vue';

export default {
  data() {
    return {

    };
  },
  components: { NavbarBlack },
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
