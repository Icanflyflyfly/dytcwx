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
    hasMore: true
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

    var thiz = this;
    network.request(config.merchantTypeList, {}, function (result) {
      if (result != null) {
        thiz.setData({
          merchantDataBig: result.bigtype,
          merchantDataSmall: result.smalltype,
          multiArray: [result.bigtype, result.smalltype[0]]
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    });
    
    network.request(config.imageUrls, {},  function (result) {
      if (result != null) {
        
        thiz.setData({
          imgUrls: result
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    });

    thiz.findMerchant();
        
  },
  findMerchant:function(para,value){
    var thiz = this;
    var page = this.data.page;
    var params = {
      page: page,
      sort: [{
        property: 'createTime',
        direction: 'DESC'
      }]
    }
    if(para)
      params[para] = value;

    network.requestLoading(config.merchantDetail, params, '加载中', function (result) {
      if (result.data) {
        thiz.setData({
          list: result.data,
          hidden: true,
        });
      }else{
        thiz.setData({
          list: [],
          hidden: true,
        });
      }
      if (result.totalCount <= ((thiz.data.page) * (thiz.data.size))) {
        thiz.setData({
          list: result.data,
          hidden: true,
          hasMore: false
        });
      } else {
        thiz.setData({
          list: result.data,
          hidden: true,
          hasMore: true
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    });
  },
  loadMore: function (e) {
    var userInfo = getApp().globalData.userInfo;
    var thiz = this;

    if (!thiz.data.hasMore) return;
    var page = ++(this.data.page);
    var params = {
      page: page,
      sort: [{
        property: 'time',
        direction: 'DESC'
      }]
    }
    network.requestLoading(config.consumeInputDetail, params, '加载中', function (result) {
      if (result.totalCount <= ((thiz.data.page) * (thiz.data.size))) {
        thiz.setData({
          list: thiz.data.list.concat(result.data),
          hidden: true,
          hasMore: false
        });
      } else {
        thiz.setData({
          list: thiz.data.list.concat(result.data),
          hidden: true,
          hasMore: true
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    });
  }
  
})
