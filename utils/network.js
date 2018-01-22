const constant = require('/constant.js')
const config = require('/config.js')

function request(url, params, success, fail) {
  this.requestLoading(url, params, "", success, fail)
}

function requestLoading(url, params, message, success, fail) {
  console.log(params);
  if(message != ""){
    wx.showLoading({
      title: message
    })
  }
  
  if (!this.excludeUserIdAndTokenUrl(url)){
    var userId = wx.getStorageSync(constant.USERID);
    var token = wx.getStorageSync(constant.TOKEN);
    params["userId"] = userId;
    params["token"] = token;
  }
  
  params["apiKey"] = constant.APIKEY;
  params["version"] = constant.VERSION;

  console.log("请求参数为: " + JSON.stringify(params));

  var that = this;
  wx.request({
    url: url,
    data: params,
    success: function(res) {
      if(message != ""){
        wx.hideLoading()
      }
      if (res.statusCode == 200){
        if (res.data.status == 200) {
          success(res.data.data);
        } else {
          if (res.data.status == 40011 || res.data.status == 40012) { // token为空或无效
            wx.hideLoading();
            that.tokenInvalid()
          } else {
            fail(res.data);
          }
        }
      }else{
        console.log('网络请求失败: ' + res.errMsg);
        fail({ status: res.statusCode, msg: '网络请求失败，请稍后重试'});
      }
    },
    fail: function(res) {
      if(message != ""){
        wx.hideLoading()
      }
      console.log('网络请求失败: ' + res.errMsg);
      fail({ msg: '网络请求失败，请稍后重试'});
    },
    complete: function(res) {},
  })

}

/**
 * 不包含userId和token的接口
 */
function excludeUserIdAndTokenUrl(url){
  if (url == config.loginUrl || url == config.findOneAdUrl){
    return true;
  }else{
    return false;
  }
}

function tokenInvalid(){
  wx.showModal({
    title: '提示',
    content: '您的登录信息已失效，请重新登录',
    showCancel: false,
    confirmText: '我知道了',
    success: function (res) {
      wx.setStorageSync(constant.USER_IS_LOGIN, false)
      wx.setStorageSync(constant.USER_RE_LOGIN, true)
      wx.setStorageSync(constant.TOKEN, null);
      wx.reLaunch({
        url: '../login/login',
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}


module.exports = {
  request: request,
  requestLoading: requestLoading,
  excludeUserIdAndTokenUrl: excludeUserIdAndTokenUrl,
  tokenInvalid: tokenInvalid
}