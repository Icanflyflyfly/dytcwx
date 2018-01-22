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
 * 发送用户信息到服务器
 */
function sendCurrentUserInfoToServer(encryptedData, iv) {
  var params = {
    encryptedData: encryptedData,
    iv: iv
  }
  network.request(config.decodeUserInfoUrl, params, function(result){
    console.log('解密用户信息成功');
  }, function(error){

  })
}

/**
 * 获取用户手机号
 */
function getUserPhoneNum(encryptedData, iv, systemInfo, success, fail) {
  var params = {
    encryptedData: encryptedData,
    iv: iv,
    systemInfo: systemInfo
  }
  network.requestLoading(config.decodePhoneUrl, params, '登录中', function (result) {
    console.log("用户的手机号为: " + result);
    if(result != null){
      wx.setStorageSync(constant.USERPHONE, result);
      wx.setStorageSync(constant.USER_IS_LOGIN, true);
      success()
    }else{
      fail({msg:"解密手机号失败"});
    }
    
  }, function (error) {
    console.log("获取用户手机号失败: " + error);
    fail(error)
  })
}

/**
 * 用户扫码开门
 */
function userScan(qrCode, success, fail){
  var params = {
    scanType:"0", // 微信扫码
    machineQr: qrCode
  }
  network.requestLoading(config.userScanUrl, params, '加载中', function (result) {
    success(result)
  }, function (error) {
    fail(error);
  })
}


/**
 * 轮询开门状态
 */
function mechineOpenStatus(scanId, success, fail){
  var params = {
    scanId: scanId
  }
  network.request(config.userScanFindOpenUrl, params, function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
}

/**
 * 轮询关门状态
 */
function mechineCloseStatus(scanId, success, fail){
  var params = {
    scanId: scanId
  }
  network.request(config.userScanFindCloseUrl, params, function (result) {
    success(result)
  }, function (error) {
    fail(error)
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
 * 根据扫码ID查询订单
 */
function findOrderByScanId(userScanId, success, fail){
  var params = {
    userScanId: userScanId
  }
  network.request(config.findOrderByScanIdUrl, params, function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
}

/**
 * 根据订单编号查询订单
 */
function findOrderByOrderNo(orderNo, success, fail){
  var params = {
    orderNo: orderNo
  }
  network.requestLoading(config.findOrderByorderNoUrl, params, '加载中', function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
}

/**
 * 查询未支付订单
 */
function findNoPayOrder(success, fail){
  var params = {}
  network.request(config.findNoPayOrderUrl, params, function(result){
    success(result)
  }, function(error){
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
 * 获取短信验证码
 */
function getCode(phone, success, fail){
  var params = {
    phone: phone
  }
  network.requestLoading(config.getAuthCodeUrl, params, '发送中', function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
}


/**
 * 展示引导说明页
 */
function showGuide(success, fail){
  var params = {}
  network.request(config.showGuideUrl, params, function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
}


/**
 * 订单详情页Ad
 */
function findOneAd(success, fail) {
  var params = {}
  network.request(config.findOneAdUrl, params, function (result) {
    success(result)
  }, function (error) {
    fail(error)
  })
} 


module.exports = {
  userLogin: userLogin,
  getUserPhoneNum: getUserPhoneNum,
  userScan: userScan,
  mechineOpenStatus: mechineOpenStatus,
  mechineCloseStatus: mechineCloseStatus,
  findOrderByScanId: findOrderByScanId,
  payment: payment,
  userOrders: userOrders,
  sendCurrentUserInfoToServer: sendCurrentUserInfoToServer,
  findOrderByOrderNo: findOrderByOrderNo,
  findNoPayOrder: findNoPayOrder,
  bindPhone: bindPhone,
  getCode: getCode,
  showGuide: showGuide,
  findOneAd: findOneAd
}