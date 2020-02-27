<template>
  <div class="headerBox">
    <myHeader :title="title">
      <myButton v-show="backShow"
                slot="left"
                class="backBtn"
                @click="goBack()">
        <img src="@/assets/Image/back.png">
      </myButton>
      <!-- <myButton v-show="customerShow"
                slot="right"
                class="customerBtn"
                @click="goCustomer()">
        <img src="@/assets/Image/custom.png">
      </myButton> -->
    </myHeader>
  </div>
</template>

  <script>
import { Header, Button } from 'mint-ui'
export default {
  components: {
    myButton: Button,
    myHeader: Header
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => {
        return {
          leftShow: true,
          rightShow: true
        }
      }
    },
    backRouter: {
      type: Object,
      default: () => {
        return {}
      }
    },
    backStep: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {}
  },
  computed: {
    backShow() {
      if (this.params.leftShow === undefined) {
        return true
      }
      return this.params.leftShow
    },
    customerShow() {
      if (this.params.rightShow === undefined) {
        return true
      }
      return this.params.rightShow
    }
  },
  created() {},
  methods: {
    goBack() {
      console.log('back/...')
      if (this.backRouter && this.backRouter.hasOwnProperty('name')) {
        this.$router.replace(this.backRouter)
      } else {
        this.$router.go(this.backStep)
      }
    },
    goCustomer() {
      this.$router.push({ name: 'Customer' })
      console.log('----点我进入问答页------')
    }
  }
}
</script>
  <style lang="scss" scoped>
.headerBox {
  /* position: absolute; */
  z-index: 50;
  width: 100%;
  top: 0;
}
.mint-header {
  padding: 0 px2vw(14);
  height: 44px;
  line-height: 44px;
  font-size: 18px !important;
  background: -moz-linear-gradient(left, #1577e4 0%, #2080eb 100%) !important;
  background: -webkit-linear-gradient(
    left,
    #1577e4 0%,
    #2080eb 100%
  ) !important;
  background: linear-gradient(to right, #1577e4 0%, #2080eb 100%) !important;
}
.backBtn {
  text-align: left;
  width: px2vw(35);
  height: 40px;
  float: left;
}
.backBtn img {
  width: 10px;
  height: 18px;
  margin-top: 5px;
}
.customerBtn {
  text-align: right;
  float: right;
  width: px2vw(35);
  height: 40px;
}
.customerBtn img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
</style>
