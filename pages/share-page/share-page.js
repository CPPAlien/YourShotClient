import DesignPalette from '../../palette/design-moment';

const app = getApp();

Page({
  style: '',
  data: {
    imagePath: '',
    palette: '',
    successful: false,
    style: '',
  },

  saveImg() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imagePath,
      success: function (r) {
        app.showToast('保存成功');
      },
      fail: (error) => {
        console.error(`saveImageToPhotosAlbum failed, ${JSON.stringify(error)}`);
        wx.getSetting({
          success: (res) => {
            if (!(res && res.authSetting && res.authSetting['scope.writePhotosAlbum'])) {
              app.showToast('相册权限未打开，请在设置中打开该权限');
              wx.openSetting({
                success: (settingRes) => {
                  if (settingRes && settingRes.authSetting && settingRes.authSetting['scope.writePhotosAlbum']) {
                    app.showToast('授权成功');
                  } else {
                    app.showToast('授权失败');
                  }
                },
                fail: (errorS) => {
                  app.showToast('授权失败');
                  console.error(`openSetting failed, ${JSON.stringify(errorS)}`);
                },
              });
            } else {
              app.showToast('保存失败，请重试');
            }
          },
          fail: (errorS) => {
            app.showToast('保存失败，请重试');
            console.error(`getSetting failed, ${JSON.stringify(errorS)}`);
          },
        });
      },
    });
  },

  onLoad: function (options) {
    this.style = options.style;
    wx.showLoading({ title: '正在生成' });
    wx.setNavigationBarTitle({
      title: '分享到朋友圈',
    });
    app.request.get(`/download?pic=${decodeURIComponent(options.image)}`).then((res) => {
      const design = {
        image: res,
        id: options.id,
        title: options.title,
        scrollTop: options.scrollTop,
        content: options.content,
      };
      const palette = new DesignPalette().template(design);
      this.setData({
        palette: palette,
        style: `width:${palette.width};height:${palette.height};`,
      });
    }, () => {
      this.failed();
    })
  },

  failed() {
    wx.hideLoading();
    app.showToast('生成失败，请重试');
    app.navigateBackWithTimeout();
  },

  onImgOK(e) {
    this.setData({
      imagePath: e.detail.path,
    });
    wx.hideLoading();
  },
});
