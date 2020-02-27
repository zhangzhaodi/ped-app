<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <div class="nav-box">
      <ul>
        <li @click="changeType(1)">
          <p :class="{ active: isSelected == 1 }">全部</p>
          <div
            class="state-bottom"
            :class="{ activestate: isSelected == 1 }"
          ></div>
        </li>
        <li @click="changeType(2)">
          <p :class="{ active: isSelected == 2 }">进行中</p>
          <div
            class="state-bottom"
            :class="{ activestate: isSelected == 2 }"
          ></div>
        </li>
        <li @click="changeType(3)">
          <p :class="{ active: isSelected == 3 }">申请中</p>
          <div
            class="state-bottom"
            :class="{ activestate: isSelected == 3 }"
          ></div>
        </li>
        <li @click="changeType(4)">
          <p :class="{ active: isSelected == 4 }">已完成</p>
          <div
            class="state-bottom"
            :class="{ activestate: isSelected == 4 }"
          ></div>
        </li>
      </ul>
    </div>
    <Scroller>
      <div class="record" v-show="this.isSelected == 1">
        <div
          @click="goLoanDetails"
          class="loans-list"
          v-for="(item, index) in loanLists"
          :key="index"
        >
          <div class="state-box">
            <div class="loans-state">
              <img
                :src="
                  require(`@/assets/myLoans/loanState/${item.stateImg}.png`)
                "
                alt
              />
            </div>
          </div>
          <div class="loans-top">
            <img
              :src="require(`@/assets/myLoans/index/${item.icon}.png`)"
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
      <div class="record" v-show="this.isSelected == 2">
        <div
          @click="goLoanDetails"
          class="loans-list"
          v-for="(item, index) in loanLists"
          :key="index"
        >
          <div class="state-box">
            <div class="loans-state">
              <img
                :src="
                  require(`@/assets/myLoans/loanState/${item.stateImg}.png`)
                "
                alt
              />
            </div>
          </div>
          <div class="loans-top">
            <img
              :src="require(`@/assets/myLoans/index/${item.icon}.png`)"
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
      <div class="record" v-show="this.isSelected == 3">
        <div
          @click="goLoanDetails"
          class="loans-list"
          v-for="(item, index) in loanLists"
          :key="index"
        >
          <div class="state-box">
            <div class="loans-state">
              <img
                :src="
                  require(`@/assets/myLoans/loanState/${item.stateImg}.png`)
                "
                alt
              />
            </div>
          </div>
          <div class="loans-top">
            <img
              :src="require(`@/assets/myLoans/index/${item.icon}.png`)"
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
      <div class="record" v-show="this.isSelected == 4">
        <div
          @click="goLoanDetails"
          class="loans-list"
          v-for="(item, index) in loanLists"
          :key="index"
        >
          <div class="state-box">
            <div class="loans-state">
              <img
                :src="
                  require(`@/assets/myLoans/loanState/${item.stateImg}.png`)
                "
                alt
              />
            </div>
          </div>
          <div class="loans-top">
            <img
              :src="require(`@/assets/myLoans/index/${item.icon}.png`)"
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
    </Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Circle } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    [Circle.name]: Circle
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      //选择贷款状体
      isSelected: "1",
      currentRate: 0,
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
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    changeType(data) {
      switch (data) {
        case 1:
          this.isSelected = 1;
          break;
        case 2:
          this.isSelected = 2;
          break;
        case 3:
          this.isSelected = 3;
          break;
        default:
          this.isSelected = 4;
      }
    },
    goLoanDetails() {
      this.$router.push({ name: "loanDetails" });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .nav-box {
    background: rgba(255, 255, 255, 1);
    padding-top: px2vw(34);
    padding-bottom: px2vw(10);
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        p {
          font-size: px2vw(26);
          font-family: PingFangSC-Medium, PingFangSC;
          font-weight: 500;
          color: rgba(125, 125, 125, 1);
          line-height: px2vw(30);
        }
        .active {
          font-size: px2vw(30);
          color: rgba(38, 38, 38, 1);
        }
        .state-bottom {
          width: px2vw(40);
          height: px2vw(4);
          background: none;
          border-radius: px2vw(2);
          margin-top: px2vw(14);
        }
        .activestate {
          background: rgba(38, 38, 38, 1);
        }
      }
    }
  }
  .scrollerBox {
    background: none;

    .record {
      flex: 1;
      overflow-y: auto;
      .loans-list {
        background: #ffffff;
        padding-left: px2vw(40);
        padding-bottom: px2vw(40);
        margin: px2vw(30);
        border-radius: px2vw(16);
        display: flex;
        flex-direction: column;
        .state-box {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          .loans-state {
            width: px2vw(110);
            img {
              width: 100%;
            }
          }
        }
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
          margin-top: px2vw(10);
          padding-right: px2vw(45);
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
          }
        }
        .loans-bottom {
          margin-top: px2vw(32);
          padding-right: px2vw(85);
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
</style>
