<template>
  <nav aria-label="Page navigation pagination">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li v-for="page in pages" :key="page" class="page-item"
      :class = "{activePage: currentPage === page}">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <!-- <li class="page-item" :class = "{activePage: currentPage === 2}">
          <a class="page-link" href="#" @click.prevent="changePage(2)">2</a></li> -->
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent = "changePage(currentPage+1)">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pages'],
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    // 點擊換頁由子元件觸發
    // whichPage為目標頁面
    changePage(whichPage) {
      if (whichPage < this.pages + 1) {
        this.currentPage = whichPage;
        // this.$emit("事件名稱","想傳遞的數據");
        this.$emit('changePage', whichPage);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  background-color: #222222;
}
.activePage,
.activePage a{
    background-color: rgb(25, 115, 233);
    color: #fff;
}
</style>
