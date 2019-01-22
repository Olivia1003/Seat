import {
    sendRequest
} from '../common/serverUtil'
import {
    getGlobal
} from '../common/global'
export function userLogin() {
    console.log('userLogin start')
    wx.login({
        success(res) {
            console.log('login success res', res)
            const {
                code
            } = res
            if (code) {
                const baseUrl = getGlobal('baseUrl')
                sendRequest('GET', `${baseUrl}/user/login?code=${code}`)
                    .then((res) => {
                        console.log('login get success', res)

                    }, (res) => {
                        console.log('login get fail', res)
                    })
            } else {
                console.log('登录失败！' + res.errMsg)
            }
        },
        fail(res) {
            console.log('login success fail', res)
        }
    })
}