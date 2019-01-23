import {
    sendRequest
} from '../common/serverUtil'
import {
    getGlobal,
    setGlobal
} from '../common/global'
// userId为空时，从服务端获取
export function userLogin() {
    console.log('userLogin start')
    return new Promise((resolve, reject) => {
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
                            const userId = res.data.userId
                            if (!getGlobal('userId')) {
                                console.log('set global userId', userId)
                                setGlobal('userId', userId)
                            }
                            resolve()
                        }, (res) => {
                            console.log('login get fail', res)
                            reject()
                        })
                } else {
                    console.log('登录失败！' + res.errMsg)
                    reject()
                }
            },
            fail(res) {
                console.log('login success fail', res)
                reject()
            }
        })
    })
}