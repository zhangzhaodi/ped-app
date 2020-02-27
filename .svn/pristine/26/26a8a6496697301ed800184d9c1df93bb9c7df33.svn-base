<template>
  <van-popup class="popup-round" round v-model="show" position="bottom">
    <div class="select-box">
      <i @click="closePopup" class="iconfont">&#xe62b;</i>
      <p>请选择</p>
    </div>
    <div class="nav-box">
      <ul v-show="isSelected == 1">
        <li>
          <p>请选择</p>
          <div class="state-bottom"></div>
        </li>
        <li></li>
        <li></li>
      </ul>
      <ul v-show="isSelected == 2">
        <li @click="isSelected = 1">
          <p class="selected">{{province}}</p>
        </li>
        <li>
          <p>请选择</p>
          <div class="state-bottom"></div>
        </li>
        <li></li>
      </ul>
      <ul v-show="isSelected == 3">
        <li @click="isSelected = 1">
          <p class="selected">{{province}}</p>
        </li>
        <li @click="isSelected = 2">
          <p class="selected">{{city}}</p>
        </li>
        <li>
          <p>请选择</p>
          <div class="state-bottom"></div>
        </li>
      </ul>
    </div>
    <Scroller>
      <div class="address-list">
        <div
          class="list-out"
          :class="{addressActive:active}"
          v-for="(item,index) in provinces"
          :key="index"
        >
          <div
            class="list-box"
            @mousedown="clickDown"
            v-show="isSelected == 1"
            @click="changeSite(2,item.provinceName,item.provinceCode)"
          >
            <div class="list-left">{{item.provinceName}}</div>
            <div class="list-right">
              <i v-show="active" class="iconfont">&#xe620;</i>
            </div>
          </div>
        </div>
        <div
          class="list-out"
          :class="{addressActive:active}"
          v-for="(item,index) in citys"
          :key="index"
        >
          <div
            class="list-box"
            @mousedown="clickDown"
            v-show="isSelected == 2"
            @click="changeSite(3,item.cityName,item.cityCode)"
          >
            <div class="list-left">{{item.cityName}}</div>
            <div class="list-right">
              <i v-show="active" class="iconfont">&#xe620;</i>
            </div>
          </div>
        </div>
        <div
          class="list-out"
          :class="{addressActive:active}"
          v-for="(item,index) in countys"
          :key="index"
        >
          <div
            class="list-box"
            @mousedown="clickDown"
            v-show="isSelected == 3"
            @click="changeSite(0,item.areaName,item.areaCode)"
          >
            <div class="list-left">{{item.areaName}}</div>
            <div class="list-right">
              <i v-show="active" class="iconfont">&#xe620;</i>
            </div>
          </div>
        </div>
      </div>
    </Scroller>
  </van-popup>
</template>
<script>
import { Button, Popup } from "vant";
export default {
  components: {
    [Popup.name]: Popup
  },
  props: {
    index: {
      type: Number,
      default: -1
    },
    dataSlot: {
      type: Object,
      default: () => {
        return {};
      }
    },
    right: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick(evt) {
      console.log(evt);
      this.$emit("click", evt);
    },
    //打开省市列表
    selectPayee() {
      document.activeElement.blur();
      this.show = true;
      this.isSelected = 1;
      this.showList = 1;
      this.request(
        "QryProvince",
        {
          BranchId: "2336",
          ChnlId: "62"
        },
        true
      )
        .then(res => {
          console.log(res);
          this.provinces = res.ProvinceList;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //关闭popup
    closePopup() {
      console.log(1);
      this.show = false;
    },
    //省市县切换
    changeSite(value, data, Code) {
      if (value == 2) {
        // this.request("QryCity", {
        //   BranchId: "2336",
        //   ChnlId: "62",
        //   ProvinceCode: Code
        // })
        //   .then(res => {
        //     console.log(res);
        //     this.citys = res.CityList;
        //     this.province = data;
        //     this.isSelected = value;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        this.province = data;
        this.isSelected = value;
        this.showList = value;
      } else if (value == 3) {
        // this.request("QryArea", {
        //   BranchId: "2336",
        //   ChnlId: "62",
        //   CityCode: Code
        // })
        //   .then(res => {
        //     console.log(res);
        //     this.countys = res.AreaList;
        //     this.city = data;
        //     this.isSelected = value;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        this.city = data;
        this.isSelected = value;
        this.showList = value;
      } else if (value == 0) {
        this.county = data;
        this.show = false;
        this.address = this.province + this.city + this.county;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.van-popup--round {
  border-radius: px2vw(20) px2vw(20) 0px 0px;
  height: px2vw(990);
  display: flex;
  flex-direction: column;
  .select-box {
    font-family: PingFangSC-Regular, PingFangSC;
    display: flex;
    padding: 0 px2vw(40);
    i {
      font-size: px2vw(22);
      line-height: px2vw(100);
      margin-right: px2vw(265);
      color: #7d7d7d;
    }
    p {
      font-size: px2vw(34);
      font-weight: 400;
      color: rgba(38, 38, 38, 1);
      line-height: px2vw(100);
    }
  }
  .nav-box {
    background: rgba(255, 255, 255, 1);
    padding-top: px2vw(38);
    padding-bottom: px2vw(16);
    ul {
      display: flex;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33%;
        p {
          font-size: px2vw(30);
          font-family: PingFangSC-Medium, PingFangSC;
          font-weight: 500;
          color: rgba(38, 38, 38, 1);
          line-height: px2vw(30);
        }
        .selected {
          font-size: px2vw(28);
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(125, 125, 125, 1);
        }
        .state-bottom {
          width: px2vw(40);
          height: px2vw(4);
          background: none;
          border-radius: px2vw(2);
          margin-top: px2vw(12);
          background: rgba(38, 38, 38, 1);
        }
      }
    }
  }
  .scrollerBox {
    .address-list {
      .list-out {
        padding-left: px2vw(40);
        padding-right: px2vw(50);
        .list-box {
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          display: flex;
          justify-content: space-between;
          .list-left {
            font-size: px2vw(30);
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: px2vw(110);
            letter-spacing: 1px;
          }
          i {
            font-size: px2vw(30);
            line-height: px2vw(110);
            color: #3e8fff;
          }
        }
      }
      .addressActive {
        background: rgba(244, 245, 247, 1);
        opacity: 0.5;
      }
    }
  }
}
</style>
