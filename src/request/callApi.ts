const token = localStorage.getItem(`${import.meta.env.VITE_ITEM_CODE}token`)
// console.log(token)

const baseURL =
  process.env.NODE_ENV === 'development'
    ? `/api/`
    : import.meta.env.VITE_BASE_URL // 正式地址

const get = (url: string, data?: any) => {
  return new Promise<any>((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      data,
      header: {
        Authorization: localStorage.getItem(
          `${import.meta.env.VITE_ITEM_CODE}token`,
        ),
      },
      method: 'GET',
      success: (response: any) => {
        const code = response.data.code
        const msg = response.data.msg || '服务器错误'
        switch (code) {
          case 0:
            break
          case -1:
            localStorage.removeItem('token')
            uni.showToast({
              title: msg,
              duration: 2000,
              icon: 'error',
            })

            uni.reLaunch({ url: '/pages/chauffeur/login/index' })
            break
          default:
            uni.showToast({
              title: msg,
              duration: 2000,
              icon: 'error',
            })
            break
        }
        resolve(response.data)
      },
      fail: err => {
        return reject(err)
      },
    })
  })
}

const post = (url: string, data: any) => {
  return new Promise<any>((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      data,
      header: {
        Authorization: localStorage.getItem(
          `${import.meta.env.VITE_ITEM_CODE}token`,
        ),
      },
      method: 'POST',
      success: (response: any) => {
        const code = response.data.code
        const msg = response.data.msg || '服务器错误'
        switch (code) {
          case 0:
            break
          case -1:
            // localStorage.removeItem('token')
            uni.showToast({
              title: msg,
              duration: 2000,
              icon: 'none',
            })
            break
          default:
            uni.showToast({
              title: msg,
              duration: 2000,
              icon: 'none',
            })
            break
        }
        resolve(response.data)
      },
      fail: err => {
        return reject(err)
      },
    })
  })
}

export const callApi = {
  get,
  post,
}

export default callApi
