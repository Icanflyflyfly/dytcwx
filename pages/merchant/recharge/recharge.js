// pages/merchant/recharge/recharge.js
import { ToastPanel } from '../../../component/toast/toast.js'
const app = getApp()
const UTIL = require('../../../utils/util.js')
const constant = require('../../../utils/constant.js')
const network = require('../../../utils/network.js')
const config = require('../../../utils/config.js')
const REQUEST = require('../../../utils/request.js')
Page({

  data: {
    items: [
      { name: 'wx', value: '微信', checked: 'true' },
      { name: 'zfb', value: '支付宝' }
    ],
    imageList: [],
    charge:0,
    payDisabled:false
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
    var chargeVal = e.detail.value;
    if (!UTIL.isNumTest(chargeVal)){
      this.show('请输入正确的充值金额');
    }
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
      //提交订单
      var params = {
        totalAmount: charge,
        buyerId: userInfo.id,
        remarks:'商家充值'
      }
      network.requestLoading(config.submitOrder, params, '加载中', function (result) {
        var orderId = result.id;
        if (result != null) {
          REQUEST.payment(result.orderNo, function (result) {
            thiz.payBtnStatus(true);
            wx.requestPayment({
              timeStamp: result.timeStamp,
              nonceStr: result.nonceStr,
              package: result.package,
              signType: result.signType,
              paySign: result.paySign,
              success: function (res) {
                 console.log("支付成功: " + JSON.stringify(res));  
                 thiz.paySuccessHandle(userInfo, charge, orderId);               
              },
              fail: function (res) {
                thiz.payBtnStatus(false);
                thiz.show('支付未成功, 请稍后再试');
                console.log("支付失败: " + res.data);
                if (res.errMsg != "requestPayment:fail cancel") {
                  console.log('支付失败, 请稍后再试');
                }
              },
              complete: function (res) {                 
                
              },
            })
          }, function (error) {
            thiz.payBtnStatus(false);
            console.log(error.msg);
          })
        }
      }, function (error) {
        console.log(error.msg);
      });      

    }
  },
  payBtnStatus: function (payDisabled){
    this.setData({
      payDisabled: payDisabled
    });
    
  },
  paySuccessHandle: function (userInfo, charge, orderId){
    var thiz = this;
    var params = {
      merchantPhone: userInfo.phone,
      money: charge,
      orderId: orderId
    }

    network.requestLoading(config.chargeMoney, params, '加载中', function (result) {
      if (result) {
        thiz.show('恭喜您，充值成功');
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
  
})