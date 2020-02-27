<template>
  <div class="debit-card">
    <!-- 付款卡input组件 -->
    <van-cell-group class="filed_cell">
      <van-cell
        :border="false"
        class="payee-card__select"
        @click="popupShow = true"
      >
        <template slot="default">
          <div class="account-box">
            <div v-if="label" class="left">
              <img src="@/assets/bankIcon/icon_BOC.png" alt />
            </div>
            <div v-else class="left">{{ cardType }}</div>
            <div class="right">
              <div class="bank-left">
                <p>焦作中旅银行(2222)</p>
                <span
                  v-if="options.showBalance"
                  :class="options.redBalance ? 'red-balance' : ''"
                  >{{ selectItem.balance | Money }}</span
                >
                <span v-if="options.showNum">{{
                  selectItem.BundingAcctNo | CardHide
                }}</span>
              </div>
              <div class="bank-right">
                <i class="iconfont">&#xe649;</i>
              </div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 选择付款银行卡弹层 -->
    <popup-round
      class="payee-card-popup"
      :visible.sync="popupShow"
      :title="`选择银行卡`"
    >
      <van-radio-group v-model="selectItem.BundingAcctNo">
        <van-cell-group>
          <van-cell
            class="payee-card__select"
            v-for="(item, index) in cardList"
            :key="index"
            :title="item.name"
            clickable
            @click="handleSelect(item)"
          >
            <template slot="title">
              <div class="bank-icon_wrap">
                <img
                  :src="require(`@/assets/electronicAccounts/icon_CTS.png`)"
                  alt
                />
              </div>
            </template>
            <template slot="default">
              <div>
                <div class="card">中旅银行 | 借记卡</div>
                <p class="balance" v-if="balanceShow">
                  {{ item.BundingAcctNo | CardHide }}
                </p>
              </div>
            </template>
            <van-radio slot="right-icon" :name="item.BundingAcctNo">
              <img
                slot="icon"
                slot-scope="props"
                v-show="props.checked"
                class="check-icon"
                :src="props.checked ? icon.active : icon.inactive"
              />
            </van-radio>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </popup-round>
  </div>
</template>

<script>
import { Popup, Cell, CellGroup, RadioGroup, Radio } from "vant";
import PopupRound from "@/components/Popup/Recharge";
import { mapState } from "vuex";

//选择付款卡组件
export default {
  name: "DebitCard",
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    PopupRound
  },
  props: {
    // 输入项名（用于报错提示）
    label: {
      type: String,
      default: ""
    },
    balanceShow: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => {
        return {
          showBalance: false, //
          showNum: true, //
          redBalance: false //
        };
      }
    },
    cardType: {
      type: String,
      default: "付款卡"
    }
  },

  data() {
    return {
      visible: false,
      popupShow: false,
      selectItem: {
        // AcctName: "张印",
        // AcctNbr: "0",
        // AllBankName: "二类账户",
        // BundingAcctName: "张印",
        // BundingAcctNo: "6223380011080771966",
        // BundingBankName: "焦作中旅银行营业部",
        // BundingBankNbr: "313501006002",
        // BundingDate: "20450204",
        // BundingPhone: "17591168228",
        // InoutMark: "1",
        // PapersNum: "412702199502028178",
        // PapersType: "1",
        // State: "1",
        // TwoTypeAcctNo: "6223380066040011069"
      },
      icon: {
        active: require("@/assets/electronicAccounts/icon_xueli_xuanze@2x.png"),
        inactive: ""
      },
      cardList: [
        {
          // AcctName: "张印",
          // AcctNbr: "0",
          // AllBankName: "二类账户",
          // BundingAcctName: "张印",
          // BundingAcctNo: "6223380011080771966",
          // BundingBankName: "焦作中旅银行营业部",
          // BundingBankNbr: "313501006002",
          // BundingDate: "20450204",
          // BundingPhone: "17591168228",
          // InoutMark: "1",
          // PapersNum: "412702199502028178",
          // PapersType: "1",
          // State: "1",
          // TwoTypeAcctNo: "6223380066040011069"
        }
      ]
      // bankCardNum
    };
  },
  filters: {
    cardTypeName(data) {
      console.log("data11", data);
      let nameJson = {
        E1: "村镇银行卡",
        E2: "市民卡",
        E3: "活期一本通",
        E5: "借记卡",
        E6: "信用卡",
        E7: "银贷通（信用卡）",
        E8: "抵贷通(信用卡）",
        E9: "金贷通(信用卡）",
        Em: "新市民卡",
        Eb: "社保卡"
      };
      return nameJson[data];
    }
  },
  created() {
    // this.TwoTypeBoundAcctQry();
  },
  computed: {
    ...mapState("myAccount", {
      bankCardNum: state => state.bankCardNum
    })
  },
  mounted() {},
  methods: {
    handleSelect(item) {
      this.selectItem = { ...item };
      this.popupShow = false;
      this.$emit("select", this.selectItem);
    },
    //查看绑定卡
    TwoTypeBoundAcctQry() {
      console.log(this.bankCardNum);
      this.request("TwoTypeBoundAcctQry", {
        BankId: "9999",
        BranchId: "0101",
        ChnlId: "39",
        CardNo: this.bankCardNum
      })
        .then(res => {
          console.log(res);
          this.cardList = res.List;
          this.selectItem = res.List[0];
          this.$emit("select", this.selectItem);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .payee-card-popup {
  .van-cell {
    height: px2vw(110);
    padding: 0 px2vw(40);
  }
}
/deep/.debit-card {
  .van-hairline--top-bottom::after {
    border: none;
  }
  .van-cell {
    line-height: initial;
  }
}
//付款卡选择
/deep/ .payee-card__select {
  padding: 0;
  .van-cell__title {
    flex: none;
    align-items: center;
    display: flex;
  }
  .bank-icon_wrap {
    width: px2vw(64);
    height: px2vw(64);
    align-items: center;
    margin-right: px2vw(20);
    img {
      height: 100%;
    }
  }
  .van-cell__value {
    text-align: left;
    align-items: center;
    display: flex;
    .card {
      font-size: $font-size;
      color: $color-text;
      margin-bottom: px2vw(16);
    }
    .balance {
      font-size: px2vw(24);
      color: #7d7d7d;
    }
    .account-box {
      height: px2vw(110);
      width: 100%;
      display: flex;
      align-items: center;
      .left {
        width: px2vw(130);
        font-size: px2vw(30);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(38, 38, 38, 1);
      }
      .right {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .bank-left {
          margin-left: px2vw(24);
          p {
            font-size: px2vw(30);
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
            letter-spacing: 1px;
            margin-bottom: px2vw(16);
          }
          span {
            font-size: px2vw(24);
            font-family: PingFangSC;
            font-weight: 300;
            color: rgba(125, 125, 125, 1);
            &.red-balance {
              color: rgba(255, 64, 64, 1);
            }
          }
        }
        .bank-right {
          i {
            font-size: px2vw(12);
            color: #7d7d7d;
          }
        }
      }
    }
  }
}
</style>
