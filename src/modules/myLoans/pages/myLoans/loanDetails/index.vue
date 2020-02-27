<template>
  <div class="outer">
    <Myheader :title="title" :params="headerParams"></Myheader>
    <div class="nav-out">
      <div class="nav">
        <!-- 进行中 -->
        <div v-if="state == '1'" class="underway">
          <div class="hint">
            已还6/12期
          </div>
          <p>剩余待还(元)</p>
          <div class="money">{{ money | Money }}</div>
        </div>
        <!-- 未通过 -->
        <div v-else-if="state == '2'" class="notPass">
          <div class="img-out">
            <img
              src="@/assets/myLoans/loanDetails/icon_jingshi@2x.png"
              alt=""
            />
          </div>
          <div class="text">
            您的贷款申请未通过审批通过 请一个月后再进行尝试
          </div>
        </div>
        <!-- 审核中 -->
        <div v-else-if="state == '3'" class="audit">
          <div class="img-out">
            <img
              src="@/assets/myLoans/loanDetails/icon_chulizhong@2x.png"
              alt=""
            />
          </div>
          <div class="text">
            您的贷款正在审批中，请耐心等待
          </div>
        </div>
        <!-- 未签约 -->
        <div v-else-if="state == '4'" class="notPass notSign">
          <div class="img-out">
            <img
              src="@/assets/myLoans/loanDetails/icon_wancheng@2x.png"
              alt=""
            />
          </div>
          <div class="text">
            您的贷款申请已通过，请先完成 签约后可进行提款
          </div>
        </div>
        <!-- 已结清 -->
        <div v-else class="cleared">
          <div class="text">
            您已全部还清
          </div>
        </div>
        <div
          v-if="state == '1' || state == '4' || state == '5'"
          class="handle"
          @click="clickHandle(state)"
        >
          <van-button>{{ stateText }}</van-button>
        </div>
        <div class="credit-box">
          <div class="credit">
            <p>授信额度(元)</p>
            <span>200,000.00</span>
          </div>
          <div class="credit">
            <p>已提款金额(元)</p>
            <span>100,000.00</span>
          </div>
        </div>
      </div>
      <div class="cell-box">
        <div class="cell-out">
          <van-cell :border="false" title="房屋信息" value="内容" />
        </div>
        <div
          @click="goContract"
          v-if="state == '1' || state == '5'"
          class="cell-out"
        >
          <van-cell :border="false" title="我的合同" is-link />
        </div>
        <div @click="goRepayHistory" class="cell-out cell-last">
          <van-cell :border="false" title="历史还款" is-link />
        </div>
      </div>
    </div>
    <Scroller>
      <div class="loans-record">
        <p>全部待还（共3笔）</p>
        <van-steps direction="vertical" :active="0">
          <van-step>
            <h3>【城市】物流状态1</h3>
            <p>2016-07-12 12:40</p>
          </van-step>
          <van-step>
            <h3>【城市】物流状态2</h3>
            <p>2016-07-11 10:00</p>
          </van-step>
        </van-steps>
      </div>
    </Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Button, Cell, Step, Steps } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      title: "易秒贷",
      money: "66000",
      //不同带块类型列表
      loanLists: [
        {
          icon: "icon_paiedai@2x",
          type: "派e贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          //环形进度条
          state: "进行中",
          stateImg: "tag_jinxingzhong@2x",
          rate: 50 //完成进度
        },
        {
          icon: "icon_yimiaodai@2x",
          type: "易秒贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          rate: 30, //完成进度
          stateImg: "tag_jinxingzhong@2x"
        },
        {
          icon: "icon_fangyidai@2x",
          type: "房易贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          rate: 50, //完成进度
          stateImg: "tag_jinxingzhong@2x"
        },
        {
          icon: "icon_zichanzhiya@2x",
          type: "资产质押贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          rate: 50, //完成进度
          stateImg: "tag_jinxingzhong@2x"
        }
      ],
      state: "1" //1进行中 2未通过 3审核中 4待签约 5已结清
    };
  },
  created() {},
  mounted() {},
  computed: {
    stateText: function() {
      if (this.state == 1) {
        return "提前还款";
      } else if (this.state == 4) {
        return "立即签约";
      } else if (this.state == 5) {
        return "再次申请";
      }
    }
  },
  methods: {
    //不同贷款状态对应的操作
    clickHandle(value) {
      if(value == '1'){
        this.$router.push({ name: "repayPlan" });
      }
    },
    //跳到还款历史
    goRepayHistory() {
      this.$router.push({ name: "repayHistory" });
    },
    //我的合同
    goContract() {
      this.$router.push({ name: "contract" });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .nav-out {
    background: rgba(255, 255, 255, 1);
    .nav {
      border-bottom: 1px solid #eff0f1;
      //进行中
      .underway {
        .hint {
          height: px2vw(48);
          background: url("~@/assets/myLoans/loanDetails/tag_yihuan@2x.png")
            no-repeat;
          background-size: px2vw(170);
          text-indent: px2vw(24);
          font-size: px2vw(24);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: px2vw(48);
          margin-bottom: px2vw(32);
        }
        p {
          text-align: center;
          font-size: px2vw(26);
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(125, 125, 125, 1);
          margin-bottom: px2vw(20);
        }
        .money {
          font-size: px2vw(50);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(38, 38, 38, 1);
          text-align: center;
          margin-bottom: px2vw(30);
        }
      }
      //未通过
      .notPass {
        margin-top: px2vw(76);
        padding-left: px2vw(176);
        margin-bottom: px2vw(100);
        display: flex;
        .img-out {
          width: px2vw(26);
          margin-right: px2vw(8);
          margin-top: px2vw(6);
          img {
            width: 100%;
          }
        }
        .text {
          width: px2vw(338);
          text-align: center;
          font-size: px2vw(26);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
          line-height: px2vw(38);
        }
      }
      //审核中
      .audit {
        margin-top: px2vw(76);
        padding-left: px2vw(176);
        margin-bottom: px2vw(140);
        display: flex;
        .img-out {
          width: px2vw(26);
          margin-right: px2vw(8);
          img {
            width: 100%;
          }
        }
        .text {
          text-align: center;
          font-size: px2vw(26);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
      }
      //未签约
      .notSign {
        margin-bottom: px2vw(12);
      }
      //已结清
      .cleared {
        margin-top: px2vw(76);
        margin-bottom: px2vw(50);
        .text {
          text-align: center;
          font-size: px2vw(26);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
      }
      .handle {
        margin: 0 auto;
        width: px2vw(200);
        height: px2vw(68);
        margin-bottom: px2vw(50);
        .van-button {
          width: 100%;
          height: 100%;
          font-size: px2vw(26);
          line-height: 0;
          padding-top: px2vw(4);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: linear-gradient(
            270deg,
            rgba(107, 171, 255, 1) 0%,
            rgba(108, 138, 249, 1) 100%
          );
          border-radius: px2vw(34);
        }
      }
      .credit-box {
        padding-left: px2vw(126);
        padding-right: px2vw(118);
        padding-bottom: px2vw(50);
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
    .cell-box {
      padding: 0 px2vw(40);
      .cell-out {
        border-bottom: 1px solid #eff0f1;
        .van-cell {
          height: px2vw(90);
          line-height: px2vw(90);
          padding: 0;
          .van-cell__title {
            font-size: px2vw(30);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
          }
          .van-cell__value {
            font-size: px2vw(26);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(125, 125, 125, 1);
          }
          .van-icon {
            line-height: px2vw(90);
            font-size: px2vw(24);
          }
        }
      }
      .cell-last {
        border: 0;
      }
    }
  }
  .scrollerBox {
    background: none;
    .loans-record {
      padding: 0 px2vw(30);
      p {
        font-size: px2vw(30);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(125, 125, 125, 1);
        text-indent: px2vw(10);
        margin-top: px2vw(50);
        margin-bottom: px2vw(20);
      }
      .van-steps {
        background: none;
        .van-step {
          background: #fff;
          border-radius: px2vw(16);
        }
      }
    }
  }
}
</style>
