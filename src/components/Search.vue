<template>
  <div class="electron-search-box">
    <form action="/">
      <van-search
        v-model="searchTxt"
        :placeholder="placeholder"
        @search="handleSearch"
        @input="handleInput"
        @clear="handleClear"
        @focus="handleFocus"
        @cancel="handleCancel"
        :show-action="Boolean(searchTxt) || showCancal"
      >
        <div slot="left-icon" class="icon">
          <img
            :src="require(`@/assets/transferAccounts/icon_Search@2x.png`)"
            alt
          />
        </div>
      </van-search>
    </form>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  components: {
    [Search.name]: Search
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入搜索关键词"
    },
    showCancal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchTxt: this.value
    };
  },

  created() {},
  methods: {
    handleSearch() {
      this.$emit("search", this.searchTxt);
    },
    handleCancel() {
      this.value = "";
      this.$emit("cancel", this.value);
    },
    handleInput() {
      this.value = "";
      this.$emit("input", this.searchTxt);
    },
    handleClear() {
      this.$emit("clear", this.searchTxt);
    },
    handleFocus() {
      this.$emit("focus");
    },
    handleCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="scss">
.van-search {
  padding: px2vw(24) px2vw(40) !important;
}
.electron-search-box {
  z-index: 5;

  .van-search__content {
    height: px2vw(70);
    align-items: center;
    border-radius: 35px;
    padding-left: px2vw(30);
    .van-cell {
      height: auto;
    }
    // line-height: px2vw(28);
    .van-field__left-icon {
      display: flex;
      align-items: center;
      .icon {
        width: px2vw(22);
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
    }
    .van-field__control {
      box-sizing: content-box;
      font-size: px2vw(28);
      line-height: inherit; //修复浏览器 行高抖动问题
      &::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #a8a8a8;
        font-size: px2vw(24);
        line-height: normal;
        font-family: PingFangSC;
        font-weight: 300;
        line-height: inherit;
      }
      // &::-moz-placeholder {
      //   /* Mozilla Firefox 19+ */
      //   color: #a8a8a8;
      //   font-size: px2vw(24);
      //   font-family: PingFangSC;
      //   font-weight: 300;
      //   line-height: px2vw(28);
      // }
      // &::placeholder {
      //   /* 大部分现代浏览器 */
      //   color: #a8a8a8;
      //   font-size: px2vw(24);
      //   font-family: PingFangSC;
      //   font-weight: 300;
      //   line-height: px2vw(28);
      // }
      // &::-ms-input-placeholder {
      //   /* Microsoft Edge */
      //   color: #a8a8a8;
      //   font-size: px2vw(24);
      //   font-family: PingFangSC;
      //   font-weight: 300;
      //   line-height: px2vw(28);
      // }
    }
  }
}
</style>
