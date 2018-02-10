// pages/member/wallet/guidance/guidance.js
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
    items: [
      { name: 'wx', value: '微信', checked: 'true' },
      { name: 'zfb', value: '支付宝'}
    ],
    imageList: [],
    product:'',
    interal: 0,
    payType:'wx',
    needPay:0
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      payType: e.detail.value
    });
  },
  chooseImage: function (event) {
    var that = this;
    wx.chooseImage({
      count: 2, // 一次最多可以选择2张图片一起上传
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgeList = that.data.imageList.concat(res.tempFilePaths);
        that.setData({
          imageList: imgeList
        });
      }
    })
  },
  previewImage: function (e) {
    var that = this;
    var dataid = e.currentTarget.dataset.id;
    var imageList = that.data.imageList;
    wx.previewImage({
      current: imageList[dataid],
      urls: this.data.imageList
    });
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
  /**商品明细 */
  productInput: function (e) {
    this.setData({
      product: e.detail.value
    });
  },
  /**积分金额 */
  interalInput: function (e) {
    this.setData({
      interal: e.detail.value,
      needPay: (e.detail.value)/10
    });
  },
  onConfirmPay: function () {
    var product = this.data.product;
    var interal = this.data.interal;
    var needPay = this.data.needPay;
    var userInfo = app.globalData.userInfo;

    if (product.length == 0) {
      this.show('请输入商品明细');
    } else if (interal == 0 || !UTIL.isNumTest(interal)) {
      this.show('请输入正确的积分金额');
    }  else {
          var thiz = this;      
          var params = {
            phone: userInfo.phone,
            name: userInfo.name,
            consumeMoney: interal,
            money: needPay,
            memo: product
          }
          network.requestLoading(config.guidanceAdd, params, '加载中', function (result) {
            if (result) {
              //更新缓存              
              userInfo.totalConsume = userInfo.totalConsume + interal;
              thiz.show("积分购买成功");
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