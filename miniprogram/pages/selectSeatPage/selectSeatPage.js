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
                status: 0
            },
            {
                id: "002",
                gridX: 5,
                gridY: 3,
                type: 1,
                status: 0
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
                status: 0
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
        ],
        mapBaseWid: 500,
        mapBaseHei: 500,
        // mapScaleWid: 500,
        // mapScaleHei: 500,
        mapScale: 1.0,
        moveOldDis: 0

    },
    itemTapHandle(e) {
        console.log('itemTapHandle', e.detail)
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
        if (e.touches && e.touches.length >= 2) {
            const xMove = e.touches[1].clientX - e.touches[0].clientX
            const yMove = e.touches[1].clientY - e.touches[0].clientY
            const dis = Math.sqrt(xMove * xMove + yMove * yMove)
            this.data.moveOldDis = dis
        }

    },
    touchMapMoveHandle(e) {
        console.log('touchMapMoveHandle', e.touches[0].clientX, e.touches[0].clientY)
        // get diff
        if (e.touches && e.touches.length >= 2) {
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

            // get wid,hei
            // const newScaleWid = Math.floor(newScale * mapBaseWid)
            // const newScaleHei = Math.floor(newScale * mapBaseHei)

            // set data
            this.setData({
                // mapScaleWid: newScaleWid,
                // mapScaleHei: newScaleHei,
                moveOldDis: newDis,
                mapScale: newScale
            }, () => {
                console.log('set map data success', this.data.mapScale)
            })
        }



    },
    touchMapEndHandle(e) {
        console.log('touchMapEndHandle', e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    }
});
