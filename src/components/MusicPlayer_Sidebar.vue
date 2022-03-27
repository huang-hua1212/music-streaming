<template>
  <div>
    <div id="mySidebar" class="sidebar" :style="{ width: width + 'vh' }">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()">×</a>
      <div>
        <h3
          style="
            font-weight: bold;
            color: white;
            margin-left: 3vh;
            margin-top: 4.5vh;
          "
        >
          PlayList
        </h3>
      </div>
      <div
        class="container row"
        v-for="item in songs"
        :key="item"
        v-show="songs"
        style = 'margin-top: 5vh;padding-right: 1vh;
        padding-left: 5vh;'
      >
        <div
          class="col-auto"
          style="width: 8vh; height: 8vh; padding: 0"
        >
          <img
            style="width: 100%; height: 100%"
            :src="item.album.images[1].url"
          />
        </div>
        <div
          class="col-auto"
          style="
            width: 60%;
            color: white;
            padding-top: 1.5vh;
            padding-right: 0.3vh;
          "
        >
          <p style="font-size: 1vh">{{ item.name }}</p>
        </div>
        <!-- <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a> -->
        <div
          class="col-auto"
          style="color: white; font-size: 3vh;padding: 0"
        >
          <a href="#" style="padding-right: 1.2vh">
            <font-awesome-icon icon="ellipsis" size="1x" />
          </a>
        </div>

        <div
          class="col-auto"
          style="color: white;padding: 0;
          padding-top: 1.2vh;"
        >
          <a href="#" style="padding-right: 0.5vh; font-size: 2.6vh; ">☰</a>
        </div>
      </div>
    </div>

    <div id="main" :class="{ openMain: openMain }">
      <button class="openbtn" @click="openNav()">☰ Music</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['songs'],
  data() {
    return {
      openMain: false,
      width: 0,
      chartPlayList: [],
    };
  },
  methods: {
    openNav() {
      this.width = 49;
      this.openMain = true;
    },
    closeNav() {
      this.width = 0;
      this.openMain = false;
    },
  },
};
</script>
<style lang= 'scss' scoped>
/* .openSideBar{
  width: 80vh;
} */
.fa-1x{
    font-size: 0.5em;
}
.openMain {
  margin-right: 45vh;
  visibility: hidden;
}
/* .closeSideBar{
} */
.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0); /**#111 */
  opacity: 0.6;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidebar a {
  text-align: right;
  padding: 8px 32px 8px 8px;
  text-decoration: none;
  font-size: 25px;
  color: #fafafa;
  display: block;
  transition: 0.3s;
}

.sidebar a:hover {
  color: #f1f1f1;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  left: 0vh;
  font-size: 36px;
  margin-left: 1.4vh;
}

.openbtn {
  position: fixed;
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
  /* 新增 */
  /* float:right; */
  right: 5vh;
  top: 10vh;
}

.openbtn:hover {
  background-color: #444;
}

#main {
  /* transition: margin-left 0.5s; */
  transition: margin-right 0.5s;
  padding: 16px;
}

@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
/* 參考:
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapse_sidebar */
</style>
