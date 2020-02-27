<template>
  <div class="cell-select">
    <van-cell
      :title="title"
      @click="handleClick"
    >
      <template slot="title">
        <span
          class="vant-cell-placeholder"
          v-if="!title"
        >{{placeholder}}</span>
      </template>
      <div  slot="right-icon" class="icon-wrap">
        <img class="right-icon" src="@/assets/electronicAccounts/icon_home_more@2x.png">
      </div>
    </van-cell>
  </div>
</template>

  <script>
import { Cell } from "vant";
export default {
  components: {
    [Cell.name]: Cell
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {};
  },

  created() {},
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>

.cell-select{
  .vant-cell-placeholder {
    color: #a8a8a8;
    font-size: inherit;
  }
  .van-cell .icon-wrap{
      display: flex;
      align-items: center;
      justify-content: center;
      width: px2vw(40);
      .right-icon{
        width:px2vw(10);
        height:px2vw(20);
      }
  }
  
}
</style>
