<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <div class="content-top">
        <div class="img-box">
          已结清
        </div>
        <div class="repay-title">本期还款(元)</div>
        <div class="repay-money">20,000.00</div>
        <div class="repay-period">第12/12期</div>
        <div class="repay-info">
          <div class="info-left">
            <p>利息</p>
            <div class="help-box">
              <img src="@/assets/myLoans/loanDetails/icon_help@2x.png" alt="" />
            </div>
          </div>
          <div class="info-right">¥9,900.00</div>
        </div>
        <div class="repay-info">
          <div class="info-left">本金</div>
          <div class="info-right">¥9,900.00</div>
        </div>
        <div class="repay-info">
          <div class="info-left">本金</div>
          <div class="info-right">¥9,900.00</div>
        </div>
        <div class="repay-info">
          <div class="info-left">本金</div>
          <div class="info-right">¥9,900.00</div>
        </div>
      </div>
      <div class="content-bottom">
        <div class="info-box">
          <div class="info-left">还款时间</div>
          <div class="info-right">2019-06-20 18:00:00</div>
        </div>
        <div class="info-box">
          <div class="info-left">还款账户</div>
          <div class="info-right">
            <p>6226 **** **** 5731</p>
            <div class="bank">焦作中旅银行</div>
          </div>
        </div>
        <div class="info-box">
          <div class="info-left">摘要</div>
          <div class="info-right">这里是摘要内容</div>
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
      margin-top: px2vw(42);
      border-bottom: 1px solid #eff0f1;
      .img-box {
        width: px2vw(104);
        height: px2vw(40);
        margin-left: px2vw(460);
        background: url("~@/assets/myLoans/loanDetails/tag_yijieqing@2x.png")
          no-repeat;
        background-size: px2vw(104);
        font-size: px2vw(24);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: px2vw(40);
        text-align: center;
      }
      .repay-title {
        font-size: px2vw(26);
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
        text-align: center;
      }
      .repay-money {
        font-size: px2vw(50);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
        margin: px2vw(20) 0;
        text-align: center;
      }
      .repay-period {
        font-size: px2vw(26);
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
        text-align: center;
        margin-bottom: px2vw(80);
      }
      .repay-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: px2vw(54);
        .info-left {
          font-size: px2vw(26);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
          display: flex;
          p {
            margin-right: px2vw(15);
          }
          .help-box {
            width: px2vw(30);
            height: px2vw(30);
            img {
              width: px2vw(24);
              height: px2vw(24);
              margin-top: px2vw(3);
              margin-left: px2vw(3);
            }
          }
        }
        .info-right {
          font-size: px2vw(26);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
      }
      .repay-info:last-child {
        margin-bottom: px2vw(50);
      }
    }
    .content-bottom {
      padding-top: px2vw(50);
      .info-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: px2vw(54);
        .info-left {
          font-size: px2vw(26);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
        }
        .info-right {
          font-size: px2vw(26);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
          p {
            margin-bottom: px2vw(14);
          }
          .bank {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
