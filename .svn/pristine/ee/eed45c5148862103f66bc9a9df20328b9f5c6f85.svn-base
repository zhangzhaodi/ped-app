/**
 * 添加自定义指令
 */
import Vue from 'vue'
Vue.directive('view', {
  inserted: function (el) {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    console.log('1111111')
    console.log(isAndroid)
    if (isAndroid) {
      el.addEventListener('click', intoview)
    }
    function intoview () {
      console.log('intoview...')
      let MinclientHeight
      for (let i = 1; i < 4; i++) {
        setTimeout(function () {
          MinclientHeight = document.documentElement.clientHeight
          console.log(MinclientHeight)
          let eleRect = el.getBoundingClientRect()
          console.log(eleRect)
          if (eleRect.bottom > MinclientHeight) {
            el.scrollIntoView(false)
          }
        }, i * 200)
      }
    }
  },
  unbind: function (el) {
    console.log('unbind....')
    el.removeEventListener('click', intoview)
    function intoview () {
      console.log('intoview22.....')
      let MinclientHeight
      for (let i = 1; i < 4; i++) {
        setTimeout(function () {
          MinclientHeight = document.documentElement.clientHeight
          let eleRect = el.getBoundingClientRect()
          if (eleRect.bottom > MinclientHeight) {
            el.scrollIntoView(false)
          }
        }, i * 200)
      }
    }
  }
})
Vue.directive('MoneyInputToView', {
  inserted: function (el) {
    el.addEventListener('click', intoview)
    function intoview () {
      setTimeout(function () {
        let MinclientHeight = document.documentElement.clientHeight
        let PageHeight = document.getElementsByClassName('scrollerBox')[0].clientHeight
        let scrollTop = document.getElementsByClassName('scrollerBox')[0].scrollTop
        let bottom = el.getBoundingClientRect().bottom
        if (PageHeight < MinclientHeight && !document.getElementById('empty__div')) {
          let emptyDiv = document.createElement('div')
          emptyDiv.style.height = '282px'
          emptyDiv.id = 'empty__div'
          document.getElementsByClassName('scrollerBox')[0].appendChild(emptyDiv)
        }
        let NeedScroll = scrollTop + bottom - (MinclientHeight - 269) + 20
        if (NeedScroll > 0) {
          // document.getElementsByClassName('scrollerBox')[0].scrollTop = NeedScroll
          el.scrollIntoView(true)
          document.documentElement.scrollTop = 280
        }
      }, 200)
    }
  },
  unbind: function (el) {
    el.removeEventListener('click', intoview)
    function intoview () {
      setTimeout(function () {
        let MinclientHeight = document.documentElement.clientHeight
        let PageHeight = document.getElementsByClassName('scrollerBox')[0].clientHeight
        let scrollTop = document.getElementsByClassName('scrollerBox')[0].scrollTop
        let bottom = el.getBoundingClientRect().bottom
        if (PageHeight < MinclientHeight && !document.getElementById('empty__div')) {
          let emptyDiv = document.createElement('div')
          emptyDiv.style.height = '282px'
          emptyDiv.id = 'empty__div'
          document.getElementsByClassName('scrollerBox')[0].appendChild(emptyDiv)
        }
        let NeedScroll = scrollTop + bottom - (MinclientHeight - 269) + 20
        if (NeedScroll > 0) {
          document.getElementsByClassName('scrollerBox')[0].scrollTop = NeedScroll
          // document.documentElement.scrollTop = 282
        }
      }, 200)
    }
  }
})
Vue.directive('InputFixCursor', {
  inserted: function (el) {
    el.addEventListener('touchmove', function (e) {
      let activeNode = document.activeElement
      let u = navigator.userAgent
      let isIos = !!u.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/)
      if (isIos) {
        if (activeNode) {
          activeNode.blur()
        }
      }
    }, false)
  },
  unbind: function (el) {
    el.removeEventListener('touchmove', function (e) {
      let activeNode = el.activeNode
      let u = navigator.userAgent
      let isIos = !!u.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/)
      if (isIos) {
        el.addEventListener('touchmove', function (e) {
          e.preventDefault()
          if (activeNode) {
            activeNode.blur()
          }
        }, false)
      }
    }, false)
  }
})

Vue.directive('real-img', async function (el, binding) {//指令名称为：real-img
  let imgURL = binding.value;//获取图片地址
  if (imgURL) {
      let exist = await imageIsExist(imgURL) || '';
      if (exist) {
          el.setAttribute('src', imgURL);
      }
  }
})


let imageIsExist = function(url) {
  return new Promise((resolve) => {
      var img = new Image();
      img.onload = function () {
          if (this.complete == true){
              resolve(true);
              img = null;
          }
      }
      img.onerror = function () {
          resolve(false);
          img = null;
      }
      img.src = url;
  })
}
/*银行图标
 *校验已存在的银行图标json,不存在的图标直接去使用会出现404 低版本原生系统会出现不显示图标的问题
*/

Vue.directive('bankIcon', async function (el, binding) {
  let imgName = '', imgUrl = '';
  let bankCode = binding.value;
  //本地图标库json 后端暂不支持图标库管理
  // const imgJson = [
  //                 '102','103','104','105',
  //                 '201','202','203',
  //                 '301','302','303','304','305','306','307','308','309','310','315','316','318','319','321','322','325',
  //                 '402','403','501','502','503','504','505','506','507','508','509','511','512','513','514',
  //                 '525','526','531','532','533','562','591','621','622','671','672','781','785','787','313501080608'
  //                 ]
  let bankId = bankCode.substring(0,3);
  if(bankId == 313 || bankId == 320){
    imgName = bankCode;
  }else{
    imgName = bankId;
  }
  let BANK_ICON = process.env.BANK_ICON;
  imgUrl = `${BANK_ICON}/zl/bankIcons/${imgName}.png`;
  //imgUrl = require(`@/assets/bankIcons/${imgName}.png`);
  let exist = await imageIsExist(imgUrl) || '';
  if (exist) {
    el.setAttribute('src', imgUrl);
  }
})
