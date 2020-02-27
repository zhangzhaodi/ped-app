<template>
  <div class="outer">
    <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
    <Scroller>
      <div class="hint">请选择还款产品，同类产品可多选</div>
      <!-- 易秒贷 -->
      <div class="loans" v-if="ymloans.length > 0">
        <div class="loans-box" v-if="ymloans.length == 1">
          <van-checkbox-group v-model="result" @change="change">
            <van-checkbox
              v-for="(item, index) in ymloans"
              :key="index"
              :name="item"
            >
              <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? activeIcon : inactiveIcon"
              />
              <div class="loans-box--right">
                <div class="loans-box--top">易秒贷</div>
                <div class="loans-box--bottom">
                  <div class="loans-info">
                    <p>剩余待还(元)</p>
                    <span>{{ item.Principle}}</span>
                  </div>
                  <div class="loans-info">
                    <p>最迟还款日</p>
                    <span>{{ item.Date | DateChange}}</span>
                  </div>
                </div>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>


        <!-- 多个显示的情况 -->
        <div v-else class="loans-list">
          <div class="list-header" @click="checkAll(1)">
            <van-checkbox v-model="checked1">
              <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? inactiveIcon : activeIcon"
              />
              <p>易秒贷</p>
            </van-checkbox>
          </div>
          <div class="list-box">
            <van-checkbox-group
              v-model="result"
              @change="change"
              ref="checkboxGroup1"
            >
              <van-checkbox
                v-for="(item, index) in ymloans"
                :key="index"
                :name="item"

              >
                <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.checked ? activeImg : inactiveImg"
                />
                <div class="loans-box--right">
                  <div class="loans-box--top">易秒贷</div>
                  <div class="loans-box--bottom">
                    <div class="loans-info">
                      <p>剩余待还(元)</p>
                      <span>{{ item.Principle }}</span>
                    </div>
                    <div class="loans-info">
                      <p>最迟还款日</p>
                      <span>{{ item.Date | DateChange }}</span>
                    </div>
                  </div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
      </div>

      <!-- 房易贷 -->
      <div class="loans" v-if="fyloans.length > 0">
        <div class="loans-box" v-if="fyloans.length == 1">
          <van-checkbox-group v-model="result1" @change="change">
            <van-checkbox
              v-for="(item, index) in fyloans"
              :key="index"
              :name="item"
            >
              <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? activeIcon : inactiveIcon"
              />
              <div class="loans-box--right">
                <div class="loans-box--top">房易贷</div>
                <div class="loans-box--bottom">
                  <div class="loans-info">
                    <p>剩余待还(元)</p>
                    <span>{{ item.restLoan | Money }}</span>
                  </div>
                  <div class="loans-info">
                    <p>最迟还款日</p>
                    <span>{{ item.deadLine }}</span>
                  </div>
                </div>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <div v-else class="loans-list">
          <div class="list-header" @click="checkAll(2)">
            <van-checkbox v-model="checked2">
              <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? inactiveIcon : activeIcon"
              />
              <p>房易贷</p>
            </van-checkbox>
          </div>
          <div class="list-box">
            <van-checkbox-group
              v-model="result1"
              @change="change"
              ref="checkboxGroup2"
            >
              <van-checkbox
                v-for="(item, index) in fyloans"
                :key="index"
                :name="item"
              >
                <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.checked ? activeImg : inactiveImg"
                />
                <div class="loans-box--right">
                  <div class="loans-box--top">申请日期 2019-08-12</div>
                  <div class="loans-box--bottom">
                    <div class="loans-info">
                      <p>剩余待还(元)</p>
                      <span>{{ item.restLoan | Money }}</span>
                    </div>
                    <div class="loans-info">
                      <p>最迟还款日</p>
                      <span>{{ item.deadLine }}</span>
                    </div>
                  </div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
      </div>
      <!-- 派e贷 -->
      <div class="loans">
        <div class="loans-box" v-if="pyloans.length == 1">
          <van-checkbox-group v-model="result2" @change="change">
            <van-checkbox
              v-for="(item, index) in pyloans"
              :key="index"
              :name="item"
            >
              <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? activeIcon : inactiveIcon"
              />
              <div class="loans-box--right">
                <div class="loans-box--top">派e贷</div>
                <div class="loans-box--bottom">
                  <div class="loans-info">
                    <p>剩余待还(元)</p>
                    <span>{{ item.restLoan | Money }}</span>
                  </div>
                  <div class="loans-info">
                    <p>最迟还款日</p>
                    <span>{{ item.deadLine }}</span>
                  </div>
                </div>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <div v-else class="loans-list">
          <div class="list-header" @click="checkAll(3)">
            <van-checkbox v-model="checked3">
              <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? inactiveIcon : activeIcon"
              />
              <p>派e贷</p>
            </van-checkbox>
          </div>
          <div class="list-box">
            <van-checkbox-group
              v-model="result"
              @change="change"
              ref="checkboxGroup3"
            >
              <van-checkbox
                v-for="(item, index) in pyloans"
                :key="index"
                :name="item"
              >
                <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.checked ? activeImg : inactiveImg"
                />
                <div class="loans-box--right">
                  <div class="loans-box--top">派e贷</div>
                  <div class="loans-box--bottom">
                    <div class="loans-info">
                      <p>剩余待还(元)</p>
                      <span>{{ item.restLoan | Money }}</span>
                    </div>
                    <div class="loans-info">
                      <p>最迟还款日</p>
                      <span>{{ item.deadLine }}</span>
                    </div>
                  </div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
      </div>
      <!-- 资产质押贷 -->
      <div class="loans">
        <div class="loans-box" v-if="zcloans.length == 1">
          <van-checkbox-group v-model="result3" @change="change">
            <van-checkbox
              v-for="(item, index) in pyloans"
              :key="index"
              :name="item"
            >
              <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? activeIcon : inactiveIcon"
              />
              <div class="loans-box--right">
                <div class="loans-box--top">派e贷</div>
                <div class="loans-box--bottom">
                  <div class="loans-info">
                    <p>剩余待还(元)</p>
                    <span>{{ item.restLoan | Money }}</span>
                  </div>
                  <div class="loans-info">
                    <p>最迟还款日</p>
                    <span>{{ item.deadLine }}</span>
                  </div>
                </div>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </div>
        <div v-else class="loans-list"></div>
      </div>
    </Scroller>
    <div @click="goConfirmRepay" class="footer">
      <van-button type="default">提前还款</van-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import { Checkbox, CheckboxGroup, Button } from "vant";

export default {
  components: {
    Myheader: Header,
    Scroller,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      ymloan: false,
      ymloans: [
      ],

      fyloans: [
        {
          restLoan: "10000",
          deadLine: "2022-08-20",
          isShow: false
        },
      ],

      pyloans: [
        {
          restLoan: "10000",
          deadLine: "2022-08-20",
          isShow: false
        }
      ],

      zcloans: [
        {
          restLoan: "10000",
          deadLine: "2022-08-20",
          isShow: false
        }
      ],
      checked: true,
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      showIcon1: true,
      showIcon2: true,
      showIcon3: true,
      showIcon4: true,
      activeIcon: require("@/assets/myLoans/myLoans/icon_danxuan_xuanzhong@2x(1).png"),
      inactiveIcon: require("@/assets/myLoans/myLoans/icon_danxuan_weixuanzhong@2x(1).png"),
      activeImg: require("@/assets/myLoans/myLoans/icon_danxuan_xuanzhong@2x.png"),
      inactiveImg: require("@/assets/myLoans/myLoans/icon_danxuan_weixuanzhong@2x.png"),
      result: [],
      result1: [],
      result2: [],
      result3: [],
      acNo:'',//客户账号
      Order:'',//客户顺序号
      sendList:[],//往下传递的list
      OpenDate:'',//加一个开始时间
      loadsData:{},//加载的贷款数据
      data1:{},//贷款所有数据
      data2:{}//还款数据
    };
  },
  created() {
    this.getLoadsData("01");

  },
  mounted() {},
  computed: {},
  methods: {
    //获取个人信息
    getLoadsData(type){
      this.request("SecondLoanRepaymentQry", {
        BusinessType: type, //	还款类型 2 /3
      })
      .then(res => {
        console.log('~~~~~~~data1:',res);
        this.data1 = res;
        var list = res.List;
        this.Order =list[0].Order;//客户顺序号码        
        this.AcNo = list[0].SRevolvingLoanAcNo;//得到客户账号
        this.OpenDate = list[0].OpenDate;//申请时间
        this.loadsData = list[0];//获取loads信息       
        //请求还款计划信息
        this.getPlanQry(type); //获取客户信息

      })
      .catch(error => {
        console.log(error);
      });
    },
    //获取其他信息
    getPlanQry(type){
      //进一步获取信息
      this.request("RepaymentPlanQry", {
        //相关参数
        BusinessType:type,//业务类型
        AccSeq:this.Order,//客户顺序号
        AcNo:this.AcNo,//还款账号
      })
      .then(res => {
        console.log('======data2:',res);
        this.data2 = res;//
        this.ymloans = res.List;
      })
      .catch(error => {
        console.log(error);
      });

    },
    //全选
    checkAll(value) {
      if (value == 1) {
        if (this.showIcon1) {
          this.$refs.checkboxGroup1.toggleAll(true);
          this.showIcon1 = !this.showIcon1;
          this.ymloans.forEach((item,index)=>{
            this.sendList[index] = item;
          })
        } else {
          this.$refs.checkboxGroup1.toggleAll();
          this.showIcon1 = !this.showIcon1;
          this.sendList =  null;
          this.sendList = [];
        }

      } else if (value == 2) {
        console.log(value, this.showIcon2);
        if (this.showIcon2) {
          this.$refs.checkboxGroup2.toggleAll(true);
          this.showIcon2 = !this.showIcon2;
        } else {
          this.$refs.checkboxGroup2.toggleAll();
          this.showIcon2 = !this.showIcon2;
        }
      }

      // if (this.showIcon) {
      //   this.$refs.checkboxGroup.toggleAll(true);
      //   this.showIcon = !this.showIcon;
      // } else {
      //   this.$refs.checkboxGroup.toggleAll();
      //   this.showIcon = !this.showIcon;
      // }
      // if (this.showIcon) {
      //   this.$refs.checkboxGroup.toggleAll(true);
      //   this.showIcon = !this.showIcon;
      // } else {
      //   this.$refs.checkboxGroup.toggleAll();
      //   this.showIcon = !this.showIcon;
      // }
    },
    //反选
    change() {
      console.log(this.result.length, this.ymloans.length, this.checked1);

      if(this.result.length > 0){
        this.result.forEach((item,index)=>{
          this.sendList[index] = item;
        });
      }

      //易秒贷
      if (this.result.length == this.ymloans.length) {
        console.log(111, this.checked1);
        this.checked1 = false;
        this.showIcon1 = false;
      } else {
        this.checked1 = true;
        this.showIcon1 = true;
      }



      if (this.result1.length == this.fyloans.length) {
        console.log(111, this.checked2);
        this.checked2 = false;
        this.showIcon2 = false;
      } else {
        this.checked2 = true;
        this.showIcon2 = true;
      }
      console.log(this.result);
      console.log(this.result1);
      // console.log(this.result2);
      // console.log(this.result3);
    },
    //跳到还款确认页
    goConfirmRepay() {
      this.$router.push({
        name: "confirmRepay",params:{
          data:this.sendList,
          leng:this.ymloans.length,
          opendate:this.OpenDate,
          loadsdata:this.loadsData,
          data1:this.data1,
          data2:this.data2}
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .scrollerBox {
    background: none;
    padding: 0 px2vw(30);
    .hint {
      padding: px2vw(30) px2vw(10) px2vw(20);
      font-size: px2vw(24);
      font-family: PingFangSC-Light, PingFangSC;
      font-weight: 300;
      color: rgba(125, 125, 125, 1);
    }
    .loans {
      background: rgba(255, 255, 255, 1);
      border-radius: px2vw(16);
      margin-bottom: px2vw(30);
      .loans-box {
        padding: px2vw(40);
        padding-right: px2vw(146);
        .van-checkbox-group {
          width: 100%;
          /deep/ .van-checkbox__icon {
            width: px2vw(32);
            img {
              width: 100%;
            }
          }
          /deep/ .van-checkbox__label {
            width: 100%;
            margin-left: px2vw(30);
            .loans-box--right {
              width: 100%;
              .loans-box--top {
                font-size: px2vw(30);
                font-family: PingFangSC-Medium, PingFangSC;
                font-weight: 500;
                color: rgba(38, 38, 38, 1);
                margin-bottom: px2vw(30);
              }
              .loans-box--bottom {
                display: flex;
                justify-content: space-between;
                .loans-info {
                  font-family: PingFangSC-Light, PingFangSC;
                  p {
                    font-size: px2vw(22);
                    font-weight: 300;
                    color: rgba(125, 125, 125, 1);
                    margin-bottom: px2vw(12);
                  }
                  span {
                    font-size: px2vw(26);
                    font-weight: 400;
                    color: rgba(38, 38, 38, 1);
                  }
                }
              }
            }
          }
        }
      }
      .loans-list {
        .list-header {
          display: flex;
          padding: px2vw(30) 0;
          padding-left: px2vw(40);
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          .van-checkbox {
            width: 100%;
          }
          /deep/ .van-checkbox__label {
            margin-left: px2vw(30);
            p {
              font-size: px2vw(30);
              font-family: PingFangSC-Medium, PingFangSC;
              font-weight: 500;
              color: rgba(38, 38, 38, 1);
            }
          }
        }
        .list-box {
          padding: 0 px2vw(40);
          padding-bottom: px2vw(10);
          .van-checkbox-group {
            width: 100%;
            /deep/ .van-checkbox {
              border-bottom: 1px solid #eff0f1;
              .van-checkbox__label {
                width: 100%;
                margin-left: px2vw(30);
                margin-right: px2vw(106);
                .loans-box--right {
                  width: 100%;
                  margin: px2vw(30) 0;
                  .loans-box--top {
                    font-size: px2vw(30);
                    font-family: PingFangSC-Medium, PingFangSC;
                    font-weight: 500;
                    color: rgba(38, 38, 38, 1);
                    margin-bottom: px2vw(30);
                  }
                  .loans-box--bottom {
                    display: flex;
                    justify-content: space-between;
                    .loans-info {
                      font-family: PingFangSC-Light, PingFangSC;
                      p {
                        font-size: px2vw(22);
                        font-weight: 300;
                        color: rgba(125, 125, 125, 1);
                        margin-bottom: px2vw(12);
                      }
                      span {
                        font-size: px2vw(26);
                        font-weight: 400;
                        color: rgba(38, 38, 38, 1);
                      }
                    }
                  }
                }
              }
            }
            /deep/ .van-checkbox:last-child {
              border: 0;
            }
          }
        }
      }
      /deep/ .van-checkbox__icon {
        width: px2vw(32);
        img {
          width: 100%;
          margin-top: px2vw(4);
        }
      }
    }
  }
  .footer {
    height: px2vw(118);
    background: rgba(255, 255, 255, 1);
    box-shadow: -5px -5px 20px 0px rgba(69, 69, 83, 0.05);
    .van-button {
      height: 100%;
      width: 100%;
      font-size: px2vw(34);
      color: rgba(62, 143, 255, 1);
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
    }
  }
}
</style>
