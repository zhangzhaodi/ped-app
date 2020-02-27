<template>
  <div class="sidebar">
    <ul class="lists">
      <li class="item" v-if="isSearch">
        <span class="iconfont icon-iconset0157"></span>
      </li>
      <li class="item" v-if="isAdd">+</li>
      <li v-for="(val,index) in letter" :key="index" class="item">{{val}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    letter: {
      type: Array,
      default: []
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    isSearch: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/iconfont.css";
* {
  margin: 0;
  padding: 0;
}
.sidebar {
  position: fixed;
  right: 0;
  height: 82vh;
  width: 10vw;
  display: flex;
  justify-content: center;
  z-index: 1;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  li {
    font-size: 10px;
    color: #0085ff;
    line-height: px2vw(36);
  }
  .active {
    color: #31cc69;
  }
}
</style>