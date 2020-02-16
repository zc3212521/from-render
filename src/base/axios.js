import axios from 'axios'
import baseConfig from '@/baseConfig'
import qs from 'qs'
// import store from '@/store'
import env from '@/utils/env'
import { getToken, loginOut } from '@/utils/auth'
import { sliceInArr } from '@/utils'

const baseUrl = env.baseUrl

export { baseUrl }

axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = false
// axios.defaults.timeout = 50000 一直等待后端响应，统一由后端控制
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

let loadingIndex = 0

axios.interceptors.request.use(function (request) {
  // format request.data
  if (!sliceInArr(baseConfig.loadingWhiteList, request.url)) {
    loadingIndex++
    window.vm.$store.dispatch('updateLoading', true)
  }
  if (request.url.indexOf('/login') >= 0) { // post,put请求预处理
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    request.data = qs.stringify(request.data)
  }
  // 请求添加sessionid
  if (!sliceInArr(baseConfig.queryWhiteList, request.url)) {
    const token = getToken()
    if (!token) {
      loginOut()
      return request
    }
    request.headers.Authorization = token
  }
  return request
}, function (error) {
  console.log('request err:', error)
})

// respone拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (!sliceInArr(baseConfig.loadingWhiteList, response.config.url)) {
    loadingIndex = reduceLoading(loadingIndex)
  }
  return response
}, function (error) {
  if (!sliceInArr(baseConfig.loadingWhiteList, error.config.url)) {
    loadingIndex = reduceLoading(loadingIndex)
  }
  if (error.response === undefined || error.response === null) {
    // 非服务器响应错误，如网络错误等
    window.vm.$message.error(`请求失败：${error.message}`, 5)
  }

  const originCode = error.response.status
  const data = error.response.data
  const url = error.config.url

  if (originCode === 401) {
    if (url.indexOf('/login') >= 0) {
      // 登录认证失败
      window.vm.$message.error(`登录失败：${data.detail}`, 5)
    } else {
      // 请求没有经过认证
      window.vm.$message.error('用户状态失效，请重新登录', 5)
      loginOut()
    }
    return Promise.reject(error)
  }

  if (error.config.ignoreGlobalErrorHandler) {
    // 如果设置忽略全局错误处理器，直接返回
    // 优先级低于401认证跳转
    return Promise.reject(error)
  }

  if (originCode === 400) {
    // 参数错误
    const message = data.detail
    if (data.violations != null && data.violations.length > 0) {
      // 业务校验错误
      let resultMessage = ''
      data.violations.forEach(item => {
        const itemMessage = '，' + item.message
        resultMessage = resultMessage + itemMessage
      })
      if (resultMessage.length > 0) {
        resultMessage = resultMessage.substring(1)
      }
      window.vm.$error({
        title: '参数错误',
        content: resultMessage
      })
    } else {
      // 其他参数错误
      window.vm.$error({
        title: '参数错误',
        content: message
      })
    }
    return Promise.reject(error)
  }

  // 兜底错误处理
  if (data && data.detail) {
    window.vm.$message.error(`${data.detail}`, 5)
  } else {
    window.vm.$message.error(`请求${originCode}错误`, 5)
  }
  return Promise.reject(error)
})

function reduceLoading (loadingIndex) {
  loadingIndex--
  if (loadingIndex <= 0) {
    window.vm.$store.dispatch('updateLoading', false)
  }
  return loadingIndex
}

export default axios
