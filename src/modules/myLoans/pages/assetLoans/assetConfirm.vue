<template>
  <div class="outer remittance">
    <Myheader :title="$route.meta.title" />
    <Scroller>
      <div class="asset-owner">
        <div class="left">资产归属卡号</div>
        <div class="right">{{ AcNo }}</div>
      </div>
      <!-- 个人信息 -->
      <div class="personal-info">
        <div class="cell-remark">
          <div class="left">姓名</div>
          <div class="right">
            朱佩奇
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">身份证号</div>
          <div class="right">
            633300002201888888
          </div>
        </div>
      </div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button @click="next">申请</van-button>
        </div>
      </div>
    </Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Button, Cell } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    [Cell.name]: Cell
  },
  data() {
    return {
      AcNo: "" //资产归属卡号
    };
  },
  created() {
    //资产归属卡号
    this.AcNo = this.$route.query.AcNo;
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    padding: 0 px2vw(30);
    .asset-owner {
      margin-top: px2vw(30);
      margin-bottom: px2vw(20);
      padding: px2vw(40);
      display: flex;
      justify-content: space-between;
      background: #fff;
      border-radius: px2vw(16);
      .left {
        font-size: px2vw(30);
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
      }
      .right {
        font-size: px2vw(30);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
      }
    }
    .personal-info {
      padding: px2vw(20) px2vw(40);
      background: #fff;
      border-radius: px2vw(16);
      margin-top: px2vw(20);
      .cell-remark {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: px2vw(70);
        .left {
          width: px2vw(160);
          font-size: px2vw(30);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
        }
        .right {
          display: flex;
          justify-content: space-between;
          font-size: px2vw(30);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
      }
    }
    .footer-box {
      margin-top: px2vw(100);
      .btn-box {
        .van-button {
          color: #fff;
        }
      }
    }
  }
}
</style>
