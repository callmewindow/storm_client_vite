// url与对象的解析
import qs from 'qs'

// 对象转为url字符串
const toUrl = function (obj: object) {
  return qs.stringify(obj)
}

// url字符串解析为对象
function toObject(obj: string) {
  return qs.parse(obj)
}

// 日期格式化

const formatDate = function (timestamp: number, formats: DateFormats): string {
  // 默认包含年月日时分秒
  formats = formats || 'Y-m-d H:i:s';

  const fillZero = function (value: number): string {
    return value < 10 ? '0' + value : String(value);
  };

  const oldDate = timestamp ? new Date(timestamp) : new Date();

  const year = oldDate.getFullYear();
  const month = fillZero(oldDate.getMonth() + 1);
  const day = fillZero(oldDate.getDate());

  const hour = fillZero(oldDate.getHours());
  const minite = fillZero(oldDate.getMinutes());
  const second = fillZero(oldDate.getSeconds());

  // 基于格式进行正则替换
  return formats.replace(/Y|m|d|H|i|s/ig, function (matches: string): any {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches];
  });
};
// function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
export const Formatter = {
  toUrl, toObject, formatDate
}
