/**
 * @author wjy
 * @description 选择座位页面
 */

Page({
    data: {
        seatItemList: [{
            id: "001",
            gridX: 4,
            gridY: 3,
            type: 1,
            status: 1
        },
        {
            id: "002",
            gridX: 5,
            gridY: 3,
            type: 1,
            status: 1
        },
        {
            id: "003",
            gridX: 6,
            gridY: 3,
            type: 1,
            status: 0
        },
        {
            id: "004",
            gridX: 4,
            gridY: 4,
            type: 2,
            status: 1
        },
        {
            id: "005",
            gridX: 5,
            gridY: 4,
            type: 2,
            status: 0
        },
        {
            id: "006",
            gridX: 6,
            gridY: 4,
            type: 2,
            status: 0
        },
        {
            id: "007",
            gridX: 4,
            gridY: 5,
            type: 1,
            status: 0
        }, {
            id: "008",
            gridX: 5,
            gridY: 5,
            type: 1,
            status: 0
        }, {
            id: "009",
            gridX: 6,
            gridY: 5,
            type: 1,
            status: 0
        },
        {
            id: "011",
            gridX: 9,
            gridY: 3,
            type: 1,
            status: 1
        },
        {
            id: "012",
            gridX: 10,
            gridY: 3,
            type: 1,
            status: 0
        },
        {
            id: "013",
            gridX: 11,
            gridY: 3,
            type: 1,
            status: 0
        },
        {
            id: "014",
            gridX: 9,
            gridY: 4,
            type: 2,
            status: 0
        },
        {
            id: "015",
            gridX: 10,
            gridY: 4,
            type: 2,
            status: 0
        },
        {
            id: "016",
            gridX: 11,
            gridY: 4,
            type: 2,
            status: 0
        },
        {
            id: "017",
            gridX: 9,
            gridY: 5,
            type: 1,
            status: 0
        }, {
            id: "018",
            gridX: 10,
            gridY: 5,
            type: 1,
            status: 0
        }, {
            id: "019",
            gridX: 11,
            gridY: 5,
            type: 1,
            status: 0
        },
        {
            id: "021",
            gridX: 4,
            gridY: 7,
            type: 1,
            status: 1
        },
        {
            id: "022",
            gridX: 5,
            gridY: 7,
            type: 1,
            status: 1
        },
        {
            id: "023",
            gridX: 6,
            gridY: 7,
            type: 1,
            status: 0
        },
        {
            id: "024",
            gridX: 4,
            gridY: 8,
            type: 2,
            status: 1
        },
        {
            id: "025",
            gridX: 5,
            gridY: 8,
            type: 2,
            status: 0
        },
        {
            id: "026",
            gridX: 6,
            gridY: 8,
            type: 2,
            status: 0
        },
        {
            id: "027",
            gridX: 4,
            gridY: 9,
            type: 1,
            status: 0
        }, {
            id: "028",
            gridX: 5,
            gridY: 9,
            type: 1,
            status: 0
        }, {
            id: "029",
            gridX: 6,
            gridY: 9,
            type: 1,
            status: 0
        },
        {
            id: "031",
            gridX: 9,
            gridY: 7,
            type: 1,
            status: 1
        },
        {
            id: "032",
            gridX: 10,
            gridY: 7,
            type: 1,
            status: 0
        },
        {
            id: "033",
            gridX: 11,
            gridY: 7,
            type: 1,
            status: 0
        },
        {
            id: "034",
            gridX: 9,
            gridY: 8,
            type: 2,
            status: 0
        },
        {
            id: "035",
            gridX: 10,
            gridY: 8,
            type: 2,
            status: 0
        },
        {
            id: "036",
            gridX: 11,
            gridY: 8,
            type: 2,
            status: 0
        },
        {
            id: "037",
            gridX: 9,
            gridY: 9,
            type: 1,
            status: 0
        }, {
            id: "038",
            gridX: 10,
            gridY: 9,
            type: 1,
            status: 0
        }, {
            id: "039",
            gridX: 11,
            gridY: 9,
            type: 1,
            status: 0
        }
        ],
        // 移动
        // mapPosLeft: 10,
        // mapPosTop: 10,
        // scrollStartX: 0,
        // scrollStartY: 0,
        // 缩放
        mapBaseWid: 500,
        mapBaseHei: 500,
        mapScaleWid: 500,
        mapScaleHei: 500,
        mapScale: 1.0,
        moveOldDis: 0,
        // modal
        isShowModal: false,
        // select state
        hasSelect: false

    },
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
    // 点击某一座位
    itemTapHandle(e) {
        const {
            seatItemList,
            hasSelect
        } = this.data
        console.log('itemTapHandle', e.detail)
        const selectIndex = e.detail.index
        if ((!hasSelect) && selectIndex >= 0 && selectIndex < seatItemList.length) {
            const selectSeatData = seatItemList[selectIndex]
            console.log('selectSeatData', selectSeatData)
            this.showModal()
        }

    },
    submitHandle() {
        console.log('submit seat data', this.data.seatItemList)
        wx.showModal({
            content: 'hello',
            showCancel: true,
            cancelText: 'cancel',
            confirmText: 'confirm',
            success: function () {
                console.log('success')
            },
            fail: function () {
                console.log('fail')
            }
        })
    },
    touchMapStartHandle(e) {
        console.log('touchMapStartHandle', e.touches[0].clientX, e.touches[0].clientY)
        if (e.touches && e.touches.length === 1) { // 移动
            // this.data.scrollStartX = e.touches[0].clientX
            // this.data.scrollStartY = e.touches[0].clientY
        } else if (e.touches && e.touches.length >= 2) { // 放大缩小
            const xMove = e.touches[1].clientX - e.touches[0].clientX
            const yMove = e.touches[1].clientY - e.touches[0].clientY
            const dis = Math.sqrt(xMove * xMove + yMove * yMove)
            this.data.moveOldDis = dis
        }

    },
    touchMapMoveHandle(e) {
        // console.log('touchMapMoveHandle', e.touches[0].clientX, e.touches[0].clientY)
        // get diff
        if (e.touches && e.touches.length === 1) { // 移动
            // const {
            //     mapPosLeft,
            //     mapPosTop
            // } = this.data
            // const newX = e.touches[0].clientX
            // const newY = e.touches[0].clientY
            // const newMapLeft = mapPosLeft + (newX - this.data.scrollStartX)
            // const newMapTop = mapPosTop + (newY - this.data.scrollStartY)
            // this.setData({
            //     mapPosLeft: newMapLeft,
            //     mapPosTop: newMapTop,
            //     scrollStartX: newX,
            //     scrollStartY: newY
            // })
        } else if (e.touches && e.touches.length >= 2) { // 放大缩小
            const {
                moveOldDis,
                mapScale,
                mapBaseWid,
                mapBaseHei,
                // mapScaleWid,
                // mapScaleHei
            } = this.data
            const xMove = e.touches[1].clientX - e.touches[0].clientX
            const yMove = e.touches[1].clientY - e.touches[0].clientY
            const newDis = Math.sqrt(xMove * xMove + yMove * yMove)
            const disDiff = newDis - moveOldDis

            // get scale
            const newScale = mapScale + 0.005 * disDiff
            if (newScale < 0.5 || newScale > 2) {
                return
            }

            // get wid,hei
            const newScaleWid = Math.floor(newScale * mapBaseWid)
            const newScaleHei = Math.floor(newScale * mapBaseHei)

            // set data
            this.setData({
                mapScaleWid: newScaleWid,
                mapScaleHei: newScaleHei,
                moveOldDis: newDis,
                mapScale: newScale
            }, () => {
                // console.log('set map data success', this.data.mapScale)
            })
        }



    },
    touchMapEndHandle(e) {
        console.log('touchMapEndHandle', e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    },
    scrollHandle(e) {
        console.log('scrollHandle', e.detail, this.data)
    },
    // getSeatIndexById(selectId) {
    //     let res = -1
    //     this.data.sectionItemList.forEach((item, index) => {
    //         if (item.id === selectId) {
    //             res = index
    //             return
    //         }
    //     });
    //     return res
    // }
});
