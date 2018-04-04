//member.js
const app = getApp()
const UTIL = require('../../utils/util.js')
const REQUESTUTIL = require('../../utils/requestUtil.js')
const CONSTANT = require('../../utils/constant.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },  
  onPullDownRefresh: function () {
    REQUESTUTIL.userReLogin();
    wx.stopPullDownRefresh()
  },
  onLoad: function () {
      wx.showLoading({
        title: '系统登录中...',
        mask:true
      })
      var thiz = this;    
      // 在没有 open-type=getUserInfo 版本的兼容处理  
      wx.checkSession({
        success: function () {         
          // session未过期
          REQUESTUTIL.userLogin(true, function () {
            wx.hideLoading();
            var userIsBind = wx.getStorageSync(CONSTANT.USER_IS_BIND);
            console.log('userIsBind = ' + userIsBind);
            if (userIsBind == false) {
              wx.redirectTo({
                url: '/pages/register/register',
              });
            } else {
              thiz.setData({
                userInfo: getApp().globalData.userInfo,
                hasUserInfo: true
              });
            }
          });

          
          console.log('session未过期 ');
        },
        fail: function () {
          // 登录态过期
          REQUESTUTIL.userLogin(true, function () {
            wx.hideLoading();
            var userIsBind = wx.getStorageSync(CONSTANT.USER_IS_BIND);
            console.log('userIsBind = ' + userIsBind);
            if (userIsBind == false) {
              wx.redirectTo({
                url: '/pages/register/register',
              });                            
            }else{              
              thiz.setData({
                userInfo: getApp().globalData.userInfo,
                hasUserInfo: true
              });
            }            
            
          });

        }
      })    
     

  },
  imageLoad: function (e) {
    var imageSize = UTIL.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  scanTap:function(){
    wx.scanCode();
  }
})
