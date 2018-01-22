var constant = require('/constant.js')
var QRCODE_RRE = constant.QRCODE_RRE
var QRCODE_SUF = constant.QRCODE_SUF


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const imageUtil = e =>{
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽
  var originalHeight = e.detail.height;//图片原始高
  var originalScale = originalHeight / originalWidth;//图片高宽比
  console.log('originalWidth: ' + originalWidth)
  console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比
      console.log('windowWidth: ' + windowWidth)
      console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比
        //图片缩放后的宽为屏幕宽
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比
        //图片缩放后的高为屏幕高
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  console.log('缩放后的宽: ' + imageSize.imageWidth)
  console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}

/**
 * 获取用户信息
 */
function getCurrentUserInfo(success) {
  wx.getSetting({
    success(res) {

      getApp().globalData.hasUserInfo = true;
        wx.getUserInfo({
          withCredentials: true,
          lang: 'zh_CN',
          success: function (res) {            
            success(res.userInfo)            
          },
          fail: function (res) {
            console.log('获取用户信息失败: ' + res);
          }
        })
      }

  })
}


/**
 * 提示框
 */
function showAlertViewConfirm(title, content, confirmText) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmText: confirmText,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}


function showAlertView(title, content, confirmText, success) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmText: confirmText,
    success: function (res) {
      success();
    }
  })
}

/**
 * 提示框, 点击按钮后返回上级页面
 */
function showAlertNavigateBack(title, content, confirmText, delta) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmText: confirmText,
    success: function (res) {
      wx.navigateBack({
        delta: delta
      })
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}


/**
 * 跳转到登录页面
 */
function gotoLoginPage() {
  wx.reLaunch({
    url: '../login/login',
    success: function (res) {
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}


/**
 * 是否是手机号
 */
function isPhoneNo(phone) {
  // 验证1开头, 且号码为11位
  var phoneReg = /^1[0-9]{10}$/;
  return phoneReg.test(phone)
}


/**
 * 保存用户信息
 */
function saveUserInfo(userInfo){
  wx.setStorageSync(constant.USERINFO, userInfo);
}

/**获取用户信息 */
function getUserInfo(){
  return wx.getStorageSync(constant.USERINFO);
}

/**
 * 设置是否展示引导页
 */
function setShowGuide(isShow){
  var userId = wx.getStorageSync(constant.USERID);
  wx.setStorageSync(constant.IS_SHOW_GUID + userId, isShow);
}

/**是否展示引导页 */
function isShowGuide(){
  var userId = wx.getStorageSync(constant.USERID);
  var isShow = wx.getStorageSync(constant.IS_SHOW_GUID + userId);
  if(isShow != null && isShow){
    return true;
  }else{
    return false;
  }
}


module.exports = {
  formatTime: formatTime,
  imageUtil: imageUtil,
  getCurrentUserInfo: getCurrentUserInfo,
  showAlertViewConfirm: showAlertViewConfirm,
  showAlertNavigateBack: showAlertNavigateBack,
  gotoLoginPage: gotoLoginPage,
  showAlertView: showAlertView,
  isPhoneNo: isPhoneNo,
  getUserInfo: getUserInfo,
  saveUserInfo: saveUserInfo,
  setShowGuide: setShowGuide,
  isShowGuide: isShowGuide
}
