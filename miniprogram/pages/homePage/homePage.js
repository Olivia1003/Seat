/**
 * @author wjy
 * @description 首页
 */

Page({
  data: {},
  onLoad() {
    console.log("home page loaded")

    // this.goBookSelect()

    wx.switchTab({
      url: "../orderPage/orderPage"
    });
  },
  openScanCode() {
    console.log("openScanCode")
    wx.scanCode({
      success: (res) => {
        console.log("scan code success", res)
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
