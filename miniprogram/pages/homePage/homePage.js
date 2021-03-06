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
    mapSeatList: [
      {
        id: "001",
        gridX: 4,
        gridY: 3,
        type: 1,
        status: 1
      },
      {
        id: "002",
        gridX: 3,
        gridY: 3,
        type: 1,
        status: 0
      }
    ],
    mapSchoolName: '华东师范大学',
    mapFloorName: '中北三楼',
    mapSeatName: '',
    isShowOrder: false,
    isShowReportModal: false,
    isShowSeatMapModal: false,

  },
  onLoad() {
    // temp
    // setTimeout(() => {
    //   this.showSeatMapModal()
    // }, 1000);

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
            return status === '1' || status === '2' || status === '3'
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
  // 可视化选座
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
  // 智能选座
  goAutoBook() {
    console.log('goAutoBook')
    const userId = getGlobal('userId')
    const baseUrl = getGlobal('baseUrl')
    sendRequest('GET', `${baseUrl}/order/autoBook?userId=${userId}`)
      .then((res) => {
        console.log('goAutoBook ok', res)
      }, (err) => {
        console.log('goAutoBook fail', err)
      })
  },
  freshPage() {
    console.log('freshPage')
    this.onLoad()
  },
  // 监督举报
  commitReport() {
    console.log('commitReport')
  },
  showReportModal() {
    this.setData({
      isShowReportModal: true
    })
  },
  hideReportModal() {
    this.setData({
      isShowReportModal: false
    })
  },
  showSeatMapModal(params) {
    console.log('showSeatMapModal', params.detail)
    if (params.detail && params.detail.seatId) {
      const seatId = params.detail.seatId
      const baseUrl = getGlobal('baseUrl')
      // 获取楼层所有座位列表
      sendRequest('GET', `${baseUrl}/seat/seatMap?seatId=${seatId}`)
        .then((res) => {
          console.log('get SeatMap ok', res)
          if (res.data && res.data.seatList) {
            let mapSeatName = ''
            const mapSeatList = res.data.seatList.map((sItem) => {
              let resItem = {}
              const pos = JSON.parse(sItem.position)
              const isSameSeat = String(sItem.seatId) === String(seatId)
              if (isSameSeat) {
                mapSeatName = sItem.name
              }
              if (pos && pos.length >= 2) {
                resItem = {
                  id: sItem.seatId,
                  gridX: pos[0],
                  gridY: pos[1],
                  type: sItem.type,
                  status: isSameSeat ? 1 : 0
                }
              }
              return resItem
            })
            console.log('mapSeatList', mapSeatList)
            this.setData({
              mapSeatList,
              mapSeatName
            }, () => {
              this.setData({
                isShowSeatMapModal: true
              })
            })
          }
        }, (err) => {
          console.log('get SeatMap fail', err)
        })
    }
  },
  hideSeatMapModal() {
    console.log('hideSeatMapModal')
    this.setData({
      isShowSeatMapModal: false
    })
  }

});