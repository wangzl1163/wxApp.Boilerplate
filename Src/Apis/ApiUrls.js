var domains = {
   // api域名
   apiDomain: 'http://111.198.29.215:8085',
   // 静态文件域名
   staticDomain: 'http://111.198.29.215:8081/',
   // 文件上传域名
   fileUploadDoamin: 'http://111.198.29.215:8082'
}

var apis = {
   userLogin: domains.apiDomain + '/api/User/UserLogin', // 用户登录
}

module.exports = {
   apis: apis,
   domains: domains
}