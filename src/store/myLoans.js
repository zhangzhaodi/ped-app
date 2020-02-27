
export const SET_USERINFO = "SET_USERINFO"
// 数据
const state = {
  params:{
  BranchId: "9999",
  ChnlId: "62",
  BankId: "9999",
  bankName:"中旅银行",
  },
  info:{
  }
};
// 计算属性
const  getters ={
    Setuserinfo:state => state.info
};
// 同步更新
const mutations={
  updateparmas(state,data){
    state.parmas = data;
  },
  updatedata(state,data){
    state.data=data;
  },
  [SET_USERINFO] (state, data) {
    state.info = data
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
  setuserinfo ({commit}, data) {
    commit(SET_USERINFO, data)
  },
}
export default{
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
