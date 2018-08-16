// pages/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: [],
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.showNavigationBarLoading();
    this.requestDetail(options.id);
  },

  requestDetail(id) {
    app.request.get(`/jiekou/albums/a${id}.html`).then((res) => {
      wx.hideNavigationBarLoading();
      this.setData({
        details: res.picture
      })
    })
  }
})