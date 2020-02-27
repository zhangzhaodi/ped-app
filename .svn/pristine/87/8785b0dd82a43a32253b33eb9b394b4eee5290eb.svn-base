<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <div class="content">
      <div class="top">
        <circle-progress
          v-if="isShow"
          ref="$circle"
          class="progress"
          key="duration-model"
          :isAnimation="false"
          :isRound="true"
          :width="width"
          :radius="radius"
          :progress="progress"
          :barColor="barColor"
          :duration="duration"
          :delay="delay"
          :whiteRadius="whiteRadius"
          :timeFunction="timeFunction"
          :backgroundColor="backgroundColor"
        ></circle-progress>
        <div class="text">
          <p class="title">可借额度</p>
          <p class="money">{{ 30000 | Money }}</p>
          <p class="tip">评估时间 2019.06.06 12:24</p>
        </div>
      </div>
      <van-cell-group>
        <van-field
          label="证件姓名"
          placeholder="请填写申请用户证件姓名"
          v-model="form.CustomerName"
          :class="{ active: form.CustomerName }"
        ></van-field>
        <van-field
          readonly
          clickable
          label="证件类型"
          :value="value"
          @click="showPicker = true"
        />
        <van-field
          label="证件号码"
          placeholder="请填写申请用户证件号码"
          v-model="form.PapersNum"
          type="number"
          maxlength="18"
          :class="{ active: form.PapersNum }"
          @blur="checkIdCard"
        ></van-field>
        <van-field
          label="手机号"
          placeholder="请填写申请用户手机号"
          v-model="form.TelephoneNum"
          type="number"
          :class="{ active: form.TelephoneNum }"
          @blur="checkPhone"
          maxlength="11"
        ></van-field>
        <van-field
          v-model="form.msg"
          type="number"
          label="短信验证码"
          placeholder="请输入短信验证码"
          maxlength="6"
          @blur="checkMsg"
        >
          <van-button
            class="activeColor"
            slot="button"
            v-show="count_down"
            size="small"
            type="primary"
            @click="startCountdown"
            >{{ verCode }}</van-button
          >
          <van-button
            slot="button"
            v-show="!count_down"
            size="small"
            type="primary"
            @click="startCountdown"
            >{{ time_60 }}s后重发</van-button
          >
        </van-field>
        <van-field
          class="jobNumber"
          label="客户经理工号"
          v-model="form.JobNumber"
          :class="{ active: form.JobNumber }"
        ></van-field>
      </van-cell-group>
      <div class="agree">
        <div class="check" @click="changeCheck">
          <span :class="['iconfont', { 'iconcheck-': check }]"></span>
        </div>
        <div class="text">
          <span>我已同意阅读</span>
          <span class="agreement">《个人信息使用授权书》、</span>
          <span class="agreement">《告知函》</span>
        </div>
      </div>
      <div class="btn">
        <van-button @click="toApply">立即申请</van-button>
      </div>
      <Mydialog
        :show="dialog.show"
        @con="con"
        :showCancel="dialog.showCancel"
        :isClose="false"
        title="提示"
      >
        <template slot="content">
          <p class="dialogText">{{ dialog.text }}</p>
        </template>
      </Mydialog>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        title="请选择证件类型"
      />
    </van-popup>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import circleProgress from "../../components/circleProgress";
import { CellGroup, Button, Field, Toast, Picker, Popup } from "vant";
import Dialog from "@/components/Dialog/Dialog";
export default {
  components: {
    Myheader: Header,
    Mydialog: Dialog,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    circleProgress
  },
  data() {
    return {
      check: false,
      time_60: 60,
      count_down: true,
      verCode: "发送验证码",
      form: {
        CustomerName: "",
        PapersType: "1", //证件类型
        PapersNum: null, //证件号码
        TelephoneNum: null, //手机号
        JobNumber: null, //工号
        msg: null //短信验证码
      },
      allTrue: true,
      //svg配置
      isShow: true,
      width: null,
      radius: 15,
      progress: 50,
      duration: 1000,
      delay: 20,
      whiteRadius: null,
      barColor: "linear-gradient(#F59D3A,#F5C73A)",
      backgroundColor: "#FFE8CC",
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)",
      intervalTimer: null, // 持续模式，循环计时器
      currentTime: 0, // 当前时间
      durationTime: 60, // 持续模式总时长
      //证件类型选择
      value: "身份证",
      showPicker: false,
      columns: ["身份证", "士官证", "军官证", "身份证", "结婚证"],
      //结束
      dialog: {
        text: null,
        show: false,
        showCancel: false,
        overlay: ""
      }
    };
  },
  mounted() {
    let progress = document.getElementsByClassName("progress")[0];
    this.width = progress.clientWidth;
    this.radius = (this.width * 25) / 330;
    this.whiteRadius = (this.width * 8) / 330 / 1.5;
    // console.log(this.whiteRadius);
  },
  methods: {
    changeCheck() {
      this.check = !this.check;
      this.pass();
    },
    pass() {
      //验证必输项是否输入
      let total = 0;
      let nowTotal = 0;
      for (let key in this.form) {
        total++;
        if (this.form[key] || this.form[key] === 0) {
          nowTotal++;
          // console.log(key)
        }
      }
      if (nowTotal == total && this.check) {
        this.allTrue = false;
      }
    },
    startCountdown() {
      //发送短信验证码
      if (this.count_down) {
        this.count_down = false;
        var timer = window.setInterval(() => {
          this.time_60 -= 1;
          if (this.time_60 <= 0) {
            this.time_60 = 60;
            this.count_down = true;
            window.clearInterval(timer);
          }
        }, 1000);
      }
    },
    checkIdCard() {
      //检验身份证
      // const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      // if (!regIdCard.test(this.form.PapersNum)) {
      //   // errorMsg = "身份证号填写有误";
      //   this.$toast("身份证号输入错误，请重新输入");
      //   this.$children[4].focus();
      // }
    },
    checkPhone() {
      //检验手机号正确性
      // const regPhone = /^1[3456789]\d{9}$/;
      // if (!regPhone.test(this.form.TelephoneNum)) {
      //   this.$toast("手机号输入错误，请重新输入");
      //   this.$children[5].focus();
      // }
    },
    checkMsg() {
      //短信校验
      // this.dialog.overlay = "";
      // this.dialog.show = true;
      // this.dialog.text = "请输入正确的短信验证码";
    },
    con() {
      this.dialog.show = false;
      //暂时跳转
      this.$router.push({ name: "payoutRequest" });
    },
    toApply() {
      let nowTime = new Date();
      if (nowTime.getHours() < 9 || nowTime.getHours() > 15) {
        this.dialog.overlay = "overlay";
        this.dialog.show = true;
        this.dialog.text = "提款时间为工作日08:00-17:00请在正确时间内提款";
      } else {
        this.$router.push({ name: "payoutRequest" });
      }
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  background: #f5f6f8;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  height: px2vw(506);
  background: #fff url("~@/assets/myLoans/houseLoans/bg_pinggujieguo@2x.png")
    no-repeat;
  background-size: 100% px2vw(113);
  background-position: bottom;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  .text {
    position: absolute;
    margin-top: px2vw(131);
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: px2vw(24);
      font-weight: 400;
      color: rgba(152, 72, 0, 1);
    }
    .money {
      font-size: px2vw(48);
      font-weight: 600;
      color: rgba(38, 38, 38, 1);
      margin-top: px2vw(28);
    }
    .tip {
      font-size: px2vw(16);
      font-weight: 300;
      color: rgba(125, 125, 125, 1);
      margin-top: px2vw(28);
    }
  }
}
.progress {
  width: px2vw(330);
  height: px2vw(330);
  position: absolute;
  // top: px2vw(40);
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: px2vw(40);
}
/deep/ .van-cell,
.cell {
  height: px2vw(110);
  padding: 0 px2vw(40);
}
/deep/ .van-field__control {
  font-size: px2vw(30);
}
// 控制placeholder颜色
input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: px2vw(30);
  color: #a8a8a8;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: px2vw(30);
  color: #a8a8a8;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: px2vw(30);
  color: #a8a8a8;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: px2vw(30);
  color: #a8a8a8;
}
/deep/ .van-field__control:disabled {
  color: #a8a8a8;
  font-size: px2vw(30);
}
.active {
  /deep/ .van-field__control:disabled {
    color: #262626;
    margin-top: px2vw(-6);
    font-size: px2vw(30);
  }
}
/deep/ .van-field__label {
  width: px2vw(190);
}
.jobNumber {
  margin-top: px2vw(20);
  /deep/ .van-field__label {
    width: px2vw(220);
  }
}
.van-button--primary {
  color: #a8a8a8;
  background: transparent;
}
/deep/ .van-cell__title,
/deep/ .van-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: px2vw(30);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(38, 38, 38, 1);
}
.cell {
  padding: 0 px2vw(40);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .label {
    font-size: px2vw(30);
    font-weight: 400;
    color: rgba(38, 38, 38, 1);
  }
  .tab {
    display: flex;
    flex-direction: row;
    width: px2vw(244);
    justify-content: space-between;
    p {
      height: px2vw(46);
      line-height: px2vw(46);
      width: px2vw(112);
      font-size: px2vw(30);
      border-radius: px2vw(10);
      text-align: center;
      color: #262626;
      border: px2vw(2) solid #7d7d7d;
    }
    .active {
      color: #3e8fff;
      border: px2vw(2) solid #3e8fff;
    }
  }
}

.agree {
  display: flex;
  flex-direction: row;
  padding: 0 px2vw(40);
  margin-top: px2vw(30);
  .check {
    width: px2vw(24);
    height: px2vw(24);
    background: url("~@/assets/fundCollection/icon_gouxuan_nor@2x.png")
      no-repeat;
    background-size: 100% 100%;
    .iconfont {
      color: #008bff;
      font-size: px2vw(24);
    }
  }
  .text {
    margin-left: px2vw(10);
    flex: 1;
    font-size: 0;
    line-height: px2vw(30);
    font-weight: 300;
    color: #7d7d7d;
    span {
      font-size: px2vw(22);
    }
    .agreement {
      color: #008bff;
    }
  }
}
.btn {
  height: px2vw(130);
  padding: px2vw(20) px2vw(40);
  box-sizing: border-box;
  margin-top: px2vw(62);
  .van-button {
    width: 100%;
    height: px2vw(90);
    border-radius: px2vw(45);
    background: linear-gradient(#6babff, #6c8af9);
    display: flex;
    flex-direction: row;
    align-items: center;
    .van-button__text {
      font-size: px2vw(34);
      font-weight: 400;
      color: #fff;
      flex: 1;
      text-align: center;
    }
  }
}
.activeColor {
  .van-button__text {
    color: #008bff;
    font-size: px2vw(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
}
.van-popup {
  border-radius: px2vw(20) px2vw(20) 0px 0px;
  /deep/ .van-picker__toolbar {
    .van-picker__cancel {
      font-size: px2vw(30);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(38, 38, 38, 1);
      padding: 0 px2vw(40);
    }
    .van-picker__title {
      font-size: px2vw(34);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      letter-spacing: 1px;
    }
    .van-picker__confirm {
      font-size: px2vw(30);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(16, 122, 238, 1);
      padding: 0 px2vw(40);
    }
  }
}
</style>
