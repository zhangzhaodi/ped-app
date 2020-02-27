<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <div class="card-box" v-if="loanList.length == 0">
        <div class="img-box">
          <img src="@/assets/myLoans/quickLoans/img_zanwudaikuan@2x.png" alt />
        </div>
        <div class="bindCard">
          对不起，您暂时没有符合要求的贷款，无法使用此功能
        </div>
      </div>
      <div class="loans-box" v-else>
        <div class="loans-top">
          <div class="title">
            <p>未受托支付<span>当前待委托提款总金额</span></p>
          </div>
          <div class="money">
            <p><span>￥</span>{{ 500000 | Money }}</p>
            <van-button @click="goUnentrustPay">立即提款</van-button>
          </div>
        </div>
        <div class="loans-bottom">
          <div class="hint">审批完成</div>
          <div
            class="loans-list"
            v-for="(item, index) in loanList"
            :key="index"
          >
            <div class="self-draw">自助提款</div>
            <div class="loan-sum">贷款金额(元)</div>
            <div class="money">{{ 500000 | Money }}</div>
            <div class="bottom">
              <p>申请日期<span>2019-08-19</span></p>
              <van-button @click="goDrawMoney">立即提款</van-button>
            </div>
          </div>
        </div>
      </div>
    </Scroller>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Button } from "vant";
export default {
  data() {
    return {
      loanList: [{}, {}]
    };
  },
  components: {
    Myheader: Header,
    [Button.name]: Button,
    Scroller
  },
  mounted() {},
  methods: {
    //跳到自主提款
    goDrawMoney() {
      this.$router.push({ name: "quickMoney" });
    },
    //跳到为未受托支付
    goUnentrustPay() {
      this.$router.push({ name: "quickUnentrustPay" });
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  background: #fff;
  display: flex;
  .scrollerBox {
    background: rgba(245, 246, 248, 1);
    .card-box {
      .img-box {
        width: px2vw(300);
        margin: 0 auto;
        margin-top: px2vw(158);
        img {
          width: 100%;
        }
      }
      .bindCard {
        margin-top: px2vw(50);
        padding: 0 px2vw(85);
        font-size: px2vw(28);
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
        line-height: px2vw(40);
        text-align: center;
      }
    }
    .loans-box {
      padding-top: px2vw(24);
      .loans-top {
        width: px2vw(610);
        height: px2vw(234);
        padding: px2vw(66) px2vw(70) 0;
        background: url("~@/assets/myLoans/quickLoans/bg_weishoutuo@2x.png")
          no-repeat;
        background-size: 100% 100%;
        .title {
          p {
            font-size: px2vw(30);
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          span {
            font-size: px2vw(24);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-left: px2vw(12);
          }
        }
        .money {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: px2vw(38);
          p {
            font-size: px2vw(60);
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            span {
              font-size: px2vw(42);
            }
          }
          .van-button {
            width: px2vw(178);
            height: px2vw(56);
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0px px2vw(8) px2vw(16) 0px rgba(223, 92, 25, 0.2);
            border-radius: px2vw(100);
            line-height: normal;
            .van-button__text {
              font-size: px2vw(22);
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 500;
              color: rgba(210, 102, 102, 1);
            }
          }
        }
      }
      .loans-bottom {
        margin-top: px2vw(20);
        padding: 0 px2vw(30);
        margin-bottom: px2vw(30);
        .hint {
          font-size: px2vw(30);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
          padding-left: px2vw(10);
        }
        .loans-list {
          margin-top: px2vw(30);
          height: px2vw(250);
          background: url("~@/assets/myLoans/quickLoans/list_loan.png")
            no-repeat;
          background-size: 100% 100%;
          .self-draw {
            font-size: px2vw(22);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            padding-top: px2vw(22);
            text-align: right;
            padding-right: px2vw(24);
          }
          .loan-sum {
            font-size: px2vw(26);
            font-family: PingFangSC-Light, PingFang SC;
            font-weight: 300;
            color: rgba(125, 125, 125, 1);
            margin-top: px2vw(6);
            padding-left: px2vw(40);
          }
          .money {
            font-size: px2vw(50);
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(38, 38, 38, 1);
            margin-top: px2vw(14);
            padding-left: px2vw(40);
          }
          .bottom {
            margin-top: px2vw(22);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 px2vw(40);
            p {
              font-size: px2vw(24);
              font-family: PingFangSC-Light, PingFang SC;
              font-weight: 300;
              color: rgba(125, 125, 125, 1);
              span {
                margin-left: px2vw(16);
              }
            }
            .van-button {
              width: px2vw(178);
              height: px2vw(56);
              background: linear-gradient(
                90deg,
                rgba(107, 171, 255, 1) 0%,
                rgba(108, 138, 249, 1) 100%
              );
              border-radius: px2vw(100);
              line-height: normal;
              .van-button__text {
                font-size: px2vw(22);
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
    }
  }
}
</style>
