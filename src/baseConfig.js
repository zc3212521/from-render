const baseConfig = {
  baseVersion: '4.0.0-beta4',
  env: { // 环境相关配置
    dev: {
      baseUrl: '/test'
      // 其他dev环境相关配置可在此处定义，如 uploadUrl, 特殊变量等
    },
    prod: {
      baseUrl: '/hbm'
    },
    sit: {
      baseUrl: '/hbm'
    },
    uat: {
      baseUrl: '/hbm'
    },
    yapi: {
      baseUrl: 'http://yapi.hongguaninfo.com/mock/26'
    }
  },
  icon: {
    localLoad: true, // 是否加载本地图标，是则读取src/assets/font/font.js文件中的图标，否则读取下面远程地址图标
    scriptUrl: '//at.alicdn.com/t/font_1487793_hrz46u4xgnq.js' // 在 iconfont.cn 上生成
  },
  queryWhiteList: ['/login'], // 不需要token验证的请求接口白名单
  loadingWhiteList: ['/login'], // 不需要显示loading的请求接口白名单
  tokenExpire: 2 * 24 * 60 * 60 // token 失效时间，单位：s
}
export default baseConfig
