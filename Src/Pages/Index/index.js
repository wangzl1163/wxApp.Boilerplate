//index.js
//获取应用实例
const app = getApp()
const { globalEnum } = app.utils

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
     ...require('./Data.js') // 在此处引用，只在该页面运行时才会加载data
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const loginInfo = app.getLoginInfo()

    if (loginInfo.userInfo) {
      this.setData({
        userInfo: loginInfo.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    wx.setStorage({
      data: {
        userInfo: e.detail.userInfo
      },
      key: globalEnum.storageKeys.loginInfo,
    })
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
