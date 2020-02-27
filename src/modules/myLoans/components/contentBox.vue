<template>
  <div class="contentBox">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
* {
  font-family: PingFangSC-Regular, PingFangSC;
}
.contentBox {
  width: 100%;
  margin-top: px2vw(30);
  background: #fff;
  padding: 0 px2vw(40) px2vw(40);
  box-sizing: border-box;
  border-radius: px2vw(16);
  .title {
    padding: px2vw(40) 0;
    font-size: px2vw(30);
    font-weight: 500;
    color: #262626;
  }
}
.cell {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: px2vw(70);
  .label {
    font-size: px2vw(30);
    font-weight: 400;
    color: #7d7d7d;
    width: px2vw(120);
  }
  .placeholder,
  .active {
    flex: 1;
    font-size: px2vw(30);
    font-weight: 300;
    color: #7d7d7d;
    margin-left: px2vw(30);
    text-align: left;
  }
  .active {
    font-size: px2vw(30);
    font-weight: 400;
    color: #262626;
  }
  .iconfont {
    font-size: px2vw(21);
    font-weight: 400;
    color: #666666;
  }
}
</style>