<template>
  <div class="debit-card">
    <!-- 付款卡input组件 -->
    <van-cell-group class="filed_cell">
      <van-cell :border="false" class="payee-card__select" @click="popupShow = true">
        <template slot="default">
          <div class="account-box">
            <div  v-if="label"  class="left">
              <img src="@/assets/bankIcon/icon_BOC.png" alt />
            </div>
            <div  v-if="options.cardName"  class="left">
              取现账户
            </div>
            <div v-else class="left">
                付款卡
            </div>
            <div class="right">
              <div  v-if="selectItem.balance> 0 " class="bank-left">
                <p class="p">{{selectItem.bankName|| ''}}({{selectItem.vouId | CardNoFour}})</p>
                <span v-if="options.showBalance" :class="options.redBalance ? 'red-balance' : ''">可用余额:{{selectItem.balance | Money}}</span>
                <span v-if="options.showNum" >可用余额:{{selectItem.vouId | CardHide}}</span>
              </div>
              <div v-else class="bank-left">
                <p class="p">{{selectItem.bankName|| ''}}({{selectItem.vouId | CardNoFour}})</p>
                <span v-if="options.showBalance" :class="options.redBalance ? 'red-balance' : ''">可用余额:{{selectItem.balance}}</span>
                <span v-if="options.showNum" >可用余额:{{selectItem.vouId | CardHide}}</span>
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
    <popup-round class="payee-card-popup" :visible.sync="popupShow" :title="`选择银行卡`">
      <van-radio-group v-model="selectItem.vouId">
        <van-cell-group>
          <van-cell
            class="payee-card__select"
            v-for="(item,index) in cardList"
            :key="index"
            :title="item.name"
            clickable
            @click="handleSelect(item)"
          >
            <template slot="title">
              <div class="bank-icon_wrap">
                <img :src="require(`@/assets/electronicAccounts/icon_CTS.png`)" alt />
              </div>
            </template>
            <template slot="default">
              <div>
                <div class="card">{{item.bankName || '中旅银行'}} | 借记卡</div>
                <p class="balance" v-if="balanceShow">{{item.vouId | CardHide}}</p>
              </div>
            </template>
            <van-radio slot="right-icon" :name="item.vouId">
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
          showBalance: true, //
          showNum: false, //
          redBalance: false, //颜色
          cardName:false,//卡名
        };
      }
    }
  },

  data() {
    return {
      visible: false,
      popupShow: false,
      selectItem: {
        bankName: "中旅银行",
        vouId: "4202222001",
        typeName: "电子账户",
        balance: "",
        username: "买萝卜",
        bank: "CTS",
        id: 0
      },
      icon: {
        active: require("@/assets/electronicAccounts/icon_xueli_xuanze@2x.png"),
        inactive: ""
      },
      cardList: [
        {
          bankName: "中旅银行",
          vouId: "",
          typeName: "",
          balance: "0",
          username: "",
          bank: "CTS",
          id: 0
        },
        // {
        //   bankName: "中原银行",
        //   vouId: "42022247572",
        //   typeName: "借记卡",
        //   balance: "10000",
        //   username: "买白菜",
        //   bank: "CTS",
        //   id: 2
        // },
        // {
        //   bankName: "工商银行",
        //   vouId: "420222172700722",
        //   typeName: "借记卡",
        //   balance: "10000",
        //   username: "买白菜",
        //   bank: "CTS",
        //   id: 3
        // },
        // {
        //   bankName: "建设银行",
        //   vouId: "420222100722282",
        //   typeName: "借记卡",
        //   balance: "10000",
        //   username: "买白菜",
        //   bank: "CTS",
        //   id: 4
        // }
      ]
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
    let params = {
        BranchId:this.$store.state.deposit.params.BranchId,
        ChnlId:this.$store.state.deposit.params.ChnlId,
        BankId:this.$store.state.deposit.params.BankId,
    };
    console.log(params);
    this.request("QryDebitCard", params,true)
      .then(res => {
        console.log(res)
        this.cardList = res.QueryAddAccount;
        this.selectItem = this.cardList[0];
        this.$emit("select", this.selectItem);
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted(){
     this.$emit("select", this.selectItem)
  },
  methods: {
    handleSelect(item) {
      this.selectItem = { ...item };
      this.popupShow = false;
      this.$emit("select", this.selectItem)
    },
    // handleConfirm() {
    //   this.popupShow = false;
    //   this.$emit("select", this.selectItem);
    // }
  },
  // watch:{
  //     options(val){
  //       this.options=[...options]
  //     }
  // },
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
  .van-hairline--top-bottom::after{
    border:none;
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
        display: flex;
        width: px2vw(150);
        height:px2vw(32);
        font-size:px2vw(30);
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(38,38,38,1);
        line-height:px2vw(32);
        img {
          width: px2vw(55);
        }
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
            // margin-bottom: px2vw(16);
          }
          .P{
            height:px2vw(30);
            font-size:px2vw(30);
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(38,38,38,1);
            line-height:px2vw(30);
            letter-spacing:px2vw(1);
          }
          span {
            font-size: px2vw(24);
            font-family: PingFangSC;
            font-weight: 300;
            color: rgba(125, 125, 125, 1);
            &.red-balance{
   color:rgba(255,64,64,1);
  }
          }
        }
        .bank-right {
          i {
            font-size: px2vw(22);
            color: #7d7d7d;
            font-weight: 400;
          }
        }
      }
    }
  }

}
</style>
