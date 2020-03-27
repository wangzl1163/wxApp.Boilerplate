const dateTool = require('/DateUtil.js')
const globalEnum = require('../Enums/GlobalEnum.js')
const systemInfo = JSON.stringify(wx.getSystemInfoSync())

// 请求方式
const httpMethod = {
   get: 'GET',
   post: 'POST'
}

// 默认配置
const defaultConfig = {
   header: {
      'contentType': 'application/json', // 默认json，可以修改
      'getAuthorization': () => wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken == undefined ? 'BasicAuth' : 'BasicAuth ' + wx.getStorageSync(globalEnum.storageKeys.loginInfo).AuthorityToken,
      'systemInfo': systemInfo
   },
   dataType: 'json', // 返回的数据格式，默认json，可修改
   responseType: 'text', // 响应的数据类型，默认text，可修改
   loading: true, // 是否显示loading动画
   delay: 1000, // loading动画延迟显示的时间，单位：毫秒（ms）
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
      if (res.data.Code === 1) { // 成功，Code判断的值根据实际api返回进行修改
         return resolve(res.data.Data)
      }

      if (res.data.Code === 0) { // 失败
         wx.showToast({
            title: res.data.Message,
            icon: 'none'
         })

         return reject(res.data.Data)
      }
   } else {
      wx.showToast({
         title: '加载数据失败了，请重试',
         icon: 'none'
      })

      return reject(res.data.Data)
   }
}

function failCallback(res, url, params, resolve, reject, method, header) {
   httpLogErr(url, params, res, header);

   if (res.errMsg.includes('request:fail')) {
      wx.showToast({
         title: '网络无法连接服务器，请稍后再试',
         icon: 'none'
      });
   }

   return reject(res)
}

const httpRequest = (url, {
   data = {},
   method = httpMethod.get,
   dataType = defaultConfig.dataType,
   responseType = defaultConfig.responseType,
   header = {},
   loading = defaultConfig.loading,
   delay = defaultConfig.delay
} = {}) => {
   const headers = Object.assign({
      // header采用拼接是为了防止本地存储的loginInfo被其他地方修改了而不能得到最新
      'content-type': defaultConfig.header.contentType,
      'Authorization': defaultConfig.header.getAuthorization(),
      'systemInfo': defaultConfig.header.systemInfo
   }, header)

   /** 秒级响应不再显示loading弹窗 */
   let timeoutId = setTimeout(() => {
      if (loading) {
         timeoutId = 0

         wx.showLoading({
            title: '加载中',
            mask: true
         })
      }
   }, delay)

   const promise = new Promise((resolve, reject) => {
      wx.request({
         url: url,
         data: data,
         method: method,
         header: headers,
         dataType: dataType,
         responseType: responseType,
         success(res) {
            loading = false

            // timeoutId为0时说明已经执行了wx.showLoading
            // 则此时需要调用wx.hideLoading
            // wx.showToast与wx.showLoading只能存在一个，故fail中不再调用wx.hideLoading
            if (timeoutId === 0) {
               wx.hideLoading()
            }

            successCallback(res, url, data, resolve, reject, method, header);
         },
         fail(res) {
            failCallback(res, url, data, resolve, reject, method, header);
         }
      })
   })

   return promise
}

// 扩展请求方式
Object.keys(httpMethod).forEach(method => {
    httpRequest[method] = (url, params = {}, config = {}) => {
      return httpRequest(url, {
         data: params,
         method: httpMethod[method],
         ...config
      })
   }
})

module.exports = httpRequest
