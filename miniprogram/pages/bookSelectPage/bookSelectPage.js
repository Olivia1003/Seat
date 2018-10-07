/**
 * @author wjy
 * @description 预定选择页面
 */

Page({
    data: {
        selectSchoolIndex: 0,
        selectFloorIndex: 0,
        selectDate: "",
        selectTime: "",
        schoolList: ['school a', 'school b', 'school c'],
        floorList: ['floor 1', 'floor 2', 'floor 3']
    },
    onLoad() {

    },
    selectSchoolHandle(e) {
        console.log('select school', e.detail)
        this.setData({
            selectSchoolIndex: e.detail.value
        })
    },
    selectFloorHandle(e) {
        console.log('select floor', e.detail)
        this.setData({
            selectFloorIndex: e.detail.value
        })
    },
    selectDateHandle(e) {
        console.log('select date', e.detail)
        this.setData({
            selectDate: e.detail.value
        })
    },
    comfirmSelect() {
        console.log('comfirmSelect')
        wx.navigateTo({
            url: "../selectSeatPage/selectSeatPage",
            success(res) {
                console.log("navigateTo success", res);
            },
            fail(err) {
                console.log("navigateTo fail", err);
            }
        })
    }

});
