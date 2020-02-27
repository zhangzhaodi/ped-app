<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <Scroller>
      <div class="year">2019</div>
      <div class="loans-records">
        <div class="cell-box">
          <div
            @click="goBill"
            class="cell-out"
            v-for="(item, index) in loansList"
            :key="index"
          >
            <van-cell :border="false" :clickable="true">
              <template slot="default">
                <div class="cell-info">
                  <div class="info-top">¥10,000.00</div>
                  <div class="info-bottom">2019-08-16 09:30:00</div>
                </div>
                <div class="cell-info">
                  <div class="info-top">第9/12期</div>
                  <div class="info-bottom text-position">已结清</div>
                </div>
              </template>
            </van-cell>
          </div>
        </div>
      </div>
      <div class="year">2018</div>
      <div class="loans-records">
        <div class="cell-box">
          <div
            class="cell-out"
            @click="goBill"
            v-for="(item, index) in loansList"
            :key="index"
          >
            <van-cell :border="false" :clickable="true">
              <template slot="default">
                <div class="cell-info">
                  <div class="info-top">¥10,000.00</div>
                  <div class="info-bottom">2019-08-16 09:30:00</div>
                </div>
                <div class="cell-info">
                  <div class="info-top">第9/12期</div>
                  <div class="info-bottom text-position">已结清</div>
                </div>
              </template>
            </van-cell>
          </div>
        </div>
      </div>
    </Scroller>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Button, Cell } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    [Button.name]: Button,
    [Cell.name]: Cell
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      periods: "6",
      loansList: [{}, {}, {}]
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    //查看账单
    goBill() {
      this.$router.push({ name: "bill" });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    .year {
      width: px2vw(110);
      background: rgba(255, 255, 255, 1);
      border-radius: px2vw(25);
      font-size: px2vw(26);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(38, 38, 38, 1);
      line-height: px2vw(46);
      text-align: center;
      margin: px2vw(20) 0;
      margin-left: px2vw(40);
      padding-top: px2vw(4);
    }
    .loans-records {
      background: rgba(255, 255, 255, 1);
      .cell-box {
        padding: 0 px2vw(40);
        .cell-out {
          border-bottom: 1px solid #eff0f1;
          .van-cell {
            padding: px2vw(25) 0;
            padding-top: px2vw(16);
            .van-cell__value {
              display: flex;
              justify-content: space-between;
              .info-top {
                font-size: px2vw(30);
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(38, 38, 38, 1);
                // line-height: px2vw(30);
                margin-bottom: px2vw(7);
              }
              .info-bottom {
                font-size: px2vw(22);
                font-family: PingFangSC-Light, PingFang SC;
                font-weight: 300;
                color: rgba(125, 125, 125, 1);
                line-height: px2vw(22);
              }
              .text-position {
                text-align: right;
              }
            }
          }
        }
        .cell-out:last-child {
          border: 0;
        }
      }
    }
  }
}
</style>
