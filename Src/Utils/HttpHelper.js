const dateTool = require('../Utils/DateUtil.js')
const globalEnum = require('../Utils/GlobalEnum.js')

const httpRequest = {};

httpRequest.method = {
   get: 'GET',
   post: 'POST'
}

httpRequest.header = {
   phoneInfo: JSON.stringify(wx.getSystemInfoSync())
}

function httpLogInfo(url, params, res, method, header) {
   if (!wx.app_env.isProduction) {
      console.log('当前时间：' + dateTool.sampleFormatTime(new Date(Date.now())) + '\n当前url:' + url);
      console.log('头部:', header);
      console.log('方式：', method);
      console.log('参数：', params);
      console.log('结果：', res.data);
   }
}

function httpLogErr(url, params, res, method, header) {
   if (!wx.app_env.isProduction) {
      console.log('请求发生异常，当前时间：' + dateTool.sampleFormatTime(new Date(Date.now())) + '\n当前url：' + url);
      console.log('头部:', header);
      console.log('方式：', method);
      console.log('参数：', params);
      console.log('异常：', res);
   }
}

function successCallback(res, url, params, resolve, reject, method, header) {
   httpLogInfo(url, params, res, method, header);

   if (res.data.Code != -10003) {
      resolve(res.data);
   } else {
      wx.showToast({
         title: '加载数据失败了，请重试',
         icon: 'none'
      });
   }
}

function failCallback(res, url, params, resolve, reject, method, header) {
   httpLogErr(url, params, res, header);

   if (res.errMsg.includes('request:fail')) {
      wx.showToast({
         title: '网络无法连接服务器，请稍后再试',
         icon: 'none'
      });
   } else {
      reject(res);
   }
}

//get请求
httpRequest.get = (url, params) => {
   var promise = new Promise((resolve, reject) => {
      wx.request({
         url: url,
         data: params,
         method: httpRequest.method.get,
         header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
            'PhoneInfo': httpRequest.header.phoneInfo
         },
         dataType: 'json',
         responseType: 'text',
         success: function(res) {
            successCallback(res, url, params, resolve, reject, httpRequest.method.get, {
               'content-type': 'application/json',
               'Authorization': wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
               'PhoneInfo': httpRequest.header.phoneInfo
            });
         },
         fail: function(res) {
            failCallback(res, url, params, resolve, reject, httpRequest.method.get, {
               'content-type': 'application/json',
               'Authorization': wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
               'PhoneInfo': httpRequest.header.phoneInfo
            });
         }
      });
   });
   return promise;
};

//post请求
httpRequest.post = (url, params) => {
   var promise = new Promise((resolve, reject) => {
      wx.request({
         url: url,
         data: params,
         method: httpRequest.method.post,
         header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
            'PhoneInfo': httpRequest.header.phoneInfo
         },
         dataType: 'json',
         responseType: 'text',
         success: function(res) {
            successCallback(res, url, params, resolve, reject, httpRequest.method.post, {
               'content-type': 'application/json',
               'Authorization': wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
               'PhoneInfo': httpRequest.header.phoneInfo
            });
         },
         fail: function(res) {
            failCallback(res, url, params, resolve, reject, httpRequest.method.post, {
               'content-type': 'application/json',
               'Authorization': wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
               'PhoneInfo': httpRequest.header.phoneInfo
            });
         }
      });
   });
   return promise;
}

module.exports = {
   httpRequest: httpRequest,
}