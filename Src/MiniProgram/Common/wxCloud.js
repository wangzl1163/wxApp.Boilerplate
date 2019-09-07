// 云开发 小程序端API封装

/**
 * 全部函数返回Promise，不支持回调函数风格
 */

class WxCloud {
   /**
    * 调用云函数
    * @Params {object} {name,data}
    * {
    *   name:云函数名,
    *   data:传递给云函数的参数
    * }
    * 
    * @params {object} config 环境配置
    */
   callFunction({
      name,
      data
   }, config = wx.cloud_env) {
      return wx.cloud.callFunction({
         name,
         data,
         config
      })
   }

   /**
    * 获取数据库对象
    * @params {object} config 环境配置
    */
   getDB(config = wx.cloud_env) {
      return wx.cloud.database(config)
   }

   /**
    * 获取集合对象
    * @param {string} collectionName 集合名称
    */
   getCollection(collectionName, dbConfig = wx.cloud_env) {
      return this.getDB(dbConfig).collection(collectionName)
   }

   /**
    * 获取记录对象
    * @params {string} collectionName 集合名称
    * @params {string} docId 记录ID
    */
   getDoc(collectionName, docId, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).doc(docId)
   }

   /**
    * 在集合上新增记录
    * @params {string} collectionName 集合名称
    * @params {object} data 新增记录的定义
    * @params {object} dbConfig 环境配置
    */
   add(collectionName, data = {}, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).add({
         data
      })
   }

   /**
    * 获取集合数据，或获取根据查询条件筛选后的集合数据。
    * @params {string} collectionName 集合名称
    * @params {object} dbConfig 环境配置
    */
   get(collectionName, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).get()
   }

   /**
    * 指定筛选条件
    * @params {string} collectionName 集合名称
    * @params {object} rule 筛选条件
    * @params {object} dbConfig 环境配置
    */
   where(collectionName, rule = {}, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).where(rule)
   }

   /**
    * 指定查询排序条件
    * @params {string} collectionName 集合名称
    * @params {string} fieldName 排序字段
    * @params {string} order 排序顺序，只能为 asc（升序） 或 desc（降序）
    * @params {object} dbConfig 环境配置
    */
   orderBy(collectionName, fieldName, order, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).orderBy(fieldName, order)
   }

   /**
    * 指定查询结果集数量上限
    * @params {string} collectionName 集合名称
    * @params {number} max 查询结果集的数量上限
    * @params {object} dbConfig 环境配置
    */
   limit(collectionName, max, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).limit(max)
   }

   /**
    * 指定查询返回结果时从指定序列后的结果开始返回，常用于分页
    * @params {string} collectionName 集合名称
    * @params {number} offset 跳过的数量
    * @params {object} dbConfig 环境配置
    */
   skip(collectionName, offset, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).skip(offset)
   }

   /**
    * 指定返回结果中记录需返回的字段
    * @params {string} collectionName 集合名称
    * @params {object} definition 返回结果中记录需返回的字段
    * @params {object} dbConfig 环境配置
    */
   field(collectionName, definition = {}, dbConfig = wx.cloud_env) {
      return this.getCollection(collectionName, dbConfig).field(definition)
   }

   /**
    * 获取记录数据，或获取根据查询条件筛选后的记录数据
    * @params {string} collectionName 集合名称
    * @params {string} docId 记录ID
    * @params {object} dbConfig 环境配置
    */
   docGet(collectionName, docId, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).get()
   }

   /**
    * 更新一条记录
    * @params {string} collectionName 集合名称
    * @params {string} docId 记录ID
    * @params {object} data 更新对象
    * @params {object} dbConfig 环境配置
    */
   update(collectionName, docId, data, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).update({
         data
      })
   }

   /**
    * 替换更新一条记录
    * @params {string} collectionName 集合名称
    * @params {string} docId 记录ID
    * @params {object} data 替换更新对象
    * @params {object} dbConfig 环境配置
    */
   set(collectionName, docId, data, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).set({
         data
      })
   }

   /**
    * 删除一条记录
    * @params {string} collectionName 集合名称
    * @params {string} docId 记录ID
    * @params {object} dbConfig 环境配置
    */
   remove(collectionName, docId, dbConfig = wx.cloud_env) {
      return this.getDoc(collectionName, docId, dbConfig).remove()
   }

   /**
    * 获取数据库查询及更新指令
    * @params {object} dbConfig 环境配置
    */
   command(config = wx.cloud_env) {
      return this.getDB(config).command
   }

   /**
    * 数据库正则
    * @params {object} dbConfig 环境配置
    */
   getDbRegExp(config = wx.cloud_env) {
      return this.getDB(config).RegExp
   }

   /**
    * 构造一个服务端时间的引用。可用于查询条件、更新字段值或新增记录时的字段值。
    * @params {object} 
    * {
    *    offset 引用的服务端时间偏移量，毫秒为单位，可以是正数或负数
    * }
    * @params {object} dbConfig 环境配置
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
    * @params {object} dbConfig 环境配置
    */
   getGeo(config = wx.cloud_env) {
      return this.getDB(config).Geo
   }

   /**
    * 聚合流水线阶段
    * @params {string} collectionName 集合名称
    * @params {object} dbConfig 环境配置
    */
   aggregationStages(collectionName, config = wx.cloud_env) {
      return this.getCollection(collectionName, config).aggregate()
   }

   /**
    * 聚合操作符
    * @params {object} dbConfig 环境配置
    */
   aggregationOperators(config = wx.cloud_env) {
      return this.command(config).aggregate
   }

   /**
    * 上传文件，将本地资源上传至云存储空间，如果上传至同一路径则是覆盖写
    * @params {object} {
    *    cloudPath：云存储路径，命名限制见文件名命名限制
    *    filePath：要上传文件资源的路径
    *    header：HTTP 请求 Header, header 中不能设置 Referer
    *    config：环境配置
    * }
    */
   uploadFile({
      cloudPath = '',
      filePath = '',
      header = {},
      config = wx.cloud_env
   }) {
      return wx.cloud.uploadFile({
         cloudPath,
         filePath,
         header,
         config
      })
   }

   /**
    * 下载文件，从云存储空间下载文件
    * @params {object} {
    *    fileID：云文件 ID
    *    config：环境配置
    * }
    */
   downloadFile({
      fileID = '',
      config = wx.cloud_env
   }) {
      return wx.cloud.downloadFile({
         fileID,
         config
      })
   }

   /**
    * 用云文件 ID 换取真实链接，可自定义有效期，默认一天且最大不超过一天。一次最多取 50 个。
    * @params {object} {
    *    fileList：要换取临时链接的云文件 ID 列表
    *    config：环境配置
    * }
    */
   getTempFileURL({
      fileList: [],
      config = wx.cloud_env
   }) {
      return wx.cloud.getTempFileURL({
         fileList,
         config
      })
   }

   /**
    * 从云存储空间删除文件，一次最多 50 个
    * @params {object} {
    *    fileList：云文件 ID 字符串数组
    *    config：环境配置
    * }
    */
   deleteFile({
      fileList: [],
      config = wx.cloud_env
   }) {
      return wx.cloud.deleteFile({
         fileList,
         config
      })
   }
}

module.exports = new WxCloud()