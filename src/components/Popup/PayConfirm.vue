<template>
  <div class="popup">
    <van-popup
      v-model="show"
      get-container="body"
      round
      position="bottom"
      :close-on-click-overlay="false"
      :style="{height:'62.29vh'}"
    >
      <div class="pupupTop">
        <img src="@/assets/deposit/index/icon_guanbi@2x.png" @click="close" />
        <p>确认支付</p>
      </div>
      <div class="dealInfo">
        <p class="money">
          <span class="icon">￥</span>
          <span>{{form.money | Money}}</span>
        </p>
      </div>
      <!-- <div class="orderInfo">
        <van-cell :value="form.name" title="订单信息" :center="true"></van-cell>
      </div> -->
      <div class="line"></div>
      <div class="from">
        <van-cell :value="form.bank.name" title="付款方" :center="true"></van-cell>
      </div>

      <!-- <div class="line"></div> -->
      <!-- <div class="safeTool">
        <van-cell :value="form.tool" title="安全工具" :center="true">
          <template slot="right-icon">
            <img src="~@/assets/LifePay/arrow.png" class="rightIcon" />
          </template>
        </van-cell>
      </div>-->
      <!-- <div class="line"></div> -->
      <div class="btn">
        <van-button type="default" @click="confirm">确认转账</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Cell, Icon, Button } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  props: {
    popupFlag: {
      require: true,
      default: false
    }
  },
  data() {
    return {
      form: null,
      show: true
    };
  },
  watch: {
    popupFlag: {
      handler(val) {
        this.show = val;
      }
    }
  },
  methods: {
    close() {
      this.$parent.popupFlag = false;
    },
    confirm() {
      this.$emit("toResult");
    }
  },
  created() {
    console.log(this.$store.state.params);
    this.form = this.$store.state.params;
  }
};
</script>

<style lang="scss" scoped>
// @import "vant/lib/icon/local.css";
@import "@/styles/deposit/common.scss";
.pupupTop {
  display: flex;
  height: px2vw(100);
  padding: 0 px2vw(40);
  flex-direction: row;
  align-items: center;
  img {
    width: px2vw(44);
    height: px2vw(44);
  }
  p {
    flex: 1;
    text-align: center;
    color: #262626;
    font-size: px2vw(34);
    font-weight: 400;
  }
}
.dealInfo {
  height: px2vw(227);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .top {
    font-size: px2vw(30);
    line-height: px2vw(30);
    letter-spacing: px2vw(1);
    margin-top: px2vw(30);
  }
  .money {
    font-size: 0;
    .icon {
      font-size: px2vw(40);
      font-weight: 500;
      line-height: px2vw(56);
    }
    span {
      font-size: px2vw(70);
      font-weight: 500;
      line-height: px2vw(98);
    }
  }
}
.orderInfo {
  height: px2vw(100);
  display: flex;
  flex-direction: row;
  align-items: center;
}
.safeTool {
  height: px2vw(100);
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: px2vw(28);
  .rightIcon {
    width: px2vw(12);
    height: px2vw(22);
  }
  /deep/ .van-cell {
    justify-content: space-between;
  }
  /deep/ .van-cell__title {
    margin-right: px2vw(40);
    flex: none;
  }
  /deep/ .van-cell__value {
    width: px2vw(200);
    flex: 1;
    text-align: right;
    margin-right: px2vw(20);
    font-size: px2vw(28);
  }
}

.btn {
  padding: 0 px2vw(40);
  position: absolute;
  left: 0;
  right: 0;
  bottom: px2vw(19);
}
/deep/ .van-button {
  width: 100%;
  height: px2vw(90);
  color: #fff;
  background: linear-gradient(#ffdfc7, #d69f81);
  font-size: px2vw(34);
  border-radius: px2vw(45);
}
/deep/ .van-cell {
  font-size: px2vw(28);
  font-family: PingFangSC;
  font-weight: 300;
  line-height: px2vw(28);
  /deep/ .van-cell__title {
    color: #7d7d7d;
  }
  /deep/ .van-cell__value {
    color: #000000;
  }
}
</style>
