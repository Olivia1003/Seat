/**
 * @author wjy
 * @description 监督举报的modal
 */
import {
    getGlobal
} from '../../common/global'
import {
    sendRequest
} from '../../common/serverUtil'
import {
    scanSeatCode
} from '../../common/scanUtil'

Component({
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        reportSeatId: '112',
        reportSeatName: 'A123',
        reportDetail: '' // 举报理由
    },

    /**
     * 组件的方法列表
     */
    methods: {
        scanSeat() {
            scanSeatCode().then((res) => {
                console.log('scanSeatCode ok', res)
                const { seatId } = res
                if (seatId) {
                    const baseUrl = getGlobal('baseUrl')
                    // 根据seatId获取seatName
                    sendRequest('GET', `${baseUrl}/seat/seatId=${seatId}`)
                        .then((res) => {
                            console.log('get seatInfo ok', res)
                            // this.setData({
                            //     reportSeatName:''
                            // })
                        }, (err) => {
                            console.log('get seatInfo fail', err)
                        })
                }
            }, (err) => {
                console.log('scanSeatCode fail', err)
            })
        },
        // 提交举报
        confirmHandle() {
            const _this = this
            const { reportSeatId, reportDetail } = this.data
            console.log('confirmHandle', reportSeatId, reportDetail)
            const baseUrl = getGlobal('baseUrl')
            const userId = getGlobal('userId')
            sendRequest('PUT', `${baseUrl}/report/userId=${userId}&seatId=${reportSeatId}&detail=${reportDetail}`)
                .then((res) => {
                    console.log('confirm report ok', res)
                    wx.showToast({
                        title: '举报已提交',
                        icon: 'success',
                        duration: 2000,
                        success: () => {
                            setTimeout(() => {
                                _this.triggerEvent('hideModal')
                            }, 2000);
                        }
                    })
                }, (err) => {
                    console.log('confirm report fail', err)
                    this.triggerEvent('hideModal')
                })
        },
        cancelHandle() {
            console.log('cancelHandle')
            this.triggerEvent('hideModal')
        },
        // textArea输入时触发，记录输入值
        reasonInputHandle(e) {
            // console.log('reasonInputHandle', e.detail)
            const reason = e.detail.value
            this.setData({
                reportDetail: reason
            })
        }
    },
    attached() {
        // console.log('select modal attached seatTimeData', this.data)
    },


});