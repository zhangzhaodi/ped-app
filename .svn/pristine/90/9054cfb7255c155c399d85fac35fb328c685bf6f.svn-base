<template>
  <div>
    <PopupRound :visible.sync="show" title="时间选择" confirmText="完成" @confirm="confirm">
      <div class="time">
        <div @click="startHandle()" class="time-box" :class="{selected:startSelected}">{{startTime}}</div>
        <p>至</p>
        <div @click="endHandle()" class="time-box" :class="{selected:endSelected}">{{endTime}}</div>
      </div>
      <p class="hint" v-show="isShow">{{wrongText}}</p>
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :formatter="formatter" @change="change" />
    </PopupRound>
  </div>
</template>

<script>
import PopupRound from "@/components/PopupRound";
import { DatetimePicker } from "vant";
import dayjs from 'dayjs';

//圆角popup 底部选择组件  适用于转账模块相关选择popup组件
export default {
  name: "popupround",
  components: {
    [DatetimePicker.name]: DatetimePicker,
    PopupRound
  },
  props: {
    // 输入项名（用于报错提示）
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    startDate:{
      type: String,
      default: dayjs().format('YYYY-MM-DD')
    },
    endDate:{
      type: String,
      default: dayjs().add(1,"d").format('YYYY-MM-DD')
    },
    minDate: {
      type: Date,
      default: new Date()
    }
  },
  data() {
    return {
      show: this.visible,
      // minDate: new Date(),//new Date(),//ios只识别YYYY/MM/DD 否则不显示
      currentDate: new Date(),
      //起始时间选中状态的类名
      startSelected: true,
      endSelected: false,
      //显示的起始时间
      startTime: this.startDate,
      endTime: this.endDate,
      // initTime: dayjs.format('YYYY-MM-DD'),
      finishTime: "",
      wrongText:"结束时间不能早于起始时间",
    };
  },
  computed: {
    isShow() {
      let isShow = false;
     if(dayjs(this.endTime).isBefore(this.startTime)){
        this.wrongText = "结束时间不能早于起始时间";
        isShow = true;
      }else if(dayjs(this.endTime).isSame(this.startTime)){
        this.wrongText = "结束时间与起始时间不能相等";
        isShow = true;
      }else{
         isShow = false;
      }
      return isShow
    },
  },
  created() { },
  methods: {
    handleConfirm() {
      this.$emit("confirm");
    },
    confirm() {
      console.log(this.startTime, this.endTime);
      if(!this.isShow){
        // this.initTime = this.startTime;
        this.finishTime = this.endTime;
        this.show = false;
        let data = {
          startTime: this.startTime,
          endTime: this.endTime
        }
        this.$emit("select", data)
      }
     
    },
    //时间选择器数据的过滤
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    //时间选择器时间改变
    change(value) {
      let arr = value.getValues();
      if (this.startSelected) {
        this.startTime =
          arr[0].substr(0, 4) +
          "-" +
          arr[1].substr(0, 2) +
          "-" +
          arr[2].substr(0, 2);
      } else {
        this.endTime =
          arr[0].substr(0, 4) +
          "-" +
          arr[1].substr(0, 2) +
          "-" +
          arr[2].substr(0, 2);
      }
    },
    startHandle() {
      this.startSelected = true;
      this.endSelected = false;
      let startTime = this.startTime.split("-").join("/");
      startTime = `${startTime}`;
      console.log(startTime);
      this.currentDate = new Date(startTime);
    },
    endHandle() {
      this.startSelected = false;
      this.endSelected = true;
      let endTime = this.endTime.split("-").join("/");
      endTime = `${endTime}`;
      console.log(endTime);
      this.currentDate = new Date(endTime);
    }
  },
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
    },
  }
};
</script>
<style lang="scss" scoped>
.time-box {
  height: px2vw(100);
}
.time {
  border-top: 1px solid rgba(229, 229, 229, 1);
  padding: px2vw(38) px2vw(108);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: px2vw(30);
  font-family: PingFangSC;
  font-weight: 400;
  .time-box {
    color: #7d7d7d;
    border-bottom: 1px solid #7d7d7d;
    height: px2vw(52);
  }
  .selected {
    color: #3e8fff;
    border-bottom: 1px solid #3e8fff;
  }
  p {
    color: rgba(38, 38, 38, 1);
  }
}
.hint {
  font-size: px2vw(22);
  font-family: PingFangSC;
  font-weight: 300;
  color: rgba(255, 64, 64, 1);
  line-height: px2vw(26);
  text-align: center;
}
/deep/ .van-picker.van-datetime-picker {
  .van-picker__toolbar {
    display: none;
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
