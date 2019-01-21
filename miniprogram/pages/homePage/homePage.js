/**
 * @author wjy
 * @description 首页
 */

import {
  getGlobal
} from '../../common/global'
import {
  isInTimeSection
} from '../../common/timeSecUtil'

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
    const baseUrl = getGlobal('baseUrl')
    console.log('getOrderData request userId', userId, baseUrl)
    wx.request({
      url: `${baseUrl}/order/search?userId=${userId}`,
      method: "GET",
      success: function (res) {
        console.log('getOrderData response success', res)
        if (res.data) {
          // 只显示进行中or未来的订单
          const orderList = res.data.filter((oItem) => {
            const {
              status
            } = oItem
            return status === '1' || status === '2' ||
              status === '3' || status === '4'
          })
          if (orderList.length > 0) {
            // 判断每个订单是否在时间段内
            const newOrderList = orderList.map((oItem) => {
              return {
                ...oItem,
                isInTime: isInTimeSection(new Date(2019, 1, 20, 8, 20), oItem.date, oItem.timeList) //temp
              }
            })
            _this.setData({
              orderList: newOrderList,
              isShowOrder: true
            }, () => {
              console.log('set orderList over', _this.data)
            })
          } else {
            _this.setData({
              isShowOrder: false
            })
          }
        }
      },
      fail: function () {
        console.log('getOrderData response fail')
      }
    });
  },
  // 重新加载页面
  reloadPage() {
    this.getOrderData()
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