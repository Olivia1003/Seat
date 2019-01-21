export function sendRequest(type, reqUrl) {
    console.log('sendRequest', type, reqUrl)
    return new Promise((resolve, reject) => {
        wx.request({
            url: reqUrl,
            method: type,
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            }
        });
    })
}