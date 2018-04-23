//merchant.js
const app = getApp()
const UTIL = require('../../utils/util.js')
const REQUESTUTIL = require('../../utils/requestUtil.js')
const CONSTANT = require('../../utils/constant.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    flag:0
  },
  onLoad: function () {    
    var thiz = this;    
    thiz.setData({
      flag: 1
    });
    var userInfo = app.globalData.userInfo;
    if(userInfo != null){
      if (thiz.showModalMerchant() == false) return;
    }
    wx.showLoading({
      title: '系统登录中...',
      mask: true
    })
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
            if (thiz.showModalMerchant() == false) return;
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
          } else {                        
            thiz.setData({
              userInfo: getApp().globalData.userInfo,
              hasUserInfo: true
            });
            if (thiz.showModalMerchant() == false) return;
          }

        });

      }
    });
    
  }, 
  imageLoad: function (e) {
    var imageSize = UTIL.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  showModalMerchant:function(){
    var userInfo = app.globalData.userInfo;
    if (userInfo.merchant == null || userInfo.merchant == false) {
      wx.showModal({
        title: '提示',
        content: '您还是商家，请联系业务经理申请成为商家',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }

        }
      })
      return false;
    }
    return true;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userInfo = app.globalData.userInfo;
    if (userInfo != null && this.data.flag == 1) {
      this.showModalMerchant();
    }
  }
})
