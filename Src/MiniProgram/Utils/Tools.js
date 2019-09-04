const tools = {};
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//空对象：true，不是：false
tools.isEmptyObject = function (obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") return false;
  return !(Object.keys(obj).length > 0)
}

tools.hideStrFormate = function (str, keepLen, endLen) { //隐藏部分字符，str：字符串，keepLen：保留的开头的字符个数，endLen：保留的结尾的字符个数
  var len = str.length - keepLen - endLen;
  var newStr = '';
  for (var i = 0; i < len; i++) {
    newStr += '*';
  }
  return str.substring(0, keepLen) + newStr + str.substring(str.length - endLen);
};

//验证变量值是否为null、空字符串、undefined，是：true，否：false
tools.isEmptyValue = function (value) {
  var isEmpty = true;
  if (value != null && value != '' && value != 'undefined' && value != undefined) {
    isEmpty = false;
  }

  return isEmpty;
}

tools.idToName = function (idStr, dataArr) {
  var idArr = (idStr + '').split(',');
  var nameStr = '';
  for (var i = 0; i < idArr.length; i++) {
    for (var j = 0; j < dataArr.length; j++) {
      if (idArr[i] == dataArr[j].id) {
        if (i < idArr.length - 1) {
          nameStr = nameStr + dataArr[i].name + '、';
        } else {
          nameStr = nameStr + dataArr[i].name;
        }
      }
    }
  }

  return nameStr;
}

tools.getIndex = function (name, dataArr) {
  var index = 0;
  for (var i = 0; i < dataArr.length; i++) {
    if (dataArr[i].name == name || dataArr[i].id == name) {
      index = i;
      break;
    }
  }

  return index;
}

//给定的数组中是否包含id,包含：true，dataArr：[{id:'',name:''},...]
tools.isHas = function (id, dataArr) {
  for (var i = 0; i < dataArr.length; i++) {
    if (id == dataArr[i].id) {
      return true;
    }
  }

  return false;
}

//判断对象是否等
tools.isObjectValueEqual = function (objectA, objectB) {
  if (typeof (objectA) != typeof (objectB)) return false;
  if (objectA instanceof Object) {//是对象
    if (Array.isArray(objectA) && Array.isArray(objectB)) {//对象都为数组对象
      var isArrEqual = tools.isArrayValueEqual(objectA, objectB);
      if (!isArrEqual) return false;
    }
    else if (objectA instanceof Date && objectB instanceof Date) {//日期对象
      return objectA.getTime() == objectB.getTime();
    }
    else if (typeof (objectA) == 'function') {
      if (objectA.toString() != objectB.toString()) return false;
    }
    else {
      if (Object.keys(objectA).length != Object.keys(objectB).length) return false;
      for (var attr in objectA) {
        var isAttrEqual = tools.isObjectValueEqual(objectA[attr], objectB[attr]);
        if (!isAttrEqual) return false;
      }
    }
  }
  else {//非对象
    return objectA == objectB;
  }
  return true;
}

//判断两个数组是否相等
tools.isArrayValueEqual = function (arrayA, arrayB) {
  if (arrayA.length != arrayB.length) return false;
  for (var i = 0; i < arrayA.length; i++) {
    var isObjectEqual = tools.isObjectValueEqual(arrayA[i], arrayB[i]);
    if (!isObjectEqual) return false;
  }
  return true;
}

module.exports = tools