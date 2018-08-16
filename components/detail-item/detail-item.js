// components/day-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageTapped(event) {
      wx.previewImage({urls: [event.target.dataset.item.url]})
    },

    longPressed(event) {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      currentPage.showModal(event.target.dataset.item);
    }
  }
})
