// pages/member/qr/qr.js
import { ToastPanel } from '../../../component/toast/toast.js'
const app = getApp()
const UTIL = require('../../../utils/util.js')
const constant = require('../../../utils/constant.js')
const network = require('../../../utils/network.js')
const config = require('../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxQr : ''
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
    if (userInfo.wxQr == 1){
      this.setData({
        wxQr: config.uploadFile + userInfo.phone + ".jpg"
      });
    }else{
      this.getWxQr();
    }
    
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
  getWxQr: function () {
    var userInfo = getApp().globalData.userInfo;
    var thiz = this;
    var params = {
      phone: userInfo.phone,
      path:'/pages/register/register'
    }
    network.requestLoading(config.wxQr, params, '加载中', function (result) {
      userInfo['wxQr'] = 1;
      thiz.setData({
        wxQr: config.uploadFile + userInfo.phone + ".jpg"
      });
    }, function (error) {
      thiz.show(error.msg);
    })
  }
})