const BASE_URL = require("/constant.js").BASE_URL
var config = {
  // 根据code获取session_key和openid
  loginUrl: BASE_URL + 'api/wx/login',

  // 根据code获取session_key和openid
  wxQr: BASE_URL + 'api/wx/qr',

  // 轮播图片
  imageUrls: BASE_URL + 'api/dytcadcontent/adcontent/list',

  // 上传身分证
  idCardUpload: BASE_URL + 'api/dytcapplymgr/applymgr/add?apiKey=79a225c51c6d412b8f7b50d22ae5f32c&version=1.0',
  // 上传商家门头
  titleUpload: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/upload/title?apiKey=79a225c51c6d412b8f7b50d22ae5f32c&version=1.0',
  // 上传消费凭证
  guidanceUpload: BASE_URL + 'api/dytcmemberdetail/guidancedetail/upload/images?apiKey=79a225c51c6d412b8f7b50d22ae5f32c&version=1.0',

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

  // 查询用户申请业务经理记录
  findMgrByPhone: BASE_URL + 'api/dytcapplymgr/applymgr/find/by/phone',

  // 申请提现
  applyWithdraw: BASE_URL + 'api/dytcmemberdetail/withdrawdetail/add',
  // 申请明细
  applyWithdrawDetail: BASE_URL + 'api/dytcmemberdetail/withdrawdetail/search',
  // 重复消费明细
  repeatDetail: BASE_URL + 'api/dytcmemberdetail/repeatdetail/search',
  // 引流送积分明细
  guidanceDetail: BASE_URL + 'api/dytcmemberdetail/guidancedetail/search',
  // 引流送积分更新
  guidanceUpdate: BASE_URL + 'api/dytcmemberdetail/guidancedetail/update/special',
  // 接收明细
  giftrecieveDetail: BASE_URL + 'api/dytcmemberdetail/giftrecievedetail/search',
  // 消费明细
  consumeDetail: BASE_URL + 'api/dytcmemberdetail/consumedetail/search',
  // 分红明细
  returnDetail: BASE_URL + 'api/dytcmemberdetail/returndetail/search',
  // 奖金明细
  bonusDetail: BASE_URL + 'api/dytcmemberdetail/bonusdetail/search',
  // 粉丝明细
  fansDetail: BASE_URL + 'api/usermnt/userbaseinfo/find/fans',
  //绑定url
  bindPhoneUrl: BASE_URL + 'api/usermnt/userbaseinfo/wechat/bind/phone',
  // 引流送积分
  guidanceAdd: BASE_URL + 'api/dytcmemberdetail/guidancedetail/add',
  // 申请业务经理
  applyMgr: BASE_URL + 'api/dytcapplymgr/applymgr/add',
  // 申请业务经理
  applyMgrUpdate: BASE_URL + 'api/dytcapplymgr/applymgr/update/special',
  // 注册商家
  merchantRegist: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/add',
  // 更新商家信息
  merchantUpdate: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/update/special',
  
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

  // 微信支付请求参数
  paymentUrl: BASE_URL + 'api/wx/payment',
  // 返回一个ad
  findOneAdUrl: BASE_URL + 'api/admnt/advertise/findone',
  // 商家充值
  chargeMoney: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/charge/money',
  // 商家充值明细
  chargeMoneyDetail: BASE_URL + 'api/dytcmerchantdetail/chargedetail/search',
  // 查找同名商家
  merchantFindByName: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/find/name',
  // 根据merchantPhone查询商家
  merchantFindByPhone: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/find/merchant/phone',
  // 商家类型列表
  merchantTypeList: BASE_URL + 'api/dytcmerchanttype/merchanttype/list',
  // 商家消费录入
  consumeInput: BASE_URL + 'api/usermnt/userbaseinfo/consume/input',
  // 商家消费录入明细
  consumeInputDetail: BASE_URL + 'api/dytcmerchantdetail/cosumeinputdetail/search',
  // 商家积分兑换
  merchantInteralChange: BASE_URL + 'api/usermnt/userbaseinfo/merchant/interal/change',
  // 商家明细
  merchantDetail: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/search',
  // 根据ID查找商家
  findMerchantById: BASE_URL + 'api/dytcmerchantmnt/merchantmnt/find',
  // 提交订单
  submitOrder: BASE_URL + 'api/ordermnt/baseorder/add',

}

module.exports = config