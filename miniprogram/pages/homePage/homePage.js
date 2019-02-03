/**
 * @author wjy
 * @description 首页
 */

import {
  getGlobal
} from '../../common/global'
import {
  isInTimeSection,
  getTimeStrFromNumber
} from '../../common/timeSecUtil'
import {
  sendRequest
} from '../../common/serverUtil';
import {
  userLogin
} from '../../common/loginUtil'

Page({
  data: {
    orderList: [],
    isShowOrder: false
  },
  onLoad() {
    console.log("home page loaded")
    const userId = getGlobal('userId')
    if (userId) {
      this.getOrderData()
    } else {
      userLogin().then(() => {
        this.getOrderData()
      }, () => {
        wx.showToast({
          title: '登录失败，请稍后再试',
          icon: 'none',
          duration: 2000,
        })
      })
    }

    // this.goBookSelect()

    // wx.switchTab({
    //   url: "../orderPage/orderPage"
    // });

  },
  // 获取用户订单信息
  getOrderData() {
    const userId = getGlobal('userId')
    const _this = this
    const baseUrl = getGlobal('baseUrl')
    console.log('getOrderData request userId', userId, baseUrl)
    sendRequest('GET', `${baseUrl}/order/search?userId=${userId}`)
      .then((res) => {
        console.log('getOrderData response success', res)
        if (res.data && res.data.length > 0) {
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
              const timeSec = getTimeStrFromNumber(oItem.timeList)
              const isInTime = isInTimeSection(new Date(2019, 1, 20, 8, 20), oItem.date, oItem.timeList) //temp
              return {
                ...oItem,
                isInTime,
                timeSec
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
      }, (res) => {
        console.log('getOrderData response fail')
      })
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
  },
  freshPage() {
    console.log('freshPage')
    this.onLoad()
  }
});