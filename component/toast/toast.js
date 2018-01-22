let _compData = {
  '_toast_.isHide': false,
  '_toast_.content': ''
}

let toastPanel = {
  show: function (data) {
    let that = this;
    this.setData({ '_toast_.isHide': true, '_toast_.content': data });
    setTimeout(function () {
      that.setData({ '_toast_.isHide': false });
    }, 1500)
  },

  showToastWith: function(data, success){
    let that = this;
    this.setData({ '_toast_.isHide': true, '_toast_.content': data });
    setTimeout(function () {
      that.setData({ '_toast_.isHide': false });
      success();
    }, 2000)
  }
}


function ToastPanel() {
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  this.__page = curPage;

  Object.assign(curPage, toastPanel);
  curPage.toastPanel = this;
  curPage.setData(_compData);

  return this;
}


module.exports = {
  ToastPanel
}