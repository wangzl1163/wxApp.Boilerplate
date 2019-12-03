// 公共方法
const appApi = require('../Apis/ApiUrls.js')
const httpRequest = require('../Utils/HttpHelper.js')
const globalEnum = require('../Enums/GlobalEnum.js')


var commonFun = {}

/**
 * OCR识别
 * filePath：图片的本地路径
 * url:OCR识别接口地址
 * successFun:成功时回调函数
 */
commonFun.ocrRecognition = function(filePath, url, successFun) { // 身份证OCR识别
   wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      success: successFun,
      fail: function(err) {
         console.log('OCR识别异常：', err)
         console.log('OCR识别url：', url)
      },
      complete: function(res) {}
   })
};

/**
 * 登录超时
 */
commonFun.loginTimeOut = function(res, {
   targetUrl = '',
   onlyLoginInfo = false
} = {}) {
   wx.showModal({
      title: '',
      content: res.data.Code == 9 ? res.data.Message : res.data.Code == 403 ? '登录信息已失效' : res.data.Message,
      showCancel: false,
      success: function(res) {
         if (res.confirm) {

            if (onlyLoginInfo) {
               wx.removeStorageSync(feiCheEnmu.storageKeys.loginInfo)
            } else {
               wx.clearStorageSync()
            }

            targetUrl && wx.reLaunch({
               url: targetUrl
            })
         }
      }
   })
}

commonFun.tokenCheck = function() {
   httpRequest.post(appApi.apis.TokenStateCheck, '')
      .then((res) => {
         if (res.data.Code == 9 || res.data.Code == 403) {
            commonFun.loginTimeOut(res)
         }
      })
      .catch((res) => {
         wx.showToast({
            title: '网络无法连接服务器，请稍后再试',
            icon: 'none'
         })
      })
}

/**
 * 获取token
 */
commonFun.getUserToken = function(token) {
   httpRequest.get(appApi.apis.GetUserToken).then(res => {
      if (res.data.Code == 1) {
         token.AuthorityToken = res.data.Message
      } else {
         token.AuthorityToken = wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken
      }
   })
}

module.exports = commonFun