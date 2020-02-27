<template>
  <div class="outer">
    <Myheader
      :title="$route.meta.title"
      :isWhite="header.isWhite"
      :backgroundColor="header.color"
      :params="params"
    ></Myheader>
    <div class="content">
      <div class="top">
        <p class="text1">最高可贷款额度(元)</p>
        <p class="money">{{ 500000 | Money }}</p>
        <p class="text2">借10,000元最低每天仅需还4元</p>
      </div>
      <div class="items">
        <div class="item">
          <img
            src="@/assets/myLoans/assetLoans/icon_xianshangshenqing@2x.png"
            alt
          />
          <p class="p1">线上申请</p>
          <p class="p2">操作简单 方便快捷</p>
        </div>
        <div class="item">
          <img src="@/assets/myLoans/assetLoans/icon_jishixiakuan@2x.png" alt />
          <p class="p1">即时下款</p>
          <p class="p2">闪电放款 无需等待</p>
        </div>
        <div class="item">
          <img src="@/assets/myLoans/assetLoans/icon_zonghepinggu@2x.png" alt />
          <p class="p1">综合评估</p>
          <p class="p2">持牌机构 综合估值</p>
        </div>
      </div>
      <div class="btn">
        <van-button @click="toConfirm">授信申请</van-button>
      </div>
      <p class="prodIntro">产品介绍</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { mapMutations } from "vuex";
import { Button } from "vant";
export default {
  components: {
    Myheader: Header,
    [Button.name]: Button
  },
  data() {
    return {
      params: {
        leftShow: false
      },
      header: {
        isWhite: true,
        color: "transparent"
      }
    };
  },
  created() {
    this.login();
  },
  methods: {
    ...mapMutations("myLoans", ["updataLoginInfo"]),
    toConfirm() {
      this.$router.push({ name: "assetQuery" });
    },
    login() {
      this.request("login", {
        BankId: "9999",
        LoginId: "15236161052",
        Password: "123456asd",
        EquipmentId: "125657",
        LoginType: "R",
        LoginMode: "1",
        BranchId: "01001",
        ChnlId: "62",
        AddrInfo: "zhengz"
      })
        .then(res => {
          console.log(res);
          this.updataLoginInfo(res);
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
  .content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .content::-webkit-scrollbar {
    display: none;
  }
  .headerBox {
    position: absolute;
  }
}
.content {
  .top {
    width: 100%;
    height: px2vw(698);
    background: url("~@/assets/myLoans/assetLoans/bg_zichanzhiya@2x.png")
      no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .text1 {
      font-size: px2vw(40);
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: px2vw(188);
      text-align: center;
    }
    .money {
      margin-top: px2vw(41);
      font-size: px2vw(100);
      text-align: center;
      font-family: PingFangSC-Semibold, PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
    .text2 {
      font-size: px2vw(26);
      text-align: center;
      margin-top: px2vw(50);
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .items {
    // width: px2vw(630);
    display: flex;
    flex-direction: row;
    padding: 0 px2vw(60);
    justify-content: space-between;
    margin-top: px2vw(70);
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: px2vw(76);
        height: px2vw(76);
      }
      .p1 {
        font-size: px2vw(26);
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(107, 132, 237, 1);
        margin-top: px2vw(20);
      }
      .p2 {
        font-size: px2vw(20);
        font-family: PingFangSC-Light, PingFangSC;
        font-weight: 300;
        color: rgba(125, 125, 125, 1);
        margin-top: px2vw(12);
      }
    }
  }
  .btn {
    padding: 0 px2vw(40);
    box-sizing: border-box;
    margin-top: px2vw(103);
    // margin-top: px2vw(65);
    .van-button {
      width: 100%;
      height: px2vw(90);
      border-radius: px2vw(45);
      background: linear-gradient(#7e9afc, #b8b2fa);
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
  .prodIntro {
    text-align: center;
    margin-top: px2vw(142);
    font-size: px2vw(20);
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(0, 139, 255, 1);
  }
}
</style>
