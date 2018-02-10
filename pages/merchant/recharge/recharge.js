// pages/merchant/recharge/recharge.js
const app = getApp()
const UTIL = require('../../../utils/util.js')
const constant = require('../../../utils/constant.js')
const network = require('../../../utils/network.js')
const config = require('../../../utils/config.js')
Page({

  data: {
    items: [
      { name: 'wx', value: '微信', checked: 'true' },
      { name: 'zfb', value: '支付宝' }
    ],
    imageList: [],
    charge:0
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
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
  chargeInput: function (e) {
    this.setData({
      charge: e.detail.value
    });
  },
  onConfirmCharge: function () {
    var charge = this.data.charge;
    var userInfo = app.globalData.userInfo;
    var thiz = this;

    if (charge == 0 || !UTIL.isNumTest(charge)) {
      thiz.show('请输入正确的充值金额');
    } else {      
      var params = {
        merchantPhone: userInfo.phone,
        money: charge
      }

      network.requestLoading(config.chargeMoney, params, '加载中', function (result) {
        if (result) {
          thiz.show("商家充值成功");
          setTimeout(
            function () {
              wx.navigateBack({

              });
            }
            , 1500);

        }

      }, function (error) {
        thiz.show(error.msg);
      });

    }
  }
})