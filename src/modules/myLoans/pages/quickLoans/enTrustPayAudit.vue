<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <div class="img-box">
        <img
          src="@/assets/myAccount/entityCardApply/img_jiebangchenggong@2x.png"
          alt
        />
      </div>
      <div class="text-box">提款成功</div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button class="changeColor" @click="goBack"
            >查看还款计划</van-button
          >
          <van-button @click="next">完成</van-button>
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
  methods: {
    goBack() {},
    next() {
      this.$router.go(-3);
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    padding: 0 px2vw(40);
    .img-box {
      width: px2vw(260);
      margin: 0 auto;
      margin-top: px2vw(120);
      img {
        width: 100%;
      }
    }
    .text-box {
      font-size: px2vw(40);
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(38, 38, 38, 1);
      text-align: center;
      margin: 0 px2vw(45);
      margin-top: px2vw(25);
    }
    .hint {
      font-size: px2vw(28);
      font-family: PingFangSC-Light, PingFangSC;
      font-weight: 300;
      color: rgba(125, 125, 125, 1);
      text-align: center;
    }
    .footer-box {
      margin-top: px2vw(100);
      .btn-box {
        display: flex;
        justify-content: space-between;
        .van-button {
          width: px2vw(310);
        }
        .changeColor {
          color: rgba(62, 143, 255, 1);
          background: #fff;
          border: 1px solid rgba(62, 143, 255, 1);
        }
      }
    }
  }
}
</style>
