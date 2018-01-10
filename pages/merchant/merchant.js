//merchant.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
   
  },
  onLoad: function () {
    
  }, 
  imageLoad: function (e) {
    var imageSize = util.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
})
