const REQUEST = require('./request.js')
const UTIL = require('./util.js')
/**
 * 用户登录
 */
function userLogin(invalid,loginSuccess) {
  wx.login({
    success: function (res) {
      if (res.code) {
        console.log("用户code: " + res.code);
        REQUEST.userLogin(res.code, invalid, function () {
          loginSuccess()
        })
      } else {
        console.log('获取用户登录态失败!' + res.errMsg);
      }
    }
  });
}

/**
 * 获取详情页Ad
 */
function findOneAd(success, fail) {
  REQUEST.findOneAd(function(result){
    if(result != null){
      getApp().globalData.ad = result;
    }else{
      getApp().globalData.ad = 'none';
    }
    success();
  }, function(error){
    console.log('请求ad失败');
    fail();
  })
}

module.exports = {
  userLogin: userLogin,
  findOneAd: findOneAd
}