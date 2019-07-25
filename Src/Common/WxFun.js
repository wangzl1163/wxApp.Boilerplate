//对常用微信小程序API的封装

//显示提示窗口，参数和类型与wx.showToast一致
function showToast(title, icon, duration,cbf){
  wx.showToast({
    title: title,
    icon: icon || 'none',
    duration: duration ? duration : 3000,
    success:cbf || function(){}
  });
}

//显示消息模态框，参数和类型与wx.showModal一致
function showModal(title, content, showCancel,success){
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    success: success
  })
}

function showLoading(title,mask,success,fail,complete){
  wx.showLoading({
    title: title || '加载数据中',
    mask: mask || true,
    success: success || function (res) { },
    fail: fail || function (res) { },
    complete: complete || function (res) { },
  })
}

//关闭所有页面并跳转到指定页面，参数和类型与wx.reLaunch一致
function reLaunch(url){
  wx.reLaunch({
    url: url,
  })
}

module.exports = {
  showToast: showToast,
  showModal: showModal,
  showLoading: showLoading,
  reLaunch: reLaunch
}