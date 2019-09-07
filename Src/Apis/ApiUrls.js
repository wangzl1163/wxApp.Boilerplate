const domains = require('./Domain.js')
console.log('小程序当前域名：',domains)

const apis = {
   userLogin: domains.apiDomain + '/api/User/UserLogin', // 用户登录
}

module.exports = {
   apis,
   domains
}