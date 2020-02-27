export const USERINFO = 'USERINFO'
export const BANKLIST = 'BANKLIST'
export const PAYEECARDS = 'PAYEECARDS'
export const PROVINCELIST = "PROVINCELIST"

import request from '@/axios/http.js'
let obj = new Object();
obj.request = request;


const state = {
  userInfo:{
    PayeeName: '',
    UserId: '',
    HeadImg: '',
    MobilePhone:'',
    QueryAddAccount:[],
  },
  bankList:[],
  bankList1:[{
    bankId: '101',
    bankName: '焦作中旅银行',
  },{
    bankId: '102',
    bankName: '中国农业银行',
  },{
    bankId: '103',
    bankName: '中国银行',
  },{
    bankId: '104',
    bankName: '招商银行',
  },{
    bankId: '105',
    bankName: '民生银行',
  },{
    bankId: '105',
    bankName: '华夏银行',
  }],
  payeeCards:[],//付款卡列表
  provinceList: [],
}

const getters = {
  userInfo: state => state.userInfo,
  bankList:state => state.bankList,
  payeeCards: state => state.payeeCards,
  provinceList: state => state.provinceList,
}

const actions = {
  async getUserInfo ({commit}, data) {
    if(process.env.NODE_ENV == "development"){
      if(!this.state.common.userInfo.UserId){
        /*
        let params = {
          BankId: '9999',
          LoginId: '17760780792', //13112341234 abc12331   测:18862314918 cs123321 张:17591168228 qwer4321 赫小芸  13598874045  qwer1234 方金舟:15836233366 qwer1234  测试3:18800113915 旭阳:17760780792 qwer1234
          Password: 'qwer1234',//
          EquipmentId: '125657',
          LoginType: 'R',
          LoginMode: '1',
          //branchId: '01001',
          AddrInfo: 'zhengz',
          ChnlId: '62' 
          
        }
        */
        //王飞
        /*
        let params={
          BankId: "9999",
          LoginId: "15238355538",
          Password: "qwer1234",
          EquipmentId: "125657",
          LoginType: "R",
          LoginMode: "1",
          BranchId: "01001",
          ChnlId: "62",
          AddrInfo: "zhengz"
        }
        */
       //龙
        let params={
          BankId: "9999",
          LoginId: "15236161052",
          Password: "123456asd",
          EquipmentId: "125657",
          LoginType: "R",
          LoginMode: "1",
          BranchId: "01001",
          ChnlId: "62",
          AddrInfo: "zhengz"
        }
        let res = await obj.request.$post('login',params, true)
        commit(USERINFO, res);
      }else{
        return 
      }
      // console.log(this.state.common,"common")
    }else if(process.env.NODE_ENV == "production"){
      if(!this.state.common.userInfo.UserId){
        window.NativeCall.getUserInfo( params => {
          commit(USERINFO, JSON.parse(params))
        })
      }else{
        return 
      }
    }
    
  },
  async getBankList({commit},data){
    if(this.state.common.bankList.length == 0){
      let params = {
        ChnlId: '62',
      }
      let res = await obj.request.$post('QryBankList',params);
      commit(BANKLIST, res.BankList);
    }
  },
  async getPayeeCards({commit},data){

    // if(this.state.common.userInfo.QueryAddAccount.length == 0){
    //   //接口查询
      let params = {
        //branchId: '1699999999',
        ChnlId: '39',
        BankId: '9999',
      }
      let res = await obj.request.$post('QryDebitCard', params);
      commit(PAYEECARDS, res.QueryAddAccount);
    // }else{
    //   //登陆信息直接获取
    //   commit(PAYEECARDS, this.state.common.userInfo.QueryAddAccount);//登陆信息的加挂卡列表不能同步更新
    // }
     
  },
  async getProvinceList({commit},data){
    if(this.state.common.provinceList.length == 0){
      let params = {
        //branchId: '2336',
        ChnlId: '62',
      }
      let res = await obj.request.$post('QryProvince', params, true);
      commit(PROVINCELIST, res.ProvinceList);
    }
    // vm.request.$post('QryProvince', params, true).then((res) => {
    //   commit(PROVINCELIST, res.ProvinceList);
    // }).catch((error) => {
    // })
  }
}

const mutations = {
  [USERINFO] (state, data) {
    state.userInfo = data;
  },
  [BANKLIST] (state, data) {
    state.bankList = data;
  },
  [PAYEECARDS] (state,data){
    state.payeeCards = data;
  },
  [PROVINCELIST](state,data){
    state.provinceList = data;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
