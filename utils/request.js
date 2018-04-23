const network = require('/network.js')
const config = require('/config.js')
const constant = require('./constant.js')

/**
 * 用户登录
 */
function userLogin(code, invalid, success) {
  var params = {
    code: code
  }
  network.request(config.loginUrl, params, function(result){   
    wx.setStorageSync(constant.USERID, result.id);
    wx.setStorageSync(constant.TOKEN, result.token);
    if(result.phone != null && result.phone.length > 0){
      wx.setStorageSync(constant.USERPHONE, result.phone);    
      wx.setStorageSync(constant.USER_IS_BIND, true);
      getApp().globalData.userInfo = result;
    }else{
      wx.setStorageSync(constant.USER_IS_BIND, false);
    }
    
    success()
  }, function(error){
    console.log('出错了: ' + error);
  })
}



/**
 *  微信支付请求参数
 */
function payment(orderNo, success, fail) {
  var params = {
    orderNo: orderNo
  }
  network.request(config.paymentUrl, params, function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
}

/**
 * 用户订单列表
 */
function userOrders(page, success, fail){
  var userId = wx.getStorageSync('userId');
  var params = {
    page: page,
    buyerId: userId,
    isOrder:1
  }
  network.request(config.orderSearchUrl, params, function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
}



/**
 * 绑定手机号
 */
function bindPhone(phone, systemInfo, success, fail){
  var params = {
    phone: phone,
    systemInfo: systemInfo
  }
  network.requestLoading(config.bindPhoneUrl, params, '登录中', function (result) {
    wx.setStorageSync(constant.USERPHONE, result.phone);
    wx.setStorageSync(constant.USER_IS_LOGIN, true);
    success(result)
  }, function (error) {
    fail(error)
  })
}

/**
 * 查询大类值
 */
function findByBigtype(bigTypeName,success, fail) {
  var params = {
    bigTypeName: bigTypeName
  }
  network.requestLoading(config.findByBigtype, params, '', function (result) {
      success(result)
  }, function (error) {
    fail(error)
  })
}


module.exports = {
  userLogin: userLogin,  
  payment: payment,
  userOrders: userOrders,
  bindPhone: bindPhone,
  findByBigtype: findByBigtype
}