class Service {
   constructor() {
      let pages = getCurrentPages()
      this.page = pages[pages.length - 1]
      this.$setData = (data, cb = () => {}) => {
         return this.page.setData(data, cb)
      }
      this.$data = this.page.data
   }
}

module.exports = Service