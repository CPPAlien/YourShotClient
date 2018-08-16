//index.js
//获取应用实例
const app = getApp()

Page({
  pageIndex: 1,
  data: {
    allDayItems: [],
  },
  
  onLoad: function () {
    wx.showNavigationBarLoading();
    this.pageIndex = 1;
    this.requestList();
  },
  
  requestList() {
    app.request.get(`/jiekou/mains/p${this.pageIndex}.html`).then((res) => {
      for (const item of res.album) {
        if (item.title && item.title.indexOf('国家地理毛绒玩具') < 0) {
          this.data.allDayItems.push(item);
        }
      }
      wx.hideNavigationBarLoading();
      this.setData({
        allDayItems: this.data.allDayItems
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
    console.log(event);
  },

  onShareAppMessage: function (res) {
    
  }
})
