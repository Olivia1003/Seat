/**
 * @author wjy
 * @description 预定选择页面
 */
import {
    sendRequest
} from '../../common/serverUtil'
import {
    getGlobal
} from '../../common/global'
import {
    getDateHyphenFromDateObject,
    addDay
} from '../../common/dateUtil'
import {
    getTimeStrFromNumber
} from '../../common/timeSecUtil'
const app = getApp()
Page({
    data: {
        // floor
        selectFloorIndex: 0,
        floorDataList: [],
        floorNameList: [],
        // date
        selectDateIndex: 0,
        dateList: ['2019-03-12（今天）', '2019-03-13（明天）'],
        // time and modal
        selectTimeSec: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        selectTimeStr: '08:00-22:00',
        isShowModal: false,
        // 0-27，08:00-22:00，所有时间段
        modalTimeSecAll: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        modalTimeData: [{
            secId: 1,
            content: "12:00-12:30",
            isSelect: false,
            isFree: true
        }],
        // for style
        windowHeight: 800,


    },
    onLoad() {
        // 设置可选日期
        this.setDateList()
        // 设置可选时间段
        this.setModalTimeData()
        // 获取可选楼层信息
        this.getFloorData()


        // // get screen height
        // const _this = this
        // let hei = _this.data.windowHeight
        // wx.getSystemInfo({
        //     success: function (res) {
        //         console.log(res.screenHeight)
        //         console.log(res.windowHeight)
        //         hei = res.screenHeight
        //     }
        // })
        // _this.setData({
        //     windowHeight: hei
        // }, () => {
        //     console.log(_this.data)
        // })


    },
    onShow() {

    },
    onReady() {


    },
    selectFloorHandle(e) {
        console.log('select floor', e.detail)
        this.setData({
            selectFloorIndex: e.detail.value
        })
    },
    selectDateHandle(e) {
        console.log('select date', e.detail)
        this.setData({
            selectDateIndex: e.detail.value
        })
    },
    // 提交搜索
    commitSelect() {
        console.log('comfirmSelect', this.data)
        const {
            selectFloorIndex,
            floorDataList,
            selectDateIndex,
            dateList,
            selectTimeSec,
        } = this.data
        if (floorDataList[selectFloorIndex] && dateList[selectDateIndex]) {
            const floorId = floorDataList[selectFloorIndex].floorId
            const floorName = floorDataList[selectFloorIndex].floorName
            const date = dateList[selectDateIndex].slice(0, 10)
            const timeSec = JSON.stringify(selectTimeSec)
            wx.navigateTo({
                url: `../selectSeatPage/selectSeatPage?floorId=${floorId}&floorName=${floorName}&date=${date}&timeSec=${timeSec}`,
                success(res) {
                    console.log("navigateTo success", res);
                },
                fail(err) {
                    console.log("navigateTo fail", err);
                }
            })
        } else {
            wx.showToast({
                title: '提交失败，请稍后再试',
                icon: 'none',
                duration: 2000
            })
        }
    },
    // modal
    showModal() {
        this.setData({
            isShowModal: true
        })
    },
    hideModal() {
        this.setData({
            isShowModal: false
        })
    },
    // 用户选择完时间段
    confirmSelectModal(res) {
        const {
            selectSecList
        } = res.detail
        const {
            modalTimeSecAll
        } = this.data
        console.log('confirmSelectModal', selectSecList)
        const selectTimeStr = getTimeStrFromNumber(selectSecList)
        const modalTimeData = modalTimeSecAll.map((sItem) => {
            return {
                secId: sItem,
                content: getTimeStrFromNumber([sItem]),
                isSelect: selectSecList.indexOf(sItem) >= 0,
                isFree: true
            }
        })
        // console.log('confirm and cal modalTimeData', modalTimeData, selectSecList)
        if (selectSecList && selectTimeStr) {
            this.setData({
                selectTimeSec: selectSecList,
                selectTimeStr,
                modalTimeData
            })
        }
        this.hideModal()
    },
    // 从服务获取楼层信息
    getFloorData() {
        const schoolId = 1 //temp
        const baseUrl = getGlobal('baseUrl')
        sendRequest('GET', `${baseUrl}/seat/floor?schoolId=${schoolId}`)
            .then((res) => {
                console.log('getFloorData success', res)
                if (res.data && res.data.length > 0) {
                    const floorNameList = res.data.map((fItem) => {
                        return fItem.floorName
                    })
                    this.setData({
                        floorDataList: res.data,
                        floorNameList
                    })
                } else {
                    wx.showToast({
                        title: '获取楼层信息失败，请稍后再试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }, (res) => {
                console.log('getFloorData fail', res)
                wx.showToast({
                    title: '获取楼层信息失败，请稍后再试',
                    icon: 'none',
                    duration: 2000
                })
            })
    },
    // 计算今天和明天的日期，设置默认日期
    setDateList() {
        const todayDate = new Date()
        const nextDate = addDay(todayDate, 1)
        const todayDateStr = getDateHyphenFromDateObject(todayDate)
        const nextDateStr = getDateHyphenFromDateObject(nextDate)
        if (todayDateStr && nextDateStr) {
            this.setData({
                dateList: [
                    todayDateStr + '（今天）',
                    nextDateStr + '（明天）'
                ]
            })
        }
    },
    // 计算可选时间段，根据[0,1,2...]
    setModalTimeData() {
        const {
            modalTimeSecAll
        } = this.data
        const modalTimeData = modalTimeSecAll.map((sItem) => {
            return {
                secId: sItem,
                content: getTimeStrFromNumber([sItem]),
                isSelect: true,
                isFree: true
            }
        })
        this.setData({
            modalTimeData
        })
    }
});