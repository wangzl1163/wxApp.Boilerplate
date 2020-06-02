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
const globalEnum = require('./Enums/GlobalEnum.js')
const appApi = require('/Apis/ApiUrls.js')
const httpRequest = require('/Utils/HttpHelper.js')
const qs = require('./Utils/QS.js')

require('/Extend/Promise.js')

const utils = {
   version,
   logger,
   wxFun,
   commonFun,
   regExp,
   tools,
   globalEnum,
   httpRequest,
   appApi,
   qs
}

// 小程序的独立分包中getAPP()无法获取到真正的APP实例，故改为挂载到wx上
wx.utils = utils
Object.freeze(wx.utils)

// 扩展Component
wx.Component = require('/Config/Component.js')

module.exports = utils