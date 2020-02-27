// 理财模块
export default {
    //产品公告查询
    prodNoticeListQry: {
        url: "/pmobile/pweb-ifms.ProdNoticeListQry.do",
        method: "post"
    },
    //产品购买 已测
    financialPurchase: {
        url: "/pmobile/pweb-ifms.FinancialPurchase.do",
        method: "post"
    },
    //产品撤销 已测
    financialProdCancel: {
        url: "/pmobile/pweb-ifms.FinancialProdCancel.do",
        method: "post"
    },
    // 理财列表查询 //已测
    financialProductListQry: {
        url: "/pmobile/transfer.FinancialProductListQry.do",
        method: "post"
    },
    // 理财签约 //已测
    financialContract: {
        url: "/pmobile/pweb-ifms.FinancialContract.do",
        method: "post"
    },
    //理财产品信息查询
    financialProMsgQry: {
        url: "/pmobile/pweb-ifms.FinancialProMsgQry.do",
        method: "post"
    },
    // 客户持有理财列表查询
    customerHolProdListQry: {
        url: "/pmobile/pweb-ifms.CustomerHolProdListQry.do",
        method: "post"
    },
    //风险评估试卷 //已测
    riskTestQry: {
        url: "/pmobile/pweb-invest.RiskTestQry.do",
        method: "post"
    },
    //风险评估提交 //已测
    riskTest: {
        url: "/pmobile/pweb-invest.RiskTest.do",
        method: "post"
    },
    // 理财签约信息查询 //已测
    financialContractQry: {
        url: "/pmobile/pweb-ifms.FinancialContractQry.do",
        method: "post"
    },
    //理财购买 //已测
    financialPurchase: {
        url: "/pmobile/pweb-ifms.FinancialPurchase.do",
        method: "post"
    },
    //理财产品购买确认
    financialPurchaseConfirm: {
        url: "/pmobile/pweb-ifms.FinancialPurchaseConfirm.do",
        method: "post"
    },
    //历史成交查询
    fundHistoryTrsQry: {
        url: "/pmobile/pweb-fund.FundHistoryTrsQry.do",
        method: "post"
    },
    //交易历史查询 //已测
    fundEntrustHisListQry: {
        url: "/pmobile/pweb-fund.FundEntrustHisListQry.do",
        method: "post"
    },
    //理财购买撤销
    financialProdCancel: {
        url: "/pmobile/pweb-ifms.FinancialProdCancel.do",
        method: "post"
    },
    //理财购买历史交易记录 //已测
    hisTansRecordQry: {
        url: "/pmobile/pweb-ifms.HisTansRecordQry.do",
        method: "post"
    },
    // 理财委托中查询 已测
    fundEntrustCurListQry: {
        url: "/pmobile/pweb-fund.FundEntrustCurListQry.do",
        method: "post"
    },
    // 查询是否是白名单 //已测
    whiteListQry: {
        url: "/pmobile/pweb-customer.WhiteListQry.do",
        method: "post"
    },
    //查询本人二类卡
    twoAccountQry: {
        url: "/pmobile/pweb-customer.TwoAccountQry.do",
        method: "post"
    },
    // 查询用户等级 已测
    customerInfoQry: {
        url: "/pmobile/pweb-ifms.CustomerInfoQry.do",
        method: "post"
    },
    //用户等级是否匹配 已测
    riskMatchValidate: {
        url: "/pmobile/pweb-fund.RiskMatchValidate.do",
        method: "post"
    },
    //持仓中 //废弃
    // cusFinaDetQry: {
    //     url: "/pmobile/pweb-ifms.CusFinaDetQry.do",
    //     method: "post"
    // },
    //已终止
    finaTerminatedQry: {
        url: "/pmobile/pweb-ifms.FinaTerminatedQry.do",
        method: "post"
    },
    //赎回
    financialRedeem: {
        url: "/pmobile/pweb-ifms.FinancialRedeem.do",
        method: "post"
    },
    //折线图
    PrdSeriesQry: {
        url: "/pmobile/pweb-ifms.PrdSeriesQry.do",
        method: "post"
    },
    //风险评估确认
    RiskTestConfirm: {
        url: "/pmobile/pweb-invest.RiskTestConfirm.do",
        method: "post"
    },
    //签约确认
    FinancialContractConfirm: {
        url: "/pmobile/pweb-ifms.FinancialContractConfirm.do",
        method: "post"
    },
    //风险等级更新
    CustomRiskGrateUpdate: {
        url: "/pmobile/pweb-ifms.CustomRiskGrateUpdate.do",
        method: "post"
    },
    //风险等级确认
    CustomRiskGrateUpdateConfirm: {
        url: "/pmobile/pweb-ifms.CustomRiskGrateUpdateConfirm.do",
        method: "post"
    },
    //持仓总额
    CustomerAssetSumQry: {
        url: "/pmobile/pweb-ifms.CustomerAssetSumQry.do",
        method: "post"
    },
    //持仓中
    FinancialPositionQry: {
        url: "/pmobile/pweb-ifms.FinancialPositionQry.do",
        method: "post"
    },
    financialProdCancelConfirm: {
        url: "/pmobile/pweb-ifms.FinancialProdCancelConfirm.do",
        method: "post"
    },
    //查询个人信息
    PersonBaseInfoQry: {
        url: "/pmobile/pweb-customer.PersonBaseInfoQry.do",
        method: "post"
    },
    //封闭产品净值
    FinaQuotationQry: {
        url: "/pmobile/pweb-ifms.FinaQuotationQry.do",
        method: "post"
    },
    //我的理财持仓中产品能否撤销
    AllowCancleQry: {
        url: "/pmobile/pweb-ifms.AllowCancleQry.do",
        method: "post"
    },
    //我的理财周期型产品更改周期
    CusCycleSequel: {
        url: '/pmobile/pweb-ifms.CusCycleSequel.do',
        method: "post"
    },
    //持仓中货币型赎回确认
    FinaRealTimeRedemptionConfirm: {
        url: "/pmobile/pweb-ifms.FinaRealTimeRedemptionConfirm.do",
        method: "post"
    },
    //持仓中货币型赎回
    FinaRealTimeRedemption: {
        url: "/pmobile/pweb-ifms.FinaRealTimeRedemption.do",
        method: "post"
    },
    //历史对账单 资产净值
    CustomerHolProdListQry: {
        url: "/pmobile/pweb-ifms.CustomerHolProdListQry.do",
        method: "post"
    },
    //公告
    BankBulletinQry: {
        url: "/pmobile/pweb-customer.BankBulletinQry.do",
        method: "post"
    },
    //理财详情页跳转到购买
    FinancialBuy: {
        url: "/pmobile/pweb-ifms.FinancialBuy.do",
        method: "post"
    },
    //客服电话
    ManagerInfoQry: {
        url: '/pmobile/pweb-customer.ManagerInfoQry.do',
        method: "post"
    },
    //协议
    FinancialStatementQry:{
        url:'/pmobile/pweb-ifms.FinancialStatementQry.do',
        method:"post"
    },
    //净值列表
    ProValueListQry:{
        url:'/pmobile/pweb-ifms.ProValueListQry.do',
        method:"post"
    }
}