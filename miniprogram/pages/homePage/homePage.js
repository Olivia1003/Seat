/**
 * @author wjy
 * @description 首页
 */
const app = getApp();
Page({
  data: {},
  onLoad() {
    console.log("home page loaded")

    // this.goBookSelect()

    // wx.switchTab({
    //   url: "../orderPage/orderPage"
    // });

  },
  openScanCode() {
    console.log("openScanCode")
    wx.scanCode({
      success: (res) => {
        console.log("scan code success", res)
        wx.request({
          url: app.globalData.baseUrl + "/seat/check?owner=" + app.globalData.code + "&seatSlug=" + res,
          method: "POST",
          success: function (res) {
            console.log(res)
          },
          fail: function () {

          }
        });
      },
      fail: (res) => {
        console.log("scan code fail", res)
      }
    })
  },
  goBookSelect() {
    console.log('goBookSelect')
    wx.navigateTo({
      url: "../bookSelectPage/bookSelectPage",
      success(res) {
        console.log("navigateTo success", res)
      },
      fail(err) {
        console.log("navigateTo fail", err)
      }
    })
  }
});
