const url="http://192.168.1.32";
/*const url="http://yidongyihu.com";*/
export default{
  url
}
export function _debounce(fn, delay) { //防抖函数

  var delay = delay || 200
  var timer// timer 只定义过一次 vue的methods中绑定的是 return 出来的function
  return function () {
    var that = this
    var args = arguments
    if (timer) {//非第一次点击&非等待结束时点击 timer 为一个定时器会被清除 所以不会触发 fn.apply()
      clearTimeout(timer)
    }
    timer = setTimeout(function () {//等待结束或者第一次点击timer为undefined || null 不会清除定时器 会执行fn.apply()
      timer = null
      fn.apply(that, args)
    }, delay)
  }
}

export function _YMDhms() {
  let setZero = (num) => {
    return num < 10 ? '0' + num : num;
  }
  let str = ''
  let date = new Date()
  let Y = date.getFullYear()
  let M = setZero(date.getMonth() + 1)
  let D = setZero(date.getDate())
  let h = setZero(date.getHours())
  let m = setZero(date.getMinutes())
  //let s = setZero(date.getSeconds())
  str = Y + '-' + M + '-' + D + ' ' + h + ':' + m
  return str
}
export function _YMD() {
  let setZero = (num) => {
    return num < 10 ? '0' + num : num;
  }
  let str = ''
  let date = new Date()
  let Y = date.getFullYear()
  let M = setZero(date.getMonth() + 1)
  let D = setZero(date.getDate())
  str = Y + '-' + M + '-' + D
  return str
}
