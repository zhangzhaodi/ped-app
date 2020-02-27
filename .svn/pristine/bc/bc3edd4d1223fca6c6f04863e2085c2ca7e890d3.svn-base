<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <Scroller>
      <!-- 正常的还钱计划 -->
      <div class="loans-box" v-for="(item,index) in data" :key="index" :name="item">
        <div class="loans-top">
          <div class="title">易秒贷</div>
          <div class="date">申请日期 {{openDate | DateChange}}</div>
          <div class="repayment">
            <div class="repay-left">
              <p>剩余待还(元)</p>
              <span>{{item.Total}}</span>
            </div>
            <div class="repay-right">
              <p>最迟还款日</p>
              <span>{{item.Date | DateChange}}</span>
            </div>
          </div>
        </div>
        <div class="loans-bottom">
          <div class="amt">
            <div class="amt-left">本金</div>
            <div class="amt-right">{{item.Principle}}</div>
          </div>
          <div class="rate">
            <div class="amt-left">利息</div>
            <div class="amt-right">{{item.Interest}} % </div>
          </div>
          <!-- <div class="derate">
            <div class="amt-left">罚息</div>
            <div class="amt-right">¥50.00</div>
          </div> -->
        </div>
      </div>
    </Scroller>
    <div class="footer">
      <div class="footer-left">
        <p>总计还款金额</p>
        <span>¥{{ totalMoney | Money }}</span>
      </div>
      <van-button @click="showPayment" type="default">提前还款</van-button>
    </div>
    <Payment :visible.sync="visible">
      <div class="slot">
        <p>
          <span>¥</span>
          {{ totalMoney | Money }}
        </p>
        <div class="text-box">
          <div class="text-left">订单信息</div>
          <div class="text-right">{{interestType}}</div>
        </div>
        <div class="">
          <!-- <div class="text-left">充值方式</div> -->
          <!-- <div class="text-right">
            {{ selectItem.BundingBankName }} | 储蓄卡({{
              selectItem.BundingAcctNo | CardNoFour
            }})
          </div> -->
          <!-- 将跳出银行卡选择，整个都放进去，以防止 -->
          <div class="text-box1">
            <DebitCard @select="select"></DebitCard>
          </div>
          
        </div>
        <div class="footer-box" @click="isSign">
          <div class="btn-box">
            <van-button>立即付款</van-button>
          </div>
        </div>
      </div>
    </Payment>
    <Payment :visible.sync="showSign" title="电子签名">
      <div class="slot">
        <div class="img-box" @click="showSignature">
          <p v-show="base64Image.length > 0? false:true">电子签名</p>
          <img  style="width:100%;" :src="base64Image" alt="" />
        </div>
        <div class="my_refresh" v-show="base64Image.length > 0 ? true:false" 
           @click="showSignature"> 
           重新签名
        </div>
        <div class="footer-box">
          <div class="btn-box">
            <van-button @click="doConfirm()"> 确定</van-button>
          </div>
        </div>
      </div>
    </Payment>
    <Signature  v-if="showElSign" :showElSign="showElSign" @onDone="onDone" />
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import Payment from "@/components/Popup/Payment.vue";
import Signature from "../../../components/signature";
import DebitCard from "@/components/Popup/DebitCard.vue";
import { Button } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    Payment,
    Signature,
    [Button.name]: Button,
    DebitCard
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      visible: false, //
      showSign: false, //是否显示电子签名
      showElSign: false, //是否显示电子签名界面
      transAmt: "4000",
      selectItem: {},
      data:[],
      leng:'',
      totalMoney:0.00,//还款金额显示
      openDate:'',//贷款信息数组中的数据
      loadsData:{},
      interestType:'',//还款方式
      //这块儿是验证码和签名部分
      captchaShow: false,
      dotImage:[],
      base64Image:'',//得到base64图片
      data1:{},//贷款信息
      data2:{},//还款计划
      acCard:'',//贷款账号和付款账号的问题
      my_total:'',//总金额
      my_order:'',//账户序号
      tokenName:'',//token 
      businessType:'',//账户类型


    };
  },
  filters:{
    Total(val1,val2){
      return parseFloat(val1) + parseFloat(val2);
    }
  },
  created() {
    console.log("========",this.$route.params);
    // LoanAcNo: "6223380011011801155"
    // LoanName: "李文龙"
    // PayLoanAcNo: "6223380011011801155"
    // Term: "1"
    // Principle: "527.76"
    // Interest: "70.00"
    // PaymentAmount: (...)
    // Date: "20200221"
    // State: "未还"
    var para = this.$route.params || {}; //个人参数
    let data =  para.data || [];//获取到的个人信息参数

    var totalMoney=0.00;//默认值加上
    data.forEach((item,index)=>{
      var Total = parseFloat(item.Principle) + parseFloat(item.Interest);
      totalMoney += parseFloat(Total);//加到一起的总金额
      item.Total = Total;
      this.data[index] = item;
    });
    this.totalMoney = totalMoney;//加一个总金额
    //获取时间
    this.openDate = this.$route.params.opendate;    
    this.leng = para.leng;
    //付款总金额
    this.loadsData = this.$route.params.loadsdata || {};//得到一个贷款信息
    this.interestType = this.loadsData.InterestType || '';
    //获取个人信息
    this.data1 = this.$route.params.data1 || {};//贷款信息
    this.data2 = this.$route.params.data2 || {};//个人信息
    //总金额
    this.my_total = this.data1.List[0].LoanAmount || '';
    //账户序号
    this.my_order = this.data1.List[0].Order || '';
    //获取tokenName 
    this.tokenName = this.data1._tokenName || '';
    //类型
    this.businessType = this.data1.BusinessType || '';


  },
  mounted() {},
  computed: {},
  methods: {
    showPayment() {
      this.visible = true;//弹出弹框
    },
    isSign() {
      this.visible = false;
      this.showSign = true;
    },
    //弹出电子签名页面
    showSignature() {
      this.showSign = false;
      this.showElSign = true;
    },
    //取消
    onDone(value) {
      console.log(value);
      this.showElSign = false;
      this.showSign = true;
      //如果点击确认才进行响应操作
      if(value[0] == false){
        //得到图片
        this.$nextTick(()=>{
          this.base64Image = value.length > 0 ?value[2]:'';
          console.log("~~~~~~",this.base64Image);
        });
        //获取签名轨迹
        this.dotImage  = value[1];//签名轨迹
      }

 
      
    },
    //银行卡的选择
    select(data){
      //银行卡
      console.log('------card',data);
      //获取卡号
      this.acCard = data.vouId;//获取了卡号


    },
    //最终的确认按钮
    doConfirm(){
      //把弹出框关掉把
      this.showSign = false;
      this.showElSign = false;
      //this.allSend();
      this.allSend();//本地测试使用
      
    },

    //全额付款
    allSend(){

      var bsimage =   this.base64Image.substring(this.base64Image.indexOf(',')+1);
      //调用密码键盘
      window.NativeCall.SecureKeyboard(par => {
          
        //参数
        var params = {
          OrderAcNo:this.acCard,//贷款账号
          TrsAcNo:this.acCard,//付款账号
          TotalAmount:this.my_total,//总金额
          WriteImg:bsimage,//签名图片
          WriteJson:this.dotImage,//签名轨迹
          RepayAmount:this.totalMoney,//还款金额 
          Order:this.my_order,//账户序号
          TrsPassword:par,//交易密码
          BusinessType:this.businessType,//交易类型
          _tokenName:this.tokenName,
        };

        //然后再次调用数据请求
        this.request("BatchSecodeLoanRepaymentYi", params)
        .then(res => {
          this.$router.push({
          name: "repaySuccessful"});
        })
        .catch(error => {
          console.log(error);
        });

      });

    },
    //本地测试使用
    allSend1(){
      var bsimage =   this.base64Image.substring(this.base64Image.indexOf(',')+1);
      //参数
      var params = {
        OrderAcNo:this.acCard,//贷款账号
        PayerAcNo:this.acCard,//付款账号
        TotalAmount:this.my_total,//总金额
        WriteImg:bsimage,//签名图片
        WriteJson:this.dotImage,//签名轨迹
        RepayAmount:this.totalMoney,//还款金额 
        Order:this.my_order,//账户序号
        TrsPassword:'MDAwMDAxNDABAgAAAWgAAACkAABL7lWLo7zefeZW9ij8/NSZTaFc8wHI7pj7Qm6Iq7yusX+6jMY97nOTTouOluV7xLqKqsQmtHskuc1bJlzAKtdHOoYgc07lHBhXhdH6vmqJixYIgE7Kj0lypXPYhaxvvebSajoMu2Vi5mPYyv3tZ3slrjFj1gxAUQ6LAI8Un6RePzAwMDAwMjIzn6fUpijNCeZ/J9OaPI8E0Ip4bldOyZQPz+sa3evBp8LQrWnzCC05Q2PoEpgrbT5MxCf+6GrUlY1xT8b57/APTsJfWZNy9bLxzcuNMjbA2MR5HyF/xR6u5NFAStTVHdkHCAOqidBvLVsZX8DeVldEFEQ2KJ28XpbSAziIbVhfGyb2rzsL67+RlZLVdYz952njRea4p3shYd3cxxgFWBWVUZ9Uz62YdGoZfYnbgyvxsS8MNPVPQCiF99qFsAGto0XHZI0MkZHE1+7RtJ8Q3gUdDryG26Qul6+ATTrw3zUKBQ==',//交易密码
        BusinessType:this.businessType,//交易类型
        _tokenName:this.tokenName,
      };

      //然后再次调用数据请求
      this.request("BatchSecodeLoanRepaymentYi", params)
      .then(res => {
        this.$router.push({
        name: "repaySuccessful"});
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
    background: none;
    padding: 0 px2vw(30);
    .loans-box {
      margin-top: px2vw(30);
      padding: px2vw(40);
      padding-bottom: px2vw(30);
      background: rgba(255, 255, 255, 1);
      border-radius: px2vw(16);
      .loans-top {
        border-bottom: 1px solid #eff0f1;
        padding-bottom: px2vw(30);
        .title {
          font-size: px2vw(30);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(38, 38, 38, 1);
        }
        .date {
          margin-top: px2vw(30);
          font-size: px2vw(26);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
        .repayment {
          margin-top: px2vw(40);
          display: flex;
          .repay-left {
            margin-right: px2vw(136);
          }
          p {
            margin-bottom: px2vw(12);
            font-size: px2vw(22);
            font-family: PingFangSC-Light, PingFang SC;
            font-weight: 300;
            color: rgba(125, 125, 125, 1);
          }
          span {
            font-size: px2vw(26);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
          }
        }
      }
      .loans-bottom {
        margin-top: px2vw(30);
        .amt {
          display: flex;
        }
        .rate {
          display: flex;
          margin: px2vw(20) 0;
        }
        .derate {
          display: flex;
        }
        .amt-left {
          font-size: px2vw(24);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
          margin-right: px2vw(20);
        }
        .amt-right {
          font-size: px2vw(24);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(125, 125, 125, 1);
        }
      }
    }
  }
  .footer {
    height: px2vw(120);
    background: rgba(255, 255, 255, 1);
    box-shadow: -5px -5px 20px 0px rgba(69, 69, 83, 0.05);
    display: flex;
    .footer-left {
      flex: 1;
      padding: px2vw(24) 0;
      padding-left: px2vw(40);
      p {
        font-size: px2vw(22);
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
        margin-bottom: px2vw(14);
      }
      span {
        font-size: px2vw(36);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
      }
    }
    .van-button {
      height: 100%;
      width: px2vw(305);
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
    .text-box1{
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
      img{
        width: 100%;
        height: px2vw(295);
      }

    }
    .my_refresh{
      color: rgba(0, 139, 255, 1);
      height: px2vw(35);
      line-height: px2vw(35);
      font-size: px2vw(30);
      width: 100%;
      text-align: center;
      margin-top:10px;
    }
  }
}
</style>
