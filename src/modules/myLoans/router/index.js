import Vue from "vue";
import Router from "vue-router";
import Index from "../pages/index";
import MyLoans from "./myLoans";
import houseLoans from "./houseLoans";
import easySecLoans from "./easySecLoans";
import quickLoans from "./quickLoans";
import assetLoans from "./assetLoans";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: {
        title: "贷款",
        keepAlive: true
      }
    },
    ...MyLoans,
    ...houseLoans,
    ...easySecLoans,
    ...quickLoans,
    ...assetLoans
  ]
});
