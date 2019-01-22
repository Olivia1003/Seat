/**
 * @author wjy
 * @description 订单页面的一项订单
 */
Component({
  properties: {
    orderData: {
      type: Object,
      value: {
        // seatId: '',
        // seatName: '',
        // school: '',
        // floor: '',
        // orderId: '',
        // date: '',
        // timeSec: '',
        // statusName: '',
        // isCurrent: false,
        // // keywords: '',
        // // isInTime: false
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {},
  attached() {
    console.log('orderItem attached', this.data)
  }
});