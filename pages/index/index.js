const app = getApp()
const SHARE_FRIEND = '发给微信好友';
const SHARE_MOMENT = '分享至朋友圈';
const ARRAYS = [{
  title: SHARE_FRIEND,
  type: 'share'
}, SHARE_MOMENT];

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

  hideModal() {
    this.setData({
      showModal: false,
      itemList: [],
    });
    this.currentItem = '';
  },

  showModal(item) {
    this.currentItem = item;
    this.setData({
      showModal: true,
      itemList: ARRAYS,
    });
  },

  onSheetTapped(e) {
    this.setData({
      showModal: false,
    });
    switch (e.currentTarget.dataset.item) {
      case SHARE_MOMENT:
        wx.navigateTo({
          url: `/pages/share-page/share-page?id=${this.currentItem.id}&title=${this.currentItem.title}
          &image=${encodeURIComponent(this.currentItem.url)}`
        })
        break;
    }
  },
  
  requestList(refresh) {
    wx.showNavigationBarLoading();
    app.request.get(`/jiekou/mains/p${this.pageIndex}.html`).then((res) => {
      if (refresh) {
        this.data.allDayItems = [];
      }
      for (const item of res.album) {
        if (item.title && item.title.indexOf('国家地理毛绒玩具') < 0) {
          this.data.allDayItems.push(item);
        }
      }
      wx.hideNavigationBarLoading();
      wx.setStorage({
        key: "data",
        data: this.data.allDayItems,
      })
      this.setData({
        error: false,
        allDayItems: this.data.allDayItems
      })
    }, () => {
      wx.hideNavigationBarLoading();
      let data;
      try {
        data = wx.getStorageSync("data");
      } catch (e) {
        console.error(e);
      }
      if (data) {
        this.setData({
          allDayItems: data
        })
        app.showToast('网络异常');
      } else {
        this.setData({
          error: true,
          allDayItems: []
        })
      }
    })
  },

  retry() {
    this.requestList(true);
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
    if (this.currentItem) {
      const title = this.currentItem.title;
      const url = this.currentItem.url;
      const id = this.currentItem.id;
      this.currentItem = '';
      return {
        title: `${title}`,
        imageUrl: url,
        path: `/pages/detail/detail?id=${id}&title=${title}`
      }
    }
    return {
      title: '每日精选，带你看世界',
      imageUrl: this.data.allDayItems[0].url
    }
  },

  onPullDownRefresh() {
    this.pageIndex = 1;
    this.requestList(true);
    wx.stopPullDownRefresh();
    app.showToast('每日零点更新');
  }
})
