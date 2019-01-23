/**
 * @author wjy
 * @description 预定选择页面
 */
const app = getApp()
Page({
    data: {
        selectSchoolIndex: 0,
        selectFloorIndex: 0,
        // selectDate: "",
        selectDateIndex: 0,
        // selectTime: "",
        selectTimeSection: {
            startHour: 8,
            startMin: 0,
            endHour: 22,
            endMin: 0
        },
        selectTimeSectionStr: {
            startHour: "8",
            startMin: "00",
            endHour: "22",
            endMin: "00"
        },
        schoolList: ['华东师范大学'],
        floorList: ['中北图书馆三楼'],
        dateList: ['2019-03-12（今天）', '2019-03-13（明天）'],
        startHourList: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        startMinList: [0, 30],
        endHourList: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        endMinList: [0, 30],
        // for style
        windowHeight: 800,
        // modal
        isShowModal: true,
        modalSeatData: [],


    },
    onLoad() {
        // 设置默认日期时间
        const currentDate = new Date()
        const currentDateStr = this.getDateHyphenFromDateObject(currentDate)
        if (currentDateStr !== "") {
            this.setData({
                selectDate: currentDateStr
            })
        }

        // get screen height
        const _this = this
        let hei = _this.data.windowHeight
        wx.getSystemInfo({
            success: function (res) {
                console.log(res.screenHeight)
                console.log(res.windowHeight)
                hei = res.screenHeight
            }
        })
        _this.setData({
            windowHeight: hei
        }, () => {
            console.log(_this.data)
        })


    },
    onShow() {

    },
    onReady() {


    },
    selectSchoolHandle(e) {
        console.log('select school', e.detail)
        this.setData({
            selectSchoolIndex: e.detail.value
        })
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
    selectStartHourHandle(e) {
        console.log('select start hour', e.detail)
        const {
            selectTimeSection,
            startHourList
        } = this.data
        const newIndex = parseInt(e.detail.value)
        if (newIndex >= 0 && newIndex < startHourList.length) {
            const newTimeSection = JSON.parse(JSON.stringify(selectTimeSection))
            newTimeSection.startHour = startHourList[newIndex]
            this.setData({
                selectTimeSection: newTimeSection
            }, () => {
                this.freshTimeSectionStr()
            })
        }
    },
    selectStartMinHandle(e) {
        console.log('select start min', e.detail)
        const {
            selectTimeSection,
            startMinList
        } = this.data
        const newIndex = parseInt(e.detail.value)
        if (newIndex >= 0 && newIndex < startMinList.length) {
            const newTimeSection = JSON.parse(JSON.stringify(selectTimeSection))
            newTimeSection.startMin = startMinList[newIndex]
            this.setData({
                selectTimeSection: newTimeSection
            }, () => {
                this.freshTimeSectionStr()
            })
        }
    },
    selectEndHourHandle(e) {
        console.log('select end hour', e.detail)
        const {
            selectTimeSection,
            endHourList
        } = this.data
        const newIndex = parseInt(e.detail.value)
        if (newIndex >= 0 && newIndex < endHourList.length) {
            const newTimeSection = JSON.parse(JSON.stringify(selectTimeSection))
            newTimeSection.endHour = endHourList[newIndex]
            this.setData({
                selectTimeSection: newTimeSection
            }, () => {
                this.freshTimeSectionStr()
            })
        }
    },
    selectEndMinHandle(e) {
        console.log('select end min', e.detail)
        const {
            selectTimeSection,
            endMinList
        } = this.data
        const newIndex = parseInt(e.detail.value)
        if (newIndex >= 0 && newIndex < endMinList.length) {
            const newTimeSection = JSON.parse(JSON.stringify(selectTimeSection))
            newTimeSection.endMin = endMinList[newIndex]
            this.setData({
                selectTimeSection: newTimeSection
            }, () => {
                this.freshTimeSectionStr()
            })
        }
    },
    comfirmSelect() {
        console.log('comfirmSelect')
        wx.navigateTo({
            url: "../selectSeatPage/selectSeatPage",
            success(res) {
                console.log("navigateTo success", res);
            },
            fail(err) {
                console.log("navigateTo fail", err);
            }
        })
    },
    /**
     * 得到Hyphen时间
     * input: Date Object
     * output: 2018-08-20
     */
    getDateHyphenFromDateObject(d) {
        if (!d) {
            return ''
        }
        const year = d.getFullYear()
        const month = ('0' + (d.getMonth() + 1)).slice(-2)
        const day = ('0' + d.getDate()).slice(-2)
        return year + '-' + month + '-' + day
    },
    freshTimeSectionStr() {
        const {
            selectTimeSection
        } = this.data
        const newTimeStr = JSON.parse(JSON.stringify(selectTimeSection))
        newTimeStr.startHour = ('0' + selectTimeSection.startHour).slice(-2)
        newTimeStr.startMin = ('0' + selectTimeSection.startMin).slice(-2)
        newTimeStr.endHour = ('0' + selectTimeSection.endHour).slice(-2)
        newTimeStr.endMin = ('0' + selectTimeSection.endMin).slice(-2)
        this.setData({
            selectTimeSectionStr: newTimeStr
        })
    },
    clickTimeSelect() {
        console.log('clickTimeSelect')
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
    confirmSelect(res) {
        const {
            selectSecList
        } = res.detail
        console.log('confirmSelect', selectSecList)

    }

});