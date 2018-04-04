// pages/member/withdraw/withdraw.js
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
    defaultCash: 0,
    cash:0,
    password:'',
    factCash:0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
      defaultCash: cashInteral,
      cash: cashInteral,
      factCash: (cashInteral * 0.9).toFixed(0)
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
  /**金额 */
  cashInput: function (e) {
    var cash = e.detail.value;
    this.setData({
      cash: cash,
      factCash:(cash*(0.9)).toFixed(0)
    });    
  },
  /**交易密码 */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  /*提交申请*/
  onConfirmWithdraw: function () {
    var cash = this.data.cash;
    var defaultCash = this.data.defaultCash;
    var factCash = this.data.factCash;
    var password = this.data.password;
    var userInfo = app.globalData.userInfo;

    if (userInfo.bank == null || userInfo.bankCardNo==null ||
        userInfo.bank == '' || userInfo.bankCardNo==''){
        wx.showModal({
          title: '提示',
          content: '请设置您的银行账号信息',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/member/setting/bank/bank',
              })              
            }
          }
        });
    } else if (cash == 0 || UTIL.isNumTest(cash) == false) {
      this.show('请输入合法提现金额');
    } else if (cash > defaultCash) {
      this.show('不能大于可提现金额');
    } else if (cash%100 != 0) {
      this.show('提现金额必需为100的倍数');
    } else if (password.length == 0) {
      this.show('请输入交易密码');
    } else {
      var thiz = this;
      network.requestLoading(config.getEncodePwd, { password: password }, '加载中', function (result) {
        var userInfo = app.globalData.userInfo;
        if (result == null || userInfo.password != result) {
          thiz.show("交易密码错误");
        } else {          
          var params = {
            phone: userInfo.phone,
            name: userInfo.name,
            money: cash,
            factSum: factCash,
            charge: (cash - factCash)
          }
          network.requestLoading(config.applyWithdraw, params, '加载中', function (result) {
            if (result) {              
              thiz.show("提现申请成功");
              setTimeout(
                function () {
                  wx.navigateBack({

                  });
                }
                , 1500);
            }else{
              thiz.showToastSeconds("您目前已有提现申请并审核中,请等待",3000);
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