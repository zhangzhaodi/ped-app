import HouseIndex from "../pages/houseLoans/index";
import AssessResult from "../pages/houseLoans/assessResult";
import DrawMoney from "../pages/houseLoans/drawMoney";
import PayoutRequest from "../pages/houseLoans/payoutRequest";

export default [
  {
    path: "/houseLoans/index",
    name: "houseIndex",
    component: HouseIndex,
    meta: {
      title: "房易贷",
      keepAlive: true
    }
  },
  {
    path: "/houseLoans/assessResult",
    name: "assessResult",
    component: AssessResult,
    meta: {
      title: "评估结果",
      keepAlive: true
    }
  },
  {
    path: "/houseLoans/drawMoney",
    name: "drawMoney",
    component: DrawMoney,
    meta: {
      title: "提款金额",
      keepAlive: true
    }
  },
  {
    path: "/houseLoans/payoutRequest",
    name: "payoutRequest",
    component: PayoutRequest,
    meta: {
      title: "提款申请",
      keepAlive: true
    }
  }
];
