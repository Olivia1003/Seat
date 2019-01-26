const globalData = {
    baseUrl: 'http://localhost:3000',
    userId: '',
    userPoint: 160,
    schoolId: 1,
    schoolName: '华东师范大学'
}

export function getGlobal(key) {
    return globalData[key]
}

export function setGlobal(key, value) {
    globalData[key] = value
}