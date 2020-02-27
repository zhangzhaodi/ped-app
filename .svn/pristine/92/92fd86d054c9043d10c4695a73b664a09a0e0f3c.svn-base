<template>
  <div class="itemcontent">
    <div class="letter search" v-if="isSearch">
      <div class="van-index-anchor">
        <span class="iconfont icon-iconset0157"></span>
        <input type="text" :placeholder="searchPlaceholder" />
      </div>
    </div>
    <div class="letter add" v-if="isAdd">
      <router-link :to="{name:addTo}">
        <div class="van-index-anchor">
          <span class="icon">+</span>
          <span>{{addPlaceholder}}</span>
        </div>
      </router-link>
    </div>
    <template v-for="(letter,index) in letter">
      <van-index-anchor :index="letter" class="letter item" />
      <template v-for="(item,i) in $store.state.linkmanList[letter]">
        <van-swipe-cell>
          <van-cell :title="item.source" @click="addSuccess(item)" />
          <template slot="right">
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </template>
    </template>
  </div>
</template>

<script>
import { IndexBar, IndexAnchor, SwipeCell, Button, Cell } from "vant";
export default {
  components: {
    [IndexAnchor.name]: IndexAnchor,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Cell.name]: Cell
  },
  props: {
    letter: {
      type: Array,
      default: []
    },
    isSearch: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: "姓名/银行名/卡号后四位"
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    addPlaceholder: {
      type: String,
      default: "新增收款人"
    },
    addTo: {
      type: String,
      default: "addPayer"
    },
    backRouter: {
      type: String,
      required: true
    }
  },
  methods: {
    addSuccess(row) {
      let payerAccountInfo = {
        payerAccount: "张艺兴",
        payerBank: "浦发银行",
        payerPhone: "13549763218"
      };
      // console.log(this.$route);
      if (this.isAdd) {
        //有添加功能跳转详情 否跳转到上一个页面返回值
        console.log('编辑')
      } else {
        console.log(this.backRouter)
        this.$router.push({
          name: this.backRouter,
          params: { accountInfo: payerAccountInfo, getAccountInfo: true }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/iconfont.css";
.item {
  height: px2vw(60);
  line-height: px2vw(60);
}
.search .iconfont {
  color: #262626;
  font-weight: bold;
}
a {
  display: block;
}
.search {
  width: 100%;
  background-color: #fff;
  height: px2vw(118);
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 0.2px solid rgba(0, 0, 0, 0.1);
  .van-index-anchor {
    width: 100%;
    height: px2vw(70);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: px2vw(35);
    background-color: rgba(245, 246, 248, 1);
    box-sizing: border-box;
    margin: 0 px2vw(40);
    input {
      width: 100%;
      height: px2vw(60);
      line-height: px2vw(70);
      margin-left: px2vw(20);
      outline: none;
      background-color: transparent;
    }
    .iconfont {
      line-height: px2vw(70);
    }
  }
}
.add {
  background-color: #fff;
  text-align: center;
  div {
    height: px2vw(110);
    line-height: px2vw(110);
    span {
      font-size: px2vw(34);
      font-weight: bold;
    }
    .icon {
      margin-right: px2vw(11);
    }
  }
}
</style>