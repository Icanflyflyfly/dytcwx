// pages/register/wxregister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '系统加载中...',
      mask: true
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
          } else {
            thiz.setData({
              userInfo: getApp().globalData.userInfo,
              hasUserInfo: true
            });
          }

        });

      }
    })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})