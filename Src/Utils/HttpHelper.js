const dateTool = require('/DateUtil.js')
const globalEnum = require('/GlobalEnum.js')
const systemInfo = JSON.stringify(wx.getSystemInfoSync())

const httpMethod = {
   get: 'GET',
   post: 'POST'
}

const config = {
   header: {
      'contentType': 'application/json', // 默认json，可以修改
      'getAuthorization': () => wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
      'phoneInfo': systemInfo
   },
   dataType: 'json', // 返回的数据格式，默认json，可修改
   responseType: 'text', // 响应的数据类型，默认text，可修改
}

function httpLogInfo(url, params, res, method, header) {
   console.log('当前时间：' + dateTool.sampleFormatTime(new Date(Date.now())) + '\n当前url:' + url);
   console.log('头部:', header);
   console.log('方式：', method);
   console.log('参数：', params);
   console.log('结果：', res.data);
}

function httpLogErr(url, params, res, method, header) {
   console.log('请求发生异常，当前时间：' + dateTool.sampleFormatTime(new Date(Date.now())) + '\n当前url：' + url);
   console.log('头部:', header);
   console.log('方式：', method);
   console.log('参数：', params);
   console.log('异常：', res);
}

function successCallback(res, url, params, resolve, reject, method, header) {
   httpLogInfo(url, params, res, method, header);

   if (res.statusCode === 200 && res.data.Code != -10003) {
      return resolve(res.data);
   } else {
      wx.showToast({
         title: '加载数据失败了，请重试',
         icon: 'none'
      })

      return reject(res)
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
      return reject(res)
   }
}

const httpRequest = (url, {
   data = {},
   method = httpMethod.get,
   dataType = config.dataType,
   responseType = config.responseType,
   header = { // header采用拼接是为了防止本地存储的loginInfo被其他地方修改了而不能得到最新
      'content-type': config.header.contentType,
      'Authorization': config.header.getAuthorization(),
      'PhoneInfo': config.header.phoneInfo
   }
} = {}) => {

   let promise = new Promise((resolve, reject) => {
      wx.request({
         url: url,
         data: data,
         method: method,
         header: header,
         dataType: dataType,
         responseType: responseType,
         success: function(res) {
            successCallback(res, url, data, resolve, reject, httpMethod.get, header);
         },
         fail: function(res) {
            failCallback(res, url, data, resolve, reject, httpMethod.get, header);
         }
      })
   })

   return promise
}

//get请求
httpRequest.get = (url, params) => {
   return httpRequest(url, {
      data: params
   })
}

//post请求
httpRequest.post = (url, params) => {
   return httpRequest(url, {
      data: params,
      method: httpMethod.post
   })
}

module.exports = {
   httpRequest: httpRequest,
}