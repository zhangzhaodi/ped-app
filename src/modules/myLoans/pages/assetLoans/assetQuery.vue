<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <div class="content">
      <div class="bank">
        <van-swipe
          @change="onChange"
          :show-indicators="false"
          :width="swipeWidth"
        >
          <div class="custom-indicator" slot="indicator">
            <span class="active">{{ activeNumber }}</span>
            <span>/</span>
            <span>{{ loginInfo.AcList.length }}</span>
          </div>
          <van-swipe-item
            v-for="(item, index) in loginInfo.AcList"
            :key="index"
          >
            <div class="bankCard">
              <div
                :class="[
                  'bankContent',
                  {
                    electronicCard: item.name == '电子银行',
                    goldCard: item.name == 'goldCard',
                    platinumCard: item.name == 'platinumCard',
                    diamondCard: item.name == 'diamondCard'
                  }
                ]"
              >
                <div class="bank-info">
                  <div class="bankCard-l">
                    <img
                      src="@/assets/assetsLiabilities/allCard/img_yinhangkalogo@2x.png"
                      alt
                    />
                    <div class="bank-type">{{ item.type }}</div>
                  </div>
                </div>
                <div class="bank-number">
                  <span>{{ item.no.slice(0, 4) }}</span>
                  <span>{{ item.no.slice(4, 8) }}</span>
                  <span>{{ item.no.slice(8, 12) }}</span>
                  <span>{{ item.no.slice(12, 16) }}</span>
                  <span>{{ item.no.slice(16) }}</span>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="loans-list" v-for="(item, index) in assetInfo" :key="index">
        <div class="list-top">
          <h5>可用金额(元)</h5>
          <div class="money">
            <div class="left">{{ item.AssetBalance | Money }}</div>
            <div class="right">
              <van-button @click="goAssetConfirm(item.AcNo)"
                >立即提款</van-button
              >
            </div>
          </div>
          <p>
            产品类型<span>{{ item.PrdStyle }}</span>
          </p>
        </div>
        <div class="list-bottom">
          <div class="asset-info">
            <p>资产存期</p>
            <span>{{ item.AssetMaturity }}</span>
          </div>
          <div class="asset-info">
            <p>资产年利率</p>
            <span>{{ item.AssetYearRate }}</span>
          </div>
          <div class="asset-info">
            <p>资产编号</p>
            <span>{{ item.AssetNo }}</span>
          </div>
          <div class="asset-info">
            <p>资产存储类型</p>
            <span>{{
              item.AssetStorageStyle == 1 ? "卡内定期存款" : "大额存单"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Swipe, SwipeItem } from "vant";
import { mapState } from "vuex";

export default {
  components: {
    Myheader: Header,
    Scroller,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      headerParams: {
        leftShow: false,
        rightShow: false
      },
      bankNumber: "4",
      activeNumber: 1,
      bankInfo: [
        {
          biaoqian: "img_biaoqian@2x",
          name: "goldCard",
          type: "借记卡",
          card: "6452482378775676",
          property: "100000000", //卡内资产
          currentBalance: "345345", //活期余额
          fixedDeposit: "35345", //定期存款余额
          IntelligentDeposit: "", //智能存款余额
          moneyPosition: "23542532", //理财持仓市值
          fundsPosition: "236536", //基金持仓市值
          gemFunds: "4256456", //宝石基金份额
          liabilities: "454651531165", //卡内负债
          housingMortgageLoan: "63783462565", //住房按揭贷款
          consumptionLoans: "546347657457", //消费贷款
          businessLoans: "4567444", //经营贷款
          creditConsumerLoan: "4574567446" //信用消费贷款
        },
        {
          biaoqian: "img_biaoqian@2x(1)",
          name: "platinumCard",
          type: "借记卡",
          card: "6452482378775676",
          property: "2456456255", //卡内资产
          currentBalance: "256452565245", //活期余额
          fixedDeposit: "25656256", //定期存款余额
          IntelligentDeposit: "2565", //智能存款余额
          moneyPosition: "45673452", //理财持仓市值
          fundsPosition: "2345", //基金持仓市值
          gemFunds: "", //宝石基金份额
          liabilities: "", //卡内负债
          housingMortgageLoan: "", //住房按揭贷款
          consumptionLoans: "342", //消费贷款
          businessLoans: "", //经营贷款
          creditConsumerLoan: "235423" //信用消费贷款
        },
        {
          biaoqian: "img_biaoqian@2x(2)",
          name: "diamondCard",
          type: "信用卡",
          card: "6422282378775676",
          property: "", //卡内资产
          currentBalance: "", //活期余额
          fixedDeposit: "5625662455", //定期存款余额
          IntelligentDeposit: "", //智能存款余额
          moneyPosition: "", //理财持仓市值
          fundsPosition: "", //基金持仓市值
          gemFunds: "", //宝石基金份额
          liabilities: "365356", //卡内负债
          housingMortgageLoan: "", //住房按揭贷款
          consumptionLoans: "45245", //消费贷款
          businessLoans: "58768", //经营贷款
          creditConsumerLoan: "" //信用消费贷款
        },
        {
          biaoqian: "img_biaoqian@2x(3)",
          name: "电子银行",
          type: "信用卡",
          card: "3424482378775783",
          property: "", //卡内资产
          currentBalance: "", //活期余额
          fixedDeposit: "", //定期存款余额
          IntelligentDeposit: "", //智能存款余额
          moneyPosition: "", //理财持仓市值
          fundsPosition: "", //基金持仓市值
          gemFunds: "", //宝石基金份额
          liabilities: "", //卡内负债
          housingMortgageLoan: "", //住房按揭贷款
          consumptionLoans: "45645", //消费贷款
          businessLoans: "", //经营贷款
          creditConsumerLoan: "46456" //信用消费贷款
        }
      ],
      assetInfo: []
    };
  },
  computed: {
    ...mapState("myLoans", ["loginInfo"])
  },
  created() {
    let clientWidth = document.body.clientWidth;
    this.swipeWidth = (345 / 375) * clientWidth;
    this.AssetPledgeLoanApply(this.loginInfo.AcList[0].no);
  },
  mounted() {
    this.bankChange();
  },
  methods: {
    next() {},
    onChange(index) {
      console.log("index", index);
      this.activeNumber = index + 1;
      this.bankChange();
    },
    bankChange() {
      let bank = [...document.getElementsByClassName("bankContent")];
      for (let i = 0; i < bank.length; i++) {
        if (i != this.activeNumber - 1) {
          bank[i].style.height = "80%";
        } else {
          bank[i].style.height = "100%";
        }
      }
      //资产查询
      this.AssetPledgeLoanApply(
        this.loginInfo.AcList[this.activeNumber - 1].no
      );
    },
    //跳到资产确定
    goAssetConfirm(AcNo) {
      this.$router.push({
        name: "assetConfirm",
        query: { AcNo: AcNo }
      });
    },
    //资产查询
    AssetPledgeLoanApply(cardNum) {
      this.request("AssetPledgeLoanApply", {
        AcNo: cardNum
      })
        .then(res => {
          console.log(res, res.List);
          this.assetInfo = res.List;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.scrollerBox::-webkit-scrollbar {
  display: none;
}
.content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  //   .bank {
  //     display: flex;
  //     flex-direction: column-reverse;
  //   }
  .van-swipe {
    display: flex;
    flex-direction: column-reverse;
    padding: 0 px2vw(40);
    .custom-indicator {
      text-align: right;
      margin-top: px2vw(30);
      margin-bottom: px2vw(20);
      font-size: 0;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: #a8a8a8;
      span {
        font-size: px2vw(22);
      }
      .active {
        font-weight: 500;
        font-size: px2vw(28);
        color: #7d7d7d;
      }
    }
  }
  .bankCard {
    width: px2vw(670);
    height: px2vw(230);
    // background: url("~@/assets/assetsLiabilities/allCard/img_yinhangka@2x(3).png")
    //   no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-size: 100% 100%;
    .bankContent {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: url("~@/assets/assetsLiabilities/allCard/img_yinhangka@2x(3).png")
        no-repeat;
      background-size: 100% 100%;
    }
    .bank-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .bankCard-l {
        display: flex;
        align-items: center;
        img {
          width: px2vw(236);
          margin: px2vw(26) px2vw(20) 0 px2vw(40);
        }
        .bank-type {
          margin-top: px2vw(26);
          font-size: px2vw(24);
          font-family: PingFangSC;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
          line-height: px2vw(36);
        }
      }
      img {
        width: px2vw(136);
      }
    }
    .bank-number {
      padding: 0 px2vw(70);
      flex: 1;
      display: flex;
      align-items: center;
      font-size: px2vw(36);
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: px2vw(40);
      justify-content: space-between;
    }
  }
  .goldCard {
    background: url("~@/assets/assetsLiabilities/allCard/img_yinhangka@2x.png")
      no-repeat;
    background-size: 100% 100%;
  }
  .platinumCard {
    background: url("~@/assets/assetsLiabilities/allCard/img_yinhangka@2x(1).png")
      no-repeat;
    background-size: 100% 100%;
  }
  .diamondCard {
    background: url("~@/assets/assetsLiabilities/allCard/img_yinhangka@2x(2).png")
      no-repeat;
    background-size: 100% 100%;
  }
  .electronicCard {
    background: url("~@/assets/assetsLiabilities/allCard/img_yinhangka@2x(3).png")
      no-repeat;
    background-size: 100% 100%;
  }
  .loans-list {
    margin: px2vw(20) px2vw(30);
    padding: px2vw(30) px2vw(40) px2vw(40);
    background: rgba(255, 255, 255, 1);
    border-radius: px2vw(16);
    .list-top {
      padding-bottom: px2vw(30);
      border-bottom: 1px solid #ebeef0;
      h5 {
        font-size: px2vw(24);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(168, 168, 168, 1);
      }
      .money {
        display: flex;
        justify-content: space-between;
        .left {
          margin-top: px2vw(10);
          font-size: px2vw(44);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
        .right {
          margin-top: px2vw(2);
          .van-button {
            width: px2vw(178);
            height: px2vw(56);
            background: linear-gradient(
              90deg,
              rgba(107, 171, 255, 1) 0%,
              rgba(108, 138, 249, 1) 100%
            );
            border-radius: px2vw(100);
            line-height: normal;
            .van-button__text {
              font-size: px2vw(22);
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
      p {
        margin-top: px2vw(20);
        font-size: px2vw(22);
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
        span {
          color: rgba(38, 38, 38, 1);
          margin-left: px2vw(14);
        }
      }
    }
    .list-bottom {
      margin-top: px2vw(30);
      display: flex;
      justify-content: space-between;
      .asset-info {
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
  }
}
.content::-webkit-scrollbar {
  display: none;
}
</style>
