<template>
  <div class="outer">
    <Myheader
      :title="$route.meta.title"
      :isWhite="header.isWhite"
      :backgroundColor="header.color"
    ></Myheader>
    <div class="content">
      <div class="top">
        <p class="title">最高可贷款额度(元)</p>
        <p class="money">{{ 300000 | Money }}</p>
        <p class="tip">借10,000元最低每日仅需还2元</p>
      </div>
      <div class="product-detail"></div>
    </div>
    <div class="btn">
      <van-button @click="toApply">立即申请</van-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { Button } from "vant";
import { mapMutations } from "vuex";

export default {
  components: {
    Myheader: Header,
    [Button.name]: Button
  },
  data() {
    return {
      header: {
        isWhite: true,
        color: "transparent"
      },
      _tokenName: ""
    };
  },
  mounted() {
    //屏幕滚动时修改header的背景
    let content = document.getElementsByClassName("content")[0];
    let _this = this;
    content.onscroll = function() {
      if (content.scrollTop > 0) {
        _this.header = {
          isWhite: false,
          color: "#fff"
        };
      } else {
        _this.header = {
          isWhite: true,
          color: "transparent"
        };
      }
    };
  },
  methods: {
    //...mapMutations("myLoans", ["updataTokenName"]),
    toApply() {
      //去申请
      // this.$router.push({ name: "easyRequest" });
      //this.SecondloanInfoQry();
       this.$router.push({name: "idInfoConfirm"});
       
    },
    SecondloanInfoQry() {
      // this.$router.push({
      //   name: "idInfoConfirm"
      // });
      this.request("SecondloanInfoQry", {
        QryLoanType: "2", //1 客户标识2 审批状态3 申请信息4 额度查询5 已签订合同编号
        BusinessType: "01" //01易秒贷 02公积金贷 03游乐贷 04 线上贷款
      })
        .then(res => {
          console.log(res);
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
              this.$router.push({
                name: "idInfoConfirm"
              });
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
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .headerBox {
    position: absolute;
  }
  .content {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .content::-webkit-scrollbar {
    display: none;
  }
}
.top {
  width: 100%;
  height: px2vw(740);
  background: url("~@/assets/myloans/easySecLoans/bg_head_yimiaodai@2x.png")
    no-repeat;
  background-size: 100% 100%;
  text-align: center;
  overflow: hidden;
  .title {
    font-size: px2vw(24);
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(125, 125, 125, 1);
    line-height: px2vw(33);
    margin-top: px2vw(248);
  }
  .money {
    font-size: px2vw(80);
    font-weight: 500;
    color: rgba(38, 38, 38, 1);
    margin-top: px2vw(25);
  }
  .tip {
    font-size: px2vw(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-top: px2vw(125);
  }
}
.product-detail {
  width: 100%;
  height: px2vw(1588);
  background: url("~@/assets/myloans/easySecLoans/bg_chanpinxiangqing@2x.png")
    no-repeat;
  background-size: 100% 100%;
}
.btn {
  height: px2vw(130);
  padding: px2vw(20) px2vw(40);
  box-sizing: border-box;
  background: url("~@/assets/myloans/easySecLoans/btn_miaoyidai_lijishenqing@2x.png")
    no-repeat;
  background-size: 100% 100%;
  // margin-top: px2vw(65);
  .van-button {
    width: 100%;
    height: px2vw(90);
    border-radius: px2vw(45);
    background: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    .van-button__text {
      font-size: px2vw(34);
      font-weight: 400;
      color: #fff;
      flex: 1;
      text-align: center;
    }
  }
}
</style>
