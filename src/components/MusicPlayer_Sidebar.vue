<template>
  <div>
    <div id="mySidebar" class="sidebar"
    :style="{ width: width + 'vh' }">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()">×</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>

    <div id="main" :class = '{openMain: openMain}'>
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
      this.width = 45;
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
.openMain{
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
  opacity: 0.4;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidebar a {
    text-align: right;
  padding: 8px 32px 8px 8px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
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
  margin-left: 3vh;
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
