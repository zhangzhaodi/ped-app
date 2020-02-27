<template>
  <div class="content">
    <p>您今天还可以继续转账￥{{money |Money}}</p>
    <p></p>
    <p>1) 调低转账金额；</p>
    <p>2) 修改转账限额。</p>
  </div>
</template>
<script>
export default {
  props: {
    money: {
      require: true,
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: px2vw(144);
  padding: 0 px2vw(40);
  margin-top: px2vw(30);
  font-size: px2vw(26);
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(38, 38, 38, 1);
  line-height: px2vw(36);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>