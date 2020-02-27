export const SET_PRODUCTINFO = 'PRODUCTINFO'
const state = {
    productInfo:null
}

const getters = {
    productInfo: state => state.productInfo,
}

const actions = {
    setProductInfo({ commit }, data) {
        commit(SET_PRODUCTINFO, data)
    },

}

const mutations = {
    [SET_PRODUCTINFO](state, data) {
        state.productInfo = data
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
