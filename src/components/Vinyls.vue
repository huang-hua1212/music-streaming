<template>
  <!-- 依據自己上傳的資料進行網頁之撰寫
因此語言需自己設定 -->
  <div class="text-white">
    <div
      class="conditionFilter container"
      style="max-width: 70%; margin-left: 15%; margin-top: 4%; font-size: 2.3vh"
    >
      <div class="row">
        <div
          class="yearTitle col-auto"
          style="
            min-width: 12%;
            text-align: center;
            margin-right: 1.8vh;
            border: yellow solid;
            border-radius: 5px;
            background: yellow;
            color: black;
            font-weight: bold;
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
          <a href="#" @click.prevent="activate('gender', conditionFilter.gender, item)">{{
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
            margin-right: 1.8vh;
            border: yellow solid;
            border-radius: 5px;
            background: yellow;
            color: black;
            font-weight: bold;
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
            @click.prevent="activate('language', conditionFilter.language, item)"
            >{{ item.name }}</a
          >
        </div>
      </div>

      <div class="row mt-3">
        <div
          class="yearTitle col-auto"
          style="max-width: 15%; margin-right: 2.2vh;
          border: yellow solid;
          border-radius: 5px;
            background: yellow;
            color: black;
            font-weight: bold;"
        >
          Release Year
        </div>
        <div
          class="yearItem col-auto"
          style="margin-left: 0.75%;"
          :class="{ active: item.isActive }"
          v-for="item in conditionFilter.yearList"
          :key="item"
        >
          <a
            href="#"
            @click.prevent="activate('year', conditionFilter.yearList, item)"
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
            margin-right: 2.2vh;
            border: yellow solid;
            border-radius: 5px;
            background: yellow;
            color: black;
            font-weight: bold;
            max-height: 3.6vh;
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
              @click.prevent="activate('genre', conditionFilter.genre, item)"
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
      border-bottom: yellow solid;
      max-width: 90%;
      margin-top:2%;
      margin-left: 5%;
      font-size: 3.2vh;
    "
  >
    <span><p style="padding-left: 20px; margin-bottom: 0;
    font-style: italic;">
       {{conditionIsActive.gender}}
      /{{conditionIsActive.language}}
      /{{conditionIsActive.year}}
      /{{conditionIsActive.genre}}</p></span>
  </div>
  <div
    class="content container"
    style="
      height: auto;
      padding-top: 1.3vh;
      max-width: 90%;
      margin-left: 5%;
    "
  >
    <div
      class="row recordDisplay"
      style="height: auto;"
    >
      <div
        class="col-auto"
        style="
          width: 22%;
          margin-left: 2.4%;
          margin-bottom: 2%;
          padding: 0;
        "
        v-for="item in data"
        :key=item.id
      >
        <div class="card" style="width: 100%">
          <router-link :to = "`/record-shop/vinyls/${item.id}`">
          <img class="card-img-top" alt="圖片未加載完成" :src = "item.imageUrl"/>
          </router-link>
          <div class="card-body">
            <p class="card-title" style="text-align: center; font-size: 17px;">{{item.title}}</p>
            <p class="card-title" style="text-align: center;">{{item.singer}}</p>
            <a href="#" class="btn btn-add-cart"
            @click.prevent="addProduct(item)">add cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Progress bar -->
  <div style="position: relative">
      <loading
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="true"
      />
    </div>

      <!-- ADD CART SUCCESS ANIMATION -->
  <svg
    class="checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    style="position: absolute; z-index: 100; left: 100vh"
    :style = "{top: window.y + 'vh'}"
    v-show="isSuccess"
  >
    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
  </svg>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';

export default {
  data() {
    return {
      isSuccess: false,
      isLoading: false,
      window: {
        y: 0,
      },
      data: [],
      conditionIsActive: {
        year: 'All',
        genre: 'All',
        gender: 'All',
        language: 'All',
      },
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
  components: { Loading },
  created() {
    this.getYearList();
    this.productsIn();
  },
  methods: {
    showSuccessAnimation() {
      this.window.y = 100 * (window.scrollY / window.innerHeight) + 30;
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 1200);
    },
    showLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 970);
    },
    productsIn(page = 1) {
      const changeToPage = page;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${changeToPage}`;
      axios
        .get(url)
        .then((res) => {
          this.data = res.data.products.filter((ele) => ele.category === 'Vinyls');
        });
    },
    addProduct(temp) {
      const tempInFunction = temp;
      tempInFunction.num = 1;
      const cart = {
        product_id: temp.id,
        qty: temp.num,
      };
      axios
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          {
            data: cart,
          },
        )
        .then(() => {
          // this.showLoading();
          this.computProductLength();
          this.showSuccessAnimation();
        });
    },
    computProductLength() {
      axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.productsInCartLength = res.data.data.carts.length;
          this.$emit('computeProductLength', this.productsInCartLength);
        });
    },
    getYearList() {
      const nowYear = new Date(Date.now()).getFullYear();
      for (let i = 0; i < 10; i += 1) {
        const yearObject = { name: '', isActive: false };
        const year = nowYear - i;
        yearObject.name = year;
        this.conditionFilter.yearList.push(yearObject);
      }
    },
    activate(arryName, array, item) {
      this.conditionIsActive[arryName] = item.name;
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
  background-color: #2c2b2b;
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
.btn-add-cart{
   margin-top: 30px;
  margin-left: 33%;
  color: rgb(59, 56, 56);
  background-color: #ffd20a;
}

/* ADD CART SUCCESS ANIMATION */
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
</style>
