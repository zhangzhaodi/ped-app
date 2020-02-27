<template>
  <div class="v-input">
    <input
      ref="input"
      class="v-input__inner"
      v-bind="$attrs"
      :type="inputType"
      :disabled="disabled"
      :readonly="inputReadonly"
      :maxlength="inputMaxlength"
      :aria-label="label"
      @click="scrollToInput"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <span class="v-input__suffix">
      <img
        v-show="showClear"
        class="icon-clear"
        src="./img/icon-clear.png"
        alt
        @touchstart="handleClear"
        @click="handleClear"
      />
    </span>
    <div v-if="useKeyboard" v-show="keyboardVisible" class="fake-blink-container">
      <span class="fake-number">{{ visualInputValue }}</span>
      <i class="fake-blink"></i>
    </div>
    <vKeyboard
      v-model="keyboardVisible"
      :hide-dot="keyboardHideDot"
      @enter="handleKeyboardEnter"
      @delete="handleKeyboardDelete"
      @confirm="handleKeyboardConfirm"
    ></vKeyboard>
  </div>
</template>

<script>
/**
 * 输入框组件，支持虚拟数字键盘
 * Created at     : 2019-04-08 18:03:10
 * Last modified  : 2019-04-12 17:57:22
 *
 * ! ******** 事件介绍 ********
 * * input: 字符输入（中文拼音输入时不触发，空格确认时触发）
 * * focus: 输入框获取焦点
 * * blur: 输入框失去焦点
 * * change: 输入框内容改变并且失去焦点时触发
 * * clear: 点击清空时触发
 * * confirm: 点击确定按钮时触发
 *
 * ! 类型为金额、手机号、银行卡号时，输入显示的是格式化后的值，但v-model绑定的值仍是未格式化的值
 */

import vKeyboard from "@/components/Input/v-keyboard";
import { Toast } from "mint-ui";
import {
  checkTel,
  checkBankCardNumber,
  checkIdCardNumber,
  formatBankCardNumber,
  formatTel,
  formatMoney,
  restoreMoney,
  superTrim
} from "@/tools/tools";
import { setInterval } from 'timers';

// 辅助输入框滚动到视野内的站位div
let $emptyDiv = null;
export default {
  name: "VInput",

  components: {
    vKeyboard
  },

  props: {
    // input绑定值
    value: {
      type: [String, Number],
      default: ""
    },
    // 输入数据类型
    type: {
      type: String,
      default: "text",
      validator: function(value) {
        const valid = [
          "text", // 文本
          "number", // 数字
          "tel", // 手机号
          "money", // 金额
          "bankCardNumber", // 银行卡号
          "IdNumber", // 身份证号
          "password", // 密码
          "verify" //验证码
        ].includes(value);
        if (!valid) {
          console.error(`vInput: props type "${value}" is not valid`);
        }
        return valid;
      }
    },
    // 是否开启验证
    enableValidate: {
      type: Boolean,
      default: true
    },
    // 是否只读（只读状态配置useKeyboard可以使用数字键盘）
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 输入内容长度限制
    maxlength: {
      type: Number,
      default: Infinity
    },
    // 输入项名（用于报错提示）
    label: {
      type: String,
      default: ""
    },
    // 是否必填
    required: {
      type: Boolean,
      default: false
    },
    // 自定义校验规则，参数中可获取当前输入值
    validateFunc: {
      type: Function,
      default: null
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: true
    },
    // 是否使用安全键盘
    useKeyboard: {
      type: Boolean,
      default: false
    },
    // 是否隐藏数字键盘的点
    hideDot: {
      type: Boolean,
      default: false
    },
    // 是否展示toast提示信息
    hideToast: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // 格式化后的输入框内容
      visualInputValue: "",
      // 是否正在输入（用于中文拼音输入时，空格确认中文前，避免拼音输入时触发input事件）
      isComposing: false,
      // 是否获得焦点
      focused: false,
      // 键盘是否显示
      keyboardVisible: false,
      // 手机视窗大小
      winHeight: 0,
    };
  },

  computed: {
    inputType() {
      // 因为手机号之间要加空格，所以不能用number类型
      let type = this.type
      if (type === "number"/* || this.type == 'tel' */) {
        return "number";
      }
      if (type === "password") {
        return "password";
      }
      if(type === "IdNumber" || type==="verify" || this.type == 'bankCardNumber') {
        // tel 类型支持 数字输入且长度限制
        return "tel";
      }
      return "text";
    },
    showClear() {
      return (
        this.clearable &&
        !this.disabled &&
        !this.readonly &&
        this.visualInputValue &&
        this.focused
      );
    },
    inputReadonly() {
      return this.useKeyboard || this.readonly;
    },
    inputMaxlength() {
      if (this.maxlength < Infinity && this.maxlength > 0) {
        return this.maxlength;
      }
      switch (this.type) {
        case "tel":
          // 加2个空格
          return 11 + 2;
        case "bankCardNumber":
          // 加4个空格
          return 19;
        case "IdNumber":
          return 18;
        case "money":
          return 16;
        case "verify":
          return 6;
        default:
          return Infinity;
      }
    },
    keyboardHideDot() {
      if (this.hideDot) {
        return this.hideDot;
      }
      if (["tel", "bankCardNumber", "IdNumber"].includes(this.type)) {
        return true;
      }
      return false;
    }
  },

  watch: {
    keyboardVisible(visible) {
      if (visible) {
        this.scrollInputIntoView();
      } else {
        this.cancelScrollInputIntoView();
      }
    },
    visualInputValue(val) {
      this.$refs.input.value = val;
    }
  },

  created() {
    // this.visualInputValue = this.value
    this.winHeight = window.innerHeight;
  },
  mounted(){

  },
  methods: {
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionEnd(event) {
      this.isComposing = false;
      // this.handleInput(event)
    },
    handleInput(event) {
      setTimeout(() => {
        if (this.isComposing) return;
        this.setInputValue(event.target.value);
      }, 0);
    },
    handleFocus(event) {
      this.focused = true;
      // this.scrollInputIntoView1()
      this.$emit("focus", event);
      if (this.useKeyboard) {
        this.keyboardVisible = true;
      }

      if (this.type == "money") {
        const restoredMoney = restoreMoney(this.visualInputValue);
        if (restoredMoney) {
          this.visualInputValue = restoredMoney;
        } else {
          this.visualInputValue = "";
        }
      }
    },
    handleBlur(event) {
      this.keyboardVisible = false;
      /**
       * 由于点击clear按钮触发blur后，clear按钮会消失，
       * blur事件在点击之前发生，所以造成blur之后clear按钮消失，
       * 因此延迟触发blur，在点击触发后将focused改为false
       */
      setTimeout(() => {
        this.focused = false;
        this.$emit("blur", event);
        this.cancelScrollInputIntoView();
        if (this.enableValidate) {
          this.validateValue();
        }
        if (this.type == "money") {
          const formatedMoney = formatMoney(this.visualInputValue);
          this.visualInputValue = formatedMoney;
        }
      }, 50);
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    handleClear(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.setInputValue("");
      this.$emit("clear");
    },
    validateValue() {
      const val = this.value;
      if (typeof this.validateFunc === "function") {
        return this.validateFunc(val);
      }
      if (!this.required && !val) {
        return true;
      }
      if (this.required && !val && val != 0) {
        Toast({
          message: `${this.label || "此项"}不能为空`,
          duration: 1000
        });
        return false;
      }
      if (this.type == "number" && isNaN(val)) {
        Toast({
          message: `${this.label || "此项"}必须为数字`,
          duration: 1000
        });
        return false;
      }
      if (this.type == "tel" && !checkTel(val) && !this.hideToast) {
        Toast({
          message: `请输入正确的${this.label || "手机号"}`,
          duration: 1000
        });
        return false;
      }
      if (this.type == "money") {
        return false;
      }
      if (this.type == "bankCardNumber" && !checkBankCardNumber(val)) {
        Toast({
          message: "请输入正确的银行卡卡号",
          duration: 1000
        });
        return false;
      }
      if (this.type == "IdNumber" && !checkIdCardNumber(val)) {
        Toast({
          message: "请输入正确的身份证号",
          duration: 1000
        });
        return false;
      }
    },
    setInputValue(newVal) {
      if (!newVal) {
        this.visualInputValue = "";
        this.$emit("input", "");
        return;
      }
      if (this.type == "bankCardNumber") {
        this.visualInputValue = formatBankCardNumber(newVal);
        this.$emit("input", superTrim(this.visualInputValue));
      } else if (this.type == "tel") {
        this.visualInputValue = formatTel(newVal);
        this.$emit("input", superTrim(this.visualInputValue));
      } else if (this.type == "money") {
        newVal = String(newVal);
        if (newVal.length > 16) {
          return;
        }
        // 如果修改金额时没有focus，说明是外部修改，则直接格式化，否则在输入完blur后格式化
        if (!this.focused) {
          this.visualInputValue = formatMoney(newVal);
        } else {
          this.visualInputValue = newVal;
        }
        this.$emit("input", newVal);
      } else {
        this.visualInputValue = newVal.substring(0, this.maxlength);
        this.$emit("input", this.visualInputValue);
      }
    },
    handleKeyboardEnter(text) {
      if (this.type == "money") {
        // 如果小数点后已经有两位数字，则不能再继续输入
        if (/\.(?=\d{2})/.test(this.visualInputValue)) {
          return;
        }
        // 如果金额中已经有小数点，则不能再输入点了
        if (text == "." && /\.|^$/.test(this.visualInputValue)) {
          return;
        }
        // 如果金额为0，则不能再输入0了
        if (text == "0" && this.visualInputValue == "0") {
          return;
        }
        if (
          !/\.|^$/.test(this.visualInputValue) &&
          this.visualInputValue.toString().length == 10 &&
          text != "."
        ) {
          return;
        }
      }
      if (this.type == "tel") {
        // 如果输入框为空，则输入的值必须为1
        if (text != "1" && !this.visualInputValue) {
          return;
        }
      }
      this.setInputValue(this.visualInputValue + "" + text);
    },
    handleKeyboardDelete() {
      const inputVal = this.value;
      if (inputVal === "") {
        return;
      }
      this.setInputValue(inputVal.substr(0, inputVal.length - 1));
    },
    handleKeyboardConfirm() {
      this.$emit("confirm", this.value);
    },
    // handleClick(){
    //   window.scrollBy({
    //           top: 0,
    //           left: 0,
    //           behavior: "smooth"
    //   });
    //   this.scrollInputIntoView1();
    // },
    // // 判断原生键盘遮挡住input，将input滚动到视野内
    // scrollInputIntoView1(){
    //   this.cancelScrollInputIntoView();
    //   const $input = this.$el;
    //   const viewHeight = window.innerHeight > 378 ? window.innerHeight - 230 : window.innerHeight;
    //   const inputBottomToTop = $input.getBoundingClientRect().bottom;
    //   // 输入框下边距屏幕顶部距离
    //   this.$nextTick(() => {
    //     if (inputBottomToTop > viewHeight) {
    //       if (
    //         // 如果页面有足够的滚动距离，则直接滚动
    //         document.body.scrollHeight - window.scrollY - window.innerHeight >
    //         inputBottomToTop - viewHeight
    //       ) {
    //         window.scrollBy({
    //           top: inputBottomToTop - viewHeight,
    //           left: 0,
    //           behavior: "smooth"
    //         });
    //       }else{
    //           $emptyDiv = document.createElement("div");
    //           $emptyDiv.className = "v-iput--empty-div";
    //           $emptyDiv.style.height = 230 + "px";
    //           document.querySelector(".scrollerBox").appendChild($emptyDiv);
    //           $input.scrollIntoView({
    //               behavior: "smooth"
    //           });
    //       }

    //     }

    //   })
    // },
    // 判断原生键盘遮挡住input，将input滚动到视野内
    scrollToInput(){
      const $input = this.$refs.input;
      if(!document.querySelector(".scrollerBox")) return
      const scollY = document.querySelector(".scrollerBox").scrollTop; 
      const inputBottomToTop = $input.getBoundingClientRect().bottom;
      // 输入框下边距屏幕顶部距离
      this.$nextTick(() => {
          let viewHeight = window.innerHeight;
          if (inputBottomToTop > viewHeight) {
            if (
              // 如果页面有足够的滚动距离，则直接滚动
              document.querySelector(".scrollerBox").scrollHeight - scollY - viewHeight + 44 > inputBottomToTop - viewHeight
            ) {
              window.scrollBy({
                top: inputBottomToTop - viewHeight,
                left: 0,
                behavior: "smooth"
              });
            }else{
                // this.cancelScrollInputIntoView();
                $emptyDiv = document.createElement("div");
                $emptyDiv.className = "v-iput--empty-div";
                $emptyDiv.style.height = 289 + "px";
                document.querySelector(".scrollerBox").appendChild($emptyDiv);
                $input.scrollIntoView({
                    behavior: "smooth"
                });
            }

          }else{

          }

      })
    },
    // 判断键盘遮挡input时，将input滚动到视野内
    scrollInputIntoView() {
      const $input = this.$el;

      this.$nextTick(() => {
        const $keyboard = this.$el.querySelector(
          ".md-number-keyboard-container"
        );
        if (!$keyboard) {
          return;
        }
        // 除去键盘屏幕可视区域高度
        const viewHeight = window.innerHeight - $keyboard.offsetHeight;
        // 输入框下边距屏幕顶部距离
        const inputBottomToTop = $input.getBoundingClientRect().bottom;
        // 如果当前输入框不在可视区域内
        if (inputBottomToTop > viewHeight) {
          if (
            // 如果页面有足够的滚动距离，则直接滚动
            document.body.scrollHeight - window.scrollY - window.innerHeight >
            inputBottomToTop - viewHeight
          ) {
            window.scrollBy({
              top: inputBottomToTop - viewHeight,
              left: 0,
              behavior: "smooth"
            });
          } else {
            // 否则创建空的div辅助滚动
            $emptyDiv = document.createElement("div");
            $emptyDiv.className = "v-iput--empty-div";
            $emptyDiv.style.height = $keyboard.offsetHeight + "px";
            document.querySelector(".scrollerBox").appendChild($emptyDiv);
            $input.scrollIntoView({
              behavior: "smooth"
            });
          }
        }
      });
    },
    cancelScrollInputIntoView() {
      if ($emptyDiv) {
        $emptyDiv.remove();
        $emptyDiv = null;
      }else{
        $emptyDiv = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-input {
  position: relative;
  width: 100%;
  .v-input__inner {
    -webkit-appearance: none;
    box-sizing: border-box;
    display: inline-block;
    height: 100%;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    padding-right: 30px;
  }
  .fake-blink-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    align-items: center;
    .fake-number {
      visibility: hidden;
    }
    .fake-blink {
      display: inline-block;
      z-index: 10;
      height: 1.5em;
      width: 1px;
      border: none;
      color: #000;
      background: #000;
      animation: ani-blink 1s infinite;
    }
  }
  .v-input__suffix {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 99;
    .icon-clear {
      width: 4vw;
      height: 4vw;
      right: 0px;
      box-sizing: content-box;
    }
  }
}

@keyframes ani-blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  50.01% {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
}
</style>
