//app.js
App({
  ...require("./core/index"),

  onLaunch: function () {
    // 展示本地存储能力
    this.globalData.userInfo = wx.getStorageSync('userInfo') || null;
    this.rpxRatio = wx.getSystemInfoSync().screenWidth / 750;
    console.log(`rpxRatio = ${this.rpxRatio}`)
  },

  globalData: {
    userInfo: null
  },

  showToast(title) {
    wx.showToast({
      title: title,
      icon: 'none',
    });
  },

  getParameterByName(name, url) {
    if (!url) return null;
    const formatName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${formatName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  isLogin() {
    return this.globalData.userInfo != null;
  },

  setUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', this.globalData.userInfo);
  },

  logout() {
    this.globalData.userInfo = null;
    wx.removeStorageSync('userInfo');
  },

  navigateBackWithTimeout() {
    setTimeout(() => {
      wx.navigateBack();
    }, 1000);
  },
})