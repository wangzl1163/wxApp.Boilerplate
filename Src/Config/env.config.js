/**
 * 环境变量配置
 * 
 * 每个对应环境变量都有两个值
 * 0：否，1：是
 * 
 * 每次上传代码前对每个环境变量进行配置
 * 环境变量的值只能存在一项为1，其余必须为0
 */
module.exports = {
   wx_env_production:0, // 生产环境
   wx_env_test:0,       // 测试环境
   wx_env_develop:1     // 开发环境
}