<template>
  <!-- modified from https://github.com/didi/mand-mobile/blob/master/components/number-keyboard/index.vue -->
  <div class="md-number-keyboard"
       :class="{'in-view': isView}">
    <template v-if="isView">
      <md-number-keyboard-container ref="keyborad"
                                    :type="type"
                                    :disorder="disorder"
                                    :ok-text="okText"
                                    :is-view="isView"
                                    :hide-dot="hideDot"
                                    :text-render="textRender"
                                    @enter="$_onEnter"
                                    @delete="$_onDelete"
                                    @confirm="$_onConfirm"
                                    @hide="isKeyboardShow = false"></md-number-keyboard-container>
    </template>
    <template v-else>
      <md-popup ref="popup"
                v-model="isKeyboardShow"
                position="bottom"
                :has-mask="false"
                @show="$emit('show')"
                @hide="$emit('hide')">
        <md-number-keyboard-container ref="keyborad"
                                      :type="type"
                                      :disorder="disorder"
                                      :ok-text="okText"
                                      :is-view="isView"
                                      :hide-dot="hideDot"
                                      :text-render="textRender"
                                      @enter="$_onEnter"
                                      @delete="$_onDelete"
                                      @confirm="$_onConfirm"
                                      @hide="isKeyboardShow = false"
                                      @touchmove.native.prevent></md-number-keyboard-container>
      </md-popup>
    </template>
  </div>
</template>

<script>
import Popup from 'mand-mobile/lib/popup'
import Keyborad from './board'

export default {
  name: 'VNumberKeyboard',

  components: {
    [Popup.name]: Popup,
    [Keyborad.name]: Keyborad
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      // simple, professional
      type: String,
      default: 'professional'
    },
    isView: {
      type: Boolean,
      default: false
    },
    hideDot: {
      type: Boolean
    },
    disorder: {
      type: Boolean
    },
    okText: {
      type: String,
      default: '确定'
    },
    textRender: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      isKeyboardShow: false
    }
  },

  watch: {
    value(val) {
      this.isKeyboardShow = val
    },
    isKeyboardShow(val) {
      this.$emit('input', val)
    }
  },

  mounted() {
    this.value && (this.isKeyboardShow = this.value)
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $_onEnter(val) {
      this.$emit('enter', val)
    },
    $_onDelete() {
      this.$emit('delete')
    },
    $_onConfirm() {
      this.$emit('confirm')
      this.hide()
    },

    // MARK: public methods
    show() {
      /* istanbul ignore next */
      this.isKeyboardShow = true
    },
    hide() {
      /* istanbul ignore next */
      this.isKeyboardShow = false
    }
  }
}
</script>

<style lang="scss">
.md-number-keyboard {
  .md-popup {
    z-index: 1302;
  }

  .md-popup-box {
    background-color: #f9fafb;
  }
}
</style>