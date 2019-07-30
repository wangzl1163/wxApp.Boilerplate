// 生产环境
const proDomains = {
   // api域名
   a: 'http://111.198.29.215:8085',
   // 静态文件域名
   s: 'http://111.198.29.215:8081/',
   // 文件上传域名
   f: 'http://111.198.29.215:8082'
}

// 测试环境
const testDomains = {
   // api域名
   a: 'http://111.198.29.215:8085',
   // 静态文件域名
   s: 'http://111.198.29.215:8081/',
   // 文件上传域名
   f: 'http://111.198.29.215:8082'
}

// 开发环境
const devDomains = {
   // api域名
   a: 'http://111.198.29.215:8086',
   // 静态文件域名
   s: 'http://111.198.29.215:8081/',
   // 文件上传域名
   f: 'http://111.198.29.215:8082'
}

var domains = null

if (wx.app_env.isProduction){
   domains = proDomains
} else if (wx.app_env.isTest){
   domains = testDomains
} else if (wx.app_env.isDevelop){
   domains = devDomains
}

domains = (({ a = '', s = '', f = '' } = {}) => ({
   // api域名
   apiDomain: a,
   // 静态文件域名
   staticDomain: s,
   // 文件上传域名
   fileUploadDoamin: f
}))(domains)

module.exports = domains