/**
 * 补零——左补零
 */
function withData(param) {
   return param < 10 ? '0' + param : '' + param;
}

function getLoopArray(s, e, p) {
   var start = s || 0;
   var end = e || 1;
   var array = [];
   var postfix = p || '';
   for (var i = start; i <= end; i++) {
      array.push(withData(i) + postfix);
   }
   return array;
}

function getMonthDay(year, month, postfix) {
   var year = parseInt(year.replace('年', ''))
   var month = month.replace('月', '')
   var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0),
      array = null;

   switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
         array = getLoopArray(1, 31, postfix)
         break;
      case '04':
      case '06':
      case '09':
      case '11':
         array = getLoopArray(1, 30, postfix)
         break;
      case '02':
         array = flag ? getLoopArray(1, 29, postfix) : getLoopArray(1, 28, postfix)
         break;
      default:
         array = '月份格式不正确，请重新输入！'
   }
   return array;
}

function getNewDateArry() {
   // 当前时间的处理
   var newDate = new Date();
   var year = withData(newDate.getFullYear()) + '年',
      mont = withData(newDate.getMonth() + 1) + '月',
      date = withData(newDate.getDate()) + '日',
      hour = withData(newDate.getHours()) + '时',
      minu = withData(newDate.getMinutes()) + '分',
      seco = withData(newDate.getSeconds()) + '秒';

   return [year, mont, date, hour, minu, seco];
}

function dateTimePicker(startYear, endYear, date) {
   var isCalendarTime = isCalendarTime || false
   // 返回默认显示的数组和联动数组的声明
   var dateTime = [],
      dateTimeArray = [
         [],
         [],
         [],
         [],
         [],
         []
      ];
   var start = startYear || 1978;
   var end = endYear || 2100;
   // 默认开始显示数据
   var defaultDate = []

   if (date) {
      var tempArr = date.split(' ')

      if (date.indexOf('年') == -1) {
         var dateArr = tempArr[0].split('-')
         var timeArr = tempArr[1].split(':')

         defaultDate = [dateArr[0] + '年', dateArr[1] + '月', dateArr[2] + '日', timeArr[0] + '时', timeArr[1] + '分', timeArr[2] + '秒', ]
      } else {
         var y = tempArr[0].split('年')[0] + '年'
         var m = tempArr[0].split('年')[1].split('月')[0] + '月'
         var d = tempArr[0].split('年')[1].split('月')[1]

         var h = tempArr[1].split(':')[0] + '时'
         var mm = tempArr[1].split(':')[1] + '分'
         var s = tempArr[1].split(':')[2] + '秒'

         defaultDate = [y, m, d, h, mm, s]
      }
   } else {
      defaultDate = getNewDateArry()
   }

   // 处理联动列表数据
   /*年月日 时分秒*/
   dateTimeArray[0] = getLoopArray(start, end, '年');
   dateTimeArray[1] = getLoopArray(1, 12, '月');
   dateTimeArray[2] = getMonthDay(defaultDate[0].replace('年', ''), defaultDate[1].replace('月', ''), '日');
   dateTimeArray[3] = getLoopArray(0, 23, '时');
   dateTimeArray[4] = getLoopArray(0, 59, '分');
   dateTimeArray[5] = getLoopArray(0, 59, '秒');

   dateTimeArray.forEach((current, index) => {
      dateTime.push(current.indexOf(defaultDate[index]))
   });

   return {
      dateTimeArray: dateTimeArray,
      dateTime: dateTime
   }
}

/**
 * 格式化日期和时间，默认返回标准时间格式：yyyy-MM-dd hh:mm:ss
 * @param {Array} selectedValues 选中的列的index
 * @param {Array} dateTimeArray 各列时间
 * @param {Bool} isCalendarTime 是否日历时间，日历时间格式：xxxx年xx月xx日 hh:mm:ss，true-是，false-否
 */
function formateDateTime(selectedValues, dateTimeArray, isCalendarTime) {
   var isCalendarTime = isCalendarTime || false
   var dtArr = dateTimeArray
   var dt = ''

   if (isCalendarTime) { // 返回日历时间
      dt = dtArr[0][selectedValues[0]] + dtArr[1][selectedValues[1]] + dtArr[2][selectedValues[2]] + ' ' + withData(selectedValues[3]) + ':' + withData(selectedValues[4]) + ':' + withData(selectedValues[5])
   } else { // 返回默认时间
      dt = dtArr[0][selectedValues[0]].replace('年', '') + '-' + dtArr[1][selectedValues[1]].replace('月', '') + '-' + dtArr[2][selectedValues[2]].replace('日', '') + ' ' + dtArr[3][selectedValues[3]].replace('时', '') + ':' + dtArr[4][selectedValues[4]].replace('分', '') + ':' + dtArr[5][selectedValues[5]].replace('秒', '')
   }

   return dt
}

module.exports = {
   dateTimePicker: dateTimePicker,
   getMonthDay: getMonthDay,
   formateDateTime: formateDateTime
}