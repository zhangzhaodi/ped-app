<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <search
      @search="search"
      @input="input"
      @focus="focus"
      placeholder="请输入问题关键词"
    ></search>
    <Scroller>
      <van-tree-select
        height="100%"
        :items="items"
        :main-active-index.sync="activeIndex"
        @click-nav="clickNav"
      >
        <div slot="content">
          <ul>
            <li v-for="(item, index) in loansIssue" :key="index">
              <p>{{ item }}</p>
              <i class="iconfont">&#xe649;</i>
            </li>
          </ul>
          <ul v-if="activeIndex === 1">
            <li v-for="(item, index) in refundIssue" :key="index">
              <p>{{ item }}</p>
              <i class="iconfont">&#xe649;</i>
            </li>
          </ul>
          <ul v-if="activeIndex === 2">
            <li v-for="(item, index) in restIssue" :key="index">
              <p>{{ item }}</p>
              <i class="iconfont">&#xe649;</i>
            </li>
          </ul>
        </div>
      </van-tree-select>
    </Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import Search from "@/components/Search";
import { TreeSelect } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    Search,
    [TreeSelect.name]: TreeSelect
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      keyWord: [],
      activeIndex: 0,
      items: [{ text: "贷款问题" }, { text: "还款问题" }, { text: "其他问题" }],
      loansIssue: [
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？"
      ],
      refundIssue: [
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？"
      ],
      restIssue: [
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？"
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    search(data) {
      console.log(data);
    },
    input(data) {
      console.log(data);
      this.keyWord = data;
    },
    clickNav(index) {
      console.log(index);
      this.activeIndex = index;
    },
    //搜索页面
    focus() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: #f5f6f8;
    height: 100%;
    /deep/ .van-tree-select {
      height: 100%;
      .van-tree-select__nav {
        background: #f5f6f8;
        flex: 4;
        height: auto;
        .van-tree-select__nav-item {
          font-size: px2vw(30);
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
          // border: px2vw(6) solid #f5f6f8;
          // padding-left: px2vw(34);
          text-align: center;
          padding-right: 0;
          height: px2vw(100);
          line-height: px2vw(100);
        }
        .van-sidebar-item {
          background: #f5f6f8;
        }
        .van-sidebar-item--select {
          // border: px2vw(6) solid #fff;
          color: #3e8fff;
          background: #fff;
        }
      }
      .van-tree-select__content {
        flex: 11;
        li {
          display: flex;
          justify-content: space-between;
          margin: 0 px2vw(30);
          font-size: px2vw(30);
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
          line-height: px2vw(100);
          border-bottom: 1px solid #ebeef0;
          i {
            font-size: px2vw(10);
            color: #999ca0;
            line-height: px2vw(100);
          }
        }
      }
    }
  }
}
</style>
