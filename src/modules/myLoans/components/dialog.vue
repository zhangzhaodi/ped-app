<template>
  <div class="dialogOuter" v-if="isShow">
    <van-dialog
      v-model="isShow"
      :show-cancel-button="showCancel"
      :close-on-click-overlay="false"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      @confirm="con"
      @cancel="cancel"
    >
      <slot name="content"></slot>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog, Popup } from "vant";
export default {
  components: {
    [Dialog.name]: Dialog,
    [Popup.name]: Popup
  },
  props: {
    //是否展示取消
    showCancel: {
      type: Boolean,
      default: true
    },
    //提示类型
    infoType: {
      type: Number,
      default: null
    },
    //是否展示
    show: {
      type: Boolean
    },
    //确认的按钮文案
    confirmButtonText: {
      type: String,
      default: "确认"
    },
    //取消的按钮文案
    cancelButtonText: {
      type: String,
      default: "取消"
    }
  },
  watch: {
    //监听父组件中show变化
    show: {
      handler(val) {
        this.isShow = val;
      }
    }
  },
  data() {
    return {
      isShow: false,
      tit: ""
    };
  },
  methods: {
    //暴露的close接口
    close() {
      this.$emit("close");
    },
    //暴露的cancel接口
    cancel() {
      this.$emit("cancel");
    },
    //暴露的con接口
    con() {
      this.$emit("con");
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-button {
  border-radius: px2vw(36);
  box-sizing: border-box;
}
/deep/ .van-dialog {
  width: 73.6%;
  width: px2vw(552);
  border-radius: px2vw(16);
  box-sizing: border-box;
}

.dialogOuter {
  font-family: PingFangSC;
  /deep/ .van-dialog__footer,
  /deep/.van-dialog__footer--buttons,
  /deep/ .van-hairline--top {
    padding: 0 px2vw(40);
    display: flex;
    flex-direction: row;
    margin-bottom: px2vw(40);
    .van-button {
      width: px2vw(218);
      height: px2vw(72);
      line-height: px2vw(72);
      font-size: px2vw(30);
      box-sizing: border-box;
      flex: 1;
    }
    .van-dialog__cancel {
      border: px2vw(1) solid #d7a083;
      color: #d7a083;
      background: #fff;
      margin-right: px2vw(36);
    }
    .van-dialog__confirm {
      background: linear-gradient(#6BABFF, #6C8AF9);
      color: #fff;
    }
    .van-hairline--top::after {
      border-top-width: 0px;
    }
    .van-hairline--left::after {
      border-left-width: 0px;
    }
  }
  /deep/ .van-dialog__content {
    padding: 0 px2vw(30);
    .img img {
      width: px2vw(22);
      height: px2vw(22);
    }
    .title {
      text-align: center;
      font-size: px2vw(34);
      font-weight: 500;
      color: rgba(38, 38, 38, 1);
      line-height: px2vw(34);
      letter-spacing: px2vw(1);
    }
  }
  /deep/ .van-hairline--top::after {
    border-top-width: 0;
  }
}
/deep/ .van-dialog__content {
  .dialogTitle {
    font-size: px2vw(34);
    font-weight: 500;
    color: rgba(38, 38, 38, 1);
    letter-spacing: px2vw(1);
    margin-top: px2vw(46);
    margin-bottom: px2vw(30);
    text-align: center;
  }
  .dialogText {
    text-align: center;
    font-size: px2vw(26);
    font-weight: 400;
    color: rgba(38, 38, 38, 1);
    line-height: px2vw(36);
    margin-bottom: px2vw(50);
  }
}
</style>