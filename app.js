import { ToastPanel } from './component/toast/toast.js'
//app.js
App({
  ToastPanel,
  onLaunch: function () {
    var thiz = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        thiz.globalData.scrollHeight = res.windowHeight;         
      }
    });
  },
  globalData: {
    userInfo: null,
    hasUserInfo:false,
    scrollHeight:0
  }
})