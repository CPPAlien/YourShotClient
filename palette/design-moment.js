// 名片分享样式
const app = getApp();

export default class DesignMoment {
  content = {}

  do(content) {
    this.content = JSON.parse(JSON.stringify(content));
    return this._template();
  }

  _template() {
    return ({
      width: '654rpx',
      height: '800rpx',
      borderRadius: '8rpx',
      views: [{
        type: 'image',
        url: this.content.image,
        css: {
          top: '24rpx',
          left: '24rpx',
          width: '606rpx',
          height: '606rpx',
        },
      },
      {
        type: 'rect',
        css: {
          color: '#F5F5F5',
          bottom: '0rpx',
          width: '654rpx',
          height: '152rpx',
          borderRadius: '8rpx',
        },
      },
      {
        type: 'text',
        text: this.content.title,
        css: {
          left: '32rpx',
          bottom: '62rpx',
          width: '450rpx',
          fontSize: '32rpx',
          color: '#333',
        },
      },
      {
        type: 'qrcode',
        content: `https://www.flowergo.xyz/detail?id=${this.content.id}`,
        css: {
          bottom: '24rpx',
          right: '32rpx',
          width: '102rpx',
          height: '102rpx',
        },
      },
      ],
    });
  }
}
