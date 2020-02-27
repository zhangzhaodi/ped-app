<template>
  <div class="outer">
    <div class="header">
      <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    </div>
    <Scroller>
      <div class="img-box">
        <img :src="acceptImg" alt />
      </div>
    </Scroller>
    <div class="footer" @click="visible = true">重新上传</div>
    <Upload :visible.sync="visible" @hiddenPopop="hiddenPopop" @afterRead="afterRead"></Upload>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import Upload from "@/components/Popup/Upload.vue";

export default {
  components: {
    Myheader: Header,
    Scroller,
    Upload
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      visible: false,
      acceptImg: ""
    };
  },
  created() {
    this.acceptImg = this.$route.query.acceptImg;
  },
  mounted() {},
  computed: {},
  methods: {
    hiddenPopop() {
      this.visible = false;
    },
    afterRead(value) {
      this.visible = false;
      this.acceptImg = value;
      // console.log(this.acceptImg);
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    padding: px2vw(30);
    .img-box {
      padding: 0 px2vw(40);
      img {
        width: 100%;
      }
    }
  }
  .footer {
    height: px2vw(118);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: px2vw(34);
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(62, 143, 255, 1);
    background: #fff;
  }
}
</style>
