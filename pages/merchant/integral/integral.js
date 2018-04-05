// pages/merchant/integral/integral.js
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
    consumeInteral:0,
    consumeInteralInit: 0,
    consumeInteralValid:false
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
      consumeInteral: cashInteral,
      consumeInteralInit: cashInteral
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
    var consumeInteralInit = this.data.consumeInteralInit;
    var consumeInteral = e.detail.value;
    if (consumeInteral > consumeInteralInit){           
      this.show('兑换的现金积分不能大于总积分');
      return;
    }
    
    this.setData({
      consumeInteral: consumeInteral,
      consumeInteralValid:true
    });
  },
  onConfirmChange: function () {
    var consumeInteral = this.data.consumeInteral;
    var consumeInteralValid = this.data.consumeInteralValid;
    var consumeInteralInit = this.data.consumeInteralInit;
    var userInfo = app.globalData.userInfo;

    if (consumeInteral == 0) {
      this.show('对不起，兑换积分不能为0');
    } else if ((consumeInteral > consumeInteralInit) || !consumeInteralValid) {
      this.show('兑换的现金积分不能大于总积分');
    } else {
      var thiz = this;
      var params = {
        userId: wx.getStorageSync(constant.USERID),
        merchantPhone: userInfo.phone,
        interal: consumeInteral
      }
      network.requestLoading(config.merchantInteralChange, params, '加载中', function (result) {
        if (result) {
          //更新缓存
          var userInfo = app.globalData.userInfo;
          userInfo.changeBonus = userInfo.changeBonus + parseInt(consumeInteral);
          thiz.show("兑换积分成功");
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

  }
})