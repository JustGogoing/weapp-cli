export const user = {
  userinfo: {},
  openid: '',
  useLocation: false, // 能否使用定位
  latitude: '',
  longitude: ''
}

// 读取本地存储的用户信息
export function init() {
  try {
    var value = wx.getStorageSync('userinfo')
    if (value) {
      user.userinfo = value
    }
  } catch (e) {
    console.log(e)
  }
}

// 退出登录
export function exit() {
  setUser({})
  setOpenid('')
}

// 存储用户信息
export function setUser(info) {
  user.userinfo = info
  wx.setStorageSync('userinfo', info)
}

// 是不是登陆了
export function checkLogin() {
  if (user.openid && user.userinfo.nickName) {
    return true
  } else {
    return false
  }
}

// openid
export function setOpenid(openid) {
  user.openid = openid
  wx.setStorageSync('openid', openid)
}

// 修改经纬度
export function changexy(x,y) {
  user.latitude = x
  user.longitude = y
}

// 对于定位权限的设置
export function checkLocalSetting() {
  // 获取当前定位信息
  wx.getSetting({
    success: res => {
      // 判断是否授权定位
      if (!res.authSetting['scope.userLocation']) {
        // 没授权的话拉起授权
        wx.authorize({
          scope: 'scope.userLocation',
          success: () => {
            // 同意授权, 获取当前经纬度
            user.useLocation = true
            getLocationNow()
          },
          fail: (e) => {
            user.useLocation = false
            // 不同意授权
            wx.showModal({
              content: '检测到您没打开定位功能权限，是否去设置打开？',
              confirmText: "确认",
              cancelText: "取消",
              success: function (res) {
                //点击“确认”时打开设置页面
                if (res.confirm) {
                  openSettingPage()
                } else {
                  console.log('用户点击取消')
                }
              }
            });
          }
        })
      } else {
        user.useLocation = true
        getLocationNow()
      }
    }
  })
}

// 获取当前经纬度
export function getLocationNow() {
  // 获取当前经纬度
  wx.getLocation({
    success: (res) => {
      user.latitude = res.latitude
      user.longitude = res.longitude
    },
  })
}


// 更改授权
export function openSettingPage(){
  wx.openSetting({
    success: (res) => {
      if (res.authSetting['scope.userLocation']) {
        user.useLocation = true;
        getLocationNow()
      }
    }
  })
}
