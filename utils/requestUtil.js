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
 * 重新登录
 */
function userReLogin() {

  wx.showLoading({
    title: '系统加载中...',
    mask: true
  })
  // 在没有 open-type=getUserInfo 版本的兼容处理  
  wx.checkSession({
    success: function () {
      // session未过期
      userLogin(true, function () {
        wx.hideLoading();
    
      });


      console.log('session未过期 ');
    },
    fail: function () {
      // 登录态过期
      userLogin(true, function () {
        wx.hideLoading();
        var userIsBind = wx.getStorageSync(CONSTANT.USER_IS_BIND);
        console.log('userIsBind = ' + userIsBind);
        if (userIsBind == false) {
          wx.redirectTo({
            url: '/pages/register/register',
          });
        } 
      });

    }
  })
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
  findOneAd: findOneAd,
  userReLogin: userReLogin
}