// 获取n天后的日期（n为负时，获取n天前的日期），返回yyyymmdd
const GetFormatDate = function (dd, n) {
  // var dd = new Date()
  dd.setDate(dd.getDate() + n) // 获取n天后的日期
  let y = dd.getFullYear() // 年份
  let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) // 月份，不足10补0
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 日，不足10补0
  return y + '' + m + '' + d
}
const GetNowDate = function (dd) {
  // dd.setDate(dd.getDate() + n) // 获取n天后的日期
  let y = dd.getFullYear() // 年份
  let m = ((dd.getMonth() + 1) < 10) ? ('0' + (dd.getMonth() + 1)) : (dd.getMonth() + 1) // 月份，不足10补0
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 日，不足10补0
  console.log(y + '' + m + '' + d)
  return y + '' + m + '' + d
}

/**
 * 去掉字符串内所有空格
 * @param {String} param
 */
export function superTrim(str) {
  return String(str).replace(/\s/g, '')
}

/**
 * 格式化金额为金融格式
 * ! 该函数对于长度大于16位的数字，会有损失精度风险
 * @param {Number | String} amount 数额
 * @param {Number} decimalCount 小数位数
 * @param {String} decimal 小数点字符
 * @param {String} thousands 千位分隔符字符
 */
export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? "-" : ""

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    let j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")
  } catch (e) {
    console.error(e)
    return amount
  }
}

/**
 * 将格式化后的金额转换为数字格式
 * @param {String} money 千位分隔后的金额字符串
 */
export function restoreMoney(money) {
  try {
    money = String(money)
    if (Number(money.split('.')[1]) == 0) {
      money = money.split('.')[0]
    }
    const ret = Number(money.replace(/,/g, ''))
    if(isNaN(ret)){
      console.error('restoreMoney: param is not correct')
      return money
    }
    return ret
  } catch (e) {
    console.error(e)
    return money
  }
}

/**
 * 格式化银行卡号，每四位加空格
 * @param {String | Number} number 银行卡号
 */
export function formatBankCardNumber(number) {
  const trimedNumber = String(number).replace(/\s/g, '').substring(0, 19)
  if (isNaN(trimedNumber)) {
    return number
  }
  return trimedNumber.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/**
 * 格式化手机号格式为1xx xxxx xxxx
 * @param {String | Number} tel 手机号
 */
export function formatTel(tel) {
  const trimedTel = String(tel).replace(/\s/g, '').substring(0, 11)
  if (isNaN(trimedTel)) {
    return tel
  }
  return trimedTel.replace(/(\d{3})(?=\d)/, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
}

/**
 * 判断手机号是否合法
 * @param {String} tel 手机号
 */
export function checkTel(tel) {
  const pattern = /^((1[1-9][0-9])+\d{8})$/
  return pattern.test(tel)
}

/**
 * 判断银行卡号是否合法
 * @param {String | Number} param 银行卡号
 */
export function checkBankCardNumber(param) {
  const pattern = /^([1-9]{1})(\d{14,18})$/
  return pattern.test(param)
}

/**
 * 判断身份证号是否合法
 * @param {String} param 身份证号
 */
export function checkIdCardNumber(param) {
  const pattern = /^\d{15}$|^\d{18}$|(^\d{17}[0-9]|x|X)$/
  // const pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return pattern.test(param)
}


export function toPx(param){
  let clientWidth = document.body.clientWidth;
  return  (param / 750) * clientWidth;
}
/**
 * 获取银行图标图片
 * @param {String | Number} param bankId 或者 bankNbr清算行号 3位或者长码（长码前三位截取必须对应bankId）
 * 增加imgJson 存在的图标json进行对比
 */
export function bankIconImg(param){
  let imgName = '';
  //本地图标库json 后端暂不支持图标库管理
  const imgJson = [
                  '102','103','104','105',
                  '201','202','203',
                  '301','302','303','304','305','306','307','308','309','310','315','316','318','319','321','322','325',
                  '402','403','501','502','503','504','505','506','507','508','509','511','512','513','514',
                  '525','526','531','532','533','562','591','621','622','671','672','781','785','787',
                  '313501080608',"313491099996","313491000232","313501080608",'313495081900'
                  ]
  let bankId = param.substring(0,3);
  if(bankId == 313 || bankId == 320){
    if(imgJson.includes(param)){
      imgName = param;
    }else{
      imgName = '';
    }
  }else{
    if(imgJson.includes(bankId)){
      imgName = bankId;
    }else{
      imgName = '';
    }
  }
  if (imgName) {
    let BANK_ICON = process.env.BANK_ICON;
    return `${BANK_ICON}/zl/bankIcons/${imgName}.png`   //ip 不能写死
  }else{
    return require(`@/assets/bankIcons/default.png`)
  }
}
const getTransStatus = function(status){
  let text = '';
  switch (status) {
    case "0":
      text = '交易成功';
      break;
    case "1":
      text = '交易失败';
      break
    case "2":
      text = '撤销';
      break
    case "3":
      text = '部分退货';
      break
    case "4":
      text = '全部退货';
      break
    case "5":
      text = '处理中';
      break
    case "6":
      // text = '初始化(已录入)';//实际状态
      text = '处理中';//用户视觉优化
      break
    case "7":
      text = '交易完成';
      break
    case "8":
      text = '交易待扫码';
      break
    case "9":
      // text = '交易超时';//实际状态
      text= "交易未明"//
      break
    case "A":
      text = '待授权';
      break
    case "B":
      text = '落地待处理';
      break
    case "C":
      text = '待处理';
      break
    case "D":
      text = '授权完成';
      break
    case "E":
      text = '授权处理中';
      break
    case "F":
      text = '落地完成';
      break
    case "G":
      text = '落地处理中';
      break
    default:
      text = "转账"
  }
  return text
}

/**
 * 获取索引列表
 * @param {Array} data  改装前的数据
 */
export function getIndexAnchor(data) {
      var Pinyin = require("@/tools/pinyin.js").Pinyin;
      //第一轮生成带有26个字母的锚点列表
      let arrList = [];
      for (let i = 0; i < 26; i++) {
        let item = {
          anchor: String.fromCharCode((65 + i)),
          children: []
        }
        arrList.push(item);
      }
      //将对应字母数据插入到indexList里
      data.map(item => {
        let name = item.name;
        let PinYin = Pinyin.parse(name)[0];
        let firstStr = PinYin.target.substring(0, 1).toUpperCase();
        for (let child of arrList) {
          //可以加入其他判断 比如 我的账户（使用id作对比）
          //字母索引插入ss
          if (child.anchor === firstStr) {
            child.children.push(item)
          }
        }
      })

      // 第三轮遍历arrList过滤掉无内容素的item,避免空占位
      let indexList = [], indexAnchor = [];
      for (let item of arrList) {
        if (item.children.length > 0) {
          indexList.push(item);
          indexAnchor.push(item.anchor)
        }
      }
      return {
        indexList: indexList,
        indexAnchor: indexAnchor
      }
}


export default {
  GetFormatDate: GetFormatDate,
  GetNowDate: GetNowDate,
  formatMoney,
  checkTel,
  formatBankCardNumber,
  formatTel,
  toPx,
  getTransStatus,
  bankIconImg,
  getIndexAnchor
}
