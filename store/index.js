import { user, checkLogin, setUser, setOpenid,exit, checkLocalSetting, openSettingPage, getLocationNow, changexy } from './user.js'
export default {
  data: {
    user
  },
  userMethods: { checkLogin, setUser, exit, setOpenid, checkLocalSetting, openSettingPage, getLocationNow, changexy},
  //无脑全部更新，组件或页面不需要声明 use
  updateAll: true,
  // debug: true
}