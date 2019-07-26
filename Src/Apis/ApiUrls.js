const domains = require('./Domain.js')

var apis = {
   userLogin: domains.apiDomain + '/api/User/UserLogin', // 用户登录
}

module.exports = {
   apis: apis,
   domains: domains
}