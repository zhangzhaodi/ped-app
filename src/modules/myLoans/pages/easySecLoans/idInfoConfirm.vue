<template>
  <div class="outer">
    <Myheader :title="$route.meta.title"></Myheader>
    <Scroller>
      <div @click="ScanOcrIDCard('100')" class="front-box">
        <div v-if="imageFace.IDImage" class="img-box">
          <img :src="'data:image/png;base64,' + imageFace.IDImage" alt />
        </div>
        <div v-else class="upload-box">
          <img
            src="@/assets/bankIcon/icon_shenfenzhengdianjishangchuan.png"
            alt
          />
          <p>点击上传身份证人像面</p>
        </div>
      </div>
      <div @click="ScanOcrIDCard('200')" class="reverse-box">
        <div v-if="imageRse.IDImage" class="img-box">
          <img :src="'data:image/png;base64,' + imageRse.IDImage" alt />
        </div>
        <div v-else class="upload-box">
          <img
            src="@/assets/bankIcon/icon_shenfenzhengdianjishangchuan.png"
            alt
          />
          <p>点击上传身份证国徽面</p>
        </div>
      </div>
      <div class="footer-box">
        <div class="btn-box">
          <van-button  @click="next">确定</van-button>
        </div>
      </div>
      <MyDialog
        :showCancel="showCancel"
        @cancel="cancel"
        title="提示"
        :show="alertShow"
        :isClose="false"
        @con="alertShow = false"
      >
        <p slot="content" class="dialog-content">{{ dialogText }}</p>
      </MyDialog>
    </Scroller>
    <!-- 参数部分 -->
    <!-- {{my_params}} -->

  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import vInput from "@/components/Input/v-input/";
import Dialog from "@/components/Dialog/Dialog.vue";
import { Button, Toast } from "vant";
import { mapMutations } from "vuex";

export default {
  components: {
    Myheader: Header,
    MyDialog: Dialog,
    Scroller,
    // Pagetitle,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      //是否禁用
      forbidden: false,
      imageFace: {}, //身份证正面信息
      imageRse: {}, //身份证背面信息
      imgFace: false,
      imgRev: false,
      frontId: "", //身份证正面id
      backId: "", //身份证背面id
      //是否显示
      alertShow: false,
      //是否显示取消
      showCancel: false,
      dialogText: "身份证信息不匹配，请确认后重新验证",
      idCard: "",
      password: "",
      my_params:{}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // ...mapMutations("myLoans", ["updataIFdInfo"]),
    ScanOcrIDCard(data) {
      // 100是人脸 200是国徽
      // "IDImage" :  "imagebase64字符串" IDImage是原生返回图片
      window.NativeCall.ScanOcrIDCardLoans(data, params => {
        let res = JSON.parse(params);
        this.my_params = res;
        if (data == "100") {
          this.imageFace = res;
          this.$Save.fId = res.Id;//前边的id
          this.imgFace = true;
          this.$Save.addr = res.Address;
          //this.ImageSystemUpload("1", res.IDImage);
        } else {
          this.imageRse = res;
          this.imgRev = true;
          this.$Save.bId = res.Id;//背部id
          //this.ImageSystemUpload("2", res.IDImage);
        }
        //this.verifyCheck();
      });
    },
    //判断是否可以点击下一步按钮
    verifyCheck() {
      if (this.imgFace && this.imgRev) {
        this.forbidden = false;
      } else {
        this.forbidden = true;
      }
    },
    next() {

      this.$router.push({
        name: "quotaApply"
      });
      //身份证验证
      //this.PersonBaseInfoUpdate();

    },
    //身份证验证
    PersonBaseInfoUpdate() {
      //验证判断
      
      if(this.$Save.fId && this.$Save.bId){
        let params = {
          BankId: "9999",
          BranchId: "1699",
          ChnlId: "39",
          FuncTyp: "修改",
          OperateTyp: "6",
          UserCountryCd: "6",
          UserIdenName: this.imageFace.Name, //姓名
          UserIdenSex: this.imageFace.Sex, //性别
          UserIdenNation: this.imageFace.Folk, //民族
          UserIdenBirthday: this.imageFace.Birthday, // 生日
          UserIdenHomeAddress: this.imageFace.Address, //住址
          UserIdenNum: this.imageFace.Cardno, //身份证号码
          UserIdenIssuingUnit: this.imageRse.Authority, //签发单位
          UserIdenValidity: this.imageRse.Validdate2, //签发日期
          IssueDate: this.imageRse.Validdate1 //有效期
        };
        this.my_params = params;
        this.request("PersonBaseInfoUpdate", params)
          .then(res => {
            console.log(res);
            this.updataIFdInfo({
              frontId: this.frontId,
              backId: this.backId
            });
            this.$router.push({
              name: "quotaApply"
            });
          })
          .catch(error => {
            console.log(error);
          });

      }

    },
    //上传影像平台
    ImageSystemUpload(value, img) {
      this.request("ImageSystemUpload", {
        Img: img, //	图片
        Flag: value, //	图片标识 正面1 背面2
        Format: ".jpg", //	图片后缀名
        BusinessType: "01" //	业务类型01易秒贷 02公积金贷 03游乐贷 04 线上贷款
      })
        .then(res => {
          console.log(res);
          if (value == 1) {
            this.frontId = res.id;
          } else {
            this.backId = res.id;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //隐藏dialog
    cancel() {
      this.alertShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.front-box {
  margin-top: px2vw(60);
  padding: 0 px2vw(40);
  background: url("~@/assets/bankIcon/img_shenfenzhengrenxiangmian.png")
    no-repeat;
  background-size: px2vw(670) px2vw(360);
  background-position: px2vw(40) 0;
  height: px2vw(360);
}
.reverse-box {
  padding: 0 px2vw(40);
  background: url("~@/assets/bankIcon/img_shenfenzhengguohiumian.png") no-repeat;
  background-size: px2vw(670) px2vw(360);
  background-position: px2vw(40) 0;
  height: px2vw(360);
  margin-top: px2vw(20);
}
.upload-box {
  padding-top: px2vw(105);
  margin-left: px2vw(167);
  .img {
    height: 100%;
    width: 100%;
  }
}
.upload-box img {
  width: px2vw(90);
  margin-left: px2vw(104);
}
.upload-box p {
  margin-top: px2vw(19);
  font-size: px2vw(30);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(38, 38, 38, 1);
  line-height: px2vw(30);
}
.img-box {
  width: 100%;
  img {
    width: 100%;
    height: px2vw(360);
  }
}
.footer-box {
  margin-top: px2vw(100);
  display: flex;
  justify-content: center;
  .btn-box {
    width: px2vw(670);
  }
}
</style>
