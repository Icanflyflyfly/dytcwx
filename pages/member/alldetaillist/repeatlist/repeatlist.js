// pages/member/wallet/repeatlist/repeatlist.js
const app = getApp()
const UTIL = require('../../../../utils/util.js')
const constant = require('../../../../utils/constant.js')
const network = require('../../../../utils/network.js')
const config = require('../../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    dd: '',
    hidden: false,
    page: 1,
    size: 20,
    hasMore: true,
    scrollHeight: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thiz = this;
    var page = this.data.page;
    var params = {
      page: page,
      sort: [{
        property: 'time',
        direction: 'DESC'
      }]
    }
    network.requestLoading(config.repeatDetail, params, '加载中', function (result) {
      if (result.data) {
        thiz.setData({
          list: result.data,
          hidden: true,
        });
      }
      if (result.totalCount <= ((thiz.data.page) * (thiz.data.size))) {
        thiz.setData({
          list: result.data,
          hidden: true,
          hasMore: false
        });
      } else {
        thiz.setData({
          list: result.data,
          hidden: true,
          hasMore: true
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    });
    wx.getSystemInfo({
      success: function (res) {
        thiz.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
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
  
  },
  loadMore: function (e) {
    var thiz = this;

    if (!thiz.data.hasMore) return;
    var page = ++(this.data.page);
    var params = {
      page: page,
      sort: [{
        property: 'time',
        direction: 'DESC'
      }]
    }
    network.requestLoading(config.repeatDetail, params, '加载中', function (result) {
      if (result.totalCount <= ((thiz.data.page) * (thiz.data.size))) {
        thiz.setData({
          list: thiz.data.list.concat(result.data),
          hidden: true,
          hasMore: false
        });
      } else {
        thiz.setData({
          list: thiz.data.list.concat(result.data),
          hidden: true,
          hasMore: true
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    });
  }
})