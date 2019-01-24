/**
 * @author wjy
 * @description 选择座位页面
 */
import {
    sendRequest
} from '../../common/serverUtil'
import {
    getGlobal
} from '../../common/global'
import {
    getTimeStrFromNumber
} from '../../common/timeSecUtil'
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
        hasSelect: false,
        today: true,
        // 已选信息
        searchData: {
            schoolName: '华东师范大学',
            floorId: '1',
            floorName: 'aaaa',
            date: '3-12',
            timeSec: '[0,1,2,3]',
            timeSecStr: '08:00-10:00',
            // keywords: ['window']
        }
    },
    onLoad(params) {
        // this.setSearchData(params)
        // temp
        this.setSearchData({
            floorId: 1,
            floorName: '中北一楼',
            date: '2019-02-10',
            timeSec: '[1,2,3]'
        })
    },
    // 保存url中搜索信息，并且请求服务
    setSearchData(params) {
        const {
            floorId,
            floorName,
            date,
            timeSec
        } = params
        if (floorId && date && timeSec && JSON.parse(timeSec)) {
            const searchData = {
                schoolName: '华东师范大学',
                floorId,
                floorName,
                date,
                timeSec: JSON.parse(timeSec),
                timeSecStr: getTimeStrFromNumber(JSON.parse(timeSec)),
                keywords: ['window'],
                keywordsStr: ['靠窗']
            }
            // console.log('set searchData', searchData)
            this.setData({
                searchData
            }, () => {
                this.getSeatData()
            })
        }
    },
    // 根据searchData请求服务
    getSeatData() {
        const {
            searchData
        } = this.data
        console.log('getSeatData', searchData)
        const {
            floorId,
            date,
            timeSec,
            keywords
        } = searchData
        if (floorId) { // TODO：动态改变搜索条件
            const timeList = JSON.stringify(timeSec)
            const keywordList = JSON.stringify(keywords)
            const baseUrl = getGlobal('baseUrl')
            const reqUrl = `${baseUrl}/seat/search?floorId=${floorId}&date=${date}&timeList=${timeList}&keywords=${keywordList}`
            sendRequest('GET', reqUrl)
                .then((res) => {
                    console.log('getSeatData success', res)
                    // 处理seat数据
                    if (res.data && res.data.length > 0) {
                        const seatItemList = res.data.map((sItem) => {
                            return {
                                seatId: sItem.seatId,
                                gridX: sItem.position && sItem.position[0] || 0,
                                gridY: sItem.position && sItem.position[1] || 0,
                                type: sItem.seatType,
                                status: sItem.isFree ? 1 : 0,
                                timeList: sItem.timeList
                            }
                        })
                        console.log('set seatItemList', seatItemList)
                        this.setData({
                            seatItemList
                        })
                    }
                }, (res) => {
                    console.log('getSeatData fail', res)
                })

        }
    },
    showModal() {
        console.log('show modal')
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
            hasSelect,
            today
        } = this.data
        console.log('itemTapHandle', e.detail)
        const selectIndex = e.detail.index
        if ((!hasSelect) && selectIndex >= 0 && selectIndex < seatItemList.length) {
            const selectSeatData = seatItemList[selectIndex]
            console.log('selectSeatData', selectSeatData)
            console.log('today', today)
            this.setData({
                seat: selectSeatData
            })
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