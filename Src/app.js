//app.js

// 加载计时
const loadTime = {
   totalTime: Date.now(),
   isFirstLoad: true
}
import base from '/index.js' // 导入基础模块
const updateManager = wx.canIUse('getUpdateManager') ? wx.getUpdateManager() : null; // 更新管理器
const {
   httpHelper,
   appApi,
   logger,
   tool,
   globalEnum
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
      that.upgradeApp(); // 检查更新
      wx.getSystemInfo({ // 检查微信版本
         success: function(res) {
            console.log('系统信息', res);
            if (that.compareVersion(res.version, '6.6.1') == -1 && that.globalData.isShowVersionCue) {
               that.globalData.isShowVersionCue = false;
               wx.showModal({
                  title: '请升级微信',
                  content: '您的微信版本过低，将无法正常使用此小程序，请立即升级。',
                  showCancel: false,
                  confirmText: '我知道了',
                  confirmColor: '#007AFF',
                  success: res => {
                     if (res.confirm) {
                        that.globalData.isShowVersionCue = true;
                        wx.clearStorageSync()
                     }
                  }
               });
            }
         }
      });

      if (loadTime.isFirstLoad) {
         loadTime.isFirstLoad = false
         console.log('启动加载耗时：', (Date.now() - loadTime.totalTime) * 1.0 / 1000)
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
      httpHelper.httpRequest.post(appApi.apis.ReportError, {
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
   },
   globalData: { // 全局数据
      isShowVersionCue: true,
      appLoad: loadTime,
      getAppOptions: function() {
         return appOptions
      }
   },
   getLoginInfo: function() { // 获取本地存储的登录信息
      let loginInfo = wx.getStorageSync(globalEnum.storageKeys.loginInfo)
      if (loginInfo) {
         return loginInfo;
      } else {
         wx.showModal({
            title: '提示',
            content: '您尚未登录或登录信息已过期，请重新登录',
            showCancel: false,
            success: function() {
               wx.clearStorageSync();
               wx.reLaunch({
                  url: '/Pages/login/login',
               });
            }
         });
         return '';
      }
   },
   /**
    * 版本比较
    * 1：v1>v2
    * -1：v1<v2
    * 0:v1=v2
    */
   compareVersion: function(v1, v2) {
      v1 = v1.split('.')
      v2 = v2.split('.')
      var len = Math.max(v1.length, v2.length)

      while (v1.length < len) {
         v1.push('0')
      }
      while (v2.length < len) {
         v2.push('0')
      }

      for (var i = 0; i < len; i++) {
         var num1 = parseInt(v1[i])
         var num2 = parseInt(v2[i])

         if (num1 > num2) {
            return 1
         } else if (num1 < num2) {
            return -1
         }
      }

      return 0
   },
   // 升级小程序
   upgradeApp: function() {
      /**
       * 小程序更新管理
       */
      if (updateManager) {
         //检查版本信息
         updateManager.onCheckForUpdate((res) => {
            console.log('版本信息:', res);
            if (res.hasUpdate) {
               console.log('升级，清理缓存')
               wx.clearStorageSync();
            }
         });
         //下载完成
         updateManager.onUpdateReady(() => {
            var that = this
            wx.showModal({
               title: '更新提示',
               content: '新版本已经准备好，重启应用',
               showCancel: false,
               success: function(res) {
                  if (res.confirm) {
                     // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                     updateManager.applyUpdate();
                  }
               }
            });
         });
         //下载失败
         updateManager.onUpdateFailed(() => {
            wx.showToast({
               title: '小程序更新失败，请关闭小程序重试！',
               icon: 'none'
            });
         });
      }
   },
   utils: base
})