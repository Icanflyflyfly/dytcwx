//index.js
//获取应用实例
const app = getApp()
const UTIL = require('../../utils/util.js')
const REQUESTUTIL = require('../../utils/requestUtil.js')
const CONSTANT = require('../../utils/constant.js')
const network = require('../../utils/network.js')
const config = require('../../utils/config.js')
import { ToastPanel } from '../../component/toast/toast.js'

Page({
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
    index: 0,
    multiArray: [],
    multiIndex: [0, 0],
    merchantDataBig:[],
    merchantDataSmall: [],
    region: ['河北省', '承德市', '双桥区'],
    customItem: '全部',
    hidden: false,
    page: 1,
    size: 20,
    hasMore: true,
    userInfo: {},
    hasUserInfo: false,
    flag: 0
  },  
  onPullDownRefresh: function () {   
    this.onLoad();
    wx.stopPullDownRefresh()
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('picker发送选择改变，携带值大类为', this.data.merchantDataBig[e.detail.value[0]]);
    console.log('picker发送选择改变，携带值小类为', this.data.merchantDataSmall[e.detail.value[0]][e.detail.value[1]]);
    this.setData({
      multiIndex: e.detail.value
    });
    var smallType = this.data.merchantDataSmall[e.detail.value[0]][e.detail.value[1]];
    this.findMerchant('merchantType', smallType=='全部'?'':smallType);
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    //第二列则不加载数据
    if (e.detail.column == 0){
      data.multiArray[1] = this.data.merchantDataSmall[e.detail.value];
      data.multiIndex[1] = 0;
      this.setData(data);
    }
  },  
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.findMerchant('county', e.detail.value[2]);
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    new app.ToastPanel();
    
    wx.showLoading({
      title: '系统加载中...',
      mask: true
    });
    this.data.flag = 1;
    var thiz = this;
    // 在没有 open-type=getUserInfo 版本的兼容处理  
    wx.checkSession({
      success: function () {
        // session未过期
        REQUESTUTIL.userLogin(true, function () {
          wx.hideLoading();
          var userInfo = getApp().globalData.userInfo;
          if (userInfo != null && userInfo.status == false) {
            wx.showModal({
              title: '提示',
              content: '此会员已被注销',
              showCancel: false,
              success: function (res) {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            });
          } else {
            var userIsBind = wx.getStorageSync(CONSTANT.USER_IS_BIND);
            if (userIsBind == false) {
              wx.redirectTo({
                url: '/pages/register/register',
              });
            } else {
              thiz.setData({
                userInfo: getApp().globalData.userInfo,
                hasUserInfo: true
              });
            }
          }

        });


        console.log('session未过期 ');
      },
      fail: function () {
        // 登录态过期
        REQUESTUTIL.userLogin(true, function () {
          wx.hideLoading();
          var userIsBind = wx.getStorageSync(CONSTANT.USER_IS_BIND);
          console.log('userIsBind = ' + userIsBind);
          if (userIsBind == false) {
            wx.redirectTo({
              url: '/pages/register/register',
            });
          } else {
            thiz.setData({
              userInfo: getApp().globalData.userInfo,
              hasUserInfo: true
            });
          }

        });

      }
    })    
    
    // network.request(config.imageUrls, {},  function (result) {
    //   if (result != null) {
        
    //     thiz.setData({
    //       imgUrls: result
    //     });
    //   }

    // }, function (error) {
    //   thiz.show(error.msg);
    // });

        
  },

  imageLoad: function (e) {
    var imageSize = UTIL.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
})
