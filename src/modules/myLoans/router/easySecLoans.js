import EasyIndex from "../pages/easySecLoans/index";
import EasyResult from "../pages/easySecLoans/assessResult";
import EasyMoney from "../pages/easySecLoans/drawMoney";
import EasyRequest from "../pages/easySecLoans/payoutRequest";
import EasyConfirm from "../pages/easySecLoans/drawConfirm";
import IdInfoConfirm from "../pages/easySecLoans/idInfoConfirm";
import QuotaApply from "../pages/easySecLoans/quotaApply";
import ContractSign from "../pages/easySecLoans/contractSign";
import DrawResult from "../pages/easySecLoans/drawResult";
import ApplyResult from "../pages/easySecLoans/applyResult";

export default [
  {
    path: "/easySecLoans/index",
    name: "easyIndex",
    component: EasyIndex,
    meta: {
      title: "易秒贷",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/assessResult",
    name: "easyResult",
    component: EasyResult,
    meta: {
      title: "评估结果",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/payoutRequest",
    name: "easyRequest",
    component: EasyRequest,
    meta: {
      title: "提款申请",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/drawMoney",
    name: "easyMoney",
    component: EasyMoney,
    meta: {
      title: "提款金额",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/drawConfirm",
    name: "easyConfirm",
    component: EasyConfirm,
    meta: {
      title: "提款确认",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/drawResult",
    name: "drawResult",
    component: DrawResult,
    meta: {
      title: "提款结果",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/idInfoConfirm",
    name: "idInfoConfirm",
    component: IdInfoConfirm,
    meta: {
      title: "身份信息验证",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/quotaApply",
    name: "quotaApply",
    component: QuotaApply,
    meta: {
      title: "额度申请",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/contractSign",
    name: "contractSign",
    component: ContractSign,
    meta: {
      title: "额度申请",
      keepAlive: true
    }
  },
  {
    path: "/easySecLoans/applyResult",
    name: "applyResult",
    component: ApplyResult,
    meta: {
      title: "申请结果",
      keepAlive: true
    }
  }
];
