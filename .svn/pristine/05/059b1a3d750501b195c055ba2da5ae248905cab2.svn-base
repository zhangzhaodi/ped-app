export const LINKMANLISTS = 'LINKMANLISTS'
export const YUYUE = 'YUYUE'
export const TOPCONTACTSLISTS = 'TOPCONTACTSLISTS'
export const PHONECONFIG = "PHONECONFIG"
export const PHONEBINDED = "PHONEBINDED"
const state = {
  // eleForm:{
  //   isReserved: false,//是否预约
  //   orderType: '1',// 1-单次 2-每周 3-每月
  //   orderDate: ''
  // },
  linkManLists:[],//收款人列表
  topContactsLists:[{
    ower:[],
  },{
    other:[]
  }],//常用联系人列表
  yuyue:{
    open: false,
    useage: '',
    type: '',
    startDate: '',
    endDate: '',
  },
  phoneBinded: false,//是否手机号绑定
  phoneConfig: {
    payeeCardList: [],
    payeeAcctNo: '',
    selectItem:{}
  }
}

const getters = {
  linkManLists: state => state.linkManLists,
  yuyue: state => state.yuyue,
  topContactsLists: state => state.topContactsLists,
  phoneConfig: state => state.phoneConfig,
  phoneBinded: state => state.phoneBinded,
}

const actions = {
    async getLinkManLists({commit},data){
      let params = {
        //branchId: '2336',
        ChnlId: '62'
      }
      let res = await vm.request.$post('QryPayeeList', params, true);
      commit(LINKMANLISTS, res.AcctPayeeList)
    },
    getTopContactsLists({commit},data){
      vm.request.$post('QueryTopContacts',{},true
      ).then((res) => {
        console.log("获取常用联系人",res)
        if(res.CommonlyPayeeList){
          let topLinkList = [...res.CommonlyPayeeList];
          for(let group of topLinkList){
            console.log(group,"edw1")
            if(group.ower){
              for(let item of group.ower){
                if(item.payeeBankNbr){
                  item.bankId = item.payeeBankNbr.substring(0,3);
                }
                if(item.payeeOpenAcctBankCode){
                  item.bankId = item.payeeOpenAcctBankCode.substring(0,3);
                };
              }
            }else{
              group.ower = [];
            }
            if(group.other){
              for(let item of group.other){
                if(item.payeeBankNbr){
                  item.bankId = item.payeeBankNbr.substring(0,3);
                }
                if(item.payeeOpenAcctBankCode){
                  item.bankId = item.payeeOpenAcctBankCode.substring(0,3);
                };
              }
            }else{
              group.other = [];
            }
          }
          commit(TOPCONTACTSLISTS, topLinkList)
        }
        
      }).catch((error) => {
        console.log(error)
        let toplist = [{ower:[]},{other:[]}]
        commit(TOPCONTACTSLISTS, toplist)
      })
    },
}

const mutations = {
  [LINKMANLISTS](state,data){
    state.linkManLists = data
  },
  [YUYUE](state,data){
    state.yuyue = data
  },
  [TOPCONTACTSLISTS](state,data){
    // 转换成规范格式
    // 前端页面处理利用下标，但是后台数据没有返回 ，后期可优化
    if(data.length == 0){
      data = [{ower:[]},{other:[]}]
    }
    if(data.length == 1){
      if(data[0].other.length > 0){
        let item  = {
          other: data[0].other
        }
        data.push(item);
        data[0].ower = [];
      }
      if(data[0].ower.length > 0){
        let item  = {
          other: []
        }
        data.push(item);
      }
    }
    console.log(data)
    state.topContactsLists = data
  },
  [PHONECONFIG](state,data){
    if(data.payeeCardList.length > 0){
      data.selectItem = data.payeeCardList[0];
      for(let item of data.payeeCardList){
        if(item.AcNo == data.cardNo){
          data.selectItem = item;
        }
      } 
    }else{
      data.selectItem = {
        Phone: '',
      }
    }
    state.phoneConfig = data;
   
  },
  [PHONEBINDED](state,data){
    state.phoneBinded = data;
  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
