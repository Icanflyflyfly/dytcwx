// pages/member/registmerc/registmerc.js
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
    index: 0,
    multiArray: [['餐饮', '超市'], ['快餐', '自助', '火锅']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '餐饮'
        },
        {
          id: 1,
          name: '超市'
        }
      ], [
        {
          id: 0,
          name: '快餐'
        },
        {
          id: 1,
          name: '自助'
        },
        {
          id: 2,
          name: '火锅'
        }
      ], [
        {
          id: 0,
          name: '便利店'
        },
        {
          id: 1,
          name: '综合超市'
        }
      ]
    ],
    multiIndex: [0, 0],
    merchantName:'',
    merchantTel: '',
    address: '',
    service: '',
    phone: '',
    userName: ''
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['快餐', '自助', '火锅'];

            break;
          case 1:
            data.multiArray[1] = ['便利店', '综合超市'];

            break;
        }
        data.multiIndex[1] = 0;

        break;

    }
    this.setData(data);
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
  /**手机号 */
  toPhoneInput: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
    });
    if (phone.length == 11) {
      this.findUserByPhone();
    }else{
      this.setData({
        userName: ""
      });
    }
  },
  /**商家名称 */
  merchantNameInput: function (e) {
    this.setData({
      merchantName: e.detail.value
    });
  },  
  /**联系电话 */
  merchantTelInput: function (e) {
    this.setData({
      merchantTel: e.detail.value
    });
  }, 
  /**详细地址 */
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    });
  }, 
  /**联系电话 */
  serviceInput: function (e) {
    this.setData({
      service: e.detail.value
    });
  },
  findUserByPhone: function () {
    var thiz = this;
    network.requestLoading(config.findUserByPhone, { phone: this.data.phone }, '加载中', function (result) {
      if (result == null) {
        thiz.show("对不起，此用户不存在");
        thiz.setData({
          userName:  ""
        });
      } else {
        thiz.setData({
          userName: result.name == null ? "" : result.name,
          toUserId: result.id
        });
      }

    }, function (error) {
      thiz.show(error.msg);
    })
  },
  onConfirmRegist: function () {
    var merchantName = this.data.merchantName;
    var merchantTel = this.data.merchantTel;
    var merchantPhone = this.data.phone;
    var address = this.data.address;
    var service = this.data.service;
    var region = this.data.region;
    var userName = this.data.userName;
    var multiIndex = this.data.multiIndex;
    var userInfo = app.globalData.userInfo;

    if (userName.length == 0) {
      this.show('请输入正确的会员账号');
    } else if (merchantName.length == 0) {
      this.show('请输入商家名称');
    }else if (merchantTel.length == 0) {
      this.show('请输入联系电话');
    } else if (address.length == 0) {
      this.show('请输入详细地址');
    } else if (service.length == 0) {
      this.show('请输入服务范围');
    } else {
      var thiz = this;
      var params = {
        merchantName: merchantName,
        merchantTel: merchantTel,
        merchantPhone: merchantPhone,
        memberName: userInfo.name,
        address: region[0] + region[1] + region[2] + address,
        province: region[0],
        city: region[1],
        county: region[2],
        serviceMemo: service,
        approval:"0",
        createTime: UTIL.formatTimeYmdhms(new Date()),
        fromUserInfo:{
          phone: userInfo.phone,
          name:userInfo.name,
          time: UTIL.formatTimeYmdhms(new Date())
        }
      }

      network.requestLoading(config.merchantFindByName, {merchantName: merchantName}, '加载中', function (result) {
        if (result) {
          thiz.show("同名商家已经存在");          
        }else{
          network.requestLoading(config.merchantRegist, params, '加载中', function (result) {
            if (result) {
              thiz.show("商家注册成功");
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

      }, function (error) {
        thiz.show(error.msg);
      });

      
    }
  }
})