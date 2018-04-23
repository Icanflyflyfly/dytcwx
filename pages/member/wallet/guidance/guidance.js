// pages/member/wallet/guidance/guidance.js
import { ToastPanel } from '../../../../component/toast/toast.js'
const app = getApp()
const UTIL = require('../../../../utils/util.js')
const constant = require('../../../../utils/constant.js')
const network = require('../../../../utils/network.js')
const config = require('../../../../utils/config.js')
const REQUEST = require('../../../../utils/request.js')

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
    needPay:0,
    id:'',
    imageCount: 0
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      payType: e.detail.value
    });
  },
  chooseImage: function (event) {
    var thiz = this;
    
    if (thiz.data.imageCount >= 3) {
      this.show('最多上传3张');
      return;
    }

    wx.chooseImage({
      count: 1, // 一次最多可以选择2张图片一起上传
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        thiz.setData({
          imageCount: thiz.data.imageCount+1
        });

        if (thiz.data.imageCount == 1) {
          thiz.addGuidanceDetail();
        }

        var imgeList = thiz.data.imageList.concat(res.tempFilePaths);
        thiz.setData({
          imageList: imgeList,
          imageCount: thiz.data.imageCount
        });

        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.guidanceUpload,
          filePath: tempFilePaths[0],
          name: 'imageFile',
          formData: {
            id: thiz.data.id,
            count: thiz.data.imageCount
          },
          success: function (res) {            
            var data1 = res.data;
            data1 = JSON.parse(data1);
            if (data1.success == true) {
              thiz.show('上传成功');
            }
          }
        })
      }
    })
  },
  addGuidanceDetail : function(){
    var thiz = this;
    var userInfo = app.globalData.userInfo;

    var params = {
      phone: userInfo.phone,
      name: userInfo.name
    }
      //添加引流积分明细      
    network.requestLoading(config.guidanceAdd, params, '', function (result) {
        if (result != null) {
          thiz.setData({
            id: result.id
          });       
        } else{
          thiz.show("引流积分添加失败,请稍后在试");  
        }
      }, function (error) {
        thiz.show(error.msg);
      });
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
    var thiz = this;
    var product = this.data.product;
    var interal = this.data.interal;
    var needPay = this.data.needPay;
    var userInfo = app.globalData.userInfo;

    if (product.length == 0) {
      this.show('请输入商品明细');
    } else if (interal == 0 || !UTIL.isNumTest(interal)) {
      this.show('请输入正确的积分金额');
    } else if (interal < 10) {
      this.show('积分金额不能小于10');
    } else if (thiz.data.imageCount == 0) {
      this.show('请上传作证');
    } else {
      //提交订单
      var params = {
        totalAmount: needPay,
        buyerId: userInfo.id,
        remarks: '引流送积分'
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
                thiz.paySuccessHandle(userInfo, needPay, orderId, product, interal);
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
  payBtnStatus: function (payDisabled) {
    this.setData({
      payDisabled: payDisabled
    });

  },
  paySuccessHandle: function (userInfo, charge, orderId, product, interal) {
    var thiz = this;
    var params = {
      phone: userInfo.phone,
      name: userInfo.name,
      consumeMoney: interal,
      money: charge,
      memo: product,
      orderId: orderId,
      id:thiz.data.id
    }

    network.requestLoading(config.guidanceUpdate, params, '加载中', function (result) {
      if (result) {
        //更新缓存              
        userInfo.totalConsume = userInfo.totalConsume + parseInt(interal);
        thiz.show('恭喜您，积分获得成功');
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