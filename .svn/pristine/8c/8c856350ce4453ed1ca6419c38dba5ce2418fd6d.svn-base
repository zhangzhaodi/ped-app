<template>
  <div class="debit-card">
    <!-- 付款卡input组件 -->
    <van-cell-group class="filed_cell">
      <van-cell class="payee-card__select" @click="openCardList">
        <template slot="title">
          <span class="custom-title">{{label}}</span>
        </template>
        <template slot="default">
          <div>
            <div class="card">焦作中旅银行
              <span v-if="selectItem.vouId">({{selectItem.vouId | CardNoFour}})</span>
              <!-- <span v-if="selectItem.contTypCd && selectItem.contTypCd !=2"> | {{selectItem.contTypCd | cardTypeName}}</span> -->
            </div>
            <p class="balance">可用余额：￥{{selectItem.balance | Money}}</p>
          </div>
        </template>
        <template slot="right-icon">
          <span class="iconfont picker-arrow">&#xe649;</span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 选择付款银行卡弹层 -->
    <popup-round class="payee-card-popup" :visible.sync="popupShow" :title="`确认转账`" @confirm="handleConfirm">
      <van-radio-group v-model="tempItem.vouId">
        <van-cell-group>
          <van-cell class="payee-card__select" v-for="(item,index) in payeeCards" :key="index" :title="item.name" clickable @click="handleSelect(item)">
            <template slot="title">
              <div class="bank-icon_wrap">
                <img :src="require(`@/assets/bankIcon/icon_CTS.png`)" alt />
              </div>
            </template>
            <template slot="default">
              <div>
                <p class="card">{{item.vouId | CardHide}}</p>
                <div class="balance">{{item.bankName || '焦作中旅银行'}}</div>
                 <!-- | {{item.contTypCd | cardTypeName}}{{item.acctName ? `-${item.acctName}`: ''}} -->
              </div>
            </template>
            <van-radio slot="right-icon" :name="item.vouId">
              <img slot="icon" slot-scope="props" v-show="props.checked" class="check-icon" :src="props.checked ? icon.active : icon.inactive">
            </van-radio>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </popup-round>
  </div>
</template>

<script>
import { Popup, Cell, CellGroup, Toast } from "vant";
import PopupRound from "@/components/PopupRound";
import { mapGetters, mapActions, mapState } from "vuex";
//选择付款卡组件
export default {
  name: "DebitCard",
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    PopupRound,
    [Toast.name]: Toast
  },
  props: {
    // 输入项名（用于报错提示）
    label: {
      type: String,
      default: ""
    },
    // card: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       bankName: '',//银行名
    //       vouId: '',//银行卡号，显示时取后四位
    //       balance: '',//卡内余额
    //       acctName: '',//用户名
    //     }
    //   }
    // }
  },

  data() {
    return {
      visible: false,
      popupShow: false,
      selectItem: {
        bankName: '',
        vouId: "",
        typeName: '',
        balance: '',
        username: "",
        bank: '',
        id: null,
      },
      icon: {
        active: require("@/assets/electronicAccounts/icon_xueli_xuanze@2x.png"),
        inactive: ""
      },
      tempItem: {},//临时对象
    };
  },
  filters: {
    cardTypeName(data) {
      //CONT_TYP_CD  1：本行电子账户二类户；2：借记卡；8：他行借记卡
      let nameJson = {
        'E1': '村镇银行卡',
        'E2': '市民卡',
        'E3': '活期一本通',
        'E5': '借记卡',
        'E6': '信用卡',
        'E7': '银贷通（信用卡）',
        'E8': '抵贷通(信用卡）',
        'E9': '金贷通(信用卡）',
        'Em': '新市民卡',
        'Eb': '社保卡',
      }
      return nameJson[data] || ''
    }
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState('common', ['payeeCards']),
  },
  methods: {
    ...mapActions('common', ['getPayeeCards']),
    async initData() {
      // 如果存在卡列表 
      await this.getPayeeCards();
      this.selectItem = this.payeeCards[0];
      await this.banlanceQry();
      this.tempItem = { ...this.selectItem };
      this.$emit("select", this.selectItem);
    },
   
    openCardList() {
      if (this.payeeCards.length > 0) {
        this.popupShow = true;
      } else {
        Toast("该账户暂未绑定I类户,请绑定银行卡")
      }
    },
    handleSelect(item) {
      this.tempItem = { ...item };
    },
    async handleConfirm() {
      this.selectItem = { ...this.tempItem };
      let a = await this.banlanceQry();
      this.popupShow = false;
      this.$emit("select", this.selectItem);
    },
    //查询账户余额
    async banlanceQry() {
      try{
        let params = {
          AccountNo: this.selectItem.vouId,
          BankAcType: this.selectItem.acctTypCd
        }
        let res = await this.request('BalanceCheck', params);
        this.selectItem.balance = res.AvailBal || 0;
        console.log(res, '余额查询')
      }
      catch(err){
        console.log(err,"账户挂失")
        this.selectItem.balance = 0;
      }
      
    
    },

  },
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
  .filed_cell {
    .van-cell {
      line-height: initial;
      // height:px2vw(110);
      height: auto;
      padding: 0;
      align-items: center;
      .van-cell__title {
        line-height: inherit;
        width: px2vw(120);
        margin-right: px2vw(40);
      }
    }
  }
}
//付款卡选择
/deep/ .payee-card__select {
  line-height: initial;
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
      margin-bottom: px2vw(14);
      line-height:1.2;
    }
    .balance {
      font-size: px2vw(24);
      color: #7d7d7d;
      line-height:1.2;
    }
  }
}

/deep/ .van-popup{
  padding-bottom: px2vw(40);
}
</style>
