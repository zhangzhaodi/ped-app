<template lang="html">
 <div v-if="isShowLoading" class="loading-container">
  <div class="loading-box">
   <img class="loading-img" :src="require('@/assets/loading.gif')">
   <!-- 这里content为双花括号 -->
   <span class="loading-txt">加载中</span>
  </div>
 </div>
</template>
 
<script>
export default {
  data() {
    return {
      isShowLoading: false,
      content: ""
    };
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 300000000;
}
.loading-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: px2vw(196);
  height: px2vw(196);
  border-radius: px2vw(10);
  background: rgba(0, 0, 0, 0.7);
}
.loading-img {
  width: px2vw(120);
  height: px2vw(120);
  background: url("~@/assets/loading.png");
  background-size: 100% 100%;
}
.loading-txt {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2vw(26);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: px2vw(26);
}
</style>