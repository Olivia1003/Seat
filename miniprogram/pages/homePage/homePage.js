/**
 * @author wjy
 * @description 首页
 */

Page({
  data: {},
  onLoad() {
    console.log("home page loaded");
    // wx.navigateTo({
    //   url: "../orderPage/orderPage",
    //   success(res) {
    //     console.log("navigateTo success", res);
    //   },
    //   fail(err) {
    //     console.log("navigateTo fail", err.errMsg);
    //   }
    // });
    wx.switchTab({
      url: "../orderPage/orderPage"
    });
  },
  openScanCode() {
    console.log("openScanCode");
    wx.scanCode();
  }
});
