export function formatTime(time, fmt) {
  var date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

export function formatState(index) {
  return ['草稿','待审核','未通过','通过'][index]
};

export  function formatColor(index){
  return ['#606266','#E6A23C','#F56C6C','#606266'][index]
}


function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
