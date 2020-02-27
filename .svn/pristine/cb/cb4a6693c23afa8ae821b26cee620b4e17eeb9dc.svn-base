const state = {
  loginInfo: {}, //登录信息
  cardLists: [], //卡列表
  bankCardNum: {} //选取到的卡号
};

const getters = {
  //计算属性
};

const actions = {
  updateUserName(commit, payload) {
    commit(updateUserName, payload);
  },
  updateCardLists(commit, payload) {
    commit(updateUserName, payload);
  }
};

const mutations = {
  //卡列表
  updataCardLists(state, payload) {
    state.cardLists = payload;
  },
  //更改选取到的详情
  updataCardInfo(state, payload) {
    state.cardLists[payload.index].aliasName = payload.info;
    console.log(payload.info);
  },
  //更改选取到的详情
  updataCardNum(state, payload) {
    state.bankCardNum = payload;
    console.log(state.bankCardNum);
  },
  //登录信息
  updataLoginInfo(state, payload) {
    state.loginInfo = payload;
    console.log(state.loginInfo);
  },
  //更改登录信息的核心客户号
  updataCifNo(state, payload) {
    state.loginInfo.EcifContId = payload;
    console.log(state.loginInfo.EcifContId);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
