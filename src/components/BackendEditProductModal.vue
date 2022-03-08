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
                    :value="temp.title"
                    @input="update('title', $event.target.value)"
                  />
                </div>
                <div class="form-check form-switch col-3 ms-4 pt-5">
                  <input
                    class="form-check-input"
                    true-value="1"
                    false="0"
                    type="checkbox"
                    id="isActivated"
                    :value="temp.is_enabled"
                    @input="update('is_enabled', $event.target.value)"
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
                    :value="temp.category"
                    @input="update('category', $event.target.value)"
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
                    :value="temp.unit"
                    @input="update('unit', $event.target.value)"
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
                    :value="temp.origin_price"
                    @input="update('origin_price', $event.target.value)"
                  />
                </div>
                <div class="col-5 mt-2">
                  <label for="price">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    :value="temp.price"
                    @input="update('price', $event.target.value)"
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
                    :value="temp.inventory"
                    @input="update('inventory', $event.target.value)"
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
                    :value="temp.gender"
                    @input="update('gender', $event.target.value)"
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
                    :value="temp.language"
                    @input="update('language', $event.target.value)"
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
                    :value="temp.releaseYear"
                    @input="update('releaseYear', $event.target.value)"
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
                    :value="temp.musicStyle"
                    @input="update('musicStyle', $event.target.value)"
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
                  :value="temp.description"
                  @input="update('description', $event.target.value)"
                ></textarea>
              </div>
              <div class="col-6 ms-3 mt-2">
                <label for="content">說明</label>
                <textarea
                  id="content"
                  rows="3"
                  cols="82"
                  :value="temp.content"
                  @input="update('content', $event.target.value)"
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
                          @change="uploadImage()"
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
                    <!-- v-if="temp.imageUrl" -->
                    <div
                      v-if="temp.imageUrl"
                      class="col-auto ms-3 mt-3 px-0 py-0 rounded"
                      id="deleteBtn"
                    >
                      <img
                        :src="temp.imageUrl"
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
          >
            取消
          </button>
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
import { cloneDeep, tap, set } from 'lodash';

export default {
  props: ['temp'],
  data() {
    return {
      tempData: {},
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
        } : this.temp;
    },
  },
  mounted() {
    this.modal.editModal = new Modal(this.$refs.editmodal);
  },
  methods: {
    uploadImage() {
      // 不能上傳太大文件
      const file = this.$refs.files.files[0];

      this.$emit('uploadImage', file);
    },
    uploadImage_byUrl() {
      console.log(this.tempImgpath);
      this.$emit('uploadImage_byUrl', this.tempImgpath);
    },
    confirmEdit() {
      this.$emit('confirmedit');
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
      // 清空ErrorMessage
      //   this.$refs.form.resetForm();
    },
    openModal() {
      this.modal.editModal.show();
    },
    productsIn() {
      axios
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`,
        )
        .then((res) => {
          const temp = res.data.products;
          this.productsInStock = temp;
        });
    },
    update(key, value) {
      this.$emit(
        'editmodal',
        tap(cloneDeep(this.local), (v) => set(v, key, value)),
      );
    },
    deleteImage(index) {
      this.$emit('deleteImage', index);
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
</style>
