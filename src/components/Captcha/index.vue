<template>
  <div class="md-captcha" v-show="isView || value || visible">
    <template v-if="isView">
      <div class="md-captcha-content">
        <h2 class="md-captcha-title" v-if="title" v-text="title">
          <span class="iconfont icon-iconset0157"></span>
        </h2>
        <div class="md-captcha-message">
          <slot></slot>
        </div>
      </div>
      <md-codebox
        ref="codebox"
        v-model="code"
        :maxlength="maxlength"
        :system="system"
        :mask="mask"
        @submit="$_onSubmit"
        @confirm="$_onConfirm"
        :closable="false"
        :isView="true"
        :justify="true"
        :autofocus="false"
      >
        <footer class="md-captcha-footer">
          <div class="md-captcha-error" v-if="errorMsg" v-text="errorMsg"></div>
          <div class="md-captcha-brief" v-else v-text="brief"></div>
          <button
            class="md-captcha-btn"
            v-if="count"
            v-text="countBtnText"
            :disabled="this.isCounting"
            @click="$_onResend"
          ></button>
        </footer>
      </md-codebox>
    </template>
    <template v-else>
      <md-dialog
        :value="value"
        :closable="true"
        :appendTo="false"
        position="center"
        @input="$_onInput"
        @show="$_onShow"
        @hide="$_onHide"
      >
        <div class="md-captcha-content">
          <h2 class="md-captcha-title" v-if="title" v-text="title"></h2>
          <div class="md-captcha-message">
            <slot></slot>
          </div>
        </div>
        <md-codebox
          ref="codebox"
          v-model="code"
          :maxlength="maxlength"
          :system="system"
          :closable="false"
          :mask="mask"
          :justify="true"
          :autofocus="false"
          @submit="$_onSubmit"
        >
          <footer class="md-captcha-footer">
            <div class="md-captcha-error" v-if="errorMsg" v-text="errorMsg"></div>
            <div class="md-captcha-brief" v-else v-text="brief"></div>
            <button
              class="md-captcha-btn"
              v-if="count"
              v-text="countBtnText"
              :disabled="this.isCounting"
              @click="$_onResend"
            ></button>
          </footer>
        </md-codebox>
      </md-dialog>
    </template>
  </div>
</template>

<script>
import { Dialog ,Button} from 'mand-mobile'
import Codebox from './codebox'
import {mdDocument} from './_util'

export default {
  name: 'md-captcha',

  components: {
    [Dialog.name]: Dialog,
    [Codebox.name]: Codebox,
    [Button.name]: Button,
  },

  props: {
    title: {
      type: String,
    },
    brief: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [Number, String],
      default: 4,
    },
    mask: {
      type: Boolean,
      default: false,
    },
    system: {
      type: Boolean,
      default: false,
    },
    autoCountdown: {
      type: Boolean,
      default: true,
    },
    appendTo: {
      default: () => mdDocument.body,
    },
    count: {
      type: Number,
      default: 60,
    },
    countNormalText: {
      type: String,
      default: '发送验证码',
    },
    countActiveText: {
      type: String,
      default: '{$1}s',
    },
    isView: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      code: '',
      visible: false,
      errorMsg: '',
      isCounting: false,
      firstShown: false,
      countBtnText: this.countNormalText,
    }
  },

  watch: {
    value(val) {
      if (val) {
        this.code = ''
        if (!this.firstShown) {
          this.firstShown = true
          this.$_onResend()
        }
      }
    },
    code(val) {
      if (val && this.errorMsg) {
        this.errorMsg = ''
      }
    },
  },

  mounted() {
    if (this.appendTo && !this.isView) {
      this.appendTo.appendChild(this.$el)
    }
    if (this.value || this.isView) {
      this.firstShown = true
      this.$_onResend()
    }
  },

  beforeDestroy() {
    if (this.appendTo && !this.isView) {
      this.appendTo.removeChild(this.$el)
    }
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onInput(val) {
      this.$emit('input', val)
    },
    $_onShow() {
      this.visible = true
      this.$refs.codebox.focus()
      this.$emit('show')
    },
    $_onHide() {
      this.visible = false
      this.$refs.codebox.blur()
      this.$emit('hide')
    },
    $_onSubmit(code) {
      this.$emit('submit', code)
    },
    $_onConfirm(code){
      this.$emit('confirm', code)
    },
    $_onResend() {
      if (this.autoCountdown) {
        this.countdown()
      }
      this.$emit('send', this.countdown)
    },
    // MARK: public methods
    countdown() {
      if (!this.count) {
        return
      }
      clearInterval(this.__counter__)
      const timestamp = Date.now()
      let i = this.count
      this.isCounting = true
      this.countBtnText = this.countActiveText.replace('{$1}', i)
      /* istanbul ignore next */
      this.__counter__ = setInterval(() => {
        if (i <= 1) {
          this.resetcount()
        } else {
          i = this.count - Math.floor((Date.now() - timestamp) / 1000)
          this.countBtnText = this.countActiveText.replace('{$1}', i)
        }
      }, 1000)
    },
    resetcount() {
      this.isCounting = false
      this.countBtnText = this.countNormalText
      clearInterval(this.__counter__)
    },
    setError(msg) {
      this.$nextTick(() => {
        this.errorMsg = msg
        // this.code = ''
      })
    },
  },
}

</script>

<style lang="scss" scoped>
@import "../../assets/IconFont/iconfont.css";
.md-captcha-content{
  font-size:px2vw(30);
  color:#858b9c;
  text-align:center;
  line-height:1.2;
  margin-bottom:px2vw(50);
  .md-captcha-title{
    height: px2vw(100);
    line-height: px2vw(100);
    font-size:px2vw(34);
    font-weight: 400;
    color: $color-text;
    position: relative;
    .close{
      position: absolute;
      left: px2vw(40);
      top: px2vw(39);
    }
  }
}
.md-captcha-error, .md-captcha-brief{
  flex: 1 1 0%;
}
.md-captcha-error{
  color:#FF5257;
}
.md-captcha-brief{
  color:#7d7d7d;
}
/deep/ .md-codebox-wrapper{
    .md-codebox{
      margin: 0 px2vw(40);
    }
    .md-captcha-footer{
      margin: px2vw(38) px2vw(40) px2vw(94) px2vw(40);
      .md-captcha-brief{
        columns: #7d7d7d;
        font-size: px2vw(28);
      }
      .md-captcha-btn{
        color: #7d7d7d;
        font-size: px2vw(28);
        display:inline-block;
        border:0;
        border-radius:0;
        background:none;
        &:disabled{
          color:#7d7d7d;
        }
      }
    }
  }
</style>