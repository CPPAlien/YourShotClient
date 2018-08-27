Page({
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.navigateTo({
          url: `/pages/photo-edit/photo-edit?path=${res.tempImagePath}`
        })
      }
    })
  },
  choosePic() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: function (res) {
        wx.navigateTo({
          url: `/pages/photo-edit/photo-edit?path=${res.tempFilePaths[0]}`
        })
      }
    })
  },
})