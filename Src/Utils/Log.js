const tool = require('../Utils/Tools.js');
const logger = wx.canIUse('getLogManager') ? wx.getLogManager() : null;

const log = function (title,msg){
  if (logger) {
    logger.log('时间：' + tool.sampleFormatTime(new Date(Date.now())) + (title || '小程序逻辑层发生异常')+'-----异常信息：', msg);
  }
}

module.exports = {
  log:log
}