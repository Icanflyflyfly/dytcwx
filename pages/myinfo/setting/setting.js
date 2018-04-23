// pages/member/setting/setting.js
const app = getApp()
const CONSTANT = require('../../../utils/constant.js')
const network = require('../../../utils/network.js')
const config = require('../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    phone: ''
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
      userInfo: userInfo,
      phone: userInfo.phone.substr(0, 3) + '****' + userInfo.phone.substr(7)
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

  },
  findUserById: function () {
    var userId = wx.getStorageSync(CONSTANT.USERID);
    var thiz = this;
    network.requestLoading(config.findUserById, { userId: userId }, '加载中', function (result) {
      thiz.setData({
        userInfo: result,
        phone: result.phone.substr(0, 3) + '****' + result.phone.substr(7)
      });
    }, function (error) {
      thiz.show(error.msg);
    })
  }
})