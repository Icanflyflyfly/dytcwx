// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayed:0
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
    if (this.data.displayed == 1){      
      wx.switchTab({
        url: '/pages/index/index',
      });
      this.setData({
        displayed: 0
      });
    }else{
      var thiz = this;
      wx.showLoading({
        title: '跳转中，请稍后...',
        mask: true
      })
      wx.navigateToMiniProgram({
        appId: 'wxd88f7bdcfc321da7',
        // path: 'pages/magic/magic',
        envVersion: 'release',
        success(res) {
          // 打开成功
          console.log('success' + res);
          wx.hideLoading();
          thiz.setData({
            displayed: 1
          });
        },
        fail(rec) {
          console.log('fail' + res);
          wx.hideLoading();
        }
      })
    }
  },
  shoppingTab:function(){
    wx.navigateToMiniProgram({
      appId: 'wxd88f7bdcfc321da7',
      // path: 'pages/magic/magic',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log('success' + res);
      },
      fail(rec) {
        console.log('fail' + res);
      }
    })
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