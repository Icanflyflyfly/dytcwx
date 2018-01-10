// pages/member/registmerc/registmerc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc:"",
    region: ['河北省', '承德市', '双桥区'],
    customItem: '全部',
    imageList: [],
    index: 0,
    multiArray: [['餐饮', '超市'], ['快餐', '自助', '火锅']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '餐饮'
        },
        {
          id: 1,
          name: '超市'
        }
      ], [
        {
          id: 0,
          name: '快餐'
        },
        {
          id: 1,
          name: '自助'
        },
        {
          id: 2,
          name: '火锅'
        }
      ], [
        {
          id: 0,
          name: '便利店'
        },
        {
          id: 1,
          name: '综合超市'
        }
      ]
    ],
    multiIndex: [0, 0, 0]
  },
  chooseImage: function (event) {
    var that = this;
    wx.chooseImage({
      count: 2, // 一次最多可以选择2张图片一起上传
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgeList = that.data.imageList.concat(res.tempFilePaths);
        that.setData({
          imageList: imgeList
        });
      }
    })
  },
  previewImage: function (e) {
    var that = this;
    var dataid = e.currentTarget.dataset.id;
    var imageList = that.data.imageList;
    wx.previewImage({
      current: imageList[dataid],
      urls: this.data.imageList
    });
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['快餐', '自助', '火锅'];

            break;
          case 1:
            data.multiArray[1] = ['便利店', '综合超市'];

            break;
        }
        data.multiIndex[1] = 0;

        break;

    }
    this.setData(data);
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