export const SELECTFUND = 'SELECTFUND'
export const SELECTPOSITION = 'SELECTPOSITION'
export const SELECTFUNDPLAN = 'SELECTFUNDPLAN' 
export const TOROUTERNAME = 'TOROUTERNAME' 
const state = {
  // 已选择的基金
  selectFund:{
    productName: "",
    productNo: "",
  },
  // 已选择的持仓
  selectPosition:{
    productName: "",
    productNo: "",
  },
  // 已选择的定投
  selectFundPlan:{
    productName: "",
    productNo: "",
  },
  toRouterName: '',//要跳转路由的名字
}

const getters = {
  selectFund: state => state.selectFund,
  selectPosition: state => state.selectPosition,
  selectFundPlan: state => state.selectFundPlan,
  toRouterName: state => state.toRouterName,
}

const actions = {
    updateFund({commit}, data){
      // 判断是否需要更新基金
      if(this.state.fund.selectFund.productNo != data){
        let params = {
          BranchId: 'PHNE',
          ChnlId: '62',
          ProductType: '0',
          PositionString: '1',
          QueryRowsNum: '20',
          QueryFields: 'prd_serial~serial_periods~prd_label',
          ProductNo: data,
        }
        console.log("window",window)
        vm.request.$post('FinancialProMsgQry', params).then(res => {
          let { ProductInfo } = res;
          if (ProductInfo.length > 0) {
            commit(SELECTFUND, res.ProductInfo[0]);
            console.log("更新基金",this.state.fund.selectFund)
          }
        })
      }
    },
}

const mutations = {
  [SELECTFUND](state,data){
    state.selectFund = data
  },
  [SELECTPOSITION](state,data){
    state.selectPosition = data
  },
  [SELECTFUNDPLAN](state,data){
    state.selectFundPlan = data
  },
  [TOROUTERNAME](state,data){
    state.toRouterName = data
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
