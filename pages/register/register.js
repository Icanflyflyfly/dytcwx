// pages/login/login.js
import { ToastPanel } from '../../component/toast/toast.js'
const app = getApp()
const UTIL = require('../../utils/util.js')
const constant = require('../../utils/constant.js')
const network = require('../../utils/network.js')
const config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    phone:'',
    pwd1:'',
    pwd2: '',
    userName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    new app.ToastPanel(); 
    var thiz = this;
    UTIL.getCurrentUserInfo(function (res) {
      thiz.setData({
        userInfo: {
          avatarUrl: res.avatarUrl,
          nickName: res.nickName,
          gender: res.gender
        },
        hasUserInfo: true
      });

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
  imageLoad: function (e) {
    var imageSize = UTIL.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  /**手机号 */
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
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
  /**真实姓名 */
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    });
  },   
  onRegister:function(){
    var phone = this.data.phone;
    var pwd1 = this.data.pwd1;
    var pwd2 = this.data.pwd2;
    var userName = this.data.userName;
    if (phone.length == 0) {
      this.show('请输入手机号');     
    } else if (!UTIL.isPhoneNo(phone)) {
      this.show('请输入正确的手机号');
    } else if (pwd1.length == 0) {
      this.show('请输入密码');
    } else if (pwd1.length < 6) {
      this.show('请至少输入6位密码');
    } else if (pwd2.length == 0) {
      this.show('请再次输入密码');
    } else if (pwd1 != pwd2) {
      this.show('两次输入密码不一致');
    } else if (userName.length == 0) {
      this.show('请输入真实姓名');
    } else {
      var userInfo = this.data.userInfo;
      var params = {
        userId: wx.getStorageSync(constant.USERID),
        phone: phone,
        pwd:pwd1,
        avatar: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        userName: userName
      };
      var thiz = this;
      network.requestLoading(config.findUserByPhone, { phone: this.data.phone }, '加载中', function (result) {
        if (result == null){
          network.requestLoading(config.bindPhoneUrl, params, '加载中', function (result) {
            wx.setStorageSync(constant.USER_IS_BIND, true);
            getApp().globalData.userInfo = params;
            wx.reLaunch({
              url: '../member/member'
            })
          }, function (error) {
            this.show(error.msg);
          })
        }else{
          thiz.show('对不起，此用户已经存在');
        }
          
      }, function (error) {
        thiz.show(error.msg);
      })
      
    }
  }

})