<template>
  <div class="horizontal-grid">
    <div class="grid-animation">
      <!-- <div class="horizontal-grid-1">
        <div v-for="element in grid1" :key="element.id" class="elements text-white">
          {{ element.name }}
        </div>
        <div v-for="element in grid1" :key="element.id" class="elements">
          {{ element.name }}
        </div>
      </div> -->
      <div class="horizontal-grid-2">
        <div v-for="element in grid2" :key="element.id" class="elements text-white">
          {{ element.name }}
        </div>
        <div v-for="element in grid2" :key="element.id" class="elements text-white">
          {{ element.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid1: [
        {
          id: 1,
          name: 'element1',
        },
        {
          id: 2,
          name: 'element2',
        },
        {
          id: 3,
          name: 'element3',
        },
        {
          id: 4,
          name: 'element4',
        },
        {
          id: 5,
          name: 'element5',
        },
      ],
      grid2: [
        {
          id: 1,
          name: 'element1',
        },
        {
          id: 2,
          name: 'element2',
        },
        {
          id: 3,
          name: 'element3',
        },
        {
          id: 4,
          name: 'element4',
        },
        {
          id: 5,
          name: 'element5',
        },
      ],
    };
  },
};
</script>

<style scoped>
.horizontal-grid {
  overflow-x: hidden;
  overflow-y: auto;
  height: 500px;
}
.horizontal-grid-1,
.horizontal-grid-2 {
  display: flex;
}
/* // for triangle view of elements */
.elements {
  border: 1px solid #e2e2e2;
  border-radius: 16px;
  padding: 16px;
  margin: 32px 0 0 32px;
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* // scroll animation keyframes */
@keyframes scroll {
  100% {
    transform: translate(-1760px);
  }
  0% {
    transform: translate(0px);
  }
}
.grid-animation {
  animation: scroll 10s linear infinite;
}
.grid-animation:hover {
  animation-play-state: paused;
}
.elements:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2) !important;
  transform: scale(0.97);
}
/* 參考https://www.magictoolbox.com/magicscroll/integration/#autoplay
 https://blog.canopas.com/animations-with-css-and-vue-transitions-fdb53dbb21e7 */
</style>
