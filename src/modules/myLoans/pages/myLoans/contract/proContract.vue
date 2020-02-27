<template>
  <div class="outer">
    <div class="header">
      <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    </div>
    <Scroller>
      <div class="record">
        <div class="credit" @click="goContractDetail(4)">
          <div class="credit-top">
            <div class="credit-img">
              <img src="@/assets/myLoans/contract/icon_shouxinhetong@2x.png" alt />
              <p>授信合同</p>
            </div>
          </div>
          <div class="credit-mid">
            <p>{{zcLoans.name}}</p>
            <i class="iconfont">&#xe649;</i>
          </div>
          <div class="credit-bottom">
            <div class="credit-text">
              <p>贷款额度(元)</p>
              <span>{{zcLoans.limit | Money}}</span>
            </div>
            <div class="credit-text">
              <p>申请时间</p>
              <span>{{zcLoans.applyTime}}</span>
            </div>
          </div>
        </div>
        <div class="link-img">
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
        </div>
        <div class="loans-list">
          <div class="drawMoney">
            <p>提款合同</p>
          </div>
          <div class="contract-list" v-for="(item,index) in zcContractList" :key="index">
            <div class="contract-info">
              <p>
                贷款名称
                <span>{{item.name}}</span>
              </p>
              <p>
                贷款额度
                <span>{{item.limit | Money}}元</span>
              </p>
              <p>
                申请时间
                <span>{{item.applyTime}}</span>
              </p>
            </div>
            <div class="contract-settle" v-if="item.state == 1">
              <button>上传消费凭证</button>
            </div>
            <div class="contract-uncleared" v-else>
              <button class="uncleared-btn">还款计划</button>
              <button>查看消费凭证</button>
            </div>
          </div>
        </div>
      </div>
    </Scroller>
    <div class="footer">额度废除</div>
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
      //不同带块类型列表
      zcLoans: {
        name: "资产质押贷",
        limit: "60000",
        applyTime: "2018-12-13"
      },
      //资产质押贷
      zcContractList: [
        {
          name: "资产质押贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "资产质押贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "资产质押贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "0"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    goContractDetail(value) {
      this.$router.push({
        name: "contractDetail",
        query: { myLoansType: value }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    padding: px2vw(30);
    .record {
      flex: 1;
      overflow-y: auto;
      .credit {
        background: rgba(255, 255, 255, 1);
        border-radius: px2vw(16);
        .credit-top {
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          .credit-img {
            margin: 0 auto;
            width: px2vw(216);
            position: relative;
            img {
              width: 100%;
            }
            p {
              font-size: px2vw(30);
              font-family: PingFangSC-Medium, PingFangSC;
              font-weight: 500;
              color: rgba(62, 143, 255, 1);
              padding: 0 px2vw(48);
              position: absolute;
              top: px2vw(27);
            }
          }
        }
        .credit-mid {
          padding: px2vw(36) px2vw(40) px2vw(36) px2vw(60);
          display: flex;
          justify-content: space-between;
          p {
            font-size: px2vw(30);
            font-family: PingFangSC-Medium, PingFangSC;
            font-weight: 500;
            color: rgba(38, 38, 38, 1);
            line-height: px2vw(30);
          }
          i {
            font-size: px2vw(22);
            line-height: px2vw(30);
            color: #7d7d7d;
          }
        }
        .credit-bottom {
          display: flex;
          justify-content: space-between;
          padding: 0 px2vw(120) px2vw(56) px2vw(60);
          .credit-text {
            display: flex;
            flex-direction: column;
            p {
              margin-bottom: px2vw(12);
              font-size: px2vw(22);
              font-family: PingFangSC-Light, PingFangSC;
              font-weight: 300;
              color: rgba(125, 125, 125, 1);
            }
            span {
              font-size: px2vw(30);
              font-weight: 500;
              color: rgba(38, 38, 38, 1);
            }
          }
        }
      }
      .link-img {
        padding: 0 px2vw(120);
        margin-top: px2vw(-18);
        display: flex;
        justify-content: space-between;
        img {
          width: px2vw(14);
          height: px2vw(56);
        }
      }
      .loans-list {
        background: #ffffff;
        margin-top: px2vw(-18);
        border-radius: px2vw(16);
        display: flex;
        flex-direction: column;
        .drawMoney {
          padding-top: px2vw(45);
          padding-bottom: px2vw(24);
          text-align: center;
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          p {
            font-size: px2vw(30);
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
          }
        }
        .contract-list {
          margin: 0 px2vw(40);
          padding-bottom: px2vw(30);
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          .contract-info {
            padding-top: px2vw(30);
            p {
              font-size: px2vw(24);
              font-family: PingFangSC-Light, PingFangSC;
              font-weight: 300;
              color: rgba(125, 125, 125, 1);
              margin-bottom: px2vw(20);
              span {
                font-weight: 400;
                color: rgba(38, 38, 38, 1);
                margin-left: px2vw(20);
              }
            }
          }
          .contract-settle {
            padding-top: px2vw(96);
            display: flex;
            flex-direction: column;
          }
          .contract-uncleared {
            padding-top: px2vw(24);
            display: flex;
            flex-direction: column;
            .uncleared-btn {
              background: linear-gradient(
                90deg,
                rgba(107, 171, 255, 1) 0%,
                rgba(108, 138, 249, 1) 100%
              );
              color: rgba(255, 255, 255, 1);
              margin-bottom: px2vw(16);
            }
          }
          button {
            width: px2vw(178);
            height: px2vw(56);
            border-radius: px2vw(100);
            border: 1px solid rgba(62, 143, 255, 1);
            font-size: px2vw(22);
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(62, 143, 255, 1);
            background: rgba(255, 255, 255, 1);
          }
        }
        .contract-list:last-child {
          border: 0;
        }
      }
    }
  }
  .footer {
    height: px2vw(79);
    padding-top: px2vw(41);
    text-align: center;
    font-size: px2vw(34);
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(255, 64, 64, 1);
    background: rgba(255, 255, 255, 1);
  }
}
</style>
