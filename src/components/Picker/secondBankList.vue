<template>
  <van-popup :overlay-style="{background:'#fff',opacity: 0}" v-show="visible" v-if="refresh" v-model="visible" :style="{  height: '100%',width: '100%' }" position="right">
    <div class="outer">
      <div class="custom-header">
        <span class="iconfont" @click="onClickLeft">&#xe630;</span>
        <span class="title">选择汇入地</span>
        <span></span>
      </div>
      <!-- <search :placeholder="`请输入银行名称`"></search> -->
      <!-- <search ref="search" :placeholder="`请输入银行名称`" @search="searchBankList" @clear="searchBankList"></search> -->

      <Scroller ref="scroller">
        <!-- <lazy-component v-if="bankList.length > 0"> -->
        <van-index-bar v-if="data.length > 0" :z-index="1" :index-list="indexAnchor" highlight-color="#0085ff">
          <div v-for="(item,index) in indexListData" :key="index">
            <van-index-anchor :index="item.anchor">{{item.anchor}}</van-index-anchor>
            <ul class="paddingLR40 index-group">
              <li class='payee-col' v-for="(child,index) in item.children" :key="index" :clickable="true" @click="handleSelect(child)">
                <!-- <div class="payee-icon">
                      <img v-lazy="tools.bankIconImg(child.bankagent)" alt />
                    </div> -->
                <div class="payee-right">
                  <div>{{child.bankaliasname}}</div>
                </div>
              </li>
            </ul>
          </div>
        </van-index-bar>
        <!-- </lazy-component> -->
        <!-- <div>
          {{textList}}
        </div> -->
        <div v-else class="empty">
          <div class="img-box">
            <p>暂无数据</p>
          </div>
        </div>
      </Scroller>

    </div>
  </van-popup>
</template>
<script>
import { IndexBar, IndexAnchor, Popup, Toast } from "vant";
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import Search from "@/components/Search";
import { mapActions, mapState, mapMutations } from "vuex";
var Pinyin = require("@/tools/pinyin.js").Pinyin;

export default {
  components: {
    Search,
    Myheader: Header,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    Scroller
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    bankList: {
      type: Array,
      default: []
    },
    bankId: {//增加标识，用于辨识 城商行村镇行不支持超网的银行选择
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: false
      },
      visible: false,
      data: [],
      indexAnchor: [],
      indexListData: [],
      selectItem: {},
      textList: [],
      refresh: false,
    };
  },
  computed: {
  },
  created() {

  },
  mounted() {
  },
  methods: {
    async initData() {
      this.data = [...this.bankList];
      await this.getIndexList();
    },
    getIndexList(search = 0) {
      let data = [...this.data];
      // console.log(data,"数组");
      //第一轮生成带有26个字母的锚点列表
      let arrList = [];
      for (let i = 0; i < 26; i++) {
        let item = {
          anchor: String.fromCharCode((65 + i)),
          children: []
        }
        arrList.push(item);
      }
      //将对应字母数据插入到indexList里
      data.map(item => {
        let bankName = item.bankaliasname;
        let PinYin = Pinyin.parse(bankName)[0];
        let firstStr = PinYin.target.substring(0, 1).toUpperCase();
        for (let child of arrList) {
          //可以加入其他判断 比如 我的账户（使用id作对比）
          //字母索引插入ss
          if (child.anchor === firstStr) {
            child.children.push(item)
          }
        }
      })

      // 第三轮遍历arrList过滤掉无内容素的item,避免空占位
      let indexList = [], indexAnchor = [];
      for (let item of arrList) {
        if (item.children.length > 0) {
          indexList.push(item);
          indexAnchor.push(item.anchor)
        }
      }
      this.indexListData = indexList;
      this.indexAnchor = indexAnchor;
      if (!this.bankId) return
      if (this.bankId == '313') {//前端加入其他行选择
        let item = {
          anchor: "#",
          children: [{
            bankId: this.bankId,
            bankagent: "",
            bankaliasname: "其它城商银行",
            bankname: "其它城商银行",
            ibpsFlage: "N",
          }]
        }
        indexList.unshift(item)
        indexAnchor.unshift("#")
      } else if (this.bankId == '320') {
        let item = {
          anchor: "#",
          children: [{
            bankId: this.bankId,
            bankagent: "",
            bankaliasname: "其它村镇银行",
            bankname: "其它村镇银行",
            ibpsFlage: "N",
          }]
        }
        indexList.unshift(item)
        indexAnchor.unshift("#")

      }
      this.indexListData = indexList;
      this.indexAnchor = indexAnchor;
      console.log("汇入地银行", indexList)
    },
    onClickLeft() {
      this.visible = false;
      this.$emit("close");
    },
    async handleSelect(item) {
      this.selectItem = item;
      this.visible = false;
      this.$emit("select", this.selectItem);
    },
  },
  watch: {
    //监听父组件变化，并赋值
    show: {
      handler(val) {
        this.visible = this.show;
      }
    },
    bankList: {
      handler(val) {
        this.refresh = false;
      },
      deep: true
    },
    visible: {
      handler(val) {
        this.$emit('update:show', val)
        if (val) {
          // 搜索
          if (this.data.length == 0) {
            this.initData();
          }
          if (this.refresh == false) {
            this.refresh = true;
            this.initData();
          }
        } else {
          // console.log("关闭组件对数据进行重置")
          //   this.$refs.search.searchTxt = ''
          //   this.searchBankList();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .outer {
  .empty {
    height: 100%;
    .img-box {
      width: px2vw(300);
      margin: px2vw(86) auto 0;
      img {
        width: 100%;
      }
      p {
        font-size: px2vw(28);
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(168, 168, 168, 1);
        line-height: px2vw(40);
        text-align: center;
        margin-top: px2vw(26);
      }
    }
  }
  .van-nav-bar {
    z-index: 5 !important;
    &.van-hairline--bottom::after {
      border-bottom-width: 0;
    }
  }
  .van-index-bar__sidebar {
    margin-right: px2vw(16);
  }
  .van-nav-bar .van-icon {
    color: #333;
  }
  .van-index-bar__index--active {
    color: #333 !important;
  }
  .van-index-bar__index {
    color: #0085ff;
    line-height: px2vw(36);
  }
  .scrollerBox {
    .van-index-anchor {
      background: #f5f6f8;
      height: px2vw(61);
      padding: 0 px2vw(40);
      line-height: px2vw(61);
      font-size: px2vw(24);
      top: -2px;
      color: $color-text;
      font-weight: 500;
    }
    .index-group {
      .payee-col:last-child {
        border: none;
      }
    }
    .payee-col {
      display: flex;
      align-items: center;
      height: px2vw(110);
      border-bottom: $border-bottom;
      .payee-icon {
        width: px2vw(52);
        max-height: px2vw(52);
        margin-right: px2vw(20);
        img {
          width: 100%;
        }
      }
      .payee-right {
        color: #262626;
        font-weight: 400;
        font-size: px2vw(30);
        font-family: PingFangSC;
        letter-spacing: px2vw(1);
        .info {
          color: #7d7d7d;
          font-size: px2vw(24);
        }
        //徽标
        .dot {
          display: inline-block;
          margin-left: px2vw(8);
          text-align: center;
          line-height: px2vw(30);
          border-radius: 50%;
          width: px2vw(30);
          height: px2vw(30);
          font-size: px2vw(20);
          font-family: $font-size;
          font-weight: 400;
          color: #fff;
          background: linear-gradient(
            204deg,
            rgb(61, 37, 36) 0%,
            rgba(248, 123, 62, 1) 100%
          );
        }
      }
    }
  }
}
</style>