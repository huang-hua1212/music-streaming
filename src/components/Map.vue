<template>
  <l-map ref="map" style="height: 50vh" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution" />
  </l-map>
  <button class="btn btn-primary" @click.prevent="makeCityBoundary">
    縣市邊界圖
  </button>
  <br />
  <input type="checkbox" id="r1" v-model="is_showBoundary" @change="change()" />
  <label for="r1" style="color: #f2f2f2"><span></span>縣市邊界圖</label>
  <br />
  <input type="checkbox" id="r2" name="rr" />
  <label for="r2" style="color: #f2f2f2"><span></span>Radio Button 2</label>
</template>
<script>
// 參考: https://ithelp.ithome.com.tw/articles/10230107?sc=pt
// npm install @vue-leaflet/vue-leaflet
// npm install leaflet
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'; // LGeoJson
import axios from 'axios';

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 16,
      center: [22.612961, 120.304167],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      is_showBoundary: false,
    };
  },
  created() {
    this.getCityBoundaryjson();
  },
  mounted() {},
  methods: {
    async beforeMount() {
      // HERE is where to load Leaflet components!
      // const { circleMarker } = await import('leaflet/dist/leaflet-src.esm');

      // And now the Leaflet circleMarker function can be used by the options:
      // this.geojsonOptions.pointToLayer =
      //   (feature, latLng) => circleMarker(latLng, { radius: 8 });
      this.mapIsReady = true;
    },
    makeCityBoundary() {
      this.is_showBoundary = true;
    },
    getCityBoundaryjson() {
      axios
        .get(
          'https://raw.githubusercontent.com/huang-hua1212/taiwan.json/main/taiwan.json',
        )
        .then((res) => {
          this.geojson.features = res.data.features;
        });
    },
  },
};
</script>
