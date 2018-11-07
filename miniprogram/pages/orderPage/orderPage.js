/**
 * @author wjy
 * @description 订单页面
 */
const app = getApp();
Page({
  data: {
    currentTabId: "1",
    currentOrderList:[],
    pastOrderList:[],
    // currentOrderList: [{
    //   idNo: "01",
    //   schoolName: "华东师范大学",
    //   floorName: "中北图书馆一楼",
    //   seatNo: "A123",
    //   status: "进行中",
    //   date: "2018-09-12",
    //   startTime: "14:00",
    //   endTime: "15:00"
    // }, {
    //   idNo: "02",
    //   schoolName: "华东师范大学",
    //   floorName: "中北图书馆三楼",
    //   seatNo: "A123",
    //   status: "进行中",
    //   date: "2018-06-12",
    //   startTime: "14:00",
    //   endTime: "15:00"
    // }],
    // pastOrderList: [{
    //   idNo: "02",
    //   schoolName: "华东师范大学",
    //   floorName: "闵行图书馆一楼",
    //   seatNo: "A123",
    //   status: "进行中",
    //   date: "2018-06-22",
    //   startTime: "14:00",
    //   endTime: "15:00"
    // }]
  },
  clickTabHandle(e) {
    const newId = e.target.dataset.idno
    console.log('clickTabHandle', newId, this.data.currentTabId)
    if (newId) {
      this.setData({
        currentTabId: newId
      })
    }
  },
  onShow(){
    const that = this
    wx.request({
      url: app.globalData.baseUrl + "/seat/record?owner=" + app.globalData.code,
      method: "POST",
      success: function (res) {
        that.setData({
          currentOrderList: res.data.obj.currentOrders,
          pastOrderList: res.data.obj.historyOrders
        })
      },
      fail: function () {

      }
    });
  }


});
