<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <div class="container">
      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active me-3">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item me-3">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item me-3">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item me-3">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>

      <div>
        <ul class="navbar-nav flex-row">
          <!-- person profile -->
          <li class="nav-item dropdown me-3 me-lg-1" v-if="isLogin">
            <a
              class="nav-link fs-4 me-5"
              id="navbarDropdownPersonProfile "
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-lines-fill"></i>
              <span>&nbsp;</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownPersonProfile"
            >
              <li>
                <a class="dropdown-item" href="#">Action</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">設定</a>
              </li>

              <li>
                <a class="dropdown-item" href="#">其他</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">登出</a>
              </li>
            </ul>
          </li>
        </ul>
        <!-- Right elements -->
      </div>
    </div>
  </nav>

  <div class="content">
    <div class="container-fluid my-4 ps-5 pt-5">
      <div class="row">
        <div class="col-2 ms-5 ps-5">
          <!-- Sidebar -->
          <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
              <li class="sidebar-brand">
                <a href="#"> Start Bootstrap </a>
              </li>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Shortcuts</a>
              </li>
              <li>
                <a href="#">Overview</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-8 ms-5 ps-5">
          <div class="mt-3 mb-3 row">
            <div class="col-5">
              <div class="input-group col-4 float-start">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search title..."
                  aria-describedby="basic-addon2"
                  v-model="searchValue"
                />

                <!-- <div class="input-group-append">
                                        <button type="button" class="btn btn-primary">搜尋</button>
                                    </div> -->
              </div>
            </div>

            <div class="col h-6 fs-6">
              <div class="float-end pe-3">
                <span class="me-3">排序</span>
                <select v-model="sort" class="p-1">
                  <option
                    v-for="q in sortSelectOptions"
                    v-bind:value="q"
                    :key="q.id"
                  >
                    {{ q.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <table class="table table-hover table-striped text-center">
            <!-- tableHead -->
            <thead>
              <tr>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>庫存</th>
                <th>是否啟用</th>
                <th>查看細節</th>
              </tr>
            </thead>
            <!-- tableBody -->
            <tbody>
              <tr v-for="item in productsPagination" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.origin_price }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.inventory }}</td>
                <td>
                  <p v-if="item.is_enabled" class="text-success">啟用</p>
                  <p v-else>未啟用</p>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="edit(item)"
                  >
                    編輯
                  </button>

                  <button
                    type="button"
                    class="btn btn-danger ms-2"
                    @click="deleteProductInStock(item)"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <pagination-component
            v-bind:pagination="totalPages"
            v-bind:currentpage="currentPage"
            v-bind:searchproducts="searchProducts"
            v-on:on-changepage="onChangePage"
          ></pagination-component>

          <!-- 暫時 -->
        </div>
      </div>
    </div>

    <div style="position: fixed; top: 150px; right: 80px">
      <a
        class="circle badge badge-notification bg-primary"
        data-toggle="tooltip"
        title="新增資料"
        data-placement="left"
        @click="edit({})"
      >
        <!-- <i class="fas fa-plus fa-3x" style="margin-top: 2px"></i> -->
        <font-awesome-icon icon="plus" size="3x" style="margin-top: 2px" />
        <!-- <i class="fas fa-plus fa-3x" style="margin-top: 2px"></i> -->
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
                      <!-- <div class='col-auto ms-3 mt-2'> -->
                      <div
                        v-if="temp.imageUrl"
                        class="col-auto ms-3 mt-3 px-0 py-0 rounded"
                        id="deleteBtn"
                      >
                        <img
                          v-bind:src="temp.imageUrl"
                          style="
                            border: dashed grey;
                            height: 120px;
                            width: auto;
                          "
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
                          style="
                            border: dashed grey;
                            height: 120px;
                            width: auto;
                          "
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

    <!-- Modal of personProfile -->
    <div
      class="modal fade"
      id="modalLogin"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mb-5">
            <div class="mx-auto mt-5" style="width: 200px">
              <div class="text-center my-5">
                <h2>登入頁面</h2>
              </div>
            </div>
            <div class="container">
              <div class="mx-auto col-8 mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="forUsername"
                  placeholder="account"
                  v-model="account.userName"
                />
              </div>
              <div class="mx-auto col-8 mb-5">
                <input
                  type="text"
                  class="form-control"
                  id="forPassword"
                  placeholder="password"
                  v-model="account.password"
                />
              </div>

              <div class="mx-auto col-8">
                <button type="button" class="btn btn-secondary col-12" id="">
                  登入
                </button>
              </div>

              <div class="mx-auto col-8 row mt-1">
                <div class="col-4 ps-0">
                  <a
                    class="
                      nav-item nav-link
                      text-start
                      ps-0
                      pt-0
                      text-secondary
                    "
                    href="#"
                  >
                    忘記密碼
                  </a>
                </div>
                <div class="col-4"></div>
                <div class="col-4 pe-0">
                  <a
                    class="nav-item nav-link text-end pe-0 pt-0 text-secondary"
                    href="./LogIn.html"
                  >
                    註冊
                  </a>
                </div>
              </div>
            </div>
          </div>
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
import paginationComponent from '@/components/Backend_Pagination.vue';

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
          id: 1,
          sortBy: 'origin_price',
          ascending: true,
          name: '原價由低至高',
        },
        {
          id: 2,
          sortBy: 'origin_price',
          ascending: false,
          name: '原價由高至低',
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
    };
  },

  components: { paginationComponent },
  created() {
    this.isShowProgressBar = true;

    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = cookieToken;

    // 驗證是否登入
    axios
      .post(`${process.env.VUE_APP_API}/api/user/check`)
      .then(() => {
        // 為了eslint
        this.productsIn();
      })
      .catch(() => {
        // check錯誤，會回到首頁
        this.$router.push('/');
      });
  },
  mounted() {
    this.modal.editmodal = new Modal(this.$refs.editmodal);
  },

  watch: {
    sort(newValue) {
      // 為了過ESLINT，去掉oldValue參數
      if (this.searchValue === '') {
        this.productsInStock.sort((A, B) => (newValue.ascending
          ? A[newValue.sortBy] - B[newValue.sortBy]
          : B[newValue.sortBy] - A[newValue.sortBy]));
        // 針對所有products
        this.pagination(this.elePerPage, this.currentPage);
      } else {
        this.productsPagination.sort((A, B) => (newValue.ascending
          ? A[newValue.sortBy] - B[newValue.sortBy]
          : B[newValue.sortBy] - A[newValue.sortBy]));
        this.pagination(this.elePerPage, this.currentPage, this.searchProducts);
      }
    },
    // 依靠this.searchValue值的變換而觸發
    searchValue(newValue) {
      // 為了過ESLINT，去掉oldValue參數
      // 從第一頁開始，並不用從新productsIN
      this.searchValueFunc(newValue, 1);
      // 傳達定位第一頁
      this.onChangePage(1);
    },
  },
  methods: {
    searchValueFunc(newValue, whichpage) {
      if (newValue === '') {
        // 針對所有productsInStock
        this.pagination(this.elePerPage, whichpage);
        this.searchProducts = [];
      } else {
        this.searchProducts = this.productsInStock.filter((item) => {
          const productString = newValue.normalize();
          const searchString = item.title.normalize();
          searchString.toLowerCase().includes(productString.toLowerCase());
          return searchString
            .toLowerCase()
            .includes(productString.toLowerCase());
        });
        this.pagination(this.elePerPage, whichpage, this.searchProducts);
      }
    },
    // page_size:每幾個元素當一頁;page_number:第幾頁
    pagination(pageSize, pageNumber, productsShow = this.productsInStock) {
      let pageNum = pageNumber; // 為了eslint
      this.totalPages = Math.ceil(productsShow.length / this.elePerPage);
      //   const itemsToParse = this.items;
      if (pageNum > this.totalPages) {
        pageNum -= 1;
        this.currentPage -= 1;
        this.productsPagination = productsShow.slice(
          pageSize * (pageNum - 1),
          pageNum * pageSize,
        );
      } else {
        this.productsPagination = productsShow.slice(
          pageSize * (pageNum - 1),
          pageNum * pageSize,
        );
      }
    },
    // whichPage為目標頁面
    onChangePage(whichPage) {
      if (whichPage < this.totalPages + 1 && whichPage > 0) {
        this.currentPage = whichPage;
        // 分頁+換頁
        // hua change
        // this.pagination(this.elePerPage, whichPage);
        // 必須確保用得是搜尋過後的products(searchProducts)，還是全部的products(productsInStock)
        this.searchValueFunc(this.searchValue, whichPage);
      }
    },
    productsIn() {
      this.isShowProgressBar = true;
      axios
        .get(
          `https://all-the-cors.herokuapp.com/${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`,
        )
        .then((res) => {
          const resAllKey = Object.keys(res.data.products);
          const resAllValues = Object.values(res.data.products);
          const arrRes = resAllValues;
          for (let i = 0; i < resAllKey.length; i += 1) {
            arrRes.id = resAllKey[i];
          }
          this.productsInStock = arrRes;
          this.isShowProgressBar = false;

          this.productsInStock.sort((A, B) => (this.sort.ascending
            ? A[this.sort.sortBy] - B[this.sort.sortBy]
            : B[this.sort.sortBy] - A[this.sort.sortBy]));

          // // 分頁
          // // page_size:2個一頁; page_number:第1頁
          // this.pagination(this.elePerPage, this.currentPage);
          this.searchValueFunc(this.searchValue, 1);
        });
    },
    edit(item) {
      this.temp = JSON.parse(JSON.stringify(item));
      this.modal.editmodal.show();
    },
    nonEdit() {
      this.temp = {};
    },
    uploadImage() {
      // 不能上傳太大文件
      // const file = e.target.files[0];
      const file = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append('form-to-upload', file);
      const url = 'https://all-the-cors.herokuapp.com/https://vue3-course-api.hexschool.io/v2/api/cakeshop/admin/upload';
      // const originalUrl = `https://all-the-cors.herokuapp.com/${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // 更改成 FormData 的格式
          },
        })
        .then((res) => {
          if (!this.temp.imageUrl) {
            this.temp = {
              ...this.temp,
              imageUrl: [],
              imagesUrl: [],

              num: 1,
              // 新增欄位AAA:60,
            };
            this.temp.imageUrl.push(res.data.imageUrl);
          } else {
            this.temp.imagesUrl.push(res.data.imageUrl);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    // 方法二:處理base64
    // uploadImage(e) {
    //     var fr = new FileReader();
    //     // if (Object.keys(this.temp).length == 0) {
    //     //     this.temp = Object.assign({}, this.temp, { imagesUrl: [] });
    //     //     console.log(this.temp.imagesUrl);
    //     // }
    //     fr.onload = (e) => {
    //         if (typeof (this.temp.imagesUrl) == 'undefined') {
    //             this.temp = Object.assign({}, this.temp, {
    //                 imageUrl: '', imagesUrl: [],
    //                 is_enabled: true,
    //                 num: 10,
    //             });
    //             console.log(132);
    //             this.temp.imageUrl = fr.result;
    //         } else {
    //             this.temp.imagesUrl.push(fr.result);
    //         }
    //     };
    //     fr.readAsDataURL(e.target.files[0]);

    // },
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
    confirmEdit() {
      if (!this.temp.id) {
        // 更新
        // this.temp.id = new Date().getTime().toString();
        this.productsInStock.push(this.temp);

        axios
          .post(
            `https://all-the-cors.herokuapp.com/${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`,
            { data: this.temp },
          )
          .then(() => {
            // 為了過eslint，never used的res可以先不加上去
            this.temp = {};
            this.productsIn();
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
                // 每次更新完要做一次分頁
                // this.pagination(this.elePerPage, this.currentPage);

                // 每次更新完要做一次分頁，並判斷searchValue是否為空，若空則全productsInStock分頁，若非則根據searchValue分頁
                this.searchValueFunc(this.searchValue, this.currentPage);
              }
            });
          });
        //   .catch((err) => {
        //     // console.dir(err);
        //   });
      }
    },
    changeImage(key) {
      this.temp.imagesUrl.push(this.temp.imageUrl);
      this.temp.imageUrl = this.temp.imagesUrl[key];
      this.temp.imagesUrl.splice(key, 1);
    },
    // addProdut(temp = this.temp) {
    //     this.temp.num++;
    //     this.productsInStock[temp.id - 1].num++;
    //     var temp = JSON.parse(JSON.stringify(this.temp));
    //     if (this.productsInCart.length == 0) {
    //         this.productsInCart.push(temp);
    //     } else {
    //         this.productsInCart = [];
    //         this.productsInStock.forEach(element => {
    //             if (element.num > 0) {
    //                 this.productsInCart.push(element);
    //             }
    //         });
    //     }
    // },

    deleteProductInStock(item) {
      const id = item.id.trim();
      const pathUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      axios.delete(pathUrl).then(() => {
        // 為了過eslint，never used的res可以先不加上去
        // 方法一 直接從this.productsInStock刪除;
        // console.log(res);
        // this.productsInStock.forEach((it, i) => {
        //     if (it.id == item.id) {
        //         this.productsInStock.splice(i, 1);
        //     }
        // })
        // 方法二: 從新呼叫products/all，重新渲染
        // this.productsIn();
        // this.pagination(this.elePerPage, this.currentPage);
        // 先放新的資料，才能分頁
        this.productsIn();
      });
      // .catch((err) => {
      //   console.dir(err);
      // });
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

      // axios.post(`${url}/api/${path}/admin/product`, { data: this.productsInStock[0] })
      //     .then((res) => {
      //         console.log(res);
      //     })
      //     .catch((err) => {
      //         console.dir(err);
      //     })
    },
    // test() {
    //   const options = {
    //     method: 'GET',
    //     url: 'https://genius.p.rapidapi.com/artists/1024123',
    //     headers: {
    //       'x-rapidapi-host': 'genius.p.rapidapi.com',
    //       'x-rapidapi-key': '2d93bde46amsh1b881fcb981ce09p1e88d5jsn7c9cd3758a93',
    //     },
    //   };

    //   axios
    //     .request(options)
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   // var options = {
    //   //     method: 'GET',
    //   //     url: 'https://genius.p.rapidapi.com/search',
    //   //     params: { q: 'ChrisBrown' },
    //   //     headers: {
    //   //         'x-rapidapi-host': 'genius.p.rapidapi.com',
    //   //         'x-rapidapi-key': '2d93bde46amsh1b881fcb981ce09p1e88d5jsn7c9cd3758a93'
    //   //     }
    //   // };

    //   // axios.request(options).then(function (response) {
    //   //     console.log(response.data);
    //   // }).catch(function (error) {
    //   //     console.error(error);
    //   // });
    // },
  },
};
</script>
<style lang="scss" scoped>
.nav-link span {
  position: absolute;
  top: -10px;
  right: -10px;
}

.content {
  margin-top: 80px;
}

#modalLogin .modal-dialog {
  top: 130px;
}

#wrapper {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
#sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  width: 280px;
  height: 100%;
  overflow-y: auto;
  background: #000;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

/* Sidebar Styles */
.sidebar-nav {
  position: absolute;
  top: 0;
  width: 250px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-nav li {
  text-indent: 20px;
  line-height: 40px;
}

.sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #999999;
}

.sidebar-nav li a:hover {
  text-decoration: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
  height: 65px;
  font-size: 22px;
  line-height: 60px;
}

.sidebar-nav > .sidebar-brand a {
  color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
  color: #fff;
  background: none;
}

.circle {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  /* padding-bottom:-10px; */
}

.imgUpload input {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  opacity: 0;
}

#deleteBtn {
  position: relative;
}
</style>
