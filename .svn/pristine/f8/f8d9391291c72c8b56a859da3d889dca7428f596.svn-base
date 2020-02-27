<template>
  <!-- <div class="mint-msgbox-wrapper" v-show="value"> -->
  <div v-show="value"
       class="msgbox">
    <transition name="msgbox-bounce">
      <div class="mint-msgbox">
        <div v-show="showCloseButton"
             class="msgbox-close"
             @click="doClose()">
          <i class="iconfont icon-close"></i>
        </div>
        <div v-if="title !== ''"
             class="mint-msgbox-header">
          <div class="mint-msgbox-title">
            {{ title }}
          </div>
        </div>
        <div v-if="message !== ''"
             class="mint-msgbox-content">
          <div class="mint-msgbox-message"
               v-html="message"></div>
          <div v-show="showInput"
               class="mint-msgbox-input">
            <input ref="input"
                   v-model="inputValue"
                   :placeholder="inputPlaceholder">
            <div class="mint-msgbox-errormsg"
                 :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button v-show="showCancelButton"
                  :class="[ cancelButtonClasses ]"
                  @click="handleAction('cancel')">
            {{ cancelButtonText }}
          </button>
          <button v-show="showConfirmButton"
                  :class="[ confirmButtonClasses ]"
                  @click="handleAction('confirm')">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>



<style src="mint-ui/src/style/popup.css"></style>

<script type="text/babel">
import { Popup } from 'mint-ui'
// import 'mint-ui/src/style/popup.css'
let CONFIRM_TEXT = '确定'
let CANCEL_TEXT = '取消'

export default {
  mixins: [Popup],

  props: {
    modal: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },

  data() {
    return {
      title: '',
      message: '',
      type: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      showCloseButton: true,
      confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null
    }
  },

  computed: {
    confirmButtonClasses() {
      let classes =
        'mint-msgbox-btn mint-msgbox-confirm ' + this.confirmButtonClass
      if (this.confirmButtonHighlight) {
        classes += ' mint-msgbox-confirm-highlight'
      }
      return classes
    },
    cancelButtonClasses() {
      let classes =
        'mint-msgbox-btn mint-msgbox-cancel ' + this.cancelButtonClass
      if (this.cancelButtonHighlight) {
        classes += ' mint-msgbox-cancel-highlight'
      }
      return classes
    }
  },

  watch: {
    inputValue() {
      if (this.$type === 'prompt') {
        this.validate()
      }
    },

    value(val) {
      this.handleInputType(this.inputType)
      if (val && this.$type === 'prompt') {
        setTimeout(() => {
          if (this.$refs.input) {
            this.$refs.input.focus()
          }
        }, 500)
      }
    },

    inputType(val) {
      this.handleInputType(val)
    }
  },

  methods: {
    doClose() {
      this.value = false
      this._closing = true

      this.onClose && this.onClose()

      setTimeout(() => {
        if (this.modal && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow
          document.body.style.paddingRight = this.bodyPaddingRight
        }
        this.bodyOverflow = null
        this.bodyPaddingRight = null
      }, 200)
      this.opened = false

      if (!this.transition) {
        this.doAfterClose()
      }
    },

    handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return
      }
      var callback = this.callback
      this.value = false
      callback(action)
    },

    validate() {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage =
            this.inputErrorMessage || '输入的数据不合法!'
          this.$refs.input.classList.add('invalid')
          return false
        }
        var inputValidator = this.inputValidator
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue)
          if (validateResult === false) {
            this.editorErrorMessage =
              this.inputErrorMessage || '输入的数据不合法!'
            this.$refs.input.classList.add('invalid')
            return false
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult
            return false
          }
        }
      }
      this.editorErrorMessage = ''
      this.$refs.input.classList.remove('invalid')
      return true
    },

    handleInputType(val) {
      if (val === 'range' || !this.$refs.input) return
      this.$refs.input.type = val
    }
  }
}
</script>

<style lang="scss">
.msgbox {
  position: fixed;
  z-index: 2007;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .msgbox-close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 2vw 3vw;
  }
  .mint-msgbox-header {
    padding-top: px2vw(30);
  }
  .mint-msgbox-title {
    font-size: px2vw(18);
  }
  .mint-msgbox-btn {
    font-size: px2vw(16);
  }
  .mint-msgbox-message {
    font-size: px2vw(14);
  }
  .mint-msgbox-confirm {
    color: #18baf9;
    font-size: px2vw(16);
  }
  .mint-msgbox-cancel {
    font-size: px2vw(16);
    color: #999;
  }
}
</style>
