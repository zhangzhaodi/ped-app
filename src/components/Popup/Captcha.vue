<template>
  <div>
    <van-popup class="popup-round" round v-model="show" position="bottom">
      <header>
        <span class="iconfont close" @click="show = false">&#xe62b;</span>
        请输入短信验证码
      </header>
      <div class="md-example-chil">
        <md-captcha ref="captcha" :value="show" :maxlength="6" :isView="true" :brief="`验证码已发送至${phoneProtect}`" :text-render="keyFormatter" @confirm="onConfirm" @send="SendSmsPwd">
        </md-captcha>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
import { mapState } from "vuex";
import Captcha from '@/components/Captcha'
//圆角popup 底部选择组件  适用于转账模块相关选择popup组件
export default {
  name: 'captcha',
  components: {
    [Popup.name]: Popup,
    [Captcha.name]: Captcha,
  },
  props: {
    // 输入项名（用于报错提示）
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ""
    },
    phoneNum:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: this.visible,
      sms:{
        SmsNbr: "",
      },
      phone: '',
      timer: '',
    };
  },
  created(){
    if(this.userInfo){
      this.phone = this.userInfo.MobilePhone
    }
  },
  mounted() {

  },
  computed: {
    ...mapState('common',['userInfo']),
    keyFormatter(val) {
      if (val === '.') {
        return 'x'
      }
    },
    phoneProtect(){
      let value = this.phone;
      return value.substr(0,3)+ '****' + value.substr(value.length - 4)
    }
  },
  methods: {
    onConfirm(code) {
      this.sms.code = code;
      if(this.sms.code.length === 6){
        this.$emit("confirm", this.sms)
      }
    },
    SendSmsPwd() {
      let params = {
        BankId: '9999',
        BranchId:  "1999",
        ChnlId: "62",
        SmsTransType:'1',
        PhoneNbr:this.phone,
        MobilePhone:this.phone,
      }
      this.request('SendSmsOtp',
        params, true
      ).then((res) => {
        console.log(res,"验证码已发送")
        this.sms = {
          SmsNbr: res.SmsNbr,
        }

      }).catch((error) => {
        console.log(error)
      })
    }
  },
  beforeDestroy(){
    this.timer = null;
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
    },
    phoneNum:{
      handler(val){
        if(val){
          this.phone = val;

        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
