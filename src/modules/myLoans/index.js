
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'

import "@/lib/commend/WVJSBridge"
import "@/lib/commend/nativecall"
import './components/EPaper.min.js'

import store from '@/store/store.js'
Vue.use(vuex);
import request from '@/axios/http.js'
import '@/filter/filter'
import '@/tools/tools'
import '@/tools/directive'
import 'mint-ui/lib/style.css'
import '@/assets/IconFont/iconfont.css'
import 'mand-mobile/lib-vw/mand-mobile.css'
import "normalize.css"
import Mint from 'mint-ui'
Vue.use(request);
import { Button,Dialog, } from "vant";
Vue.use(Dialog).use(Button);
Vue.config.productionTip = false;
Vue.prototype.$Save = new Object();

window.vm = new Vue({
  el: '#app',
  router,
  store,
  data:{
    request:request
  },
  render: h => h(App)
})
