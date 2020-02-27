<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams">
      <i slot="left" class="iconfont">&#xe62f;</i>
    </Myheader>
    <Scroller>
      <div class="loans-list" v-for="(item,index) in loanLists" :key="index">
        <div class="loans-top">
          <img :src="require(`@/assets/myLoans/loanLists/${item.img}.png`)" alt />
          <p>{{item.type}}</p>
        </div>
        <div class="loans-mid">
          <div class="left-box">
            <div class="loans-limit">
              <p>最高额度(元)</p>
              <span>{{item.limit | Money}}</span>
            </div>
            <div class="loans-deadline">
              <p>最长期限(月)</p>
              <span>{{item.deadline}}</span>
            </div>
          </div>
          <div class="apply">{{item.applyFor}}</div>
        </div>
        <div class="loans-bottom">
          <span v-for="(arr,index) in item.advantage" :key="index">{{arr}}</span>
        </div>
      </div>
    </Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";

export default {
  components: {
    Myheader: Header,
    Scroller
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      loanLists: [
        {
          img: "icon_paiedai@2x",
          type: "派e贷",
          limit: "500000",
          deadline: "24",
          applyFor: "立即提款",
          advantage: ["额度高", "放贷快", "利息低", "还款灵活"]
        },
        {
          img: "icon_yimiaodai@2x",
          type: "易秒贷",
          limit: "500000",
          deadline: "36",
          applyFor: "立即申请",
          advantage: ["利息低至7.2%", "即时到账", "还款灵活"]
        },
        {
          img: "icon_fangyidai@2x",
          type: "房易贷",
          limit: "500000",
          deadline: "24",
          applyFor: "立即提款",
          advantage: ["额度高", "放贷快", "利息低", "还款灵活"]
        },
        {
          img: "icon_zichanzhiya@2x",
          type: "资产质押贷",
          limit: "500000",
          deadline: "36",
          applyFor: "立即申请",
          advantage: ["利息低至7.2%", "即时到账", "还款灵活"]
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: #f5f6f8;
    .loans-list {
      background: #ffffff;
      padding: px2vw(28) px2vw(40) px2vw(40) 0;
      margin: px2vw(30);
      border-radius: px2vw(16);
      display: flex;
      flex-direction: column;
      .loans-top {
        display: flex;
        img {
          width: px2vw(96);
          height: px2vw(76);
        }
        p {
          padding-top: px2vw(16);
          font-size: px2vw(36);
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(38, 38, 38, 1);
        }
      }
      .loans-mid {
        padding-left: px2vw(40);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-box {
          display: flex;
          .loans-limit {
            margin-right: px2vw(90);
          }
          p {
            font-size: px2vw(24);
            color: rgba(125, 125, 125, 1);
            margin-bottom: px2vw(12);
          }
          span {
            font-size: px2vw(36);
            font-weight: 500;
            color: rgba(38, 38, 38, 1);
          }
        }
        .apply {
          height: px2vw(39);
          width: px2vw(144);
          padding-top: px2vw(17);
          text-align: center;
          background: linear-gradient(
            90deg,
            rgba(255, 123, 123, 1) 0%,
            rgba(255, 100, 100, 1) 100%
          );
          border-radius: px2vw(28);
          font-size: px2vw(22);
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: px2vw(26);
        }
      }
      .loans-bottom {
        margin-top: px2vw(32);
        padding-left: px2vw(40);
        display: flex;
        span {
          height: px2vw(24);
          padding: px2vw(4) px2vw(8) 0;
          margin-right: px2vw(20);
          font-size: px2vw(20);
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(227, 158, 92, 1);
          background: linear-gradient(
            212deg,
            rgba(255, 251, 246, 1) 0%,
            rgba(255, 244, 233, 1) 100%
          );
          border-radius: px2vw(4);
        }
      }
    }
  }
}
</style>
