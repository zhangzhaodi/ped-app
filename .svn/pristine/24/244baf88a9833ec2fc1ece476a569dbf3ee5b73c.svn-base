<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <div class="title">
        等额本息和等额本金的区别？
      </div>
      <div class="answer-list">
        <div class="answer-title">1. 每月还款总金额不同</div>
        <div class="anwer-text">
          等额本息：每月还款的“本+息”之和始终不变；
        </div>
        <div class="anwer-text">
          等额本金：每月还款总额中，本金始终不变，利息另算。
        </div>
        <div class="answer-example">
          例：借了50万元，要分50个月还款，则按等额本金法，每个月要固定1万元本金，另加利息。
        </div>
      </div>
    </Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";

export default {
  components: {
    Myheader: Header,
    Scroller
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    padding: 0 px2vw(40);
    .title {
      margin-top: px2vw(70);
      margin-bottom: px2vw(60);
      font-size: px2vw(34);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(38, 38, 38, 1);
      text-align: center;
    }
    .answer-list {
      .answer-title {
        font-size: px2vw(30);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
        margin-bottom: px2vw(20);
      }
      .anwer-text {
        font-size: px2vw(30);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
        line-height: px2vw(44);
        margin-bottom: px2vw(20);
      }
      .answer-example {
        color: #ffb52b;
        font-size: px2vw(26);
        line-height: px2vw(44);
        font-weight: 400;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
  }
}
</style>
