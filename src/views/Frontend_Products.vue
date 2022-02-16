<template>
  <div>
    <!-- Navbar -->
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
        <!-- <div class='col-6' style='border:black solid'></div> -->

        <div>
          <ul class="navbar-nav flex-row">
            <!-- cart -->
            <li class="nav-item dropdown me-3 me-lg-1">
              <div class="fs-5">
                <a
                  class="nav-link"
                  id="navbarDropdownCart"
                  role="button"
                  @click="openCartModal"
                >
                  <!-- data-mdb-toggle="dropdown" data-bs-toggle="modal"
                  data-bs-target="#modalCart"
                  aria-expanded="false" -->
                  <!-- <font-awesome-icon icon="plus" size="3x"  style="margin-top: 2px" /> -->
                  <font-awesome-icon icon="cart-shopping" size="1x" />
                  <div v-if="productsInCart.length">
                    <span
                      class="badge rounded-pill badge-notification bg-danger"
                    >
                      {{ productsInCart.length }}
                    </span>
                  </div>
                </a>
              </div>
            </li>

            <!-- person profile -->
            <li class="nav-item dropdown me-3 me-lg-1" v-if="isLogin">
              <a
                class="nav-link fs-4"
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
              </ul>
            </li>
            <li class="nav-item active" v-else>
              <a class="nav-link" @click="openLoginModal">登入/註冊</a>
            </li>
          </ul>
          <!-- Right elements -->
        </div>
      </div>
    </nav>
    <!-- Navbar -->

    <div class="content">
      <div class="container my-4">
        <!-- {{data}} -->
        <div class="row">
          <div class="col-3 p-2" v-for="item in productsToSell" :key="item.id">
            <div class="card p-2 my-1">
              <img
                class="card-img-top"
                :src="item.imageUrl"
                style="height: 350px"
              />
              <div class="card-body">
                <h3 class="card-title text-primary">{{ item.title }}</h3>
                <h6 class="text-danger">售價: {{ item.price }}</h6>
                <h6>
                  <del>原價: {{ item.origin_price }}</del>
                </h6>
                <h6>是否啟用: {{ item.is_enabled ? "啟用" : "未啟用" }}</h6>
                <button
                  type="button"
                  class="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDetails"
                  @click.prevent="details(item)"
                >
                  詳細
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal of details -->
      <div
        class="modal fade"
        id="modalDetails"
        tabindex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">產品細節</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="text-center">
                <img v-bind:src="temp.imageUrl" style="width: 45%" />
              </div>
              <div class="mt-4 ms-3">
                <h5>
                  {{ temp.title }}
                  <span
                    class="bg-info text-white fs-6 ms-2 px-1 py-1 rounded-3"
                  >
                    {{ temp.category }}
                  </span>
                </h5>
                <h6 class="mt-3">
                  商品描述:
                  <span class="ms-2">
                    {{ temp.description }}
                  </span>
                </h6>
                <h6 class="mt-3">
                  商品內容:
                  <span class="ms-2">
                    {{ temp.content }}
                  </span>
                </h6>
                <h6 class="mt-3">
                  {{ temp.price }}
                  <span class="ms-2">
                    <del>{{ temp.origin_price }}</del
                    >元/個
                  </span>
                </h6>
              </div>
              <div class="container">
                <div class="row my-3">
                  <div
                    class="col-auto sm-12 my-2"
                    v-for="(item, key) in temp.imagesUrl"
                    :key="key"
                  >
                    <a
                      id="detailsImagePreview"
                      @click.prevent="changeImage(key)"
                    >
                      <img :src="item" style="height: 80px"
                    /></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="addProduct()"
                data-bs-dismiss="modal"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal of cart -->
      <productlist-cartmodal
      ref='callCartModal'
      :productsInCart="productsInCart" >
      </productlist-cartmodal>

      <!-- Modal of personProfile -->
      <login-modal ref="callLoginModal"></login-modal>
    </div>

    //Loading ProgressBar
    <div
      v-show="isShowProgressBar"
      class="spinner-border text-success"
      id="loading-circle"
      role="status"
      style="position: absolute; z-index: 100; bottom: 5%; right: 5%"
    ></div>
  </div>
</template>
<script>
import axios from 'axios';
import loginModal from '@/components/LoginModal.vue';
import ProductlistCartmodal from '@/components/ProductList_CartModal.vue';
// import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'cakeshop',
      temp: {},
      productsToSell: [],
      productsInCart: [],
      isLogin: false,
      isShowProgressBar: false,
      account: {
        username: '',
        password: '',
      },
    };
  },
  components: { loginModal, ProductlistCartmodal },
  created() {
    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = cookieToken;
    // this.data = products;
    this.productsIn();
  },
  methods: {
    // closeLoginModal(isCloseModal) {
    //   if (isCloseModal) {
    //     this.modal.loginModal.hide();
    //   }
    // },
    openLoginModal() {
      this.$refs.callLoginModal.openModal();
    },
    openCartModal() {
      this.$refs.callCartModal.openModal();
    },
    addProduct(temp = this.temp) {
      this.temp.num += 1;
      // this.productsToSell[temp.id - 1].num += 1;
      const tempProductToAdd = this.productsToSell.find(
        (element) => element.id === temp.id,
      );
      tempProductToAdd.num += 1;
      const tempCopy = JSON.parse(JSON.stringify(temp));
      if (this.productsInCart.length === 0) {
        this.productsInCart.push(tempCopy);
      } else {
        this.productsInCart = [];
        this.productsToSell.forEach((element) => {
          if (element.num > 0) {
            this.productsInCart.push(element);
          }
        });
      }
    },
    productsIn() {
      this.isShowProgressBar = true;
      axios.get(`${this.url}/api/${this.path}/products/all`).then((res) => {
        const resAllKey = Object.keys(res.data.products);
        const resAllValues = Object.values(res.data.products);
        const arrRes = resAllValues;
        for (let i = 0; i < resAllKey.length; i += 1) {
          arrRes.id = resAllKey[i];
        }
        this.productsToSell = arrRes;
        this.isShowProgressBar = false;

        // this.productsInStock.sort((A, B) =>
        //   this.sort.ascending
        //     ? A[this.sort.sortBy] - B[this.sort.sortBy]
        //     : B[this.sort.sortBy] - A[this.sort.sortBy]
        // );

        // // 分頁
        // // page_size:2個一頁; page_number:第1頁
        // this.searchValueFunc(this.searchValue, 1);
      });
    },
    // deleteProduct() {

    // },
    // editItem() {
    //     //temp=;
    // },
    // confirmEdit() {
    //     if (!temp.id) {
    //         temp.id = data.length;
    //         data.push(temp);
    //     } else {
    //         data[temp.id + 1] = temp;
    //     }
    // }
    details(item) {
      this.temp = JSON.parse(JSON.stringify(item));
    },
    changeImage(key) {
      this.temp.imagesUrl.push(this.temp.imageUrl);
      this.temp.imageUrl = this.temp.imagesUrl[key];
      this.temp.imagesUrl.splice(key, 1);
    },

    login() {
      axios
        .post(`${this.url}/admin/signin`, this.account)
        .then((res) => {
          console.log('success');
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expired=${new Date(
            expired,
          )};path=/`;
          //   console.log(document.cookie);
          // window.location = "VueSpringClass_hw2.html";

          window.location.href = 'VueSpringClass_hw2.html';
          // window.location.assign ("VueSpringClass_hw2.html");
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#detailsImagePreview:hover {
  outline: 3px solid rgb(255, 0, 170);
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}

.nav-link span {
  position: absolute;
  top: -1px;
  right: -1px;
  font-size: 35%;
}

.content {
  margin-top: 80px;
}

#modalLogin .modal-dialog {
  top: 130px;
}
</style>
