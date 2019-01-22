/**
 * @author wjy
 * @description 我的信息
 */

import {
  getGlobal
} from '../../common/global'
import {
  sendRequest
} from '../../common/serverUtil'
import {
  userLogin
} from '../../common/loginUtil'

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userData: {
      school: '',
      point: 0,
      rank: 0,
      hour: 0,
      leaveShort: 0,
      leaveLong: 0
    }
  },
  onLoad() {
    console.log('userPage onLoad')
    userLogin()
    // this.getUserData()
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success(res) {
    //           console.log('getSetting', res)
    //         }
    //       })
    //     }
    //   }
    // })
  },
  // bindGetUserInfo(e) {
  //   console.log('bindGetUserInfo', e.detail)
  // },
  // 从服务获取用户信息
  getUserData() {
    const baseUrl = getGlobal('baseUrl')
    const userId = 1003
    sendRequest('GET', `${baseUrl}/user?userId=${userId}`)
      .then((res) => {
        console.log('getUserData success', res)
        this.setData({
          userData: res.data
        })
      }, (res) => {
        console.log('getUserData fail', res)
      })
  }
});