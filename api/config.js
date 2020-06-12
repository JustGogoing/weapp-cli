import store from '../store/index.js'

// const Host = 'http://192.168.0.101'

// 对数据请求的封装
export function get(url, data = {}) {
  return request(url, "GET", data)
}
export function post(url, data = {}) {
  return request(url, "POST", data)
}


function request(url, method, data) {
  /**
   * 判断传参中如果不传loading为true则默认在数据请求的时候导航栏loading
   * 旨在部分情况下控制loading是否显示
   */
  let loading = data.loading || true
  if (loading !== false) {
    wx.showNavigationBarLoading()
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: Host + url,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        checkCode(res, resolve, reject)
      },
      fail: function (res) { },
      complete: function (res) {
        wx.hideNavigationBarLoading()
      }
    })
  })
};

/**
 * 对错误参数的统一处理
 */
function checkCode(res, resolve, reject) {
  switch (res.data.code) {
    case 200:
      resolve(res.data.data)
      break;
    default:
      reject(res.data)
      return
  }
}