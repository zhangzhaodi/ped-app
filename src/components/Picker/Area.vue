<template>
  <div>
    <van-popup class="popup-round" round v-model="show" position="bottom">
      <!-- <van-area :area-list="areaList" :item-height="37" :title="title" :columns-num="columnsNum" :value="value" @confirm="handleConfirm" @cancel="handleCancel"/> -->
      <van-picker ref="picker" :title="title" :item-height="37" :columns="columns" @change="onChange" :show-toolbar="true" :loading="loading" @confirm="handleConfirm" @cancel="handleCancel" />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker } from "vant";
import Scroller from "@/components/Scroller.vue";
import { mapGetters, mapActions, mapState } from "vuex";
// import AreaList from './areaList.js';
//圆角popup 底部选择组件  适用于转账模块相关选择popup组件
export default {
  name: "popupround",
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    Scroller,
    // AreaList
  },
  props: {
    // 输入项名（用于报错提示）
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    columnsNum: {
      type: [String, Number],
      default: 3
    },
    params: {
      type: Object,
      default: () => {
        return {
          provinceCode: "41", //省市码 河南
          cityCode: "5010", //市码 焦作
        };
      }
    }
  },
  data() {
    return {
      show: this.visible,

      //branchId: '2336',
      chnlId: '62',
      columns: [{
        values: [],
        className: "column1",
      }, {
        values: [],
        className: "column2",
      }],
      loading: false,
      firstSetFlag: false,
      selectItem: {
        provinceName: '河南省',
        cityName: '焦作市',
      },
    };
  },
  mounted() {
  },
  computed: {
    ...mapState('common', ['provinceList']),
  },
  methods: {
    ...mapActions('common', ['getProvinceList']),
    // 首次开启设置默认城市
    async initPicker() {
      //初始化省市列表，根据参数选择至指定省市 ，默认值（河南省焦作市）
      if (this.provinceList.length == 0) {
        this.loading = true;
        await this.getProvinceList();
      }
      let selectData = [];
      let defaultIndex = 0;
      this.provinceList.map((item, index) => {
        item.text = item.provinceName;
        item.value = item.provinceCode;

        if (this.params.provinceCode) {
          if (item.provinceCode == this.params.provinceCode) {//传入的其它省码
            defaultIndex = index;
            selectData.push(item);
          }
        } else {
          if (item.provinceCode == '41') {//河南省
            defaultIndex = index;
            selectData.push(item);
          }
        }
      });
      // 获取河南省市级列表
      let params = {
        //branchId: this.//branchId,
        ChnlId: this.chnlId,
        ProvinceCode: this.params.provinceCode || '41'
      }
      let cityRes = await this.request('QryCity', params, true);
      let cityList = cityRes.CityList;
      // if (cityList.length > 0) {
      //   this.firstSetFlag = true;
      // }
      let cityDefaultIndex = 0;
      cityList.map((item, index) => {
        item.text = item.cityName;
        item.value = item.cityCode;
        if (this.params.cityCode) {//参数传入的市
          if (item.cityCode == this.params.cityCode) {
            cityDefaultIndex = index;
            selectData.push(item);
          }
        } else {
          if (item.cityCode == '5010') {//焦作市
            cityDefaultIndex = index;
            selectData.push(item);
          }
        }
      });
      if (this.$refs.picker) {
        this.$refs.picker.setColumnValues(0, this.provinceList)
        this.$refs.picker.setColumnIndex(0, defaultIndex)
        this.$refs.picker.setColumnValues(1, cityList)
        this.$refs.picker.setColumnIndex(1, cityDefaultIndex)
      }
      this.firstSetFlag = true;
      this.loading = false;
    },
    // 调用接口获取省市名称（在picker未打开的情况下）
    async getCityName(){
      //初始化省市列表， 默认至河南省焦作市
      if (this.provinceList.length == 0) {
        await this.getProvinceList();
      }
      let selectData = [];
      let defaultIndex = 0;
      this.provinceList.map((item, index) => {
        item.text = item.provinceName;
        item.value = item.provinceCode;
        if (this.params.provinceCode) {
          if (item.provinceCode == this.params.provinceCode) {//传入的其它省码
            defaultIndex = index;
            selectData.push(item);
          }
        } else {
          if (item.provinceCode == '41') {//河南省
            defaultIndex = index;
            selectData.push(item);
          }
        }
      });
      // 获取河南省市级列表
      let params = {
        //branchId: this.//branchId,
        ChnlId: this.chnlId,
        ProvinceCode: this.params.provinceCode || '41'
      }
      let cityRes = await this.request('QryCity', params, true);
      let cityList = cityRes.CityList;
      let cityDefaultIndex = 0;
      cityList.map((item, index) => {
        item.text = item.cityName;
        item.value = item.cityCode;
        if (this.params.cityCode) {//参数传入的市
          if (item.cityCode == this.params.cityCode) {
            cityDefaultIndex = index;
            selectData.push(item);
          }
        } else {
          if (item.cityCode == '5010') {//焦作市
            cityDefaultIndex = index;
            selectData.push(item);
          }
        }
      });
      this.$emit('select', selectData)
      console.log("获取城市名称",selectData)
    },
    getCity(provinceCode) {
      let params = {
        //branchId: this.//branchId,
        ChnlId: this.chnlId,
        ProvinceCode: provinceCode
      }
      // this.loading = true;
      this.request('QryCity', params, true
      ).then((res) => {
        let cityList = res.CityList;
        let defaultIndex = 0;
        cityList.map((item, index) => {
          item.text = item.cityName;
          item.value = item.cityCode;
        });
        this.columns[1].values = cityList;
        if (this.show) { //如果dom展开,不可删除,影响省市联动变化
          this.$nextTick(() => {
            this.$refs.picker.setColumnValues(1, cityList);
          })
        }
        // this.loading = false;
      }).catch((error) => {
        console.log(error)
        // this.loading = false;
      })
    },
    onChange(picker, value, index) {
      if (index == 0) {
        // 刷新城市列表
        this.getCity(value[0].provinceCode);
      }
    },
    handleConfirm(data) {
      console.log("选择省市",data);
      this.$emit("confirm", data);
    },
    handleCancel() {
      this.show = false;
      this.$emit("cancel");
    }
  },
  watch: {
    //监听父组件变化，并赋值
    //监听父组件变化，并赋值
    visible: {
      handler(val) {
        this.show = val;
        // this.getProvince();
      }
    },
    show: {
      handler(val) {
        if (val && !this.firstSetFlag) {
          this.initPicker();
        }
        this.$emit("update:visible", val);
      }
    },
    params: {
      handler(val,oldVal) {
        // 进行数据对比，如果不同则执行
        if(val.cityCode != oldVal.cityCode){
          this.getCityName();
        }
      },
      deep: true
    },
  }
};
</script>
<style lang="scss" scoped>
/deep/ .popup-round {
  // min-height: px2vw(700);
  .van-picker__toolbar {
    height: px2vw(100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 px2vw(40);
  }
  .van-picker__title {
    font-size: px2vw(34);
  }
  .van-picker__cancel,
  .van-picker__confirm {
    padding: 0;
    font-size: $font-size;
    font-weight: 400;
    font-family: $font-family;
  }
  .van-picker__cancel {
    color: $color-text;
  }
  .van-picker__confirm {
    color: #107aee;
  }
  .van-picker__columns {
    .van-hairline--top-bottom::after {
      border-width: 0;
    }
  }
  .van-picker__frame {
    border-top: 1px solid rgba(229, 229, 229, 1);
    border-bottom: 1px solid rgba(229, 229, 229, 1);
  }
}
</style>
