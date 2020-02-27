<template>
  <div>
    <van-popup class="popup-round" round v-model="show" position="bottom">
      <div class="header">
        <van-uploader
          capture="camera"
          v-model="fileList"
          :before-read="beforeRead"
          :after-read="afterRead"
          :preview-image="false"
        >
          <div class="cell cell--border-bottom">拍照</div>
        </van-uploader>
        <van-uploader :after-read="afterRead" :before-read="beforeRead">
          <div class="cell">从相册中上传</div>
        </van-uploader>
      </div>
      <div class="footer" @click="hiddenPopop">
        <div class="cell">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Uploader, Toast } from "vant";

export default {
  components: {
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast
  },
  props: {
    // 输入项名（用于报错提示）
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      fileList: [],
      show: this.visible
    };
  },
  mounted() {},
  watch: {
    //监听父组件变化，并赋值
    visible: {
      handler(val) {
        this.show = val;
      }
    },
    show: {
      handler(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  computed: {},
  methods: {
    beforeRead(file) {
      console.log(file, 1);
      console.log(file.type, 2);
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file.content);
      this.$emit("afterRead", file.content);
    },
    hiddenPopop() {
      this.$emit("hiddenPopop");
    }
  }
};
</script>
<style lang="scss" scoped>
.van-popup--round {
  border-radius: px2vw(20) px2vw(20) 0px 0px;
  background: rgba(245, 246, 248, 1);
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    .van-uploader {
      width: 100%;
      /deep/ .van-uploader__input-wrapper {
        width: 100%;
      }
    }
  }
  .footer {
    margin-top: px2vw(20);
    background: rgba(255, 255, 255, 1);
  }
  .cell {
    text-align: center;
    padding-top: px2vw(33);
    height: px2vw(67);
    font-size: px2vw(34);
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(38, 38, 38, 1);
  }
  .cell--border-bottom {
    border-bottom: 1px solid rgba(239, 240, 241, 1);
  }
}
</style>
