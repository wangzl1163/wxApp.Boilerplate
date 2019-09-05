class WxCloud {
   /**
    * 获取数据库对象
    */
   getDB(config = {}) {
      return wx.cloud.database(config)
   }

   /**
    * 获取集合对象
    */
   getCollection(collectionName, dbConfig = {}) {
      return this.getDB(dbConfig).collection(collectionName)
   }

   /**
    * 获取记录对象
    */
   getDoc(docId, collectionName, dbConfig = {}) {
      return this.getCollection(collectionName, dbConfig).doc(docId)
   }
}

module.exports = new WxCloud()