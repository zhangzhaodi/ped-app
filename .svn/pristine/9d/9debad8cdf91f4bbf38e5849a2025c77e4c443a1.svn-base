<template>
  <div class="footer">
    <ul>
      <li @click="goIndex()">
        <img
          v-if="isShow"
          src="@/assets/myLoans/index/icon_tabbar_daikuan@3x.png"
          alt
        />
        <img
          v-else
          src="@/assets/myLoans/myLoans/icon_tabbar_daikuan_hui@2x.png"
          alt
        />
        <p :class="{ changeP: isShow }">贷款</p>
      </li>
      <li @click="goMyLoans()">
        <img
          v-if="isShow"
          src="@/assets/myLoans/index/icon_tabbar_wode@3x.png"
          alt
        />
        <img
          v-else
          src="@/assets/myLoans/myLoans/icon_tabbar_wodedaikuan@2x.png"
          alt
        />
        <span :class="{ changeSpan: isShow }">我的贷款</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    goIndex() {
      // this.$router.push({ name: "index" });
      this.$router.go(-1);
    },
    goMyLoans() {
      this.$router.push({ name: "myLoans" });
    }
  }
};
</script>
<style lang="scss" scoped>
.footer {
  z-index: 100;
  height: px2vw(98);
  background: #ffffff;
  ul {
    height: 100%;
    display: flex;
    justify-content: space-between;
    font-size: px2vw(20);
    font-family: PingFangSC;
    font-weight: 400;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: px2vw(54);
        margin-bottom: px2vw(5);
      }
      p {
        color: rgba(98, 100, 106, 1);
      }
      .changeP {
        color: rgba(255, 109, 109, 1);
      }
      span {
        color: rgba(255, 109, 109, 1);
      }
      .changeSpan {
        color: rgba(98, 100, 106, 1);
      }
    }
  }
}
</style>
