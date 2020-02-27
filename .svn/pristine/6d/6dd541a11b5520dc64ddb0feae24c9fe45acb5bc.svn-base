<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <Scroller>
      <p>
        全部待还 <span>{{ periods }}</span> 期
      </p>
      <div class="loans-records">
        <div class="line-left"></div>
        <div class="loans-list"></div>
      </div>
    </Scroller>
    <div class="footer">
      <van-button class="btnLeft" type="default">全额还款</van-button>
      <van-button @click="goPartialPay" type="default">部分还款</van-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Button } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    [Button.name]: Button
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      periods: "6"
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    goPartialPay() {
      this.$router.push({ name: "partialPay" });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    padding: 0 px2vw(30);
    padding-top: px2vw(30);
    p {
      font-size: px2vw(30);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(125, 125, 125, 1);
      margin-bottom: px2vw(20);
      span {
        color: #ffb52b;
      }
    }
    .loans-records {
      display: flex;
      .line-left {
        padding-top: px2vw(48);
      }
    }
  }
  .footer {
    height: px2vw(120);
    background: rgba(255, 255, 255, 1);
    box-shadow: -5px -5px 20px 0px rgba(69, 69, 83, 0.05);
    display: flex;
    .van-button {
      height: 100%;
      flex: 1;
      font-size: px2vw(34);
      color: #ffffff;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      border-radius: 0;
      background: linear-gradient(
        270deg,
        rgba(107, 171, 255, 1) 0%,
        rgba(108, 138, 249, 1) 100%
      );
    }
    .btnLeft {
      color: #3e8fff;
      background: #ffffff;
    }
  }
}
</style>
