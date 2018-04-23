// pages/index/sealplan/sealplan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processData: [{
      name: '提交材料',
      start: '#fff',
      end: '#EFF3F6',
      icon: '/resource/home/process_1.png'
    },
    {
      name: '材料审核中',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/resource/home/process_2.png'
    },
    {
      name: '制作印章',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/resource/home/process_3.png'
    },
    {
      name: '上报印章',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/resource/home/process_3.png'
    },
    {
      name: '交付使用',
      start: '#EFF3F6',
      end: '#fff',
      icon: '/resource/home/process_3.png'
    }],
    seals: ['承德印诺系统集成公章'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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