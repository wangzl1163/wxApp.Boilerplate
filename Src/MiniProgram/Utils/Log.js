const tool = require('/Tools.js');
const logger = wx.canIUse('getLogManager') ? wx.getLogManager() : null;

const log = function (title, msg) {
   if (logger && !wx.app_env.isProduction) {
      let summary = '时间：' + tool.sampleFormatTime(new Date(Date.now())) + (title || '小程序逻辑层发生异常') + '-----异常信息：'

      logger.log(summary, msg);
   }
}

module.exports = {
   log: log
}