// pages/about/about.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    textLogo: `每日精选YourShot\n ${require('../../utils/settings').version}`,
    introduction: '每天搜罗一些有内涵，有品味的美图推荐给大家。让大家发现世界的另一面。长按图片还可以生成专属美图卡片，可以让你的好友一起来欣赏，也可以自己收藏。',
  },
});
