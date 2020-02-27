<template>
  <div class="md-number-keyboard-container"
       :class="type">
    <div class="key-header">
      <div class="key-title">
        <img src="./img/logo.png"
             alt="">
        <span>中旅银行数字键盘</span>
      </div>
      <div class="key-hide"
           @click="$_onSlideDoneClick">
        <img src="./img/icon-hide.png"
             alt="">
      </div>
    </div>
    <div class="key-container">
      <div class="keyboard-number">
        <ul class="keyboard-number-list">
          <md-number-key v-for="n in 9"
                         :key="n-1"
                         class="keyboard-number-item"
                         :value="keyNumberList[n-1]"
                         @press="$_onNumberKeyClick"></md-number-key>
          <template v-if="type === 'professional'">
            <!-- <md-number-key class="keyboard-number-item slidedown"
                           no-touch
                           no-prevent
                           @press="$_onSlideDoneClick"></md-number-key> -->
            <md-number-key class="keyboard-number-item no-bg"></md-number-key>
            <md-number-key class="keyboard-number-item"
                           :value="keyNumberList[9]"
                           @press="$_onNumberKeyClick"></md-number-key>
            <li v-if="isView"
                class="keyboard-number-item"></li>
            <!-- 小数点键 -->
            <md-number-key v-if="hideDot"
                           class="keyboard-number-item no-bg"></md-number-key>
            <md-number-key v-else
                           class="keyboard-number-item"
                           :value="dotText"
                           @press="$_onNumberKeyClick"></md-number-key>
          </template>
          <template v-else>
            <li class="keyboard-number-item no-bg"></li>
            <md-number-key class="keyboard-number-item"
                           :value="keyNumberList[9]"
                           @press="$_onNumberKeyClick"></md-number-key>
            <md-number-key class="keyboard-number-item no-bg delete"
                           @press="$_onDeleteClick"></md-number-key>
          </template>
        </ul>
      </div>
      <!-- 删除和确认键 -->
      <div v-if="type === 'professional'"
           class="keyboard-operate">
        <ul class="keyboard-operate-list">
          <md-number-key class="keyboard-operate-item delete"
                         @press="$_onDeleteClick"></md-number-key>
          <md-number-key class="keyboard-operate-item confirm"
                         :value="okText"
                         no-touch
                         no-prevent
                         @press="$_onConfirmeClick"></md-number-key>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Key from './key'

export default {
  name: 'MdNumberKeyboardContainer',

  components: {
    [Key.name]: Key
  },

  props: {
    type: {
      // simple, professional
      type: String,
      default: 'professional'
    },
    disorder: {
      type: Boolean,
      default: false
    },
    hideDot: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: '确定'
    },
    isView: {
      type: Boolean
    },
    textRender: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      keyNumberList: []
    }
  },

  computed: {
    dotText() {
      return this.textRender('.') || '.'
    }
  },

  created() {
    this.$_generateKeyNumber()
  },

  methods: {
    // MARK: private methods
    $_generateKeyNumber() {
      const baseStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      const baseStackTmp = [...baseStack]
      /* istanbul ignore next */
      this.keyNumberList = baseStack.map(item => {
        const val = this.disorder
          ? baseStackTmp.splice(
              parseInt(Math.random() * baseStackTmp.length),
              1
            )[0] || 0
          : item
        return this.textRender(val) || val
      })
    },

    // MARK: events handler, 如 $_onButtonClick
    $_onNumberKeyClick(val) {
      this.$emit('enter', val)
    },
    $_onDeleteClick() {
      this.$emit('delete')
    },
    $_onConfirmeClick() {
      this.$emit('confirm')
    },
    $_onSlideDoneClick() {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
$number-keyboard-key-bg: #fff;
$number-keyboard-key-bg-tap: #e2e4ea;
$key-height: 56px;
$color-border: #e7e7e7;
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-number-keyboard-container {
  position: relative;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  border-top: 6px solid #e9e9e9;
  .key-header {
    width: 100%;
    height: 40px;
    @include flex-center;
    .key-title {
      flex: 1;
      font-size: px2vw(15);
      @include flex-center;
      img {
        width: 20px;
        margin-right: 5px;
        margin-left: 25px;
      }
    }
    .key-hide {
      @include flex-center;
      width: 20.5%;
      height: 100%;
      img {
        width: 34px;
      }
    }
  }

  .key-container {
    display: flex;
    position: relative;
    border-top: 1px solid $color-border;
  }

  .keyboard-number,
  .keyboard-operate {
    display: flex;
  }

  .keyboard-number {
    flex: 1;
    background: number-keyboard-bg;

    .keyboard-number-list {
      float: left;
      width: 100%;

      .keyboard-number-item {
        position: relative;
        float: left;
        width: 33.3%;
        height: $key-height;
        text-align: center;
        line-height: $key-height;
        font-size: px2vw(24);
        font-weight: normal;
        color: #111a34;
        transition: background 0.1s;
        background: #fff;
        box-sizing: border-box;
        border-right: 1px solid $color-border;
        border-bottom: 1px solid $color-border;

        &.no-bg {
          background: transparent;
        }

        &:nth-of-type(3n) {
          width: 33.4%;
        }

        &.delete {
          background: url('./img/icon-delete.png') center no-repeat;
          background-size: 25px;
        }

        &.slidedown {
          background: $number-keyboard-key-bg url('./img/icon-hide.png') center
            no-repeat;
          background-size: 54px;
        }

        &.large-item {
          width: 66.6%;
        }

        &:active,
        &.active {
          background-color: $number-keyboard-key-bg-tap;
        }
      }
    }
  }

  .keyboard-operate {
    width: 20.5%;

    .keyboard-operate-list {
      position: relative;
      float: left;
      width: 100%;
      display: flex;
      flex-direction: column;

      .keyboard-operate-item {
        position: relative;
        float: left;
        width: 100%;
        background: $number-keyboard-key-bg;
        transition: background 0.1s;

        &.delete {
          height: $key-height;
          background: $number-keyboard-key-bg url('./img/icon-delete.png')
            center no-repeat;
          background-size: 25px;
          display: flex;
          flex: 1;

          &:active,
          &.active {
            background-color: $number-keyboard-key-bg-tap;
          }
        }

        &.confirm {
          background-color: #2abbf6;
          font-size: px2vw(20);
          color: #fff;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;

          &:active {
            background-color: #aaa;
          }
        }
      }
    }
  }
}
</style>
