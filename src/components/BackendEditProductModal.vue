<template>
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
            @click.prevent = 'closeModal'
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
                    v-model="tempData.title"
                    placeholder="商品名稱"
                  />
                </div>
                <div class="form-check form-switch col-3 ms-4 pt-5">
                  <input
                    class="form-check-input"
                    true-value="1"
                    false="0"
                    v-model="tempData.is_enabled"
                    type="checkbox"
                    id="isActivated"
                  />
                  <label class="form-check-label" for="isActivated">是否啟用</label>
                </div>
              </div>

              <div class="row">
                <div class="col-5 ms-3 mt-2">
                  <label for="category">分類</label>
                  <br />
                  <select
                    class="form-select"
                    v-model="tempData.category"
                    aria-label="Default select example"
                    id="category"
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
                    v-model="tempData.unit"
                    id="productUnit"
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
                    v-model="tempData.origin_price"
                    id="originPrice"
                  />
                </div>
                <div class="col-5 mt-2">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" v-model="tempData.price" id="price" />
                </div>
              </div>
              <div class="row">
                <div class="col-5 ms-3 mt-2">
                  <label for="inventory">庫存量</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="tempData.inventory"
                    id="inventory"
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
                    v-model="tempData.gender"
                    id="gender"
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
                    v-model="tempData.language"
                    id="language"
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
                    v-model="tempData.releaseYear"
                    id="releaseYear"
                  >
                    <option disabled selected>選擇</option>
                    <option v-for="it in yearList" :key="it" :value="it">
                      {{ it }}
                    </option>
                  </select>
                </div>
                <div class="col-5 ms-3 mt-2">
                  <label for="musicStyle">音樂風格</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="tempData.musicStyle"
                    id="musicStyle"
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
                  v-model="tempData.description"
                  rows="3"
                  cols="82"
                ></textarea>
              </div>
              <div class="col-6 ms-3 mt-2">
                <label for="content">說明</label>
                <textarea id="content" rows="3" cols="82" v-model="tempData.content"></textarea>
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
                        class="imgUpload btn btn-primary btn-block rounded-pill shadow px-5"
                        ><i class="fa fa-upload mr-2 me-2"></i><span class="me-2">照片上傳</span>
                        <input id="fileUpload" type="file" ref="files" />
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
                      v-if="tempData.imageUrl"
                      class="picture ms-3 mt-3 ps-0 pe-0 pb-0 rounded"
                      style="
                        flot: left;
                        border: yellow solid;
                        height: 25vh;
                        width: auto;
                        position: relative;
                        overflow: hidden;
                      "
                    >
                      <a href="#" style="overflow: hidden" @click.prevent="deleteImage(0)">
                        <div class="overlapPanel" style="padding: 0">
                          <div
                            style="
                              text-align: center;
                              margin-top: 10vh;
                              font-size: 3vh;
                              color: black;
                              font-weight: bold;
                            "
                          >
                            DELETE
                          </div>
                        </div>
                      </a>
                      <img
                        v-bind:src="tempData.imageUrl"
                        style="border: dashed grey; height: 100%; width: auto"
                        alt="圖片未加載完成"
                      />
                    </div>
                    <div
                      class="picture ms-3 mt-3 ps-0 pe-0 pb-0 rounded"
                      style="
                        flot: left;
                        border: yellow solid;
                        height: 25vh;
                        width: auto;
                        position: relative;
                        overflow: hidden;
                      "
                      v-for="(url, index) in tempData.imagesUrl"
                      :key="index + 1"
                    >
                      <a href="#" style="overflow: hidden" @click.prevent="deleteImage(index + 1)">
                        <div class="overlapPanel" style="padding: 0">
                          <p
                            style="
                              text-align: center;
                              margin-top: 10vh;
                              font-size: 3vh;
                              color: black;
                              font-weight: bold;
                            "
                          >
                            DELETE
                          </p>
                        </div>
                      </a>
                      <img
                        v-bind:src="url"
                        style="border: dashed grey; height: 100%; width: auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click.prevent="confirmEdit"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import axios from 'axios';
// import { cloneDeep, tap, set } from 'lodash';

export default {
  props: ['temp'],
  data() {
    return {
      tempData: {
        title: '',
        is_enabled: 0,
        category: '',
        unit: '',
        origin_price: 0,
        price: 0,
        inventory: 0,
        gender: '',
        language: '',
        releaseYear: '',
        musicStyle: '',
        description: '',
        // imageUrl: [],
        // imagesUrl: [],
      },
      tempImgpath: '',
      productsInStock: [],
      modal: {
        editModal: '',
        is_openEditModal: false,
      },
      yearList: [],
    };
  },
  created() {
    this.getYearList();
    // this.productsIn();
  },
  mounted() {
    this.modal.editModal = new Modal(this.$refs.editmodal);
    this.checkLogin();
    // this.modal.editModal.hide();
  },
  computed: {
    local() {
      return Object.keys(this.temp).length === 0
        ? {
          title: '',
          is_enabled: false,
          category: '',
          unit: '',
          origin_price: 0,
          price: 0,
          inventory: 0,
          gender: '',
          language: '',
          releaseYear: '',
          description: '',
          content: '',
          imageUrl: [],
          imagesUrl: [],
        }
        : this.temp;
    },
  },
  methods: {
    editProduct(tempProduct) {
      if (Object.keys(tempProduct).length !== 0) {
        this.tempData = tempProduct;
      }
    },
    checkLogin() {
      const cookieToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = cookieToken;

      // 驗證是否登入
      axios
        .post(`https://all-the-cors.herokuapp.com/${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          // 為了eslint
          // this.productsIn();
          this.getYearList();
        })
        .catch(() => {
          // check錯誤，會回到首頁
          this.$router.push('/');
        });
    },
    uploadImage() {
      // 不能上傳太大文件
      const file = this.$refs.files.files[0];
      this.$emit('uploadImage', file);
    },
    uploadImage_byUrl() {
      if (!this.tempData.imageUrl) {
        this.tempData.imageUrl = [];
        this.tempData.imagesUrl = [];
        this.tempData.imageUrl.push(this.tempImgpath);
        this.tempImgpath = '';
      } else {
        this.tempData.imagesUrl.push(this.tempImgpath);
        this.tempImgpath = '';
      }
    },
    confirmEdit() {
      if (!this.tempData.id) {
        axios
          .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, {
            data: this.temp,
          })
          .then(() => {
            this.tempData = {
              title: '',
              is_enabled: 0,
              category: '',
              unit: '',
              origin_price: 0,
              price: 0,
              inventory: 0,
              gender: '',
              language: '',
              releaseYear: '',
              musicStyle: '',
              description: '',
            };
            // this.productsIn();
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        // console.log(this.tempData);
        axios
          .put(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempData.id}`,
            { data: this.tempData },
          )
          .then(() => {
            this.tempData = {
              title: '',
              is_enabled: 0,
              category: '',
              unit: '',
              origin_price: 0,
              price: 0,
              inventory: 0,
              gender: '',
              language: '',
              releaseYear: '',
              musicStyle: '',
              description: '',
            };
            // this.productsIn();
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
    getYearList() {
      const now = new Date(Date.now()).getFullYear();
      for (let i = 0; i < 10; i += 1) {
        const nowYear = now - i;
        this.yearList.push(nowYear);
      }
    },
    closeModal() {
      this.modal.editModal.hide();
      this.$emit('productsIn');
    },
    openModal() {
      this.modal.editModal.show();
    },
    productsIn() {
      axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`)
        .then((res) => {
          const temp = res.data.products;
          this.productsInStock = temp;
        });
    },
    deleteImage(index) {
      if (index === 0) {
        this.tempData.imageUrl = '';
        const [aa] = this.tempData.imagesUrl[0];
        this.tempData.imageUrl = aa;
        this.tempData.imagesUrl.splice(0, 1);
        this.$emit('productsIn');
      } else {
        this.tempData.imagesUrl.splice(index - 1, 1);
        this.$emit('productsIn');
      }
    },
  },
};
</script>
<style>
/* 上傳照片按鍵 */
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
/* PROPS V-MODEL https://simonkollross.de/posts/vuejs-using-v-model-with-objects-for-custom-components */
/* 刪除照片之按鈕 */
.overlapPanel {
  display: none;
  z-index: 100;
  position: absolute;
  height: auto;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  opacity: 0.3;
  justify-content: center;
  overflow: hidden;
}
/* .picture {
  border-radius: 3px;
  width: 30%;
} */
.picture:hover .overlapPanel {
  display: block;
}
</style>
