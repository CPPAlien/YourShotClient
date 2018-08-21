// pages/detail/detail.js
const app = getApp()
const SHARE_FRIEND = '发给微信好友';
const SHARE_MOMENT = '分享至朋友圈';
const ARRAYS = [{
  title: SHARE_FRIEND,
  type: 'share'
}, SHARE_MOMENT];

Page({
  title: '',
  currentItem: '',
  data: {
    details: [],
    error: false
  },

  onLoad: function (options) {
    this.title = options.title;
    wx.setNavigationBarTitle({
      title: this.title
    })
    
    if (options.scrollTop) {
      this.scrollTop = options.scrollTop;
    }

    if (options.q) {
      const url = decodeURIComponent(options.q);
      this.detailId = app.getParameterByName('id', url);
      this.scrollTop = app.getParameterByName('scrollTop', url);
    } else {
      this.detailId = options.id;
    }

    this.requestDetail(this.detailId);
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
          url: `/pages/share-page/share-page?id=${this.detailId}&title=${this.currentItem.title}
          &image=${encodeURIComponent(this.currentItem.url)}&scrollTop=${this.scrollTop}&content=${this.currentItem.content}`
        })
        break;
    }
  },

  requestDetail(detailId) {
    wx.showNavigationBarLoading();
    app.request.get(`/jiekou/albums/a${detailId}.html`).then((res) => {
      wx.hideNavigationBarLoading();
      this.setData({
        details: res.picture,
        error: false
      })
      if (this.scrollTop) {
        wx.pageScrollTo({
          scrollTop: this.scrollTop
        });
      }
    }, () => {
      this.setData({
        error: true
      })
      wx.hideNavigationBarLoading();
    });
  },

  retry() {
    this.requestDetail(this.detailId);
  },

  onPageScroll(event) {
    this.scrollTop = event.scrollTop;
  },

  backToHome(event) {
    wx.switchTab({
      url: "/pages/index/index"
    })
  },

  onShareAppMessage: function (res) {
    if (this.currentItem) {
      const title = this.currentItem.title;
      const content = this.currentItem.content;
      const url = this.currentItem.url;
      this.currentItem = '';
      return {
        title: `${title} | ${content}`,
        imageUrl: url,
        path: `/pages/detail/detail?id=${this.detailId}&title=${this.title}&scrollTop=${this.scrollTop}`
      }
    }
    return {
      title: this.title,
      imageUrl: this.data.details[0].url,
      path: `/pages/detail/detail?id=${this.detailId}&title=${this.title}`
    }
  }
})