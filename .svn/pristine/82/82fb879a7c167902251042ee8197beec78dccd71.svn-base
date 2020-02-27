<template>
  <Popup v-model="show.pickerShow"
         position="bottom"
         class="mint-datetime">
    <Picker ref="picker"
            :slots="dateSlots"
            class="mint-datetime-picker"
            :visible-item-count="visibleItemCount"
            show-toolbar
            @change="onChange">
      <span class="mint-datetime-action mint-datetime-cancel"
            @click="cancel">{{ cancelText }}</span>
      <span class="mint-datetime-action mint-datetime-confirm"
            @click="confirm">{{ confirmText }}</span>
    </Picker>
  </Popup>
</template>
<script>
import { Popup, Picker } from 'mint-ui'
export default {
  components: {
    Popup,
    Picker
  },
  props: {
    show: {
      type: Object,
      default: () => {
        return {
          pickerShow: false
        }
      }
    },
    dateSlots: {
      type: Array,
      default: () => {
        return []
      }
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    visibleItemCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      pickerValue: ''
    }
  },
  created() {},
  mounted() {
    if (!this.pickerValue) {
      let arr = this.dateSlots[0].values
      let defaultNum = parseInt(this.visibleItemCount / 2)
      this.pickerValue = arr[defaultNum]
    }
  },
  methods: {
    cancel() {
      this.$set(this.show, 'pickerShow', false)
    },
    onChange(picker, value) {
      this.pickerValue = value[0]
    },
    confirm(picker, value, valueKey) {
      this.$emit('getPickerValue', this.pickerValue)
      this.$set(this.show, 'pickerShow', false)
    }
  }
}
</script>
<style lang="scss">
.mint-datetime {
  width: 100%;
}
.mint-datetime .picker-toolbar {
  border-bottom: 0 !important;
  padding: 0 px2vw(14);
  padding-bottom: px2vw(20);
}
.mint-datetime-action {
  display: inline-block;
  /* text-align: center; */
  width: 50%;
  line-height: 40px;
  font-size: px2vw(16);
  color: #26a2ff;
}
.mint-datetime-cancel {
  float: left;
  text-align: left;
  color: #999;
}
.mint-datetime-confirm {
  float: right;
  text-align: right;
}
.mint-datetime .picker-slot {
  width: 95% !important;
}
.picker-items {
  margin-bottom: px2vw(20);
}
.picker-item {
  font-size: px2vw(14);
}
</style>
