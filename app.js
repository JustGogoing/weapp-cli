//app.js
import store from './store/index'
App({
  onLaunch: function () {
    store.userMethods.init()
  },
  globalData: {
  }
})