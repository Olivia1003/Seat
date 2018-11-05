App({
  globalData: {
    baseUrl: "http://localhost:8080",
    code: null,
    userInfo: null,
    user: null
  },
  onLaunch: function () {
    const that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('登录成功！' + res.code)
          //换openid
          wx.request({
            url: that.globalData.baseUrl + "/seat/login?code=" + res.code,
            method: "POST",
            success: function (res) {
              that.globalData.code = res.data.obj
            },
            fail: function () {
              console.log("失败了");
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
