<template>
  <li v-if="noTouch"
      :class="[active ? 'active' : '']"
      @click="$_onFocus"
      v-text="value"></li>
  <li v-else
      :class="[active ? 'active' : '']"
      @touchstart="$_onFocus"
      @touchmove="$_onBlur"
      @touchend="$_onBlur"
      @touchcancel="$_onBlur"
      @click="$_onFocus"
      v-text="value"></li>
</template>

<script>
export default {
  name: 'MdNumberKey',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    noTouch: {
      type: Boolean,
      default: false
    },
    noPrevent: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      active: false
    }
  },

  methods: {
    $_onFocus(event) {
      if (!this.noPrevent) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
      if (!this.noTouch) {
        this.active = true
      }
      this.$emit('press', this.value)
    },
    $_onBlur() {
      this.active = false
    }
  }
}
</script>