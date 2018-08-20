//index.js
//获取应用实例
const app = getApp()

Page({
  pageIndex: 1,
  data: {
    allDayItems: [],
    error: false
  },
  
  onLoad: function () {
    this.pageIndex = 1;
    this.requestList();
  },
  
  requestList() {
    wx.showNavigationBarLoading();
    app.request.get(`/jiekou/mains/p${this.pageIndex}.html`).then((res) => {
      for (const item of res.album) {
        if (item.title && item.title.indexOf('国家地理毛绒玩具') < 0) {
          this.data.allDayItems.push(item);
        }
      }
      wx.hideNavigationBarLoading();
      this.setData({
        error: false,
        allDayItems: this.data.allDayItems
      })
    }, () => {
      wx.hideNavigationBarLoading();
      this.setData({
        error: true
      })
    })
  },

  onReachBottom() {
    this.pageIndex ++;
    this.requestList();
  },

  itemTapped(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.target.dataset.item.id}&title=${event.target.dataset.item.title}`
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: '每日精选，带你看世界',
      imageUrl: this.data.allDayItems[0].url
    }
  },

  onPullDownRefresh() {
    this.pageIndex = 1;
    this.requestList();
    wx.stopPullDownRefresh();
    app.showToast('每日零点更新');
  }
})
