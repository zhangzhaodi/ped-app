<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <Scroller>
      <div class="content-top">
        <div class="img-box">
          <img src="@/assets/椭圆形@2x.png" alt />
        </div>
        <p>还款成功</p>
      </div>
      <div class="content-bottom">
        <div class="info-box">
          <div class="info-left">还款产品</div>
          <div class="info-right">易秒贷</div>
        </div>
        <div class="info-box">
          <div class="info-left">还款金额</div>
          <div class="info-right">20,000.00元</div>
        </div>
        <div class="info-box">
          <div class="info-left">还款日期</div>
          <div class="info-right">2019-09-18</div>
        </div>
      </div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button class="changeColor" @click="goBack">完成</van-button>
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
    return {
      headerParams: {
        leftShow: false,
        rightShow: false
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    goBack() {}
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    padding: 0 px2vw(40);
    .content-top {
      margin-top: px2vw(66);
      border-bottom: 1px solid #eff0f1;
      padding-bottom: px2vw(50);
      .img-box {
        width: px2vw(110);
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
      p {
        margin-top: px2vw(40);
        font-size: px2vw(40);
        text-align: center;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
      }
    }
    .content-bottom {
      padding: px2vw(50) 0;
      padding-bottom: px2vw(10);
      border-bottom: 1px solid #eff0f1;
      .info-box {
        display: flex;
        margin-bottom: px2vw(40);
        .info-left {
          margin-right: px2vw(40);
          font-size: px2vw(28);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
        }
        .info-right {
          font-size: px2vw(28);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    .footer-box {
      margin-top: px2vw(100);
      .btn-box {
        .van-button {
          width: 100%;
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
