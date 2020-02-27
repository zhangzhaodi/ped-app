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
      <div slots="title">
        <div class="img" v-if="isClose">
          <img src="~@/assets/LifePay/close.png" @click="close" />
        </div>
        <div class="title">{{title?title:tit}}</div>
      </div>
      <slot name="content"></slot>
      <ContentOne v-if="infoType==1"></ContentOne>
      <ContentTwo v-if="infoType==2" :money="money"></ContentTwo>
      <ContentThree v-if="infoType==3" :money="money"></ContentThree>
      <ContentFour v-if="infoType==4"></ContentFour>
      <ContentFive v-if="infoType==5"></ContentFive>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog, Popup } from "vant";
import ContentOne from "./component/contentOne";
import ContentTwo from "./component/contentTwo";
import ContentThree from "./component/contentThree";
import ContentFour from "./component/contentFour";
import ContentFive from "./component/contentFive";
export default {
  components: {
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    ContentOne, //1、单笔限额
    ContentTwo, //2、每日限额
    ContentThree, //3、年度限额
    ContentFour, //4、笔数不足
    ContentFive //5、跨行>5万,非工作日
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
    //标题
    title: {
      require: false
    },
    //剩余金额 infoType为2和3时传入
    money: {
      require: false
    },
    //是否展示
    show: {
      type: Boolean,
      default: false,
    },
    //是否显示关闭按钮
    isClose: {
      type: Boolean,
      default: true
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
    },
    isShow:{
      handler(val) {
        this.$emit("update:show", val);
      }
    }
  },
  data() {
    return {
      isShow: this.show,
      tit: ""
    };
  },
  created() {
    if (this.infoType == "1") {
      this.tit = "超出单笔限额";
    } else if (this.infoType == "2") {
      this.tit = "超出每日限额";
    } else if (this.infoType == "3") {
      this.tit = "超出年度限额";
    } else if (this.infoType == "4") {
      this.tit = "转账笔数不足";
    } else if (this.infoType == "5") {
    }
  },
  methods: {
    //暴露的close接口
    close() {
      this.isShow = false;
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
  },
  
};
</script>

<style lang="scss" scoped>
/deep/ .van-button {
  border-radius: px2vw(36);
  box-sizing: border-box;
}
/deep/ .van-dialog {
  width: 73.6%;
  border-radius: px2vw(16);
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
      border: 1px solid #6babff;
      color: #6babff;
      background: #fff;
      margin-right: px2vw(36);
    }
    .van-dialog__confirm {
      background:linear-gradient(270deg,rgba(107,171,255,1) 0%,rgba(108,138,249,1) 100%);
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
    padding: px2vw(46) px2vw(40) 0 px2vw(40);
    .img img {
      width: px2vw(22);
      height: px2vw(22);
    }
    .title {
      text-align: center;
      font-size: px2vw(34);
      font-weight: 500;
      font-family: $font-family;
      color: rgba(38, 38, 38, 1);
      line-height: px2vw(34);
      letter-spacing: px2vw(1);
    }
    p {
      font-size: px2vw(26);
      font-weight: 400;
      font-family: $font-family;
      color: rgba(38, 38, 38, 1);
      line-height: px2vw(36);
      margin-top: px2vw(30);
      margin-bottom: px2vw(50);
      text-align: center;
    }
  }
  /deep/ .van-dialog__footer{
    overflow: visible;
  }
  /deep/ .van-hairline--top::after {
    border-top-width: 0;
  }
}
</style>
