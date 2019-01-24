/**
 * @author wjy
 * @description 点击座位，选择时间段的modal
 */
const MAX_SEC_NUM = 4
const app = getApp()
Component({
    properties: {
        sectionItemList: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // sectionItemList: [{
        //     secId: 1,
        //     content: "12:00-12:30",
        //     isSelect: false,
        //     isFree: true
        // }],
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
            // console.log('tapSectionHandle secId', selectId)
            const newItemList = JSON.parse(JSON.stringify(sectionItemList))
            let newSelectType = selectType
            if (selectType === 1) { // 选择开始时间
                newSelectType = 2
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
        // console.log('select modal attached seatTimeData', this.data)
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {},
        hide: function () {},
        resize: function () {},
    },

});