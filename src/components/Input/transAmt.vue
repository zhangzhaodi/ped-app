<template>
  <div>
    <div class="transfer-amount">
      <md-amount class="upper" v-if="showUpper" :style="{'visibility': innerValue && !wrongShow ? 'visible':'hidden'}" :value="upperMoney" is-capital></md-amount>
      <div class="comUnits" v-if="showUnits" :style="{'visibility': innerValue?'visible':'hidden'}">{{value | units}}</div>
      <md-input-item  type="money" class="amount" :maxlength="18" v-model="innerValue" :is-amount='true' :placeholder="placeholder" @blur="onBlur" @change="onInputChange">
        <div slot="left" class="currency">￥</div>
        <div slot="right">
           <slot name="right"></slot>
        </div>
      </md-input-item>
      <div class="wrong" v-if="showError">
        <div v-show="wrongShow">
          <img class="right-icon" src="@/assets/cuowu.png" alt />
          超出卡内余额
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import mInput from "@/components/Input/bankCardNum.vue";
import { Amount, InputItem } from "mand-mobile";
export default {
  components: {
    mInput,
    [InputItem.name]: InputItem,
    [Amount.name]: Amount,
  },
  props: {
    // 金额
    value: {
      type: [String, Number],
      default: ""
    },
    balance: { // 卡余额，用于对比显示错误信息
      type: [String, Number],
      default: ""
    },
    showUpper: { // 是否显示大写金额
      type: Boolean,
      default: true
    },
    showUnits: { // 是否显示金额单位  与金额同位
      type: Boolean,
      default: false,
    },
    showError:{
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请输入',
    }
  },
  data() {
    return {
      upperMoney: null,
      innerValue: "",
    };
  },
  computed: {
    wrongShow() {
      let show = false;
      if (Number(this.innerValue) > Number(this.balance)) {
        show = true;
      }
      return show
    },
  },
  methods: {
    onInputChange(name, value) {
      if(value){
        this.innerValue = this.innerValue.replace(/[^\d.]/g,'');
        this.upperMoney = parseFloat(value);
      }
      this.$emit('change', value)
    },
    onBlur() {
      this.$emit("blur");
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        this.innerValue = val;
      },
      immediate: true
    },
    innerValue(val, oldVal) {
      
      val = val.toString();
      var arr0 = val.split("");
      var arr = val.split(".");
      // 第一位输入的是0的时候进行处理采用第二位的数字
      if (arr0.length == 2 && arr0[0] == "0" && arr0[1] !== ".") {
        this.innerValue = Number(arr0[1]);
        this.$emit("input", this.innerValue);
        return;
      }
      //小数点后超过两位时取前两位
      if (val == "") {
        this.innerValue = "";
      } else if (arr.length == 2 && arr[1].length > 2) {
        this.innerValue = Number(oldVal);
      }
      this.$emit("input", this.innerValue);
    },
    immediate: true
  },

};
</script>
<style lang="scss" scoped>
// 金额大小写转换
.transfer-amount {
  position: relative;
  margin: 0 px2vw(40);
  // 大写金额
  /deep/ .upper.md-amount {
    display: block;
    height: px2vw(30);
    color: #ffb52b;
    font-size: px2vw(24);
    font-weight: 400;
    margin-bottom: px2vw(8);
  }
  // 金额单位
  .comUnits {
    height: px2vw(30);
    display: block;
    color: #ffb52b;
    font-size: px2vw(24);
    font-weight: 400;
    margin-bottom: px2vw(8);
  }
  // ￥
  .currency {
    color: #262626;
    font-size: px2vw(40);
    font-family: $font-family;
  }

  /deep/ .md-input-item.is-amount .md-input-item-input {
    font-family: $font-family;
    font-weight: 400;
  }
  /deep/ .md-field-item-content {
    font-size: px2vw(40);
    font-weight: 500;
    width: 100%;
    min-height: inherit;
    &:before {
      border: none;
    }
    .md-input-item-fake,
    .md-input-item-input {
      font-size: px2vw(50);
      font-family: $font-family;
      height: px2vw(54);
      line-height: px2vw(54);
      &::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        font-size: px2vw(40);
        font-family: $font-family;
        font-weight: 300;
      }
      &::placeholder {
        font-size: px2vw(40);
        font-family: $font-family;
        font-weight: 300;
      }
      &::-ms-input-placeholder {
        /* Microsoft Edge */
        font-size: px2vw(40);
        font-family: $font-family;
        font-weight: 300;
      }
    }
  }

 
  .wrong {
    font-size: px2vw(24);
    color: #ff4040;
    display: flex;
    align-items: center;
    height: px2vw(30);
    border-bottom: $border-bottom;
    img {
      width: px2vw(22);
      height: px2vw(22);
      margin-right: px2vw(10);
    }
  }
}
</style>
