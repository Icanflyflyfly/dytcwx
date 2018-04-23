// pages/register/wxregister.js
import { ToastPanel } from '../../../component/toast/toast.js'
const app = getApp()
const UTIL = require('../../../utils/util.js')
const REQUESTUTIL = require('../../../utils/requestUtil.js')
const CONSTANT = require('../../../utils/constant.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    disabled:'n'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('wxregister onLoad options ---------> ' + JSON.stringify(options));
    if (options.phone != null && options.phone != '') {
      this.setData({
        phone: options.phone,
        disabled: options.disabled
      });
    }
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
              url: '/pages/register/register?phone=' + (thiz.data.phone) + '&disabled=' + (thiz.data.disabled),
            });
          } else {
            thiz.setData({
              userInfo: getApp().globalData.userInfo,
              hasUserInfo: true
            });
            wx.switchTab({
              url: '/pages/member/member',
            })            
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
              url: '/pages/register/register?phone=' + (thiz.data.phone),
            });
          } else {
            thiz.setData({
              userInfo: getApp().globalData.userInfo,
              hasUserInfo: true
            });
            wx.switchTab({
              url: '/pages/member/member',
            })
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