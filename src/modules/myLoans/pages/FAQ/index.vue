<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <Scroller>
      <search
        @focus="focus"
        @search="search"
        @input="input"
        :disabled="true"
        placeholder="请输入问题关键词"
      ></search>
      <div class="hot">
        <div class="hot-left">热点问题</div>
        <div class="hot-right" @click="goHotIssue">
          <p>查看全部</p>
          <i class="iconfont">&#xe649;</i>
        </div>
      </div>
      <div
        @click="goIssueDetail"
        class="faq-list"
        v-for="(item, index) in faqLists"
        :key="index"
      >
        <div class="faq">
          <p>
            <span
              :class="{ highColor: keyWord.includes(str) }"
              v-for="(str, index) in item.split('')"
              :key="index"
              >{{ str }}</span
            >
          </p>
          <i class="iconfont">&#xe649;</i>
        </div>
      </div>
      <div @click="goHotIssue" class="check-box">
        查看全部
        <i class="iconfont">&#xe649;</i>
      </div>
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
      faqLists: [
        "怎么样才能符合贷款要求？",
        "什么是易秒贷？",
        "什么是房易贷？",
        "签约的贷款在哪查看？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "怎么样才能符合贷款要求？",
        "为什么会被拒签？"
      ],
      keyWord: []
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
    //热门问题
    goHotIssue() {
      this.$router.push({ name: "hotIssue" });
    },
    //问题详情
    goIssueDetail() {
      this.$router.push({ name: "issueDetail" });
    },
    //搜索页面
    focus() {
      console.log(111);
      this.$router.push({ name: "search" });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: #f5f6f8;
    .hot {
      padding: px2vw(30) px2vw(40) px2vw(20);
      display: flex;
      justify-content: space-between;
      .hot-left {
        font-size: px2vw(28);
        height: px2vw(28);
        color: #7d7d7d;
      }
      .hot-right {
        display: flex;
        justify-content: space-between;
        font-family: PingFangSC;
        font-weight: 400;
        color: #999ca0;
        line-height: px2vw(28);
        p {
          font-size: px2vw(22);
          margin-right: px2vw(8);
        }
        i {
          font-size: px2vw(22);
        }
      }
    }
    .faq-list {
      background: #ffffff;
      .faq {
        padding: px2vw(40) 0;
        margin: 0 px2vw(40);
        border-bottom: 1px solid #ebeef0;
        display: flex;
        justify-content: space-between;
        line-height: px2vw(31);
        p {
          font-size: px2vw(30);
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
          .highColor {
            color: blue;
          }
        }
        i {
          font-size: px2vw(20);
          color: rgba(153, 156, 160, 1);
        }
      }
    }
    .check-box {
      padding: px2vw(30) 0 px2vw(35);
      display: flex;
      justify-content: center;
      font-size: px2vw(22);
      color: #008bff;
      line-height: px2vw(22);
      i {
        font-size: px2vw(22);
        margin-left: px2vw(8);
      }
    }
  }
}
</style>
