// pages/index/shop/shop.js
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'FHOBZ-3H6KD-ZG54Y-HRYNQ-L6MNE-HOFXO' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = new Array();
    var thiz = this;
    list.push({
      merchantName:"承德市印诺系统集成有限公司",
      merchantTel:'13988889999',
      address:'双滦区电商大厦六楼万达印章',
      titleImage1:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      distance: '5km'
    });
    list.push({
      merchantName: "承德市双滦区万达印章围场店",
      merchantTel: '13988889999',
      address: '围场中街万达印章围场店',
      titleImage1: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      distance: '230km'
    });
    this.setData({
      list:list
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
  getDistance:function(lat,lng){
    var distance = 0;
    // 调用接口
    demo.calculateDistance({
      to: [{
        latitude: lat,
        longitude: lng
      }],
      success: function (res) {
        console.log(res);
        distance = res.result.elements[0].distance;
        return distance;
        console.log('--->  ' + distance);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });

    
  }
})