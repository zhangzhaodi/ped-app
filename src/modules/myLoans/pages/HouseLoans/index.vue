<template>
  <div class="outer">
    <Myheader
      :title="$route.meta.title"
      :isWhite="header.isWhite"
      :backgroundColor="header.color"
    ></Myheader>
    <div class="content">
      <div class="top">
        <p class="title">周转易借 最高额度</p>
        <p class="money">{{ 300000 | Money }}</p>
        <p class="tip">快速到账 借1,000最低每天0.27元</p>
      </div>
      <div class="items">
        <div class="img">
          <img
            src="@/assets/myloans/houseLoans/icon_fangyidai_jieshao@2x.png"
            alt
          />
        </div>
        <div>
          <p>
            <span class="span1">全面保障</span>
            <span class="span2">资金安全</span>
          </p>
          <p>
            <span class="span1">官方审核</span>
            <span class="span2">方便省心</span>
          </p>
          <p>
            <span class="span1">灵活分期</span>
            <span class="span2">可分36期</span>
          </p>
          <p>
            <span class="span1">实时放款</span>
            <span class="span2">3分钟申请</span>
          </p>
        </div>
      </div>
      <!-- 还款 -->
      <div class="refund">
        <img
          src="@/assets/myloans/houseLoans/img_fangyidai_shenqingliucheng@2x.png"
          alt
        />
      </div>
      <!-- 流程 -->
      <div class="flow">
        <img
          src="@/assets/myloans/houseLoans/img_fangyidai_ziyouhuankuan@2x.png"
          alt
        />
      </div>
    </div>
    <div class="btn">
      <van-button @click="toApply">立即申请</van-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { Button } from "vant";
export default {
  data() {
    return {
      header: {
        isWhite: false,
        color: "transparent"
      }
    };
  },
  components: {
    Myheader: Header,
    [Button.name]: Button
  },
  mounted() {
    //屏幕滚动时修改header的背景
    let content = document.getElementsByClassName("content")[0];
    let _this = this;
    content.onscroll = function() {
      console.log(content.scrollTop);
      if (content.scrollTop > 0) {
        _this.header = {
          color: "#fff"
        };
      } else {
        _this.header = {
          color: "transparent"
        };
      }
    };
  },
  methods: {
    toApply() {
      //去申请
      this.$router.push({ name: "assessResult" });
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .headerBox {
    position: absolute;
  }
  .content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .content::-webkit-scrollbar {
    display: none;
  }
}
.top {
  width: 100%;
  height: px2vw(562);
  background: url("~@/assets/myloans/houseLoans/bg_fangyidai@2x.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  overflow: hidden;
  .title {
    font-size: 32px;
    font-weight: 400;
    color: rgba(152, 72, 0, 1);
    margin-top: px2vw(208);
  }
  .money {
    font-size: px2vw(80);
    font-weight: 600;
    color: rgba(38, 38, 38, 1);
    margin-top: px2vw(50);
  }
  .tip {
    font-size: px2vw(22);
    font-weight: 300;
    color: rgba(125, 125, 125, 1);
    margin-top: px2vw(40);
  }
}
.items {
  box-sizing: border-box;
  padding: 0 px2vw(86);
  margin-top: px2vw(53);
  .img {
    padding: 0 px2vw(13);
    box-sizing: border-box;
    height: px2vw(72);
    img {
      width: 100%;
    }
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: px2vw(25);
    p {
      width: px2vw(102);
      text-align: center;
      .span1 {
        font-size: px2vw(24);
        font-weight: 500;
        color: rgba(190, 110, 40, 1);
      }
      .span2 {
        font-size: px2vw(22);
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
      }
    }
  }
}
.refund,
.flow {
  padding: 0 px2vw(40);
  height: px2vw(292);
  margin-top: px2vw(92);
  img {
    width: 100%;
  }
}
.btn {
  height: px2vw(130);
  padding: px2vw(20) px2vw(40);
  box-sizing: border-box;
  // margin-top: px2vw(65);
  .van-button {
    width: 100%;
    height: px2vw(90);
    border-radius: px2vw(45);
    background: linear-gradient(#ffeac9, #f2c281);
    display: flex;
    flex-direction: row;
    align-items: center;
    .van-button__text {
      font-size: px2vw(34);
      font-weight: 400;
      color: rgba(152, 72, 0, 1);
      flex: 1;
      text-align: center;
    }
  }
}
</style>
