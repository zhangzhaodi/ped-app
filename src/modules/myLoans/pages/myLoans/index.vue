<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <div class="stick-box">
      <div class="stick-top">
        <div class="aggregate">
          <h3>未还本金总计(元)</h3>
          <p>{{ aggregate | Money }}</p>
          <span>15天后将自动还款{{ aggregate | Money }}元</span>
        </div>
        <div class="nav-box">
          <ul>
            <li @click="goLoanRecords">
              <img src="@/assets/myLoans/myLoans/icon_daikuanjilu@2x.png" alt />
              <p>贷款记录</p>
            </li>
            <li @click="goPrepayment">
              <img
                src="@/assets/myLoans/myLoans/icon_tiqianhuankuan@2x.png"
                alt
              />
              <p>提前还款</p>
            </li>
            <li @click="goContract">
              <img src="@/assets/myLoans/myLoans/icon_wodehetong@2x.png" alt />
              <p>我的合同</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <van-sticky
          :class="{ sticky: true }"
          :offset-top="stickyHeight"
          :container="container"
          @scroll="scroll"
        >
          <div class="content">
            <div class="state-box">
              <div class="state" @click="changeState(1)">
                <p :class="{ active: isSelected }">进行中({{ underway }})</p>
                <div
                  class="state-bottom"
                  :class="{ activestate: isSelected }"
                ></div>
              </div>
              <div class="state" @click="changeState(0)">
                <p :class="{ active: !isSelected }">申请中({{ apply }})</p>
                <div
                  class="state-bottom"
                  :class="{ activestate: !isSelected }"
                ></div>
              </div>
            </div>
            <div class="list-box" v-show="this.isSelected == true">
              <div
                @click="goLoanDetails"
                class="loans-list"
                v-for="(item, index) in loanLists"
                :key="index"
              >
                <div class="loans-top">
                  <img
                    :src="require(`@/assets/myLoans/index/${item.img}.png`)"
                    alt
                  />
                  <p>{{ item.type }}</p>
                </div>
                <div class="loans-mid">
                  <div class="loans-left">
                    <p>未还本金(元)</p>
                    <span>{{ item.shouldRepay | Money }}</span>
                  </div>
                  <div class="loans-right">
                    <van-circle
                      v-model="currentRate"
                      :rate="item.rate"
                      :stroke-width="80"
                      :speed="100"
                      size="58px"
                      :color="item.state == '进行中' ? '#31CC69' : ''"
                      layer-color="#F3F3F3"
                    >
                      <div class="text-box" slot="default">
                        <p>已还</p>
                        <span>{{ item.rate }}%</span>
                      </div>
                    </van-circle>
                    <i class="iconfont">&#xe649;</i>
                  </div>
                </div>
                <div class="loans-bottom">
                  <p>
                    最近还款日
                    <span>{{ item.refundDate }}</span>
                  </p>
                  <p>
                    应还金额
                    <span>{{ item.refundMoney | Money }}元</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="list-box" v-show="this.isSelected == false">
              <div
                @click="goLoanDetails"
                class="loans-list"
                v-for="(item, index) in applying"
                :key="index"
              >
                <div class="loans-top">
                  <img
                    :src="require(`@/assets/myLoans/index/${item.img}.png`)"
                    alt
                  />
                  <p>{{ item.type }}</p>
                </div>
                <div class="loans-mid">
                  <div class="loans-left">
                    <p>未还本金(元)</p>
                    <span>{{ item.shouldRepay | Money }}</span>
                  </div>
                  <div class="loans-right"></div>
                </div>
                <div class="loans-bottom">
                  <p>
                    最近还款日
                    <span>{{ item.refundDate }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </van-sticky>
      </div>
    </div>
    <Footer :isShow="false"></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Footer from "../../components/Footer";
import { Sticky, Circle } from "vant";

export default {
  components: {
    Myheader: Header,
    Footer,
    [Sticky.name]: Sticky,
    [Circle.name]: Circle
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      stickyHeight: "",
      //总计
      aggregate: "66000",
      underway: "3",
      apply: "1",
      //是否选中
      isSelected: true,
      //贷款列表
      loanLists: [
        {
          img: "icon_paiedai@2x",
          type: "派e贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          state: "进行中",
          rate: 50
        },
        {
          img: "icon_yimiaodai@2x",
          type: "易秒贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          state: "进行中",
          rate: 50
        },
        {
          img: "icon_fangyidai@2x",
          type: "房易贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          state: "进行中",
          rate: 50
        },
        {
          img: "icon_zichanzhiya@2x",
          type: "资产质押贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20",
          refundMoney: "2000",
          state: "进行中",
          rate: 50
        }
      ],
      //初始状态
      currentRate: 0,
      //申请中
      applying: [
        {
          img: "icon_paiedai@2x",
          type: "派e贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20"
        },
        {
          img: "icon_yimiaodai@2x",
          type: "易秒贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20"
        },
        {
          img: "icon_fangyidai@2x",
          type: "房易贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20"
        },
        {
          img: "icon_zichanzhiya@2x",
          type: "资产质押贷",
          shouldRepay: "10000",
          refundDate: "2019-08-20"
        }
      ],
      container: null
    };
  },
  created() {
    let clientWidth = document.body.clientWidth;
    console.log(clientWidth);
    this.stickyHeight = (44 / 375) * clientWidth;
  },
  mounted() {
    this.container = this.$refs.container;
  },
  methods: {
    scroll(data) {
      console.log(data.scrollTop, data.isFixed);
    },
    //贷款状态
    changeState(value) {
      if (value == 1) {
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    },
    //贷款记录
    goLoanRecords() {
      this.$router.push({ name: "loanRecords" });
    },
    //提前还款
    goPrepayment() {
      this.$router.push({ name: "prepayment" });
    },
    //我的合同
    goContract() {
      this.$router.push({ name: "contract" });
    },
    //贷款详情
    goLoanDetails() {
      this.$router.push({ name: "loanDetails" });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.sticky {
  .van-sticky {
    height: 100%;
  }
}
.outer {
  // position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .stick-box {
    // margin-top: px2vw(44);
    flex: 1;
    height: 100%;
    overflow-y: auto;
    -webit-overflow-scrolling: touch; /*ios5+*/
    .stick-top {
      background: url("~@/assets/myLoans/myLoans/bg_wodedaikuan@2x.png")
        no-repeat;
      background-size: 100% px2vw(330);
      .aggregate {
        padding-top: px2vw(66);
        margin: 0 px2vw(30);
        font-family: PingFangSC;
        font-weight: 300;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        h3 {
          font-size: px2vw(30);
          font-weight: 300;
          margin: 0;
        }
        p {
          font-size: px2vw(60);
          margin: px2vw(34) 0;
          font-weight: 500;
        }
        span {
          font-size: px2vw(24);
        }
      }
      .nav-box {
        margin: px2vw(30);
        margin-bottom: 0;
        background: rgba(255, 255, 255, 1);
        border-radius: px2vw(16);
        padding: px2vw(16) px2vw(85) px2vw(30);
        ul {
          display: flex;
          justify-content: space-between;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              margin-bottom: px2vw(10);
              width: px2vw(88);
            }
            p {
              font-size: px2vw(26);
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(38, 38, 38, 1);
            }
          }
        }
      }
    }
    .content {
      height: 100%;
      padding: 0 px2vw(30);
      background: rgba(245, 246, 248, 1);
      display: flex;
      flex-direction: column;
      .state-box {
        padding: px2vw(60) px2vw(180) px2vw(20);
        display: flex;
        justify-content: space-between;
        .state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            font-size: px2vw(30);
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(125, 125, 125, 1);
            margin-bottom: px2vw(16);
          }
          .active {
            color: rgba(38, 38, 38, 1);
            font-weight: 500;
          }
          .state-bottom {
            width: px2vw(40);
            height: px2vw(4);
            background: none;
            border-radius: px2vw(2);
          }
          .activestate {
            background: rgba(38, 38, 38, 1);
          }
        }
      }
      .list-box {
        flex: 1;
        overflow-y: auto;
        -webit-overflow-scrolling: touch; /*ios5+*/
        padding-bottom: px2vw(200);
        .loans-list {
          background: #ffffff;
          padding: px2vw(40);
          padding-right: px2vw(45);
          margin-bottom: px2vw(30);
          border-radius: px2vw(16);
          display: flex;
          flex-direction: column;
          .loans-top {
            display: flex;
            img {
              width: px2vw(40);
              height: px2vw(40);
              margin-right: px2vw(20);
            }
            p {
              padding-top: px2vw(4);
              font-size: px2vw(36);
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(38, 38, 38, 1);
            }
          }
          .loans-mid {
            margin-top: px2vw(12);
            display: flex;
            justify-content: space-between;
            .loans-left {
              font-family: PingFangSC;
              margin-top: px2vw(26);
              line-height: px2vw(36);
              p {
                font-size: px2vw(24);
                font-weight: 300;
                color: rgba(125, 125, 125, 1);
                margin-bottom: px2vw(12);
              }
              span {
                font-size: px2vw(36);
                font-weight: 500;
                color: rgba(38, 38, 38, 1);
              }
            }
            .loans-right {
              display: flex;
              align-items: center;
              .van-circle {
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: PingFangSC-Light, PingFangSC;
                p {
                  font-size: px2vw(22);
                  font-weight: 300;
                  color: rgba(125, 125, 125, 1);
                  line-height: px2vw(22);
                  margin-bottom: px2vw(6);
                }
                span {
                  font-size: px2vw(26);
                  font-weight: 400;
                  color: rgba(38, 38, 38, 1);
                  line-height: px2vw(26);
                }
              }
              i {
                font-size: px2vw(12);
                color: #7d7d7d;
                margin-left: px2vw(40);
              }
            }
          }
          .loans-bottom {
            margin-top: px2vw(32);
            padding-right: px2vw(40);
            display: flex;
            justify-content: space-between;
            line-height: px2vw(24);
            p {
              font-size: px2vw(24);
              font-family: PingFangSC;
              color: rgba(38, 38, 38, 1);
              font-weight: 300;
              span {
                margin-left: px2vw(16);
                font-weight: 400;
                color: rgba(38, 38, 38, 1);
              }
            }
          }
        }
      }
    }
  }
  .footer {
    // position: fixed;
    // bottom: 0;
    width: 100%;
  }
}
</style>
