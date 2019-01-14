/**
 * @author wjy
 * @description 点击座位，选择时间段的modal
 */
const MAX_SEC_NUM = 4
const app = getApp()
Component({
    properties: {
        isShow: {
            type: Boolean,
            value: false,
        },
        seat: {
            type: Object,
        },
        today: {
            type: Boolean
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        sectionItemList: [{
                id: "01",
                content: "12:00-12:30",
                isSelect: false
            },
            {
                id: "02",
                content: "12:30-13:00",
                isSelect: false
            },
            {
                id: "03",
                content: "12:30-13:00",
                isSelect: false
            }, {
                id: "04",
                content: "12:30-13:00",
                isSelect: false
            }, {
                id: "05",
                content: "12:30-13:00",
                isSelect: false
            },
            {
                id: "06",
                content: "12:30-13:00",
                isSelect: false
            },
            {
                id: "07",
                content: "12:30-13:00",
                isSelect: false
            },
            {
                id: "08",
                content: "12:30-13:00",
                isSelect: false
            }
        ],

        selectSecCnt: 0

    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancelHandle() {
            console.log('cancelHandle')
            this.triggerEvent('hideModal')
        },
        confirmHandle() {
            var chooseIndex = []
            const dayOffset = app.globalData.today ? 0 : 28;
            console.log('dayOffset', dayOffset)
            this.data.sectionItemList.forEach((item, index) => {
                if (item.isSelect) {
                    chooseIndex.push(item.id + dayOffset)
                }
            });
            console.log(chooseIndex)
            wx.request({
                url: app.globalData.baseUrl + "/seat/appoint?times=" + chooseIndex + "&owner=" + app.globalData.code + "&seatSlug=" + this.data.seat.seatSlug,
                method: "POST",
                success: function (res) {
                    wx.showToast({
                        title: JSON.stringify(res.data.obj),
                        icon: 'none',
                        duration: 4000,
                        success: function () {
                            wx.navigateBack({
                                delta: 2
                            })
                        }
                    })
                },
            });
        },
        tapSectionHandle(e) {
            const {
                sectionItemList,
                seat,
                today
            } = this.data
            const idNo = e.currentTarget.dataset.idno
            const selectIndex = this.getSectionIndexById(idNo)
            const newItemList = JSON.parse(JSON.stringify(sectionItemList))
            if (newItemList[selectIndex]) {
                newItemList[selectIndex].isSelect = !newItemList[selectIndex].isSelect
            }
            const newSelectCnt = this.getSelectSecCnt(newItemList)
            if (newSelectCnt <= MAX_SEC_NUM) {
                this.setData({
                    sectionItemList: newItemList
                })
            } else {
                wx.showToast({
                    title: '最多只能选择两个小时哦',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        getSectionIndexById(selectId) {
            let res = -1
            this.data.sectionItemList.forEach((item, index) => {
                if (item.id === selectId) {
                    res = index
                    return
                }
            });
            return res
        },
        getSelectSecCnt(dataList) {
            let res = 0
            dataList.forEach((item, index) => {
                if (item.isSelect) {
                    res++
                }
            });
            return res
        }
    },
    attached() {

    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {},
        hide: function () {},
        resize: function () {},
    },

});