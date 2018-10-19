/**
 * @author wjy
 * @description 选座页面的一个座位
 */
Component({
    properties: {
        type: {
            type: Number,
            value: 0
        },
        status: {
            type: Number,
            value: 0
        },
        gridX: {
            type: Number,
            value: 0
        },
        gridY: {
            type: Number,
            value: 0
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        offsetX: 40,
        offsetY: 30
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTapHandle() {
            console.log('onTapHandle')


            if (this.data.type === 1) { // chair
                const oldStatus = this.data.status
                const newStatus = oldStatus ? 0 : 1
                this.setData({
                    status: newStatus
                }, () => {
                    console.log('setData success', this.data)
                })

                this.triggerEvent('seatItemTap', {
                    status: newStatus
                })
            }



        }
    },
    attached() {
        const gridLen = 50
        console.log('seatItem attached', this.properties, this.data)
        this.setData({
            offsetX: this.properties.gridX * gridLen,
            offsetY: this.properties.gridY * gridLen,
        })
    }
});
