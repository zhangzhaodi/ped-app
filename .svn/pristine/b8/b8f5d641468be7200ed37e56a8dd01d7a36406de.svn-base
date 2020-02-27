/*引入Vue框架*/
import Vue from 'vue'
import API from './api'
/*引入资源请求插件*/
import axios from 'axios'
import "@/lib/commend/WVJSBridge"
import "@/lib/commend/nativecall"
import MessageBox from '@/components/MessageBox/message-box'
import { Toast } from "vant"
import Loading from '@/components/Loading/loading'
Vue.use(Loading)
import {
  Indicator
} from 'mint-ui'
const placeholder = /\{(\w+)\}?/gi //占位符
Vue.use(API)

// axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.baseURL = process.env.API_BASE
axios.defaults.withCredentials = true

// 超时时间
axios.defaults.timeout = 180 * 1000
axios.interceptors.request.use(config => {
  // console.log('*********START**********')
  // console.log(config)
  // console.log(config.url)
  // const token = 'xxxxxxx'
  let token = sessionStorage.getItem('token')
  // console.log('*********TOKEN**********' + token)
  if (token) {
    config.headers['Authorization'] = token
  }
  if (!config.hideLoadFlag) {
    showLoad()
  }
  return config
}, error => {
  // setTimeout(() => {
  hideLoad()
  MessageBox({
    message: '网络请求中断，请稍候再试~'
  })
  // }, axios.defaults.timeout)
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(res => { // 响应成功关闭loading
  // console.log(res)
  hideLoad()
  if (res.status === 200) {
    if (res.config.method.toLowerCase() === "post" || res.config.method.toLowerCase() === 'delete') {
      sessionStorage.setItem('token', res.data.token)
      // console.log('******token*****' + res.data.token)
    }
    if (res.data.ReturnCode === '000000' || res.data._RejCode === '000000') {
      return res.data
    } else {
      console.log('******ERROR********')
      let err = new Error()
      err = res.data
      // Toast(err._RejMessage)
      throw err
    }
  } else {
    console.log("非200报错")
    throw res
  }
}, error => {
  // setTimeout(() => {
  hideLoad()
  // alert(JSON.stringify(error))
  MessageBox({
    message: '网络开小差了，请稍候再试~'
  })
  // }, axios.defaults.timeout)
  return Promise.reject(error)
})

let loadingCount = 0
export function showLoad() {
  // if (loadingCount === 0) {
  //   // Indicator.open()
  // }
  // loadingCount++
  Vue.prototype.$loading.show()
}
export function hideLoad() {
  // if (loadingCount <= 0) return
  // loadingCount--
  // if (loadingCount === 0) {
  //   // Indicator.close()
  // }
  Vue.prototype.$loading.hide()
}

export function buildPath(url, path) {
  if (!path) return url
  return url.replace(placeholder, function ($1, $2) {
    return $2 = encodeURIComponent(path[$2])
  })
}

// export default axios
// hideLoadFlag false显示默认true
function apiAxios(url, payload, hideLoadFlag, isToast = false) {
  // console.log(process.env,window.NativeCall)
  const req = API[url]
  const urlPath = payload && payload.path ? buildPath(req.url, payload.path) : req.url
  const params = payload ? payload : null
  const data = payload && payload.data ? payload.data : null
  // console.log(urlPath,"请求路径")
  //
  if (process.env.NODE_ENV == "production") {
    if (!hideLoadFlag) {
      showLoad()
    }
    return new Promise((resolve, reject) => {
      window.NativeCall.sendRequest(urlPath, params, data => {
        let res = JSON.parse(data)
        if (res.ReturnCode == '000000' || res._RejCode == '000000') {
          if (!hideLoadFlag) {
            hideLoad()
          }
          resolve(res)
        } else {
          if (!hideLoadFlag) {
            hideLoad()
          }
          reject(res)
          if (res._RejCode == "TimeOut" || res._RejCode == "999999") {
            // MessageBox({
            //   message:res._RejMessage
            // })
            //true 展示 false 不展示
            if (isToast) {
              console.log(isToast)
            } else {
              Toast(res._RejMessage)
            }
          }
        }
      })
    });
  }

  if (process.env.NODE_ENV == "development") {
    return new Promise((resolve, reject) => {
      axios({
        url: urlPath,
        method: req.method.toUpperCase(),
        data: payload && payload.data ? payload.data : null,
        params: payload ? payload : null,
        hideLoadFlag: hideLoadFlag
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
        //true 展示 falsa 不展示
        if (isToast) {
          console.log(isToast)
        } else {
          Toast(error._RejMessage)
        }
        // MessageBox({
        //   message:error._RejMessage
        // })
      })
    })
  }
  if (process.env.NODE_ENV == "nginx") {
    return new Promise((resolve, reject) => {
      axios({
        url: urlPath,
        method: req.method.toUpperCase(),
        data: payload && payload.data ? payload.data : null,
        params: payload ? payload : null,
        hideLoadFlag: hideLoadFlag
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

function apiAxiosUrl(url, payload, hideLoadFlag) {
  const urlPath = payload && payload.path ? buildPath(url, payload.path) : url
  return new Promise((resolve, reject) => {
    axios({
      url: urlPath,
      method: 'GET',
      data: payload && payload.data ? payload.data : null,
      params: payload && payload.params ? payload.params : null,
      hideLoadFlag: hideLoadFlag
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
export default {
  install: function (Vue) {
    Vue.prototype.request = (url, payload, hideLoadFlag, isToast) => apiAxios(url, payload, hideLoadFlag, isToast)
    Vue.prototype.requestget = (url, payload, hideLoadFlag) => apiAxiosUrl(url, payload, hideLoadFlag)
  },
  $post: (url, payload, hideLoadFlag) => apiAxios(url, payload, hideLoadFlag)
}
