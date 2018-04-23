// pages/index/merchant_detail.js
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
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    merId:'',
    merchant:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var thiz = this;
    // network.request(config.findMerchantById, { id: options.merId}, function (result) {
    //   if (result != null) {
    //     var urls = new Array();
    //     if (result.titleImage1 != null){
    //       urls.push(result.titleImage1);
    //     }
    //     if (result.titleImage2 != null) {
    //       urls.push(result.titleImage2);
    //     }
    //     if (result.titleImage3 != null) {
    //       urls.push(result.titleImage3);
    //     }
    //     if (result.titleImage4 != null) {
    //       urls.push(result.titleImage4);
    //     }
    //     if (result.titleImage5 != null) {
    //       urls.push(result.titleImage5);
    //     }
        
    //     thiz.setData({
    //       imgUrls: urls,
    //       merchant:result
    //     });
    //   }

    // }, function (error) {
    //   thiz.show(error.msg);
    // });

    thiz.setData({
      merchant:{
        merchantName:'承德市印诺系统集成有限公司',
        merchantTel: '13988889999',
        address: '双滦区电商大厦六楼万达印章',
        serviceMemo: '印章申报审批制作'
      }
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
  makePhoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.merchant.merchantTel
    })
  },
  goThere:function(){
    var thiz = this;
    wx.openLocation({
      latitude: parseFloat(thiz.data.merchant.latitude),
      longitude: parseFloat(thiz.data.merchant.longitude),
      scale: 28,
      address: thiz.data.merchant.address
    })
  }
})