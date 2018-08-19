// pages/mine/mine.js
const app = getApp();
Page({
  onLoad(options) {
    this.setData({
      isLogin: app.isLogin(),
      userInfo: app.globalData.userInfo,
    });
  },

  getUserInfo(event) {
    if (!event.detail.userInfo) {
      return;
    }
    this.setData({
      userInfo: event.detail.userInfo,
      isLogin: true
    })
   app.setUserInfo(event.detail.userInfo);
  },

  about() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  onLogoutTapped(event) {
    const that = this;
    wx.showModal({
      title: '退出当前账号？',
      confirmText: '退出',
      confirmColor: '#3f87ff',
      success: function success(res) {
        if (res.confirm) {
          app.logout();
          that.setData({
            userInfo: null,
            isLogin: false
          })
        }
      },
    });
  },
});
