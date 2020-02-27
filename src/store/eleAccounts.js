export const ELEFORM = 'ELEFORM'
const state = {
  eleForm:{
    BranchId:"",
    username: '',
    phone: '',
    IDCard: '',
    bankCard: '',
    UserId:'',
    ChnlId:'',
    ChannelCd:'',
    bankName: '',
    eduBack: '',
    job: '',
    address: '',
    workplace: '',
    network: {
      name: '',
      id: ''
    }
  }
}

const getters = {
  eleForm: state => state.eleForm,
}

const actions = {
  updateEleForm ({commit}, data) {
    commit(ELEFORM, data)
  },
}

const mutations = {
  [ELEFORM] (state, data) {
    state.eleForm = data;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
