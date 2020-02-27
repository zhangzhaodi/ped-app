<template>
  <div class="outer remittance">
    <Myheader :title="$route.meta.title" />
    <Scroller>
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
        </div>
        <div class="loan-bottom">
          <van-collapse @change="Onchange" v-model="activeNames">
            <van-collapse-item name="1">
              <div class="coll-title" slot="title">
                <div class="left">提款用途</div>
                <div v-if="drawUse" class="drawUse">{{ drawUse }}</div>
                <div v-else class="right">请选择提款用途</div>
              </div>
              <ul>
                <li
                  @click="choiceLi(1, '经营周转')"
                  :class="{ activeLi: index == 1 }"
                >
                  经营周转
                </li>
                <li
                  @click="choiceLi(2, '经营周1')"
                  :class="{ activeLi: index == 2 }"
                >
                  经营周1
                </li>
                <li
                  @click="choiceLi(3, '经营周2')"
                  :class="{ activeLi: index == 3 }"
                >
                  经营周2
                </li>
                <li
                  @click="choiceLi(4, '经营周3')"
                  :class="{ activeLi: index == 4 }"
                >
                  经营周3
                </li>
                <li
                  @click="choiceLi(5, '经营周4')"
                  :class="{ activeLi: index == 5 }"
                >
                  经营周4
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
      <!-- 受托对象 -->
      <div class="trustee-obj">
        <div class="trustee-box">受托对象</div>
        <div class="cell-remark" @click="isShow = true">
          <div class="left">受托对象</div>
          <div class="right">
            <div class="remark-name">张超杰</div>
            <span class="iconfont">&#xe649;</span>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">受托账户</div>
          <div class="right">
            <div class="remark-name">6314 8692 3558 4626</div>
            <span class="iconfont">&#xe649;</span>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">开户行</div>
          <div class="right">
            <div class="remark-name">中信银行航海分行</div>
            <span class="iconfont">&#xe649;</span>
          </div>
        </div>
        <div class="cell-remark">
          <div class="left">开户机构</div>
          <div class="right">
            <div class="remark-name">中信银行</div>
            <span class="iconfont">&#xe649;</span>
          </div>
        </div>
      </div>
      <!-- 还款信息 -->
      <div class="payment-info">
        <div class="trustee-box">还款信息</div>
        <div class="loan-bottom">
          <van-collapse @change="Onchange" v-model="activeNames1">
            <van-collapse-item name="1">
              <div class="coll-title" slot="title">
                <div class="left">还款方式</div>
                <div v-if="drawUse" class="drawUse">{{ drawUse }}</div>
                <div v-else class="right">请选择还款方式</div>
              </div>
              <ul>
                <li
                  @click="choiceLi1(1, '经营周转')"
                  :class="{ activeLi: index == 1 }"
                >
                  经营周转
                </li>
                <li
                  @click="choiceLi1(2, '经营周1')"
                  :class="{ activeLi: index == 2 }"
                >
                  经营周1
                </li>
                <li
                  @click="choiceLi1(3, '经营周2')"
                  :class="{ activeLi: index == 3 }"
                >
                  经营周2
                </li>
                <li
                  @click="choiceLi1(4, '经营周3')"
                  :class="{ activeLi: index == 4 }"
                >
                  经营周3
                </li>
                <li
                  @click="choiceLi1(5, '经营周4')"
                  :class="{ activeLi: index == 5 }"
                >
                  经营周4
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </div>
        <div class="loan-bottom">
          <van-collapse @change="Onchange" v-model="activeNames2">
            <van-collapse-item name="1">
              <div class="coll-title" slot="title">
                <div class="left">还款期限</div>
                <div v-if="deadLine" class="drawUse">{{ deadLine }}</div>
                <div v-else class="right">请选择还款期限</div>
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
          <div class="left">身份证号</div>
          <div class="right">
            <div class="remark-name">633300002201888888</div>
          </div>
        </div>
      </div>
    </Scroller>
    <div class="footer-box">
      <div class="btn-box">
        <van-button :disabled="forbidden" @click="next">下一步</van-button>
      </div>
    </div>
    <BottomPopup title="请选择受托账户" :isShow="isShow" @close="Onclose">
    </BottomPopup>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import BottomPopup from "../../components/bottomPopup";
import { Button, Cell, Collapse, CollapseItem } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    BottomPopup,
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data() {
    return {
      activeNames: [],
      activeNames1: [],
      activeNames2: [],
      index: "",
      index2: "",
      forbidden: false,
      drawUse: "", //提款用途
      deadLine: "", //期限
      isShow: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    choiceLi(index, text) {
      this.index = index;
      this.drawUse = text;
      this.activeNames = [];
    },
    choiceLi1(index, text) {
      this.index = index;
      this.drawUse = text;
      this.activeNames1 = [];
    },
    choiceLi2(index, text) {
      this.index2 = index;
      this.deadLine = text;
      this.activeNames2 = [];
    },
    next() {
      // this.isShow = true;
    },
    Onchange(activeNames) {
      console.log(activeNames);
    },
    Onclose() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    padding: 0 px2vw(30);
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
      .trustee-box {
        margin-bottom: 0;
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
