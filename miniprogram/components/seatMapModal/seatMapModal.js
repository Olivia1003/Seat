/**
 * @author wjy
 * @description 我的信息 中的一行信息
 */
Component({
  properties: {
    modalTitle: {
      type: String,
      value: ''
    },
    seatItemList: {
      type: Array,
      value: []
    },
    schoolName: {
      type: String,
      value: ''
    },
    floorName: {
      type: String,
      value: ''
    },
    seatName: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    mapScale: 1,
    // seatItemList: [
    //   {
    //     id: "001",
    //     gridX: 4,
    //     gridY: 3,
    //     type: 1,
    //     status: 1
    //   },
    //   {
    //     id: "002",
    //     gridX: 3,
    //     gridY: 3,
    //     type: 1,
    //     status: 0
    //   }
    // ]
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
      console.log('cancelHandle')
      this.triggerEvent('hideModal')
    },
    // map
    touchMapStartHandle(e) {
      if (e.touches && e.touches.length === 1) { // 移动
      } else if (e.touches && e.touches.length >= 2) { // 放大缩小
        const xMove = e.touches[1].clientX - e.touches[0].clientX
        const yMove = e.touches[1].clientY - e.touches[0].clientY
        const dis = Math.sqrt(xMove * xMove + yMove * yMove)
        this.data.moveOldDis = dis
      }
    },
    touchMapMoveHandle(e) {
      // get diff
      if (e.touches && e.touches.length === 1) { // 移动
        // do nothing
      } else if (e.touches && e.touches.length >= 2) { // 放大缩小
        const {
          moveOldDis,
          mapScale,
          mapBaseWid,
          mapBaseHei,
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
      // console.log('touchMapEndHandle', e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    },
    scrollHandle(e) {
      // console.log('scrollHandle', e.detail, this.data)
    },
  }
});