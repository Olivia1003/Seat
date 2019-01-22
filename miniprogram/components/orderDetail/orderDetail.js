/**
 * @author wjy
 * @description 首页的一项订单，包括操作按钮
 */

import {
    getGlobal
} from '../../common/global'
import {
    scanSeatCode
} from '../../common/scanUtil'
import {
    isInTimeSection
} from '../../common/timeSecUtil'
import {
    sendRequest
} from '../../common/serverUtil'

Component({
    properties: {
        orderData: {
            type: Object,
            value: {
                // idNo: '124',
                // // school: '华东师范大学',
                // floor: 'floor 3',
                // seatNo: 'A123',
                // date: '2019-03-20',
                // timeList: [1, 2, 3],
                // status: 1
            }
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        userData: {
            leaveShort: 3,
            leaveLong: 1
        },
        orderData: {
            seatId: '',
            seatName: '',
            school: '',
            floor: '',
            keywords: '',
            orderId: '',
            date: '',
            timeSec: '',
            status: '',
            isInTime: false
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 取消订单
        cancelOrder() {
            const _this = this
            wx.showModal({
                content: '是否取消座位？',
                showCancel: true,
                cancelText: '再想想',
                confirmText: '确认',
                success: function (res) {
                    if (res.confirm) {
                        console.log('confirm')
                        const orderId = _this.data.orderData.orderId
                        const baseUrl = getGlobal('baseUrl')
                        console.log('cancelOrder', _this.data.orderData, baseUrl)
                        sendRequest('DELETE', `${baseUrl}/order?orderId=${orderId}`)
                            .then((res) => {
                                console.log('cancelOrder response success', res)
                                if (parseInt(res.data.flag) === 1) {
                                    wx.showToast({
                                        title: '成功取消预定',
                                        icon: 'success',
                                        duration: 2000,
                                        success: () => {
                                            setTimeout(() => {
                                                _this.triggerEvent('reloadPage')
                                            }, 2000);
                                        }
                                    })
                                } else {
                                    wx.showToast({
                                        title: '取消失败，请稍后再试',
                                        icon: 'none',
                                        duration: 2000
                                    })
                                }
                            }, (res) => {
                                console.log('cancelOrder response fail')
                            })
                    } else {
                        console.log('cancel')
                    }
                },
                fail: function () {
                    console.log('fail')
                }
            })
        },
        /**
         * 改变该订单状态
         * @param status 新状态
         * @param leaveType status=3时，判断是短期暂离还是长期暂离
         */
        changeOrderStatus(status, leaveType = 1) {
            const _this = this
            return new Promise((resolve, reject) => {
                const orderId = _this.data.orderData.orderId
                const newStatus = status || '1'
                const baseUrl = getGlobal('baseUrl')
                const reqUrl = `${baseUrl}/order/update?orderId=${orderId}&status=${newStatus}&leaveType=${leaveType}`
                // console.log('changeOrderStatus request', orderId)
                sendRequest('PUT', reqUrl)
                    .then((res) => {
                        console.log('changeOrderStatus response success', res)
                        if (parseInt(res.data.flag) === 1) {
                            resolve()
                        } else {
                            reject()
                        }
                    }, (res) => {
                        console.log('changeOrderStatus response fail', res)
                        reject()
                    })
            })

        },
        // 签到
        orderScanIn() {
            const _this = this
            scanSeatCode().then((scanRes) => {
                console.log('scanRes ok', scanRes)
                if (scanRes && scanRes.seatId) {
                    const {
                        status,
                        timeList,
                        date
                    } = this.data.orderData
                    // check：当前座位，status=2，在时间段内
                    console.log(status, isInTimeSection(new Date(2019, 1, 20, 8, 20), date, timeList))
                    if (scanRes.seatId === String(this.data.orderData.seatId) &&
                        status === '1' && isInTimeSection(new Date(2019, 1, 20, 8, 20), date, timeList)) {
                        this.changeOrderStatus('2')
                            .then(() => {
                                wx.showToast({
                                    title: '签到成功',
                                    icon: 'success',
                                    duration: 2000,
                                })
                                setTimeout(() => {
                                    _this.triggerEvent('reloadPage')
                                }, 2000);
                            }, () => {
                                wx.showToast({
                                    title: '签到失败，请稍后再试',
                                    icon: 'none',
                                    duration: 2000,
                                })
                            })
                    } else {
                        wx.showToast({
                            title: '请稍后再试',
                            icon: 'none',
                            duration: 2000,
                        })
                    }
                }
            }, (res) => {
                console.log('scanRes fail', res)
                wx.showToast({
                    title: '扫描失败，请稍后再试',
                    icon: 'none',
                    duration: 2000,
                })
            })
        },
        // 暂离签回
        orderScanBack() {
            console.log('orderScanBack')
        },
        // 暂离20min
        orderScanLeaveShort() {
            this.orderScanLeave(1)
        },
        // 暂离60min
        orderScanLeaveLong() {
            this.orderScanLeave(2)
        },
        orderScanLeave(leaveType) {
            const _this = this
            const leaveCount = (leaveType === 1 ?
                _this.data.userData.leaveShort :
                _this.data.userData.leaveLong) || 0
            console.log('leaveCount', leaveCount)
            if (leaveCount > 0) {
                const title = `确认要签离吗？（本月还剩${leaveCount}次）`
                wx.showModal({
                    content: title,
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '确认',
                    success: function (res) {
                        console.log('success', res)
                        if (res.confirm) {
                            console.log('leave request')
                            _this.changeOrderStatus('3', leaveType)
                                .then((res) => {
                                    console.log('orderScanLeave success', res)
                                    wx.showToast({
                                        title: '暂离成功',
                                        icon: 'success',
                                        duration: 2000,
                                    })
                                    setTimeout(() => {
                                        _this.triggerEvent('reloadPage')
                                    }, 2000);
                                }, (res) => {
                                    console.log('orderScanLeaveShort fail', res)
                                    wx.showToast({
                                        title: '暂离失败，请稍后再试',
                                        icon: 'none',
                                        duration: 2000,
                                    })
                                })
                        }
                    },
                    fail: function (res) {
                        console.log('fail', res)
                    }
                })
            } else {
                const leaveName = leaveType === 1 ? '短期暂离' : '长期暂离'
                wx.showModal({
                    content: `本月已经没有${leaveName}次数了哦`,
                    showCancel: false,
                    confirmText: '好的',
                    success: function (res) {
                        console.log('success', res)
                    }
                })
            }
        }
    },
    attached() {
        // console.log('orderDetail attached', this.data)
    }
});