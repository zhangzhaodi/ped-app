<template>
  <div>
    <van-popup class="popup-round security" round v-model="show" position="bottom">
      <header>
        <span class="iconfont close" @click="show = false">&#xe62b;</span>
        {{title}}
      </header>
      <div class="main">
        <p class="info">{{form.name}} | {{form.bankName}}({{form.bankCard | CardNoFour}})</p>
        <p class="money"><span class="currency">￥</span>{{form.transAmt | Money}}</p>
      </div>
      <div class="cell-content paddingLR40">
        <van-cell-group>
          <!-- <van-cell class="filed_cell">
            <template slot="title">
              <span class="custom-title">订单信息</span>
            </template>
            <template>
              <div>转账</div>
            </template>
          </van-cell> -->
          <van-cell is-link v-show="selectTool">
            <template slot="title">
              <span class="custom-title">安全工具</span>
            </template>
            <template>
              <div>手机验证码</div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="footer-box">
        <div class="btn-box">
          <van-button class="marginLR40" @click="confirm">下一步</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Cell, CellGroup, Button } from "vant";
import Captcha from '@/components/Captcha'
//圆角popup 底部选择组件  适用于转账模块相关选择popup组件
export default {
  name: 'captcha',
  components: {
    [Popup.name]: Popup,
    [Captcha.name]: Captcha,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  props: {
    // 输入项名（用于报错提示）
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "确认转账"
    },
    selectTool:{
      type:Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => {
        return {
          name: '陈培',
          bankName: '焦作中旅银行',
          bankCard: '656523232334',
          transAmt: '123'
        }
      },
    }
  },
  data() {
    return {
      show: this.visible,
      security: {
        captcha: 'false',
        password: '',
      }
    };
  },
  mounted() {

  },
  computed: {
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    }
  },
  watch: {
    //监听父组件变化，并赋值
    visible: {
      handler(val) {
        this.show = val;
      }
    },
    show: {
      handler(val) {
        this.$emit("update:visible", val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.security {
  header {
    height: px2vw(100);
    line-height: px2vw(100);
    font-size: px2vw(34);
    font-weight: 400;
    text-align: center;
    color: $color-text;
    position: relative;
    .iconfont {
      font-size: px2vw(22);
      color: #7d7d7d;
    }
    .close {
      position: absolute;
      left: px2vw(40);
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: px2vw(227px);
    .info {
      color: $color-text;
      font-size: px2vw(30);
      margin-bottom: px2vw(12);
    }
    .money {
      color: #000;
      font-size: px2vw(70);
      font-weight: 500;
      font-family: $font-family;
      .currency {
        font-size: px2vw(40);
        font-weight: 500;
      }
    }
  }
  .cell-content {
    height: px2vw(411);
    /deep/ .van-cell {
      .van-cell__title {
        color: #7d7d7d;
      }
      .van-cell__value {
        color: #000;
        text-align: right;
      }
    }
  }
  .marginLR40 {
    margin-top: px2vw(20);
    margin-bottom: px2vw(20);
  }
}
</style>
