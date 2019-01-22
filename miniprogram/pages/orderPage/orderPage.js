/**
 * @author wjy
 * @description 订单页面
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

Page({
  data: {
    currentTabId: "1",
    currentOrderList: [],
    pastOrderList: []
  },
  onLoad() {
    this.getOrderData()
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
  // 获取用户订单信息
  getOrderData() {
    const userId = '1003'
    const _this = this
    const baseUrl = getGlobal('baseUrl')
    sendRequest('GET', `${baseUrl}/order/search?userId=${userId}`)
      .then((res) => {
        console.log('getOrderData response success', res)
        if (res.data && res.data.length > 0) {
          const orderList = res.data
          // 格式转换
          const tempList = orderList.map((oItem) => {
            const isCurrent = oItem.status === '1' || oItem.status === '2' || oItem.status === '3'
            const isInTime = isInTimeSection(new Date(2019, 1, 20, 8, 20), oItem.date, oItem.timeList) //temp
            const timeSec = getTimeStrFromNumber(oItem.timeList)
            let statusName = ''
            switch (oItem.status) {
              case '0':
                statusName = '已取消'
                break
              case '1':
                statusName = isInTime ? '已到时间，未签到' : '未到时间'
                break
              case '2':
                statusName = '已签到'
                break
              case '3':
                statusName = '暂离'
                break
              case '4':
                statusName = '已完成'
                break
              case '5':
                statusName = '已违约'
                break
            }
            return {
              ...oItem,
              isCurrent,
              isInTime,
              timeSec,
              statusName
            }
          })
          // 当前订单
          const currentList = tempList.filter((oItem) => {
            return oItem.status === '1' ||
              oItem.status === '2' ||
              oItem.status === '3'
          })
          // 历史订单
          const pastList = tempList.filter((oItem) => {
            return oItem.status === '0' ||
              oItem.status === '4' ||
              oItem.status === '5'
          })
          this.setData({
            currentOrderList: currentList,
            pastOrderList: pastList
          }, () => {
            console.log('set order data over', this.data)
          })
        }
      }, (res) => {
        console.log('getOrderData response fail')
      })
  },
});