/**
 * @author wjy
 * @description 订单页面
 */

Page({
  data: {
    currentTabId: "1",
    currentOrderList: [{
      idNo: "01",
      schoolName: "华东师范大学",
      floorName: "中北图书馆一楼",
      seatNo: "A145",
      status: "进行中",
      date: "2018-11-08",
      startTime: "10:00",
      endTime: "12:00"
    }],
    pastOrderList: [{
      idNo: "02",
      schoolName: "华东师范大学",
      floorName: "闵行图书馆一楼",
      seatNo: "B124",
      status: "已完成",
      date: "2018-10-22",
      startTime: "14:00",
      endTime: "16:30"
    }, {
      idNo: "03",
      schoolName: "华东师范大学",
      floorName: "中北图书馆三楼",
      seatNo: "A112",
      status: "已完成",
      date: "2018-10-12",
      startTime: "12:30",
      endTime: "15:00"
    }]
  },
  clickTabHandle(e) {
    const newId = e.target.dataset.idno
    console.log('clickTabHandle', newId, this.data.currentTabId)
    if (newId) {
      this.setData({
        currentTabId: newId
      })
    }
  }
});
