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
      <div class="loans-out">
        <!-- 提款期限 -->
        <div class="draw-limit">
          <div class="loan-bottom">
            <van-collapse v-model="activeNames2">
              <van-collapse-item name="1">
                <div class="coll-title" slot="title">
                  <div class="left">提款期限</div>
                  <div v-if="deadLine" class="drawUse">{{ deadLine }}</div>
                  <div v-else class="right">请选择提款期限</div>
                </div>
                <ul>
                  <li
                    @click="choiceLi2(1, '6个月')"
                    :class="{ activeLi: index2 == 1 }"
                  >
                    6个月
                  </li>
                  <li
                    @click="choiceLi2(2, '12个月')"
                    :class="{ activeLi: index2 == 2 }"
                  >
                    12个月
                  </li>
                  <li
                    @click="choiceLi2(3, '18个月')"
                    :class="{ activeLi: index2 == 3 }"
                  >
                    18个月
                  </li>
                  <li
                    @click="choiceLi2(4, '24个月')"
                    :class="{ activeLi: index2 == 4 }"
                  >
                    24个月
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <!-- 贷款信息 -->
        <div class="loan-info">
          <div class="loan-top">
            <div class="title">贷款信息</div>
            <div class="loan-text">
              <div class="left">年利率</div>
              <div class="right">7.2%</div>
            </div>
            <div class="loan-text">
              <div class="left">授信额度</div>
              <div class="right">¥3,000,000.00</div>
            </div>
            <div class="loan-text">
              <div class="left">可用额度</div>
              <div class="right">¥3,000,000.00</div>
            </div>
            <div class="loan-text">
              <div class="left">最晚提款期</div>
              <div class="right">12个月</div>
            </div>
            <div class="loan-text">
              <div class="left">放款账户</div>
              <div class="right">6226 8802 9723 5731</div>
            </div>
          </div>
        </div>
        <!-- 还款信息 -->
        <div class="payment-info">
          <div class="trustee-box">还款信息</div>
          <div class="cell-remark">
            <div class="left">还款方式</div>
            <div class="right">
              <div class="remark-name">等额本息</div>
            </div>
          </div>
          <div class="cell-remark">
            <div class="left">还款期限</div>
            <div class="right">
              <div class="remark-name">{{ deadLine }}</div>
              <div class="check-detail">
                <span>查看详情</span>
                <span class="iconfont">&#xe649;</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 个人信息 -->
        <div class="personal-info">
          <div class="trustee-box">个人信息</div>
          <div class="cell-remark">
            <div class="left">姓名</div>
            <div class="right">
              <div class="remark-name">朱佩奇</div>
            </div>
          </div>
          <div class="cell-remark">
            <div class="left">手机号码</div>
            <div class="right">
              <div class="remark-name">158 9068 1425</div>
            </div>
          </div>
          <div class="cell-remark">
            <div class="left">身份证号</div>
            <div class="right">
              <div class="remark-name">633300002201888888</div>
            </div>
          </div>
        </div>
      </div>
    </Scroller>
    <div class="footer-box">
      <div class="btn-box">
        <van-button :disabled="forbidden" @click="next">下一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { Amount, InputItem } from "mand-mobile";
import Scroller from "@/components/Scroller.vue";
import BottomPopup from "../../components/bottomPopup";
import { Button, Cell, Collapse, CollapseItem } from "vant";

export default {
  components: {
    Scroller,
    Myheader: Header,
    [Amount.name]: Amount,
    [InputItem.name]: InputItem,
    BottomPopup,
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data() {
    return {
      forbidden: true,
      transAmt: "",
      upperMoney: null,
      limit: 30000,
      activeNames2: [],
      index2: "",
      deadLine: "" //期限
    };
  },
  methods: {
    //大写金额
    onInputChange(name, value) {
      console.log(value);
      this.upperMoney = parseFloat(value);
    },
    //验证是否满足下一步条件
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
    //贷款期限
    choiceLi2(index, text) {
      this.index2 = index;
      this.deadLine = text;
      this.activeNames2 = [];
    },
    next() {
      this.$router.push({ name: "quickConfirm" });
    }
  },
  computed: {
    //错误提示
    wrongShow() {
      let show = false;
      if (Number(this.transAmt) > this.limit) {
        show = true;
      }
      return show;
    }
  },
  watch: {
    //金钱格式显示
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
    .loans-out {
      padding: 0 px2vw(30);
      .draw-limit {
        margin-top: px2vw(20);
        .loan-bottom {
          background: rgba(255, 255, 255, 1);
          border-radius: px2vw(16);
        }
      }
      .loan-info {
        background: rgba(255, 255, 255, 1);
        border-radius: px2vw(16);
        margin-top: px2vw(30);
        margin-bottom: px2vw(20);
        .loan-top {
          padding: px2vw(40) px2vw(40) px2vw(30);
          border-bottom: 1px solid #ebeef0;
          .title {
            font-size: px2vw(30);
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(38, 38, 38, 1);
            padding-bottom: px2vw(40);
          }
          .loan-text {
            display: flex;
            margin-bottom: px2vw(40);
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
              font-weight: 400;
              color: rgba(38, 38, 38, 1);
            }
          }
          .loan-text:last-child {
            margin-bottom: 0;
          }
        }
      }
      .loan-bottom {
        padding: 0 px2vw(40);
        /deep/ .van-collapse-item {
          .van-cell {
            height: px2vw(100);
            .coll-title {
              font-size: px2vw(30);
              font-family: PingFangSC-Light, PingFang SC;
              font-weight: 300;
              display: flex;
              .left {
                width: px2vw(160);
                color: rgba(125, 125, 125, 1);
              }
              .right {
                color: rgba(168, 168, 168, 1);
              }
              .drawUse {
                color: rgba(38, 38, 38, 1);
              }
            }
          }
          .van-cell:not(:last-child)::after {
            border-bottom: 0;
          }
          .van-collapse-item__content {
            padding: 0;
            ul {
              li {
                float: left;
                width: px2vw(130);
                font-size: px2vw(24);
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(62, 143, 255, 1);
                border-radius: px2vw(6);
                border: 1px solid rgba(62, 143, 255, 1);
                padding: px2vw(16) 0;
                text-align: center;
                margin-right: px2vw(23);
                margin-bottom: px2vw(30);
                color: #262626;
                border: 1px solid rgba(125, 125, 125, 1);
              }
              li:nth-child(4) {
                margin-right: 0;
              }
              li:last-child {
                margin-bottom: px2vw(40);
              }
              .activeLi {
                color: rgba(62, 143, 255, 1);
                border: 1px solid rgba(62, 143, 255, 1);
              }
            }
          }
        }
        .van-hairline--top-bottom::after {
          position: static;
        }
      }
      .trustee-box {
        margin-bottom: px2vw(20);
        font-size: px2vw(30);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(38, 38, 38, 1);
      }
      .trustee-obj {
        padding: 0 px2vw(40);
        padding-top: px2vw(40);
        padding-bottom: px2vw(20);
        background: #fff;
        border-radius: px2vw(16);
        margin-bottom: px2vw(20);
      }
      .payment-info {
        padding: 0 px2vw(40);
        padding-top: px2vw(40);
        padding-bottom: px2vw(20);
        background: #fff;
        border-radius: px2vw(16);
        margin-bottom: px2vw(20);
        .loan-bottom {
          padding: 0;
        }
      }
      .personal-info {
        padding: 0 px2vw(40);
        padding-top: px2vw(40);
        padding-bottom: px2vw(20);
        background: #fff;
        border-radius: px2vw(16);
        margin-bottom: px2vw(80);
      }
      .cell-remark {
        display: flex;
        align-items: center;
        line-height: px2vw(70);
        .left {
          width: px2vw(160);
          font-size: px2vw(30);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
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
          }
          span {
            font-size: px2vw(22);
            line-height: px2vw(70);
          }
        }
      }
    }
  }
  .footer-box {
    background: #fff;
    padding: px2vw(20) 0;
    .btn-box {
      padding: 0 px2vw(40);
      .van-button {
        color: #fff;
      }
    }
  }
}
</style>
