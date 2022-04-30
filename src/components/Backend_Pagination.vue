<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="changePage(currentpage - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="index in pagination"
        v-bind:key="index"
        v-bind:class="{ active: currentpage === index }"
        @click.prevent="changePage(index)"
      >
        <a class="page-link" href="#">{{ index }}</a>
      </li>

      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="changePage(currentpage + 1)">
          <span aria-hidden="true">&raquo;</span>
          <!-- <span class="sr-only">Next</span> -->
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pagination', 'currentpage'],

  methods: {
    // 點擊換頁由子元件觸發
    // whichPage為目標頁面
    changePage(whichPage) {
      // this.$emit("事件名稱","想傳遞的數據");
      this.$emit('on-changepage', whichPage);
    },
  },
};
</script>
