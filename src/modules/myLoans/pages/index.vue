<template>
  <div class="outer remittance">
    <Myheader
      :title="$route.meta.title"
      :params="headerParams"
      :isWhite="header.isWhite"
      :backgroundColor="header.color"
    >
      <i slot="left" class="iconfont">&#xe62f;</i>
    </Myheader>
    <Scroller>
      <van-swipe @change="onChange" :width="swipeWidth" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in adLists" :key="index">
          <img :src="require(`@/assets/myLoans/index/${item}.png`)" alt />
        </van-swipe-item>
      </van-swipe>
      <div class="content">
        <div class="ad-box">
          <div class="ad-left">
            <p>贷动未来</p>
            <p>
              <span>权威优选</span>
              <span>轻松分明</span>
            </p>
          </div>
          <div class="ad-right" @click="goloanLists">
            <p>更多</p>
            <i class="iconfont">&#xe649;</i>
          </div>
        </div>
        <div class="loans-box">
          <div @click="goLoans(3)" class="loan">
            <img src="@/assets/myLoans/index/img_zichanzhiya@3x.png" alt />
          </div>
          <div @click="goLoans(4)" class="loan">
            <img src="@/assets/myLoans/index/img_fangyidai@3x.png" alt />
          </div>
        </div>
        <div
          @click="goLoans(index + 1)"
          class="loans-list"
          v-for="(item, index) in loanLists"
          :key="index"
        >
          <div class="loans-left">
            <img :src="require(`@/assets/myLoans/index/${item.img}.png`)" alt />
          </div>
          <div class="right-box">
            <div class="loans-mid">
              <div class="loans-top">
                <p>{{ item.type }}</p>
              </div>
              <div class="loans-center">
                <div class="loans-limit">
                  <p>最高额度(元)</p>
                  <span>{{ item.limit | money }}</span>
                </div>
                <div class="loans-deadline">
                  <p>最长期限(月)</p>
                  <span>{{ item.deadline }}</span>
                </div>
              </div>
              <div class="loans-bottom">
                <span v-for="(arr, index) in item.advantage" :key="index">{{
                  arr
                }}</span>
              </div>
            </div>
            <div
              class="loans-right"
              @click="
                index == 1
                  ? (to = { name: 'quickIndex' })
                  : (to = { name: 'easyIndex' })
              "
            >
              <div class="apply">{{ item.applyFor }}</div>
            </div>
          </div>
        </div>
        <div class="online-serve">
          <p>在线理财经理</p>
          <span>在线24小时，为您竭诚服务</span>
        </div>
        <div class="ad-box">
          <div class="ad-left">
            <p>贷款服务</p>
            <p>
              <span>轻松查询</span>
              <span>畅想服务</span>
            </p>
          </div>
        </div>
        <div class="calculate-box">
          <div class="loan">
            <img src="@/assets/myLoans/index/img_fangwuguzhi@3x.png" alt />
          </div>
          <div class="loan">
            <img src="@/assets/myLoans/index/img_daikuanjisuan@3x.png" alt />
          </div>
        </div>
        <div class="hot-box" @click="goFAQ">
          <p>热门问题</p>
          <i class="iconfont">&#xe649;</i>
        </div>
        <div class="issue-box">
          <p>贷款现金来了可以循环贷款吗？</p>
          <p>哪些证件/资源可以提高个人贷款额度？</p>
          <p>外地人可以申请贷款吗？贷款的话需要亲临焦作中旅银…</p>
        </div>
      </div>
    </Scroller>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Footer from "../components/Footer";
import Scroller from "@/components/Scroller.vue";
import { Swipe, SwipeItem } from "vant";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";



export default {
  components: {
    Myheader: Header,
    Footer,
    Scroller,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      headerParams: {
        leftShow: false,
        rightShow: true
      },
      adLists: [
        "banner_daikuan@3x",
        "banner_daikuan@3x",
        "banner_daikuan@3x",
        "banner_daikuan@3x"
      ],
      activeNumber: "1",
      loanLists: [
        {
          img: "icon_paiedai@3x",
          type: "派e贷",
          limit: "500000",
          deadline: "24",
          applyFor: "立即提款",
          advantage: ["额度高", "放贷快", "利息低", "还款灵活"]
        },
        {
          img: "icon_yimiaodai@3x",
          type: "易秒贷",
          limit: "500000",
          deadline: "36",
          applyFor: "立即申请",
          advantage: ["利息低至7.2%", "即时到账", "还款灵活"]
        }
      ],
      header: {
        isWhite: false,
        color: "transparent"
      },
      //个人信息
      personData: {}
    };
  },
  created() {
    let clientWidth = document.body.clientWidth;
    this.swipeWidth = (360 / 375) * clientWidth;
    // // 查询卡列表;
    // window.NativeCall.getUserInfo(params => {
    //   let res = JSON.parse(params);
    //   this.updataLoginInfo(res);
    //   this.$Save.personData = res;
    // });
    // this.login();
    //获取个人信息


  },
  computed:{
    //获取个人信息
    ...mapState("common", ["userInfo"])
  },

  mounted() {
    //屏幕滚动时修改header的背景
    let content = document.getElementsByClassName("scrollerBox")[0];
    content.onscroll = () => {
      if (content.scrollTop > 0) {
        this.header = {
          color: "#fff"
        };
      } else {
        this.header = {
          color: "transparent"
        };
      }
    };
    this.uInfo();
  },
  methods: {
    ...mapActions("common", ["getUserInfo"]),
    //获取个人信息
    async uInfo(){
      await this.getUserInfo();//如果这个成功了
      this.$Save.personData = this.userInfo;
      console.log('~~~~~userInfo:',this.$Save.personData);
    },

    onChange(index) {
      this.activeNumber = index + 1;
    },
    //贷款卡列表
    goloanLists() {
      this.$router.push({ name: "loanLists" });
    },
    //更多问题
    goFAQ() {
      this.$router.push({ name: "FAQ" });
    },
    //单个贷款
    goLoans(value) {
      console.log(value);
      if (value == 1) {
        this.$router.push({ name: "quickIndex" });
      } else if (value == 2) {
        //进到易秒贷
        this.uInfo();
        //进不进申请流程在这里做下判断
        this.SecondloanInfoQry("01");
        //this.$router.push({ name: "easyIndex" });
      } else if (value == 3) {
        this.$router.push({ name: "assetIndex" });
      } else {
        this.$router.push({ name: "houseIndex" });
      }
    },
    //登录
    login() {
      this.request("login", {
        BankId: "9999",
        LoginId: "15238355538",
        Password: "qwer1234",
        EquipmentId: "125657",
        LoginType: "R",
        LoginMode: "1",
        BranchId: "01001",
        ChnlId: "62",
        AddrInfo: "zhengz"
      })
        .then(res => {
          console.log("~~~~~~~", res);
          this.personData = res;
          this.$Save.personData = this.personData;
          //this.updataLoginInfo(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    SecondloanInfoQry(type) {
      // this.$router.push({
      //   name: "idInfoConfirm"
      // });
      this.request("SecondloanInfoQry", {
        QryLoanType: "2", //1 客户标识2 审批状态3 申请信息4 额度查询5 已签订合同编号
        BusinessType: type //01易秒贷 02公积金贷 03游乐贷 04 线上贷款
      })
        .then(res => {
          console.log('~~~~~~~~~~res:',res);
          this.$Save._tokenName = res._tokenName;//tokenName
          //获取一个金额一个还款卡号
          this.$Save.transAmt = res.BusinessSum || '';
          this.$Save.cardNum = res.BackAccount || '';

          //身份证正反两面
          this.$Save.fId = res.IDFrontFlag || '';
          this.$Save.bId = res.IDEndFlag || '';

          //地址
          this.$Save.addr =   res.FamilyAdd || '';




          //this.updataTokenName(res._tokenName);
          //先判断NewStaus=D11，代表签约成功，显示贷款信息
          if (res.NewStatus && res.NewStatus == "D11") {
            this.$router.push({
              name: "easyRequest"
            });
          } else {
            //不是白名单客户
            if (res.Flag == 0) {
              console.log("非白名单用户");
              
            } else if (res.Flag == 2) {
              // staus=B01，代表审核通过，未签约，可进行签约
              if (res.Status == "B01") {
                this.$router.push({
                  name: "contractSign",
                  query: {
                    transAmt: res.BusinessSum
                  }
                });
              } else if (res.Status == "B02") {
                //staus=B02，正在审核页面
                this.$router.push({ name: "applyResult", status: "B02" });
              } else if (res.Status == "B05") {
                //staus=B05，审核被退回页面，显示退回原因，并可重新申请
                this.$router.push({ name: "applyResult", status: "B05" });
              }
            } else if (res.Flag == 3) {
              //审批拒绝页面，一个月内不能重复提交申请
              this.$router.push({ name: "applyResult", status: "3" });
            } else {
              //Flag == 1:没有审批信息页面，直接进入申请流程
              this.$router.push({ name: "easyIndex" });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  &.remittance {
    background: url("~@/assets/myLoans/index/bg_daikuan@3x.png") top center
      no-repeat;
    background-size: 100% px2vw(364);
    /deep/ .mint-header {
      background: none;
    }
    .scrollerBox {
      background: none;
      .van-swipe {
        height: px2vw(366);
        width: px2vw(690);
        padding: 0 px2vw(30);
        .van-swipe-item {
          margin-top: px2vw(20);
          img {
            width: px2vw(690);
          }
        }
        /deep/ .van-swipe__indicators {
          bottom: px2vw(14);
          .van-swipe__indicator {
            width: px2vw(8);
            height: px2vw(8);
            background: rgba(0, 0, 0, 1);
            opacity: 0.1;
            border-radius: 50%;
          }
          .van-swipe__indicator--active {
            width: px2vw(20);
            border-radius: px2vw(4);
            background: #f96159;
            opacity: 1;
          }
        }
      }
      .content {
        background: #fff;
        .ad-box {
          padding: px2vw(60) px2vw(40) px2vw(40);
          background: rgba(255, 255, 255, 1);
          display: flex;
          justify-content: space-between;
          .ad-left {
            width: px2vw(370);
            display: flex;
            justify-content: space-between;
            p {
              font-size: px2vw(40);
              font-family: PingFangSC-Medium, PingFangSC;
              font-weight: 500;
              color: rgba(38, 38, 38, 1);
            }
            p:last-child {
              width: px2vw(200);
              display: flex;
              justify-content: space-between;
              margin-top: px2vw(16);
              span {
                font-size: px2vw(24);
                font-family: PingFangSC;
                font-weight: 400;
                color: rgba(168, 168, 168, 1);
              }
            }
          }
          .ad-right {
            display: flex;
            justify-content: space-between;
            color: rgba(153, 156, 160, 1);
            line-height: px2vw(40);
            font-family: PingFangSC;
            font-weight: 400;
            p {
              font-size: px2vw(26);
              margin-right: px2vw(10);
            }
            i {
              font-size: px2vw(20);
            }
          }
        }
        .loans-box {
          padding: px2vw(20) px2vw(40);
          display: flex;
          justify-content: space-between;
          .loan {
            width: px2vw(325);
            img {
              width: 100%;
            }
          }
        }
        .loans-list {
          padding: px2vw(38) 0 px2vw(50);
          margin-left: px2vw(24);
          margin-right: px2vw(40);
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          display: flex;
          .loans-left {
            width: px2vw(80);
            img {
              width: 100%;
            }
          }
          .right-box {
            flex: 1;
            display: flex;
            justify-content: space-between;
            .loans-mid {
              display: flex;
              flex-direction: column;
              margin-top: px2vw(14);
              .loans-top {
                font-size: px2vw(36);
                font-family: PingFangSC;
                font-weight: 400;
                color: rgba(38, 38, 38, 1);
              }
              .loans-center {
                margin-top: px2vw(30);
                display: flex;
                font-family: PingFangSC;
                font-weight: 300;
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
              .loans-bottom {
                margin-top: px2vw(32);
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
            .loans-right {
              justify-content: flex-end;
              margin-top: px2vw(88);
              .apply {
                height: px2vw(56);
                width: px2vw(144);
                display: flex;
                flex-direction: column;
                justify-content: center;
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
              }
            }
          }
        }
        .loans-list:nth-child(4) {
          border-bottom: 0;
        }
        .online-serve {
          margin: px2vw(20) px2vw(40);
          padding: px2vw(34) px2vw(140);
          background: url("~@/assets/myLoans/index/img_zaixianjingli@2x.png")
            no-repeat;
          background-size: 100% px2vw(130);
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          p {
            font-size: px2vw(26);
            color: rgba(38, 38, 38, 1);
            margin-bottom: px2vw(14);
          }
          span {
            font-size: px2vw(24);
            color: rgba(168, 168, 168, 1);
          }
        }
        .calculate-box {
          padding: px2vw(10) px2vw(40) px2vw(40);
          display: flex;
          justify-content: space-between;
          .loan {
            width: px2vw(325);
            img {
              width: 100%;
            }
          }
        }
        .hot-box {
          padding: px2vw(66) px2vw(40) px2vw(40);
          display: flex;
          justify-content: space-between;
          font-family: PingFangSC;
          font-weight: 400;
          line-height: px2vw(34);
          p {
            font-size: px2vw(34);
            color: rgba(38, 38, 38, 1);
          }
          i {
            font-size: px2vw(20);
            color: rgba(153, 156, 160, 1);
          }
        }
        .issue-box {
          padding: 0 px2vw(60) px2vw(25) px2vw(40);
          p {
            font-size: px2vw(26);
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(125, 125, 125, 1);
            line-height: px2vw(26);
            margin-bottom: px2vw(22);
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            line-height: px2vw(32);
          }
        }
      }
    }
  }
}
</style>
