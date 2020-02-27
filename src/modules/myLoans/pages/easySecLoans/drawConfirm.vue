<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <!-- 个人信息 -->
      <div class="personal-info">
        <div class="trustee-box">个人信息</div>
        <div class="cell-remark">
          <div class="left">姓名</div>
          <div class="right">
            <div class="remark-name">{{ name }}</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">身份证号</div>
          <div class="right">
            <div class="remark-name">{{ idCard }}</div>
          </div>
        </div>
      </div>
      <!-- 贷款信息 -->
      <div class="personal-info">
        <div class="trustee-box">贷款信息</div>
        <div class="cell-remark">
          <div class="left">提款期限</div>
          <div class="right">
            <div class="remark-name">{{ deadLine }}</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">提款金额</div>
          <div class="right">
            <div class="remark-name">¥{{ transAmt | Money }}</div>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">放款账户</div>
          <div class="right">
            <div class="remark-name">{{ account | bankCardNum }}</div>
          </div>
        </div>
      </div>
      <!-- 还款信息 -->
      <div class="personal-info">
        <div class="trustee-box">还款信息</div>
        <div class="cell-remark">
          <div class="left">还款方式</div>
          <div class="right">
            <div class="remark-name">{{ repayMode }}</div>
          </div>
        </div>
      </div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button @click="mynext">确定</van-button>
        </div>
      </div>
    </Scroller>

    <!-- 验证码 -->
    <Captcha :visible.sync="captchaShow" @confirm="transferCheck" />
    <!-- 电子签名弹框 -->
    <Payment :visible.sync="showSign" title="电子签名">
      <div class="slot">
        <div class="img-box" @click="showSignature">
          <p v-show="base64Image.length > 0 ? false : true">电子签名</p>
          <img style="width:100%;" :src="base64Image" alt="" />
        </div>
        <div class="footer-box">
          <div class="btn-box">
            <van-button @click="mysure">确定</van-button>
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
import Captcha from "../../components/Captcha.vue"; //验证码
import Payment from "@/components/Popup/Payment.vue";
import Signature from "../../components/signature";
export default {
  data() {
    return {
      //上级信息：{drawUse: "购车", repayMode: "等额本息", deadLine: "12个月"}
      drawUse: "",
      repayMode: "",
      deadLine: "",
      personData: {}, //个人信息
      name: "", //名字
      idCard: "", //身份证
      account: "", //提放款账户
      transAmt: "", //提款金额
      ExecuteYearRate: "", //年利率
      ContractNo: "", //合同号

      //这块儿是验证码和签名部分
      captchaShow: false,
      showSign: false, //是否显示电子签名
      showElSign: false, //是否显示电子签名界面
      code: "", //短信验证码
      _tokenName: "",
      smsNbr: "", //
      dotImage: [],
      base64Image: "",
      password: "", //密码
      faceId:"",//人脸识别的id
      my_params:{}
    };
  },
  components: {
    Scroller,
    Myheader: Header,
    Captcha, //验证码
    Payment, //
    Signature
  },
  created() {
    //拿参数
    console.log("~~~~~~~~~", this.$route.params);
    var para = this.$route.params || {};
    //上一级信息拿到
    if (!this.empty(para)) {
      this.drawUse = para.drawUse || "";
      this.repayMode = para.repayMode || "";
      this.deadLine = para.deadLine || "";
      this.transAmt = para.transAmt || "";
      this.ExecuteYearRate = para.ExecuteYearRate || ""; //年利率
      this.ContractNo = para.ContractNo || ""; //合同号
    }
    //个人信息给下值
    this.personData = this.$Save.personData || {};
    //判断下个人信息再给吧
    if (!this.empty(this.personData)) {
      //在里边获取下个人信息
      this.name = this.personData.PayeeName || "";
      this.idCard = this.personData.IdenNum || "";
      //拿到银行卡
      console.log("~~~~~~~~~~", this.personData.AcList || []); //显示银行卡信息
      var AcList = this.personData.AcList || []; //拿到银行卡信息
      //取第一个
      if (AcList.length != 0) {
        this.account = AcList[0].no;
        console.log("~~~~~~", this.account);
      }
    }
    //得到名字和身份证号
    
  },
  methods: {
    //做一个对象的为空判断
    empty(obj) {
      for (let key in obj) {
        return false; //非空
      }
      return true; //为空
    },
    //写一个唤起的方法
    mynext() {
      this.DrawMoneyConfirm();
    },
    //最后的交易部分
    mysure() {
      this.showSign = false;//把框放下去
      //获取个人信息
      this.FaceRecognition();
    },
    DrawMoneyConfirm() {
      var time = "";
      if (this.deadLine.length == 3) {
        time = this.deadLine.substr(0, 1);
      }
      if (this.deadLine.length == 4) {
        time = this.deadLine.substr(0, 2);
      }
      var mode = this.repayMode == "先息后本" ? "2" : "3";
      //提款申请
      this.request("DrawMoneyConfirm", {
        ContractNo: this.ContractNo || "", //合同号
        AcNo: this.account || "", //卡号
        Amount: this.transAmt || "", //金额
        Term: time || "", //期数
        PayType: mode || "", //还款方式
        Purpose: this.drawUse || "", //用途
        FamilyAdd: "zhengz" || "", //家庭住址
        ExecuteYearRate: this.ExecuteYearRate + ''|| "", //年利率
        BusinessType: "01" //01易秒贷 02公积金贷 03游乐贷 04 线上贷款
      })
        .then(res => {
          console.log(res);
          this._tokenName = res._tokenName;
          this.captchaShow = true;

          // if (res._RejCode == "000000") {
          //   //跳转到成功页面
          //   this.$router.push({ name: "drawResult" });
          // }
          // (this.ExecuteYearRate = res.ExecuteYearRate), //年利率
          //   (this.ContractNo = res.ContractNo);
          
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 验证手机验证码
    transferCheck(data = {}) {
      console.log(data, "接受验证码组件参数");
      this.captchaShow = false;
      this.smsNbr = data.SmsNbr;
      this.code = data.code;
      this.SecureKeyboard();
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
        this.base64Image = value.length > 0 ? value[2] : "";
        console.log("~~~~~~", this.base64Image);
        this.dotImage = value.length > 0 ? value[1] : "";
      });
      //console.log('~~~~~~~~~~',value);
    },
    SecureKeyboard() {
      window.NativeCall.SecureKeyboard(value => {
        this.password = value;
        this.showSign = true;
      });
    },
    //验证人脸 Name，Cardno
    FaceRecognition() {
      window.NativeCall.FaceRecognitionLoans(
        {Name:this.name,
        Cardno:this.idCard},(param) => {
        //alert(param);
        // this.DrawMoney();
        let res = JSON.parse(param);
        this.faceId = res.Id;
        //最后步骤
        this.DrawMoney();

      });
    },
    DrawMoney() {
      var time = "";
      if (this.deadLine.length == 3) {
        time = this.deadLine.substr(0, 1);
      }
      if (this.deadLine.length == 4) {
        time = this.deadLine.substr(0, 2);
      }
      var mode = this.repayMode == "先息后本" ? "2" : "3";
      var bsimage =   this.base64Image.substring(this.base64Image.indexOf(',')+1);
      let  params = {
        WriteImg: bsimage || '', //	签名图片
        WriteJson: this.dotImage || '', //	签名轨迹json
        ContractNo: this.ContractNo || '', //	合同编号
        FaceImgId: this.faceId || '', //	人脸图片id
        TrsAcNo: this.account || '', //贷款账号
        Amount: this.transAmt || '', //	申请金额
        Term: time || '', //	期限
        PayType: mode ||'', //	还款方式
        Purpose: this.drawUse || '', //	贷款用途
        FamilyAdd: "zhengz", //居住地址
        _tokenName:this._tokenName,
        ExecuteYearRate: this.ExecuteYearRate+'' || '', //	执行利率
        TrsPassword:this.password || '',
        OTPPassword:this.code || '',
        SmsNbr:this.smsNbr || '',
        BusinessType:'01'
      }
      this.my_params = params;
      this.request("DrawMoney",params)
        .then(res => {
          console.log(res);
          if (res._RejCode == "000000") {
            //跳转到成功页面
            this.$router.push({ name: "drawResult" });
          }
          // (this.ExecuteYearRate = res.ExecuteYearRate), //年利率
          //   (this.ContractNo = res.ContractNo);
        })
        .catch(error => {
          console.log(error);
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
