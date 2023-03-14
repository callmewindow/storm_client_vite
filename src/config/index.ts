// 前端全局配置文件
// 对前端项目的有关配置项进行内容的管理

// 后台访问地址，api为辅助测试
const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:8080'
const BACKEND_URL = 'http://127.0.0.1:8088'

const settings = {
  // 请求根路径
  baseUrl: BASE_URL,
  // 后台地址
  backendUrl: BACKEND_URL,
  // 是否开启代理，本地需要开，线上环境关闭
  proxyFlag: true,
  // 端口
  port: 8080,
  // 是否开启https
  https: false,
  // 扩展端口
  host: 'localhost',
  // 公共路径
  base: './'
}

export { settings }
