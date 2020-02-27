<template>
  <div>
    <div class="mand-input">
      <md-input-item
        v-model="innerValue"
        :type="type"
        :title="title"
        :name="name"
        :placeholder="placeholder"
        :error="error"
        :maxlength="maxlength"
        :clearable="clearable"
        :disabled="disabled"
        :readonly="readonly"
        @blur="onBlur"
        @change="onChange"
      >
        <div slot="right">
          <slot name="right"></slot>
        </div>
      </md-input-item>
    </div>
    <!-- <p v-if="isError" class="error" slot="error">
      请输入争取
    </p>-->
  </div>
</template>

<script>
import { InputItem, Toast, Icon } from "mand-mobile";
export default {
  components: {
    [InputItem.name]: InputItem,
    [Toast.name]: Toast,
    [Icon.name]: Icon
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    maxlength: {
      type: [String, Number],
      default: ""
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerValue: "",
      isError: true
    };
  },
  watch: {
    value: {
      handler(val) {
        this.innerValue = val;
      },
      immediate: true
    },
    innerValue(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    onBlur() {
      this.$emit("blur");
    },
    onChange(name, val) {
      this.$emit("change", val);
    }
  }
};
</script>
<style lang="scss" scoped>

.mand-input {
  // height: px2vw(110);
  width: 100%;
  display: flex;
  align-items: center;
  font-size: px2vw(30);
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(38, 38, 38, 1);
  /deep/ .md-field-item-content:before {
    border: none;
  }
  /deep/ .md-field-item {
    width: 100%;
    .md-field-item-content {
      flex: 1;
      display: flex;
      align-items: center;
      height: px2vw(110);
      .md-field-item-title {
        min-width: px2vw(100);
        font-size: px2vw(30);
      }
      .md-field-item-control {
        flex: 1;
        text-align: center;
        // height:100%;
        vertical-align: middel;
        .md-input-item-input {
          width: 100%;
          font-size: px2vw(30);
          // height: px2vw(38);
          font-weight: 400;
          font-family: $font-family;
          line-height: px2vw(32);
          // padding-top: px2vw(4) 0;
          &::-webkit-input-placeholder {
            /* WebKit, Blink, Edge */
            color: #a8a8a8;
            font-size: px2vw(30);
            line-height: inherit;
            font-family: $font-family;
            font-weight: 300;
          }
          &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #a8a8a8;
            font-size: px2vw(30);
            font-family: $font-family;
            font-weight: 300;
            line-height: inherit;
          }
          &::placeholder {
            /* 大部分现代浏览器 */
            color: #a8a8a8;
            font-size: px2vw(30);
            font-family: $font-family;
            font-weight: 300;
            line-height: inherit;
          }
          &::-ms-input-placeholder {
            /* Microsoft Edge */
            color: #a8a8a8;
            font-size: px2vw(30);
            font-family: $font-family;
            font-weight: 300;
            line-height: inherit;
          }
        }
      }
    }
    // .md-example-child-input-item-5 {
    //   .error {
    //     float: left width 100%;
    //     .error-action {
    //       float: right;
    //       color: #5878b4;
    //     }
    //   }
    // }
  }
}
</style>
