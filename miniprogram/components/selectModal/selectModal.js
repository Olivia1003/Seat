/**
 * @author wjy
 * @description 点击座位，选择时间段的modal
 */
const MAX_SEC_NUM = 4
const app = getApp()
Component({
    properties: {
        // isShow: {
        //     type: Boolean,
        //     value: false,
        // },
        // seat: {
        //     type: Object,
        // },
        // today: {
        //     type: Boolean
        // },
        seatTimeData: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        sectionItemList: [{
                secId: 1,
                content: "12:00-12:30",
                isSelect: false,
                isFree: true
            },
            {
                secId: 2,
                content: "12:30-13:00",
                isSelect: false,
                isFree: true
            },
            {
                secId: 3,
                content: "12:30-13:00",
                isSelect: false,
                isFree: true
            }, {
                secId: 4,
                content: "12:30-13:00",
                isSelect: false,
                isFree: true
            }, {
                secId: 5,
                content: "12:30-13:00",
                isSelect: false,
                isFree: true
            },
            {
                secId: 6,
                content: "12:30-13:00",
                isSelect: false,
                isFree: false
            },
            {
                secId: 7,
                content: "12:30-13:00",
                isSelect: false,
                isFree: true
            },
            {
                secId: 8,
                content: "12:30-13:00",
                isSelect: false,
                isFree: true
            }
        ],
        selectSecCnt: 0,
        selectType: 1, // 1=选择开始时间，2=选择结束时间
        lastSelectId: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancelHandle() {
            console.log('cancelHandle')
            this.triggerEvent('cancel')
        },
        confirmHandle() {
            const {
                sectionItemList
            } = this.data
            const selectSecList = []
            sectionItemList.forEach((sItem) => {
                if (sItem.isFree && sItem.isSelect) {
                    selectSecList.push(sItem.secId)
                }
            });
            // console.log('confirmHandle', selectSecList)
            this.triggerEvent('confirm', {
                selectSecList
            })

            // console.log(chooseIndex)
            // wx.request({
            //     url: app.globalData.baseUrl + "/seat/appoint?times=" + chooseIndex + "&owner=" + app.globalData.code + "&seatSlug=" + this.data.seat.seatSlug,
            //     method: "POST",
            //     success: function (res) {
            //         wx.showToast({
            //             title: JSON.stringify(res.data.obj),
            //             icon: 'none',
            //             duration: 4000,
            //             success: function () {
            //                 wx.navigateBack({
            //                     delta: 2
            //                 })
            //             }
            //         })
            //     },
            // });
        },
        tapSectionHandle(e) {
            const {
                sectionItemList,
                selectType,
                lastSelectId
            } = this.data
            const selectId = e.currentTarget.dataset.secid
            const isFree = e.currentTarget.dataset.isfree
            if (!isFree) {
                return
            }
            // const selectIndex = this.getSectionIndexById(idNo)
            console.log('tapSectionHandle secId', selectId)
            const newItemList = JSON.parse(JSON.stringify(sectionItemList))
            let newSelectType = selectType
            if (selectType === 1) { // 选择开始时间
                newSelectType = 2
                // if (newItemList[selectIndex]) {
                //     newItemList[selectIndex].isSelect = true
                // }
                newItemList.forEach((sItem) => {
                    sItem.isSelect = (sItem.secId === selectId)
                })
            } else if (selectType === 2) { // 选择结束时间
                newSelectType = 1
                if (selectId < lastSelectId) {
                    wx.showToast({
                        title: '结束时间必须大于开始时间哦',
                        icon: 'none',
                        duration: 2000
                    })
                    return
                }
                newItemList.forEach((sItem) => {
                    sItem.isSelect = sItem.secId >= lastSelectId && sItem.secId <= selectId
                })
            }
            this.setData({
                sectionItemList: newItemList,
                selectType: newSelectType,
                lastSelectId: selectId
            })


            // const newSelectCnt = this.getSelectSecCnt(newItemList)
            // if (newSelectCnt <= MAX_SEC_NUM) {
            //     this.setData({
            //         sectionItemList: newItemList
            //     })
            // } else {
            //     wx.showToast({
            //         title: '最多只能选择两个小时哦',
            //         icon: 'none',
            //         duration: 2000
            //     })
            // }
        },
        // getSectionIndexById(selectId) {
        //     let res = -1
        //     this.data.sectionItemList.forEach((sItem, index) => {
        //         if (sItem.secId === selectId) {
        //             res = index
        //             return
        //         }
        //     });
        //     return res
        // },
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
        console.log('select modal attached seatTimeData', this.data.seatTimeData)
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {},
        hide: function () {},
        resize: function () {},
    },

});