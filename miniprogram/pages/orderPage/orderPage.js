/**
 * @author wjy
 * @description 订单页面
 */

Page({
  data: {
    currentTabId: "1"
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
