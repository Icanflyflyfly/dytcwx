// pages/member/wallet/switch/switch.js
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
    cashInteral:0,
    phone:'',
    giftInteral:0,
    password:'',
    userName:'',
    toUserId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPanel(); 
    var userInfo = app.globalData.userInfo;
    var cashInteral = (userInfo.totalBonus == null ? 0 : userInfo.totalBonus) + (userInfo.totalReturned == null ? 0 : userInfo.totalReturned) + (userInfo.giftBonus == null ? 0 : userInfo.giftBonus) - (userInfo.changeBonus == null ? 0 : userInfo.changeBonus);
    this.setData({
      cashInteral: cashInteral,
      giftInteral: cashInteral
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
  /**手机号 */
  toPhoneInput: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
    });
    if(phone.length == 11){
      this.findUserByPhone();
    }
  },
  /**现金积分 */
  toCashInput: function (e) {
    this.setData({
      giftInteral: e.detail.value
    });
  },
  /**交易密码 */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  findUserByPhone:function(){
    var thiz = this;
    network.requestLoading(config.findUserByPhone, {phone:this.data.phone}, '加载中', function (result) {
      if (result == null){
        thiz.show("对不起，此用户不存在");
      }else{
        thiz.setData({
          userName: result.name == null ? "" : result.name,
          toUserId: result.id
        });
      }
      
    }, function (error) {
      thiz.show(error.msg);
    })
  },
  onConfirmGift: function () {    
    var cashInteral = this.data.cashInteral;
    var giftInteral = this.data.giftInteral;
    var phone = this.data.phone;
    var password = this.data.password;
    var userInfo = app.globalData.userInfo;
    var toUserId = this.data.toUserId;

    if (cashInteral == 0) {
      this.show('对不起，您可转现金积分总额为0');
    } else if (phone.length == 0) {
      this.show('请输入转入方账号');
    } else if (giftInteral == 0 || giftInteral > cashInteral) {
      this.show('请输入正确的转赠金额');
    } else if (password.length == 0) {
      this.show('请输入交易密码');
    } else{
      var thiz = this;
      network.requestLoading(config.getEncodePwd, { password: password }, '加载中', function (result) {
        if (result == null || userInfo.password != result) {
          thiz.show("对不起，请输入正确的交易密码");
        } else {
          var params = {
            fromUserId: wx.getStorageSync(constant.USERID),
            toUserId: toUserId,
            interal: giftInteral
          }
          network.requestLoading(config.interalGift, params, '加载中', function (result) {
            if (result) {
              //更新缓存
              var userInfo = app.globalData.userInfo;
              userInfo.giftBonus = userInfo.giftBonus - giftInteral;
              thiz.show("赠予成功");
            }
            setTimeout(
              function () {
                wx.navigateBack({

                });
              }
              , 1500);


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