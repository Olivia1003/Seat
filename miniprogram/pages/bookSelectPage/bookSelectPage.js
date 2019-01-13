/**
 * @author wjy
 * @description 预定选择页面
 */
const app = getApp()
Page({
    data: {
        selectSchoolIndex: 0,
        selectFloorIndex: 0,
        selectDate: "",
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
        startHourList: [8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22],
        startMinList: [0, 30],
        endHourList: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        endMinList: [0, 30],
        // for style
        windowHeight: 800

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
            selectDate: e.detail.value
        })
    },
    comfirmSelect() {
      const formatTime = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('-')
      }

      const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
      }

      console.log(this.data.selectDate)
      console.log(this.data.selectTimeSection)
      var startDate = this.data.selectDate + ' ' + this.data.selectTimeSection.startHour + ':' + this.data.selectTimeSection.startMin + ':00'
      var endDate = this.data.selectDate + ' ' + this.data.selectTimeSection.endHour + ':' + this.data.selectTimeSection.endMin + ':00'
      app.globalData.today = (this.data.selectDate == formatTime(new Date()))
        wx.navigateTo({
          url: "../selectSeatPage/selectSeatPage?startDate=" + startDate + "&endDate=" + endDate + "&today=" + (this.data.selectDate == formatTime(new Date()) )
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
    }

});
