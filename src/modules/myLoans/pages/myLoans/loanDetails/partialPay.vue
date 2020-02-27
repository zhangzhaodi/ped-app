<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <Scroller>
      <div class="nav">
        <div class="title">易秒贷</div>
        <div class="credit-box">
          <div class="credit">
            <p>剩余待还(元)</p>
            <span>200,000.00</span>
          </div>
          <div class="credit">
            <p>最迟还款日</p>
            <span>2022-08-20</span>
          </div>
        </div>
      </div>
      <div class="content">
        <section class="field-section">
          <header class="field-header">
            <span class="title">还款金额（人民币）</span>
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
              placeholder="请输入金额"
            >
              <span slot="right" class="all-money"
                >修改金额</span
              ></md-input-item
            >
            <div class="wrong" v-if="wrongShow">
              <img class="right-icon" src="@/assets/cuowu.png" alt />
              超出卡内余额
            </div>
          </div>

          <div class="accounting-date">
            <div class="credit-box">
              <div class="credit">
                <p>本金</p>
                <p>¥97,900.00</p>
              </div>
              <div class="credit">
                <p>利息</p>
                <p>¥2,500.00</p>
              </div>
              <div class="credit">
                <p>罚息</p>
                <p>¥50.00</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="outer-box">
        <DebitCard @select="gainBindCardInfo" />
      </div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button :disabled="forbidden" @click="next">确定</van-button>
        </div>
      </div>
    </Scroller>
    <Payment :visible.sync="visible">
      <div class="slot">
        <p>
          <span>¥</span>
          {{ transAmt | Money }}
        </p>
        <div class="text-box">
          <div class="text-left">订单信息</div>
          <div class="text-right">易秒贷还款</div>
        </div>
        <div class="text-box">
          <div class="text-left">付款卡</div>
          <div class="text-right">
            {{ selectItem.BundingBankName }}({{
              selectItem.BundingAcctNo | CardNoFour
            }})
          </div>
        </div>
        <div class="footer-box">
          <div class="btn-box">
            <van-button>确定</van-button>
          </div>
        </div>
      </div>
    </Payment>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import DebitCard from "../../../components/DebitCard";
import Payment from "@/components/Popup/Payment.vue";
import { Button } from "vant";
import { Amount, InputItem } from "mand-mobile";

export default {
  components: {
    Myheader: Header,
    Scroller,
    DebitCard,
    Payment,
    [Button.name]: Button,
    [Amount.name]: Amount,
    [InputItem.name]: InputItem
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      periods: "6",
      transAmt: "2000",
      upperMoney: null,
      balance: "1111",
      forbidden: true,
      visible: false,
      selectItem: {}
    };
  },
  created() {
    this.upperMoney = parseFloat(this.transAmt);
    this.verify();
  },
  mounted() {},
  computed: {
    wrongShow() {
      let show = false;
      if (Number(this.transAmt) > Number(this.balance)) {
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
  },
  methods: {
    //大写金额
    onInputChange(name, value) {
      console.log(value);
      this.upperMoney = parseFloat(value);
    },
    next() {
      this.visible = true;
    },
    //金额是否为空
    verify() {
      if (this.transAmt.length > 0) {
        this.forbidden = false;
      } else {
        this.forbidden = true;
      }
    },
    //获取绑定卡信息
    gainBindCardInfo(params) {
      this.selectItem = params;
      // this.BankBinQuery();
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    padding-top: px2vw(20);
    .nav {
      background: #fff;
      padding: px2vw(40);
      .title {
        font-size: px2vw(30);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
        margin-bottom: px2vw(30);
      }
      .credit-box {
        padding-right: px2vw(252);
        display: flex;
        justify-content: space-between;
        p {
          font-size: px2vw(22);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
          margin-bottom: px2vw(12);
        }
        span {
          font-size: px2vw(26);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
      }
    }
    .content {
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
            font-size: px2vw(30);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
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
            display: flex;
            justify-content: space-between;
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
            .all-money {
              font-size: px2vw(26);
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(62, 143, 255, 1);
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
          .credit-box {
            padding: 0 px2vw(40);
            .credit {
              display: flex;
              margin-bottom: px2vw(20);
              p {
                font-size: px2vw(22);
                font-family: PingFangSC-Light, PingFang SC;
                font-weight: 300;
                color: rgba(125, 125, 125, 1);
                text-indent: 0;
                margin-right: px2vw(20);
              }
            }
            .credit:last-child {
              margin-bottom: 0;
            }
          }
        }
        .filed_cell {
          padding-left: px2vw(40);
          padding-right: px2vw(40);
          &:not(:last-child) .van-cell {
            border-bottom: 1px solid #eff0f1;
          }
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
  }
  .outer-box {
    padding: 0 px2vw(40);
    margin-top: px2vw(20);
    background: #fff;
  }
}
.slot {
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
    padding: 0 px2vw(40);
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
    margin-bottom: px2vw(20);
  }
}
</style>
