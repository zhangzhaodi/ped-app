export default {
    //资金归集签约 
    CrossBankCollectionSign: {
        url: "/pmobile/transfer.CrossBankCollectionSign.do",
        method: "post"
    },
    //资金归集实时确认
    CrossBankCollectionConfirm: {
        url: "/pmobile/transfer.CrossBankCollectionConfirm.do",
        method: "post"
    },
    //资金归集实时交易
    CrossBankCollection: {
        url: "/pmobile/transfer.CrossBankCollection.do",
        method: "post"
    },
    //查询账号的交易名（付款卡、签约列表）
    CrossBankGetheringQry: {
        url: "/pmobile/transfer.CrossBankGetheringQry.do",
        method: "post"
    },
    //实时收款
    CrossBankCollection: {
        url: "/pmobile/transfer.CrossBankCollection.do",
        method: "post"
    },
    //实时收款确认
    CrossBankCollectionConfirm: {
        url: "/pmobile/transfer.CrossBankCollectionConfirm.do",
        method: "post"
    },
    //定时收款签约确认
    TimingReceiptNewEntryConfirm: {
        url: "/pmobile/transfer.TimingReceiptNewEntryConfirm.do",
        method: "post"
    },
    //定时收款签约
    TimingReceiptNewEntry: {
        url: "/pmobile/transfer.TimingReceiptNewEntry.do",
        method: "post"
    },
    //解约
    TimingReceiptDel: {
        url: "/pmobile/transfer.TimingReceiptDel.do",
        method: "post"
    },
    //银行卡列表
    BankListQry: {
        url: "/pmobile/transfer.BankListQry.do",
        method: "post"
    },
    //短信验证码
    // SendSmsOtp: {
    //     url: "/pmobile/SendSmsOtp.do",
    //     method: "post"
    // },
    SendSmsOtp: {
        url: "/pmobile/SendSmsOtp.do",
        method: "post"
    },
    //资金归集详情
    QueryTransBookingDetail: {
        url: "/pmobile/transfer.QueryTransBookingDetail.do",
        method: "post"
    },
    //查询客户在对应银行是否有卡
    MobileBindQry: {
        url: "/pmobile/transfer.MobileBindQry.do",
        method: "post"
    },
    //手机号收款确认
    MobileCrossBankCollectionConfirm: {
        url: "/pmobile/transfer.MobileCrossBankCollectionConfirm.do",
        method: "post"
    },
    //手机号收款
    MobileCrossBankCollection: {
        url: "/pmobile/transfer.MobileCrossBankCollection.do",
        method: "post"
    },
    MobileCrossBankCollectionAuthen: {
        url: "/pmobile/transfer.MobileCrossBankCollectionAuthen.do",
        method: "post"
    },
}