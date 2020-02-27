<template>
  <div class="headerBox" :class="{white:isWhite}" :style="{background:backgroundColor}">
    <myHeader :title="title">
      <myButton v-show="backShow" slot="left" class="backBtn" @click="goBack()">
        <p class="iconfont iconic_back"></p>
      </myButton>
      <myButton
        :style="{'visibility': moreShow?'visible':'hidden'}"
        slot="right"
        class="moreBtn"
        @click="goMore"
      >
        <p class="iconfont iconicon_gengduoCopy-"></p>
      </myButton>
      <myButton v-show="customerShow" slot="right" class="customerBtn">
        <p
          :class="['iconfont', isSet?'iconicon_shezhi-':'iconicon_kefu-1']"
          v-if="!this.$slots.left"
          @click="goCustomer"
        ></p>
        <slot name="left"></slot>
      </myButton>
    </myHeader>
    <div class="moreMock" v-show="moreMock">
      <p class="message" @click="goMessage">
        <span class="iconfont iconicon_xiaoxi"></span>
        <span>消息</span>
      </p>
      <p class="home" @click="goHome">
        <span class="iconfont iconicon_shouye"></span>
        <span>首页</span>
      </p>
    </div>
  </div>
</template>

  <script>
import { Header, Button } from "mint-ui";
export default {
  components: {
    myButton: Button,
    myHeader: Header
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    params: {
      type: Object,
      default: () => {
        return {
          backShow: true,
          leftShow: true,
          rightShow: true
        };
      }
    },
    backRouter: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isSet: {
      type: Boolean,
      default: false
    },
    backStep: {
      type: Number,
      default: -1
    },
    isWhite: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      moreMock: false
    };
  },
  computed: {
    backShow() {
      if (this.params.backShow === undefined) {
        return true;
      }
      return this.params.backShow;
    },
    customerShow() {
      if (this.params.leftShow === undefined) {
        return false;
      }
      return this.params.leftShow;
    },
    moreShow() {
      if (this.params.rightShow === undefined) {
        return true;
      }
      return this.params.rightShow;
    }
  },
  created() {
    // console.log(this.$slots.left)
  },
  mounted(){
    // let body = document.body
    // body.onclick = function(){
    //   console.log(this.moreMock)
    //   this.moreMock = true
    // }
  },
  methods: {
    goBack() {
      // console.log("back/...");
      // console.log(this.backRouter, this.backRouter.hasOwnProperty("name"));
      if (this.backRouter && this.backRouter.hasOwnProperty("name")) {
        this.$router.replace(this.backRouter);
      } else if (this.$route.name != this.$router.options.routes[1].name) {
        if (this.$route.meta.goToNative) {
          window.NativeCall.goBack();
        } else {
          // console.log(this.$route.meta)
          // this.$toast.clear();
          this.$router.go(-1);
        }
      } else {
        //调用原生方法
        window.NativeCall.goBack();
      }
      // console.log(this.$router)
    },
    goCustomer() {
      if (this.isSet) {
        this.$emit("set");
      } else {
        // this.$router.push({ name: "Customer" });
        console.log("----点我进入问答页------");
      }
    },
    goMore() {
      this.moreMock = !this.moreMock;
    },
    goMessage() {
      console.log("跳转到消息中心");
    },
    goHome() {
      console.log("首页");
      let params = {
        ios: "DOneController",
        ClassName:'com.example.zlv_master.activity.main.MainActivity'
      };
      window.NativeCall.goToNativePage(params);
    }
  }
};
</script>
<style lang="scss" scoped>
.white .mint-header {
  color: #fff;
  .iconfont {
    color: #fff;
  }
}
.headerBox {
  /* position: absolute; */
  z-index: 1001;
  width: 100%;
  top: 0;
}
.mint-header {
  padding: 0 px2vw(44) 0 px2vw(40);
  height: px2vw(88);
  line-height: px2vw(88);
  font-size: px2vw(36);
  background: inherit;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(38, 38, 38, 1);
}
/deep/ .mint-header-title {
  font-weight: 500;
}
.backBtn {
  text-align: left;
  width: px2vw(100);
  height: 40px;
  float: left;
}
.backBtn img {
  width: 22px;
  height: 22px;
  margin-top: 5px;
  margin-left: -6px;
}
.customerBtn,
.moreBtn {
  text-align: right;
  float: right;
  width: px2vw(35);
  height: 40px;
}
.customerBtn img,
.moreBtn img {
  width: 100%;
  margin-top: 5px;
}
.customerBtn {
  margin-right: px2vw(45);
  width: px2vw(45);
  .iconfont {
    font-size: px2vw(40);
  }
}
.iconfont {
  font-size: px2vw(32);
  color: #262626;
  font-weight: bold;
}
.moreMock {
  width: px2vw(202);
  height: px2vw(170);
  position: absolute;
  background: rgba(78, 79, 84, 0.9);
  border-radius: px2vw(10);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  right: 0;
  top: px2vw(80);
  z-index: 100000;
  .home,
  .message {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    .iconfont{
      font-size: px2vw(40);
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-right: px2vw(20);
    }
  }
  .message::after{
    position: absolute;
    content: ' ';
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: px2vw(1);
    width: px2vw(142);
    background: rgba(255, 255, 255, 0.8)
  }
  p {
    text-align: center;
    span {
      font-size: px2vw(26);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
    }
  }
}
.moreMock::before {
  content: " ";
  width: 0;
  height: 0;
  border-left: px2vw(20) solid transparent;
  border-right: px2vw(20) solid transparent;
  border-bottom: px2vw(20) solid rgba(78, 79, 84, 0.9);
  position: absolute;
  right: px2vw(40);
  top: px2vw(-18);
}
</style>
