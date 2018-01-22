// pages/member/setting/password/password.js
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
    pwdOld:'',
    pwd1: '',
    pwd2: ''
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
  /**老密码1 */
  pwdOldInput: function (e) {
    this.setData({
      pwdOld: e.detail.value
    });
  },
  /**密码1 */
  pwd1Input: function (e) {
    this.setData({
      pwd1: e.detail.value
    });
  },
  /**密码2 */
  pwd2Input: function (e) {
    this.setData({
      pwd2: e.detail.value
    });
  },
  onUpdatePwd:function(){
    var thiz = this;
    var pwdOld = this.data.pwdOld;
    var pwd1 = this.data.pwd1;
    var pwd2 = this.data.pwd2;
    if (pwdOld.length == 0) {
      this.show('请输入原密码');
    } else if (pwd1.length == 0) {
      this.show('请输入新密码');
    } else if (pwd2.length == 0) {
      this.show('请再次输入新密码');
    } else if (pwd1.length < 6) {
      this.show('请至少输入6位密码');
    } else if (pwd1 != pwd2) {
      this.show('两次输入密码不一致');
    } else {
      var params = {
        userId: wx.getStorageSync(constant.USERID),
        oldPassword: pwdOld,
        newPassword: pwd1
      };

      network.requestLoading(config.updatePwd, params, '加载中', function (result) {
        thiz.show('密码修改成功');
        setTimeout(
          function(){
            wx.navigateBack({
              
            });
          }
        ,1500);
        
        
      }, function (error) {
        thiz.show(error.msg);
      })
    }
  }
  
})