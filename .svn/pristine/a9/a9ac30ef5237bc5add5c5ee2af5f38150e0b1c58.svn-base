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
      <div class="text-box">额度申请成功</div>
      <!-- <div class="hint">
        下次提款前需上传消费凭证
      </div>
      <div class="hint">
        每月自动扣款，请保持账户资金充足
      </div> -->
      <div class="footer-box">
        <div class="btn-box">
          <van-button @click="goToNativePage" class="changeColor"
            >返回首页</van-button
          >
          <van-button @click="next">立即提款</van-button>
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
    goToNativePage() {
      let params = {
        ios: "DOneController",
        ClassName: "com.example.zlv_master.activity.main.MainActivity"
      };
      window.NativeCall.goToNativePage(params);
    },
    next() {
      this.$router.push({ name: "easyIndex" });
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
      margin-top: px2vw(40);
      padding-bottom: px2vw(20);
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
