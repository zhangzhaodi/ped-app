<template>
  <div class="content">
    <p>每日转账限额10笔，您可以修改每日转帐笔数限制后再进行操作。</p>
  </div>
</template>
<script>
export default {
  props: {
    money: {
      require: true
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: 0 px2vw(40);
  margin-top: px2vw(30);
  font-size: px2vw(26);
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(38, 38, 38, 1);
  line-height: px2vw(36);
  text-align: center;
}
</style>