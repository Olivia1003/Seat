/**
 * @author wjy
 * @description 我的信息
 */

Page({
  data: {
    userData: {
      school: '华东师范大学',
      point: 300,
      rank: 2,
      hour: 12,
    }
    // userPicUrl: "../../images/icons/user_default.png"
  },
  onLoad() {
    console.log('userPage onLoad')
    // wx.request({
    //   url: 'http://localhost:3000/getUserInfo',
    //   method: "GET",
    //   success: function (res) {
    //     console.log('getUserInfo response success', res)
    //   },
    //   fail: function () {
    //     console.log('getUserInfo response fail')
    //   }
    // });
  }
});