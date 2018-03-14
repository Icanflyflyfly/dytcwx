// pages/merchant/consumeinput/consumeinput.js
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
    totalMoney:0,
    money: 0,
    memo: '',
    password: '',
    phone:'',//消费会员电话
    merchantPhone:'',//商家会员电话
    userName:'',
    fromUserName:'',
    fromPhone:'',
    inputUserName: '',
    inputPhone: '',
    memberValid:false,
    moneyValid: false,
    toUserId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.ToastPanel();

    var userInfo = getApp().globalData.userInfo;
    var thiz = this;
    
    network.requestLoading(config.merchantFindByPhone, { merchantPhone: userInfo.phone}, '加载中', function (result) {
      if (result) {
        thiz.setData({
          totalMoney: result.money == null ? 0 : result.money
        });
      }      

    }, function (error) {
      thiz.show(error.msg);
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
  phoneInput: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
    });
    if (phone.length == 11) {
      this.findUserByPhone();
    }else{
      this.setData({
        memberValid: false
      });      
    }
  },
  /**消费金额 */
  moneyInput: function (e) {
    var money = e.detail.value;
    var totalMoney = this.data.totalMoney;
    if (!UTIL.isNumTest(money)){
      this.show("对不起，请输入正确的消费金额");
      return;
    }else if (money > totalMoney){
      this.show("对不起，消费金额不能大于积分总额");
      return;
    }
    this.setData({
      money: money,
      moneyValid:true
    });    
  },
  /**交易密码 */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  memoInput: function (e) {
    this.setData({
      memo: e.detail.value
    });
  },
  findUserByPhone: function () {
    var thiz = this;
    network.requestLoading(config.findUserByPhone, { phone: this.data.phone }, '加载中', function (result) {      
      if (result == null) {
        thiz.setData({
          memberValid: false
        }); 
        thiz.show("对不起，此用户不存在");
      } else {
        thiz.setData({
          userName: result.name == null ? "" : result.name,
          inputUserName: result.fromUserInfo.name,
          inputPhone: result.fromUserInfo.phone,
          toUserId: result.id,
          memberValid: true
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    })
  },
  onConfirmInput: function () {
    var phone = this.data.phone;
    var money = this.data.money;
    var memo = this.data.memo;
    var password = this.data.password;

    var totalMoney = this.data.totalMoney;
    var userName = this.data.userName;
    var inputPhone = this.data.inputPhone;//录入会员的上级推荐
    var inputUserName = this.data.inputUserName;//录入会员的上级推荐
    var memberValid = this.data.memberValid;
    var moneyValid = this.data.moneyValid;
    var userInfo = app.globalData.userInfo;
    var toUserId = this.data.toUserId;

    if (phone.length == 0) {
      this.show('请输入消费会员手机号账号');
    } else if (!memberValid) {
      this.show('请输入正确的消费会员手机号账号');
    } else if (money == 0 || money > totalMoney || !moneyValid) {
      this.show('请输入正确的消费金额');
    } else if (memo.length == 0) {
      this.show('请输入商品明细');
    } else if (password.length == 0) {
      this.show('请输入交易密码');
    } else {
      var thiz = this;
      network.requestLoading(config.getEncodePwd, { password: password }, '加载中', function (result) {
        if (result == null || userInfo.password != result) {
          thiz.show("对不起，请输入正确的交易密码");
        } else {
          var params = {
            toUserId: toUserId,
            phone: phone,
            name: userName,
            inputPhone: inputPhone,                   //录入会员的上级推荐
            inputUserName: inputUserName,             //录入会员的上级推荐
            fromPhone: userInfo.fromUserInfo.phone,   //我的上级推荐
            fromUserName: userInfo.fromUserInfo.name, //我的上级推荐
            money: parseInt(money),
            memo: memo,
            merchantPhone: userInfo.phone,
            merchantName: userInfo.merchantInfo.merchantName
          }
          network.requestLoading(config.consumeInput, params, '加载中', function (result) {
            if (result) {              
              thiz.show("消费录入成功");
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