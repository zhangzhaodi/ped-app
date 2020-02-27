export const SET_ADD_DATA = 'ADD_DATA'
export const SET_CHARGE_DATA = 'CHERGE_DATA'
export const SET_CARDADD_DATA = 'CARDADD_DATA'

const state = {
  AddData: {},
  ChargeData: {},
  CardAddData: {}
}

const getters = {
  AddData: state => state.AddData,
  ChargeData: state => state.ChargeData,
  CardAddData: state => state.CardAddData
}

const actions = {
  setAddData ({commit}, data) {
    commit(SET_ADD_DATA, data)
  },
  setChargeData ({commit}, data) {
    commit(SET_CHARGE_DATA, data)
  },
  setCardAddData ({commit}, data) {
    commit(SET_CARDADD_DATA, data)
  }
}

const mutations = {
  [SET_ADD_DATA] (state, data) {
    state.AddData = data
  },
  [SET_CHARGE_DATA] (state, data) {
    state.ChargeData = data
  },
  [SET_CARDADD_DATA] (state, data) {
    state.CardAddData = data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
