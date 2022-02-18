<template>
  <div class="root" >
    <div class="container">
      <ul class="progressbar" >
        <li class="active" v-for="i in currentStep" :key="i"></li>
        <li class="" v-for="i in nonFinishSteps" :key="i"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['length', 'currentStep'],
  data() {
    return {};
  },
  computed: {
    nonFinishSteps() {
      return this.length - this.currentStep;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 70%; //影響圈圈的間隔
  position: absolute;
  z-index: 1;
  margin-top: 20px;
}
.progressbar {
  counter-reset: step;
}
.progressbar li {
  float: left;
  width: 24%;
  position: relative;
  text-align: center;
  list-style-type: none;
  font-size: 30px; //本來沒有//影響字的大小
}

// 尚未完成的步驟，背景呈現灰色
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 50px; //30px   //圈的直徑
  height: 50px; //30px   //圈的直徑
  border: 2px solid #bebebe;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 47px;  //27px //影響字的位置
  background: white;
  color: #bebebe;
  text-align: center;
  font-weight: bold;
}

//影響線的樣式
.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background: #979797;
  top: 25px;  //線的位置，是圓圈的半徑
  left: -50%;
  z-index: -1;
}
.progressbar li.active:before {
  border-color: #3aac5d;
  background: #3aac5d;
  color: white;
}
.progressbar li.active:after {
  background: #3aac5d;
}

// 已經完成的步驟，背景呈現綠色
.progressbar li.active-li:after {
  background: #3aac5d;
}
.progressbar li.active-li:before {
  border-color: #3aac5d;
  background: #3aac5d;
  color: white;
}
.progressbar li:first-child:after {
  content: none;
}
</style>
