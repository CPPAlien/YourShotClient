// pages/detail/detail.js
const app = getApp()

Page({
  title: '',
  id: '',
  data: {
    details: [],
  },

  onLoad: function (options) {
    this.title = options.title;
    wx.setNavigationBarTitle({
      title: this.title
    })
    wx.showNavigationBarLoading();
    this.id = options.id;
    this.requestDetail(options.id);
  },

  requestDetail(id) {
    app.request.get(`/jiekou/albums/a${id}.html`).then((res) => {
      wx.hideNavigationBarLoading();
      this.setData({
        details: res.picture
      })
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: this.title,
      imageUrl: this.data.details[0].url,
      path: `/pages/detail/detail?id=${this.id}&title=${this.title}`
    }
  }
})