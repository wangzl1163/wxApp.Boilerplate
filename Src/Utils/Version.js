class Version {
   constructor() {
      this.isShowVersionCue = true
      // 更新管理器
      this.updateManager = wx.canIUse('getUpdateManager') ? wx.getUpdateManager() : null
   }

   // 升级小程序
   upgradeApp() {
      /**
       * 小程序更新管理
       */
      if (this.updateManager) {
         //检查版本信息
         this.updateManager.onCheckForUpdate((res) => {
            console.log('版本信息:', res);
            if (res.hasUpdate) {
               console.log('升级，清理缓存')
               wx.clearStorageSync();
            }
         });
         //下载完成
         this.updateManager.onUpdateReady(() => {
            var that = this
            wx.showModal({
               title: '更新提示',
               content: '新版本已经准备好，重启应用',
               showCancel: false,
               success: function(res) {
                  if (res.confirm) {
                     // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                     this.updateManager.applyUpdate();
                  }
               }
            });
         });
         //下载失败
         this.updateManager.onUpdateFailed(() => {
            wx.showToast({
               title: '小程序更新失败，请关闭小程序重试！',
               icon: 'none'
            });
         });
      }
   }

   // 检测微信版本是否符合要求
   checkVersion(currentVersion, targetVersion, successCallback = () => {}) {
      if (this.compareVersion(currentVersion, targetVersion) == -1 && this.isShowVersionCue) {
         this.isShowVersionCue = false;
         wx.showModal({
            title: '请升级微信',
            content: '您的微信版本过低，将无法正常使用此小程序，请立即升级。',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#007AFF',
            success: res => {
               if (res.confirm) {
                  this.isShowVersionCue = true;
                  successCallback()
               }
            }
         });
      }
   }

   /**
    * 版本比较
    * 1：v1>v2
    * -1：v1<v2
    * 0:v1=v2
    */
   compareVersion(v1, v2) {
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
   }
}

module.exports = new Version()