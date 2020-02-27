<template>
  <div class="outer">
    <div class="header">
      <Myheader :title="$route.meta.title" :params="headerParams"></Myheader>
      <div class="nav-box">
        <ul>
          <li @click="changeLoans(1)">
            <p :class="{active:isSelected == 1}">易秒贷</p>
            <div class="state-bottom" :class="{activestate:isSelected == 1}"></div>
          </li>
          <li @click="changeLoans(2)">
            <p :class="{active:isSelected == 2}">派e贷</p>
            <div class="state-bottom" :class="{activestate:isSelected == 2}"></div>
          </li>
          <li @click="changeLoans(3)">
            <p :class="{active:isSelected == 3}">游乐贷</p>
            <div class="state-bottom" :class="{activestate:isSelected == 3}"></div>
          </li>
          <li @click="changeLoans(4)">
            <p :class="{active:isSelected == 4}">资产质押</p>
            <div class="state-bottom" :class="{activestate:isSelected == 4}"></div>
          </li>
        </ul>
      </div>
    </div>
    <Scroller>
      <div class="record" v-show="this.isSelected == 1">
        <div class="credit" @click="goContractDetail(1)">
          <div class="credit-top">
            <div class="credit-img">
              <img src="@/assets/myLoans/contract/icon_shouxinhetong@2x.png" alt />
              <p>授信合同</p>
            </div>
          </div>
          <div class="credit-mid">
            <p>{{ymLoans.name}}</p>
            <i class="iconfont">&#xe649;</i>
          </div>
          <div class="credit-bottom">
            <div class="credit-text">
              <p>贷款额度(元)</p>
              <span>{{ContractSum | Money}}</span>
            </div>
            <div class="credit-text">
              <p>申请时间</p>
              <span>{{ContractDate}}</span>
            </div>
          </div>
        </div>
        <div class="link-img">
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
        </div>
        <div class="loans-list">
          <div class="drawMoney">
            <p>提款合同</p>
          </div>
          <div class="contract-list" v-for="(item,index) in ymContractList" :key="index">
            <div class="contract-info">
              <p>
                贷款名称
                <span>易秒贷</span>
              </p>
              <p>
                贷款额度
                <span>{{item.ContractSum | Money}}元</span>
              </p>
              <p>
                申请时间
                <span>{{item.ContractDate}}</span>
              </p>
            </div>
            <div class="contract-settle" v-if="item.Status == 1">
              <button @click="getPhoto()">上传消费凭证</button>
            </div>
            <div class="contract-uncleared" v-else>
              <button class="uncleared-btn">还款计划</button>
              <button @click="goVouchers">查看消费凭证</button>
            </div>
          </div>
        </div>
      </div>




      <!-- --------------做一个分割线------------------ -->
      <div class="record" v-show="this.isSelected == 2">
        <div class="credit" @click="goContractDetail(2)">
          <div class="credit-top">
            <div class="credit-img">
              <img src="@/assets/myLoans/contract/icon_shouxinhetong@2x.png" alt />
              <p>授信合同</p>
            </div>
          </div>
          <div class="credit-mid">
            <p>{{pyLoans.name}}</p>
            <i class="iconfont">&#xe649;</i>
          </div>
          <div class="credit-bottom">
            <div class="credit-text">
              <p>贷款额度(元)</p>
              <span>{{pyLoans.limit | Money}}</span>
            </div>
            <div class="credit-text">
              <p>申请时间</p>
              <span>{{pyLoans.applyTime}}</span>
            </div>
          </div>
        </div>
        <div class="link-img">
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
        </div>
        <div class="loans-list">
          <div class="drawMoney">
            <p>提款合同</p>
          </div>
          <div class="contract-list" v-for="(item,index) in pyContractList" :key="index">
            <div class="contract-info">
              <p>
                贷款名称
                <span>{{item.name}}</span>
              </p>
              <p>
                贷款额度
                <span>{{item.limit | Money}}元</span>
              </p>
              <p>
                申请时间
                <span>{{item.applyTime}}</span>
              </p>
            </div>
            <div class="contract-settle" v-if="item.state == 1">
              <button @click="visible = true">上传消费凭证</button>
            </div>
            <div class="contract-uncleared" v-else>
              <button class="uncleared-btn">还款计划</button>
              <button>查看消费凭证</button>
            </div>
          </div>
        </div>
      </div>
      <div class="record" v-show="this.isSelected == 3">
        <div class="credit" @click="goContractDetail(3)">
          <div class="credit-top">
            <div class="credit-img">
              <img src="@/assets/myLoans/contract/icon_shouxinhetong@2x.png" alt />
              <p>授信合同</p>
            </div>
          </div>
          <div class="credit-mid">
            <p>{{ylLoans.name}}</p>
            <i class="iconfont">&#xe649;</i>
          </div>
          <div class="credit-bottom">
            <div class="credit-text">
              <p>贷款额度(元)</p>
              <span>{{ylLoans.limit | Money}}</span>
            </div>
            <div class="credit-text">
              <p>申请时间</p>
              <span>{{ylLoans.applyTime}}</span>
            </div>
          </div>
        </div>
        <div class="link-img">
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
          <img src="@/assets/myLoans/contract/icon_kapianlianjie@2x.png" alt />
        </div>
        <div class="loans-list">
          <div class="drawMoney">
            <p>提款合同</p>
          </div>
          <div class="contract-list" v-for="(item,index) in ylContractList" :key="index">
            <div class="contract-info">
              <p>
                贷款名称
                <span>{{item.name}}</span>
              </p>
              <p>
                贷款额度
                <span>{{item.limit | Money}}元</span>
              </p>
              <p>
                申请时间
                <span>{{item.applyTime}}</span>
              </p>
            </div>
            <div class="contract-settle" v-if="item.state == 1">
              <button @click="visible = true">上传消费凭证</button>
            </div>
            <div class="contract-uncleared" v-else>
              <button class="uncleared-btn">还款计划</button>
              <button>查看消费凭证</button>
            </div>
          </div>
        </div>
      </div>
      <div class="record" v-show="this.isSelected == 4">
        <div
          class="zcLoans"
          v-for="(item,index) in zcContractList"
          :key="index"
          @click="goProContract"
        >
          <div class="zcLoans-top">资产编号：{{item.number}}</div>
          <div class="zcLoans-mid">
            <div class="zcLoans-info">
              <p>贷款额度(元)</p>
              <span>{{item.limit | Money}}</span>
            </div>
            <div class="zcLoans-info">
              <p>资产存储类型</p>
              <span>{{item.storageType}}</span>
            </div>
          </div>
          <div class="zcLoans-bottom">
            <p>
              产品类型
              <span>{{item.productType}}</span>
            </p>
            <p>
              业务品种
              <span>{{item.variety}}</span>
            </p>
          </div>
        </div>
      </div>
    </Scroller>
    <div class="footer" @click="quotaAbolish">额度废除</div>
    <MyDialog
      :showCancel="showCancel"
      @cancel="cancel"
      title="提示"
      :show="alertShow"
      :isClose="false"
      @con="alertShow = false"
    >
      <p slot="content" class="dialog-content">{{dialogText}}</p>
    </MyDialog>
    <Upload :visible.sync="visible" @hiddenPopop="hiddenPopop" @afterRead="afterRead"></Upload>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import Scroller from "@/components/Scroller.vue";
import Dialog from "@/components/Dialog/Dialog.vue";
import Upload from "@/components/Popup/Upload.vue";

export default {
  components: {
    Myheader: Header,
    Scroller,
    Upload,
    MyDialog: Dialog
  },
  data() {
    return {
      headerParams: {
        leftShow: true,
        rightShow: true
      },
      //是否显示
      alertShow: false,
      //是否显示取消
      showCancel: false,
      dialogText: "",
      //选择合同类型
      isSelected: "1",
      //显示上传照片
      visible: false,
      //不同带块类型列表
      ymLoans: {
        name: "易秒贷",
        limit: "60000",
        applyTime: "2018-12-13"
      },
      pyLoans: {
        name: "派e贷",
        limit: "60000",
        applyTime: "2018-12-13"
      },
      ylLoans: {
        name: "游乐贷",
        limit: "60000",
        applyTime: "2018-12-13"
      },
      //易秒贷
      ymContractList: [
        {
          name: "易秒贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "易秒贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "易秒贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "0"
        }
      ],
      //派e贷
      pyContractList: [
        {
          name: "派e贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "派e贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "派e贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "0"
        }
      ],
      //游乐贷
      ylContractList: [
        {
          name: "游乐贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "游乐贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "1"
        },
        {
          name: "游乐贷",
          limit: "60000",
          applyTime: "2018-12-13",
          state: "0"
        }
      ],
      //资产质押
      zcContractList: [
        {
          number: "455554545",
          limit: "60000",
          storageType: "卡内定期",
          productType: "xxxxxxxxxx",
          variety: "大额存单"
        },
        {
          number: "455554545",
          limit: "60000",
          storageType: "卡内定期",
          productType: "xxxxxxxxxx",
          variety: "大额存单"
        }
      ],
      //接收的图片
      acceptImg: "",//
      businessType:"01",//业务类型
      ContractSum:'',//总金额
      ContractDate:'',//申请日期

    };
  },
  created() {
    //合同查询接口，todo ：这里需要判断一下是
    this.getArgeementInfo();



  },
  mounted() {},
  computed: {},
  methods: {
    //选择不同贷款
    changeLoans(value) {
      switch (value) {
        case 1:
          this.isSelected = 1;
          //业务类型判断
          this.businessType = "01";
          //this.getArgeementInfo();

          break;
        case 2:
          this.isSelected = 2;
          break;
        case 3:
          this.isSelected = 3;
          break;
        default:
          this.isSelected = 4;
      }
    },
    //跳到资产质押合同
    goProContract() {
      this.$router.push({ name: "proContract" });
    },
    goContractDetail(value) {
      this.$router.push({
        name: "contractDetail",
        query: { myLoansType: value }
      });
    },
    //隐藏dialog
    cancel() {
      this.alertShow = false;
    },
    //dialog
    quotaAbolish() {
      
      /*
      //dialog显示的内容
      this.alertShow = true;
      if (this.isSelected == 1) {
        this.showCancel = false;
        this.dialogText = "您尚有贷款未结清，请将贷款结清后再废除额度。";

      } else {
        this.showCancel = true;
        this.dialogText =
          "额度废除后，您将不能再进行提款操作，支持重新发起额度申请，您确定要废除吗？";
      }

      */

      //如果是易秒贷款
      if(this.isSelected ==1){
        //发起废除请求
        //发起请求
        let params = {
          BusinessType:"01"
        };
        this.request("SecondloanLimitAbolish", params)
          .then(res => {
            console.log("~~~~~res:",res);


      
          })
          .catch(error => {
            console.log(error);
          });
      }

    },
    hiddenPopop() {
      this.visible = false;
    },
    //
    afterRead(value) {
      this.visible = false;
      this.$router.push({
        name: "vouchers",
        query: { acceptImg: value }
      });
      // console.log(this.acceptImg);
    },
    //
    goVouchers() {
      this.$router.push({
        name: "vouchers"
      });
    },
    //获取合同信息
    getArgeementInfo(){
      let params = {
        QryLoanType:'5',
        BusinessType:this.businessType
      }
      //发起请求
      this.request("MyAgreementQry", params)
        .then(res => {
          console.log('~~~~~~~data1:',res);
          // 1. ContractSum: "300000"
          // 2. BackAcct: "6232050000210021657"
          // 3. duebills: ""
          // 4. ContractType: "1"
          // 5. ContractID: "89f3f80317e44105998431e605bca07b"
          // 6. ContractDate: "2020/01/16"
          this.ContractSum = res.List[0].ContractSum || '';
          this.ContractDate = res.List[0].ContractDate || '';

          let dList = [];//详情数组
          let tList = [];//title数组

          let List = res.List;
          //写个trap，根据status的不同，来把总额度和提款项数组分开
          List.forEach((item)=>{
            if(item.Status){
              //在尾部添加对应的item
              dList.push(item);
            }else{
              //在尾部添加一个item
              tList.push(item);
            }
          });
          this.ContractSum = tList[0].ContractSum || '';
          this.ContractDate = tList[0].ContractDate || '';
          //输出一下两个数组
          // console.log("~~~~~~~~tList:",tList);
          // console.log("~~~~~~~~dList:",dList);
          //得到我们想要的数组
          this.ymContractList = dList||[];

    
        })
        .catch(error => {
          console.log(error);
        });

    },

    //获取照片信息
    getPhoto(){
      //调用原生的相机
      window.NativeCall.CapturePhoto("1",(res)=>{
        console.log('~~~~~~~~photo:',res);

      })
    }
  }
};
</script>
<style lang="scss" scoped>
.outer {
  .nav-box {
    background: rgba(255, 255, 255, 1);
    padding-top: px2vw(34);
    padding-bottom: px2vw(10);
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        p {
          font-size: px2vw(26);
          font-family: PingFangSC-Medium, PingFangSC;
          font-weight: 500;
          color: rgba(125, 125, 125, 1);
          line-height: px2vw(30);
        }
        .active {
          font-size: px2vw(30);
          color: rgba(38, 38, 38, 1);
        }
        .state-bottom {
          width: px2vw(40);
          height: px2vw(4);
          background: none;
          border-radius: px2vw(2);
          margin-top: px2vw(14);
        }
        .activestate {
          background: rgba(38, 38, 38, 1);
        }
      }
    }
  }
  .scrollerBox {
    background: none;
    padding: px2vw(30);
    .record {
      flex: 1;
      overflow-y: auto;
      .credit {
        background: rgba(255, 255, 255, 1);
        border-radius: px2vw(16);
        .credit-top {
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          .credit-img {
            margin: 0 auto;
            width: px2vw(216);
            position: relative;
            img {
              width: 100%;
            }
            p {
              font-size: px2vw(30);
              font-family: PingFangSC-Medium, PingFangSC;
              font-weight: 500;
              color: rgba(62, 143, 255, 1);
              padding: 0 px2vw(48);
              position: absolute;
              top: px2vw(27);
            }
          }
        }
        .credit-mid {
          padding: px2vw(36) px2vw(40) px2vw(36) px2vw(60);
          display: flex;
          justify-content: space-between;
          p {
            font-size: px2vw(30);
            font-family: PingFangSC-Medium, PingFangSC;
            font-weight: 500;
            color: rgba(38, 38, 38, 1);
            line-height: px2vw(30);
          }
          i {
            font-size: px2vw(22);
            line-height: px2vw(30);
            color: #7d7d7d;
          }
        }
        .credit-bottom {
          display: flex;
          justify-content: space-between;
          padding: 0 px2vw(120) px2vw(56) px2vw(60);
          .credit-text {
            display: flex;
            flex-direction: column;
            p {
              margin-bottom: px2vw(12);
              font-size: px2vw(22);
              font-family: PingFangSC-Light, PingFangSC;
              font-weight: 300;
              color: rgba(125, 125, 125, 1);
            }
            span {
              font-size: px2vw(30);
              font-weight: 500;
              color: rgba(38, 38, 38, 1);
            }
          }
        }
      }
      .link-img {
        padding: 0 px2vw(120);
        margin-top: px2vw(-18);
        display: flex;
        justify-content: space-between;
        img {
          width: px2vw(14);
          height: px2vw(56);
        }
      }
      .loans-list {
        background: #ffffff;
        margin-top: px2vw(-18);
        border-radius: px2vw(16);
        display: flex;
        flex-direction: column;
        .drawMoney {
          padding-top: px2vw(45);
          padding-bottom: px2vw(24);
          text-align: center;
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          p {
            font-size: px2vw(30);
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
          }
        }
        .contract-list {
          margin: 0 px2vw(40);
          padding-bottom: px2vw(30);
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          .contract-info {
            padding-top: px2vw(30);
            p {
              font-size: px2vw(24);
              font-family: PingFangSC-Light, PingFangSC;
              font-weight: 300;
              color: rgba(125, 125, 125, 1);
              margin-bottom: px2vw(20);
              span {
                font-weight: 400;
                color: rgba(38, 38, 38, 1);
                margin-left: px2vw(20);
              }
            }
          }
          .contract-settle {
            padding-top: px2vw(96);
            display: flex;
            flex-direction: column;
          }
          .contract-uncleared {
            padding-top: px2vw(24);
            display: flex;
            flex-direction: column;
            .uncleared-btn {
              background: linear-gradient(
                90deg,
                rgba(107, 171, 255, 1) 0%,
                rgba(108, 138, 249, 1) 100%
              );
              color: rgba(255, 255, 255, 1);
              margin-bottom: px2vw(16);
            }
          }
          button {
            width: px2vw(178);
            height: px2vw(56);
            border-radius: px2vw(100);
            border: 1px solid rgba(62, 143, 255, 1);
            font-size: px2vw(22);
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(62, 143, 255, 1);
            background: rgba(255, 255, 255, 1);
          }
        }
        .contract-list:last-child {
          border: 0;
        }
      }
      .zcLoans {
        background: rgba(255, 255, 255, 1);
        border-radius: 16px;
        margin-bottom: px2vw(30);
        .zcLoans-top {
          padding: px2vw(25) 0;
          padding-left: px2vw(40);
          font-size: px2vw(30);
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(0, 139, 255, 1);
          border-bottom: 1px solid rgba(239, 240, 241, 1);
        }
        .zcLoans-mid {
          margin: 0 px2vw(40);
          padding: px2vw(40) 0;
          padding-right: px2vw(132);
          border-bottom: 1px solid rgba(239, 240, 241, 1);
          display: flex;
          justify-content: space-between;
          .zcLoans-info {
            display: flex;
            flex-direction: column;
            font-family: PingFangSC-Medium, PingFangSC;
            p {
              font-size: px2vw(22);
              font-weight: 300;
              color: rgba(125, 125, 125, 1);
            }
            span {
              font-size: px2vw(30);
              font-weight: 400;
              color: rgba(38, 38, 38, 1);
              margin-top: px2vw(12);
            }
          }
        }
        .zcLoans-bottom {
          padding: px2vw(26) px2vw(108) px2vw(26) px2vw(40);
          display: flex;
          justify-content: space-between;
          font-size: px2vw(22);
          font-family: PingFangSC-Medium, PingFangSC;
          p {
            font-weight: 300;
            color: rgba(125, 125, 125, 1);
          }
          span {
            font-weight: 400;
            color: rgba(38, 38, 38, 1);
            margin-left: px2vw(20);
          }
        }
      }
    }
  }
  .footer {
    height: px2vw(79);
    padding-top: px2vw(41);
    text-align: center;
    font-size: px2vw(34);
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(255, 64, 64, 1);
    background: rgba(255, 255, 255, 1);
  }
}
</style>
