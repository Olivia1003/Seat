/**
 * @author wjy
 * @description 点击座位，选择时间段的modal
 */
const MAX_SEC_NUM = 4

Component({
    properties: {
        isShow: {
            type: Boolean,
            value: false
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
            console.log('confirmHandle')
        },
        tapSectionHandle(e) {
            const {
                sectionItemList
            } = this.data
            console.log("tapSectionHandle", e.currentTarget.dataset)
            const idNo = e.currentTarget.dataset.idno
            const selectIndex = this.getSectionIndexById(idNo)
            console.log('selectIndex', selectIndex)
            const newItemList = JSON.parse(JSON.stringify(sectionItemList))
            if (newItemList[selectIndex]) {
                newItemList[selectIndex].isSelect = !newItemList[selectIndex].isSelect
                console.log('set time index', selectIndex, newItemList[selectIndex].id, newItemList[selectIndex].isSelect)
            }
            const newSelectCnt = this.getSelectSecCnt(newItemList)
            console.log('newSelectCnt', newSelectCnt)
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
                console.log('check item', item)
                if (item.isSelect) {
                    res++
                }
            });
            return res
        }
    },
    attached() {

    }
});
