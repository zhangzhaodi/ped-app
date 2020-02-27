<template>
  <cell-swipe :right="right"
              class="history-swipe">
    <img :src="dataSlot.paymentImageAbleUrl"
         class="left-img">
    <div class="his-item">
      <div class="type">
        {{ dataSlot.paymentTypeName }}
      </div>
      <div class="lable">
        {{ dataSlot.chargeNo }}<span v-if="dataSlot.chargeUserName"><span class="space-lr">|</span><span>{{ dataSlot.chargeUserName }}</span></span>
      </div>
    </div>
    <img src="@/assets/LifePay/arrow.png"
         class="right-img">
  </cell-swipe>
</template>
<script>
import { CellSwipe } from 'mint-ui'
export default {
  components: {
    CellSwipe
  },
  props: {
    index: {
      type: Number,
      default: -1
    },
    dataSlot: {
      type: Object,
      default: () => {
        return {}
      }
    },
    right: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick(evt) {
      console.log(evt)
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss">
.history-swipe {
  &.mint-cell {
    min-height: px2vw(65);
    // background-image: none !important;
    &:first-of-type{
      .mint-cell-wrapper{
        background-image: none;
      }
    }
    &:last-of-type{
      background-image: none;
    }
  }
  .mint-cell-wrapper {
    padding: 0;
    // background-image: none;
  }
  .mint-cell-swipe-button {
    line-height: px2vw(65);
  }
  .mint-cell-value {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>

<style lang="scss" scoped>
.history-swipe {
  .his-box {
    background: #fff;
    margin-top: px2vw(8);
  }
  .his-li {
    width: 3px;
    height: px2vw(18);
    background: #18baf9;
    position: absolute;
    margin-top: px2vw(16);
  }
  .his-title {
    padding: px2vw(14);
    font-size: px2vw(15);
  }
  .his-more {
    float: right;
    color: #18baf9;
    font-size: px2vw(14);
  }
  .his-more > img {
    width: px2vw(11);
    margin-left: px2vw(14);
    vertical-align: text-bottom;
  }
  .his-item {
    // position: absolute;
    // left: px2vw(40);
    /* line-height: normal */
  }
  .his-item .type {
    font-size: px2vw(14);
    color: #333;
    height: px2vw(14);
    padding-top: px2vw(14);
  }
  .his-item .lable {
    font-size: px2vw(12);
    color: #999;
    height: px2vw(12);
    padding-top: px2vw(10);
    padding-bottom: px2vw(14);
    max-width: px2vw(280);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .left-img {
    width: px2vw(45);
    // position: absolute;
    /* left: px2vw(10); */
    // left: px2vw(-5);
  }
  .right-img {
    width: px2vw(10);
    // position: absolute;
    // right: px2vw(14);
    margin-left: auto;
    margin-right: 4vw;
  }
}
</style>