// 加载计时
const loadTime = {
   totalTime: Date.now(),
   isFirstLoad: true
}

import base from '/main.js' // 导入基础模块
const {
   httpRequest,
   appApi,
   logger,
   tool,
   globalEnum,
   version
} = base

var networkType, that, appOptions = {}

App({
   // 启动时执行
   onLaunch: function(options) {
      that = this;
      appOptions = options; // 小程序启动时接收的参数
      wx.getNetworkType({ // 获取网络状态信息
         success: function(res) {
            networkType = res.networkType;
         },
      });

      wx.onNetworkStatusChange(function(res) { // 监听网络状态
         networkType = res.isConnected ? res.networkType : '未打开网络';
      });
   },
   onShow: function() {
      var that = this;
      version.upgradeApp(); // 检查更新
      wx.getSystemInfo({ // 检查微信版本
         success: function(res) {
            console.log('系统信息', res)
            
            // 检测微信版本是否低于目标版本
            version.checkVersion(res.version, '7.0.4', () => {
               wx.clearStorageSync()
            })
         }
      });

      if (loadTime.isFirstLoad) {
         loadTime.isFirstLoad = false
         console.log('启动加载耗时：', (Date.now() - loadTime.totalTime) * 1.0 / 1000)
      }
   },
   globalData: { // 全局数据
      appLoad: loadTime,
      getAppOptions: function () {
         return appOptions
      }
   },
   getLoginInfo: function () { // 获取本地存储的登录信息
      let loginInfo = wx.getStorageSync(globalEnum.storageKeys.loginInfo)
      if (loginInfo) {
         return loginInfo;
      } else {
         wx.showModal({
            title: '提示',
            content: '您尚未登录或登录信息已过期，请重新登录',
            showCancel: false,
            success: function () {
               wx.clearStorageSync();
               wx.reLaunch({
                  url: '/Pages/login/login',
               });
            }
         });
         return '';
      }
   },
   onError: function(err) { // 监听错误
      if (logger) {
         logger.log('小程序逻辑层发生异常', err);
      } else {
         console.log('小程序逻辑层发生异常----时间：' + tool.sampleFormatTime(new Date(Date.now())) + '-----异常信息：', err);
      }

      var curPages = getCurrentPages();
      var errorDetail = {};
      var errLength = err.split('\n').length

      for (var i = 2; i < errLength; i++) {
         errorDetail[i - 1] = err.split('\n')[i];
      }

      // 上报错误信息
      httpRequest.post(appApi.apis.ReportError, {
         loginInfo: this.globalData.loginInfo,
         error: {
            errorMessage: err.split('\n')[0],
            description: err.split('\n')[1],
            detail: errorDetail
         },
         errorData: wx.getStorageSync(feiCheEnum.constValue.errData) || '',
         currentPage: {
            route: curPages[curPages.length - 1] ? curPages[curPages.length - 1].route : '',
            options: curPages[curPages.length - 1].options,
            data: curPages[curPages.length - 1].data
         },
         breadcrumb: {
            time: tool.sampleFormatTime(new Date(Date.now())),
            belong: "Page",
            route: curPages[curPages.length - 1].route,
            options: curPages[curPages.length - 1].options
         },
         networkType: networkType,
         systemInfo: wx.getSystemInfoSync()
      });
   }
})