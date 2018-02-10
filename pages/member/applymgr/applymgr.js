// pages/member/applymgr/applymgr.js
import { ToastPanel } from '../../../component/toast/toast.js'
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
    region: ['河北省', '承德市', '双桥区'],
    customItem: '全部',
    imageList: [],
    idcard:'',
    address:'',
    phone:'',
    name:''
  },  
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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
  /**身份证号 */
  idcardInput: function (e) {
    this.setData({
      idcard: e.detail.value
    });
  },
  /**家庭住址 */
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    });
  },  
  onConfirmApply: function () {
    var idcard = this.data.idcard;
    var address = this.data.address;    
    var region = this.data.region; 
    var userInfo = app.globalData.userInfo;

    if (idcard.length == 0) {
      this.show('请输入身份证号');
    } else if (address.length == 0) {
      this.show('请输入家庭住址');
    } else {
      var thiz = this;
      var params = {
        phone: userInfo.phone,
        name: userInfo.name,
        idcard: idcard,
        address: region[0] + region[1] + region[2] +address
      }
      network.requestLoading(config.applyMgr, params, '加载中', function (result) {
        if (result) {         
          thiz.show("申请成功");
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