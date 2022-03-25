<template>
<navbar-black ref="callNavModal"></navbar-black>
  <div></div>
</template>
<script>
import NavbarBlack from '@/components/NavbarBlack.vue';
import axios from "axios";
export default {
  data() {
    return {};
  },
  components: { NavbarBlack },
  created(){
      this.contentIn();
  },
  methods: {
    contentIn() {
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
};
</script>
