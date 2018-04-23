// pages/member/wallet/repeat/repeat.js
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
    cashInteral: 0,
    interal:0,
    password:''
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
    var userInfo = app.globalData.userInfo;
    var cashInteral = (userInfo.totalBonus == null ? 0 : userInfo.totalBonus) + (userInfo.totalReturned == null ? 0 : userInfo.totalReturned) + (userInfo.giftBonus == null ? 0 : userInfo.giftBonus) - (userInfo.changeBonus == null ? 0 : userInfo.changeBonus);
    this.setData({
      cashInteral: cashInteral,
      interal: cashInteral
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
  /**现金积分 */
  interalInput: function (e) {
    this.setData({
      interal: e.detail.value
    });
  },
  /**交易密码 */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  onConfirmPay: function () {
    var cashInteral = this.data.cashInteral;
    var interal = this.data.interal;    
    var password = this.data.password;
    var userInfo = app.globalData.userInfo;
    
    if (cashInteral == 0) {
      this.show('对不起，您可兑换积分为0');
    }  else if (interal == 0 || interal > cashInteral) {
      this.show('请输入正确的转赠金额');
    } else if (password.length == 0) {
      this.show('请输入交易密码');
    } else {
      var thiz = this;
      network.requestLoading(config.getEncodePwd, { password: password }, '加载中', function (result) {
        if (result == null || userInfo.password != result) {
          thiz.show("对不起，请输入正确的交易密码");
        } else {
          var params = {
            serId: wx.getStorageSync(constant.USERID),
            interal: interal
          }
          network.requestLoading(config.interalChange, params, '加载中', function (result) {
            if (result) {
              //更新缓存
              var userInfo = app.globalData.userInfo;
              userInfo.changeBonus = userInfo.changeBonus + interal/10;
              thiz.show("重复消费成功");
              setTimeout(
                function () {
                  wx.navigateBack({

                  });
                }
                , 1500);

            }

          }, function (error) {
            thiz.show(error.msg);
          })
        }

      }, function (error) {
        thiz.show(error.msg);
      })


    }

  }
})