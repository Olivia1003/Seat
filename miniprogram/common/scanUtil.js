export function scanSeatCode() {
    return new Promise((resolve, reject) => {
        let resData = {}
        wx.scanCode({
            success: (res) => {
                resData = JSON.parse(res.result) || {}
                resolve(resData)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}