import Vue from 'vue'
import dayjs from 'dayjs'
// 银行卡号取后四位
Vue.filter('CardNoFour', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substr(value.length - 4)
})

// 电子账户每4位1个空格
Vue.filter('electronicAccounts', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  if (value.length != 16) {
    return value
  }
  return value.substr(0, 4) + ' ' + value.substr(5, 4) + ' ' + value.substr(9, 4) + ' ' + value.substr(value.length - 4)
})

// 银行卡号每4位1个空格
Vue.filter('bankCardNum', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  if (value.length != 19) {
    return value
  }
  return value.substr(0, 4) + ' ' + value.substr(4, 4) + ' ' + value.substr(8, 4) + ' ' + value.substr(12, 4) + ' ' + value.substr(value.length - 3)
})

// 银行卡号取前后四位中间部分****号代替
Vue.filter('CardProtect', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substr(0, 4) + ' **** ' + value.substr(value.length - 4)
})

// 银行卡号取前后四位中间部分 **** **** 号代替
Vue.filter('CardHide', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substr(0, 4) + ' **** ' + ' **** ' + value.substr(value.length - 4)
})

// 银行卡号取前后四位中间部分   ****   ****   号代替
Vue.filter('CardNumber', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substr(0, 4) + ' **** ' + ' **** ' + value.substr(value.length - 4)
})

// 钱格式转换1230000 => 1,230,000.00
Vue.filter('Money', function (s, n) {
  if (!s) {
    return '0.00'
  }
  // if(s == "账户已挂失"){
  //   return '0.00'
  // }
  var isNagtive = false
  if (parseFloat((s + '')) < 0) {
    isNagtive = true
    s = s.toString()
    s = s.replace(/-/g, '')
  }
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  var I = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < I.length; i++) {
    t += I[i] + ((i + 1) % 3 === 0 && (i + 1) !== I.length ? ',' : '')
  }
  if (isNagtive) {
    return '-' + t.split('').reverse().join('') + '.' + r
  } else {
    return t.split('').reverse().join('') + '.' + r
  }
})

// 钱格式转换1230000 => 1,230,000
Vue.filter('money', function (s, n) {
  if (!s) {
    return '0.00'
  }
  var isNagtive = false
  if (parseFloat((s + '')) < 0) {
    isNagtive = true
    s = s.toString()
    s = s.replace(/-/g, '')
  }
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  var I = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < I.length; i++) {
    t += I[i] + ((i + 1) % 3 === 0 && (i + 1) !== I.length ? ',' : '')
  }
  if (isNagtive) {
    return '-' + t.split('').reverse().join('')
  } else {
    return t.split('').reverse().join('')
  }
})

Vue.filter('DoubleFloat', function (value) {
  if (!value) {
    return '0.00'
  }
  return parseFloat(value).toFixed(2)
})
// 电话号码
Vue.filter('phoneNumber', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(value.length - 4)
})

Vue.filter('phoneProtect', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substr(0, 3) + '****' + value.substr(value.length - 4)
})
//tablewidth转换
Vue.filter('toPx', function (width) {
  let clientWidth = document.body.clientWidth;
  return (width / 750) * clientWidth;
})
//剔除所有的0
Vue.filter('subzero', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substring(0, value.indexOf(0))
})
//获取小数点以后的值
Vue.filter('radixpoint', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.replace(/\d+\.(\d*)/, "$1")
})
//获取小数点以后的值
Vue.filter('units', function (value, type) {
  let units = '';
  if (value) {
    let _value = Math.floor(value) + '';
    let vlen = _value.length;
    switch (vlen) {
      case 3:
        units = '百';
        break;
      case 4:
        units = '千';
        break;
      case 5:
        units = '万';
        break;
      case 6:
        units = '十万';
        break;
      case 7:
        units = '百万';
        break;
      case 8:
        units = '千万';
        break;
      case 9:
        units = '亿';
        break;
      case 10:
        units = '十亿';
        break;
      case 11:
        units = '百亿';
        break;
      case 12:
        units = '千亿';
        break;
      case 13:
        units = '万亿';
        break;
      case 14:
        units = '十万亿';
        break;
      default:
        units = ''
    }

  } else {
    return ''
  }
  return units
})
// 保留2位小数
Vue.filter('toFixedNum', function (value, type) {
  if (!value) {
    return value
  }
  // if (typeof value !== 'string') {
  //   value = String(value)
  // }
  // return value.toFixed(4)
  // num为传入的值，n为保留的小数位
  // function fomatFloat(num,n){
  //   var f = parseFloat(num);
  //   if(isNaN(f)){
  //       return false;
  //   }
  var f = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2); // n 幂
  var s = f.toString();
  var rs = s.indexOf('.');
  //判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
})
// 保留4位小数
Vue.filter('toFixedNumBer', function (value, type) {
  if (!value) {
    return value
  }
 var  f = Math.round(value*Math.pow(10, 4))/Math.pow(10, 4); // n 幂
  var s = f.toString();
  var rs = s.indexOf('.');
  //判定如果是整数，增加小数点再补0
  if(rs < 0){
      rs = s.length;
      s += '.';
  }
  while(s.length <= rs + 4){
      s += '0';
  }
  return s;
})
//给日期加格式"-" 2010-10-10
Vue.filter('DateChange', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  var y = value.substring(0, 4);
  var m = value.substring(4, 6);
  var d = value.substring(6, 8);
  return y + '-' + m + '-' + d
})
//给日期加格式 2010.10.10-2011-10-10
Vue.filter('startEnd', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substring(0, 4) + '.' + value.substring(4, 6) + '.' + value.substring(6, 8) + '-' + value.substring(8, 12) + '.' + value.substring(12, 14) + '.' + value.substring(14, 16)
})
//给日期加格式 10-20
Vue.filter('mouthDay', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value.substring(4, 6) + '-' + value.substring(6, 8)
})
//给日期加格式带时间"-" 2010-10-10 10:00
Vue.filter('DateChangetime', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  var y = value.substring(0, 4);
  var m = value.substring(4, 6);
  var d = value.substring(6, 8);
  var h = value.substring(8, 10);
  var M = value.substring(10, 12);
  return y + '-' + m + '-' + d + " " + h + ":" + M
})
//识别存款月份
Vue.filter('depositDateChange', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  if (value.indexOf("D") > 0) {
    return value.split("D").join("天");
  }
  if (value.indexOf("M") > 0) {
    return value.split("M").join("月");
  }
  if (value.indexOf("Y") > 0) {
    return value.split("Y").join("年");
  }
}
)
//识别存款类型
Vue.filter('depositDateType', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  var status = '';
  switch (value) {
    case '0':
      status = "整存整取";
      break;
    case 'A':
      status = "通知存款";
      break;
    case 'C':
      status = "鑫贵宝";
      break;
    case 'D':
      status = "大额存单";
      break;
    case 'F':
      status = "鑫贵宝二号";
      break;
    case 'G':
      status = "鑫贵宝三号";
      break;
    case 'H':
      status = "鑫贵宝一号";
      break;
    case 'I':
      status = "鑫农宝";
      break;
    case 'J':
      status = "鑫农宝二号";
      break;
    default:
      break;
  }
  return status;
}
)
//时间戳转化
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Vue.filter('Format', function (value, fmt) {
  let getDate = new Date(value);
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt;
})
// '20190102'=>'2019.01.02'
Vue.filter('timeFormat', function (value, flag, str) {
  let arr = [];
  let nowstr = str ? str : '.'
  if (flag) {
    // '20190102'=>'01.02'
    let str = value.substring(4)
    arr.push(str.slice(0, 2))
    arr.push(str.slice(2))
  } else {
    arr.push(value.slice(0, 4));
    arr.push(value.slice(4, 6));
    arr.push(value.slice(6));
  }
  return arr.join(nowstr);
})
Vue.filter('timeFormat1', function (value) {
  let arr = [];
  arr.push(value.slice(0, 4));
  arr.push(value.slice(4, 6));
  arr.push(value.slice(6));
  return arr.join("-");
})
Vue.filter('parseFloatTwo', function (val) {
  // console.log(val)
  if (!val) {
    return '0%';
  }
  let value = val.toString()
  if (value.indexOf("%") == -1) {
    if (val > 1) {
      return (Math.round(value * 100)) / 100 + "%";
    } else {
      return (Math.round(value * 10000)) / 100 + "%";
    }
  } else {
    return val;
  }
})
Vue.filter('parsePercent', function (val) {
  if (!val) {
    return '0%';
  }
  let value = val.toString()
  if (value.indexOf("%") == -1) {
    return val + '%';
  } else {
    return val;
  }
})
// 每4位1个空格
Vue.filter('bankNum', function (value, type) {
  if (!value) {
    return ''
  }
  if (typeof value !== 'string') {
    value = String(value)
  }
  // 4 4 4 4 3
  let num = parseInt(value.length / 4)
  let str = ''
  for (let i = 0; i < num; i++) {
    str += value.substr(i * 4, 4) + ' '
  }
  str += value.slice(num * 4)
  return str
})
//idCardType 身份证类型
Vue.filter('idCardType', function (value) {
  let obj = {
    '00': "身份证",
    '1': "护照",
    '2': "军官证",
    '3': "士兵证",
    '4': "港澳台通行证",
    '5': "户口本",
    '6': "外国护照",
    '7': "其它",
    '8': "文职证",
    '9': "警官证",
    'A': "技术监督局代码",
    'B': "营业执照",
    'C': "行政机关",
    'D': "社会团体",
    'E': "军队",
    'F': "武警",
    'G': "下属机构",
    'H': "基金会",
    'I': "其它",
  }
  return obj[value]
})
//卡类型
Vue.filter('cardTypeName', function (data) {
  // console.log("data11", data);
  let nameJson = {
    E1: "村镇银行卡",
    E2: "市民卡",
    E3: "活期一本通",
    E5: "借记卡",
    E6: "信用卡",
    E7: "银贷通（信用卡）",
    E8: "抵贷通(信用卡）",
    E9: "金贷通(信用卡）",
    Em: "新市民卡",
    Eb: "社保卡"
  };
  return nameJson[data];
})

// 日期格式化 YYYY-MM-DD
Vue.filter('dateFormat', function (data) {
  return dayjs(data).format('YYYY-MM-DD')
})