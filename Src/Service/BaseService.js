class Service {
   constructor(){
      let pages = getCurrentPages()
      this.page = pages[pages.length-1]
   }
}

module.exports = Service