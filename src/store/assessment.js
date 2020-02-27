export const SET_ASSESSMENT_LIST = 'ASSESSMENT_LIST'
export const SET_ASSESSMENT_OPTIONS = 'ASSESSMENT_OPTIONS'
export const SET_ASSESSMENT_DATA = 'ASSESSMENT_DATA'
const state = {
    assessmentList: [],
    // [
    //     {
    //         content: "您的年龄是？",
    //         options: ["18-25", "26-50", "51-60", "61-65", "高于65"]
    //     },
    //     {
    //         content:
    //             "您的家庭总资产净值为（折合人民币）？(不包括自用住宅和私营企业等实业投资，包括储蓄、保险、金融投资、实物投资，并需扣除未结清贷款、信用卡账单等债务)",
    //         options: [
    //             "15万元及以下",
    //             "15万元（不含）-50万元（含）",
    //             "50万元（不含）-100万元（含）",
    //             "100万元（不含）-1000万元（含）",
    //             "1000万元（不含）以上（10）"
    //         ]
    //     },
    //     {
    //         content:
    //             "您的家庭总资产净值为（折合人民币）？(不包括自用住宅和私营企业等实业投资，包括储蓄、保险、金融投资、实物投资，并需扣除未结清贷款、信用卡账单等债务)",
    //         options: [
    //             "15万元及以下",
    //             "15万元（不含）-50万元（含）",
    //             "50万元（不含）-100万元（含）",
    //             "100万元（不含）-1000万元（含）",
    //             "1000万元（不含）以上（10）"
    //         ]
    //     },
    //     {
    //         content:
    //             "您的家庭总资产净值为（折合人民币）？(不包括自用住宅和私营企业等实业投资，包括储蓄、保险、金融投资、实物投资，并需扣除未结清贷款、信用卡账单等债务)",
    //         options: [
    //             "15万元及以下",
    //             "15万元（不含）-50万元（含）",
    //             "50万元（不含）-100万元（含）",
    //             "100万元（不含）-1000万元（含）",
    //             "1000万元（不含）以上（10）"
    //         ]
    //     },
    //     {
    //         content:
    //             "您的家庭总资产净值为（折合人民币）？(不包括自用住宅和私营企业等实业投资，包括储蓄、保险、金融投资、实物投资，并需扣除未结清贷款、信用卡账单等债务)",
    //         options: [
    //             "15万元及以下",
    //             "15万元（不含）-50万元（含）",
    //             "50万元（不含）-100万元（含）",
    //             "100万元（不含）-1000万元（含）",
    //             "1000万元（不含）以上（10）"
    //         ]
    //     },
    //     {
    //         content:
    //             "您的家庭总资产净值为（折合人民币）？(不包括自用住宅和私营企业等实业投资，包括储蓄、保险、金融投资、实物投资，并需扣除未结清贷款、信用卡账单等债务)",
    //         options: [
    //             "15万元及以下",
    //             "15万元（不含）-50万元（含）",
    //             "50万元（不含）-100万元（含）",
    //             "100万元（不含）-1000万元（含）",
    //             "1000万元（不含）以上（10）"
    //         ]
    //     },
    //     {
    //         content:
    //             "您的家庭总资产净值为（折合人民币）？(不包括自用住宅和私营企业等实业投资，包括储蓄、保险、金融投资、实物投资，并需扣除未结清贷款、信用卡账单等债务)",
    //         options: [
    //             "15万元及以下",
    //             "15万元（不含）-50万元（含）",
    //             "50万元（不含）-100万元（含）",
    //             "100万元（不含）-1000万元（含）",
    //             "1000万元（不含）以上（10）"
    //         ]
    //     }
    // ],
    assessmentOptions: [],
    assessmentData: {
        hasAssessment: true
    },
    ExamPaperNum:0,
    detailFlag: null,
}

const getters = {
    assessmentList: state => state.assessmentList,
    assessmentOptions: state => state.assessmentOptions,
    assessmentData: state => state.assessmentData,
}

const actions = {
    setAssessmentList({ commit }, data) {
        commit(SET_ASSESSMENT_LIST, data)
    },
    setAssessmentOptions({ commit }, data) {
        commit(SET_ASSESSMENT_OPTIONS, data)
    },
    setAssessmentData({ commit }, data) {
        commit(SET_ASSESSMENT_DATA, data)
    },
}

const mutations = {
    [SET_ASSESSMENT_LIST](state, data) {
        state.assessmentList = data
    },
    [SET_ASSESSMENT_OPTIONS](state, data) {
        state.assessmentOptions = data
    },
    [SET_ASSESSMENT_DATA](state, data) {
        state.assessmentData = data
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
