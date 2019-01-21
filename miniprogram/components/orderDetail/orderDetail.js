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
        orderData: {
            seatId: '',
            seatName: '',
            school: '',
            floor: '',
            keywords: '',
            orderId: '',
            date: '',
            timeList: '',
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
                        wx.request({
                            url: `${baseUrl}/order?orderId=${orderId}`,
                            method: "DELETE",
                            success: function (res) {
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

                            },
                            fail: function () {
                                console.log('cancelOrder response fail')
                            }
                        });
                    } else {
                        console.log('cancel')
                    }

                },
                fail: function () {
                    console.log('fail')
                }
            })
        },
        // 改变该订单状态
        changeOrderStatus(status) {
            const _this = this
            const orderId = this.data.orderData.orderId
            const newStatus = status || '1'
            const baseUrl = getGlobal('baseUrl')
            // console.log('changeOrderStatus request', orderId)
            sendRequest('PUT', `${baseUrl}/order/update?orderId=${orderId}&status=${newStatus}`)
                .then((res) => {
                    console.log('changeOrderStatus response success', res)
                    if (parseInt(res.data.flag) === 1) {
                        wx.showToast({
                            title: '签到成功',
                            icon: 'success',
                            duration: 2000,
                        })
                        setTimeout(() => {
                            _this.triggerEvent('reloadPage')
                        }, 2000);
                    } else {
                        wx.showToast({
                            title: '签到失败，请稍后再试',
                            icon: 'none',
                            duration: 2000,
                        })
                    }
                }, (res) => {
                    console.log('changeOrderStatus response fail', res)
                    wx.showToast({
                        title: '签到失败，请稍后再试',
                        icon: 'none',
                        duration: 2000,
                    })
                })
        },
        // 签到
        orderScanIn() {
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
            console.log('orderScanLeaveShort')
        },
        // 暂离60min
        orderScanLeaveLong() {
            console.log('orderScanLeaveLong')
        }
    },
    attached() {
        // console.log('orderDetail attached', this.data)
    }
});