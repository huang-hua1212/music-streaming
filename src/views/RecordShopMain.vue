<template>
  <navbar-black></navbar-black>
  <div
    class="content container"
    style="height: 700px; width: 75%; margin-top: 5%"
  >
    <div class="chart-link">
      <div class="row" style="margin-top: 5%">
        <div
          class="col-auto text-white"
          style="
            margin-left: 6.66%;
            width: 40%;
            height: 280px;
            border: white solid;
            background: url('https://images.unsplash.com/photo-1520011980943-c1c29bb73d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
            background-size: cover;
          "
        >
          <router-link
            to="/record-shop/cds"
            style="
              text-align: center;
            "
          >
            <h1 style="margin-top: 20%">CDs</h1>
            <p style="font-size: 14px">shop now</p>
          </router-link>
        </div>
        <div
          class="col-auto text-white"
          style="
            margin-left: 6.66%;
            width: 40%;
            height: 280px;
            border: white solid;
            background: url('https://images.unsplash.com/photo-1582751836565-74f64cc184cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
            background-size: cover;
          "
        >
          <router-link to="/record-shop/vinyls" style="text-align: center">
            <h1 style="margin-top: 20%">Vinyls</h1>
            <p style="font-size: 14px">shop now</p>
          </router-link>
        </div>
      </div>
      <div class="row" style="margin-top: 5%">
        <div
          class="col-auto text-white"
          style="
            margin-left: 6.66%;
            width: 40%;
            height: 280px;
            border: white solid;
            background: url('https://images.unsplash.com/photo-1590238535858-95fbdfa0e79d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80');
            background-size: cover;
          "
        >
          <router-link to="/record-shop/dvds" style="text-align: center">
            <h1 style="margin-top: 20%">DVDs</h1>
            <p style="font-size: 14px">shop now</p>
          </router-link>
        </div>
        <div
          class="col-auto text-white"
          style="
            margin-left: 6.66%;
            width: 40%;
            height: 280px;
            border: white solid;
            background: url('https://images.unsplash.com/photo-1614239685131-ca9ca11657ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80');
            background-size: cover;
          "
        >
          <router-link to="/record-shop/blu-ray_discs" style="text-align: center">
            <h1 style="margin-top: 20%">Blu-ray-Discs</h1>
            <p style="font-size: 14px">shop now</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>

   <footer
    class="footer text-white"
    style="
      margin-top: 10%;
      margin-bottom: 0;
      width: 100%;
      height: 120px;
      text-align: center;
      padding: 2%;
    "
  >
    <img
      style="width: 100px; height: 40px"
      src="https://storage.googleapis.com/vue-course-api.appspot.com/record-shop/1647107643454.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kqRZZ03yHPmRgXpQb6LdfwfDPUU8qcfStNPiCsglNAomY%2BncZLFA9zAp8nGEJFyF8ada8XAWBxcVxV9NmqC3vx8LsQISVkalgAoM3Syzx4u%2BasVYFB7LjqHJ20EevMHd5WWFr2rq4tr4gVl84MpRRC9kCf%2BDpTKGNwoEwmANlVTs1ZARLB1gPz3Skua%2BCpYPVWVj2Em8TAzNMq4%2B7NjpRD%2Fx9Z3PWOxQ20d0GAlg%2BTt7d18BIahDFjzEGru0LHydr5EI%2F%2BFEF8ZzzFx0T2KFKMSp7XtphZEUlPep73T%2BXO9K86HEWIbxE5hy7Q7OOzYpRanRXNcNx%2Bl4FBJDfY4%2B0w%3D%3D"
    />
    <div>
      <h5>Copyright © 2022 hua</h5>
    </div>
  </footer>
</template>
<script>
import NavbarBlack from '@/components/NavbarBlack.vue';

export default {
  data() {
    return {};
  },
  components: {
    NavbarBlack,
  },
};
</script>
<style lang = 'scss' scoped>
.chart-link a {
  color: white;
  text-decoration: none;
}
.footer {
  background-color: #000000;
}
</style>
