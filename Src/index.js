// 小程序基础模块入口

// 环境配置
const env = require('/Config/env.config.js')

// 挂载环境变量
wx.app_env = {
   isProduction: env.wx_env_production === 1,
   isTest: env.wx_env_test === 1,
   isDevelop: env.wx_env_develop === 1,
}

Object.freeze(wx.app_env) // 防止环境变量在程序的其他地方被修改

console.log('小程序环境配置：',wx.app_env)


// 全局基础对象
const version = require('/Utils/Version.js')
const logger = require('/Utils/Log.js')
const regExp = require('/Utils/RegExp.js')
const tools = require('/Utils/Tools.js')
const wxFun = require('/Common/WxFun.js')
const commonFun = require('/Common/Common.js')
const bank = require('/Utils/Bank.js')
const city = require('/Utils/City.js')
const globalEnum = require('./Utils/GlobalEnum.js')
const appApi = require('/Apis/ApiUrls.js')
const httpHelper = require('/Utils/HttpHelper.js')
require('/Utils/PromiseExtend.js')

module.exports = {
   version,
   logger,
   wxFun,
   commonFun,
   regExp,
   tools,
   bank,
   city,
   globalEnum,
   httpHelper,
   appApi
}