// 云开发 小程序端API封装

class WxCloud {
   /**
    * 调用云函数
    */
   callFunction({
      name,
      data,
      success,
      fail,
      complete
   }, config = wx.cloud_env) {
      return wx.cloud.callFunction({
         name,
         data,
         config,
         success,
         fail,
         complete
      })
   }

   /**
    * 获取数据库对象
    */
   getDB(config = wx.cloud_env) {
      return wx.cloud.database(config)
   }

   /**
    * 获取集合对象
    */
   getCollection(collectionName, dbConfig = wx.cloud_env) {
      return this.getDB(dbConfig).collection(collectionName)
   }

   /**
    * 获取记录对象
    */
   getDoc(collectionName, docId, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).doc(docId)
   }

   /**
    * 在集合上新增记录
    */
   add(collectionName, {
      data = {},
      success,
      fail,
      complete
   } = {}, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).add({
         data,
         success,
         fail,
         complete
      })
   }

   /**
    * 获取集合数据，或获取根据查询条件筛选后的集合数据。
    */
   get(collectionName, {
      success,
      fail,
      complete
   }, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).get({
         success,
         fail,
         complete
      })
   }

   /**
    * 指定筛选条件
    */
   where(collectionName, rule = {}, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).where(rule)
   }

   /**
    * 指定查询排序条件
    */
   orderBy(collectionName, fieldName, order, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).orderBy(fieldName, order)
   }

   /**
    * 指定查询结果集数量上限
    */
   limit(collectionName, max, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).limit(max)
   }

   /**
    * 指定查询返回结果时从指定序列后的结果开始返回，常用于分页
    */
   skip(collectionName, offset, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).skip(offset)
   }

   /**
    * 指定返回结果中记录需返回的字段
    */
   field(collectionName, definition = {}, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).field(definition)
   }

   /**
    * 获取记录数据，或获取根据查询条件筛选后的记录数据
    */
   docGet(collectionName, docId, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).get()
   }

   /**
    * 更新一条记录
    */
   update(collectionName, docId, data, {
      success,
      fail,
      complete
   } = {}, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).update({
         data,
         success,
         fail,
         complete
      })
   }

   /**
    * 替换更新一条记录
    */
   set(collectionName, docId, data, {
      success,
      fail,
      complete
   } = {}, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).set({
         data,
         success,
         fail,
         complete
      })
   }

   /**
    * 删除一条记录
    */
   remove(collectionName, docId, {
      success,
      fail,
      complete
   } = {}, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).remove({
         success,
         fail,
         complete
      })
   }

   /**
    * 获取数据库查询及更新指令
    */
   command(config = wx.cloud_env) {
      return this.getDB(config).command
   }

   /**
    * 数据库正则
    */
   getDbRegExp(config = wx.cloud_env) {
      return this.getDB(config).RegExp
   }

   /**
    * 构造一个服务端时间的引用。可用于查询条件、更新字段值或新增记录时的字段值。
    */
   serverDate({
      offset
   } = {}, config = wx.cloud_env) {
      return this.getDB(config).serverDate({
         offset
      })
   }

   /**
    * 地理位置构造器
    */
   getGeo(config = wx.cloud_env) {
      return this.getDB(config).Geo
   }

   /**
    * 聚合流水线阶段
    */
   aggregationStages(collectionName, config = wx.cloud_env) {
      return this.getCollection(collectionName, config = wx.cloud_env).aggregate()
   }

   /**
    * 聚合操作符
    */
   aggregationOperators(config = wx.cloud_env) {
      return this.command(config).aggregate
   }

   /**
    * 上传文件，将本地资源上传至云存储空间，如果上传至同一路径则是覆盖写
    */
   uploadFile({
      cloudPath = '',
      filePath = '',
      header = {},
      config = wx.cloud_env,
      success,
      fail,
      complete,
   }) {
      return wx.cloud.uploadFile({
         cloudPath,
         filePath,
         header,
         config,
         success,
         fail,
         complete
      })
   }

   /**
    * 下载文件，从云存储空间下载文件
    */
   downloadFile({
      fileID = '',
      config = wx.cloud_env,
      success,
      fail,
      complete
   }) {
      return wx.cloud.downloadFile({
         fileID,
         config,
         success,
         fail,
         complete
      })
   }

   /**
    * 用云文件 ID 换取真实链接，可自定义有效期，默认一天且最大不超过一天。一次最多取 50 个。
    */
   getTempFileURL({
      fileList: [],
      config = wx.cloud_env,
      success,
      fail,
      complete
   }) {
      return wx.cloud.getTempFileURL({
         fileList,
         config,
         success,
         fail,
         complete
      })
   }

   /**
    * 从云存储空间删除文件，一次最多 50 个
    */
   deleteFile({
      fileList: [],
      config = wx.cloud_env,
      success,
      fail,
      complete
   }) {
      return wx.cloud.deleteFile({
         fileList,
         config,
         success,
         fail,
         complete
      })
   }
}

module.exports = new WxCloud()