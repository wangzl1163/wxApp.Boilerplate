var GlobalEnum = {};

GlobalEnum.storageKeys = {
   loginInfo: 'loginInfo', // 登录信息
   passport: 'passport', // 登录验证数据，包含sceneType，returnUrl等
   errData: 'errData', // 导致程序报错的数据
   remindSetting: 'remindSetting' // 提醒设置
}

GlobalEnum.sceneType = { // 小程序页面加载的场景类型
   local: 1, // 本地打开
   share: 2, // 分享，需要登录
   shareNoLogin: 3 // 分享，但不需要登录
}

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

GlobalEnum.OCRType = { //OCR支持的类型
   IDCard: 'IDCard',
   BankCard: 'bankCard'
}

GlobalEnum.loginType = { //用户登录方式
   mobileLogin: 'mobile',
   accountLogin: 'account'
}

GlobalEnum.searchModule = { // 各个搜索页面的代码
   payeeInfo: {
      isShow: false,
      moduleName: 'payeeinfo'
   },
   myClaim: {
      isShow: false,
      moduleName: 'myclaim'
   }
}

module.exports = GlobalEnum