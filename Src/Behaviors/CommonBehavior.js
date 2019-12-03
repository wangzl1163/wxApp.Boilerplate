const {
   httpRequest,
   appApi,
   globalEnum,
   wxFun,
   commonFun
} = wx.utils

module.exports = Behavior({
   data: {
      showPage: false, // 是否展示页面
   },
   methods: {
      /**
       * 验证登录
       * 已登录则执行后续resolve
       * 未登录时执行后续reject
       * @param {bool} onlyLoginInfo 登录过期时是否只清除loginInfo
       */
      verifyLogin(onlyLoginInfo = false) {
         /**
          * 检测本地是否有loginInfo，无loginInfo，则跳转到登录页面
          * 有loginInfo:
          * 无网络时直接执行后续操作（缺点：token可能已过期）
          * 有网络时请求服务器进一步验证
          */

         return new Promise((resolve, reject) => {
            const loginInfo = wx.getStorageSync(globalEnum.storageKeys.loginInfo)

            wx.getNetworkType({
               success: res => {
                  // 无loginInfo，执行reject
                  if (!loginInfo) {
                     commonFun.loginTimeOut({
                        data: {
                           Code: 403
                        }
                     }, onlyLoginInfo)

                     return reject()
                  }

                  // 有loginInfo，有网络
                  if (res.networkType !== 'none') {
                     return this.tokenCheck(onlyLoginInfo).then(() => resolve()).catch(() => reject())
                  } else {
                     // 无网络
                     return resolve()
                  }
               },
               fail: () => {
                  // 无loginInfo，执行reject
                  if (!loginInfo) {
                     commonFun.loginTimeOut({
                        data: {
                           Code: 403
                        }
                     }, onlyLoginInfo)

                     return reject()
                  } else {
                     return this.tokenCheck(onlyLoginInfo).then(() => resolve()).catch(() => reject())
                  }
               }
            })
         })
      },

      /**
       * 校验token——由服务器验证token，验证是否登录
       * @param {bool} onlyLoginInfo 未登录时是否只清除loginInfo
       */
      tokenCheck(onlyLoginInfo = false) {
         wxFun.showLoading('处理数据中')

         return new Promise((resolve, reject) => {
            return httpRequest.post(appApi.urls.TokenStateCheck, '')
               .then((res) => {
                  wx.hideLoading()

                  // token无效或未登录
                  if (res.data.Code == 9 || res.data.Code == 403) {
                     commonFun.loginTimeOut(res, onlyLoginInfo)
                     return reject()
                  }

                  // token有效
                  if (res.data.Code == 1) {
                     return resolve()
                  }
               })
         })
      }
   }
})