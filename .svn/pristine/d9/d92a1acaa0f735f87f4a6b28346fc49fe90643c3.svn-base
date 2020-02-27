<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <div class="loans-box">
        <div class="loans-top">
          <div class="left">
            <p>受托金额(元)</p>
            <span>{{ 5000000 | Money }}</span>
          </div>
          <div class="right">
            <van-button @click="goAddEntrustPay">立即提款</van-button>
          </div>
        </div>
        <div class="loans-mid">
          <p>受托对象<span>陈潇潇</span></p>
        </div>
        <div class="loans-bottom">
          <p>受托账户<span>6222 0000 8888 5324</span></p>
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
    return {};
  },
  components: {
    Myheader: Header,
    [Button.name]: Button,
    Scroller
  },
  mounted() {},
  methods: {
    goAddEntrustPay() {
      this.$router.push({ name: "quickAddEntrustPay" });
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  display: flex;
  .scrollerBox {
    background: rgba(245, 246, 248, 1);
    padding: 0 px2vw(30);
    .loans-box {
      margin-top: px2vw(30);
      padding: px2vw(50) px2vw(40);
      background: rgba(255, 255, 255, 1);
      border-radius: px2vw(16);
      .loans-top {
        display: flex;
        justify-content: space-between;
        .left {
          p {
            font-size: px2vw(26);
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 300;
            color: rgba(125, 125, 125, 1);
          }
          span {
            font-size: px2vw(50);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 500;
            color: rgba(38, 38, 38, 1);
            margin-top: px2vw(14);
          }
        }
        .right {
          margin-top: px2vw(17);
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
              color: #fff;
            }
          }
        }
      }
      .loans-mid {
        margin-top: px2vw(38);
        p {
          font-size: px2vw(24);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
          span {
            margin-left: px2vw(24);
          }
        }
      }
      .loans-bottom {
        margin-top: px2vw(16);
        p {
          font-size: px2vw(24);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
          span {
            margin-left: px2vw(24);
          }
        }
      }
    }
  }
}
</style>
