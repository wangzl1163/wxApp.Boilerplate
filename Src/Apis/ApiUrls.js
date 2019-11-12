const domains = require('./Domain.js')
console.log('小程序当前域名：', domains)

const urls = {
   userLogin: 'User/UserLogin', // 用户登录
}

const getUrls = () => {
   for (const key in urls) {
      urls[key] = domains.apiDomain + '/api/' + urls[key]
   }

   return urls
}

module.exports = {
   urls: getUrls(),
   domains
}