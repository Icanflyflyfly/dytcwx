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
    multiArray: [],
    multiIndex: [0, 0],
    merchantDataBig: [],
    merchantDataSmall: [],
    merchantName:'',
    merchantTel: '',
    merchantType: '',
    address: '',
    service: '',
    phone: '',
    userName: '',
    id:'',
    titleImages:0,
    certificateImages:0,
    oldPhone:'',
    latitude:0,
    longitude:0
  },  
  changeData:function (flag, images) {
    if (flag == 0) {
      this.setData({
        titleImages: images
      })
    }else{
      this.setData({
        certificateImages: images
      })
    }
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
    console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log('picker发送选择改变，携带值大类为', this.data.merchantDataBig[e.detail.value[0]]);
    console.log('picker发送选择改变，携带值小类为', this.data.merchantDataSmall[e.detail.value[0]][e.detail.value[1]]);
    this.setData({
      multiIndex: e.detail.value,
      merchantType: this.data.merchantDataSmall[e.detail.value[0]][e.detail.value[1]]
    });
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    //第二列则不加载数据
    if (e.detail.column == 0) {
      data.multiArray[1] = this.data.merchantDataSmall[e.detail.value];
      data.multiIndex[1] = 0;
      this.setData(data);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    

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
  uploadTitleClickTitle:function () {    
    var validate = this.validateForm();
    if (validate == true) {      
      this.registerMerchant(0);
    }    
  },
  uploadTitleClickCer: function () {        
    var validate = this.validateForm();
    if(validate == true){      
      this.registerMerchant(1);
    }
  },
  validateForm:function(){
    var merchantName = this.data.merchantName;
    var merchantTel = this.data.merchantTel;
    var address = this.data.address;
    var service = this.data.service;
    var userName = this.data.userName;
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var id = this.data.id;
    var merchantType = this.data.merchantType;

    if (userName.length == 0) {
      this.show('请输入正确的会员账号');
      return false;
    } else if (merchantName.length == 0) {
      this.show('请输入商家名称');
      return false;
    } else if (merchantTel.length == 0) {
      this.show('请输入联系电话');
      return false;
    } else if (merchantType == '') {
      this.show('请选择商家类型');
      return false;
    } else if (address.length == 0) {
      this.show('请输入详细地址');
      return false;
    } else if (service.length == 0) {
      this.show('请输入服务范围');
      return false;
    } else if (latitude == 0) {
      this.show('请选择位置');
      return false;
    } else if (longitude == 0) {
      this.show('请选择位置');
      return false;
    }
    return true;
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

    network.requestLoading(config.findUserByPhone, { phone: thiz.data.phone }, '加载中', function (resultUser) {
      if (resultUser == null) {
        thiz.show("对不起，此会员不存在");
        thiz.setData({
          userName:  ""
        });
      } else {
        thiz.setData({
          userName: resultUser.name == null ? "" : resultUser.name,
          toUserId: resultUser.id
        });
        network.requestLoading(config.merchantFindByPhone, { merchantPhone: thiz.data.phone }, '加载中', function (result) {
          if (result) {
            wx.showModal({
              title: '提示',
              content: '此会员已经是商家，是否继续完善资料',
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                  var titleImages = new Array();
                  if (result.titleImage1 != null) {
                    titleImages.push(result.titleImage1);
                  }
                  if (result.titleImage2 != null) {
                    titleImages.push(result.titleImage2);
                  }
                  if (result.titleImage3 != null) {
                    titleImages.push(result.titleImage3);
                  }
                  if (result.titleImage4 != null) {
                    titleImages.push(result.titleImage4);
                  }
                  if (result.titleImage5 != null) {
                    titleImages.push(result.titleImage5);
                  }

                  var certificates = new Array();
                  if (result.certificate1 != null) {
                    certificates.push(result.certificate1);
                  }
                  if (result.certificate2 != null) {
                    certificates.push(result.certificate2);
                  }
                  if (result.certificate3 != null) {
                    certificates.push(result.certificate3);
                  }
                  if (result.certificate4 != null) {
                    certificates.push(result.certificate4);
                  }
                  if (result.certificate5 != null) {
                    certificates.push(result.certificate5);
                  }

                  var merchantType1 = new Array();
                  var merchantType2 = new Array();
                  merchantType2.push(result.merchantType);
                  merchantType1.push(merchantType2);

                  thiz.setData({
                    id: result.id,
                    merchantName: result.merchantName,
                    merchantTel: result.merchantTel,
                    merchantType: result.merchantType,
                    address: result.address,
                    service: result.serviceMemo,
                    titleImages: titleImages.length,
                    certificateImages: certificates.length,
                    latitude: result.latitude,
                    longitude: result.longitude,
                    multiArray: [thiz.data.merchantDataBig, merchantType1]
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消');
                  wx.navigateBack({

                  });
                }

              }
            });
                      
          }else{
            thiz.setData({
              id: '',
              merchantName: '',
              merchantTel: '',
              merchantType: '',
              address: '',
              service: '',
              titleImages: 0,
              certificateImages: 0,
              latitude: 0,
              longitude: 0,
              multiIndex: [0, 0]
            });
          }

        }, function (error) {
          thiz.show(error.msg);
        });
                       
      }

    }, function (error) {
      thiz.show(error.msg);
    })
  },
  registerMerchant:function(flag){    
    var thiz = this;
    if(thiz.data.id != ''){
      if (flag == 0) {
        wx.navigateTo({
          url: '/pages/member/registmerc/certificate/certificate?desc=门头照&flag=0&id=' + thiz.data.id,
        })
      } else {
        wx.navigateTo({
          url: '/pages/member/registmerc/certificate/certificate?desc=上传执照&flag=1&id=' + thiz.data.id,
        })
      }
      return;
    }
    var userInfo = app.globalData.userInfo;
    var params = {
      merchantName: thiz.data.merchantName,
      merchantTel: thiz.data.merchantTel,
      merchantType: thiz.data.merchantType,
      merchantPhone: userInfo.phone,
      address: thiz.data.address,
      province: thiz.data.region[0],
      city: thiz.data.region[1],
      county: thiz.data.region[2],
      serviceMemo: thiz.data.service,
      createTime: UTIL.formatTimeYmdhms(new Date()),
      longitude: thiz.data.longitude,
      latitude: thiz.data.latitude,
      phone: userInfo.phone,
      name: userInfo.name
    }

    network.requestLoading(config.merchantRegist, params, '加载中...', function (result) {
      if (result) {
        var merchId = result.id;
        thiz.setData({
          id: merchId
        });
        if(flag == 0){
          wx.navigateTo({
            url: '/pages/member/registmerc/certificate/certificate?desc=门头照&flag=0&id=' + merchId,
          })
        }else{
          wx.navigateTo({
            url: '/pages/member/registmerc/certificate/certificate?desc=上传执照&flag=1&id=' + merchId,
          })
        }
      }
    }, function (error) {
      thiz.show(error.msg);
    });
  },
  onConfirmRegist: function () {
    var merchantName = this.data.merchantName;
    var merchantTel = this.data.merchantTel;
    var merchantPhone = this.data.phone;
    var address = this.data.address;
    var service = this.data.service;
    var region = this.data.region;
    var userName = this.data.userName;
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    var multiIndex = this.data.multiIndex;
    var id = this.data.id;
    var titleImages = this.data.titleImages;
    var certificateImages = this.data.certificateImages;
    var merchantType = this.data.merchantType;
    var userInfo = app.globalData.userInfo;

    if (userName.length == 0) {
      this.show('请输入正确的会员账号');
    } else if (merchantName.length == 0) {
      this.show('请输入商家名称');
    } else if (merchantTel.length == 0) {
      this.show('请输入联系电话');
    } else if (merchantType == '') {
      this.show('请选择商家类型');
    } else if (address.length == 0) {
      this.show('请输入详细地址');
    } else if (service.length == 0) {
      this.show('请输入服务范围');
    } else if (latitude == 0) {
      this.show('请选择位置');
    } else if (longitude == 0) {
      this.show('请选择位置');
    } else if (titleImages == 0) {
      this.show('请上传门头');
    } else if (certificateImages == 0) {
      this.show('请上传执照');
    } else {
      var thiz = this;
      var params = {
        id:id,
        merchantName: merchantName,
        merchantTel: merchantTel,
        merchantType: merchantType,
        merchantPhone: userInfo.phone,
        address: address,
        province: region[0],
        city: region[1],
        county: region[2],
        serviceMemo: service,
        longitude: longitude,
        latitude: latitude
      }

      network.requestLoading(config.merchantUpdate, params, '加载中', function (result) {
        if (result) {
          userInfo.merchant = true;
          userInfo.merchantInfo = {
            merchantName: merchantName,
            merchantTel: merchantTel,
            address: address
          }
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
  },
  chooseLocationTap:function(){
    var thiz = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res.name);
        console.log(res.address);
        console.log(res.latitude);
        console.log(res.longitude);
        
        thiz.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    });

    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28
    //     })
    //   }
    // });

  }

})