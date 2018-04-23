// pages/member/registmerc/registmerc.js
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
    desc:"",
    imageList: [],
    imageCount: 0,
    id:'',
    flag:0
  },
  chooseImage: function (event) {    
    var that = this;
    var id = this.data.id;
    var flag = this.data.flag;
    var userInfo = app.globalData.userInfo;

    if (that.data.imageCount >= 3) {
      this.show('最多上传5张');
      return;
    }

    wx.chooseImage({
      count: 3, // 一次最多可以选择2张图片一起上传
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgeList = that.data.imageList.concat(res.tempFilePaths);
        that.setData({
          imageList: imgeList,
          imageCount: imgeList.length
        });
        //获取页面栈
        var pages = getCurrentPages();
        
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里
          // var data = prePage.data;
          prePage.changeData(flag, imgeList.length);                   
        }
        
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length;i++){
          var imageCount = imgeList.length;
          if (tempFilePaths.length > 1){
            imageCount = (i+1);
          }
            wx.uploadFile({
              url: config.titleUpload,
              filePath: tempFilePaths[i],
              name: 'imageFile',
              formData: {
                id: id,
                images: (imageCount),
                flag: flag
              },
              success: function (res) {
                var data1 = res.data;
                data1 = JSON.parse(data1);
                if (data1.success == true) {
                  that.show('上传成功');
                }
              }
            })
        }        
        
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
    this.setData({ 
      id: options.id,
      flag:options.flag
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
  goback:function(){
    wx.navigateBack({

    });
  }
})