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
        reportSeatId: '',
        reportSeatName: 'A123'
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
        confirmHandle() {
            console.log('confirmHandle')
            this.triggerEvent('confirm')
        },
        cancelHandle() {
            console.log('cancelHandle')
            this.triggerEvent('cancel')
        }
    },
    attached() {
        // console.log('select modal attached seatTimeData', this.data)
    },


});