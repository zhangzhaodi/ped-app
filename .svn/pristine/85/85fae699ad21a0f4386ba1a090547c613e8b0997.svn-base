<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <!-- 提款信息 -->
      <div class="personal-info">
        <div class="trustee-box">提款信息</div>
        <div class="cell-remark">
          <div class="left">年利率</div>
          <div class="right">
            <div class="remark-name">7.2%</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">提款期限</div>
          <div class="right">
            <div class="remark-name">12个月</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">提款金额</div>
          <div class="right">
            <div class="remark-name">¥3,000,000.00</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">放款账户</div>
          <div class="right">
            <div class="remark-name">6226 8802 9723 5731</div>
          </div>
        </div>
      </div>
      <!-- 还款信息 -->
      <div class="personal-info">
        <div class="trustee-box">还款信息</div>
        <div class="cell-remark">
          <div class="left">还款方式</div>
          <div class="right">
            <div class="remark-name">等额本息</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">首次还款日</div>
          <div class="right">
            <div class="remark-name">12月10号</div>
          </div>
        </div>
      </div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button @click="next">确定</van-button>
        </div>
      </div>
    </Scroller>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
export default {
  data() {
    return {};
  },
  components: {
    Scroller,
    Myheader: Header
  },
  methods: {
    next() {
      this.$router.push({ name: "quickDrawResult" });
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: #f5f6f8;
    padding: 0 px2vw(30);
    padding-top: px2vw(30);
    .personal-info {
      padding: 0 px2vw(40);
      padding-top: px2vw(40);
      padding-bottom: px2vw(20);
      background: #fff;
      border-radius: px2vw(16);
      margin-bottom: px2vw(20);
    }
    .trustee-box {
      margin-bottom: px2vw(20);
      font-size: px2vw(30);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(38, 38, 38, 1);
    }
    .cell-remark {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: px2vw(70);
      .left {
        width: px2vw(160);
        font-size: px2vw(30);
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
      }
      .right {
        font-size: px2vw(30);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 300;
        color: rgba(168, 168, 168, 1);
        .remark-name {
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
        span {
          font-size: px2vw(22);
          line-height: px2vw(70);
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
