<template>
  <!-- 依據自己上傳的資料進行網頁之撰寫
因此語言需自己設定 -->
  <div class="text-white">
    <div><h5>Condition Filter:</h5></div>
    <div
      class="container"
      style="max-width: 70%; margin-left: 15%; margin-top: 4%; font-size: 17px"
    >
      <!-- <h5>出版年份(Release Date:)</h5> -->
      <div class="row">
        <div
          class="yearTitle col-auto"
          style="
            min-width: 12%;
            text-align: center;
            margin-right: 15px;
            border: yellow solid;
          "
        >
          Gender
        </div>
        <div
          class="yearItem col-auto active"
          style="border: white solid; margin-left: 1%"
        >
          All
        </div>
        <div
          class="yearItem col-auto"
          style="border: white solid; margin-left: 1%"
          v-for="item in conditionFilter.gender"
          :key="item"
        >
          {{ item }}
        </div>
      </div>

      <div class="row mt-3">
        <div
          class="yearTitle col-auto"
          style="
            min-width: 12%;
            text-align: center;
            margin-right: 15px;
            border: yellow solid;
          "
        >
          Language
        </div>
        <div
          class="yearItem col-auto active"
          style="border: white solid; margin-left: 1%"
        >
          All
        </div>
        <div
          class="yearItem col-auto"
          style="border: white solid; margin-left: 1%"
          v-for="item in conditionFilter.language"
          :key="item"
        >
          {{ item }}
        </div>
      </div>

      <div class="row mt-3">
        <div
          class="yearTitle col-auto"
          style="max-width: 15%; margin-right: 15px; border: yellow solid"
        >
          Release Year
        </div>
        <div
          class="yearItem col-auto active"
          style="border: white solid; margin-left: 1%"
        >
          All
        </div>
        <div
          class="yearItem col-auto"
          style="border: white solid; margin-left: 1%"
          v-for="item in conditionFilter.yearList"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
      <div class="row mt-3">
        <div
          class="yearTitle col-auto"
          style="
            min-width: 12%;
            text-align: center;
            margin-right: 15px;
            border: yellow solid;
          "
        >
          Genre
        </div>
        <div class="col-auto row" style="max-width: 83%">
          <div
            class="yearItem col-auto active"
            style="border: white solid; margin-left: 1%; margin-bottom: 2%"
          >
            All
          </div>

          <div
            class="yearItem col-auto"
            style="border: white solid; margin-left: 1%; margin-bottom: 2%"
            v-for="item in conditionFilter.genre"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div><h5>Genre(Genre:)</h5></div>
    <div><h5>售價(Price:)</h5></div>
    <div><h5>男歌手女歌手(Gender:)</h5></div>
    <div><h5>國家(Country:)</h5></div>
    <div><h5>語言(Language:)</h5></div>
  </div>
  <!-- 參考:https://towerrecords.com/collections/vinyl?filters%5Bin_stock%5D%5B0%5D=No&filters%5Bin_stock%5D%5B1%5D=No&filters%5Bin_stock%5D%5B2%5D=No -->

  <div
    style="
      color: yellow;
      border-bottom: yellow dashed;
      max-width: 90%;
      margin-left: 5%;
      font-size: 19px;
    "
  >
    <span><p style="padding-left: 20px; margin-bottom: 0">123456</p></span>
  </div>
  <div
    class="content container"
    style="
      border: white solid;
      height: 800px;
      padding-top: 40px;
      max-width: 90%;
      margin-left: 5%;
    "
  >
    <div
      class="row recordDisplay"
      style="height: auto; border: yellow solid; border-top: pink dashed"
    >
      <div
        class="col-auto"
        style="
          width: 23%;
          margin-left: 1.6%;
          margin-bottom: 2%;
          border: pink solid;
          padding: 0;
        "
      >
        <div class="card" style="width: 100%">
          <img class="card-img-top" src="" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>

      <div
        class="col-auto"
        style="
          width: 23%;
          margin-left: 1.6%;
          margin-bottom: 2%;
          border: pink solid;
          padding: 0;
        "
      >
        <div class="card" style="width: 100%">
          <img class="card-img-top" src="" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div
        class="col-auto"
        style="
          width: 23%;
          margin-left: 1.6%;
          margin-bottom: 2%;
          border: pink solid;
          padding: 0;
        "
      >
        <div class="card" style="width: 100%">
          <img class="card-img-top" src="" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div
        class="col-auto"
        style="
          width: 23%;
          margin-left: 1.6%;
          margin-bottom: 2%;
          border: pink solid;
          padding: 0;
        "
      >
        <div class="card" style="width: 100%">
          <img class="card-img-top" src="" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div
        class="col-auto"
        style="
          width: 23%;
          margin-left: 1.6%;
          margin-bottom: 2%;
          border: pink solid;
          padding: 0;
        "
      >
        <div class="card" style="width: 100%">
          <img class="card-img-top" src="" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conditionFilter: {
        yearList: [],
        genre: [
          'Indie Collection',
          'Bossa Nova',
          'BLUES',
          'K-POP',
          'R&B',
          'Classical',
          'Metal Rock',
          'Punk Rock',
          'House',
          'Rap',
          'Folk',
        ],
        gender: ['Male', 'Female', 'Group'],
        language: ['華語', '英文', '韓文', '廣東話', '西班牙語'],
      },
    };
  },
  created() {
    this.getYearList();
  },
  methods: {
    getYearList() {
      const nowYear = new Date(Date.now()).getFullYear();
      console.log(nowYear);
      for (let i = 0; i < 10; i += 1) {
        const year = nowYear - i;
        this.conditionFilter.yearList.push(year);
        console.log(year);
      }
      console.log(this.conditionFilter.yearList);
    },
  },
};
</script>
<style lang="scss" scoped>
.card{
  background-color: #191919;
  color: white;
}
</style>
