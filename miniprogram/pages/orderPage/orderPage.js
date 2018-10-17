/**
 * @author wjy
 * @description 订单页面
 */

Page({
  data: {
    currentTabId: "1",
    currentOrderList: [{
      idNo: "01",
      schoolName: "school aaa",
      floorName: "floor 2",
      seatNo: "A123",
      status: "...ing",
      startTime: "2018-06-12 14:00",
      endTime: "2018-06-12 15:00"
    }, {
      idNo: "02",
      schoolName: "school bbb",
      floorName: "floor 3",
      seatNo: "A123",
      status: "...ing",
      startTime: "2018-06-12 14:00",
      endTime: "2018-06-12 15:00"
    }],
    pastOrderList: [{
      idNo: "02",
      schoolName: "school ccc",
      floorName: "floor 3",
      seatNo: "A123",
      status: "...ing",
      startTime: "2018-06-12 14:00",
      endTime: "2018-06-12 15:00"
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
