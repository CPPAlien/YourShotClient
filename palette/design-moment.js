// 名片分享样式
const app = getApp();

export default class DesignMoment {
  template(data) {
    return ({
      width: '654rpx',
      height: '800rpx',
      views: [{
        type: 'image',
        url: data.image,
        css: {
          width: '654rpx',
          height: '654rpx',
        },
      },
      {
        type: 'rect',
        css: {
          color: '#F5F5F5',
          bottom: '0rpx',
          width: '654rpx',
          height: '152rpx',
        },
      },
      {
        type: 'text',
        text: `${data.title.trim()}${data.content ?  " | " + data.content.trim() : ""}`,
        css: {
          left: '32rpx',
          bottom: '50rpx',
          width: '450rpx',
          fontSize: '32rpx',
          lineHeight: '40rpx',
          color: '#333',
          maxLines: 2,
        },
      },
      {
        type: 'qrcode',
        content: `https://www.flowergo.xyz/detail?id=${data.id}${data.scrollTop ? "&scrollTop=" + data.scrollTop : ""}`,
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
