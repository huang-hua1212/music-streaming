<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
  <!-- {{ name }} -->
</template>
<script>
export default {
  data() {
    return {
      name: process.env.VUE_APP_NAME,
    };
  },
};
</script>
