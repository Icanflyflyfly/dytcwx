// pages/myinfo/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    dd: '',
    hidden: false,
    page: 1,
    size: 20,
    hasMore: true,
    scrollHeight: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = new Array();
    list.push({
      orderNo: 'YN2018041612102000001',
      orderTime: '2018-04-16 12:10:20',
      shopName: '承德印诺系统集成有限公司万达印章',
      orderStatus: 1,
      totalAmount: '360',
      payTime: '2018-04-16 12:12:20',
    });
    list.push({
      orderNo: 'YN2018041612102000005',
      orderTime: '2018-04-19 10:11:20',
      shopName: '承德印诺系统集成有限公司万达印章',
      orderStatus: 0,
      totalAmount: '720',
      payTime: '',
    });
    this.setData({
      list: list,
      hidden: true,
      hasMore: true
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
  
  }
})