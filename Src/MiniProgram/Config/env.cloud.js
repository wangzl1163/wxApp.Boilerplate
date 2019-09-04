// 云开发环境配置

// 云开发环境ID，根据实际开发时环境进行修改；由于云开发环境最多可以配置两个，所以开发和测试使用同一个环境
const cloudEnv = {
   releaseEnv: 'release-7bwap',
   devTestEnv: 'dev-test-mf1sp'
}

const appEnv = require('./env.config.js')

module.exports = {
   // env 参数说明：
   //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
   //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
   //   如不填则使用默认环境（第一个创建的环境）
   // env: 'my-env-id',
   traceUser: true,
   env: appEnv.wx_env_production === 1 ? cloudEnv.releaseEnv : cloudEnv.devTestEnv
}