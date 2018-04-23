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
    name:'',
    imageCount:0,
    applayId :'',
    applyMgrInfo:null
  },  
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  chooseImage: function (event) {
    if (this.data.applyMgrInfo != null && this.data.imageCount == 0){
      this.setData({
        imageList: []
      });
    }
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (this.data.address.length == 0) {
      this.show('请输入家庭住址');
      return;
    } else if (this.data.idcard.length == 0) {
      this.show('请输入身份证号');
      return;
    } else if (!regIdNo.test(this.data.idcard)) {
      this.show('身份证号填写有误');
      return ;
    }  
    var that = this;
    var idcard = this.data.idcard;
    var address = this.data.address;
    var region = this.data.region;
    var userInfo = app.globalData.userInfo;  

    if (that.data.imageCount >= 2){
      this.show('最多上传2张');
      return;
    }

    wx.chooseImage({
      count: 2, // 一次最多可以选择2张图片一起上传
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgeList = that.data.imageList.concat(res.tempFilePaths);
        that.setData({
          imageList: imgeList,
          imageCount: that.data.imageCount + 1
        });

        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.idCardUpload, 
          filePath: tempFilePaths[0],
          name: 'imageFile',
          formData: {
            phone: userInfo.phone,
            name: userInfo.name,
            idcard: idcard,
            images: that.data.imageCount,
            address: region[0] + region[1] + region[2] + address
          },
          success: function (res) {
            that.show("身份证上传成功");
            var data1 = res.data;
            data1 = JSON.parse(data1);
            var data2 = data1.data;
            that.setData({
              applayId:data2.id
            });
          }
        })
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
    this.findMgrByPhone();
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
  findMgrByPhone:function () {
    var thiz = this;
    var userInfo = app.globalData.userInfo; 
    network.requestLoading(config.findMgrByPhone, { phone: userInfo.phone }, '加载中', function (result) {
      if (result) {
        var images = new Array();
        if (result.idcardImg1 != null && result.idcardImg1 != ''){
          images.push(result.idcardImg1);
        }

        if (result.idcardImg2 != null && result.idcardImg2 != '') {
          images.push(result.idcardImg2);
        }
        
        thiz.setData({
          applyMgrInfo: result,
          imageList: images,
          idcard: result.idcard,
          id: result.id, 
          address: result.address
        });       
      }

    }, function (error) {
      thiz.show(error.msg);
    })
  },
  onConfirmApply: function () {
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var idcard = this.data.idcard;
    var imageCount = this.data.imageCount;
    var address = this.data.address;    
    var region = this.data.region; 
    var applayId = this.data.applayId; 
    
    var userInfo = app.globalData.userInfo;

    if (address.length == 0) {
      this.show('请输入家庭住址');
    } else if (idcard.length == 0) {
      this.show('请输入身份证号');
    } else if (!regIdNo.test(this.data.idcard)) {
      this.show('身份证号填写有误');
      return;
    } else if (imageCount == 0) {
      this.show('请上传身份证照片');
    } else {
      var thiz = this;
      var params = {
        phone: userInfo.phone,
        name: userInfo.name,
        idcard: idcard,
        id: applayId,     
        images: imageCount,
        address: region[0] + region[1] + region[2] +address
      }
      network.requestLoading(config.applyMgrUpdate, params, '加载中', function (result) {
        if (result) {         
          thiz.show("申请成功，请等待审核");
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