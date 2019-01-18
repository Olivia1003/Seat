/**
 * @author wjy
 * @description 首页
 */

Page({
  data: {
    orderList: [],
    isShowOrder: false
  },
  onLoad() {
    console.log("home page loaded")
    this.getOrderData()

    // this.goBookSelect()

    // wx.switchTab({
    //   url: "../orderPage/orderPage"
    // });

  },
  // 获取用户订单信息
  getOrderData() {
    const userId = '1003'
    const _this = this
    wx.request({
      url: `http://localhost:3000/order/search?userId=${userId}`,
      method: "GET",
      success: function (res) {
        console.log('getOrderData response success', res)
        if (res.data && res.data.length > 0) {
          const orderList = res.data.filter((oItem) => {
            return oItem.status !== '0'
          })
          _this.setData({
            orderList,
            isShowOrder: true
          }, () => {
            console.log('set orderList over', _this.data)
          })
        } else {
          _this.setData({
            isShowOrder: false
          })
        }
      },
      fail: function () {
        console.log('getOrderData response fail')
      }
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