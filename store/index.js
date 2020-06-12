import { user, checkLogin, setUser, setOpenid,exit, checkLocalSetting, openSettingPage, getLocationNow, setFatherCode, setMyCode, changexy } from './user.js'
export default {
  data: {
    user,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logs: []
  },
  userMethods: { checkLogin, setUser, exit, setOpenid, checkLocalSetting, openSettingPage, getLocationNow, setFatherCode, setMyCode, changexy},
  //无脑全部更新，组件或页面不需要声明 use
  //updateAll: true,
  debug: true
}