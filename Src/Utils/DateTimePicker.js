function withData(param){
  return param < 10 ? '0' + param : '' + param;
}

function getLoopArray(s, e, p){
  var start = s || 0;
  var end = e || 1;
  var array = [];
  var postfix = p || '';
  for (var i = start; i <= end; i++) {
    array.push(withData(i) + postfix);
  }
  return array;
}

function getMonthDay(year,month,postfix){
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

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
function getNewDateArry(){
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
function dateTimePicker(startYear,endYear,date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[],[],[],[],[],[]];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  // 处理联动列表数据
  /*年月日 时分秒*/ 
  dateTimeArray[0] = getLoopArray(start,end,'年');
  dateTimeArray[1] = getLoopArray(1, 12,'月');
  dateTimeArray[2] = getMonthDay(defaultDate[0].replace('年', ''), defaultDate[1].replace('月', ''),'日');
  dateTimeArray[3] = getLoopArray(0, 23,'时');
  dateTimeArray[4] = getLoopArray(0, 59,'分');
  dateTimeArray[5] = getLoopArray(0, 59,'秒');

  dateTimeArray.forEach((current,index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}
module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay
}