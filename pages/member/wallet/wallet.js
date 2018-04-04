// pages/member/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    totalConsume:0
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var userInfo = getApp().globalData.userInfo;
    this.setData({
      userInfo: userInfo
    });
    var totalConsume = (userInfo.totalConsume == null ? 0 : userInfo.totalConsume) + (userInfo.changeBonus == null ? 0 : userInfo.changeBonus);
    var totalReturned = userInfo.totalReturned == null ? 0 : userInfo.totalReturned;
    var totalBonus = (userInfo.totalBonus == null ? 0 : userInfo.totalBonus);
    this.setData({
      totalConsume: totalConsume,
      totalReturned: totalReturned,
      totalBonus: totalBonus
    });
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