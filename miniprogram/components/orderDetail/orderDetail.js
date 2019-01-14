/**
 * @author wjy
 * @description 首页的一项订单，包括操作按钮
 */
Component({
    properties: {
        orderData: {
            type: Object,
            value: {
                // idNo: '124',
                // // school: '华东师范大学',
                // floor: 'floor 3',
                // seatNo: 'A123',
                // date: '2019-03-20',
                // timeList: [1, 2, 3],
                // status: 1
            }
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        detail: {
            idNo: '124',
            // school: '华东师范大学',
            floor: '中北图书馆三楼',
            seatNo: 'A123',
            date: '2019-03-20',
            // timeList: [1, 2, 3],
            time: '8:00-12:00,14:00-17:00',
            status: 4,
            // statusTxt: '未签到',

        }
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    attached() {
        console.log('orderItem attached', this.data)
    }
});