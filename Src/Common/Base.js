// 全局基础对象

const logger = require('../Utils/Log.js')
const regExp = require('../Utils/RegExp.js')
const tools = require('../Utils/Tools.js')
const wxFun = require('../Common/WxFun.js')
const commonFun = require('../Common/Common.js')
const bank = require('../Utils/Bank.js')
const city = require('../Utils/City.js')
const globalEnum = require('../Utils/GlobalEnum.js')
const appApi = require('../Apis/ApiUrls.js')
const httpHelper = require('../Utils/HttpHelper.js')
require('../Utils/PromiseExtend.js')

module.exports = {
   logger: logger,
   wxFun: wxFun,
   commonFun: commonFun,
   regExp: regExp,
   tools,
   bank: bank,
   city: city,
   globalEnum,
   httpHelper,
   appApi
}