
export const ADD_DATA = "ADD_DATA"
// 数据
const state = {
  params:{
  BranchId: "9999",
  ChnlId: "62",
  BankId: "9999",
  bankName:"中旅银行",
  },
  data:{
    test:'ok'
  }
};
// 计算属性
const  getters ={
    Adddata:state => state.data
};
// 同步更新
const mutations={
  updateparmas(state,data){
    state.parmas = data;
  },
  updatedata(state,data){
    state.data=data;
  },
  [ADD_DATA](state, data) {
    state.data = data
  },
};
// 更新数据
const actions={
  updateUserName(context, data) {
    context.commit(updateparmas, data);
  },
  updatedata(context, data) {
    context.commit(updatedata, data);
  },
  adddata({commit}, data) {
    commit(ADD_DATA, data)
  },
}
export default{
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
