<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <section class="field-section">
        <header class="field-header">
          <span class="title">提款金额（人民币）</span>
        </header>
        <div class="tranfer-amount">
          <md-amount
            class="upper"
            :value="upperMoney"
            is-capital
            :style="{ visibility: transAmt ? 'visible' : 'hidden' }"
          ></md-amount>
          <md-input-item
            type="money"
            class="amount"
            @input="verify"
            v-model="transAmt"
            :is-amount="true"
            @change="onInputChange"
            placeholder="请输入"
          ></md-input-item>
          <div class="wrong" v-show="wrongShow">
            <img class="right-icon" src="@/assets/cuowu.png" alt />
            输入数额大于贷款限额，请重新输入
          </div>
        </div>
        <div class="accounting-date">
          最高可提款{{ limit | Money }}元,且为100整数倍
        </div>
      </section>
      <p class="myplan"  @click="RepaymentPlanReckon">
        <span class="vi">点击查看</span>
        <span style="margin-left:2px;color:#F5F6F8">还款计划</span>
      </p>
      <div class="footer-box" @click="goEasyConfirm">
        <div class="btn-box">
          <van-button :disabled="forbidden">确定</van-button>
        </div>
      </div>
    </Scroller>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { Amount, InputItem } from "mand-mobile";
import Scroller from "@/components/Scroller.vue";
export default {
  data() {
    return {
      forbidden: true,
      transAmt: "",
      upperMoney: null,
      limit: 30000,
      para:{},
    };
  },
  components: {
    Scroller,
    Myheader: Header,
    [Amount.name]: Amount,
    [InputItem.name]: InputItem
  },
  //传参接收
  created(){
    var drawUse = this.$route.params.drawUse || '';//提款用途
    var repayMode = this.$route.params.repayMode || '';//还款方式
    var deadLine = this.$route.params.deadLine || '';//还款期限
    // ContractNo:this.ContractNo || '',//加一个合同号
    // ExecuteYearRate:this.ExecuteYearRate || '', //加一个年利率
    var ContractNo = this.$route.params.ContractNo || '';//合同号
    var ExecuteYearRate = this.$route.params.ExecuteYearRate || '';//年利率

    //把带过来的参数包装一下传到下一级
    this.para = {
      drawUse:drawUse,
      repayMode:repayMode,
      deadLine:deadLine,
      ContractNo:ContractNo,//合同号
      ExecuteYearRate:ExecuteYearRate //年利率
    }
  },
  methods: {
    onInputChange(name, value) {
      console.log(value);
      this.upperMoney = parseFloat(value);
    },
    goEasyConfirm() {
      this.visible = true;
      //跳转到确认页的时候带参过去，到了之后再拿$Save
      this.para.transAmt = this.transAmt;
      this.$Save.Amt = this.transAmt;//金钱
      this.$router.push({ name: "easyConfirm",params:this.para});
    },
    SecureKeyboard() {
      this.EleAcNoTransInConfirm();
    },
    verify() {
      if (
        this.transAmt.length > 0 &&
        this.transAmt % 100 == 0 &&
        this.transAmt <= this.limit
      ) {
        this.forbidden = false;
      } else {
        this.forbidden = true;
      }
    },
    //还款计划
    RepaymentPlanReckon() {
      this.request("RepaymentPlanReckon", {
        PayType: "2", //	还款类型 2 /3
        Amount: "30000", //	金额
        Term: "12", //	期数
        Rate: "2.00", //	利率
        BusinessType: "01" //	交易类型
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    wrongShow() {
      let show = false;
      if (Number(this.transAmt) > this.limit) {
        show = true;
      }
      return show;
    }
  },
  watch: {
    transAmt: {
      handler: function(val, oldVal) {
        // console.log(val, oldVal);
        val = val.toString();
        var arr0 = val.split("");
        var arr = val.split(".");
        // 第一位输入的是0的时候进行处理采用第二位的数字
        if (arr0.length == 2 && arr0[0] == "0" && arr0[1] !== ".") {
          this.transAmt = Number(arr0[1]);
          return;
        }
        //小数点后超过两位时取前两位
        if (val == "") {
          this.transAmt = "";
        } else if (
          (arr.length == 2 && arr[1].length > 2) ||
          arr[0].length > 14
        ) {
          this.transAmt = Number(oldVal);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: #f5f6f8;
    .field-section {
      margin-top: px2vw(20);
      background: #fff;
      .field-header {
        display: flex;
        align-items: center;
        height: px2vw(80);
        font-weight: 400;
        padding-left: px2vw(40);
        padding-right: px2vw(40);
        img {
          width: px2vw(32);
          height: px2vw(32);
          margin-right: px2vw(20);
        }

        .title {
          color: $color-text;
          font-size: px2vw(30);
        }
      }
      .tranfer-amount {
        position: relative;
        margin: 0 px2vw(40);
        /deep/ .upper.md-amount {
          display: block;
          color: #ffb52b;
          font-size: px2vw(24);
          font-weight: 400;
          margin-bottom: px2vw(8);
        }
        /deep/ .md-field-item-content {
          font-size: px2vw(40);
          font-weight: 500;
          height: px2vw(60);
          padding-bottom: px2vw(30);
          min-height: inherit;
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          .md-input-item-input {
            &::-webkit-input-placeholder {
              /* WebKit, Blink, Edge */
              color: #a8a8a8;
              font-size: px2vw(32);
              line-height: normal;
              font-family: PingFangSC;
              font-weight: 300;
            }
            &::-moz-placeholder {
              /* Mozilla Firefox 19+ */
              color: #a8a8a8;
              font-size: px2vw(32);
              font-family: PingFangSC;
              font-weight: 300;
            }
            &::placeholder {
              /* 大部分现代浏览器 */
              color: #a8a8a8;
              font-size: px2vw(32);
              font-family: PingFangSC;
              font-weight: 300;
            }
            &::-ms-input-placeholder {
              /* Microsoft Edge */
              color: #a8a8a8;
              font-size: px2vw(32);
              font-family: PingFangSC;
              font-weight: 300;
            }
          }
        }
        .wrong {
          position: absolute;
          bottom: px2vw(2);
          font-size: px2vw(24);
          color: #ff4040;
          img {
            width: px2vw(22);
            height: px2vw(22);
            margin-right: px2vw(10);
          }
        }
      }
      .accounting-date {
        font-size: px2vw(24);
        font-family: PingFangSC-Light, PingFangSC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
        margin-top: px2vw(16);
        text-indent: px2vw(40);
        padding-bottom: px2vw(20);
      }
      .filed_cell {
        padding-left: px2vw(40);
        padding-right: px2vw(40);
        &:not(:last-child) .van-cell {
          border-bottom: 1px solid #eff0f1;
        }
      }
    }
    .footer-box {
      margin-top: px2vw(100);
      .btn-box {
        padding: 0 px2vw(40);
        .van-button {
          color: #fff;
        }
      }
    }
    .myplan{
      padding:  0 px2vw(40);
      height: px2vw(100);
      line-height: px2vw(100);
      font-size: px2vw(24);
      .vi{
        color: #008BFF;
      }
    }

  }
}
</style>
