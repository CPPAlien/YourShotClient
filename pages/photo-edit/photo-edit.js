// pages/photo-edit/photo-edit.js
const WxCaman = require('../../lib/wx-caman.min.js').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filters: [
      'vintage',
      'lomo',
      'sinCity',
      'sunrise',
      'crossProcess',
      'orangePeel',
      'love',
      'grungy',
      'pinhole',
      'oldBoot',
      'glowingSun',
      'hazyDays',
      'herMajesty',
      'nostalgia',
      'hemingway',
    ],
    filtersMap: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.imagePath = options.path;
    this.setData({
      imagePath: this.imagePath
    })
    
    this.size = 750 * getApp().rpxRatio;
  },

  onReady: function (e) {
    const that = this;
    wx.getImageInfo({
      src: this.imagePath,
      success: function (res) {
        that.picWidth = res.width;
        that.picHeight = res.height;
        that.render(0);
      }
    })
  },

  render(i) {
    const filter = this.data.filters[i];
    if (!filter) {
      return;
    }
    const that = this;
    const context = wx.createCanvasContext(filter)
    if (that.picWidth < that.picHeight) {
      context.drawImage(this.imagePath, 0, (that.picHeight - that.picWidth) / 2, that.picWidth, that.picWidth, 0, 0, this.size, this.size);
    } else {
      context.drawImage(this.imagePath, (that.picWidth - that.picHeight) / 2, 0, that.picHeight, that.picHeight, 0, 0, this.size, this.size);
    }
    
    context.draw(false, () => {
      new WxCaman(filter, this.size, this.size, function () {
        this[filter](false)
        this.render(()=> {
          wx.canvasToTempFilePath({canvasId: filter, success: function(res) {
            that.data.filtersMap[filter] = res.tempFilePath;
            that.setData({
              filtersMap: that.data.filtersMap
            })
            that.render(++i);
          }})
        })
      })
    });
  },

  filterTapped(event) {
    this.setData({
      imagePath: this.data.filtersMap[event.currentTarget.dataset.filter]
    })
  }
})