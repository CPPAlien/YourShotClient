/**
 * 网络请求类
 */
export default class Request {
  // 微信请求的默认超时时间
  TIMEOUT = 60000;

  _request(method, path, data, header) {
    const server = "https://www.flowergo.xyz";
    return new Promise((resolve, reject) => {
      wx.request({
        url: server + path,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          ...header,
        },
        success: (response) => {
          console.log(`${path} >> `);
          console.log(response);
          if (response.statusCode === 200) {
            const { data: result } = response;
            resolve(result);
          } else {
            getApp().showToast('服务器异常');
            reject(response.statusCode);
          }
        },
        fail: () => {
          getApp().showToast('请检查网络链接');
          reject(new Error('请求失败'));
        },
      });
    });
  }

  get(path, data = {}, header = {}) {
    return this._request('GET', path, data, header);
  }

  post(path, data = {}, header = {}) {
    return this._request('POST', path, data, header);
  }

  delete(path, data = {}, header = {}) {
    return this._request('DELETE', path, data, header);
  }

  put(path, data = {}, header = {}) {
    return this._request('PUT', path, data, header);
  }
}
