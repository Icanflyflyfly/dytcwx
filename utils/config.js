const BASE_URL = require("/constant.js").BASE_URL
var config = {
  // 根据code获取session_key和openid
  loginUrl: BASE_URL + 'api/wx/login',

  // 根据code获取session_key和openid
  wxQr: BASE_URL + 'api/wx/qr',

  // 查找用户信息
  findUserById: BASE_URL + 'api/usermnt/userbaseinfo/findById',

  // 修改用户密码
  updatePwd: BASE_URL + 'api/usermnt/userbaseinfo/password/change',

  // 修改开户行
  updateBank: BASE_URL + 'api/usermnt/userbaseinfo/change/bank',

  // 根据手机号查询用户
  findUserByPhone: BASE_URL + 'api/usermnt/userbaseinfo/find/user/phone',

  // 得到加密密码
  getEncodePwd: BASE_URL + 'api/usermnt/userbaseinfo/get/encode/pwd',

  // 二维码图片链接
  uploadFile: BASE_URL + 'upload_file/',

  // 解密用户的基本信息
  decodeUserInfoUrl: BASE_URL + 'api/wx/decode/userinfo',

  // 得到加密密码
  getEncodePwd: BASE_URL + 'api/usermnt/userbaseinfo/get/encode/pwd',

  // 积分赠予
  interalGift: BASE_URL + 'api/usermnt/userbaseinfo/interal/gift',

  // 重复消费
  interalChange: BASE_URL + 'api/usermnt/userbaseinfo/interal/change',

  // 用户扫码开门
  userScanUrl: BASE_URL + 'api/scanmnt/userscan/scan',

  // 轮询开门状态
  userScanFindOpenUrl: BASE_URL + 'api/scanmnt/userscan/find',

  // 轮询关门状态
  userScanFindCloseUrl: BASE_URL + 'api/scanmnt/userclose/find/scanid',

  // 根据扫码ID查询订单
  findOrderByScanIdUrl: BASE_URL + 'api/ordermnt/baseorder/userscan/find',

  // 根据订单编号查询订单
  findOrderByorderNoUrl: BASE_URL + 'api/ordermnt/baseorder/orderno/find',

  // 微信支付请求参数
  paymentUrl: BASE_URL + 'api/wx/payment',

  // 用户订单列表
  orderSearchUrl: BASE_URL + 'api/ordermnt/baseorder/dto/search',

  // 查询未支付订单
  findNoPayOrderUrl: BASE_URL + 'api/ordermnt/baseorder/nopay/find',

  // 用户输入手机号绑定
  bindPhoneUrl: BASE_URL + 'api/usermnt/userbaseinfo/wechat/bind/phone',

  // 获取短信验证码
  getAuthCodeUrl: BASE_URL + 'api/usermnt/login/send/code',

  // 展示引导说明页
  showGuideUrl: BASE_URL + 'api/usermnt/userbaseinfo/show/guide',

  // 返回一个ad
  findOneAdUrl: BASE_URL + 'api/admnt/advertise/findone'
}

module.exports = config