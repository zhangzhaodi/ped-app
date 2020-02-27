<template>
  <van-popup :overlay-style="{background:'#fff',opacity: 0}" v-show="visible" v-model="visible" :style="{  height: '100%',width: '100%' }" position="right">
    <div class="outer">
      <div class="custom-header">
        <span class="iconfont" @click="onClickLeft">&#xe630;</span>
        <span class="title">选择银行</span>
        <span></span>
      </div>
      <!-- <search :placeholder="`请输入银行名称`"></search> -->
      <search ref="search" :placeholder="`请输入银行名称`" @search="searchBankList" @clear="searchBankList"></search>
      <Scroller>
        <!-- <lazy-component v-if="bankList.length > 0"> -->
        <van-index-bar v-if="bankList.length > 0" :z-index="1" :index-list="indexAnchor" highlight-color="#262626">
          <div v-for="(item,index) in indexListData" :key="index">
            <van-index-anchor :index="item.anchor">{{item.anchor == "热" ? '热门银行' :item.anchor}}</van-index-anchor>
            <ul class="paddingLR40 index-group">
              <li class="payee-col" v-for="(child,index) in item.children" :key="index" :clickable="true" @click="handleSelect(child,tools.bankIconImg(child.bankId))">
                <div class="payee-icon">
                  <img :src="tools.bankIconImg(child.bankId)" alt />
                </div>
                <div class="payee-right">
                  <div>{{child.bankName}}</div>
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
            <p>{{loadingTxt}}</p>
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
    //银行卡列表包含中旅银行标志
    zl: {
      type: Boolean,
      default: false,
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
      loadingTxt: '加载中…',
      indexAnchor: [],
      indexListData: [],
      indexListData1: [],
      selectItem: {},
      abcList: [
        { anchor: "A", children: [] },
        { anchor: "B", children: [] },
        { anchor: "C", children: [] },
        { anchor: "D", children: [] },
        { anchor: "E", children: [] },
        { anchor: "F", children: [] },
        { anchor: "G", children: [] },
        { anchor: "H", children: [] },
        { anchor: "I", children: [] },
        { anchor: "J", children: [] },
        { anchor: "K", children: [] },
        { anchor: "L", children: [] },
        { anchor: "M", children: [] },
        { anchor: "N", children: [] },
        { anchor: "O", children: [] },
        { anchor: "P", children: [] },
        { anchor: "Q", children: [] },
        { anchor: "R", children: [] },
        { anchor: "S", children: [] },
        { anchor: "T", children: [] },
        { anchor: "U", children: [] },
        { anchor: "V", children: [] },
        { anchor: "W", children: [] },
        { anchor: "X", children: [] },
        { anchor: "Y", children: [] },
        { anchor: "Z", children: [] }
      ],
      textList: [],
    };
  },
  computed: {
    ...mapState('common', ['bankList']),
  },
  created() {
    // this.initData();
  },
  mounted() {
  },
  methods: {
    ...mapActions('common', ['getBankList']),
    async initData() {
      this.loadingTxt = '加载中…';
      await this.getBankList();
      this.data = [...this.bankList];
      await this.getIndexList();
    },
    searchBankList(data) {
      if (data) {
        let params = {
          //branchId: '2336',
          ChnlId: '62',
          BankName: data
        }
        this.request('QryBankList', params).then((res) => {
          if (res.BankList) {
            this.data = [...res.BankList];
          } else {
            this.data = [];
          }
          if (data) {
            if ("焦作中旅银行".indexOf(data) > -1) {//indexOf方法中如果xxx.indexOf("")返回值为0
              let item = {
                bankId: '313501080608',
                bankName: '焦作中旅银行',
                orderId: '0',
                ibpsBankList: [{ bankagent: "313501080608", bankaliasname: "焦作中旅银行" }],
                ibpsFlage: 'Y',
              }
              this.data.unshift(item);
            }
          }
          this.getIndexList(1);
        }).catch((error) => {
          console.log(error)
        })


      } else {
        if (this.bankList.length == 0) {
          this.initData();
        } else {
          this.data = [...this.bankList];
          this.getIndexList();
        }
      }


    },
    getIndexList(search = 0) {
      let data = [...this.data];
      // console.log(data,"数组");
      //第一轮生成带有26个字母的锚点列表
      // let arrList = [...this.abcList];
      let arrList = [];
      for (let i = 0; i < 26; i++) {
        let item = {
          anchor: String.fromCharCode((65 + i)),
          children: []
        }
        arrList.push(item);
      }
      //将对应字母数据插入到indexList里
      let remenList = [];
      data.map(item => {
        let bankName = item.bankName;
        let PinYin = Pinyin.parse(bankName)[0];
        let firstStr = PinYin.target.substring(0, 1).toUpperCase();
        for (let child of arrList) {
          //可以加入其他判断 比如 我的账户（使用id作对比）
          //字母索引插入ss
          if (child.anchor === firstStr) {
            child.children.push(item)
          }
        }
        if (item.orderId == 1) { //orderId 1:热门银行标记 2：没有银行logo标记
          remenList.push(item);
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

      //包含中旅银行
      if (this.zl && search == 0) {
        let item = {
          bankId: '313501080608',
          bankName: '焦作中旅银行',
          orderId: '1',
          ibpsBankList: [{ bankagent: "313501080608", bankaliasname: "焦作中旅银行" }],
          ibpsFlage: 'Y',
        }
        remenList.unshift(item)

      }
      if (search == 0) {//默认模式添加热门银行
        let remen = {
          anchor: '热',
          children: remenList
        }
        indexAnchor.unshift('热');
        indexList.unshift(remen);
      }

      this.indexListData = indexList;
      this.indexAnchor = indexAnchor;
      this.loadingTxt = '暂无数据';
      console.log("银行卡列表", indexList)
    },
    onClickLeft() {
      this.visible = false;
      this.$emit("close");
    },
    async handleSelect(item,img) {
      this.selectItem = {...item,imgUrl:img};
      this.visible = false;
      if (item.bankName != '焦作中旅银行') {
        await this.getIbpsList();
      }
      this.$emit("select", this.selectItem);
    },
    async getIbpsList() {
      if (!this.selectItem.bankagent) {
        let params = {
          Bank_Id: this.selectItem.bankId
        }
        try {
          let res = await this.request('IbpsBankQry', params)
          this.selectItem.ibpsBankList = res.BankList;
          if (this.selectItem.ibpsBankList.length > 0) {
            this.selectItem.ibpsBankList.map(item => {
              item.name = item.bankaliasname;
            })
          }
          this.selectItem.ibpsFlage = res.Flag;
        }
        catch (err) {
          this.$toast("获取清算行号失败")
          console.log(err)
          return
        }
      }else{
        this.selectItem.ibpsBankList = [this.selectItem];
      }



    }
  },
  watch: {
    //监听父组件变化，并赋值
    show: {
      handler(val) {
        this.visible = this.show;
      }
    },
    visible: {
      handler(val) {
        this.$emit('update:show', val)
        if (val) {
          // 搜索
          if (this.indexListData.length == 0) {
            this.initData();
          }
        } else {
          // console.log("关闭组件对数据进行重置")
          this.$refs.search.searchTxt = ''
          this.searchBankList();
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
        font-family: $font-family;
        font-weight: 400;
        color: #7d7d7d;
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
      height: px2vw(110);
      border-bottom: $border-bottom;
      align-items: center;
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