<template>
  <van-popup
    v-model="show"
    position="bottom"
    class="bottomPupup"
    @close="close"
  >
    <div class="head">
      <p class="iconfont iconicon_guanbi-" @click="close"></p>
      <p class="title">{{ title }}</p>
    </div>
    <slot></slot>
  </van-popup>
</template>

<script>
import { Popup } from "vant";
export default {
  components: {
    [Popup.name]: Popup
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  watch: {
    isShow: {
      handler(val) {
        this.show = val;
      }
    }
  },
  data() {
    return {
      show: false
    };
  },
  created() {},
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.bottomPupup {
  padding-bottom: px2vw(20);
  border-radius: px2vw(20) px2vw(20) 0px 0px;
  .head {
    height: px2vw(100);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 px2vw(40);
    .iconfont {
      width: px2vw(22);
      height: px2vw(22);
      font-size: px2vw(24);
      color: #666666;
    }
    .title {
      font-size: px2vw(34);
      font-weight: 400;
      color: #262626;
      text-align: center;
      flex: 1;
    }
  }
}
</style>
