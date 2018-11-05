/**
 * @author wjy
 * @description 我的信息
 */
const app = getApp()
Page({
  data: {
    canIUse: false,
    user: ''
  },
  onShow: function () {
    this.user = app.globalData.userInfo
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  }
});
