export default {
      QrySignTypes: { // 可签约类型查询
    url: '/api/paymenttype/signunits/paymenttypes',
    method: 'get'
  },
  QryTypeList: { // 2001查询全部筛选项目类型
    url: '/api/paymenttype/paymenttypes',
    method: 'get'
  },
  QryPayCities: { // 2002根据缴费类型，查询缴费城市
    url: '/api/paymenttype/paycities/{payTypeNo}',
    method: 'get'
  },
  QryPayUnits: { // 2003根据缴费类型和城市，查询缴费单位
    url: '/api/paymenttype/payunits/{payTypeNo}/{payCityCode}',
    method: 'get'
  },
  QrySignCities: { // 2004签约类型，查询签约城市
    url: '/api/paymenttype/signcities/{signTypeNo}',
    method: 'get'
  },
  QrySignUnits: { // 2005签约类型和城市，查询签约单位
    url: '/api/paymenttype/signcities/{signTypeNo}/{signCityCode}',
    method: 'get'
  },
  QryPayTypes: { // 2006根据城市编号查询缴费类型（首页缴费入口）
    url: '/api/paymenttype/{cityCode}',
    method: 'get'
  },
  QryPayArrearage: { // 3001缴费号码欠费查询（缴费）
    url: '/api/cfpchargelife/arrearage',
    method: 'get'
  },
  QrySignArrearage: { // 3002缴费号码信息查询（签约）
    url: '/api/cfpchargelife/agent/arrearage',
    method: 'get'
  },
  AddSign: { // 3003签约
    url: '/api/cfpchargelife/agent/sign',
    method: 'post'
  },
  DelUnSign: { // 3004解约
    url: '/api/cfpchargelife/agent/unSign',
    method: 'post'
  },
  QrySignInfo: { // 4001签约管理
    url: '/api/paymentnumberhist/signinfo',
    method: 'get'
  },
  QryHisNoAll: { // 4002历史缴费号码查询（全部）
    url: '/api/paymentnumberhist/all',
    method: 'get'
  },
  QryHisNoLess: { // 4003历史缴费号码查询（首页展示部分）
    url: '/api/paymentnumberhist/less',
    method: 'get'
  },
  DelHisNo: { // 4004删除历史缴费号码
    url: '/api/paymentnumberhist/remove',
    method: 'delete'
  },
  QryPayDetail: { // 4005缴费明细列表查询
    url: '/api/paymentdetail',
    method: 'get'
  },
  QryCityList: { // 5001城市列表
    url: '/api/city',
    method: 'get'
  },
  Login: { // 6001登录
    url: '/api/user/{channelNo}/{channelUserNo}',
    method: 'get'
  },
  AddPayment: { // 6002新增缴费
    url: '/api/user/payment',
    method: 'post'
  },
  AddBindCard: { // 6003新增绑卡
    url: '/api/user/card',
    method: 'post'
  },
  QryQa: { // 1001客服问题查询
    url: '/api/qa',
    method: 'get'
  },
  QryAdPosition: { // 1002广告位查询（num:1首页2缴费结果页3签约结果页）
    url: '/api/ims/adPosition/{num}',
    method: 'get'
  },
  DataPaySign: { // 缴费数据请求加密
    url: '/api/cfpchargelife/signdata',
    method: 'post'
  },
  QryPaymentDetail: { // 缴费订单结果查询
    url: '/api/paymentdetail/{orderId}',
    method: 'get'
  },
  SendOTP: {
    url: '/api/ims/sendOTP',
    method: 'post'
  },
  Provider: { // 测试信息加密跳转;上线要删除
    url: '/api/access/encryptThirdData',
    method: 'get'
  },
  QryPhoneAttribution: { // 3005号码归属地查询
    url: '/api/cfpchargelife/agent/phoneAttribution',
    method: 'get'
  },
  QryPhoneCombo: { // 3006话费流量套餐查询
    url: '/api/cfpchargelife/phoneCombo',
    method: 'get'
  },
  QryPhoneHist: { // 3007话费流量历史号码查询
    url: '/api/cfpchargelife/phoneHist',
    method: 'get'
  },
  //账户加挂
  addAccount: {
    url: "/pmobile/pweb-customer.CAcctAddZL.do",
    method: "post"
  },
  //加挂列表
  accountList: {
    url: "/pmobile/pweb-customer.QryUserAddCardList.do",
    method: "post"
  },
}