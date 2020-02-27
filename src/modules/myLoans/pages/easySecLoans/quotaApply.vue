<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <div class="cell-remark" @click="showCardNum = true">
        <div class="left">还款账号</div>
        <div class="right">
          <div class="remark-name">{{ cardNum }}</div>
          <span class="iconfont">&#xe649;</span>
        </div>
      </div>
      <section class="field-section">
        <header class="field-header">
          <span class="title">申请额度（人民币）</span>
        </header>
        <div class="tranfer-amount">
          <md-amount
            class="upper"
            :value="upperMoney"
            :style="{ visibility: transAmt ? 'visible' : 'hidden' }"
            is-capital
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
      <div class="footer-box">
        <div class="btn-box">
          <van-button :disabled="forbidden" @click="next">确定</van-button>
        </div>
      </div>
    </Scroller>
    <MyDialog
      :showCancel="false"
      title="提示"
      :show="alertShow"
      :isClose="false"
      @con="confirm"
    >
      <p slot="content" class="dialog-content">
        对不起，您暂不符合我行线上贷款申请条件
      </p>
    </MyDialog>
    <MyDialog
      :showCancel="false"
      title="提示"
      :show="isShow"
      :isClose="false"
      @con="goContractSign"
    >
      <p slot="content" class="dialog-content">
        额度申请提交成功，我们将在第一时间完成审批并通知您，请耐心等待
      </p>
    </MyDialog>
    <BottomPopup title="请选择还款账号" :isShow="showCardNum" @close="Onclose">
      <van-cell
        v-for="(item, index) in AcList"
        :key="index"
        :title="item.name"
        clickable
        @click="selectBankCard(index)"
      >
        <template slot="title">
          <div class="bank-icon_wrap">
            <img src="@/assets/bankIcon/icon_CTS.png" alt />
          </div>
        </template>
        <template slot="default">
          <div class="info">
            <div class="card">{{ item.no | CardHide }}</div>
            <div class="balance">{{ item.department.name }}</div>
          </div>
          <span v-if="select == index" class="iconfont">&#xe620;</span>
        </template>
      </van-cell>
    </BottomPopup>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { Amount, InputItem } from "mand-mobile";
import Scroller from "@/components/Scroller.vue";
import Dialog from "@/components/Dialog/Dialog.vue";
import BottomPopup from "../../components/bottomPopup";
import { Cell } from "vant";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Scroller,
    Myheader: Header,
    [Amount.name]: Amount,
    [InputItem.name]: InputItem,
    [Cell.name]: Cell,
    MyDialog: Dialog,
    BottomPopup
  },
  data() {
    return {
      forbidden: true,
      showCardNum: false, //是否展示选择银行卡
      transAmt: "", //金额
      upperMoney: null,
      limit: 30000,
      isShow: false, //成功的提示
      alertShow: false, //失败的提示
      AcList: [],
      MobilePhone: "", //电话号码
      cardNum: "",
      select: 0
    };
  },
  computed: {
    // ...mapState("myLoans", ["loginInfo", "_tokenName", "idInfo"]),
    wrongShow() {
      let show = false;
      if (Number(this.transAmt) > this.limit) {
        show = true;
      }
      return show;
    }
  },
  created() {
    var personData = this.$Save.personData;
    this.cardNum = personData.AcList[0].no;
    this.AcList = personData.AcList;
    // 卡列表;
    this.MobilePhone = personData.MobilePhone;
    this._tokenName = this.$Save._tokenName;//获取token
  },
  methods: {
    // ...mapMutations("myLoans", ["updataTokenName"]),
    //大写金额
    onInputChange(name, value) {
      console.log(value);
      this.upperMoney = parseFloat(value);
    },
    next() {
      //易秒贷/游乐贷额度申请
      this.CreditLimitApply();
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
    //失败提示的确定
    confirm() {
      this.alertShow = false;
    },
    //成功提示的确定，然后跳转到签约页面
    goContractSign() {
      this.isShow = false;
      this.$Save.transAmt = this.transAmt || '';
      this.$Save.cardNum = this.cardNum || '';
      
      //然后进行跳转
      this.$router.push({
        name: "contractSign",
        query: {
          transAmt: this.transAmt,
          cardNum: this.cardNum
        }
      });
    },
    //易秒贷/游乐贷额度申请
    CreditLimitApply() {
      this.request(
        "CreditLimitApply",
        {
          BackAccount: this.cardNum, //还款账户号
          BusinessSum: this.transAmt, //申请金额
          // IDFrontFlag: this.idInfo.frontId, //	身份证正面图片标识
          // IDEndFlag: this.idInfo.backId, //	身份证反面图片标识
          IDFrontFlag: this.$Save.fId, //	身份证正面图片标识
          IDEndFlag: this.$Save.bId, //	身份证反面图片标识
          BusinessType: "01", //	业务类型01易秒贷 02公积金贷 03游乐贷 04 线上贷款
          _tokenName: this._tokenName
        },
        false,
        true
      )
        .then(res => {
          console.log(res);
          this.isShow = true;
          //this.updataTokenName(res._tokenName);
          //额度申请成功之后，把tokenName获取一下
          this.$Save._tokenName = res._tokenName;

        })
        .catch(error => {
          console.log(error);
          this.alertShow = true;
        });
    },
    //关闭选择卡号
    Onclose() {
      this.showCardNum = false;
    },
    //选择还款账号
    selectBankCard(index) {
      this.select = index;
      this.cardNum = this.AcList[index].no;
      this.showCardNum = false;
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
    .cell-remark {
      display: flex;
      align-items: center;
      line-height: px2vw(100);
      padding: 0 px2vw(40);
      margin-top: px2vw(20);
      background: #fff;
      .left {
        width: px2vw(160);
        font-size: px2vw(30);
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(38, 38, 38, 1);
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: space-between;
        font-size: px2vw(30);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 300;
        color: rgba(168, 168, 168, 1);
        .remark-name {
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .remark-card {
          font-weight: 300;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        span {
          font-size: px2vw(22);
          line-height: px2vw(110);
        }
      }
    }
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
  }
  .van-popup {
    .van-cell {
      padding: px2vw(20) px2vw(50) px2vw(20) px2vw(43);
      .van-cell__title {
        width: px2vw(80);
        flex: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .bank-icon_wrap {
          width: px2vw(60);
          display: flex;
          flex-direction: column;
          justify-content: center;
          img {
            width: 100%;
          }
        }
      }
      .van-cell__value {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .card {
            font-size: px2vw(30);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
          }
          .balance {
            font-size: px2vw(28);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(125, 125, 125, 1);
            letter-spacing: 1px;
          }
        }
        span {
          font-size: px2vw(30);
          color: #3e8fff;
          line-height: px2vw(70);
        }
      }
    }
  }
}
</style>
