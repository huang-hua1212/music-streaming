<template>
  <nav class="navbar navbar-expand-sm">
    <div class="collapse navbar-collapse navbar-sty" id="navbarText">
      <ul class="navbar-nav mr-auto col-auto nav-left" style="font-size: 19px">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" href="#">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" href="#">Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" href="#">Aticles</router-link>
        </li>
      </ul>
      <ul class="nav-right navbar-nav mr-auto col-auto">
        <li
          class="nav-item login"
          style="
            overflow: hidden;
            padding-top: 8%;
            margin-left: 6px;
            padding-right: 3px;
          "
        >
          <a
            class="nav-link fs-4 personIcon"
            @click.prevent="
              {
                personMenuDropDown = !personMenuDropDown;
              }
            "
            href="#"
          >
            <font-awesome-icon
              style="margin-bottom: 10%"
              icon="user-astronaut"
              size="1.5x"
            ></font-awesome-icon>
            <span>&nbsp;</span>
          </a>
          <transition
            v-if="personMenuDropDown"
            name="fade"
            class="personDropDownMenu"
          >
            <div class="record-shop-dropdown-ul">
              <a href="#" @click.prevent="logout()"> Logout </a>
            </div></transition
          >
        </li>
      </ul>
    </div>
  </nav>
  <div class="content" style="margin-top: 5%">
    <div class="container" style="border: white solid; max-width: 75%">
      <div class="row">
        <div class="col-3" style="border: pink solid"></div>
        <div
          class="col-9 text-white container"
          style="border: yellow solid; padding: 0"
        >
          <ul style="border: white solid">
            <li class="row" style="margin: 0; border: yellow dashed">
              <h5 class="col-3" style="border: pink solid; margin-top: 1%">
                Product Name
              </h5>
              <h5 class="col-2" style="border: pink solid; margin-top: 1%">
                Price
              </h5>
              <h5 class="col-2" style="border: pink solid; margin-top: 1%">
                In Stock
              </h5>
              <h5 class="col-2" style="border: pink solid; margin-top: 1%">
                Available
              </h5>
              <h5
                class="col-3"
                style="border: pink solid; margin-x: 0; margin-top: 1%"
              >
                More
              </h5>
            </li>
            <li
              class="row"
              style="margin: 0; border: yellow dashed; padding-bottom: 13px"
            >
              <p
                class="col-3"
                style="
                  border: pink solid;
                  padding-bottom: 12px;
                  padding-top: 12px;.
                  margin-top: 1%;
                  margin-bottom: 0;
                "
              >
                AC/DC: LIVE AC/DC: LIVEAC/DC: LIVEAC/DC: LIVE
              </p>
              <p
                class="col-2"
                style="border: pink solid; margin-top: 1%; margin-bottom: 0"
              >
                Price
              </p>
              <p
                class="col-2"
                style="border: pink solid; margin-top: 1%; margin-bottom: 0"
              >
                In Stock
              </p>
              <p
                class="col-2"
                style="border: pink solid; margin-top: 1%; margin-bottom: 0"
              >
                Available
              </p>
              <div
                class="col-3 row"
                style="border: pink solid; margin-top: 1%; margin-left: 0"
              >
                <div
                  class="col-3 p-0"
                  style="
                    background-color: #ffeb0b;
                    border-radius: 3px;
                    margin-left: 20%;
                  "
                >
                  <a
                    type="button"
                    class="delete"
                    style="
                      color: black;
                      margin-left: 28%;
                      margin-top: 20%;
                      margin-bottom: 20%;
                    "
                  >
                    <font-awesome-icon
                      icon="pen-to-square"
                      size="2x"
                      style=""
                    />
                  </a>
                </div>
                <div
                  class="col-3 p-0"
                  style="
                    background-color: #c0392b;
                    border-radius: 3px;
                    margin-left: 13%;
                  "
                >
                  <a
                    type="button"
                    class="delete"
                    style="
                      color: white;
                      margin-left: 28%;
                      margin-top: 20%;
                      margin-bottom: 20%;
                    "
                  >
                    <font-awesome-icon icon="trash-can" size="2x" style="" />
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div
    style="
      background-color: #8d8c91;
      position: fixed;
      top: 150px;
      right: 0px;
      border: white solid;
    "
  >
    <a
      data-toggle="tooltip"
      title="新增資料"
      data-placement="left"
      href="#"
      @click="edit({})"
    >
      <p style="color: white; margin-bottom: 0%; padding: 10px">Add Product</p>
    </a>
  </div>

  <!-- Modal of Edit -->
  <div class="modal fade" id="modalEdit" tabindex="-1" ref="editmodal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">產品細節</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="nonEdit()"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-lg">
            <form id="formUploadProduct">
              <div class="row">
                <div class="col-4 ms-3">
                  <label for="productName">商品名稱</label>
                  <input
                    class="form-control"
                    id="productName"
                    placeholder="商品名稱"
                    v-model="temp.title"
                  />
                </div>
                <div class="form-check form-switch col-3 ms-4 pt-5">
                  <input
                    class="form-check-input"
                    v-model="temp.is_enabled"
                    true-value="1"
                    false="0"
                    type="checkbox"
                    id="isActivated"
                  />
                  <label class="form-check-label" for="isActivated"
                    >是否啟用</label
                  >
                </div>
              </div>

              <div class="row">
                <div class="col-6 ms-3 mt-2">
                  <label for="category">分類</label>
                  <br />
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="category"
                    v-model="temp.category"
                  >
                    <option disabled selected>分類選擇</option>
                    <option value="流行">流行</option>
                    <option value="民謠">民謠</option>
                    <option value="搖滾樂">搖滾樂</option>
                    <option value="藍調">藍調</option>
                    <option value="古典">古典</option>
                    <option value="饒舌">饒舌</option>
                    <option value="蛋糕">蛋糕</option>
                    <option value="甜甜圈">甜甜圈</option>
                  </select>
                </div>
                <div class="col-5 mt-2">
                  <label for="productUnit">單位</label>
                  <br />
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="productUnit"
                    v-model="temp.unit"
                  >
                    <option disabled selected>單位選擇</option>
                    <option value="張">張</option>
                    <option value="個">個</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-6 ms-3 mt-2">
                  <label for="originPrice">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="originPrice"
                    v-model.number="temp.origin_price"
                  />
                </div>
                <div class="col-5 mt-2">
                  <label for="price">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="temp.price"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-6 ms-3 mt-2">
                  <label for="inventory">庫存量</label>
                  <input
                    type="number"
                    class="form-control"
                    id="inventory"
                    v-model.number="temp.inventory"
                  />
                </div>
              </div>
              <br />
              <hr />
              <div class="col-6 ms-3 mt-2">
                <label for="description">商品描述</label>
                <textarea
                  id="description"
                  rows="3"
                  cols="82"
                  v-model="temp.description"
                ></textarea>
              </div>
              <div class="col-6 ms-3 mt-2">
                <label for="content">說明</label>
                <textarea
                  id="content"
                  rows="3"
                  cols="82"
                  v-model="temp.content"
                ></textarea>
              </div>
              <br />

              <hr />
              <div class="col-11 ms-3 mt-2" id="imgUpload">
                <!-- <label>照片上傳</label> -->
                <div class="container">
                  <div class="row">
                    <div class="col-4">
                      <label
                        for="fileUpload"
                        class="
                          imgUpload
                          btn btn-primary btn-block
                          rounded-pill
                          shadow
                          px-5
                        "
                        ><i class="fa fa-upload mr-2 me-2"></i
                        ><span class="me-2">照片上傳</span>
                        <input
                          id="fileUpload"
                          type="file"
                          @change="uploadImage($event)"
                        />
                      </label>
                    </div>
                    <div class="col-7 ms-5 px-0">
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          v-model="tempImgpath"
                          class="form-control"
                          aria-describedby="button-addon2"
                          placeholder="請輸入照片網址"
                        />
                        <button
                          class="btn btn-outline-secondary"
                          type="button"
                          id="button-addon2"
                          @click="uploadImage_byUrl()"
                        >
                          新增
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="container mt-3">
                  <div class="row">
                    <!-- <div class='col-auto ms-3 mt-2'> -->
                    <div
                      v-if="temp.imageUrl"
                      class="col-auto ms-3 mt-3 px-0 py-0 rounded"
                      id="deleteBtn"
                    >
                      <img
                        v-bind:src="temp.imageUrl"
                        style="border: dashed grey; height: 120px; width: auto"
                      />
                      <a class="nav-link" @click="deleteImage(0)">
                        <span>
                          <i class="fas fa-times-circle"></i>
                        </span>
                      </a>
                    </div>
                    <div
                      class="col-auto ms-3 mt-3 px-0 py-0 rounded"
                      v-for="(url, index) in temp.imagesUrl"
                      id="deleteBtn"
                      :key="index + 1"
                    >
                      <img
                        v-bind:src="url"
                        style="border: dashed grey; height: 120px; width: auto"
                      />
                      <a class="nav-link" @click="deleteImage(index + 1)">
                        <span>
                          <i class="fas fa-times-circle"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="nonEdit()"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="confirmEdit()"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-show="isShowProgressBar"
    class="spinner-border text-success"
    id="loading-circle"
    role="status"
    style="position: absolute; z-index: 100; bottom: 5%; right: 5%"
  >
    <!-- <span class="sr-only">Loading...</span> -->
  </div>
</template>
<script>
import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      temp: {},
      tempImgpath: '',
      productsInStock: [],
      productsInCart: [],
      isLogin: true,
      account: {
        userName: '',
        password: '',
      },
      sortSelectOptions: [
        {
          id: 0,
          sortBy: 'familiar',
          ascending: false,
          name: '熱門程度優先',
        },
        {
          id: 3,
          sortBy: 'price',
          ascending: true,
          name: '售價由低至高',
        },
        {
          id: 4,
          sortBy: 'price',
          ascending: false,
          name: '售價由高至低',
        },
      ],
      isShowProgressBar: false,
      modal: {
        editModal: '',
      },
      productsPagination: [],
      searchProducts: [],
      currentPage: 1,
      elePerPage: 2,
      totalPages: 0,
      searchValue: '',
      sort: {
        id: 1,
        sortBy: 'origin_price',
        ascending: true,
        name: '原價由低至高',
      },

      personMenuDropDown: false,
    };
  },
  created() {
    this.productsIn();
  },
  mounted() {
    this.modal.editmodal = new Modal(this.$refs.editmodal);
  },
  methods: {
    logout() {
      const url = `${process.env.VUE_APP_API}/logout`;
      axios
        .post(url)
        .then(() => {
          this.$route.push('/');
        })
        .catch((err) => {
          // alert('登出失敗');
          console.dir(err);
        });
    },
    productsIn(page = 1) {
      const changeToPage = page;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${changeToPage}`;
      axios
        .get(url)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(item) {
      this.temp = JSON.parse(JSON.stringify(item));
      this.modal.editmodal.show();
    },
  },
};
</script>
<style lang="scss" scoped>
//navbar
nav {
  background-color: #191919;
  padding-bottom: 0;
}
.navbar-sty {
  max-width: 75%;
  margin-left: 12.5%;
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

// nav left end

// 調整cart的icon的顏色
nav .navbar-nav li a {
  color: white;
  text-decoration: none;
}
// nav
// nav end
.personDropDownMenu {
  border: rgb(233, 233, 241) solid;
  cursor: pointer;
  right: 12.5%;
  border-radius: 5px;
  width: 7.5%;
  z-index: 100;
  background-color: #050505;
  position: absolute;
  padding-left: 3.2%;
}
.navbar-nav a li {
  color: white;
  text-decoration: none;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  text-decoration: none;
}
.delete .fa-2x {
  font-size: 1.5em;
}
</style>
