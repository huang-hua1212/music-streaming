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
          <router-link to="/" class="nav-link" href="#">Articles</router-link>
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
        <div class="col-3"></div>
        <div
          id = 'products-table'
          class="col-9 text-white container"
        >
          <ul>
            <li class="row" style="margin: 0;">
              <h5 class="col-3" style="margin-top: 1%">
                Product Name
              </h5>
              <h5 class="col-2" style="margin-top: 1%">
                Price
              </h5>
              <h5 class="col-2" style="margin-top: 1%">
                In Stock
              </h5>
              <h5 class="col-2" style="margin-top: 1%">
                Available
              </h5>
              <h5
                class="col-3"
                style="margin-x: 0; margin-top: 1%"
              >
                More
              </h5>
            </li>
            <li
              class="row"
              style="
                margin: 0;
                padding-top: 2vh;
                padding-bottom: 2vh;
              "
              v-for = 'item in productsInStock'
              :key = 'item.id'
            >
              <p
                class="col-3 m-0"
                style="
                  font-size:2.5vh;
                  padding-bottom: 1.5vh;
                  padding-top: 2.5vh;.
                "
              >
                {{item.title}}
              </p>
              <p
                class="col-2 m-0"
                style="
                font-size: 2.2vh;
                  padding-bottom: 1.5vh;
                  padding-top: 2.5vh;
                  "
              >
                {{item.price}}
              </p>
              <p
                class="col-2 m-0"
                style="
                font-size:2.5vh;
                  padding-bottom: 1.5vh;
                  padding-top: 2.5vh;
                 "
              >
                {{item.inventory}}
              </p>
              <p
                class="col-2 m-0"
                style="
                font-size: 2.5vh;
                  padding-bottom: 1.5vh;
                  padding-top: 2.5vh;
                  "
              >
                {{item.is_enabled === '1' ? '啟用' : '未啟用'}}
              </p>
              <div
                class="col-3 row m-0"
                style="
                  padding-bottom: 1.5vh;
                  padding-top: 2.5vh;
                  margin-top: 0;
                 "
              >
              <!-- 編輯Product -->
                <div
                  class="col-3 p-0"
                  style="
                    background-color: #ffeb0b;
                    border-radius: 0.5vh;
                    margin-left: 0vh;
                    height: 48px;
                  "
                >
                  <a
                    type="button"
                    class="delete"
                    style="
                      color: black;
                      margin-left: 26%;
                      margin-top: 25%;
                      margin-bottom: 15%;
                    "
                    @click.prevent = 'openEditProductModal(item)'
                  >
                    <font-awesome-icon
                      icon="pen-to-square"
                      size="2x"
                      style=""
                    />
                  </a>
                </div>
              <!-- 刪除Product -->
                <div
                  class="col-3 p-0"
                  style="
                    background-color: #c0392b;
                    border-radius: 3px;
                    margin-left: 13%;
                    height: 48px;
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

          <back-pagination :pages = 'totalPages'
          @changePage = 'productsIn'
          style = 'margin-top: 7%;'></back-pagination>
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
      @click.prevent="openEditProductModal({})"
    >
      <p style="color: white; margin-bottom: 0%; padding: 10px">Add Product</p>
    </a>
  </div>

 

  <!-- Modal of Edit -->
  <!-- <div class="modal fade" id="modalEdit" tabindex="-1" ref="editmodal">
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
                <div class="col-5 ms-3 mt-2">
                  <label for="category">分類</label>
                  <br />
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="category"
                    v-model="temp.category"
                  >
                    <option disabled selected>分類選擇</option>
                    <option value="CDs">CDs</option>
                    <option value="DVDs">DVDs</option>
                    <option value="Vinyls">Vinyls</option>
                    <option value="BluRayDisc">BluRayDisc</option>
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
                <div class="col-5 ms-3 mt-2">
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
                <div class="col-5 ms-3 mt-2">
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
              <div class="row">
                <div class="col-5 ms-3 mt-2">
                  <label for="gender">歌手性別</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="gender"
                    v-model="temp.gender"
                  >
                    <option disabled selected>選擇</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Group">Group</option>
                  </select>
                </div>
                <div class="col-5 ms-3 mt-2">
                  <label for="lauguage">語言</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="language"
                    v-model="temp.language"
                  >
                    <option disabled selected>選擇</option>
                    <option value="華語">華語</option>
                    <option value="英文">英文</option>
                    <option value="韓文">韓文</option>
                    <option value="廣東話">廣東話</option>
                    <option value="西班牙語">西班牙語</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-5 ms-3 mt-2">
                  <label for="gender">出版年份</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="releaseYear"
                    v-model="temp.releaseYear"
                  >
                    <option disabled selected>選擇</option>
                    <option v-for="it in yearList" :key="it" value="it">
                      {{ it }}
                    </option>
                  </select>
                </div>
                <div class="col-5 ms-3 mt-2">
                  <label for="musicStyle">音樂風格</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="musicStyle"
                    v-model="temp.musicStyle"
                  >
                    <option disabled selected>選擇</option>
                    <option value="Indie Collection">Indie Collection</option>
                    <option value="Bossa Nova">Bossa Nova</option>
                    <option value="BLUES">BLUES</option>
                    <option value="K-POP">K-POP</option>
                    <option value="R&B">R&B</option>
                    <option value="Classical">Classical</option>
                    <option value="Metal Rock">Metal Rock</option>
                    <option value="Punk Rock">Punk Rock</option>
                    <option value="House">House</option>
                    <option value="Rap">Rap</option>
                    <option value="Folk">Folk</option>
                  </select>
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
                          ref="files"
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
  </div> -->
  <backend-edit-product-modal ref='callEditModal'
  @productsIn = 'productsIn'></backend-edit-product-modal>

  <div
    v-show="isShowProgressBar"
    class="spinner-border text-success"
    id="loading-circle"
    role="status"
    style="position: absolute; z-index: 100; bottom: 5%; right: 5%"
  >
  </div>

</template>
<script>
import axios from 'axios';
import BackendEditProductModal from '@/components/BackendEditProductModal.vue';
import BackPagination from '@/components/BackPagination.vue';

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
      productsPagination: [],
      searchProducts: [],
      searchValue: '',
      totalPages: 0,
      sort: {
        id: 1,
        sortBy: 'origin_price',
        ascending: true,
        name: '原價由低至高',
      },

      personMenuDropDown: false,
      yearList: [],
    };
  },
  components: {
    BackendEditProductModal, BackPagination,
  },
  created() {
    this.getYearList();
    this.checkLogin();
  },
  mounted() {
    // this.modal.editmodal = new Modal(this.$refs.editmodal);
  },
  methods: {
    checkLogin() {
      const cookieToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = cookieToken;

      // 驗證是否登入
      axios
        .post(
          `https://all-the-cors.herokuapp.com/${process.env.VUE_APP_API}/api/user/check`,
        )
        .then(() => {
          // 為了eslint
          this.productsIn();
          this.getYearList();
        })
        .catch(() => {
          // check錯誤，會回到首頁
          this.$router.push('/');
        });
    },
    openEditProductModal(temp) {
      // console.log(this.$refs.callEditModal);
      this.$refs.callEditModal.editProduct(temp);
      this.$refs.callEditModal.openModal();
    },
    getYearList() {
      const nowYear = new Date(Date.now()).getFullYear();
      for (let i = 0; i < 10; i += 1) {
        this.yearList.push(nowYear - i);
      }
    },
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
      // console.log("觸發productsIn");
      const changeToPage = page;
      const url = `https://all-the-cors.herokuapp.com/${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${changeToPage}`;
      axios
        .get(url)
        .then((res) => {
          this.totalPages = res.data.pagination.total_pages;
          this.productsInStock = res.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(item) {
      this.temp = JSON.parse(JSON.stringify(item));
      this.modal.editmodal.show();
    },
    editModalReturn(it) {
      this.temp = it;
    },
    // 上傳照片
    uploadImage(file) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      const formData = new FormData();
      formData.append('form-to-upload', file);
      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // 更改成 FormData 的格式
          },
        })
        .then((res) => {
          if (!this.temp.imageUrl) {
            this.temp.imageUrl = [];
            this.temp.imageUrl.push(res.data.imageUrl);
          } else {
            this.temp.imagesUrl.push(res.data.imageUrl);
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    uploadImage_byUrl() {
      if (!this.temp.imageUrl) {
        this.temp = {
          ...this.temp,
          imageUrl: [],
          imagesUrl: [],
          is_enabled: false,
          num: 1,
        };
        this.temp.imageUrl.push(this.tempImgpath);
        this.tempImgpath = '';
      } else {
        this.temp.imagesUrl.push(this.tempImgpath);
        this.tempImgpath = '';
      }
    },
    deleteImage(index) {
      if (index === 0) {
        this.temp.imageUrl = '';
        const [tmp] = this.temp.imagesUrl;
        this.temp.imagesUrl = tmp; // eslint之方法  correct
        // this.temp.imageUrl = this.temp.imagesUrl[0]; //errors
        this.temp.imagesUrl.splice(0, 1);
      } else {
        this.temp.imagesUrl.splice(index - 1, 1);
      }
    },
    confirmEdit() {
      if (!this.temp.id) {
        // 更新
        // this.temp.id = new Date().getTime().toString();
        this.productsInStock.push(this.temp);

        axios
          .post(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`,
            { data: this.temp },
          )
          .then(() => {
            // 為了過eslint，never used的res可以先不加上去
            this.temp = {};
            this.productsIn();
          }).catch((err) => {
            console.log(err.response);
          });
      } else {
        const id = this.temp.id.trim();
        axios
          .put(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`,
            { data: this.temp },
          )
          .then(() => {
            // 為了過eslint，never used的res可以先不加上去
            this.productsInStock.forEach((item, i) => {
              if (item.id === id) {
                this.productsInStock[i] = this.temp;
                this.temp = {};
              }
            });
          });
        //   .catch((err) => {
        //     // console.dir(err);
        //   });
      }
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
#products-table li{
  border-bottom: white solid;
}
</style>
