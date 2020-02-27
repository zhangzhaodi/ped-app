<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <!-- 贷款信息 -->
      <div class="personal-info">
        <div class="cell-remark">
          <div class="left">年利率</div>
          <div class="right">
            <div class="remark-name">7.6%</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">提款金额</div>
          <div class="right">
            <div class="remark-name">¥3,000,000</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">还款信息</div>
          <div class="right">
            <div class="remark-name">等额本息</div>
          </div>
        </div>
      </div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button @click="next">授信合约签署</van-button>
        </div>
      </div>
    </Scroller>
    <Captcha :visible.sync="captchaShow" @confirm="transferCheck" />
    <Payment :visible.sync="showSign" title="电子签名">
      <div class="slot">
        <div class="img-box" @click="showSignature">
          <img v-if="base64Image" :src="base64Image" alt="" />
          <p v-else>电子签名</p>
        </div>
        <div class="footer-box">
          <div class="btn-box">
            <van-button @click="SignContract">确定</van-button>
          </div>
        </div>
      </div>
    </Payment>
    <!-- 电子签名的本尊 -->
    <Signature v-if="showElSign" :showElSign="showElSign" @onDone="onDone" />
  
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import Captcha from "../../components/Captcha.vue";
import Payment from "@/components/Popup/Payment.vue";
import Signature from "../../components/signature";
import { mapState } from "vuex";

export default {
  components: {
    Scroller,
    Myheader: Header,
    Captcha,
    Payment,
    Signature
  },
  data() {
    return {
      captchaShow: false,
      showSign: false, //是否显示电子签名
      showElSign: false, //是否显示电子签名界面
      transAmt: null, //金额
      cardNum: "", //卡号
      code: "", //短信验证码
      smsNbr: "", //
      base64Image: "", //手写签名
      WriteJson:"",
      fId:"",
      bId:"",
      my_params:{}
    };
  },
  computed: {
    //...mapState("myLoans", ["loginInfo", "_tokenName", "idInfo"])
  },
  created() {
    // this.transAmt = this.$route.query.transAmt;
    // this.cardNum = this.$route.query.cardNum;
    this.transAmt =  this.$Save.transAmt  || "";
    this.cardNum =  this.$Save.cardNum || "" ;
    this.fId = this.$Save.fId || "";
    this.bId = this.$Save.bId || "";
    
    


  },
  methods: {
    next() {
      this.captchaShow = true;
    },
    // 验证手机验证码
    transferCheck(data = {}) {
      console.log(data, "接受验证码组件参数");
      this.captchaShow = false;
      this.showSign = true;
      this.smsNbr = data.SmsNbr;
      this.code = data.code;
    },
    //展示电子签名
    showSignature() {
      this.showSign = false;
      this.showElSign = true;
    },
    //取消
    onDone(value) {
      //false的时候是完成，true的时候是取消
      this.showElSign = false;
      this.showSign = true;
      this.$nextTick(() => {
        this.WriteJson = value.length > 0 ? value[1] : "";
        this.base64Image = value.length > 0 ? value[2] : "";
        console.log("~~~~~~", this.base64Image);
        console.log(this.WriteJson,'222')
      });
    },
    SignContract() {
      
      //截取一下图片数据
      var bsimage =   this.base64Image.substring(this.base64Image.indexOf(',')+1);
      let params = {
        IDFrontFlag:this.fId, //	身份证正面图片标识
        IDEndFlag:this.bId, //	身份证反面图片标识
        // IDFrontFlag: "010001", //	身份证正面图片标识
        // IDEndFlag: "020002", //	身份证反面图片标识
        AcNo: this.cardNum, //	还款账号
        ApplyAmount: this.transAmt + '', //	申请金额
        WriteImg: bsimage || "",//签名图片
        WriteJson: this.WriteJson, //	签名轨迹json
        Location: this.$Save.addr || '', //	位置信息身份证地址
        BusinessType: "01", //	业务类型
        _tokenName: this.$Save._tokenName,
        SmsNbr: this.smsNbr,
        OTPPassword: this.code //短信验证码
      };
      this.my_params = params;
      this.request("SignContract", params)
        .then(res => {
          console.log(res);
          this.showSign = false;
          this.$router.push({ name: "applyResult" });
        })
        .catch(error => {
          console.log(error);
          this.showSign = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  .headerBox {
    z-index: 0;
  }
  .scrollerBox {
    background: #f5f6f8;
    padding: 0 px2vw(30);
    padding-top: px2vw(30);
    .personal-info {
      padding: 0 px2vw(40);
      padding-top: px2vw(20);
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
  .slot {
    padding: 0 px2vw(40);
    p {
      padding-top: px2vw(74);
      padding-bottom: px2vw(64);
      font-size: px2vw(70);
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(38, 38, 38, 1);
      text-align: center;
      span {
        font-size: px2vw(40);
        color: rgba(38, 38, 38, 1);
      }
    }
    .text-box {
      height: px2vw(100);
      font-size: px2vw(28);
      font-family: PingFangSC-Light, PingFangSC;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eff0f1;
      .text-left {
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
      }
      .text-right {
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .footer-box {
      margin-top: px2vw(170);
      margin-bottom: px2vw(20);
    }
    .img-box {
      width: 100%;
      height: px2vw(295);
      margin-top: px2vw(80);
      border-radius: px2vw(10);
      border: 1px solid rgba(80, 122, 201, 0.31);
      p {
        margin-top: px2vw(67);
        text-align: center;
        font-size: px2vw(30);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 139, 255, 1);
      }
      img {
        width: 100%;
        height: px2vw(295);
      }
    }
  }
}
</style>
