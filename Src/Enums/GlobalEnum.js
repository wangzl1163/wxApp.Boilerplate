var GlobalEnum = {};

GlobalEnum.storageKeys = function() {
   return {
      loginInfo: 'loginInfo', // 登录信息
      passport: 'passport' // 登录验证数据，包含sceneType，returnUrl等
   }
}.bind(GlobalEnum)()

GlobalEnum.sceneType = { // 小程序页面加载的场景类型
   local: 1, // 本地打开
   share: 2, // 分享，需要登录
   shareNoLogin: 3 // 分享，但不需要登录
}

GlobalEnum.treatmentResult = function() { //治疗结果
   return [{
         id: '1',
         name: '已治愈'
      },
      {
         id: '2',
         name: '治疗中'
      },
      {
         id: '3',
         name: '残疾'
      },
      {
         id: '4',
         name: '死亡'
      },
      {
         id: '5',
         name: '其他'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.treatmentResultIncompatibleType1 = function() { //治疗结果互斥项
   return [{
         id: '1',
         name: '已治愈'
      },
      {
         id: '2',
         name: '治疗中'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.treatmentResultIncompatibleType2 = function() { //治疗结果互斥项
   return [{
         id: '1',
         name: '已治愈'
      },
      {
         id: '4',
         name: '死亡'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.treatmentMethods = function() { //治疗方式
   return [{
         id: '1',
         name: '门诊'
      },
      {
         id: '2',
         name: '住院'
      },
   ];
}.bind(GlobalEnum)();

GlobalEnum.claimReason = function() { //出险原因
   return [{
         id: '1',
         name: '意外'
      },
      {
         id: '2',
         name: '疾病'
      },
      {
         id: '3',
         name: '其他'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.cardType = function() { //证件类型
   return [{
         id: '01',
         name: '身份证'
      },
      {
         id: '02',
         name: '户口薄'
      },
      {
         id: '03',
         name: '护照'
      },
      {
         id: '04',
         name: '军人证件'
      },
      {
         id: '05',
         name: '驾驶执照'
      },
      {
         id: '06',
         name: '返乡证'
      },
      {
         id: '07',
         name: '港澳身份证'
      },
      {
         id: '08',
         name: '工号'
      },
      {
         id: '09',
         name: '赴台通行证'
      },
      {
         id: '10',
         name: '港澳通行证'
      },
      {
         id: '15',
         name: '士兵证'
      },
      {
         id: '16',
         name: '外国人永久居留身份证'
      },
      {
         id: '25',
         name: '港澳居民来往内地通行证'
      },
      {
         id: '26',
         name: '台湾居民来往内地通行证'
      },
      {
         id: '99',
         name: '其他'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.payeeType = function() { //领款人类型，不要改变对象排列顺序
   return [{
         id: '3',
         name: '出险人',
         checked: 'true'
      },
      {
         id: '4',
         name: '监护人'
      },
      {
         id: '2',
         name: '被委托人'
      },
      {
         id: '1',
         name: '被保险人'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.OCRType = function() { //OCR支持的类型
   return {
      IDCard: 'IDCard',
      BankCard: 'bankCard'
   }
}.bind(GlobalEnum)();

GlobalEnum.claimLossStatus = function() { //多个出险人，每个出险人资料上传状态
   return [{
         id: '1',
         name: '资料未上传'
      },
      {
         id: '2',
         name: '资料齐全'
      },
      {
         id: '3',
         name: '资料不齐，已暂存'
      },
   ];
}.bind(GlobalEnum)();

GlobalEnum.claimStatus = function() { //索赔资料上传状态
   return [{
         id: '1',
         name: '暂存'
      },
      {
         id: '2',
         name: '提交'
      },
      {
         id: '3',
         name: '资料齐全，暂存'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.userType = function() { //注册用户类型
   return [{
         id: 1,
         name: '个人客户'
      },
      {
         id: 3,
         name: '业务员'
      },
      {
         id: 17,
         name: '协赔'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.userTypeforLogin = function() { //可登录的用户类型
   return [{
         id: 1,
         name: '个人客户'
      },
      {
         id: 2,
         name: '团体客户'
      },
      {
         id: 3,
         name: '业务员'
      },
      {
         id: 4,
         name: '渠道'
      },
      {
         id: 14,
         name: '案件处理岗'
      },
      {
         id: 17,
         name: '专职协赔岗'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.relationships = function() { //与被保险人关系
   return [{
         id: '000',
         name: '本人'
      },
      {
         id: '001',
         name: '家属'
      },
      {
         id: '002',
         name: '朋友'
      },
      {
         id: '003',
         name: '同事'
      },
      {
         id: '005',
         name: '代理人'
      },
      {
         id: '007',
         name: '人保员工'
      },
      {
         id: '008',
         name: '被保险人单位员工'
      },
      {
         id: '009',
         name: '分户被保险人'
      },
      {
         id: '999',
         name: '其他'
      },
   ];
}.bind(GlobalEnum)();

GlobalEnum.claimStatus = function() { //理赔列表，赔案状态
   return [{
         id: '1',
         name: '已报案未提交资料'
      },
      {
         id: '2',
         name: '案件处理中'
      },
      {
         id: '3',
         name: '资料不齐，请补交资料'
      },
      {
         id: '4',
         name: '核赔通过'
      },
      {
         id: '5',
         name: '已结案'
      },
      {
         id: '6',
         name: '误报案'
      },
      {
         id: '7',
         name: '已注销'
      },
      {
         id: '8',
         name: '放弃索赔'
      },
      {
         id: '9',
         name: '重复报案'
      },
      {
         id: '10',
         name: '拒赔'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.moduleFlag = function() { //模块或页面标识
   return {

   };
}.bind(GlobalEnum)();

GlobalEnum.loginType = function() { //用户登录方式
   return {
      mobileLogin: 'mobile',
      accountLogin: 'account'
   };
}.bind(GlobalEnum)();

GlobalEnum.allowUploadFilesStatus = function() { // 允许传资料的状态，代码
   return [{
         id: '0',
         name: '未上传索赔资料'
      },
      {
         id: '1',
         name: '已报案未提交资料'
      },
      {
         id: '5',
         name: '资料不齐，请补交资料'
      }
   ];
}.bind(GlobalEnum)();

GlobalEnum.constValue = function() { // 常量值
   return {
      errData: 'errData', // 导致程序报错的数据
   }
}.bind(GlobalEnum)();

GlobalEnum.searchModule = function() { // 各个搜索页面的代码
   return {
      payeeInfo: {
         isShow: false,
         moduleName: 'payeeinfo'
      },
      myClaim: {
         isShow: false,
         moduleName: 'myclaim'
      }
   }
}.bind(GlobalEnum)();

module.exports = GlobalEnum