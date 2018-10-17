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
        ]

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
    }
});
