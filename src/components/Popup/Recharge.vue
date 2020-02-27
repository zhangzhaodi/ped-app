<template>
  <div>
    <van-popup class="popup-round" round v-model="show" position="bottom">
      <header>
        <div class="btn-cancel" @click="show = false">
          <i class="iconfont">&#xe635;</i>
        </div>
        <div class="title">{{title}}</div>
        <div class="btn-confirm" @click="handleConfirm">{{confirmText}}</div>
      </header>
      <Scroller>
        <slot></slot>
      </Scroller>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
import Scroller from "@/components/Scroller.vue";
//圆角popup 底部选择组件  适用于转账模块相关选择popup组件
export default {
  name: "popupround",
  components: {
    [Popup.name]: Popup,
    Scroller
  },
  props: {
    // 输入项名（用于报错提示）
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: "确认"
    }
  },
  data() {
    return {
      show: this.visible
    };
  },
  created() {},
  methods: {
    handleConfirm() {
      this.$emit("confirm");
    }
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
    }
  }
};
</script>
<style lang="scss" scoped>
.popup-round {
  border-radius: px2vw(20) px2vw(20) 0px 0px;
  header {
    height: px2vw(100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 px2vw(40);
    color: $color-text;
    font-size: $font-size;
    font-weight: 400;
  }
  .btn-cancel {
    i {
      font-size: px2vw(22);
      color: rgba(102, 102, 102, 1);
    }
  }
  .title {
    font-size: px2vw(34);
  }
  .btn-confirm {
    color: #fff;
  }
}
</style>
