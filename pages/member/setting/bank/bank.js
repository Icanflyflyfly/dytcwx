// pages/member/setting/bank/bank.js
import { ToastPanel } from '../../../../component/toast/toast.js'
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
    bank:'',
    bankCardNo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPanel(); 
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
  /**开户行*/
  bankInput: function (e) {
    this.setData({
      bank: e.detail.value
    });
  },
  /**银行卡号 */
  bankCardNoInput: function (e) {
    this.setData({
      bankCardNo: e.detail.value
    });
  },
  onUpdateBank:function () {
    var thiz = this;
    var bank = this.data.bank;
    var bankCardNo = this.data.bankCardNo;
    
    if (bank.length == 0) {
      this.show('请输入开户行');
    } else if (bankCardNo.length == 0) {
      this.show('请输入银行卡号');
    } else {
      var params = {
        userId: wx.getStorageSync(constant.USERID),
        bank: bank,
        bankCardNo: bankCardNo
      };

      network.requestLoading(config.updateBank, params, '加载中', function (result) {
        thiz.show('开户行修改成功');
        setTimeout(
          function () {
            wx.navigateBack({
              
            });
          }
          , 1500);
        var userInfo = getApp().globalData.userInfo; 
        userInfo.bank = bank;
        userInfo.bankCardNo = bankCardNo;
      }, function (error) {
        thiz.show(error.msg);
      })
    }
  }
  
})