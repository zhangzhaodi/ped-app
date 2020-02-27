<template>
  <div class="md-number-keyboard-container zl-board" :class="type">
    <div class="keyboard-number">
      <ul class="keyboard-number-list">
        <md-number-key
          class="keyboard-number-item"
          v-for="n in 9"
          :key="n-1"
          :value="keyNumberList[n-1]"
          @press="$_onNumberKeyClick"
        ></md-number-key>
        <template v-if="type === 'professional'">
          <md-number-key
            class="keyboard-number-item"
            v-if="!hideDot"
            :value="dotText"
            @press="$_onNumberKeyClick"
          ></md-number-key>
          <md-number-key
            class="keyboard-number-item"
            :class="{'large-item': hideDot}"
            :value="keyNumberList[9]"
            @press="$_onNumberKeyClick"
          ></md-number-key>
          <li class="keyboard-number-item" v-if="isView"></li>
          <md-number-key
            v-else
            class="keyboard-number-item slidedown"
            no-touch
            no-prevent
            @press="$_onSlideDoneClick"
          ></md-number-key>
        </template>
        <template v-else>
          <md-number-key
            class="keyboard-number-item no-bg delete"
            @press="$_onDeleteClick"
          ></md-number-key>
          <md-number-key
            class="keyboard-number-item"
            :value="keyNumberList[9]"
            @press="$_onNumberKeyClick"
          ></md-number-key>
          <md-number-key
            class="keyboard-number-item no-bg next"
            :value="okText"
            no-touch
            no-prevent
            @press="$_onConfirmeClick"
          ></md-number-key>
        </template>
      </ul>
    </div>
    <div class="keyboard-operate" v-if="type === 'professional'">
      <ul class="keyboard-operate-list">
        <md-number-key
          class="keyboard-operate-item delete"
          @press="$_onDeleteClick"
        ></md-number-key>
        <md-number-key
          class="keyboard-operate-item confirm"
          :value="okText"
          no-touch
          no-prevent
          @press="$_onConfirmeClick"
        ></md-number-key>
      </ul>
    </div>
  </div>
</template>

<script>
import {noop} from '../_util'
import Key from './key'

export default {
  name: 'md-number-keyboard-container',

  components: {
    [Key.name]: Key,
  },

  props: {
    type: {
      // simple, professional
      type: String,
      default: 'professional',
    },
    disorder: {
      type: Boolean,
      default: false,
    },
    hideDot: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: '下一步',
    },
    isView: {
      type: Boolean,
    },
    textRender: {
      type: Function,
      default: noop,
    },
  },

  data() {
    return {
      keyNumberList: [],
    }
  },

  computed: {
    dotText() {
      return this.textRender('.') || '.'
    },
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
        const val = this.disorder ? baseStackTmp.splice(parseInt(Math.random() * baseStackTmp.length), 1)[0] || 0 : item
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
    },
  },
}

</script>

<style lang="stylus">
.md-number-keyboard-container
  position relative
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  display flex
  width number-keyboard-width
  hairline(top, number-keyboard-key-border-color)
  .keyboard-number, .keyboard-operate
    display flex
  .keyboard-number
    flex 3
    background number-keyboard-bg
    .keyboard-number-list
      float left
      width 100%
      .keyboard-number-item
        position relative
        float left
        width 33.3%
        height number-keyboard-key-height
        padding-top 5px
        hairline(right, number-keyboard-key-border-color)
        hairline(top, number-keyboard-key-border-color)
        text-align center
        line-height number-keyboard-key-height
        font-size number-keyboard-key-font-size
        font-weight number-keyboard-key-font-weight
        font-family font-family-number
        color #000
        transition background .3s
        background number-keyboard-key-bg
        box-sizing border-box
        &:nth-of-type(-n+3)
          remove-hairline(top)
        &:nth-of-type(3n)
          width 33.4%
        &.delete
          background url(../_style/images/keyboard-del.png) center no-repeat
          background-size 46px
        &.slidedown
          background number-keyboard-key-bg url(../_style/images/keyboard-hide.png) center no-repeat
          background-size 54px
        &.large-item
          width 66.6%
        &:active, &.active
          background-color #e5e5e5
        &:before, &:after
          pointer-events none
  .keyboard-operate
    flex 1
    .keyboard-operate-list
      position relative
      float left
      width 100%
      display flex
      flex-direction column
      .keyboard-operate-item
        position relative
        float left
        width 100%
        background number-keyboard-key-bg
        transition background .3s
        &.delete
          height number-keyboard-key-height
          background number-keyboard-key-bg url(../_style/images/keyboard-del.png) center no-repeat
          background-size 45px 36px
          display flex
          flex 1
          &:active
            background-color number-keyboard-key-bg-tap
        &.confirm
          padding-top 5px
          color number-keyboard-key-confirm-color
          font-size font-caption-large
          background number-keyboard-key-confirm-bg
          display flex
          flex 1
          align-items center
          justify-content center
          &:active
            background-color number-keyboard-key-confirm-bg-tap

</style>
<style lang="scss">
.md-number-keyboard-container.zl-board{
  background:#D2D5DB;
  height: auto;
  .keyboard-number{
     margin: px2vw(6) px2vw(6) px2vw(2) px2vw(6);
     background: #D2D5DB;
     .keyboard-number-list {
      .keyboard-number-item{
        font-size: px2vw(50);
        box-shadow:0px 2px 0px 0px rgba(132,134,136,1);
        border-radius:10px;
        margin:px2vw(6);
        width:31.5%!important;
        color:#000!important;
        height: px2vw(92);
        padding-top: 0;
        line-height: px2vw(92);
        &:before{
          border:none;
        }
        &:after{
          border:none;
        }
        &.delete{
          background-size: px2vw(45) px2vw(36);
        }
        &.no-bg{
          background-color:#fff;
         
        }
        &.next{
          color:#848688;
          font-size: px2vw(40);
          &.active{
            background:#e5e5e5;
          }
        }
      }
     }

  }
 
}
</style>