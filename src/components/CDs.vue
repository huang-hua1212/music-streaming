<template>
  <!-- 依據自己上傳的資料進行網頁之撰寫
因此語言需自己設定 -->
  <div class="text-white">
    <!-- <div><h5>Condition Filter:</h5></div> -->
    <div
      class="conditionFilter container"
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
          class="yearItem col-auto"
          style="margin-left: 1%"
          :class="{ active: item.isActive }"
          v-for="item in conditionFilter.gender"
          :key="item"
        >
          <a href="#" @click.prevent="activate(conditionFilter.gender, item)">{{
            item.name
          }}</a>
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
          class="yearItem col-auto"
          style="margin-left: 1%"
          :class="{ active: item.isActive }"
          v-for="item in conditionFilter.language"
          :key="item"
        >
          <a
            href="#"
            @click.prevent="activate(conditionFilter.language, item)"
            >{{ item.name }}</a
          >
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
          class="yearItem col-auto"
          style="margin-left: 1%"
          :class="{ active: item.isActive }"
          v-for="item in conditionFilter.yearList"
          :key="item"
        >
          <a
            href="#"
            @click.prevent="activate(conditionFilter.yearList, item)"
            >{{ item.name }}</a
          >
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
            class="yearItem col-auto"
            style="margin-left: 1%; margin-bottom: 2%"
            :class="{ active: item.isActive }"
            v-for="item in conditionFilter.genre"
            :key="item"
          >
            <a
              href="#"
              @click.prevent="activate(conditionFilter.genre, item)"
              >{{ item.name }}</a
            >
          </div>
        </div>
      </div>
    </div>
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
      <!-- <div
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
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div> -->

      <div
        class="col-auto"
        style="
          width: 22%;
          margin-left: 2.4%;
          margin-bottom: 2%;
          border: pink solid;
          padding: 0;
        "
        v-for="item in data"
        :key=item.id
      >
        <div class="card" style="width: 100%">
          <img class="card-img-top" alt="Card image cap" :src = "item.imageUrl"/>
          <div class="card-body">
            <p class="card-title" style="text-align: center; font-size: 17px;">{{item.title}}</p>
            <p class="card-title" style="text-align: center;">{{item.singer}}</p>
            <p class="card-text" id="money">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <!-- <div
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
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      conditionIsActive: {},
      conditionFilter: {
        yearList: [{ name: 'All', isActive: true }],
        genre: [
          {
            name: 'All',
            isActive: true,
          },
          {
            name: 'Indie Collection',
            isActive: false,
          },
          {
            name: 'Bossa Nova',
            isActive: false,
          },
          {
            name: 'BLUES',
            isActive: false,
          },
          {
            name: 'K-POP',
            isActive: false,
          },
          {
            name: 'R&B',
            isActive: false,
          },
          {
            name: 'Classical',
            isActive: false,
          },
          {
            name: 'Metal Rock',
            isActive: false,
          },
          {
            name: 'Punk Rock',
            isActive: false,
          },
          {
            name: 'House',
            isActive: false,
          },
          {
            name: 'Rap',
            isActive: false,
          },
          {
            name: 'Folk',
            isActive: false,
          },
        ],
        gender: [
          {
            name: 'All',
            isActive: true,
          },
          { name: 'Male', isActive: false },
          {
            name: 'Female',
            isActive: false,
          },
          {
            name: 'Group',
            isActive: false,
          },
        ],
        language: [
          { name: 'All', isActive: true },
          { name: '華語', isActive: false },
          { name: '英文', isActive: false },
          {
            name: '韓文',
            isActive: false,
          },
          { name: '廣東話', isActive: false },
          {
            name: '西班牙語',
            isActive: false,
          },
        ],
      },
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const cookieToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      // axios.defaults.headers.common['Authorization']，作為axios的post參數
      axios.defaults.headers.common.Authorization = cookieToken;

      // 驗證是否登入
      axios
        .post(
          `https://all-the-cors.herokuapp.com/${process.env.VUE_APP_API}/api/user/check`,
        )
        .then((res) => {
          console.log(res);
          this.getYearList();
          this.productsIn();
        })
        .catch(() => {
          // check錯誤，會回到首頁
          this.$router.push('/');
        });
    },
    productsIn(page = 1) {
      const changeToPage = page;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${changeToPage}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.products);
          this.data = res.data.products.filter((ele) => ele.category === 'CDs');
          // const resAllKey = Object.keys(res.data.products);
          // const resAllValues = Object.values(res.data.products);
          // const arrRes = resAllValues;
          // for (let i = 0; i < resAllKey.length; i += 1) {
          //   arrRes.id = resAllKey[i];
          // }
          // this.data = arrRes;
          // console.log(this.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getYearList() {
      const nowYear = new Date(Date.now()).getFullYear();
      console.log(nowYear);
      for (let i = 0; i < 10; i += 1) {
        const yearObject = { name: '', isActive: false };
        const year = nowYear - i;
        yearObject.name = year;
        this.conditionFilter.yearList.push(yearObject);
      }
    },
    activate(array, item) {
      array.forEach((el) => {
        const ele = el;
        if (ele.name === item.name) {
          ele.isActive = true;
        } else {
          ele.isActive = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  background-color: #191919;
  color: white;
}
a {
  color: white;
  text-decoration: none;
}
.conditionFilter .active {
  background-color: rgb(255, 255, 0);
  border-radius: 3px;
  & a {
    color: black;
    font-weight: bold;
  }
}
</style>
